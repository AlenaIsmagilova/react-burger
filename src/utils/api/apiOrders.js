import { checkResponse } from "./api.js";
import { baseUrl } from "../../constants/constants.js";
import { getCookie } from "../helpers/index.js";

const ApiOrders = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: getCookie("accessToken"),
  },
};

export function createOrderApi(ingredients) {
  return fetch(`${ApiOrders.baseUrl}orders`, {
    method: "POST",
    headers: ApiOrders.headers,
    body: JSON.stringify({ ingredients }),
  })
    .then(checkResponse)
    .then((data) => data);
}
