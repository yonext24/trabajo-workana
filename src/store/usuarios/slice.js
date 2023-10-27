import { createSlice } from '@reduxjs/toolkit'
import { addUsuariosExtraReducers } from './thunks'

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

const initialState = {
  roles: {
    data: [],
    permissionsData: [],
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
  extraReducers: builder => {
    addUsuariosExtraReducers(builder)
  }
})

export default usuariosSlice.reducer
export const { set_permisos_filtered, set_usuarios_showing } =
  usuariosSlice.actions
