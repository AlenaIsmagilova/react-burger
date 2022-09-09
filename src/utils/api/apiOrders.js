import { checkResponse } from "./api.js";
import { baseUrl } from "../../constants/constants.js";

const ApiOrders = {
  baseUrl: baseUrl,
};

export function createOrderApi(ingredients, token) {
  return fetch(`${ApiOrders.baseUrl}orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ ingredients }),
  })
    .then(checkResponse)
    .then((data) => data);
}
