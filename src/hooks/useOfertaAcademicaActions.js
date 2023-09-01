import {
  add_carrera_carrera,
  add_carrera_nivel,
  add_recurso,
  add_tipo_recurso,
  delete_carrera_carrera,
  delete_carrera_nivel,
  delete_recurso,
  delete_tipo_recurso,
  get_carrera_carrera_data,
  get_carrera_nivel_data,
  get_recurso_data,
  get_tipo_recurso_data,
  update_carrera_nivel,
  update_recurso,
  update_tipo_recurso
} from '@/store/oferta-academica/carreraThunks'
import { add_extension, get_extension_data } from '@/store/oferta-academica/extensionThunks'
import { set_extension_filtered, set_recurso_filtered, set_unidad_filtered } from '@/store/oferta-academica/slice'
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
  const setRecursoFiltered = (filteredData) => { dispatch(set_recurso_filtered({ filteredData })) }

  const getCarreraNivelData = async () => { return dispatch(get_carrera_nivel_data()) }
  const addCarreraNivel = async (newData) => { return dispatch(add_carrera_nivel({ newData })) }
  const deleteCarreraNivel = async (nombre) => { return dispatch(delete_carrera_nivel({ nombre })) }
  const updateCarreraNivel = async ({ nombre, newData }) => { return dispatch(update_carrera_nivel({ nombre, newData })) }

  const getCarreraTipoRecursoData = async () => { return dispatch(get_tipo_recurso_data()) }
  const addCarreraTipoRecurso = async (newData) => { return dispatch(add_tipo_recurso({ newData })) }
  const deleteCarreraTipoRecurso = async (nombre) => { return dispatch(delete_tipo_recurso({ nombre })) }
  const updateCarreraTipoRecurso = async ({ nombre, newData }) => { return dispatch(update_tipo_recurso({ nombre, newData })) }

  const getCarreraRecursoData = async () => { return dispatch(get_recurso_data()) }
  const addCarreraRecurso = async (newData) => { return dispatch(add_recurso({ newData })) }
  const deleteCarreraRecurso = async (nombre) => { return dispatch(delete_recurso({ nombre })) }
  const updateCarreraRecurso = async ({ nombre, newData }) => { return dispatch(update_recurso({ nombre, newData })) }

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
    setRecursoFiltered,
    getOfertaAcademicaExtension,
    addOfertaAcademicaExtension,
    getCarreraNivelData,
    addCarreraNivel,
    updateCarreraNivel,
    deleteCarreraNivel,
    getCarreraCarreraData,
    addCarreraCarrera,
    deleteCarreraCarrera,
    getCarreraTipoRecursoData,
    deleteCarreraTipoRecurso,
    addCarreraTipoRecurso,
    updateCarreraTipoRecurso,
    getCarreraRecursoData,
    addCarreraRecurso,
    deleteCarreraRecurso,
    updateCarreraRecurso
  }
}
