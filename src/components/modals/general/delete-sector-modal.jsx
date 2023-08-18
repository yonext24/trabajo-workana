import { ButtonsContainer } from '../buttons-container'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'

export function DeleteSectorModal ({ closeModal }) {
  return <ModalBackground onClick={closeModal} >

    <DefaultModalLayout title='Eliminar Sector' >
      <div className='py-8 px-4 font-semibold text-center'>

        <h6 className='text-2xl'>Eliminar Sector</h6>
        <p className='mb-12'>Realmente quiere eliminar el Sector?</p>

        <ButtonsContainer closeModal={closeModal}>
          <button className='bg-red-500'>Eliminar</button>
        </ButtonsContainer>

      </div>
    </DefaultModalLayout>

  </ModalBackground>
}
