import { auth } from '../firebase.config'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setLoggedIn(true)
      }
      setLoadingAuth(false)
    })
  }, [navigate])
  return {loggedIn, loadingAuth}
}

