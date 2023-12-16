import { set_pagination_data } from '@/store/centros-educativos/slice'
import { get_centros_establecimientos } from '@/store/centros-educativos/thunks'
import { useDispatch } from 'react-redux'

export function useCentrosEducativosActions() {
  const dispatch = useDispatch()

  const getCentrosEstablecimientos = async data => await dispatch(get_centros_establecimientos(data))

  const setPaginationData = data => dispatch(set_pagination_data(data))

  return { getCentrosEstablecimientos, setPaginationData }
}
