import { baseUrl } from "../../constants/constants";
import { getCookie } from "../helpers";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export async function checkResponse(res) {
  const parsedJson = await res.json();
  if (res.ok) {
    return parsedJson;
  }
  return Promise.reject(parsedJson);
}

export const getBurgerData = async () => {
  const res = await fetch(`${API.baseUrl}ingredients`);
  const data = await checkResponse(res);

  return data;
};

export const forgotPassword = (email) => {
  return fetch("https://norma.nomoreparties.space/api/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(checkResponse)
    .then((data) => data);
};

export const resetPassword = (form) => {
  return fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: form.password,
      token: form.token,
    }),
  })
    .then(checkResponse)
    .then((data) => data);
};

export const signUpApi = (form) => {
  return fetch("https://norma.nomoreparties.space/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      name: form.name,
    }),
  }).then(checkResponse);
};

export const signInApi = (form) => {
  return fetch("https://norma.nomoreparties.space/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  }).then(checkResponse);
};

export const getUser = () => {
  return fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  }).then(checkResponse);
};

export const logOutApi = (refreshToken) => {
  return fetch("https://norma.nomoreparties.space/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
};

export const updateTokenApi = () => {
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then(checkResponse);
};

export const updateUserApi = (form) => {
  return fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  }).then(checkResponse);
};
