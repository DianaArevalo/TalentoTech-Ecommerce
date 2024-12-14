import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOrder from '../../hooks/useOrder';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const { createOrder, error, successMessage } = useOrder();
  const orderDetails = useSelector((state) => state.order.orderDetails);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center' });
    } else if (successMessage) {
      toast.success(successMessage, { position: 'top-center' });
    }
  }, [error, successMessage]);

  useEffect(() => {
    createOrder();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <ToastContainer />
      <div className="bg-fourty flex items-center justify-center mb-4 w-full max-w-screen-lg h-64">
        <h2 className="text-2xl md:text-4xl lg:text-5xl text-center">
          Detalles de <span className="font-extrabold italic">la Orden</span>
        </h2>
      </div>

      {orderDetails ? (
        <div className="bg-fourty/50 p-4 flex flex-col items-center shadow rounded-lg w-full max-w-md">
          <p className="font-bold text-center text-sm sm:text-base md:text-lg"><strong>Número de Orden:</strong> {orderDetails.orderNumber}</p>
          <p className="font-semibold text-center text-xs sm:text-sm md:text-base"><strong>Nombre del Producto:</strong> {orderDetails.productName}</p>
          <p className="font-semibold text-center text-xs sm:text-sm md:text-base"><strong>Cantidad:</strong> {orderDetails.quantity}</p>
          <p className="font-semibold text-center text-xs sm:text-sm md:text-base"><strong>Precio Unitario:</strong> ${orderDetails.unitPrice}</p>
          <p className="font-semibold text-center text-xs sm:text-sm md:text-base"><strong>Precio Total:</strong> ${orderDetails.totalPrice}</p>
          <p className="font-semibold text-center text-xs sm:text-sm md:text-base"><strong>ID de Usuario:</strong> {orderDetails.userId}</p>
        </div>
      ) : (
        <p className="text-center text-lg">Cargando detalles de la orden...</p>
      )}
    </div>
  );
};

export default OrderDetails;