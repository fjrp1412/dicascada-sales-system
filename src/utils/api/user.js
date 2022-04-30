const BASE_URL = "https://lambda-sales-system-api.herokuapp.com/api/";

const login = async ({ form }) => {
  const url = BASE_URL + `user/token/`;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const request = await fetch(url, requestOptions);
    if (request.status === 400) {
      throw new Error("Datos invalidos");
    }
    const data = await request.json();
    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

export { login };
