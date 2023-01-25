import { Link } from 'react-router-dom'



const Home = () => {
  const authStatus = JSON.parse(sessionStorage.getItem('loggedInStatus'))
  
  return (
<div className="container-fluid d-flex flex-column text-center">
    <h1 className="display-1 mb-2">Meme generator</h1>
    <p>Become the master of memery</p>
    <div className="d-flex justify-content-center">
      {!authStatus ?
      <>
       <Link to="/sign-in" type='button' className="btn btn-lg btn-dark rounded-pill m-5 w-25">Sign in</Link>
       <Link to="/register" type='button' className="btn btn-lg btn-dark rounded-pill m-5 w-25">Create an account</Link>
       </>
       :
       <>
       <Link to="/my-memes" type='button' className="btn btn-lg btn-dark rounded-pill m-5 w-25">My memes</Link>
       <Link to="/create" type='button' className="btn btn-lg btn-dark rounded-pill m-5 w-25">Create memes</Link>
       </>
    }

    </div>

</div>

  )
}

export default Home