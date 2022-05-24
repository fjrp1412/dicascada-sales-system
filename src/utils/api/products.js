const BASE_URL = "https://lambdaapi.azurewebsites.net/api/";

const getProducts = async (token, nextUrl) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `product/`  }`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();
    console.log(data)
    console.log(request)

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

export { getProducts };
