import { useDispatch } from 'react-redux'
import { set_general_dependencias_filtered } from '../store/general/slice'

import {
  add_sectores_data,
  get_sectores_data,
  switch_sectores_data,
  update_sectores_data
} from '../store/general/sectoresThunks'
import {
  add_dependencias,
  switch_state_dependencias,
  get_dependencias,
  update_dependencias
} from '@/store/general/dependenciasThunks'
import { add_puestos, get_puestos, switch_state_puestos } from '@/store/general/puestosThunks'
import { add_modulos, get_modulos, switch_state_modulos, update_modulos } from '@/store/general/modulosThunks'

export function useDataActions() {
  const dispatch = useDispatch()

  const getSectoresData = async args => dispatch(get_sectores_data({ args }))
  const addSectoresData = async newData => dispatch(add_sectores_data({ newData }))
  const switchSectoresData = async data => dispatch(switch_sectores_data(data))
  const updSectoresData = async ({ nombre, newData }) => dispatch(update_sectores_data({ nombre, newData }))

  const setDependenciasFiltered = filteredData => dispatch(set_general_dependencias_filtered({ filteredData }))
  const getDependencias = async () => dispatch(get_dependencias())
  const addDependenciasData = async data => dispatch(add_dependencias(data))
  const updDependenciasData = async data => dispatch(update_dependencias(data))
  const switchStateDependencias = async data => dispatch(switch_state_dependencias(data))

  const getPuestos = async () => dispatch(get_puestos())
  const addPuestosData = async data => dispatch(add_puestos(data))
  const switchPuestosData = async data => dispatch(switch_state_puestos(data))

  const getModulos = async props => dispatch(get_modulos(props))
  const addModulos = async data => dispatch(add_modulos(data))
  const switchModulos = async data => dispatch(switch_state_modulos(data))
  const updModulos = async data => dispatch(update_modulos(data))

  return {
    getSectoresData,

    addSectoresData,
    switchSectoresData,
    updSectoresData,

    setDependenciasFiltered,
    addDependenciasData,
    updDependenciasData,
    switchStateDependencias,
    getDependencias,

    getPuestos,
    addPuestosData,
    switchPuestosData,

    getModulos,
    addModulos,
    switchModulos,
    updModulos
  }
}
