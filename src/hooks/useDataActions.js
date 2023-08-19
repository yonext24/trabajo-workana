import { useDispatch } from 'react-redux'
import {
  del_sectores_data,
  set_general_dependencias_filtered,
  set_sectores_data,
  upd_sectores_data,
  add_dependencias_data,
  upd_dependencias_data,
  del_dependencias_data,
  add_puestos_data,
  del_puestos_data,
  upd_puestos_data,
  add_modulos_data,
  del_modulos_data,
  upd_modulos_data
} from '../store/data/slice'
import { get_sectores_data } from '../store/data/thunks'

export function useDataActions () {
  const dispatch = useDispatch()

  const getSectoresData = async (args) => { dispatch(get_sectores_data({ args })) }

  const setGeneralDependenciesFilteredData = (filteredData) => { dispatch(set_general_dependencias_filtered({ filteredData })) }

  const setSectoresData = (data) => { dispatch(set_sectores_data({ data })) }
  const delSectoresData = (text) => { dispatch(del_sectores_data({ text })) }
  const updSectoresData = ({ text, newText }) => { dispatch(upd_sectores_data({ text, newText })) }

  const addDependenciasData = (data) => { dispatch(add_dependencias_data({ data })) }
  const updDependenciasData = ({ newData, nombre }) => { dispatch(upd_dependencias_data({ newData, nombre })) }
  const delDependenciesData = (nombre) => { dispatch(del_dependencias_data({ nombre })) }

  const addPuestosData = (data) => { dispatch(add_puestos_data({ data })) }
  const delPuestosData = (nombre) => { dispatch(del_puestos_data({ nombre })) }
  const updPuestosData = ({ nombre, newData }) => { dispatch(upd_puestos_data({ nombre, newData })) }

  const addModulosData = (data) => { dispatch(add_modulos_data({ data })) }
  const delModulosData = (nombre) => { dispatch(del_modulos_data({ nombre })) }
  const updModulosData = ({ nombre, newData }) => { dispatch(upd_modulos_data({ nombre, newData })) }

  return {
    getSectoresData,
    setGeneralDependenciesFilteredData,

    setSectoresData,
    delSectoresData,
    updSectoresData,

    addDependenciasData,
    updDependenciasData,
    delDependenciesData,

    addPuestosData,
    delPuestosData,
    updPuestosData,

    addModulosData,
    delModulosData,
    updModulosData
  }
}
