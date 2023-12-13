import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { ButtonsContainer } from '../../buttons-container'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { handleErrorInFormResponse } from '@/utils/consts'
import { SubmitButton } from '@/components/common/submit-button'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { extension, geografia } from '@/utils/routes'
import { useEffect, useMemo } from 'react'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'

export function ExtensionAddModal({ closeModal }) {
  const { addOfertaAcademicaExtension, getUnidadAcademicaTipos, setExtensionSelectedUnidad } =
    useOfertaAcademicaActions()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm()

  const selectedTipo = watch('tipo')

  const {
    loading: unidadLoading,
    error: unidadError,
    data: unidadData
  } = useFetchLocalData({ func: extension.get_params_create })
  const {
    loading: loadingDepartamentos,
    error: errorDepartamentos,
    data: dataDepartamentos
  } = useFetchLocalData({ func: geografia.get_departamentos_guatemala, initialData: { paises: [], departamentos: [] } })

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  const tipos = useMemo(() => {
    if (!unidadData) return []
    // I dont know why Set doesnt work here
    const addedIds = {}
    const tipos = []
    unidadData.forEach(({ id_tipo_ua, tipo }) => {
      if (addedIds[id_tipo_ua]) return
      addedIds[id_tipo_ua] = true
      tipos.push({ id_tipo_ua, nombre: tipo })
    })
    return tipos
  }, [unidadData])
  const unidades = useMemo(() => {
    if (!unidadData) return []
    return unidadData.filter(el => el.id_tipo_ua === selectedTipo?.id_tipo_ua)
  }, [selectedTipo])

  console.log(tipos)

  // eslint-disable-next-line no-unused-vars
  const handleUpdate = async ({ tipo, unidad, departamento, ...rest }) => {
    const id_unidad = unidad?.id_unidad
    const data = { ...rest, id_unidad, id_departamento: departamento?.id_departamento, unidad: unidad?.nombre }

    const res = await addOfertaAcademicaExtension(data)
    handleErrorInFormResponse(res, setError, () => {
      setExtensionSelectedUnidad({ unidad, tipo })
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
              options={tipos}
              loading={unidadLoading}
              error={unidadError}
              show="nombre"
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
              disabled={unidades.length === 0}
              disabledMessage={
                selectedTipo && selectedTipo !== 'Seleccionar'
                  ? `No hay unidades disponibles para el tipo ${selectedTipo}`
                  : 'Seleccione un tipo de unidad primero.'
              }
            />
          </div>
          <InputWLabel id={'codigo'} name="codigo" type="number" register={register} labelText={'Código'} required />
          <InputWLabel id={'nombre'} name="nombre" register={register} required />
          <InputWLabel id={'abreviatura'} name="abreviatura" register={register} required />

          <SelectInputControlledWithLabel
            labelText={'Departamento'}
            control={control}
            name="departamento"
            options={dataDepartamentos}
            loading={loadingDepartamentos}
            error={errorDepartamentos}
            rules={{ required: true }}
            show="nombre"
          />
          <InputWLabel
            type="date"
            register={register}
            id="fecha_creacion"
            name="fecha_creacion"
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
