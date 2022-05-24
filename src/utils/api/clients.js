const BASE_URL = "https://lambdaapi.azurewebsites.net/api/";

const getClients = async (token, nextUrl) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `client/`  }`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log(data)

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

export { getClients };
