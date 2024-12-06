import { useState, useEffect } from 'react';
import { Global } from '../helpers/Global';

const useInventory = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const payload = { page: 1 };
        const base64Payload = btoa(JSON.stringify(payload));

        const response = await fetch(Global.url + 'services/list/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: base64Payload,
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de productos principales');
        }

        const base64Data = await response.text();
        const jsonString = atob(base64Data);
        const data = JSON.parse(jsonString);

        const mainServices = data.data.content || [];
        const servicesWithDerivatives = [];

        for (const service of mainServices) {
          const derivativePayload = { id: service.id }; 
          const base64DerivativePayload = btoa(JSON.stringify(derivativePayload));

          const derivativeResponse = await fetch(Global.url + 'services/inventory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: base64DerivativePayload,
          });

          if (!derivativeResponse.ok) {
            console.warn(`Error fetching derivatives for product ${service.id}`);
            continue; 
          }

          const derivativeBase64Data = await derivativeResponse.text();
          const derivativeJsonString = atob(derivativeBase64Data);
          const derivativeData = JSON.parse(derivativeJsonString);
        
          service.derivedProducts = derivativeData.data.inventories || [];
          servicesWithDerivatives.push(service);
        }

        setServices(servicesWithDerivatives);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error fetching services');
      }
    };

    fetchServices();
  }, []);

  return { services, error };
};

export default useInventory;