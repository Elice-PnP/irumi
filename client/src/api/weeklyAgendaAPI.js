import axios from "axios";

export const fetchAgenda = async (date) => {
  const response = await axios.get(`/api/agenda?date=${date}`);
  return response.data;
};
