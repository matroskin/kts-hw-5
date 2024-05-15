import axios from 'axios';
import { API_URL, GITHUB_API_TOKEN } from 'config/github';

class ApiStore {
  get = async (url: string, params?: any) => {
    return await axios.get(`${API_URL}${url}`, {
      headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` },
      params: params,
    });
  };
}

export default new ApiStore();
