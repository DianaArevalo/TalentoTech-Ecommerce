import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.svg";
import carBuy from "../assets/CarBuy.svg";
import moon from "../assets/moon.svg";
import lupa from "../assets/lupa.svg";
import useCart from '../hooks/useCart';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems, validateCart } = useCart();

  const handleCartClick = async () => {
    await validateCart(); // Llama a validateCart para obtener los ítems
    navigate('/cart'); // Redirige a la página del carrito
  };

  return (
    <div className='top-0 relative justify-center place-content-center items-center h-134px flex'>
      <div className='hidden md:flex md:m-5'>
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li className="relative"> {/* Añadido relative para posicionar el número */}
              <button onClick={handleCartClick}>
                <img src={carBuy} alt="Ver carrito" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>
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
  );
};

export default Navbar;