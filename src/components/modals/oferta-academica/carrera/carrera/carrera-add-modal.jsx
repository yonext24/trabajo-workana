import { InputWLabel } from '@/components/common/input-w-label'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { SwitchControlled } from '@/components/common/switch-controlled'
import { ButtonsContainer } from '@/components/modals/buttons-container'
import { DefaultModalLayout } from '@/components/modals/default-modal-layout'
import { ModalBackground } from '@/components/modals/modal-background'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { BASE_OFERTA_URL, handleErrorInFormResponse } from '@/utils/consts'
import { appFetch } from '@/utils/fetchHandler'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function CarreraAddModal({ closeModal }) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    setError
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  const [nivel, setNivel] = useState({ loading: false, data: [], error: null })

  useEffect(() => {
    setNivel({ ...nivel, loading: true })
    appFetch(`${BASE_OFERTA_URL}/rye/carrera/param_crear`)
      .then(niveles => {
        setNivel({ ...nivel, loading: false, data: niveles })
      })
      .catch(error => {
        setNivel({ ...nivel, loading: false, error })
      })
  }, [])

  const { addCarreraCarrera } = useOfertaAcademicaActions()

  const handleUpdate = handleLoading(async ({ nivel, ...data }) => {
    const id_nivel = nivel?.id_nivel

    const res = await addCarreraCarrera({ ...data, id_nivel, nivel: nivel.nombre })
    handleErrorInFormResponse(res, setError, closeModal)
  })

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        title="Agregar Carrera"
        closeModal={closeModal}
        errors={errors}
        loading={loading}
        className={'!max-h-[98vh] !mx-1 overflow-hidden'}
      >
        <form onSubmit={handleSubmit(handleUpdate)} className="p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex w-full [&>*]:flex-1 gap-4 items-end">
            <SelectInputControlledWithLabel
              labelText={'Nivel carrera'}
              control={control}
              name="nivel"
              rules={{ required: true }}
              error={nivel.error}
              loading={nivel.loading}
              show={'nombre'}
              options={nivel.data}
            />
            <div className="flex gap-2 items-center">
              <label className="font-semibold text-base md:text-lg">Prerrequisito técnico</label>
              <SwitchControlled control={control} defaultValue={false} name={'prerrequisito_tecnico'} />
            </div>
          </div>
          <InputWLabel
            name="nombre"
            registerProps={{ minLength: { value: 2, message: 'El nombre debe tener mínimo 2 caracteres.' } }}
            register={register}
            required
          />
          <InputWLabel name="titulo_femenino" labelText="Título femenino" register={register} required />
          <InputWLabel name="titulo_masculino" labelText="Título masculino" register={register} required />
          <InputWLabel
            name="fecha_creacion"
            labelText="Fecha de creación"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            register={register}
            required
          />
          <ButtonsContainer className="[&>button]:py-[7px] mt-5">
            <SubmitButton text="Guardar" loading={loading} />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
