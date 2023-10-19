import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'

export function AddSectorModal ({ closeModal }) {
  const { addSectoresData } = useDataActions()

  const handleSubmit = e => {
    e.preventDefault()
    const { nombre } = Object.fromEntries(new FormData(e.target))

    addSectoresData(nombre)
  }

  return <ModalBackground onClick={closeModal} closeModal={closeModal} >

    <DefaultModalLayout title='Agregar Sector' >
      <form onSubmit={handleSubmit} className='py-8 px-4 font-semibold'>
        <p>Nombre</p>
        <input type='text' autoFocus name='nombre' id='nombre' className='border-2 outline-none py-1 text-lg px-4 w-full border-gris rounded-md mb-12' />

        <ButtonsContainer closeModal={closeModal}>
          <button type='submit'>Agregar</button>
        </ButtonsContainer>

      </form>
    </DefaultModalLayout>

  </ModalBackground>
}
