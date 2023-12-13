import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../../default-modal-layout'
import { ModalBackground } from '../../modal-background'
import { InputWLabel } from '@/components/common/input-w-label'
import { useSelector } from 'react-redux'
import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { ButtonsContainer } from '../../buttons-container'
import { toast } from 'react-toastify'
import { SelectInputControlledWithLabel } from '@/components/common/select-input/select-input-controlled-with-label'
import { SubmitButton } from '@/components/common/submit-button'
import { useModalLogic } from '@/hooks/useModalLogic'
import { handleErrorInFormResponse } from '@/utils/consts'
import { geografia } from '@/utils/routes'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { number_input_pattern_validation as pattern } from '@/utils/validations/numbers'
import { useMemo } from 'react'

export function UpdateUsuariosModal({ closeModal }) {
  const showing = useSelector(s => s.usuarios.usuarios.showing)
  const {
    loading: loadingPaises,
    error: errorPaises,
    data: dataPaises
  } = useFetchLocalData({ func: geografia.get_parametros, initialData: { paises: [], departamentos: [] } })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
    setError
  } = useForm()
  const { updateUsuario, searchUsuario } = useUsuariosActions()
  useModalLogic({ closeModal, noScroll: true })

  const { nombres, apellidos, telefono, celular, CUI, registro_personal, correo, usuario, otros, id_pais } = showing
  const rol = otros?.rol

  const handleUpdate = async ({ pais, ...rawData }) => {
    const data = { ...rawData, id_pais: pais?.id_pais, nacionalidad: pais?.nacionalidad }
    const res = await updateUsuario(data)
    handleErrorInFormResponse(res, setError, async () => {
      await searchUsuario({ correo: data.correo })
      toast.success('El usuario se actualizó correctamente.')
      closeModal()
    })
  }

  const defaultPais = useMemo(() => {
    if (id_pais === undefined) return null
    if (dataPaises?.paises?.length === 0) return null

    return dataPaises.find(pais => pais.id_pais === id_pais)
  }, [id_pais, dataPaises.paises])

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        className="!max-w-4xl !max-h-[95vh]"
        title="Actualizar Usuario"
        errors={errors}
        loading={loading}
      >
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="p-6 grid grid-cols-2 gap-2 gap-x-12 font-semibold text-lg "
        >
          <InputWLabel register={register} type="text" id="usuario" name="usuario" disabled defaultValue={usuario} />
          <SelectInputControlledWithLabel labelText="Rol" control={control} name="rol" disabled defaultValue={rol} />
          <InputWLabel register={register} type="text" id="nombres" name="nombres" defaultValue={nombres} required />
          <InputWLabel
            register={register}
            type="text"
            id="apellidos"
            name="apellidos"
            defaultValue={apellidos}
            required
          />
          <InputWLabel
            register={register}
            labelText={'Teléfono'}
            type="number"
            id="telefono"
            name="telefono"
            registerProps={{ pattern }}
            defaultValue={telefono}
          />
          <InputWLabel
            register={register}
            type="number"
            id="celular"
            name="celular"
            registerProps={{ pattern }}
            defaultValue={celular}
          />
          <InputWLabel register={register} type="number" id="CUI" name="CUI" defaultValue={CUI} disabled />
          <InputWLabel
            register={register}
            type="text"
            id="registro_personal"
            disabled
            name="registro_personal"
            defaultValue={registro_personal}
            labelText="Registro de personal"
          />
          <InputWLabel register={register} type="text" id="correo" name="correo" defaultValue={correo} required />
          <SelectInputControlledWithLabel
            labelText={'País'}
            control={control}
            options={dataPaises}
            loading={loadingPaises}
            error={errorPaises}
            name="pais"
            id="pais"
            show="nombre"
            rules={{ required: true }}
            defaultValue={defaultPais}
          />

          <div className="col-start-1 col-end-3 mt-6">
            <ButtonsContainer closeModal={closeModal} disabled={loading}>
              <SubmitButton text="Actualizar" loading={loading} />
            </ButtonsContainer>
          </div>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
