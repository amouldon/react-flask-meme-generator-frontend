import M from '../assets/images/m.png'
import { NavLink, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { MemeContext } from '../Context/MemeContext'

import { useGetAuth } from '../hooks/useGetAuth'
import { auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  const {logOut, setLoading} = useContext(MemeContext)
  const authStatus = JSON.parse(sessionStorage.getItem('loggedInStatus'))

  return (
    <nav className='navbar bg-dark navbar-dark navbar-expand-md py-3'>
    <Link to="/" className="navbar-brand ms-5"><img src={M} alt="M logo" id='navbar-brand' /></Link>
      <button className="navbar-toggler" type='button' data-bs-target='#toggler' data-bs-toggle='collapse'>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-auto" id='toggler'>
        <ul className="navbar-nav ms-auto me-2 ">
        <li className="nav-item">
         <a href="/" className='nav-link px-3'>Home</a> 
        </li>
          {!authStatus ?
          <>
        <li className="nav-item">
          <a href="/sign-in" className='nav-link px-3'>Sign in</a> 
        </li>
        <li className="nav-item">
          <a href="/register" className='nav-link px-3'>Register</a> 
        </li>
          </>
          :
          <>
        <li className="nav-item">
         <a href="/my-memes" className='nav-link px-3'>My memes</a> 
        </li>
        <li className="nav-item">
         <a href="/create" className='nav-link px-3'>Create</a> 
        </li>
        <li className="nav-item">
         <a href="/account" className='nav-link px-3'>Account</a> 
        </li>
        <li className="nav-item px-3">
         <a href="/" className='nav-link' onClick={logOut}>Logout</a> 
        </li>

        </>}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar