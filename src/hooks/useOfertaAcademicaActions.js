import {
  add_carrera_carrera,
  add_carrera_nivel,
  add_recurso,
  add_tipo_recurso,
  delete_carrera_carrera,
  switch_state_carrera_nivel,
  switch_state_tipo_recurso,
  get_carrera_carrera_data,
  get_carrera_nivel_data,
  get_recurso_data,
  switch_state_recurso,
  get_tipo_recurso_data,
  update_carrera_nivel,
  update_recurso,
  update_tipo_recurso,
  update_carrera_carrera
} from '@/store/oferta-academica/carreraThunks'
import { add_extension, get_extension_data, update_extension } from '@/store/oferta-academica/extensionThunks'
import {
  set_recurso_filtered,
  set_unidad_filtered,
  set_carrera_carrera_pagination_data,
  set_extension_selected_unidad,
  set_extension_error,
  set_carrera_error
} from '@/store/oferta-academica/slice'
import {
  add_unidad_academica_tipos,
  add_unidad_academica_unidad,
  switch_state_unidad_academica_unidad,
  get_unidad_academica_tipos,
  get_unidad_academica_unidad,
  update_unidad_academica_tipos,
  update_unidad_academica_unidad,
  switch_state_unidad_academica_tipos
} from '@/store/oferta-academica/unidadThunks'
import { useDispatch } from 'react-redux'

export function useOfertaAcademicaActions() {
  const dispatch = useDispatch()

  const setUnidadFiltered = async filteredData => dispatch(set_unidad_filtered({ filteredData }))
  const setExtensionSelectedUnidad = async data => dispatch(set_extension_selected_unidad(data))
  const setRecursoFiltered = async filteredData => dispatch(set_recurso_filtered({ filteredData }))
  const setCarreraCarreraPaginationData = async data => dispatch(set_carrera_carrera_pagination_data(data))
  const setExtensionError = async error => dispatch(set_extension_error({ error }))
  const setCarreraError = async error => dispatch(set_carrera_error({ error }))

  const getCarreraNivelData = async () => dispatch(get_carrera_nivel_data())
  const addCarreraNivel = async data => dispatch(add_carrera_nivel(data))
  const switchCarreraNivel = async data => dispatch(switch_state_carrera_nivel(data))
  const updateCarreraNivel = async data => dispatch(update_carrera_nivel(data))

  const getCarreraTipoRecursoData = async () => dispatch(get_tipo_recurso_data())
  const addCarreraTipoRecurso = async data => dispatch(add_tipo_recurso(data))
  const switchCarreraTipoRecurso = async data => dispatch(switch_state_tipo_recurso(data))
  const updateCarreraTipoRecurso = async data => dispatch(update_tipo_recurso(data))

  const getCarreraRecursoData = async () => dispatch(get_recurso_data())
  const addCarreraRecurso = async data => dispatch(add_recurso(data))
  const switchCarreraRecurso = async data => dispatch(switch_state_recurso(data))
  const updateCarreraRecurso = async data => dispatch(update_recurso(data))

  const getCarreraCarreraData = async data => dispatch(get_carrera_carrera_data(data))
  const addCarreraCarrera = async data => dispatch(add_carrera_carrera(data))
  const deleteCarreraCarrera = async data => dispatch(delete_carrera_carrera(data))
  const updateCarreraCarrera = async data => dispatch(update_carrera_carrera(data))

  const getOfertaAcademicaExtension = async data => dispatch(get_extension_data(data))
  const addOfertaAcademicaExtension = async data => dispatch(add_extension(data))
  const updateOfertaAcademicaExtension = async data => dispatch(update_extension(data))

  const getUnidadAcademicaTipos = async () => dispatch(get_unidad_academica_tipos())
  const addUnidadAcademicaTipos = async data => dispatch(add_unidad_academica_tipos(data))
  const switchUnidadAcademicaTipos = async data => dispatch(switch_state_unidad_academica_tipos(data))
  const updateUnidadAcademicaTipos = async data => dispatch(update_unidad_academica_tipos(data))

  const getUnidadAcademicaUnidad = async () => dispatch(get_unidad_academica_unidad())
  const addUnidadAcademicaUnidad = async data => dispatch(add_unidad_academica_unidad(data))
  const switchUnidadAcademicaUnidad = async data => dispatch(switch_state_unidad_academica_unidad(data))
  const updateUnidadAcademicaUnidad = async data => dispatch(update_unidad_academica_unidad(data))

  return {
    getUnidadAcademicaTipos,
    addUnidadAcademicaTipos,
    switchUnidadAcademicaTipos,
    updateUnidadAcademicaTipos,
    getUnidadAcademicaUnidad,
    addUnidadAcademicaUnidad,
    updateUnidadAcademicaUnidad,
    switchUnidadAcademicaUnidad,
    setUnidadFiltered,
    setExtensionSelectedUnidad,
    setRecursoFiltered,
    setCarreraCarreraPaginationData,
    getOfertaAcademicaExtension,
    addOfertaAcademicaExtension,
    updateOfertaAcademicaExtension,
    setExtensionError,
    setCarreraError,
    getCarreraNivelData,
    addCarreraNivel,
    updateCarreraNivel,
    switchCarreraNivel,
    getCarreraCarreraData,
    addCarreraCarrera,
    deleteCarreraCarrera,
    updateCarreraCarrera,
    getCarreraTipoRecursoData,
    switchCarreraTipoRecurso,
    addCarreraTipoRecurso,
    updateCarreraTipoRecurso,
    getCarreraRecursoData,
    addCarreraRecurso,
    switchCarreraRecurso,
    updateCarreraRecurso
  }
}
