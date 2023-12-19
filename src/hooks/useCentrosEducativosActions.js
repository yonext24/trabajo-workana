import { set_pagination_data, set_should_revalidate } from '@/store/centros-educativos/slice'
import { add_centros_excel, get_centros_establecimientos } from '@/store/centros-educativos/thunks'
import { useDispatch } from 'react-redux'

export function useCentrosEducativosActions() {
  const dispatch = useDispatch()

  const getCentrosEstablecimientos = async data => await dispatch(get_centros_establecimientos(data))
  const addCentrosExcel = async data => dispatch(add_centros_excel(data))

  const setPaginationData = data => dispatch(set_pagination_data(data))
  const setShouldRevalidate = () => dispatch(set_should_revalidate())

  return { getCentrosEstablecimientos, setPaginationData, addCentrosExcel, setShouldRevalidate }
}
