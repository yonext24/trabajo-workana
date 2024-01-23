import { SubmitButton } from '@/components/common/submit-button'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useForm } from 'react-hook-form'
import { InputWLabel } from '@/components/common/input-w-label'
import { useFormCustom } from '@/hooks/useFormCustom'

export function AddSectorModal({ closeModal }) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { addSectoresData } = useDataActions()

  const onSubmit = handleLoading(async ({ nombre }) => {
    await addSectoresData(nombre)
    closeModal()
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Sector" errors={errors} closeModal={closeModal} loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4 font-semibold flex flex-col gap-12">
          <InputWLabel name="nombre" autoFocus register={register} required />

          <ButtonsContainer disabled={loading} closeModal={closeModal}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
