import { useEffect, useState, useContext } from "react"
import { MemeContext } from "../Context/MemeContext"
import Spinner from "../components/Spinner"
import MemeTemplate from "./MemeTemplate"
import { Link } from "react-router-dom"


const ChooseTemplate = () => {
  const {memeTemplates, getTemplates, loading} = useContext(MemeContext)

  useEffect(() => {
    getTemplates()
  }, [])

if (loading){return (<Spinner />)}
    else { 
  return (
    <div className="text-center my-3 flex-wrap">
      <h1 className='mb-3'>Choose a template</h1>

        <div className='d-flex justify-content-center flex-wrap'>
         {memeTemplates ? memeTemplates.map((meme, index) => (
          <div className="p-4 m-4 dark-border">
            <Link to={`/meme/${meme.id}`} >
            <img src={meme.meme_url} className='meme-image' alt="" />
            </Link>
          </div>))
          :
          <h1>Memes are down</h1>
          }
        </div>
  </div>
  )
}}

export default ChooseTemplate