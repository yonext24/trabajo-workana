import { ModalBackground } from '../../modal-background'
import { DefaultModalLayout } from '../../default-modal-layout'
import { useSelector } from 'react-redux'
import { ButtonsContainer } from '../../buttons-container'

const toShow = [
  'rol',
  'puesto',
  'dependencia',
  'referencia_de_oficio',
  'fecha_de_desactivacion'
]

export function InfoUsuariosModal({ closeModal }) {
  const { showing } = useSelector(s => s.usuarios).usuarios

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Información de usuario">
        <div className="p-6">
          <div
            className="border border-gris flex flex-col w-full font-bold
        [&>#row]:grid [&>#row]:grid-cols-2 [&_#td]:py-[9px] [&_#row:not(:last-of-type)>#td]:border-b [&_#td]:px-2"
          >
            {toShow
              .map(key => ({ [key]: showing[key] }))
              .map(el => {
                const element = Object.entries(el)[0]

                return (
                  <div id="row" key={element[0]}>
                    <div id="td" className="capitalize border-r">
                      {element[0].replace(/_/g, ' ')}
                    </div>
                    <div id="td" className="text-center">
                      {element[1]}
                    </div>
                  </div>
                )
              })}
          </div>
          <ButtonsContainer
            alone
            className="mt-6 w-max [&>button]:px-12 mx-auto"
            closeModal={closeModal}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
