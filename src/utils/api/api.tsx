import { baseUrl } from "../../constants/constants";
import { getCookie } from "../helpers";
import { IRegisterForm, IResetPassword, ISignUpForm } from "../types";

export const API = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export async function checkResponse(res: Response): Promise<any> {
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

export const forgotPassword = (email: string): Promise<any> => {
  return fetch(`${API.baseUrl}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then(checkResponse)
    .then((data) => data);
};

export const resetPassword = (form: IResetPassword): Promise<any> => {
  return fetch(`${API.baseUrl}password-reset/reset`, {
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

export const signUpApi = (form: ISignUpForm): Promise<any> => {
  return fetch(`${API.baseUrl}auth/register`, {
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

export const signInApi = (form: IRegisterForm): Promise<any> => {
  return fetch(`${API.baseUrl}auth/login`, {
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

export const getUser = (): Promise<any> => {
  return fetch(`${API.baseUrl}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    } as HeadersInit,
  }).then(checkResponse);
};

export const logOutApi = (refreshToken: string): Promise<any> => {
  return fetch(`${API.baseUrl}auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(checkResponse);
};

export const updateTokenApi = (): Promise<any> => {
  return fetch(`${API.baseUrl}auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  }).then(checkResponse);
};

export const updateUserApi = (form: ISignUpForm): Promise<any> => {
  return fetch(`${API.baseUrl}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  }).then(checkResponse);
};
