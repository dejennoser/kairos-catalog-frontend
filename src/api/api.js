import axios from "axios";

export const apiV1 = (token) =>
  axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const apiV2 = (token) =>
  axios.create({
    baseURL: "http://localhost:8080/api/v2",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });