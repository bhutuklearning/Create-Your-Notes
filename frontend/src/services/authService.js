// import api from "../utils/axios";

// // Authentication service - small, focused helper functions
// export const login = async (credentials) => {
//   const res = await api.post("/auth/login", credentials);
//   return res.data;
// };

// export const register = async (userData) => {
//   const res = await api.post("/auth/register", userData);
//   return res.data;
// };

// export const logout = async () => {
//   const res = await api.post("/auth/logout");
//   return res.data;
// };

// export const getProfile = async () => {
//   const res = await api.get("/auth/profile");
//   return res.data;
// };

// export const refresh = async () => {
//   const res = await api.get("/auth/refresh");
//   return res.data;
// };

// export default { login, register, logout, getProfile, refresh };


import api from "../utils/axios";


// Register a new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });
  return response.data;
};

// Logout user
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Refresh access token
export const refreshToken = async () => {
  const response = await api.get("/auth/refresh");
  return response.data;
};

// Get user profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};
