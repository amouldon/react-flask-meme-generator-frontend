import { useEffect, useContext } from "react"
import { MemeContext } from "../Context/MemeContext"
import Spinner from "../components/Spinner"

const MyMeme = ({meme, index}) => {
    const {loading} = useContext(MemeContext)
    const textbox1Input = meme.user_input1
    const textbox1Position = meme.input1_positioning

    const textbox2Input = meme.user_input2
    const textbox2Position = meme.input2_positioning

    const textbox3Input = meme.user_input3
    const textbox3Position = meme.input3_positioning

    const textbox4Input = meme.user_input4
    const textbox4Position = meme.input4_positioning


    let textboxes = [[textbox1Input, textbox1Position], [textbox2Input, textbox2Position], [textbox3Input, textbox3Position], [textbox4Input, textbox4Position]]

    useEffect(() => {
        makeTextBoxes()
    }, [])

    const calculatePosition = (textbox, div) => {
        const img = document.getElementById(`meme#${index}`)
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
                const landing = document.getElementById('insert2')
                const div = document.createElement('div')
                div.appendChild(document.createTextNode(textbox[0]))
                div.id = `meme#${index}textBox#${textboxIndex + 1}`
                div.className = 'bg-light absolute'
                landing.appendChild(div)
                calculatePosition(textbox, div)
            }
        })
    }
    
if(loading){return (<Spinner />)}
else{ 
  return (
    <img src={meme.meme_url} alt="meme" id={`meme#${index}`} className='meme-image'/>
  )
}}

export default MyMeme