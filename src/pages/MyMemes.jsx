import { useEffect, useContext } from "react"
import { MemeContext } from "../Context/MemeContext"
import Spinner from "../components/Spinner"
import MyMeme from "../components/MyMeme"
import { useNavigate } from "react-router-dom"

const MyMemes = () => {
  const navigate = useNavigate()
    const {myMemes, getMyMemes, loading, setLoading} = useContext(MemeContext)
    const user = JSON.parse(sessionStorage.getItem('firebase:authUser:AIzaSyCcoR5lDGbmP8eGhgETZcbt4jVbFLc0ZBU:[DEFAULT]'))
     


    useEffect(() => {
        if (user.uid){
        console.log(user.uid)
        getMyMemes(user.uid)}
    },[navigate])    

if(loading){return (<Spinner />)}
else if (!myMemes || myMemes.message ) { return (<h1 className='text-center pt-4'>No memes to be found</h1>) }
  else{ 
  return (
    <div className="text-center my-3">
      <h1 className='mb-3'>My memes</h1>
        <div className='d-flex justify-content-center flex-wrap'>
          {myMemes ? myMemes.map((meme, index) => (
            <div className="p-4 m-4 dark-border-no-hover" id='insert2'>
                <a href={`/edit-meme/${meme.id}/${index}`}>
                    <MyMeme index={index} meme={meme}/>
                </a>
            </div>))
          :
          <p>no memes</p>
          }
        </div>
  </div>
  )
}}

export default MyMemes