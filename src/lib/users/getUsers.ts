import { URL_BACKEND } from '@utils/utils';

export async function getUserLogin(username: string, password: string) {
  const response = await fetch(`${URL_BACKEND}/users/login`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return await response.json();
}
