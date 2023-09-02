import { createAsyncThunk } from '@reduxjs/toolkit'

// Acción asincrónica para verificar la sesión inicial
export const checkSession = createAsyncThunk('auth/checkSession', async () => {
  const token = localStorage.getItem('tkn')

  if (token) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    // const response = await fetch('/api/user', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // if (response.ok) {
    //   return await response.json();
    // }

    return {
      token: 'test',
      user: {
        username: 'admin1',
        rol: 'Admin',
        puesto: 'Jefe Departamento XYZ',
        nombre: 'Juan Pérez',
        telefono: 1122334455,
        celular: 12893131,
        CUI: 21321832,
        correo: 'example@example.com'
      }
    }
  }

  return false
})

export const login = createAsyncThunk('auth/login', async ({ data }, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  localStorage.setItem('tkn', 'test')

  return {
    token: 'test',
    user: {
      username: 'admin1',
      rol: 'Admin',
      puesto: 'Jefe Departamento XYZ',
      nombre: 'Juan Pérez',
      telefono: 1122334455,
      celular: 12893131,
      CUI: 21321832,
      correo: 'example@example.com'
    }
  }
})
