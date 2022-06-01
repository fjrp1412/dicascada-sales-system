
const BASE_URL = "http://127.0.0.1:8000/api/";

const getOrders = async (token, nextUrl, query) => {
  const url = `${nextUrl ? nextUrl : BASE_URL + `order/?${query}`   }`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log('orders' ,data);

    console.log('token en orders', token)

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

const getOrder = async (token, id) => {
  const url = `${BASE_URL}order/${id}`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log('one order' ,data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

const createOrder = async (token, body) => {
  const url = `${BASE_URL}order/`;
  const products = [];
  body.products.forEach((product) => {
    products.push({
      product: product.product,
      quantity: parseFloat(product.quantity),
      income: product.total.toString(),
      sale: body.id,
    })
  })
  delete body.products
  delete body.income_currency

  let request_order = null;
  let request_products = null;
  let data_order = null;
  let data_products = null;

  console.log('orden en orders api', body)
  console.log("productos del form", products)
  try {
    request_order = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    data_order = await request_order.json();

    console.log('request de order', request_order)

    if(request_order.ok){
      request_products = await fetch(`${BASE_URL}order/product-order`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      data_products = await request_products.json();

      console.log('request de products', request_products)
    }

    return { request: request_products, data: data_products };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}
const createOrderProduct = async (token, body) => {
  const url = `${BASE_URL}order/product-order`;
  try{
    request = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
    })

      console.log('request de products', request)

  } catch (e) {

    return { request: { ok: false, message: e.message } };
  }
}


export { getOrders, getOrder, createOrder };
