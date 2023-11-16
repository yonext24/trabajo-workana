import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useSelector } from 'react-redux'
import { ButtonsContainer } from '../../buttons-container'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo, useState } from 'react'
import { useDataActions } from '@/hooks/useDataActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { BASE_URL, handleErrorInFormResponse } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'

export function AddPermisosModal({ closeModal }) {
  const [ofertaParams, setOfertaParams] = useState({
    loading: false,
    data: { niveles: [], extensiones: [], unidades: [] }
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const moduloSelected = watch('modulo')

  const isOfertaAcademica = useMemo(() => {
    if (!moduloSelected) return false
    return moduloSelected.nombre === 'Oferta Académica'
  }, [moduloSelected])

  useEffect(() => {
    if (!isOfertaAcademica) {
      setValue('unidad', undefined)
      setValue('extension', undefined)
      setValue('nivel', undefined)
    }
  }, [isOfertaAcademica])

  useEffect(() => {
    if (!isOfertaAcademica) return
    setOfertaParams({ ...ofertaParams, loading: true })

    appFetch(`${BASE_URL}/rye/permiso/parametros_nuevo`).then(res => {
      const { niveles } = res
      setOfertaParams(prev => ({ ...ofertaParams, data: { ...prev.data, niveles } }))
    })
    appFetch(`${BASE_URL}/rye/permiso/prueba_unidades`).then(res => {
      setOfertaParams(prev => ({ ...ofertaParams, data: { ...prev.data, unidades: res } }))
    })
    appFetch(`${BASE_URL}/rye/permiso/prueba_extensiones`).then(res => {
      setOfertaParams(prev => ({ ...ofertaParams, loading: false, data: { ...prev.data, extensiones: res } }))
    })
  }, [isOfertaAcademica])

  const { getModulos } = useDataActions()
  const { addPermission } = useUsuariosActions()

  const modulosData = useSelector(s => s.data.modulos.data)

  console.log({ ofertaParams })

  useEffect(() => {
    getModulos()
  }, [])

  const { modulos, operaciones } = useMemo(() => {
    const modulos = []
    const operaciones = []

    modulosData.forEach(modulo => {
      if (modulo.tipo === 'Módulo') modulos.push(modulo)
      else operaciones.push(modulo)
    })

    return { modulos, operaciones }
  }, [modulosData])

  const handleUpload = handleLoading(async ({ operacion, unidad, extension, modulo, nivel }) => {
    const data = {
      id_operacion: operacion.id,
      id_modulo: modulo.id,
      id_nivel: nivel?.id_nivel ?? -2,
      id_unidad: unidad?.id_unidad ?? -2,
      id_extension: extension?.id_extension ?? -2
    }

    const res = await addPermission(data)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Permiso" closeModal={closeModal} errors={errors} loading={loading}>
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="flex flex-col gap-y-4 p-6 [&_label]:font-semibold [&>label]:text-lg [&>label]:-mb-4 [&>label]:block"
        >
          <SelectInputControlledWithLabel
            name="modulo"
            control={control}
            rules={{ required: true }}
            options={modulos}
            labelText="Módulo"
            show="nombre"
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInputControlledWithLabel
              labelText="Operación"
              name="operacion"
              control={control}
              rules={{ required: true }}
              options={operaciones}
              show="nombre"
            />

            <SelectInputControlledWithLabel
              labelText="Unidad"
              ligatedToExternalChange
              disabled={!isOfertaAcademica}
              name="unidad"
              loading={ofertaParams.loading}
              control={control}
              registerProps={{
                validate: () => {
                  if (!isOfertaAcademica) return 'Este campo es requerido'
                }
              }}
              show="nombre"
              options={[{ nombre: 'Todos', id_unidad: -1 }, ...ofertaParams.data.unidades]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <SelectInputControlledWithLabel
              labelText="Extensión"
              ligatedToExternalChange
              disabled={!isOfertaAcademica}
              name="extension"
              loading={ofertaParams.loading}
              control={control}
              registerProps={{
                validate: () => {
                  if (!isOfertaAcademica) return 'Este campo es requerido'
                }
              }}
              show="nombre"
              options={[{ nombre: 'Todos', id_extension: -1 }, ...ofertaParams.data.extensiones]}
            />

            <SelectInputControlledWithLabel
              labelText="Nivel"
              ligatedToExternalChange
              disabled={!isOfertaAcademica}
              name="nivel"
              loading={ofertaParams.loading}
              control={control}
              registerProps={{
                validate: () => {
                  if (!isOfertaAcademica) return 'Este campo es requerido'
                }
              }}
              options={[{ nombre: 'Todos', id_nivel: -1 }, ...ofertaParams.data.niveles]}
              show="nombre"
            />
          </div>

          <ButtonsContainer disabled={loading}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
