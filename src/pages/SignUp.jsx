import { createUserWithEmailAndPassword } from 'firebase/auth'
import {useState} from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase.config'
import {toast} from 'react-toastify'

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const {email, password, confirmPassword} = formData
    
    const onSubmit = async (e) => {
        e.preventDefault()
    if(password === confirmPassword){
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            sessionStorage.setItem('loggedInStatus', JSON.stringify(true))
            const user = JSON.parse(sessionStorage.getItem('firebase:authUser:AIzaSyCcoR5lDGbmP8eGhgETZcbt4jVbFLc0ZBU:[DEFAULT]'))
            sessionStorage.setItem('uid', user.uid)
            console.log(auth.currentUser)
            toast.success('You have successfully created an account; let the memes begin')
            navigate('/')
        } catch(error) {
            if (error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
                toast.error('Email is already in use')}
            else if (error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).'){
            toast.error('Password must be atleast 6 characters')
           } else{
            toast.error('Invalid input')
           }
        }  
    } else {
        toast.error('Passwords do not match')
    }
    }

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value
        }))
    }

    return (
      <div className="container-fluid pt-1">
      <form onSubmit={onSubmit}>
          <div className="d-flex flex-column border border-4 border-secondary rounded-3 text-center my-3 py-3 w-50 mx-auto">
              <h3 className="pb-3">Sign up</h3>
              <label>Email</label>
              <div className="container-fluid mb-2">
                  <i className="fa-solid fa-envelope fa-xl pe-2"></i>
                  <input id='email' className='form-control w-75 mx-auto' onChange={onChange}></input>
              </div>
              <label>Password</label>
              <div className="container-fluid mb-2">
                  <i className="fa-solid fa-lock fa-xl pe-2"></i>
                  <input id='password' type='password' className='form-control w-75 mx-auto' onChange={onChange}></input>
              </div>
              <label>Confirm Password</label>
              <div className="container-fluid mb-2">
                  <i className="fa-solid fa-lock-open fa-xl pe-2"></i>
                  <input id='confirmPassword' type='password' className='form-control w-75 mx-auto' onChange={onChange}></input>
              </div>
              <button type='submit' className='btn btn-primary w-25 mt-3 mb-1 mx-auto'>Submit</button>
          </div>
      </form>
  </div>
    )
  }
  
  export default SignUp
  
  