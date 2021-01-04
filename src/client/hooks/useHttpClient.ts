import axios from 'axios';

const useHttpClient = () => {
  return {
    get: async (url: string) => {
      const response = await axios.get(url);
      return response.data;
    },
    post: async (url: string, data: any) => {
      const response = await axios.post(url, data);
      return response.data;
    },
    put: async (url: string, data: any) => {
      const response = await axios.put(url, data);
      return response.data;
    },
    delete: async (url: string) => {
      const response = await axios.delete(url);
      return response.data;
    },
  };
};

export default useHttpClient;
