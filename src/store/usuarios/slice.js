import { fakeData } from '@/assets/fake-api-call'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { add_roles_extraReducers } from './thunks'

const fakeUsers = [
  {
    nombres: 'María',
    apellidos: 'González',
    telefono: '123456789',
    celular: '987654321',
    cui: '1234567890123',
    registro_de_personal: 'RP12345',
    correo: 'maria@example.com',
    pais: 'Guatemala',
    usuario: 'maria_g',
    rol: 'Empleado',
    dependencia: 'Departamento de Ventas',
    puesto: 'Ejecutivo de Ventas',
    referencia_de_oficio: 'OF123',
    fecha_de_desactivacion: '2023-12-31'
  },
  {
    nombres: 'Juan',
    apellidos: 'López',
    telefono: '111222333',
    celular: '999888777',
    cui: '9876543210123',
    registro_de_personal: 'RP54321',
    correo: 'juan@example.com',
    pais: 'México',
    usuario: 'juan_l',
    rol: 'Administrador',
    dependencia: 'Departamento de Administración',
    puesto: 'Gerente de Administración',
    referencia_de_oficio: 'OF456',
    fecha_de_desactivacion: '2023-11-15'
  },
  {
    nombres: 'Ana',
    apellidos: 'Martínez',
    telefono: '555666777',
    celular: '777888999',
    cui: '555566667777',
    registro_de_personal: 'RP98765',
    correo: 'ana@example.com',
    pais: 'España',
    usuario: 'ana_m',
    rol: 'Analista',
    dependencia: 'Departamento de Finanzas',
    puesto: 'Analista Financiero',
    referencia_de_oficio: 'OF789',
    fecha_de_desactivacion: '2023-10-20'
  },
  {
    nombres: 'Carlos',
    apellidos: 'Ramírez',
    telefono: '444555666',
    celular: '666777888',
    cui: '444455556666',
    registro_de_personal: 'RP23456',
    correo: 'carlos@example.com',
    pais: 'Colombia',
    usuario: 'carlos_r',
    rol: 'Supervisor',
    dependencia: 'Departamento de Producción',
    puesto: 'Supervisor de Producción',
    referencia_de_oficio: 'OF987',
    fecha_de_desactivacion: '2023-09-15'
  },
  {
    nombres: 'Laura',
    apellidos: 'Díaz',
    telefono: '777888999',
    celular: '111222333',
    cui: '777788889999',
    registro_de_personal: 'RP87654',
    correo: 'laura@example.com',
    pais: 'Argentina',
    usuario: 'laura_d',
    rol: 'Gerente',
    dependencia: 'Departamento de Recursos Humanos',
    puesto: 'Gerente de Recursos Humanos',
    referencia_de_oficio: 'OF654',
    fecha_de_desactivacion: '2023-08-10'
  }
]

export const get_roles_data = createAsyncThunk('usuarios/roles/get_data', async (_, api) => {
  await new Promise(resolve => setTimeout(resolve, 2000))

  return fakeData({ nombre: 10, descripcion: 20 })
})

export const get_role_permissions = createAsyncThunk('usuarios/roles/get_permissions', async ({ role }, api) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const modulos = api.getState().data.general.modulos.data

  let data = fakeData({ modulo: 10, operacion: 8, unidad: 7, extension: 6, nivel: 5 })

  const operaciones = ['Create', 'Delete', 'Update', 'Read']

  data = data.map((el, id) => ({
    id,
    unidad: 1,
    nivel: 2,
    extension: 3,
    operacion: operaciones[Math.floor(Math.random() * operaciones.length)],
    modulo: modulos[Math.floor(Math.random() * modulos.length)]
  }))

  return { role, data }
})

export const get_permisos_data = createAsyncThunk('usuarios/permisos/get_data', async (revalidate = true, api) => {
  const permisos = api.getState().usuarios.permisos.data
  if (permisos.length > 0 && !revalidate) return permisos

  await new Promise(resolve => setTimeout(resolve, 2000))
  const modulos = api.getState().data.general.modulos.data

  const data = fakeData({ modulo: 10, operacion: 8, unidad: 7, extension: 6, nivel: 5 })

  const operaciones = ['Create', 'Delete', 'Update', 'Read']

  return data.map((el, id) => ({
    id,
    unidad: 1,
    nivel: 2,
    extension: 3,
    operacion: operaciones[Math.floor(Math.random() * operaciones.length)],
    modulo: modulos[Math.floor(Math.random() * modulos.length)]
  }))
})

const initialState = {
  roles: {
    data: [],
    loading: false,
    revalidating: false,
    error: null
  },
  permisos: {
    data: [],
    filtered: [],
    loading: false,
    revalidating: false,
    error: null
  },
  usuarios: {
    loading: false,
    revalidating: false,
    error: null,
    data: fakeUsers,
    showing: fakeUsers[0]
  }
}

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {

    set_permisos_filtered: (state, action) => {
      const { data } = action.payload
      state.permisos.filtered = data
    },

    set_usuarios_showing: (state, action) => {
      const { usuario } = action.payload
      state.usuarios.showing = usuario
    }

  },
  extraReducers: (builder) => {
    builder.addCase(get_roles_data.fulfilled, (state, action) => {
      state.roles.data = action.payload
    })
    builder.addCase(get_role_permissions.fulfilled, (state, action) => {
      const { role, data } = action.payload
      state.roles.data = state.roles.data.map(el => {
        if (el.nombre === role) return { ...el, permissions: data }
        return el
      })
    })
    builder.addCase(get_permisos_data.fulfilled, (state, action) => {
      state.permisos.data = action.payload
      state.permisos.filtered = action.payload
    })

    add_roles_extraReducers(builder)
  }
})

export default usuariosSlice.reducer
export const { set_permisos_filtered, set_usuarios_showing } = usuariosSlice.actions
