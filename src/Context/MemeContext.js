import { auth } from '../firebase.config'
import { useState, createContext } from 'react'


export const MemeContext = createContext()

export const MemeProvider = ({ children }) => {
    const [memeTemplates, setMemeTemplates] = useState({})
    const [template, setTemplate] = useState({})
    const [loading, setLoading] = useState(true)
    const [myMemes, setMyMemes] = useState([])
    const [myMeme, setMyMeme] = useState({})
    
    const logOut = () => {
        sessionStorage.setItem('loggedInStatus', JSON.stringify(false))
        auth.signOut()
    }

    const getTemplates = async () => {
        console.log('https://topaz-dented-clove.glitch.me')
        const response = await fetch('https://topaz-dented-clove.glitch.me/api/get-meme-templates')
        const data = await response.json()
        setMemeTemplates(data)
        setLoading(false)
    }

    const getTemplate = async (id) => {
        const response = await fetch(`https://topaz-dented-clove.glitch.me/api/get-meme-template/${id}`)
        const data = await response.json()
        setTemplate(data)
        console.log(data)
        setLoading(false)
    }

    const saveMeme = async (meme, inputs, positioning) => {
        const token = auth.currentUser.uid
        const postObj = {'memeId' : meme.id, 'memeURL': meme.meme_url, 'token': token, 'inputs': inputs, 'positioning': positioning}
        const response = await fetch('https://topaz-dented-clove.glitch.me/api/add-meme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postObj)
        })
        const data = await response.json()
        console.log(data)
    }

    const getMyMemes = async (token) => {
        console.log(token)
        const response = await fetch('https://topaz-dented-clove.glitch.me/api/view-my-memes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'token': token})
            
        })
        const data = await response.json()
        console.log(data)
        setMyMemes(data)
        setLoading(false)
    }

    const getMyMeme = async (id, token) => {
        console.log(token)
        const response = await fetch(`https://topaz-dented-clove.glitch.me/api/view-meme/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'token': token})
        })
        const data = await response.json()
        console.log(data)
        setMyMeme(data)
        setLoading(false)
    }

    const updateMyMeme = async (meme, inputs, positioning) => {
        const token = auth.currentUser.uid
        console.log(token)
        const patchObj = {'memeId' : meme.id, 'token': token, 'inputs': inputs, 'positioning': positioning}
        const response = await fetch(`https://topaz-dented-clove.glitch.me/api/update-meme/${meme.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchObj)
        })
        const data = await response.json()
        console.log(data)
        setLoading(false)
    }

    const deleteMeme = async (id) => {
        const token = auth.currentUser.uid
        await fetch(`https://topaz-dented-clove.glitch.me/api/delete-meme/${id}`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'token': token})  
        })
        setMyMemes(myMemes.filter((meme) => (
            meme.id != id
        )))
        console.log(myMemes)
     }
    


    return (
        <MemeContext.Provider
        value = {{
            logOut,
            memeTemplates,
            getTemplates,
            loading,
            setLoading,
            getTemplate,
            template,
            saveMeme,
            getMyMemes,
            myMemes,
            myMeme,
            updateMyMeme,
            getMyMeme,
            deleteMeme
        }}
        >
            {children}
        </MemeContext.Provider>
    )
}