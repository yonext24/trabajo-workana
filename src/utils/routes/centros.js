import { BASE_CENTROS_EDUCATIVOS_URL } from '../consts'
import { appFetch } from '../fetchHandler'

export const centros = {
  get_sectores: async () => await appFetch(`${BASE_CENTROS_EDUCATIVOS_URL}/rye/centros_educativos/sectores`),
  get_establecimientos: async ({ id_municipio, id_sector, id_departamento, page, size }) => {
    if (!id_municipio || !id_sector || !id_departamento) throw new Error('Faltan parámetros')
    return await appFetch(
      `${BASE_CENTROS_EDUCATIVOS_URL}/rye/centros_educativos/establecimientos?page=${page}&size=${size}&id_municipio=${id_municipio}&id_sector=${id_sector}&id_departamento=${id_departamento}`
    )
  }
}
