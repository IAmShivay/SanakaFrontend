import axios from "axios";

interface Credentials {
  name: string;
  email: string;
  phoneNumber: string;
}

export const Leads = async (credentials: Credentials) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/form`,
        credentials
      );
      console.log("Form Data response:", response.data);
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
  