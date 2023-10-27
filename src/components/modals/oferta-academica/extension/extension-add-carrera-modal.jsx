import { InputWLabel } from '@/components/common/input-w-label'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { CarreraExtensionModifyTable } from '@/components/tables/oferta-academica/carrera/carrera-extension-modify-table'

export function ExtensionAddCarreraModal({ closeModal }) {
  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title={'Carreras de extensión'}
        className={'!max-w-4xl'}
        closeModal={closeModal}
      >
        <div className="p-6 w-full flex flex-col">
          <div className="flex w-full justify-between [&>*]:flex-1 gap-6">
            <InputWLabel name="unidad" id="unidad" />
            <InputWLabel name="extension" id="extension" />
          </div>
          <h5 className="text-2xl my-3">
            Cambiar estado de carrera en extensión
          </h5>

          <CarreraExtensionModifyTable
            data={[
              { codigo: '04', carrera: 'Experto en geografía 1' },
              { codigo: '05', carrera: 'Experto en geografía 2' }
            ]}
          />
        </div>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
