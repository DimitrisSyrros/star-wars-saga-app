import axios from 'axios';

const apiService = {
  fetchData: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  },
  fetchDataWithParams: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default apiService;
