import { auth } from "../firebase.config"
import { useState } from "react"
import { updateEmail, updatePassword} from 'firebase/auth'
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "../components/Spinner"
import { toast } from "react-toastify"

const Account = () => {
    const {loggedIn} = useAuthStatus()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })


    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.id]: e.target.value
        }))
    }

    const onUpdateEmail = async () => {
        try {
              const response = await updateEmail(auth.currentUser, formData.email) 
              toast.success('Email has been updated')
        } catch (err) {
            if (err == 'FirebaseError: Firebase: Error (auth/requires-recent-login).'){
                toast.error('Update failed; please log out and try again')
            } else if (err == 'FirebaseError: Firebase: Error (auth/email-already-in-use).') {
                toast.error('Email is already in use')
            }
        } 
    }

    const onUpdatePassword = async () => {
        if (formData.password === formData.confirmPassword){
            if(formData.password.length < 6){
                toast.error('Password must be atleast 6 characters long')
            } else{
                try {
                    await updatePassword(auth.currentUser, formData.password)
                    toast.success('Password has been updated')
                } catch(err) {
                    if (err == 'FirebaseError: Firebase: Error (auth/requires-recent-login).'){
                        toast.error('Update failed; please log out and try again')}
                }  
            }
        } else {
            toast.error('Passwords do not match')
        }
    }

    if(!loggedIn){return (<Spinner />)}
    else{

  return (
    <div className="container-fluid pt-1">
        <div className="d-flex flex-column border border-4 border-secondary rounded-3 text-center my-3 py-3 w-50 mx-auto">
            <h3 className="pb-3">Update information</h3>
            <label>Email</label>
            <div className="container-fluid mb-2">
                <i className="fa-solid fa-envelope fa-xl pe-2"></i>
                <input id='email' className='form-control w-75 mx-auto' defaultValue={auth.currentUser.email} onChange={onChange}></input>
            </div>
            <label>Update password</label>
            <div className="container-fluid mb-2">
                <i className="fa-solid fa-lock fa-xl pe-2"></i>
                <input id='password' type='password' className='form-control w-75 mx-auto' onChange={onChange}></input>
            </div>
            <label>Confirm new password</label>
            <div className="container-fluid mb-2">
                <i className="fa-solid fa-lock-open fa-xl pe-2"></i>
                <input id='confirmPassword' type='password' className='form-control w-75 mx-auto' onChange={onChange}></input>
            </div>
            <div className="d-flex justify-content-around">
                <button className='btn btn-primary w-25 mt-3 mb-1 mx-auto' onClick={onUpdateEmail} >Update email</button>
                <button  className='btn btn-primary w-25 mt-3 mb-1 mx-auto' onClick={onUpdatePassword} >Update password</button>
            </div>
        </div>
</div>
  )
}}

export default Account