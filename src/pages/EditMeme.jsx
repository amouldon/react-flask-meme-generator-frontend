import { useContext, useEffect, useState } from "react"
import { MemeContext } from "../Context/MemeContext"
import { Link, useParams } from "react-router-dom" 
import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'
import { auth } from "../firebase.config"
import { useNavigate } from "react-router-dom"

const EditMeme = () => {
  const {handle, index} = useParams()
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('firebase:authUser:AIzaSyCcoR5lDGbmP8eGhgETZcbt4jVbFLc0ZBU:[DEFAULT]'))
  const {myMeme, loading, updateMyMeme, getMyMeme, deleteMeme, setLoading} = useContext(MemeContext)
  const [dragTarget, setdragTarget] = useState('')
  const [textBoxCount, setTextBoxCount] = useState(1)
  const [textBoxInput, setTextBoxInput] = useState('')
  let initialX = 0, initialY = 0, updatedX = 0, updatedY = 0

  useEffect(() => {
    getMyMeme(handle, user.uid)
  }, [handle])

  useEffect(() => {
    makeTextBoxes()
  }, [loading])
  
  

  const onMouseDown = (e) => {
    setdragTarget(document.getElementById(e.target.id))
  }

  let dragMouseDown = (e) => {
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  let elementDrag = (e) => {
    e.preventDefault();
    updatedX = initialX - e.clientX;
    updatedY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    dragTarget.style.top = (dragTarget.offsetTop - updatedY) + "px";
    dragTarget.style.left = (dragTarget.offsetLeft - updatedX) + "px";
  }

 let closeDragElement = () => {
    document.onmouseup = null;
    document.onmousemove = null;
  }
if (dragTarget){
  dragTarget.onmousedown = dragMouseDown;
  } 

  const onClickTextBox = () => {
    if(textBoxCount < 5) {
    const landing = document.getElementById('insert')
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(textBoxInput))
    console.log(textBoxCount)
    div.id = `memeID${myMeme.id}textBox${textBoxCount}`
    setTextBoxCount((prevState) => (
      prevState + 1
    ))
    console.log(textBoxCount)
    div.className = 'bg-light absolute'
    div.addEventListener('mousedown', onMouseDown)
    div.setAttribute('contentEditable', true)
    div.setAttribute('spellcheck', false)
    div.addEventListener('keydown', (e) => keypressDelete(e))
    div.addEventListener('click', () => div.focus())
    div.addEventListener('click', (e) => onClickTest(e))
    landing.appendChild(div)
  } else {
    toast.error('Max textboxes reached')
  }}



  const keypressDelete = (e) => {
    console.log(e.code)
    const parent = document.getElementById('insert')
    const child = document.getElementById(e.target.id)
      if (e.code == 'Delete') {
        parent.removeChild(child)
        console.log(textBoxCount)
        setTextBoxCount((currentCount) => (
            currentCount - 1
        ))
  }}

  const onChange = (e) => {
    setTextBoxInput(e.target.value)
  }


   const getRelativePositioning = (textBoxId, imageId) => {
    const text  = document.getElementById(textBoxId)
    const img  = document.getElementById(imageId)
    const imgX = img.getBoundingClientRect().x
    const imgY = img.getBoundingClientRect().y
    const textX = text.getBoundingClientRect().x
    const textY = text.getBoundingClientRect().y
    const textHeight = text.getBoundingClientRect().height
    const textWidth = text.getBoundingClientRect().width
    const distanceFromTop = textY - imgY
    const distanceFromLeft = textX - imgX
    const imgHeight = img.getBoundingClientRect().height
    const imgWidth = img.getBoundingClientRect().width
    const percentageFromTop = distanceFromTop / (imgHeight - textHeight)
    const percentageFromLeft = distanceFromLeft / (imgWidth - textWidth )
    return {'percentageFromLeft' : percentageFromLeft, 'percentageFromTop' : percentageFromTop}
    // % based on right and bottom sides
     
  } 

  const onClickSave = async () => {
    let positioning = []
    let textsContent = []
    let failed
    let newText1 = document.getElementById(`memeID${myMeme.id}textBox1`)
    let newText2 = document.getElementById(`memeID${myMeme.id}textBox2`)
    let newText3 = document.getElementById(`memeID${myMeme.id}textBox3`)
    let newText4 = document.getElementById(`memeID${myMeme.id}textBox4`)
    let oldText1 = document.getElementById(`Meme#${myMeme.id}textBox#1`)
    let oldText2 = document.getElementById(`Meme#${myMeme.id}textBox#2`)
    let oldText3 = document.getElementById(`Meme#${myMeme.id}textBox#3`)
    let oldText4 = document.getElementById(`Meme#${myMeme.id}textBox#4`)
    let texts = [newText1, newText2, newText3, newText4, oldText1, oldText2, oldText3, oldText4]
    console.log(texts)
    texts.forEach((text) => {
      if(text){
        const textBoxPosition = getRelativePositioning(text.id, myMeme.id)
        if (textBoxPosition.percentageFromLeft > 0 && textBoxPosition.percentageFromLeft < 1 && textBoxPosition.percentageFromTop > 0 && textBoxPosition.percentageFromTop < 1) {
            positioning.push(textBoxPosition)
            textsContent.push(text.textContent)
          } else {
            failed = true
          }
        } 
      })
      if (failed) {
        toast.error('Please move textboxes inside image')
      } else if(textsContent[0] == null) {
        toast.error('Must have atleast one textbox')
      } else {
        console.log(textsContent)
        await updateMyMeme(myMeme, textsContent, positioning)
        navigate('/my-memes')
      }
    }

    const onClickTest = (e) => {
        console.log(e.target.id)
    }

  const textbox1Input = myMeme.user_input1
  const textbox1Position = myMeme.input1_positioning

  const textbox2Input = myMeme.user_input2
  const textbox2Position = myMeme.input2_positioning

  const textbox3Input = myMeme.user_input3
  const textbox3Position = myMeme.input3_positioning

  const textbox4Input = myMeme.user_input4
  const textbox4Position = myMeme.input4_positioning


  let textboxes = [[textbox1Input, textbox1Position], [textbox2Input, textbox2Position], [textbox3Input, textbox3Position], [textbox4Input, textbox4Position]]

  const calculatePosition = (textbox, div) => {
    const img = document.getElementById(myMeme.id)
    const divWidth = div.getBoundingClientRect().width
    const divHeight = div.getBoundingClientRect().height
    const imgX = img.getBoundingClientRect().x
    const imgY = img.getBoundingClientRect().y
    const imgHeight = img.getBoundingClientRect().height 
    const imgWidth = img.getBoundingClientRect().width
    const originalPercentageFromTop = textbox[1].percentageFromTop
    const originalPercentageFromLeft = textbox[1].percentageFromLeft
    const distanceFromTop = imgY + (imgHeight * originalPercentageFromTop) * (1 - (divHeight / imgHeight))
    const distanceFromLeft = imgX + (imgWidth * originalPercentageFromLeft) * (1 - (divWidth / imgWidth))
    div.style.top = `${distanceFromTop}px`
    div.style.left = `${distanceFromLeft}px`

}


  const makeTextBoxes = () => {
    textboxes.map((textbox, textboxIndex) => {
        if(textbox[0]) {
            const landing = document.getElementById('insert')
            const div = document.createElement('div')
            div.appendChild(document.createTextNode(textbox[0]))
            div.id = `Meme#${myMeme.id}textBox#${textboxIndex + 1}`
            setTextBoxCount((currentCount) => (
                currentCount + 1
            ))
            div.className = 'bg-light absolute'
            landing.appendChild(div)
            calculatePosition(textbox, div)
            div.addEventListener('mousedown', onMouseDown)
            div.setAttribute('contentEditable', true)
            div.setAttribute('spellcheck', false)
            div.addEventListener('keydown', (e) => keypressDelete(e))
            div.addEventListener('click', () => div.focus())

            console.log(div)
        }
    })
}

    const onDelete = async () => {
        await deleteMeme(myMeme.id)
        navigate('/my-memes')
    }


  if(loading){return (<Spinner />)}
  else{
  return (
    <div className="row mt-5 d-flex justify-content-center">
      <img className="col-5 m-0 p-0" src={myMeme.meme_url} id={myMeme.id} alt="" />
      <div className="col-5 mx-3 py-3 d-flex flex-column justify-content-around" on>
        <div className="dark-border-no-hover p-3 mb-3 d-flex flex-column">
          <p className="h5" id='text-instructions'>Enter your meme's labels into the text field below, and then press the button to generate a textbox that can be dragged by double clicking and holding, you are alotted a maximum of four text boxes. Click a textbox to edit, and press the delete key to remove it.</p>
        </div>
        <div className="form-group d-flex flex-column align-items-center text-center dark-border-no-hover pt-4">
          <input type="text" id='textBoxInput' className="form-control not-inline w-75 mb-3" placeholder='Enter labels' onChange={onChange} />
          <div className="d-flex justify-content-around">
            <button className="btn btn-primary mx-3" onClick={onClickTextBox}>Generate textbox</button>
            <button className="btn btn-success mx-3" onClick={onClickSave}>Save meme</button>
            <button className="btn btn-danger mx-3" onClick={onDelete}>Delete meme</button>
          </div>
          <div id="insert" className="border m-2"></div>
        </div>
      </div>
    </div>
  )
}}

export default EditMeme
