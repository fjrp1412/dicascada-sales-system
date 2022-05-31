const BASE_URL = "http://127.0.0.1:8000/api/";

const getProducts = async (token, nextUrl, query) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `product/?${query}`  }`;
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
