import axios from "axios";

const ML_API = "http://localhost:5000";

export const predictSales = async (numbers) => {
  return axios.post(`${ML_API}/forecast`, {
    last_6_months: numbers,
  });
};