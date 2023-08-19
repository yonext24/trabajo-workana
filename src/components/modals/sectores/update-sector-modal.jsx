import { useDataActions } from '../../../hooks/useDataActions'
import { ButtonsContainer } from '../buttons-container'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'

export function UpdateSectorModal ({ closeModal, entry }) {
  const { updSectoresData } = useDataActions()

  const handleSubmit = e => {
    e.preventDefault()
    const { name } = Object.fromEntries(new FormData(e.target))

    updSectoresData({ text: entry, newText: name })
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Actualizar Sector' >
      <form onSubmit={handleSubmit} className='py-8 px-4 font-semibold'>
        <p>Nombre</p>
        <input type='text' autoFocus name='name' className='border-2 outline-none py-1 text-lg px-4 w-full border-gris rounded-md mb-12' />

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Actualizar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}
