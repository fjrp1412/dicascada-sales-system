const BASE_URL = "http://127.0.0.1:8000/api/";

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

const getSale = async (token, id) => {
  const url = `${BASE_URL}sale/${id}`;
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

const getSalesIA = async (token, income, grouped_by, month, by_month) => {
  const url = `${BASE_URL}sale/ia`;
  const body = {
    'income': income,
    'group_by': grouped_by,
    'month': month,
    'by_month': by_month
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
    // console.log(data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}

const getSalesStatistic = async (token,  year) => {
  const url = `${BASE_URL}sale/statistic`;
  const body = {
    'year': year
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
    console.log(`data del year ${year}`, data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }
}

const getBiggestSale = async (token) => {
  const url = `${BASE_URL}sale/biggest-sale`;
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await request.json();

    console.log('biggest sale',data);

    return { request, data };
  } catch (e) {
    return { request: { ok: false, message: e.message } };
  }

}

export { getSale ,getSales, getAllSales, getSalesIA, getSalesStatistic, getBiggestSale };
