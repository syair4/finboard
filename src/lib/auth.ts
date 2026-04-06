"use client";

const STORAGE_KEY = "finboard_user";

export interface User {
  email: string;
  name: string;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try { return JSON.parse(stored); } catch { return null; }
}

export function login(email: string, _password: string): User {
  const name = email.split("@")[0];
  const user: User = { email, name };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function signup(email: string, _password: string, name: string): User {
  const user: User = { email, name };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}
