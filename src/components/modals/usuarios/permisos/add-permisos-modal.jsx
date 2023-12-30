import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { ButtonsContainer } from '../../buttons-container'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { BASE_URL, handleErrorInFormResponse } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { general } from '@/utils/routes'

const fetchData = async () => {
  const { modulos, operaciones } = await appFetch(`${BASE_URL}/rye/permiso/parametros_nuevo`)

  const { unidades, extensiones, niveles } = await general.parametros()

  return {
    modulos,
    operaciones,
    niveles,
    unidades,
    extensiones
  }
}

export function AddPermisosModal({ closeModal }) {
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
  const operacionSelected = watch('operacion')

  const unidadSelected = watch('unidad')

  const {
    data: paramsData,
    loading: paramsLoading,
    error: paramsError
  } = useFetchLocalData({
    func: fetchData,
    dependencies: [],
    initialData: { modulos: [], operaciones: [], niveles: [], unidades: [], extensiones: [] }
  })

  const isOfertaAcademica = useMemo(() => {
    if (!moduloSelected) return false
    return moduloSelected.nombre === 'Oferta Académica'
  }, [moduloSelected])

  const isOfertaAcademicaUpdate = useMemo(() => {
    if (!moduloSelected || !operacionSelected) return false
    return moduloSelected.nombre === 'Oferta Académica' && operacionSelected.nombre === 'Actualizar'
  }, [moduloSelected, operacionSelected])

  const availableExtensiones = useMemo(() => {
    if (!unidadSelected || isOfertaAcademicaUpdate) return []
    if (unidadSelected.id_unidad === -1) return paramsData.extensiones
    return paramsData.extensiones.filter(extension => extension.id_unidad === unidadSelected?.id_unidad)
  }, [unidadSelected, isOfertaAcademicaUpdate])

  useEffect(() => {
    if (!isOfertaAcademica || isOfertaAcademicaUpdate) {
      setValue('unidad', undefined)
      setValue('extension', undefined)
      setValue('nivel', undefined)
    }
  }, [isOfertaAcademica, isOfertaAcademicaUpdate])

  const { addPermission } = useUsuariosActions()

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
            autoFocus
            name="modulo"
            control={control}
            rules={{ required: true }}
            options={paramsData.modulos}
            loading={paramsLoading}
            error={paramsError}
            labelText="Módulo"
            show="nombre"
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInputControlledWithLabel
              labelText="Operación"
              name="operacion"
              control={control}
              loading={paramsLoading}
              error={paramsError}
              rules={{ required: true }}
              options={paramsData.operaciones}
              show="nombre"
            />

            <SelectInputControlledWithLabel
              labelText="Unidad"
              ligatedToExternalChange
              disabled={!isOfertaAcademica}
              disabledMessage="Esta opción sólo está disponible en el módulo Oferta Académica"
              name="unidad"
              loading={paramsLoading}
              error={paramsError}
              control={control}
              registerProps={{ required: isOfertaAcademica }}
              show="abreviatura"
              options={[
                { abreviatura: 'Todos', id_unidad: -1 },
                ...(!isOfertaAcademicaUpdate ? paramsData.unidades : [])
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <SelectInputControlledWithLabel
              labelText="Extensión"
              resetOnOptionsChange
              ligatedToExternalChange
              disabled={!isOfertaAcademica || !unidadSelected}
              disabledMessage={(() => {
                if (!isOfertaAcademica) return 'Esta opción sólo está disponible en el módulo Oferta Académica'
                if (!unidadSelected) return 'Primero debe seleccionar una unidad'
              })()}
              name="extension"
              loading={paramsLoading}
              error={paramsError}
              control={control}
              registerProps={{ required: isOfertaAcademica }}
              show="abreviatura"
              options={[{ abreviatura: 'Todos', id_extension: -1 }, ...availableExtensiones]}
            />

            <SelectInputControlledWithLabel
              labelText="Nivel"
              ligatedToExternalChange
              disabled={!isOfertaAcademica}
              disabledMessage="Esta opción sólo está disponible en el módulo Oferta Académica"
              name="nivel"
              loading={paramsLoading}
              error={paramsError}
              control={control}
              registerProps={{ required: isOfertaAcademica }}
              options={[{ nombre: 'Todos', id_nivel: -1 }, ...(!isOfertaAcademicaUpdate ? paramsData.niveles : [])]}
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
