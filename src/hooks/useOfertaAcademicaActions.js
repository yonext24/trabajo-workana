import {
  add_carrera_carrera,
  add_carrera_nivel,
  add_recurso,
  add_tipo_recurso,
  delete_carrera_carrera,
  switch_state_carrera_nivel,
  delete_recurso,
  switch_state_tipo_recurso,
  get_carrera_carrera_data,
  get_carrera_nivel_data,
  get_recurso_data,
  get_tipo_recurso_data,
  update_carrera_nivel,
  update_recurso,
  update_tipo_recurso
} from '@/store/oferta-academica/carreraThunks'
import { add_extension, get_extension_data } from '@/store/oferta-academica/extensionThunks'
import {
  set_extension_filtered,
  set_recurso_filtered,
  set_unidad_filtered,
  set_carrera_carrera_pagination_data
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
  const setExtensionFiltered = async filteredData => dispatch(set_extension_filtered({ filteredData }))
  const setRecursoFiltered = async filteredData => dispatch(set_recurso_filtered({ filteredData }))
  const setCarreraCarreraPaginationData = async data => dispatch(set_carrera_carrera_pagination_data(data))

  const getCarreraNivelData = async () => dispatch(get_carrera_nivel_data())
  const addCarreraNivel = async data => dispatch(add_carrera_nivel(data))
  const switchCarreraNivel = async data => dispatch(switch_state_carrera_nivel(data))
  const updateCarreraNivel = async data => dispatch(update_carrera_nivel(data))

  const getCarreraTipoRecursoData = async () => dispatch(get_tipo_recurso_data())
  const addCarreraTipoRecurso = async data => dispatch(add_tipo_recurso(data))
  const switchCarreraTipoRecurso = async data => dispatch(switch_state_tipo_recurso(data))
  const updateCarreraTipoRecurso = async data => dispatch(update_tipo_recurso(data))

  const getCarreraRecursoData = async () => dispatch(get_recurso_data())
  const addCarreraRecurso = async newData => dispatch(add_recurso({ newData }))
  const deleteCarreraRecurso = async nombre => dispatch(delete_recurso({ nombre }))
  const updateCarreraRecurso = async ({ nombre, newData }) => dispatch(update_recurso({ nombre, newData }))

  const getCarreraCarreraData = async data => dispatch(get_carrera_carrera_data(data))
  const addCarreraCarrera = async newData => dispatch(add_carrera_carrera({ newData }))
  const deleteCarreraCarrera = async nombre => dispatch(delete_carrera_carrera({ nombre }))

  const getOfertaAcademicaExtension = props => dispatch(get_extension_data(props))
  const addOfertaAcademicaExtension = async newData => dispatch(add_extension({ newData }))

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
    setExtensionFiltered,
    setRecursoFiltered,
    setCarreraCarreraPaginationData,
    getOfertaAcademicaExtension,
    addOfertaAcademicaExtension,
    getCarreraNivelData,
    addCarreraNivel,
    updateCarreraNivel,
    switchCarreraNivel,
    getCarreraCarreraData,
    addCarreraCarrera,
    deleteCarreraCarrera,
    getCarreraTipoRecursoData,
    switchCarreraTipoRecurso,
    addCarreraTipoRecurso,
    updateCarreraTipoRecurso,
    getCarreraRecursoData,
    addCarreraRecurso,
    deleteCarreraRecurso,
    updateCarreraRecurso
  }
}
