import md5 from "md5";

const MODEL = "Usuario";
const API_URL = process.env.REACT_APP_API;
const usuario = getUser();

export async function login(email, password) {
  try {
    let pass = password ? md5(password) : "";
    const object = {
      email: email,
      password: pass,
    };

    const res = await fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg.join("\n") });
    }

    const data = await res.json();

    sessionStorage.setItem(MODEL, JSON.stringify(data));
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout() {
  sessionStorage.clear();
  return;
}

export function getUser() {
  return JSON.parse(sessionStorage.getItem(MODEL) || null);
}

export async function register(send) {
  try {
    const res = await fetch(API_URL + "/registerUser", {
      method: "POST",
      body: JSON.stringify(send),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg.join("\n") });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function validate(send) {
  try {
    const res = await fetch(API_URL + "/validateIdentity", {
      method: "POST",
      body: JSON.stringify(send),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + usuario.token,
      },
    });

    if (!res.ok) {
      const data = JSON.parse(await res.text());
      let msg = [];
      for (let k in data) msg = [...msg, ...data[k]];
      throw Object({ status: res.status, message: msg.join("\n") });
    }
    return Promise.resolve(res.json());
  } catch (error) {
    return Promise.reject(error);
  }
}
