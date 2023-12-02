import { SubmitButton } from '@/components/common/submit-button'
import { InputWLabel } from '../../common/input-w-label'
import { ModalBackground } from '../modal-background'
import { useForm } from 'react-hook-form'
import { useFormCustom } from '@/hooks/useFormCustom'
import { useModalLogic } from '@/hooks/useModalLogic'
import { useAuthActions } from '@/hooks/useAuthActions'
import { DefaultModalLayout } from '../default-modal-layout'
import { ButtonsContainer } from '../buttons-container'
import { handleErrorInFormResponse } from '@/utils/consts'
import { toast } from 'react-toastify'

export function PasswordRecoveryModal({ closeModal }) {
  const {
    handleSubmit,
    formState: { errors },
    setError,
    register
  } = useForm()
  const { loading, handleLoading } = useFormCustom()
  useModalLogic({ closeModal })

  const { RecoverPassword } = useAuthActions()

  const onSubmit = handleLoading(async ({ correo }) => {
    const res = await RecoverPassword({ correo })

    handleErrorInFormResponse(res, setError, res => {
      toast.success(res.payload.result ?? 'Se ha enviado un correo de recuperación')
      closeModal()
    })
  })

  return (
    <ModalBackground onClick={closeModal}>
      <DefaultModalLayout closeModal={closeModal} title="Recuperar Contraseña" loading={loading} errors={errors}>
        <form
          onClick={e => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-lg w-full h-[60vh] gap-y-3 flex flex-col max-w-lg mx-auto px-16 py-8"
        >
          <h1 className="text-2xl font-semibold text-center mb-2">Recuperar contraseña</h1>
          <InputWLabel
            labelText={'Correo'}
            register={register}
            id="correo"
            type="email"
            name="correo"
            autoFocus
            inputClassName="mt-2"
          />
          <ButtonsContainer alone className="mt-auto">
            <SubmitButton loading={loading} text="Enviar" />
          </ButtonsContainer>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
