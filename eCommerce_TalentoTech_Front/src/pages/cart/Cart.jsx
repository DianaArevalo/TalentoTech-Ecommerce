import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart'; // Importa el hook useCart
import useInventory from '../../hooks/useInventory'; // Importa el hook useInventory

const Cart = () => {
  const { cartItems, error, validateCart } = useCart(); // Obtén cartItems y error directamente del hook
  const { services } = useInventory(); // Obtén los servicios del inventario

  useEffect(() => {
    const fetchCartItems = async () => {
      await validateCart(); // Llama a validateCart para obtener los ítems
    };

    fetchCartItems();
  }, [validateCart]);

  // Crear un mapa de imágenes de productos
  const inventoryMap = {};
  services.forEach(service => {
    service.derivedProducts.forEach(product => {
      inventoryMap[product.id] = service.imageUrl; // Asigna la imagen del producto principal a cada derivado
    });
  });

  console.log("cartItems in Cart:", cartItems); // Para depuración
  console.log("inventoryMap:", inventoryMap); // Para verificar las imágenes

  return (
    <div className='flex flex-wrap justify-center place-content-center h-full'>
      {/* Título de "Tus Productos en el Carrito" */}
      <div className='w-full text-center mb-5'>
        <h1 className='btn-primary max-w-[150px] mx-auto p-2 mb-5'>
          Mi Carrito
        </h1>
        {error && <p className='text-red-500'>{error}</p>}
      </div>

      {cartItems.length === 0 ? (
        <p className='text-center w-full'>El carrito está vacío.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full'> {/* Ajuste aquí */}
          {cartItems.map((item, index) => (
            <div key={index} className='bg-fourty/50 rounded-md p-2'> {/* Ajusta el tamaño y el padding */}
              <img 
                src={inventoryMap[item.productId] || 'placeholder-image.jpg'} // Usa el ID del producto para obtener la imagen
                alt={item.name || 'Producto'}
                className="w-full object-cover h-49" // Ajusta la imagen
              />
              <h1 className='font-bold mt-2'>{item.name || "Producto sin título"}</h1>
              <p className="ml-2 p-1 font-semibold">Precio: ${item.price.toFixed(2) || 'No disponible'}</p>
              <p className="ml-2 p-1">Cantidad: {item.quantity}</p>
              <div className='text-sm flex flex-wrap space-x-1 p-1'>
                <Link to={`/product/${item.productId}`} className='btn-primary p-2 mb-5'>Detalles...</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;