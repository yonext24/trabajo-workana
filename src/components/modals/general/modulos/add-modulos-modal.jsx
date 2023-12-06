import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { useSelector } from 'react-redux'
import { compareValues } from '@/utils/compareValues'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'

export function AddModulosModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm()
  const { handleLoading, loading } = useFormCustom()

  const modulosData = useSelector(s => s.data.modulos.data)
  const { addModulos } = useDataActions()

  const handleUpdate = handleLoading(async data => {
    await addModulos(data)
    closeModal()
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Agregar Módulo" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 font-semibold flex flex-col gap-4">
          <InputWLabel
            id="nombre"
            name="nombre"
            labelText="Nombre"
            type="text"
            register={register}
            required
            registerProps={{
              validate: nombre => {
                const modulos = modulosData.filter(modulo => modulo.tipo === watch('tipo'))
                if (modulos.some(modulo => compareValues(modulo.nombre, nombre))) {
                  return 'Este modulo ya existe'
                }
              }
            }}
          />
          <SelectInputControlledWithLabel
            labelText={'Tipo'}
            id="tipo"
            name="tipo"
            control={control}
            options={['Operación', 'Módulo']}
          />

          <ButtonsContainer closeModal={closeModal} disabled={loading} className="mt-12">
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
