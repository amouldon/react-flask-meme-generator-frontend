import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MyMemes from './pages/MyMemes'
import Navbar from './components/Navbar'
import Account from './pages/Account'
import EditMeme from './pages/EditMeme'
import ChooseTemplate from './pages/ChooseTemplate'
import MemeTemplate from './pages/MemeTemplate'
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { MemeProvider } from './Context/MemeContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <MemeProvider>
    <Router>
      <Navbar />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/create' element={<ChooseTemplate loading={true}/>} />
        <Route path='/meme/:handle' element={<MemeTemplate/>} />
        <Route path='/my-memes' element={<MyMemes />} />
        <Route path='/edit-meme/:handle/:index' element={<EditMeme />} /> 
        <Route path='/account' element={<Account />} />
      </Routes>
    </Router>
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
    </MemeProvider>

  )
}

export default App;
