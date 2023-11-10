import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { useSelector } from 'react-redux'
import { ButtonsContainer } from '../../buttons-container'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo, useState } from 'react'
import { useDataActions } from '@/hooks/useDataActions'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'

export function AddPermisosModal({ closeModal }) {
  const [isOfertaAcademica, setIsOfertaAcademica] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { getModulos } = useDataActions()
  const { addPermission } = useUsuariosActions()

  const modulosData = useSelector(s => s.data.modulos.data)

  console.log({ isOfertaAcademica })

  useEffect(() => {
    getModulos()
  }, [])

  const { modulos, operaciones } = useMemo(() => {
    const modulos = []
    const operaciones = []

    modulosData.forEach(modulo => {
      if (modulo.tipo === 'Módulo') modulos.push(modulo)
      else operaciones.push(modulo)
    })

    return { modulos, operaciones }
  }, [modulosData])

  const handleUpload = handleLoading(data => {
    addPermission(data)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout title="Agregar Permiso" closeModal={closeModal} errors={errors} loading={loading}>
        <form
          onSubmit={handleSubmit(handleUpload)}
          className="flex flex-col gap-y-4 p-6 [&_label]:font-semibold [&>label]:text-lg [&>label]:-mb-4 [&>label]:block"
        >
          <SelectInputControlledWithLabel
            name="modulo"
            control={control}
            rules={{ required: true }}
            options={modulos}
            labelText="Módulo"
            show="nombre"
            handleOptionClick={selected => {
              setIsOfertaAcademica(selected.nombre === 'Oferta Académica')
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectInputControlledWithLabel
              labelText="Operación"
              name="operacion"
              control={control}
              rules={{ required: true }}
              options={operaciones}
              show="nombre"
            />

            <SelectInputControlledWithLabel
              labelText="Unidad"
              disabled={!isOfertaAcademica}
              name="unidad"
              control={control}
              rules={{ required: true }}
              options={[1, 2, 3, 4, 5]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <SelectInputControlledWithLabel
              labelText="Extensión"
              disabled={!isOfertaAcademica}
              name="extension"
              control={control}
              rules={{ required: true }}
              options={[1, 2, 3, 4, 5]}
            />

            <SelectInputControlledWithLabel
              labelText="Nivel"
              disabled={!isOfertaAcademica}
              name="nivel"
              control={control}
              rules={{ required: true }}
              options={[1, 2, 3, 4, 5]}
            />
          </div>

          <ButtonsContainer disabled={loading}>
            <SubmitButton loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
