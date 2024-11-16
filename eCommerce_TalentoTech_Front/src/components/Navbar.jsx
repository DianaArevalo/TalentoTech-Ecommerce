import { useState } from 'react';
import logo from "../assets/logo.svg";
import carBuy from "../assets/CarBuy.svg";
import moon from "../assets/moon.svg";
import lupa from "../assets/lupa.svg";
import { Link } from 'react-router-dom';
import { useAuthLogin } from '../Context/authContext';

const Navbar = () => {
  const { auth, logout } = useAuthLogin();

  return (
    <div className='top-0 relative justify-center place-content-center items-center h-134px flex'>
      <div className='hidden md:flex md:m-5'>
        <button>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </button>
      </div>

      <div className='flex-row p-4'>
        <div className='p-4'>
          <ol className='flex gap-2 md:gap-14 bg-tertiary w-[274px] md:w-[426px] h-[48px] lg:w-[1000px] lg:gap-44 justify-center items-center place-content-center rounded-md text-white mb-5'>
            <li>
              <Link to="/">Inicio</Link>
            </li>

            <li>
              {auth.isLoggedIn ? (
                <Link to="/login" onClick={logout}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>

            <li>
              <Link to="/products">Productos</Link>
            </li>

            <li>
              {auth.isLoggedIn && (
                <Link to="/orders">
                  Pedidos
                </Link>
              )}
            </li>

            <li>
              {auth.isLoggedIn && (
                <Link to="/orders">
                  <img src={carBuy} alt="Carrito de Compras" />
                </Link>
              )}
            </li>

            <li>
              <p>
                {auth.isLoggedIn ? `Welcome, ${auth.user?.userName}` : 'Welcome, GuardianShop'}
              </p>
            </li>
          </ol>
        </div>

        <div className='hidden md:flex md:bg-tertiary md:text-white md:w-[314px] lg:w-[800px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12'>
          <img src={lupa} alt="Search icon" className='ml-8' />
          <input
            type="text"
            placeholder='Search something...'
            className='md:bg-tertiary md:text-white md:w-[314px] lg:w-[800px] md:h-[48px] rounded-md md:place-content-center md:justify-center md:items-center md:ml-12'
          />
        </div>
      </div>

      <div className='m-8'>
        <button>
          <img src={moon} alt="Moon icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;