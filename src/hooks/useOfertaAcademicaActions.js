import { add_carrera_carrera, add_carrera_nivel, delete_carrera_carrera, delete_carrera_nivel, get_carrera_carrera_data, get_carrera_nivel_data } from '@/store/oferta-academica/carreraThunks'
import { add_extension, get_extension_data } from '@/store/oferta-academica/extensionThunks'
import { set_extension_filtered, set_unidad_filtered } from '@/store/oferta-academica/slice'
import {
  add_unidad_academica_tipos,
  add_unidad_academica_unidad,
  delete_unidad_academica_tipos,
  delete_unidad_academica_unidad,
  get_unidad_academica_tipos,
  get_unidad_academica_unidad,
  update_unidad_academica_tipos, update_unidad_academica_unidad
} from '@/store/oferta-academica/unidadThunks'
import { useDispatch } from 'react-redux'

export function useOfertaAcademicaActions () {
  const dispatch = useDispatch()

  const setUnidadFiltered = (filteredData) => { dispatch(set_unidad_filtered({ filteredData })) }
  const setExtensionFiltered = (filteredData) => { dispatch(set_extension_filtered({ filteredData })) }

  const getCarreraNivelData = async () => { return dispatch(get_carrera_nivel_data()) }
  const addCarreraNivel = async (newData) => { return dispatch(add_carrera_nivel({ newData })) }
  const deleteCarreraNivel = async (nombre) => { return dispatch(delete_carrera_nivel({ nombre })) }

  const getCarreraCarreraData = async () => { return dispatch(get_carrera_carrera_data()) }
  const addCarreraCarrera = async (newData) => { return dispatch(add_carrera_carrera({ newData })) }
  const deleteCarreraCarrera = async (nombre) => { return dispatch(delete_carrera_carrera({ nombre })) }

  const getOfertaAcademicaExtension = (props) => { dispatch(get_extension_data(props)) }
  const addOfertaAcademicaExtension = async newData => { return dispatch(add_extension({ newData })) }

  const getUnidadAcademicaTipos = () => { dispatch(get_unidad_academica_tipos()) }
  const addUnidadAcademicaTipos = (newData) => { dispatch(add_unidad_academica_tipos({ newData })) }
  const deleteUnidadAcademicaTipos = (nombre) => { dispatch(delete_unidad_academica_tipos({ nombre })) }
  const updateUnidadAcademicaTipos = ({ nombre, newData }) => { dispatch(update_unidad_academica_tipos({ nombre, newData })) }

  const getUnidadAcademicaUnidad = async () => { return dispatch(get_unidad_academica_unidad()) }
  const addUnidadAcademicaUnidad = async (newData) => { return dispatch(add_unidad_academica_unidad({ newData })) }
  const deleteUnidadAcademicaUnidad = (nombre) => { dispatch(delete_unidad_academica_unidad({ nombre })) }
  const updateUnidadAcademicaUnidad = async ({ nombre, newData }) => { return dispatch(update_unidad_academica_unidad({ nombre, newData })) }

  return {
    getUnidadAcademicaTipos,
    addUnidadAcademicaTipos,
    deleteUnidadAcademicaTipos,
    updateUnidadAcademicaTipos,
    getUnidadAcademicaUnidad,
    addUnidadAcademicaUnidad,
    updateUnidadAcademicaUnidad,
    deleteUnidadAcademicaUnidad,
    setUnidadFiltered,
    setExtensionFiltered,
    getOfertaAcademicaExtension,
    addOfertaAcademicaExtension,
    getCarreraNivelData,
    addCarreraNivel,
    deleteCarreraNivel,
    getCarreraCarreraData,
    addCarreraCarrera,
    deleteCarreraCarrera
  }
}
