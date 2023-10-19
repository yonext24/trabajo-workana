import { useDispatch } from 'react-redux'
import {
  set_general_dependencias_filtered
} from '../store/general/slice'

import { add_sectores_data, delete_sectores_data, get_sectores_data, update_sectores_data } from '../store/general/sectoresThunks'
import { add_dependencias, del_dependencias, get_dependencias, update_dependencias } from '@/store/general/dependenciasThunks'
import { add_puestos, del_puestos, get_puestos, update_puestos } from '@/store/general/puestosThunks'
import { add_modulos, del_modulos, get_modulos, update_modulos } from '@/store/general/modulosThunks'

export function useDataActions () {
  // TO DO?: Separar todas estas acciones en funciones que las creen dependiendo de un parámetro (la página)
  // para evitar re-renderizados innecesarios y cargar todas las funciones en los componentes

  const dispatch = useDispatch()

  const getSectoresData = async (args) => dispatch(get_sectores_data({ args }))
  const addSectoresData = async (newData) => dispatch(add_sectores_data({ newData }))
  const delSectoresData = async (id_sector) => dispatch(delete_sectores_data({ id_sector }))
  const updSectoresData = async ({ nombre, newData }) => dispatch(update_sectores_data({ nombre, newData }))

  const setDependenciasFiltered = (filteredData) => dispatch(set_general_dependencias_filtered({ filteredData }))
  const getDependencias = async () => dispatch(get_dependencias())
  const addDependenciasData = async (newData) => dispatch(add_dependencias({ newData }))
  const updDependenciasData = async (data) => dispatch(update_dependencias(data))
  const delDependenciesData = async (data) => dispatch(del_dependencias(data))

  const getPuestos = async () => dispatch(get_puestos())
  const addPuestosData = async (data) => dispatch(add_puestos({ data }))
  const delPuestosData = async (nombre) => dispatch(del_puestos({ nombre }))
  const updPuestosData = async ({ nombre, newData }) => dispatch(update_puestos({ nombre, newData }))

  const getModulos = async (props) => dispatch(get_modulos(props))
  const addModulos = async (newData) => dispatch(add_modulos({ newData }))
  const delModulos = async (nombre) => dispatch(del_modulos({ nombre }))
  const updModulos = async ({ nombre, newData }) => dispatch(update_modulos({ nombre, newData }))

  return {
    getSectoresData,

    addSectoresData,
    delSectoresData,
    updSectoresData,

    setDependenciasFiltered,
    addDependenciasData,
    updDependenciasData,
    delDependenciesData,
    getDependencias,

    getPuestos,
    addPuestosData,
    delPuestosData,
    updPuestosData,

    getModulos,
    addModulos,
    delModulos,
    updModulos
  }
}
