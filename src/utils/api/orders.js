
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


export { getOrders, getOrder };
