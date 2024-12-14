import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Global } from '../helpers/Global';
import { jwtDecode } from 'jwt-decode';
import { setOrderDetails, setError, setSuccessMessage } from '../redux/orderSlice';

const useOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const error = useSelector((state) => state.order.error);
  const successMessage = useSelector((state) => state.order.successMessage);

  const isTokenValid = (token) => {
    try {
      if (token.split(".").length !== 3) {
        return false;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp >= currentTime;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return false;
    }
  };

  const createOrder = async () => {
    const token = localStorage.getItem("authToken");

    if (!token || !isTokenValid(token)) {
      navigate("/login");
      console.error("Token no disponible o inválido");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = parseInt(decodedToken.sub);
      const userNamePayload = { id: userId };
      const base64UserNamePayload = btoa(JSON.stringify(userNamePayload));

      const userNameResponse = await axios.post(
        Global.url + "users/list/id",
        base64UserNamePayload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userNameData = JSON.parse(atob(userNameResponse.data));
      const { userName } = userNameData.data;

      const orderPayload = {
        userId,
        createUser: userName,
      };

      const base64OrderPayload = btoa(JSON.stringify(orderPayload));

      const response = await axios.post(
        Global.url + "orders/addRecord",
        base64OrderPayload,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const base64Data = response.data;
      if (base64Data && base64Data.length % 4 === 0) {
        const jsonString = atob(base64Data);
        const orderData = JSON.parse(jsonString);
        dispatch(setOrderDetails(orderData));
        const pdfBlob = new Blob([orderData.pdf], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = pdfUrl;
        a.download = 'order_receipt.pdf'; 
        a.click();
        URL.revokeObjectURL(pdfUrl);
        dispatch(setSuccessMessage('Orden creada exitosamente'));
      } else {
        console.error("Invalid Base64 string:", base64Data);
        dispatch(setError("Invalid data format from server"));
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      dispatch(setError("Error al crear la orden"));
    }
  };
  return {
    createOrder,
    orderDetails,
    error,
    successMessage,
  };
};
export default useOrder;