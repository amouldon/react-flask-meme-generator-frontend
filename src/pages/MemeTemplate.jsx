import { useContext, useEffect, useState } from "react"
import { MemeContext } from "../Context/MemeContext"
import { useNavigate, useParams } from "react-router-dom" 
import Spinner from "../components/Spinner"
import {toast} from 'react-toastify'



const MemeTemplate = () => {
  const navigate = useNavigate()
  const {handle} = useParams()
  const {getTemplate, template, loading, saveMeme} = useContext(MemeContext)
  const [dragTarget, setdragTarget] = useState('')
  const [textBoxCount, setTextBoxCount] = useState(1)
  const [textBoxInput, setTextBoxInput] = useState('')
  let initialX = 0, initialY = 0, updatedX = 0, updatedY = 0

  useEffect(() => {
    getTemplate(handle)
  }, [handle])

  const onMouseDown = (e) => {
    setdragTarget(document.getElementById(e.target.id))
    console.log(dragTarget)
    
  }

  let dragMouseDown = function(e) {
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = closeDragElement
    document.onmousemove = elementDrag
  }

  let elementDrag = function (e) {
    e.preventDefault();
    updatedX = initialX - e.clientX;
    updatedY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    dragTarget.style.top = (dragTarget.offsetTop - updatedY) + "px";
    dragTarget.style.left = (dragTarget.offsetLeft - updatedX) + "px";
  }

 let closeDragElement = function () {
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
    div.id = `textBox${textBoxCount}`
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

  const onClickSave = () => {
    let positioning = []
    let textsContent = []
    let failed
    let text1 = document.getElementById('textBox1')
    let text2 = document.getElementById('textBox2')
    let text3 = document.getElementById('textBox3')
    let text4 = document.getElementById('textBox4')
    let texts = [text1, text2, text3, text4]
    texts.forEach((text) => {
      if(text){
        console.log(text.id)
        const textBoxPosition = getRelativePositioning(text.id, template.id)
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
    } else if (!text1) {toast.error('Must have at least one textbox')
    } else {
      console.log(text1)
      saveMeme(template, textsContent, positioning)
      navigate('/create')
      toast.success('Meme saved')
    }
  }


  if(loading){return (<Spinner />)}
  else{
  return (
    <div className="row mt-5 d-flex justify-content-center">
      <img className="col-5 m-0 p-0" src={template.meme_url} id={template.id} alt="" />
      <div className="col-5 mx-3 py-3 d-flex flex-column justify-content-around" on>
        <div className="dark-border-no-hover p-3 mb-3">
          <p className="h5" id='text-instructions'>Enter your meme's labels into the text field below, and then press the button to generate a textbox that can be dragged by double clicking and holding, you are alotted a maximum of four text boxes. Click a textbox to edit. Use the delete key to remove a textbox.</p>
        </div>
        <div className="form-group d-flex flex-column align-items-center text-center dark-border-no-hover pt-4">
          <input type="text" id='textBoxInput' className="form-control not-inline w-75 mb-3" placeholder='Enter labels' onChange={onChange} />
          <div className="d-flex justify-content-around">
            <button className="btn btn-primary mx-3" onClick={onClickTextBox}>Generate textbox</button>
            <button className="btn btn-success mx-3" onClick={onClickSave}>Save my meme</button>
          </div>
          <div id="insert" className="border m-2"></div>
        </div>
      </div>
    </div>
  )
}}

export default MemeTemplate
