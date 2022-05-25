const BASE_URL = "https://lambdaapi.azurewebsites.net/api/";

const getSales = async (token, nextUrl, query) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `sale/?${query}`   }`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log(data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

const getAllSales = async (token, limit) => {
  const url = `${BASE_URL}sale/?limit=1`;
  console.log('limit' ,limit)
  console.log('url', url);
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log('data de all sales',data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }


}

export { getSales, getAllSales };
