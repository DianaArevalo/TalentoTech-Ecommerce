import { Link } from 'react-router-dom'
import bgPromo from '../../assets/bgPromo.svg'
// import img1 from '../../assets/product-Prueba1.jpg'
// import img2 from '../../assets/product-Prueba2.jpg'
// import img3 from '../../assets/product-Prueba3.jpg'
import useInventory from '../../hooks/useInventory.js';
import useCart from '../../hooks/useCart.js';

const Products = () => {
  const { services, error } = useInventory();
  const { addToCart } = useCart();

    // Función para manejar la adición al carrito
    const handleAddToCart = (product) => {
      addToCart(product);
    };

  return (
    <div className='flex-wrap md:flex-row lg:flex-wrap anyBox justify-center md:justify-start md:place-content-start hidden md:flex'>



      <div className='w-[330px] h-[619px] lg:w-[483px] lg:h-[684px] justify-start place-content-start mr-5'>
        <div className='bg-fourty w-[330px] h-[619px] lg:w-[425px] lg:h-[621px] md:ml-5 lg:ml-10' style={{backgroundImage: `url(${bgPromo})`}}
        >
          
          <h1 className='text-5xl md:text-7xl p-4 mb-20'>Esta es la promo numero uno de <span className='font-extrabold italic'>hoy</span>.</h1> 
          
        
        <Link to="/" className='p-4 underline'>Explora mas...</Link>
        </div>
        
      </div>
      <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>

      {error && <p>{error}</p>}
       

        {services.map((service) => (
           <div key={service.id} className='bg-fourty/50 w-[249px] h-[550px] m-1 justify-center'>
                    <img src={service.imageUrl} alt="" width="249px" height="250px" />
                     <h1 className='font-bold ml-2'>
                      {service.name}
                    </h1>
                    <p className="ml-2 p-1 font-semibold">
                    Precio: ${service.salePrice ? service.salePrice : 'No disponible'}
                  </p>
                    <div className='text-sm flex flex-wrap space-x-1 p-1'>
                          <Link className='btn-primary p-2 mb-5' to={`/productDetails/${service.id}`}>Details...
                          </Link>
                           <Link className='btn-secondary p-2 mb-5'>Remove ...</Link>
                           <button
                    className="btn btn-primary p-2 mb-5"
                    onClick={() => handleAddToCart(service)} // Llamar a la función de agregar al carrito
                  >
                    Agregar al carrito
                  </button>
                    </div>
           </div>     

        ))}      

        

        </div>

      

    </div>
  )
}

export default Products
