import axios from "axios";

export const logInUser = async (email, password) => {
  const response = await axios.post("/api/login", { email, password });
  return response.data;
};

export const logOutUser = async () => {
  await axios.post("/api/logout");
};

export const signUpUser = async (newUser) => {
  const response = await axios.post("/api/signup", newUser);
  return response.data;
};
