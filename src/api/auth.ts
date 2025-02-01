import { BASE_URL } from './base'

export function login(name: string, email: string) {
  return fetch(`${BASE_URL}/auth/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
    }),
  })
}

export function logout(name: string, email: string) {
  return fetch(`${BASE_URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
    }),
  })
}
