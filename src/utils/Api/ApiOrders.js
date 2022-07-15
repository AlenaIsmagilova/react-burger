const ApiOrders = {
  baseUrl: "https://norma.nomoreparties.space/api/orders",
  headers: {
    "Content-Type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function createOrderApi(ingredients) {
  return fetch(ApiOrders.baseUrl, {
    method: "POST",
    headers: ApiOrders.headers,
    body: JSON.stringify({ ingredients }),
  })
    .then(checkResponse)
    .then((data) => data);
}
