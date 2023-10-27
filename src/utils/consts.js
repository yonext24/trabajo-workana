export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000'
    : 'http://localhost:8000'

export const getToken = api => {
  const token = api.getState().auth.token
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }

  // throw new Error('testing')

  return { headers, token }
}
