const BASE_URL = "http://127.0.0.1:8000/api/";

const getClients = async (token, nextUrl, query) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `client/?${query}`}`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();


    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
};

const getClient = async (token, id) => {
  const url = `${BASE_URL + `client/${id}/`}`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();
    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
} 

const getClientIndicator = async (token, id) => {
  const url = `${BASE_URL + `client/indicator/${id ? id : ''}`}`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();
    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}

const getClientStatistic = async (token, id, type) => {
  const url = `${BASE_URL + `client/statistic`}`;
  const body = {
    'client_id': parseInt(id),
    'type': type,
  }

  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    console.log(data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}

const getClientIA = async (token, id, income) => {
  const url = `${BASE_URL + `client/ia`}`;
  const body = {
    'client_id': parseInt(id),
    'income': !!income,
  }
  try {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}


export { getClients, getClient, getClientIndicator, getClientStatistic, getClientIA };
