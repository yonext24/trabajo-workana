import { ButtonsContainer } from '../buttons-container'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'

export function ShouldReLoginModal({ closeModal }) {
  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout closeModal={closeModal} title="Cambios en tu propio rol." className={'max-w-[400px]'}>
        <div className="flex flex-col gap-8 p-4 py-6">
          <h5 className="font-semibold text-xl text-center">
            Deberás volver a iniciar sesión para que los cambios en tu rol surjan efecto.
          </h5>
          <ButtonsContainer closeModal={closeModal} alone>
            <button onClick={closeModal} className="button">
              Aceptar
            </button>
          </ButtonsContainer>
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
