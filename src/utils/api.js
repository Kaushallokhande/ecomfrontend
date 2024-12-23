async function callApi(route, payload, method) {
    try {
      const response = await fetch(`http://192.168.26.48:8005/api${route}`, {
        // const response = await fetch(`https://backend.amorr.in/api${route}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload ? JSON.stringify(payload) : null,
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `API Error: ${response.status} - ${response.statusText}`,
          errorText,
        );
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error making API request:', error, 'hh');
      throw error;
    }
  }
  
  export default callApi;
  