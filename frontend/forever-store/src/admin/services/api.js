import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const predictSales = (data) => {

  return API.post("/forecast", {
    last_6_months: data,
  });
};

export const inspectPackage = (image) => {

  const formData = new FormData();

  formData.append("image", image);

  return API.post("/inspect", formData, {

    headers: {
      "Content-Type": "multipart/form-data",
    },

  });
};