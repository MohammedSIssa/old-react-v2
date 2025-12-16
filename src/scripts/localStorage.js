export const saveUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));

export const clearUser = () => {
  localStorage.removeItem("user");
  location.reload();
};

export const loadUser = () => JSON.parse(localStorage.getItem("user")) || {};

export const saveData = (url, data) => {
  localStorage.setItem(url, JSON.stringify(data));
};

export const clearData = (url) => localStorage.removeItem(url);

export const loadData = (url) => JSON.parse(localStorage.getItem(url)) || null;
