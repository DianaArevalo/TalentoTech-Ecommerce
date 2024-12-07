import { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart'; // Importa el hook useCart
import useInventory from '../../hooks/useInventory'; // Importa el hook useInventory
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos

const Cart = () => {
  const { cartItems, error, validateCart, updateItemQuantity } = useCart(); // Obtén cartItems y error directamente del hook
  const { services } = useInventory(); // Obtén los servicios del inventario

  const [loading, setLoading] = useState(false);
  const [quantityMap, setQuantityMap] = useState({}); // Estado para manejar las cantidades de productos
  const [removedItems, setRemovedItems] = useState(new Set()); // Estado para manejar productos eliminados
  const [isCartEmpty, setIsCartEmpty] = useState(true); // Estado para determinar si el carrito está vacío

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true); // Activar el indicador de carga
      if (cartItems.length === 0) {
        await validateCart();
        setIsCartEmpty(true); // Si el carrito está vacío después de la validación inicial
      } else {
        setIsCartEmpty(false); // Si hay items en el carrito
      }
      setLoading(false); // Desactivar el indicador de carga
    };

    fetchCartItems();
  }, [cartItems, validateCart]);

  // Crear un mapa de imágenes de productos
  const inventoryMap = services.reduce((map, service) => {
    service.derivedProducts.forEach(product => {
      map[product.id] = service.imageUrl; // Asigna la imagen del producto principal a cada derivado
    });
    return map;
  }, {});

  const handleQuantityChange = (item, newQuantity) => {
    // Asegura que la nueva cantidad sea válida y esté dentro de un rango razonable
    if (newQuantity <= 0) {
      updateItemQuantity({ ...item, quantity: 0 });
      setQuantityMap(prevMap => {
        const newMap = { ...prevMap };
        delete newMap[item.productId]; // Eliminar el producto del estado si su cantidad es 0
        setRemovedItems(prevRemoved => new Set(prevRemoved.add(item.productId))); // Marcar el item como eliminado
        if (Object.keys(newMap).length === 0) setIsCartEmpty(true); // Si el carrito queda vacío, actualiza el estado
        return newMap;
      });
    } else {
      setQuantityMap(prevMap => ({
        ...prevMap,
        [item.productId]: newQuantity
      }));
      updateItemQuantity({ ...item, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (item) => {
    // Elimina el producto del carrito y actualiza el estado de las cantidades
    updateItemQuantity({ ...item, quantity: 0 });
    setQuantityMap(prevMap => {
      const newMap = { ...prevMap };
      delete newMap[item.productId];
      setRemovedItems(prevRemoved => new Set(prevRemoved.add(item.productId))); // Marcar el item como eliminado
      if (Object.keys(newMap).length === 0) setIsCartEmpty(true); // Si el carrito queda vacío, actualiza el estado
      return newMap;
    });
  };

  useEffect(() => {
    // Actualiza el estado isCartEmpty según los items restantes en el carrito
    setIsCartEmpty(cartItems.length === 0);
  }, [cartItems]);

  return (
    <div className='flex flex-wrap justify-center place-content-center h-full'>
      {/* Título de "Tus Productos en el Carrito" */}
      <div className='w-full text-center mb-5'>
        <h1 className='btn-primary max-w-[150px] mx-auto p-2 mb-5'>
          Mi Carrito
        </h1>
        {error && <p className='text-red-500'>{error}</p>}
        {loading && <p className='text-center text-gray-500'></p>}
      </div>

      {isCartEmpty ? (
        <p className='text-center w-full'>El carrito está vacío</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 w-full'>
          {cartItems.map((item, index) => {
            const price = item.price || 130; // Precio base constante para el producto
            const quantity = quantityMap[item.productId] || item.quantity;
            const totalPrice = (price * quantity).toFixed(2); // Cálculo del precio total según la cantidad

            return (
              <div key={index} className={`bg-fourty/50 rounded-md p-2 ${removedItems.has(item.productId) ? 'hidden' : ''}`}>
                <img 
                  src={inventoryMap[item.productId] || 'placeholder-image.jpg'} // Usa el ID del producto para obtener la imagen
                  alt={item.name || 'Producto'}
                  className="w-full object-cover h-49"
                />
                <h1 className='font-bold mt-2'>{item.name || "Producto sin título"}</h1>
                <p className="font-semibold">Precio: ${totalPrice}</p> {/* Muestra el precio total */}
                <p>Cantidad: {quantity}</p>

                {/* Contenedor para los botones de aumentar, disminuir y eliminar */}
                <div className='flex items-center space-x-2'>
                  <button 
                    onClick={() => handleQuantityChange(item, quantity - 1)} 
                    className='btn-primary'
                    disabled={quantity <= 0}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item, quantity + 1)} 
                    className='btn-primary'
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button 
                    onClick={() => handleRemoveItem(item)} 
                    className='btn-primary'
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
