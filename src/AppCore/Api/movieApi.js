import axios from 'axios';

/**
 * An API service to perform GET requests and return data from a given URL.
 */
const apiService = {
  fetchData: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default apiService;
