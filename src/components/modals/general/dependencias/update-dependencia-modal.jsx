import { useForm } from 'react-hook-form'
import { useDataActions } from '../../../../hooks/useDataActions'
import { ButtonsContainer } from '../../buttons-container'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '../../../common/input-w-label'
import { compareValues } from '../../../../utils/compareValues'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useFormCustom } from '@/hooks/useFormCustom'
import { SubmitButton } from '@/components/common/submit-button'
import { handleErrorInFormResponse } from '@/utils/consts'

export function UpdateDependenciaModal({ closeModal, entryData }) {
  const { nombre, abreviatura, id_dependencia, id_sector } = entryData

  const { data: sectoresData, error: sectoresError, revalidating: sectoresLoading } = useSelector(s => s.data.sectores)

  useEffect(() => {
    getSectoresData()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()

  const { updDependenciasData, getSectoresData } = useDataActions()

  const handleUpdate = handleLoading(async data => {
    if (Object.entries(touchedFields).length < 1) return

    const { sector } = data
    const id_sector = sector.id_sector

    const finalData = {
      ...data,
      sector: sector.nombre,
      id_sector
    }
    if (compareValues(entryData, finalData)) return

    const res = await updDependenciasData({ ...finalData, id_dependencia })
    handleErrorInFormResponse(res, setError, closeModal)
    closeModal()
  })

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout title="Actualizar Dependencia" closeModal={closeModal} loading={loading} errors={errors}>
        <form onSubmit={handleSubmit(handleUpdate)} className="py-8 px-4 font-semibold flex flex-col gap-y-3">
          <InputWLabel
            readOnly
            required
            id="nombre"
            labelText="Nombre"
            type="text"
            autoFocus
            register={register}
            defaultValue={nombre}
          />
          <InputWLabel
            id="abreviatura"
            name="abreviatura"
            labelText="Abreviatura"
            type="text"
            register={register}
            required
            defaultValue={abreviatura}
          />

          <SelectInputControlledWithLabel
            name="sector"
            control={control}
            rules={{ required: true }}
            defaultValue={sectoresData.find(el => el.id_sector === id_sector)}
            options={sectoresData.filter(el => el.estado)}
            loading={sectoresLoading}
            error={sectoresError}
            show="nombre"
            labelText={'Sector'}
          />

          <div className="mt-5" />
          <ButtonsContainer closeModal={closeModal} disabled={loading}>
            <SubmitButton loading={loading} text="Actualizar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
