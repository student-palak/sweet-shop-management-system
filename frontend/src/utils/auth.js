// src/utils/auth.js

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role; // "admin" or "user"
  } catch {
    return null;
  }
}

export function isAdmin() {
  return getUserRole() === "admin";
}
