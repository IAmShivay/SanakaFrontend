import axios from "axios";

interface Credentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;  // Fallback to local URL if env var is not set

export const Register = async (credentials: Credentials) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/register`, credentials);
    console.log("Registration response:", response.data);
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

export const Login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${apiBaseUrl}/login`, credentials);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
      throw errorMessage;
    }
  }
};
