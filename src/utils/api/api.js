export const API = {
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
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
  try {
    const res = await fetch(API.baseUrl);
    const data = await checkResponse(res);

    return data;
  } catch (error) {
    console.error("error in getBurgerData", error);
  }
};
