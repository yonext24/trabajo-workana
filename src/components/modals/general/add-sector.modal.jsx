import { ButtonsContainer } from '../buttons-container'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'

export function AddSectorModal ({ closeModal }) {
  return <ModalBackground onClick={closeModal} >

    <DefaultModalLayout title='Agregar Sector' >
      <div className='py-8 px-4 font-semibold'>
        <p>Nombre</p>
        <input type='text' className='border-2 outline-none py-1 text-lg px-4 w-full border-gris rounded-md mb-12' />

        <ButtonsContainer closeModal={closeModal}>
          <button>Agregar</button>
        </ButtonsContainer>

      </div>
    </DefaultModalLayout>

  </ModalBackground>
}
