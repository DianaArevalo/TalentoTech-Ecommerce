import { useState } from 'react';
import { Link } from 'react-router-dom';
import bgPromo from '../../assets/bgPromo.svg';
import useInventory from '../../hooks/useInventory.js';
import useCart from '../../hooks/useCart.js';

const Products = () => {
  const { services, error } = useInventory();
  const { addToCart } = useCart();

  const [selectedSizes, setSelectedSizes] = useState({});

  // Manejar el cambio de selección de talla (referencia)
  const handleSizeChange = (serviceId, reference) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [serviceId]: reference, // Se guarda la referencia seleccionada en vez de una talla
    }));
  };

  // Manejar la adición al carrito
  const handleAddToCart = (service) => {
    const selectedReference = selectedSizes[service.id];
    if (!selectedReference) {
      alert('Por favor, selecciona una talla antes de agregar al carrito.');
      return;
    }
  
    // Encontrar el producto derivado que corresponde a la referencia seleccionada
    const selectedProduct = service.derivedProducts.find(
      (product) => product.reference === selectedReference
    );
  
    if (!selectedProduct) {
      alert('Producto derivado no encontrado.');
      return;
    }
  
    // Crear el objeto que se pasará a addToCart
    const productToCart = {
      ...service,
      inventoryId: selectedProduct.id, // Usar el ID del producto derivado como inventoryId
      selectedReference, // Incluir la referencia seleccionada
    };
  
    addToCart(productToCart);
  };

  return (
    <div className="flex-wrap md:flex-row lg:flex-wrap anyBox justify-center md:justify-start md:place-content-start hidden md:flex">
      <div className="w-[330px] h-[619px] lg:w-[483px] lg:h-[684px] justify-start place-content-start mr-5">
        <div
          className="bg-fourty w-[330px] h-[619px] lg:w-[425px] lg:h-[621px] md:ml-5 lg:ml-10"
          style={{ backgroundImage: `url(${bgPromo})` }}
        >
          <h1 className="text-5xl md:text-7xl p-4 mb-20">
            Esta es la promo numero uno de <span className="font-extrabold italic">hoy</span>.
          </h1>

          <Link to="/" className="p-4 underline">
            Explora más...
          </Link>
        </div>
      </div>

      <div className="w-[330px] md:w-[530px] lg:w-[957px] h-full flex flex-wrap justify-center place-content-start p-1">
        {error && <p>{error}</p>}

        {services.map((service) => (
          <div key={service.id} className="bg-fourty/50 w-[249px] h-[550px] m-1 justify-center">
            <img src={service.imageUrl} alt="" width="249px" height="250px" />
            <h1 className="font-bold ml-2">{service.name}</h1>
            <p className="ml-2 p-1 font-semibold">
              Precio: ${service.salePrice ? service.salePrice : 'No disponible'}
            </p>
            <div className="ml-2">
              <label htmlFor={`size-select-${service.id}`} className="block font-medium mb-1">
                Seleccionar talla:
              </label>
              <select
                id={`size-select-${service.id}`}
                className="block w-full p-2 border rounded"
                value={selectedSizes[service.id] || ''}
                onChange={(e) => handleSizeChange(service.id, e.target.value)}
              >
                <option value="">Selecciona una talla</option>
                {/* Asegúrate de que los derivados estén correctamente asignados */}
                {service.derivedProducts && service.derivedProducts.length > 0 ? (
                  service.derivedProducts.map((derivative) => (
                    <option key={derivative.id} value={derivative.reference}>
                      {derivative.reference}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No hay tallas disponibles</option>
                )}
              </select>
            </div>
            <div className="text-sm flex flex-wrap space-x-1 p-1">
              <Link className="btn-primary p-2 mb-5" to={`/productDetails/${service.id}`}>
                Detalles...
              </Link>
              <button
                className="btn btn-primary p-2 mb-5"
                onClick={() => handleAddToCart(service)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
