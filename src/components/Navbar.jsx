import M from '../assets/images/m.png'
import { NavLink, Link } from 'react-router-dom'
import { useContext } from 'react'
import { MemeContext } from '../Context/MemeContext'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate()
  const {logOut, setLoading} = useContext(MemeContext)
  const authStatus = JSON.parse(sessionStorage.getItem('loggedInStatus'))

  const onClick = () => {
    setLoading(true)
  }

  return (
    <nav className='navbar bg-dark navbar-dark navbar-expand-md py-3'>
    <Link to="/" className="navbar-brand ms-5"><img src={M} alt="M logo" id='navbar-brand' /></Link>
      <button className="navbar-toggler" type='button' data-bs-target='#toggler' data-bs-toggle='collapse'>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-auto" id='toggler'>
        <ul className="navbar-nav ms-auto me-2 ">
        <li className="nav-item">
         <NavLink to="/" className='nav-link px-3'>Home</NavLink> 
        </li>
          {!authStatus ?
          <>
        <li className="nav-item">
          <NavLink to="/sign-in" className='nav-link px-3'>Sign in</NavLink> 
        </li>
        <li className="nav-item">
          <NavLink to="/register" className='nav-link px-3'>Register</NavLink> 
        </li>
          </>
          :
          <>
        <li className="nav-item">
         <NavLink to="/my-memes" className='nav-link px-3' onClick={onClick}>My memes</NavLink> 
        </li>
        <li className="nav-item">
         <NavLink to="/create" className='nav-link px-3' onClick={onClick}>Create</NavLink> 
        </li>
        <li className="nav-item">
         <NavLink to="/account" className='nav-link px-3'>Account</NavLink> 
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