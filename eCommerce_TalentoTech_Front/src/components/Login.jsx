import { Link } from "react-router-dom"


const Login = () => {
  return (
    
      <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
     <form  className='container md:w-[518px] md:h-[684px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'>
      <div className='p-5 mt-0'>
        <button className='btn-secondary mb-2'>Compra aqui...</button>
      </div>
      <div className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'> 
      {/* <input type="text" placeholder='rol' className='selected-primary'/>      */}

      
      <input type="email" placeholder='email' className='input-primary' />
      <input type="password" placeholder='password' className='input-primary'/>
      <button className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary'>log in</button>
      </div>
      <footer className='p-5 mx-10 bottom-0 anyBox'>
      <Link to="/register" className='btn-secondary mb-5'>¿No tienes cuenta?</Link> 
                    
      </footer>        

     </form>
  
    
    </div>
   
 
  
  )
}

export default Login


