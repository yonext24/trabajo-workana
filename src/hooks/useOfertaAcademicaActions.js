import { set_unidad_filtered } from '@/store/oferta-academica/slice'
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
    setUnidadFiltered
  }
}
