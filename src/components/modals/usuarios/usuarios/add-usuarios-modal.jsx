import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useCallback } from 'react'
import { ButtonsContainer } from '../../buttons-container'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { useModalLogic } from '@/hooks/useModalLogic'
import { toast } from 'react-toastify'
import { SubmitButton } from '@/components/common/submit-button'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { geografia, usuarios } from '@/utils/routes'
import { number_input_pattern_validation as pattern } from '@/utils/validations/numbers'
import { username_validation } from '@/utils/validations/usuario'
import { validateDate } from '@/utils/validations/dates'
import { handleErrorInFormResponse } from '@/utils/consts'

const fetch_data = async () => {
  return await usuarios.usuarios.getParameters()
}

export function AddUsuariosModal({ closeModal }) {
  const {
    loading: loadingPaises,
    error: errorPaises,
    data: dataPaises
  } = useFetchLocalData({ func: geografia.get_parametros, initialData: { paises: [], departamentos: [] } })
  const {
    loading: paramsLoading,
    error: paramsError,
    data: paramsData
  } = useFetchLocalData({ func: fetch_data, initialData: { dependencias: [], roles: [], puestos: [] } })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()
  const { createUsuario } = useUsuariosActions()
  useModalLogic({ closeModal, noScroll: true })

  const onSubmit = useCallback(async data => {
    const { rol, dependencia, puesto, ref_oficio, fecha_desactivacion, pais, ...restOfUser } = data
    const { id: id_dependencia } = dependencia
    const { id: id_rol } = rol
    const { id: id_puesto } = puesto
    const { id_pais, nacionalidad } = pais

    const otros = {
      id_dependencia,
      id_rol,
      id_puesto,
      ref_oficio,
      fecha_desactivacion
    }

    const parsedUserToSend = { usuario: { ...restOfUser, id_pais, nacionalidad }, otros }

    const res = await createUsuario(parsedUserToSend)
    handleErrorInFormResponse(res, setError, () => {
      toast.success('El usuario se creó correctamente.')
      closeModal()
    })
  }, [])
  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        errors={errors}
        loading={loading}
        closeModal={closeModal}
        className="!max-w-4xl !max-h-[95vh]"
        title="Agregar usuario"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 grid grid-cols-2 gap-2 gap-x-12 font-semibold text-lg overflow-y-scroll"
        >
          <InputWLabel register={register} type="text" id="nombres" name="nombres" required />
          <InputWLabel register={register} type="text" id="apellidos" name="apellidos" required />
          <InputWLabel register={register} type="number" registerProps={{ pattern }} id="telefono" name="telefono" />
          <InputWLabel register={register} type="number" registerProps={{ pattern }} id="celular" name="celular" />
          <InputWLabel register={register} type="number" registerProps={{ pattern }} id="CUI" name="CUI" required />
          <InputWLabel
            register={register}
            type="text"
            id="registro_personal"
            name="registro_personal"
            labelText="Registro de personal"
          />
          <InputWLabel register={register} type="email" id="correo" name="correo" required />
          <SelectInputControlledWithLabel
            labelText={'País'}
            control={control}
            options={dataPaises.paises}
            loading={loadingPaises}
            error={errorPaises}
            name="pais"
            id="pais"
            show="nombre"
            rules={{ required: true }}
          />
          <InputWLabel
            register={register}
            type="text"
            id="usuario"
            name="usuario"
            registerProps={{ ...username_validation }}
            required
          />
          <SelectInputControlledWithLabel
            labelText={'Rol'}
            control={control}
            options={paramsData.roles}
            show="nombre"
            name="rol"
            loading={paramsLoading}
            error={paramsError}
            registerProps={{ required: true }}
          />
          <SelectInputControlledWithLabel
            labelText={'Dependencia'}
            control={control}
            options={paramsData.dependencias}
            show={'nombre'}
            name="dependencia"
            loading={paramsLoading}
            error={paramsError}
            registerProps={{ required: true }}
          />
          <SelectInputControlledWithLabel
            labelText={'Puesto'}
            control={control}
            options={paramsData.puestos}
            show="nombre"
            name="puesto"
            loading={paramsLoading}
            error={paramsError}
            registerProps={{ required: true }}
          />
          <InputWLabel
            register={register}
            type="text"
            id="ref_oficio"
            labelText="Referencia de oficio"
            name="ref_oficio"
          />
          <InputWLabel
            register={register}
            type="date"
            id="fecha_desactivacion"
            labelText="Fecha de desactivación"
            registerProps={{
              required: true,
              validate: validateDate
            }}
            required
          />

          <div className="col-start-1 col-end-3">
            <ButtonsContainer closeModal={closeModal} disabled={loading}>
              <SubmitButton loading={loading} />
            </ButtonsContainer>
          </div>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
