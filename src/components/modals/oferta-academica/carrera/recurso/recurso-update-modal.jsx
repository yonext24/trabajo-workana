import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'

export function RecursoUpdateModal ({ closeModal }) {
  return <ModalBackground closeModal={closeModal}>
    <DefaultModalLayout closeModal={closeModal}>

    </DefaultModalLayout>
  </ModalBackground>
}
