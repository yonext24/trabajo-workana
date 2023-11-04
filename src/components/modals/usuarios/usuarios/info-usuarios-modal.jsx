import { ModalBackground } from '../../modal-background'
import { DefaultModalLayout } from '../../default-modal-layout'
import { useSelector } from 'react-redux'
import { ButtonsContainer } from '../../buttons-container'

const toShow = [
  { text: 'Rol', key: 'rol' },
  { text: 'Puesto', key: 'puesto' },
  { text: 'Dependencia', key: 'dependencia' },
  { text: 'Referencia de Oficio', key: 'ref_oficio' },
  { text: 'Fecha de desactivación', key: 'fecha_desactivacion' }
]

export function InfoUsuariosModal({ closeModal }) {
  const showing = useSelector(s => s.usuarios.usuarios.showing)

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Información de usuario">
        <div className="p-6">
          <div
            className="border border-gris flex flex-col w-full font-bold
        [&>#row]:grid [&>#row]:grid-cols-2 [&_#td]:py-[9px] [&_#row:not(:last-of-type)>#td]:border-b [&_#td]:px-2"
          >
            {toShow
              .map(({ key, text }) => ({ [key]: showing?.otros?.[key], text }))
              .map(el => {
                const entries = Object.entries(el)
                const value = entries[0][1]
                const text = entries[1][1]
                return (
                  <div id="row" key={text}>
                    <div id="td" className="capitalize border-r">
                      {text}
                    </div>
                    <div id="td" className="text-center">
                      {value}
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
