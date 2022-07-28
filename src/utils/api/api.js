import { baseUrl } from "../../constants/constants";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const getBurgerData = async () => {
  const res = await fetch(`${API.baseUrl}ingredients`);
  const data = await checkResponse(res);

  return data;
};
