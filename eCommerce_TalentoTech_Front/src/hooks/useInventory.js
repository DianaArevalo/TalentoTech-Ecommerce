import { useState, useEffect } from 'react';

const useInventory = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const payload = { page: 1 };
        const base64Payload = btoa(JSON.stringify(payload));

        const response = await fetch('https://backend-guardianshop.onrender.com/services/list/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: base64Payload,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const base64Data = await response.text();
        const jsonString = atob(base64Data);
        const data = JSON.parse(jsonString);

        setServices(data.data.content);
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
