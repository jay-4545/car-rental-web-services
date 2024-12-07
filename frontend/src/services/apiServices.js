const BASE_URL = "http://localhost:5000";

// cars

export const getAllCars = async () => {
  const response = await fetch(`${BASE_URL}/cars`);
  const data = await response.json();
  return data;
};

export const getCar = async (id) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`);
  const data = await response.json();
  return data;
};

export const getCarBySlug = async (slug) => {
  const response = await fetch(`${BASE_URL}/cars/cardetails/${slug}`);
  const data = await response.json();
  return data;
};

export const addCar = async (body) => {
  const response = await fetch(`${BASE_URL}/cars`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
};

export const updateCar = async (id, body) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    method: "PATCH",
    body: body,
  });
  const data = await response.json();
  return data;
};

export const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

// users

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

export const getUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const data = await response.json();
  return data;
};

export const updateUser = async (id, body) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PATCH",
    body: body,
  });
  const data = await response.json();
  return data;
};

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const signUp = async (body) => {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const verifyEmail = async (userId, token) => {
  const response = await fetch(
    `${BASE_URL}/users/verifyEmail?token=${token}&userId=${userId}`
  );
  const data = await response.json();
  return data;
};

export const signIn = async (body) => {
  const response = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
};

export const logOut = async () => {
  const response = await fetch(`${BASE_URL}/users/signout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
};

export const checkUser = async () => {};

// booking

export const addBooking = async (body) => {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
