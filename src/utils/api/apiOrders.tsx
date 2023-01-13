import { checkResponse } from "./api";
import { baseUrl } from "../../constants/constants";
import { TIngredientItem } from "../../components/BurgerIngredients/types";

const ApiOrders = {
  baseUrl: baseUrl,
};

export function createOrderApi(
  ingredients: TIngredientItem["_id"],
  token: string
) {
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
