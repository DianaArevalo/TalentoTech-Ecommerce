import React from 'react'
import logo from "../assets/logo.svg"
import moon from "../assets/moon.svg"

const Navbar = () => {
  return (
    <div className='top-0 relative justify-between h-134px flex '>
     <div className='m-5'>
      <button>
      <img src={logo} alt="" />
      </button>      
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
