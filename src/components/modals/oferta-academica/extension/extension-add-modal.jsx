import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useSelector } from 'react-redux'
import { handleErrorInFormResponse } from '@/utils/consts'
import { SubmitButton } from '@/components/common/submit-button'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension } from '@/utils/routes'
import { useEffect, useMemo, useState } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'

export function ExtensionAddModal({ closeModal }) {
  const [selectedTipo, setSelectedTipo] = useState(null)

  const { addOfertaAcademicaExtension, getUnidadAcademicaTipos, setExtensionSelectedUnidad } =
    useOfertaAcademicaActions()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm()
  const {
    loading: unidadLoading,
    error: unidadError,
    data: unidadData
  } = useFetchLocalData({ func: extension.get_params_create })
  const {
    loading: tipoLoading,
    error: tipoError,
    data: tipoData
  } = useSelector(s => s.ofertaAcademica.unidadAcademica.tipo)

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  const unidades = useMemo(() => {
    if (!unidadData) return []
    return unidadData.filter(el => el.id_tipo_ua === selectedTipo?.id_tipo_ua)
  }, [selectedTipo])

  // eslint-disable-next-line no-unused-vars
  const handleUpdate = async ({ tipo, unidad, ...rest }) => {
    const id_unidad = unidad?.id_unidad
    const data = { ...rest, id_unidad, id_departamento: 1, unidad: unidad?.nombre }

    console.log(data)
    const res = await addOfertaAcademicaExtension(data)
    handleErrorInFormResponse(res, setError, () => {
      setExtensionSelectedUnidad({ unidad: unidad })
      closeModal()
    })
  }

  return (
    <ModalBackground onClick={closeModal} closeModal={closeModal}>
      <DefaultModalLayout
        title={'Agregar extensión'}
        className={'!max-h-[98vh]'}
        closeModal={closeModal}
        loading={isSubmitting}
        errors={errors}
      >
        <form
          className="p-6 gap-4 flex flex-col [&_label]:text-lg [&_label]:font-semibold overflow-y-auto"
          onSubmit={handleSubmit(handleUpdate)}
        >
          <div className="flex [&>*]:flex-1 gap-4">
            <SelectInputControlledWithLabel
              labelText={'Tipo Unidad'}
              control={control}
              name={'tipo'}
              options={tipoData}
              loading={tipoLoading}
              error={tipoError}
              show="nombre"
              handleOptionClick={setSelectedTipo}
              rules={{ required: true }}
            />
            <SelectInputControlledWithLabel
              labelText={'Unidad'}
              control={control}
              name="unidad"
              options={unidades}
              loading={unidadLoading}
              error={unidadError}
              resetOnOptionsChange
              show="abreviatura"
              rules={{ required: true }}
            />
          </div>
          <InputWLabel id={'codigo'} name="codigo" type="number" register={register} labelText={'Código'} required />
          <InputWLabel id={'nombre'} name="nombre" register={register} required />
          <InputWLabel id={'abreviatura'} name="abreviatura" register={register} required />

          <SelectInputControlledWithLabel
            labelText={'Ubicación'}
            control={control}
            name="pais"
            options={['México', 'Guatemala', 'El Salvador', 'Estados Unidos']}
            rules={{ required: true }}
          />
          <InputWLabel
            type="date"
            register={register}
            id="fecha_de_creacion"
            name="fecha_de_creacion"
            required
            labelText={'Fecha de creación'}
            defaultValue={new Date().toISOString().split('T')[0]}
          />

          <ButtonsContainer closeModal={closeModal} disabled={isSubmitting}>
            <SubmitButton text="Guardar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
