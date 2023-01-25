import { auth } from '../firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {useState} from 'react'
import { useNavigate } from 'react-router'
import {toast} from 'react-toastify'

const SignIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password} = formData
    
    const onSubmit = async (e) => {
        e.preventDefault()
    if(email && password){
        try{
            await signInWithEmailAndPassword(auth, email, password)
            sessionStorage.setItem('loggedInStatus', JSON.stringify(true))
            navigate('/')
        } catch(error) {
            if (error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
                toast.error('Incorret username or password')}
        }  
    } else {
        toast.error('Invalid input')
    }
    }

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value
        }))
    }
    return (
      <div className="container-fluid pt-4">
      <form onSubmit={onSubmit}>
          <div className="d-flex flex-column border border-4 border-secondary rounded-3 text-center my-3 py-3 w-50 mx-auto">
              <h3 className="pb-3">Sign in</h3>
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
              <button className='btn btn-primary w-25 mt-3 mb-1 mx-auto'>Submit</button>
          </div>
      </form>
  </div>
    )
  }
  
  export default SignIn
  
  