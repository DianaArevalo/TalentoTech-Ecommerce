import {useState} from 'react'
import logo from "../assets/logo.svg"
import carBuy from "../assets/CarBuy.svg"
import moon from "../assets/moon.svg"
import lupa from "../assets/lupa.svg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  return (
    <div className='top-0 relative justify-center place-content-center items-center h-134px flex '>
     <div className='hidden md:flex md:m-5 '>
      <button>
        <Link to="/">
        <img src={logo} alt="" />
        </Link>
     
      </button>      
     </div>
     <div className='flex-row p-4'>
     <div className='p-4'>         
       <ol className='flex gap-2 md:gap-14 bg-tertiary w-[274px] md:w-[426px] h-[48px] lg:w-[1000px] lg:gap-44 justify-center items-center place-content-center rounded-md text-white mb-5'>
        <li>
          <Link to="/">
          Inicio
          </Link>
        </li>
        <li>
          <Link to="/login">
          Log In
          </Link>
        </li>
        <li>
          <Link to="/products">
          Productos
          </Link>
        </li>

        {/* {isAuthenticated && (
          <li>
            <Link to="/orders">
            Pedidos
            </Link>
          </li>
        )} */}
        
        <li>
          <Link to="/login">
          <img src={carBuy} alt="" />
          </Link>
        </li>
       </ol>     
     </div>     

     <div className='hidden md:flex md:bg-tertiary md:text-white md:w-[314px] lg:w-[800px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12'>
      <img src={lupa} alt="" className='ml-8' />
     <input 
      type="text"       
      placeholder='Search something...'
      className='hidden md:flex md:bg-tertiary md:text-white md:w-[314px] lg:w-[800px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12'      
      />
    
      
      </div> 

     

     </div>    
     <div className='m-8'>
      <button>
      <img src={moon} alt="" />
      </button>      
     </div>
    </div>
  )
}

export default Navbar

//w-[193px] h-[43px] p-4 gap-2