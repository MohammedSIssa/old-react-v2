import { API } from "./globals";

export const logger = async (username, url) => {
  const clock = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();
  const os = navigator.platform + "";
  const user = username ?? "Guest";
  await fetch(`${API}/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitedAt: `${clock} - ${date}`,
      os,
      url,
      username: user,
    }),
  });
};
