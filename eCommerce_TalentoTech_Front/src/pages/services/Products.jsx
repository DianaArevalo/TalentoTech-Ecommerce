import { Link } from 'react-router-dom'
import bgPromo from '../../assets/bgPromo.svg'
import img1 from '../../assets/product-Prueba1.jpg'
import img2 from '../../assets/product-Prueba2.jpg'
import img3 from '../../assets/product-Prueba3.jpg'

const Products = () => {
  return (
    <div className='flex-wrap md:flex-row lg:flex-wrap anyBox justify-center md:justify-start md:place-content-start hidden md:flex'>



      <div className='w-[330px] h-[619px] lg:w-[483px] lg:h-[684px] justify-start place-content-start mr-5'>
        <div className='bg-fourty w-[330px] h-[619px] lg:w-[425px] lg:h-[621px]' style={{backgroundImage: `url(${bgPromo})`}}
        >
          
          <h1 className='text-5xl md:text-7xl p-4 mb-20'>Esta es la promo numero uno de <span className='font-extrabold italic'>hoy</span>.</h1> 
          
        
        <Link to="/" className='p-4 underline'>Explora mas...</Link>
        </div>
        
      </div>
      <div className='w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1'>
        <div className='bg-fourty w-[249px] h-[351px] m-1'>
          <img src={img1} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product one...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1'>Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>

        </div>
        <div className='bg-fourty w-[249px] h-[351px] m-1'>
        <img src={img2} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product two...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1'>Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>

        </div>
        <div className='bg-fourty w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1'>Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>
        <div className='bg-fourty w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1'>Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>
        <div className='bg-fourty w-[249px] h-[351px] m-1'>
        <img src={img3} alt="" width="249px" height="250px" />
          <h1 className='font-bold ml-2'>Title description product three...</h1>
          <div className='justify-between text-sm flex space-x-1 p-1'>
            <Link className='btn-primary p-1'>Details...</Link>
            <Link className='btn-secondary p-1'>Remove ...</Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Products

//