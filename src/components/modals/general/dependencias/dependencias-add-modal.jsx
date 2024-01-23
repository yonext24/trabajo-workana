import { useForm } from 'react-hook-form'
import { InputWLabel } from '../../../common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useDataActions } from '../../../../hooks/useDataActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useSelector } from 'react-redux'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'

export function DependenciasAddModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm()
  const { addDependenciasData } = useDataActions()
  const { loading, handleLoading } = useFormCustom()

  const { data: sectoresData, revalidating: sectoresLoading, error: sectoresError } = useSelector(s => s.data.sectores)

  const onSubmit = handleLoading(async data => {
    const { sector } = data
    const id_sector = sector.id_sector

    const finalData = {
      ...data,
      sector: sector.nombre,
      id_sector
    }

    const res = await addDependenciasData(finalData)
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Dependencia" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4 font-semibold flex flex-col gap-y-4">
          <InputWLabel id="nombre" labelText="Nombre" type="text" autoFocus register={register} required />
          <InputWLabel
            id="abreviatura"
            name="abreviatura"
            labelText="Abreviatura"
            type="text"
            register={register}
            required
            registerProps={{
              maxLength: { value: 20, message: 'Máximo 20 caracteres' }
            }}
          />

          <SelectInputControlledWithLabel
            name="sector"
            control={control}
            show="nombre"
            rules={{ required: true }}
            options={sectoresData.filter(el => el.estado)}
            loading={sectoresLoading}
            error={sectoresError}
            labelText={'Sector'}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
