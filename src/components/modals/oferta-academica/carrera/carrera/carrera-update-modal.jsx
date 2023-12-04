import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInput } from '@/components/common/select-input'
import { SelectInputControlledWithLabel } from '@/components/common/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { SwitchControlled } from '@/components/common/switch-controlled'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { RecursoTable } from '@/components/tables/oferta-academica/carrera/recurso/recurso-table'
import { useModalLogic } from '@/hooks/useModalLogic'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { usePermissions } from '@/hooks/usePermissions'
import { BASE_OFERTA_URL, handleErrorInFormResponse } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

export function CarreraUpdateModal({ closeModal, id_carrera }) {
  useModalLogic({ closeModal, noScroll: true })
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError
  } = useForm()
  const [recursos, setRecursos] = useState({ loading: false, error: null, data: [] })
  const [updatedRecurso, setUpdatedRecurso] = useState([])

  const data = useSelector(s => s.ofertaAcademica.carrera.carrera.data)
  const carreraData = useMemo(() => {
    return data.find(c => c.id_carrera === id_carrera)
  }, [data])
  const { nivel, nombre, titulo_femenino, titulo_masculino, prerrequisito_tecnico, fecha_creacion, estado } =
    carreraData

  const uncheckRecurso = useCallback(
    ({ id_recurso, actionInUpdateState /*: 'remove' | 'add' */ }) => {
      if (actionInUpdateState === 'add') setUpdatedRecurso(prev => prev.concat({ id_recurso, estado: false }))
      else if (actionInUpdateState === 'remove')
        setUpdatedRecurso(prev => prev.filter(p => p.id_recurso !== id_recurso))

      setRecursos(prev => {
        const data = prev.data.map(p => {
          if (p.id_recurso === id_recurso) return { ...p, checked: false }
          return p
        })

        return { ...prev, data }
      })
    },
    [setUpdatedRecurso]
  )

  const checkRecurso = useCallback(({ id_recurso, actionInUpdateState /*: 'remove' | 'add' */ }) => {
    if (actionInUpdateState === 'add') setUpdatedRecurso(prev => prev.concat({ id_recurso, estado: true }))
    else if (actionInUpdateState === 'remove') setUpdatedRecurso(prev => prev.filter(p => p.id_recurso !== id_recurso))

    setRecursos(prev => {
      const data = prev.data.map(p => {
        if (p.id_recurso === id_recurso) return { ...p, checked: true }
        return p
      })
      return { ...prev, data }
    })
  })

  const selectFunction = useCallback(
    ({ checked, wasOriginallyInCarrera, id_recurso }) => {
      if (wasOriginallyInCarrera && checked) {
        uncheckRecurso({ id_recurso, actionInUpdateState: 'add' })
        return
      } else if (wasOriginallyInCarrera && !checked) {
        checkRecurso({ id_recurso, actionInUpdateState: 'remove' })
        return
      } else if (!wasOriginallyInCarrera && checked) {
        uncheckRecurso({ id_recurso, actionInUpdateState: 'remove' })
        return
      } else if (!wasOriginallyInCarrera && !checked) {
        checkRecurso({ id_recurso, actionInUpdateState: 'add' })
        return
      }
    },
    [setUpdatedRecurso]
  )

  useEffect(() => {
    setRecursos(prev => ({ ...prev, loading: true, error: null }))
    appFetch(`${BASE_OFERTA_URL}/rye/recurso/carrera?carrera=${id_carrera}`)
      .then(rawData => {
        const data = rawData.map(el => ({
          ...el,
          checked: el.estado,
          wasOriginallyInCarrera: el.estado
        }))

        setRecursos({ loading: false, error: null, data })
      })
      .catch(err => {
        setRecursos({ loading: false, error: err, data: [] })
      })
  }, [])

  const { updateCarreraCarrera } = useOfertaAcademicaActions()

  const handleUpdate = async ({ estado: rawEstado, ...data }) => {
    const newEstado = rawEstado.value

    const res = await updateCarreraCarrera({
      carrera: { id_carrera, estado: newEstado ?? estado, ...data },
      actualizar: updatedRecurso
    })
    handleErrorInFormResponse(res, setError, () => {
      setRecursos(prev => ({
        ...prev,
        data: prev.data.map(el => ({ ...el, wasOriginallyInCarrera: el.checked, estado: el.checked }))
      }))
      setUpdatedRecurso([])
    })
  }

  const permissions = usePermissions({ nameOfModule: 'OFERTA_ACADEMICA' })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title="Actualizar Carrera"
        className={'!max-h-[98vh] h-full !mx-4 overflow-hidden max-w-[900px]'}
        closeModal={closeModal}
        errors={errors}
        loading={isSubmitting}
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex w-full [&>*]:flex-1 gap-4 items-end justify-between">
            <div className="flex flex-col">
              <label className="font-semibold text-lg">Nivel carrera</label>
              <SelectInput disabled defaultValue={nivel} name="nivel" rules={{ required: true }} />
            </div>
            <div className="flex gap-4 justify-end items-center">
              <label className="font-semibold text-lg">Prerrequisito técnico</label>
              <SwitchControlled control={control} defaultValue={prerrequisito_tecnico} name={'prerrequisito_tecnico'} />
            </div>
          </div>
          <InputWLabel name="nombre" labelText={'Nombre'} disabled defaultValue={nombre} />
          <InputWLabel
            name="titulo_femenino"
            defaultValue={titulo_femenino}
            labelText="Título femenino"
            register={register}
          />
          <InputWLabel
            name="titulo_masculino"
            defaultValue={titulo_masculino}
            labelText="Título masculino"
            register={register}
          />

          <div className="flex w-full justify-end gap-2 [&>*]:min-w-[200px]">
            <InputWLabel
              name="fecha_de_creacion"
              labelText="Fecha de creación"
              type="date"
              defaultValue={fecha_creacion}
              register={register}
            />
            <SelectInputControlledWithLabel
              name="estado"
              id="estado"
              options={[
                { text: 'Activo', value: true },
                { text: 'Inactivo', value: false }
              ]}
              control={control}
              labelText={'Estado'}
              defaultValue={estado ? { text: 'Activo', value: true } : { text: 'Inactivo', value: false }}
              show="text"
            />
          </div>
          <div className="flex-[.9] flex items-center">
            <h5 className="text-2xl font-semibold">Recursos de carrera</h5>
          </div>

          <RecursoTable
            columns={[{ text: 'Tipo' }, { text: 'Recurso', className: 'w-full' }, { text: 'Acciones' }]}
            outsideData={recursos.data}
            permissions={permissions}
            selectFunction={selectFunction}
          />
          <div className="flex justify-between items-end">
            {updatedRecurso.length > 0 && (
              <span className="text-xl font-semibold">Recursos a actualizar: {updatedRecurso.length}</span>
            )}
          </div>

          <ButtonsContainer className="[&>button]:py-[7px] mt-4" disabled={isSubmitting}>
            <SubmitButton text="Actualizar" loading={isSubmitting} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
