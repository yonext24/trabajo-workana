import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../../default-modal-layout'
import { ModalBackground } from '../../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useFormCustom } from '@/hooks/useFormCustom'
import { handleErrorInFormResponse } from '@/utils/consts'
import { SubmitButton } from '@/components/common/submit-button'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'

export function UnidadUpdateModal({ closeModal, tipo_ua, abreviatura, nombre, codigo, id_unidad }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const { updateUnidadAcademicaUnidad } = useOfertaAcademicaActions()

  const handleUpdate = handleLoading(async data => {
    // eslint-disable-next-line no-unused-vars
    const { tipo_ua, ...rest } = data
    const res = await updateUnidadAcademicaUnidad({ ...rest, id_unidad })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Actualizar Unidad" errors={errors} loading={loading}>
        <form onSubmit={handleSubmit(handleUpdate)} className="px-8 py-4 pb-12 flex flex-col gap-y-3">
          <SelectInputControlledWithLabel
            labelText="Tipo UA"
            defaultValue={tipo_ua}
            disabled
            control={control}
            name="tipo_ua"
          />
          <InputWLabel
            name="codigo"
            id="codigo"
            labelText="Código"
            required
            register={register}
            defaultValue={codigo}
          />
          <InputWLabel
            name="nombre"
            id="nombre"
            labelText="Nombre"
            register={register}
            disabled
            defaultValue={nombre}
          />
          <InputWLabel
            inputClassName="mb-12"
            name="abreviatura"
            id="abreviatura"
            required
            register={register}
            defaultValue={abreviatura}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton text="Actualizar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
