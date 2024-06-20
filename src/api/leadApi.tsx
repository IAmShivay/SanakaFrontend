import axios from "axios";

interface Credentials {
  name: string;
  email: string;
  phoneNumber: string;
}
const API_URL = import.meta.env.VITE_API_URL;

export const Leads = async (credentials: Credentials) => {
  try {
    const response = await axios.post(`${API_URL}/form`, credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      throw errorMessage;
    }
    return error;
  }
};
