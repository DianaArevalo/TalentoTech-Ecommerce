import { useState } from "react";
import bgPromo from "../../assets/bgPromo.svg";
import useInventory from "../../hooks/useInventory.js";
import useCart from "../../hooks/useCart.js";

const Products = () => {
  const { services, error } = useInventory();
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (serviceId, reference) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [serviceId]: reference,
    }));
  };

  const handleAddToCart = (service) => {
    const selectedReference = selectedSizes[service.id];
    if (!selectedReference) {
      alert("Por favor, selecciona una talla antes de agregar al carrito.");
      return;
    }

    const selectedProduct = service.derivedProducts.find(
      (product) => product.reference === selectedReference
    );

    if (!selectedProduct) {
      alert("Producto derivado no encontrado.");
      return;
    }

    const productToCart = {
      ...service,
      inventoryId: selectedProduct.id,
      selectedReference,
    };

    addToCart(productToCart);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Promo banner */}
      <div
        className="bg-fourty flex items-center justify-center mb-4 w-full max-w-screen-lg h-64"
        style={{
          backgroundImage: `url(${bgPromo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-center">
          Esta es la promo de <span className="font-extrabold italic">hoy</span>.
        </h1>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-screen-lg px-2 sm:px-4">
        {error && <p>{error}</p>}

        {services.map((service) => (
          <div
            key={service.id}
            className="bg-fourty/50 p-4 flex flex-col items-center shadow rounded-lg"
          >
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-49 object-cover mb-4 rounded"
            />
            <h1 className="font-bold text-center text-sm sm:text-base md:text-lg">
              {service.name}
            </h1>
            <p className="font-semibold text-center text-xs sm:text-sm md:text-base">
              Precio: ${service.salePrice ? service.salePrice : "No disponible"}
            </p>
            <div className="w-full mt-2">
              <label
                htmlFor={`size-select-${service.id}`}
                className="block font-medium mb-1 text-xs sm:text-sm"
              >
                {service.categoryId === 3
                  ? "Seleccionar Almacenamiento:"
                  : "Seleccionar talla:"}
              </label>
              <select
                id={`size-select-${service.id}`}
                className="w-full p-2 border rounded text-xs sm:text-sm"
                value={selectedSizes[service.id] || ""}
                onChange={(e) => handleSizeChange(service.id, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {service.derivedProducts &&
                service.derivedProducts.length > 0 ? (
                  service.derivedProducts.map((derivative) => (
                    <option key={derivative.id} value={derivative.reference}>
                      {derivative.reference}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No hay disponibles
                  </option>
                )}
              </select>
            </div>
            <div className="mt-4 w-full">
              <button
                className="btn btn-primary p-2 w-full whitespace-nowrap text-xs sm:text-sm"
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
