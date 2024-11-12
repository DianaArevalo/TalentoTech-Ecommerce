import { Link } from 'react-router-dom'
import bgPromo from '../../assets/bgPromo.svg'
import img1 from '../../assets/product-Prueba1.jpg'
import img2 from '../../assets/product-Prueba2.jpg'
import img3 from '../../assets/product-Prueba3.jpg'

const ProductDetails = () => {
  return (
    <div className='flex-wrap md:flex-row lg:flex-wrap anyBox justify-center md:justify-start md:place-content-start hidden md:flex'>

    <div className='w-[330px] h-[619px] lg:w-[483px] lg:h-[684px] justify-start place-content-start mr-5 mb-5'>
      <div className='bg-fourty w-[330px] h-[619px] lg:w-[425px] lg:h-[621px] md:ml-5 lg:ml-10' style={{backgroundImage: `url(${bgPromo})`}}
      >
        
        <h1 className='text-5xl md:text-7xl p-4 mb-20'>Esta es la promo numero uno de <span className='font-extrabold italic'>hoy</span>.</h1> 
        
      
      <Link to="/" className='p-4 underline'>Explora mas...</Link>
      </div>
      
    </div>
    <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>
    <div className='bg-fourty/50 w-[330px] h-[800px] md:w-[490px] md:h-[px] lg:w-[905px] lg:h-[413px] flex flex-wrap justify-center place-content-start'>     
      <div className='w-[330px] h-[475px] p-5'>
      <div className='mb-5 font-extrabold'>Title description product one...</div>
      <p className='text-sm mb-5'>Lorem ipsum dolor,vitae! Facilis officiis animi ut odit! Deserunt officiis excepturi sequi quaerat in nesciunt quae non illum aspernatur.</p>
      <div className='flex flex-wrap justify-between place-content-start p-5'>
        <Link to="/products" className='btn-secondary text-sm mb-5'>more products...</Link>
        <Link to="/orders" className='btn-primary p-2 text-sm'>Add to cart ...</Link>
      </div>
      </div>
      <img src={img1} alt="" height="348px" width="330px" />
      
    </div>

    <div className='anyBox'>
    <div className='bg-white w-[330px] h-[100px] md:w-[490px] md:h-[79px] lg:w-[898px] lg:h-[79px] justify-center place-content-center anyBox'>
      <h1 className='bg-fourty w-[292px] h-[50px] md:w-[482px] md:h-[45px] rounded-md justify-center place-content-center anyBox'>Adquirir mas productos...</h1>
    </div>
    <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>
        <div className='bg-fourty/50 w-[249px] h-[351px] m-1'>
          <img src={img1} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product one...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
          <Link className='btn-primary p-1' to="/productDetails">Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
         

        </div>
        <div className='bg-fourty/50  w-[249px] h-[351px] m-1'>
        <img src={img2} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product two...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1' to="/productDetails">Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>

        </div>
        <div className='bg-fourty/50  w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
          <Link className='btn-primary p-1' to="/productDetails">Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>
        <div className='bg-fourty/50  w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
          <Link className='btn-primary p-1' to="/productDetails">Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>
        <div className='bg-fourty/50  w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
          <Link className='btn-primary p-1' to="/productDetails">Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>

      </div>
    </div>

    </div>

  </div>
  )
}

export default ProductDetails
