import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { geografia } from '@/utils/routes'
import { useMemo } from 'react'

export function ExtensionUpdateModal({
  closeModal,
  codigo,
  nombre,
  abreviatura,
  fecha_creacion,
  estado,
  id_departamento,
  id_extension
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm()
  const { updateOfertaAcademicaExtension } = useOfertaAcademicaActions()

  const handleUpdate = async ({ rawEstado: { estado }, fecha_creacion: local_fecha_creacion, ...rest }) => {
    const data = { estado, id_extension, ...rest }
    if (local_fecha_creacion) data.fecha_creacion = local_fecha_creacion
    const res = await updateOfertaAcademicaExtension(data)
    handleErrorInFormResponse(res, setError, closeModal)
  }

  const {
    loading: loadingDepartamentos,
    error: errorDepartamentos,
    data: dataDepartamentos
  } = useFetchLocalData({ func: geografia.get_departamentos_guatemala })

  const ubicacion = useMemo(() => {
    if (loadingDepartamentos) return 'Cargando...'
    if (errorDepartamentos || dataDepartamentos?.length === 0) return 'Desconocido'

    return dataDepartamentos?.find(({ id_departamento: id }) => id === id_departamento)?.nombre ?? 'Desconocido'
  }, [dataDepartamentos, id_departamento, errorDepartamentos, loadingDepartamentos])

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        title={'Agregar extensión'}
        className={'!max-h-[calc(100vh_-_5px)]'}
        loading={isSubmitting}
        errors={errors}
      >
        <form
          className="p-6 gap-4 flex flex-col [&_label]:text-lg [&_label]:font-semibold overflow-y-auto"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <InputWLabel
            defaultValue={codigo}
            id={'codigo'}
            name="codigo"
            register={register}
            labelText={'Código'}
            required
          />
          <InputWLabel defaultValue={nombre} id={'nombre'} disabled name="nombre" register={register} required />
          <InputWLabel defaultValue={abreviatura} id={'abreviatura'} name="abreviatura" register={register} required />

          <InputWLabel labelText={'Ubicación'} disabled name="unidad" value={ubicacion} />
          <InputWLabel
            type="date"
            register={register}
            id="fecha_creacion"
            name="fecha_creacion"
            labelText={'Fecha de creación'}
            defaultValue={fecha_creacion}
          />
          <SelectInputControlledWithLabel
            control={control}
            id="rawEstado"
            name="rawEstado"
            labelText={'Estado'}
            options={[
              { text: 'Activo', estado: true },
              { text: 'Inactivo', estado: false }
            ]}
            defaultValue={estado ? { text: 'Activo', estado: estado } : { text: 'Inactivo', estado: estado }}
            show="text"
          />

          <ButtonsContainer closeModal={closeModal} disabled={isSubmitting}>
            <SubmitButton text="Actualizar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
