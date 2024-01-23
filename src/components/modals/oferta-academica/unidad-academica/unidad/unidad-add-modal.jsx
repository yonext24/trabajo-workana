import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useEffect } from 'react'
import { handleErrorInFormResponse } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { unidad } from '@/utils/routes'

export function UnidadAddModal({ closeModal }) {
  const {
    data: tiposData,
    laoding: tiposLoading,
    error: tiposError
  } = useFetchLocalData({ func: unidad.unidad.params })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { addUnidadAcademicaUnidad, getUnidadAcademicaTipos } = useOfertaAcademicaActions()

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  const handleUpdate = handleLoading(async data => {
    const { tipo_ua: raw_tipo_ua, ...rest } = data
    const { nombre, id_tipo_ua } = raw_tipo_ua
    const parsedDataToSend = { ...rest, tipo_ua: nombre, id_tipo_ua }

    const res = await addUnidadAcademicaUnidad(parsedDataToSend)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Unidad" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(handleUpdate)} className="px-8 py-4 pb-12 flex flex-col gap-y-3">
          <SelectInputControlledWithLabel
            labelText="Tipo UA"
            control={control}
            name="tipo_ua"
            rules={{ required: true }}
            options={tiposData}
            loading={tiposLoading}
            error={tiposError}
            show={'nombre'}
          />
          <InputWLabel name="codigo" id="codigo" labelText="Código" required type="number" register={register} />
          <InputWLabel
            name="nombre"
            maxlength={80}
            registerProps={{
              maxLength: { value: 50, message: 'Máximo 80 caracteres.' },
              minLenght: { value: 2, message: 'Mínimo 2 caracteres.' }
            }}
            id="nombre"
            labelText="Nombre"
            required
            register={register}
          />
          <InputWLabel
            inputClassName="mb-12"
            name="abreviatura"
            id="abreviatura"
            maxlength={30}
            registerProps={{
              maxLength: {
                value: 30,
                message: 'Debe tener menos de 30 caracteres'
              }
            }}
            required
            register={register}
          />

          <ButtonsContainer closeModal={closeModal}>
            <SubmitButton text="Agregar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
