
import axios from "axios";

export const api = (token) =>
  axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
