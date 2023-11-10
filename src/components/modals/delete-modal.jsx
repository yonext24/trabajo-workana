import { useForm } from 'react-hook-form'
import { ButtonsContainer } from './buttons-container'
import { DefaultModalLayout } from './default-modal-layout'
import { ModalBackground } from './modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '../common/submit-button'

export function DeleteModal({ closeModal, onClick, title, sure }) {
  const { handleSubmit } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const onSubmit = handleLoading(async () => {
    await onClick()
    closeModal()
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title={title} closeModal={closeModal} loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)} className="py-8 px-4 font-semibold text-center">
          <h6 className="text-2xl">{title}</h6>
          <p className="mb-12">{sure}</p>

          <ButtonsContainer closeModal={closeModal}>
            <SubmitButton loading={loading} text="Desactivar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
