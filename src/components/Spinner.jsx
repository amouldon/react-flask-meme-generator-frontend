import spinner from '../assets/images/spinner.gif'

const Spinner = () => {
  return (
    <div className='d-flex h-100 height'>
        <img src={spinner} className='mx-auto my-auto' style={{width: 150}}/>
    </div>
          
  )
}

export default Spinner