
import { Link} from 'react-router-dom'
import useRegister from '../../hooks/useRegister';


const Register = () => {
    const {
        formData,
        message,
        passwordsMatch,
        handleInputChange,
        validatePasswords,
        handleRegister,
        successMessage,
        errorMessage,
    } = useRegister();

  return (
    <div>
        <div className='container mx-auto mt-5 md:justify-center xl:top-0 md:top-2 sm:top-10 m-8 anyBox'>
     <form  onSubmit={handleRegister} className='container md:w-[518px] md:h-[684px] w-[306px] h-[464px] bg-fourty shadow-2xl rounded-sm text-sm md:text-xl anyBox'>
     
      <div 
      onSubmit={handleRegister}
      className='anyBox flex-row w-[193px] h-[252px] mx-10 md:ml-18 p-5'
      > 
      {/* <input type="text" placeholder='rol' className='selected-primary'/>      */}

      <input 
      type="text"
      name="userName"
      placeholder="Username"
      value={formData.userName}
      onChange={handleInputChange}
      className='input-primary'
      required
      
      
      />

      <input  
           
      type="text"
      name="name"
      placeholder="First Name"
      value={formData.name}
      onChange={handleInputChange}
      className='input-primary'
      required
      />

      <input 
       type="text"
       name="lastName"
       placeholder="Last Name"
       value={formData.lastName}
       onChange={handleInputChange}
       className='input-primary'
       required      
      />


      <input 
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        className='input-primary'
        required
     
     
      />

      <input 
       type="password"
       name="newPassword"
       placeholder="Password"
       value={formData.newPassword}
       onChange={handleInputChange}
       onBlur={validatePasswords}
       className='input-primary'
       required
      />

<input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={validatePasswords}
            className='input-primary'
                    required
                />
                 {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}

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
      {/* <Link to="/" className='btn-secondary mb-5 place-content-center items-center'>Ya tengo una cuenta</Link>  */}
                    
      </footer>        

     </form>
     {message && <p>{message}</p>}
  
    
    </div>
    </div>
  )
}

export default Register
