import { ButtonsContainer } from './buttons-container'
import { DefaultModalLayout } from './default-modal-layout'
import { ModalBackground } from './modal-background'

export function DeleteModal ({ closeModal, onClick, title, sure }) {
  const handleSubmit = e => {
    e.preventDefault()

    onClick()
    closeModal()
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal}>

    <DefaultModalLayout title={title} >
      <form onSubmit={handleSubmit} className='py-8 px-4 font-semibold text-center'>

        <h6 className='text-2xl'>{title}</h6>
        <p className='mb-12'>{sure}</p>

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit' className='bg-red-500'>Eliminar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}
