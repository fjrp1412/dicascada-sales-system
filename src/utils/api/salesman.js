const BASE_URL = "https://lambdaapi.azurewebsites.net/api/";

const getSalesmans = async (token, nextUrl) => {
  console.log(nextUrl)
  const url = `${nextUrl ? nextUrl : BASE_URL + `salesman/`  }`;
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
const getSalesman = async (token, id) => {
  const url = `${BASE_URL + `salesman/${id}/`}`;
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

const getSalesmanIndicator = async (token, id) => {
  const url = `${BASE_URL + `salesman/indicator/${id}`}`;
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

const getSalesmanStatistic = async (token, id, type) => {
  const url = `${BASE_URL + `salesman/statistic`}`;
  const body = {
    'salesman_id': parseInt(id),
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

const getSalesmanIA = async (token, id, income) => {
  const url = `${BASE_URL + `salesman/ia`}`;
  const body = {
    'salesman_id': parseInt(id),
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


export { getSalesmans, getSalesman, getSalesmanIndicator, getSalesmanStatistic, getSalesmanIA  };
