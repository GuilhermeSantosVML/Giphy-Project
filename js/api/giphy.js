/**
 * Fetches data from a specified API endpoint
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<any>} The parsed JSON response from the API
 * @throws {Error} If the network response is not OK or if there's any other error
 */
async function fetchFromAPI(url) {
    try {
      // Attempt to fetch data from the provided URL
      const response = await fetch(url);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the response body as JSON
      const data = await response.json();
  
      // Return the parsed data
      return data;
  
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
      // Re-throw the error so it can be handled by the calling code
      throw error;
    }
  }