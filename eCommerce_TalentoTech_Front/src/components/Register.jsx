import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utilities/ConfigAxios'

const Register = () => {

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); //hook

const handleRegister = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post('/auth/register', {
      user,
      name,
      lastname,
      email,
      password,
    });
    if (response.status === 201) {
      // Usuario registrado con éxito
      setSuccessMessage('Usuario registrado con éxito. Puedes iniciar sesión ahora.');
      setErrorMessage('');
      navigate('/'); // Redirigir a la página de login
    }
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      setErrorMessage(error.response.data.message || 'Error al registrar el usuario.');
    } else {
      setErrorMessage('Error de red. Inténtalo de nuevo.');
    }
    setSuccessMessage('');
  }
}

  return (
    <div>
        <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
     <form  onSubmit={handleRegister} className='container md:w-[518px] md:h-[684px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'>
     
      <div className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'> 
      {/* <input type="text" placeholder='rol' className='selected-primary'/>      */}

      <input 
      type="text" 
      placeholder='user' 
      className='input-primary'
      value={user}
      onChange={(e) => setUser(e.target.value)}
      />

      <input 
      type="text" 
      placeholder='name' 
      className='input-primary'      
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

      <input 
      type="lastname" 
      placeholder='lastname' 
      className='input-primary'
      value={lastname}
      onChange={(e)=> setLastname(e.target.value)}
      />


      <input 
      type="email" 
      placeholder='email' 
      className='input-primary'
      value={email} 
      onChange={(e)=> setEmail(e.target.value)}
      />

      <input 
      type="password" 
      placeholder='password' 
      className='input-primary'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button 
        type='submit' 
        className='w-[193px] h-[43px] md:w-[360px] md:h-[48px] btn-primary mb-5'
            >
              {successMessage ? 'Enviado' : 'Enviar'}
      </button>

      {/* Mensajes de error y éxito */}
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}

      </div>


      <footer className='p-2 mx-10 bottom-0'>
      <Link to="/" className='btn-secondary mb-5 place-content-center items-center'>Ya tengo una cuenta</Link> 
                    
      </footer>        

     </form>
  
    
    </div>
    </div>
  )
}

export default Register
