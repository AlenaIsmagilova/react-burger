import { checkResponse } from "./api.js";
import { baseUrl } from "../../constants/constants.js";

const ApiOrders = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
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
