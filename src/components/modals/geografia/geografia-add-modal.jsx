import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { ControlledInputFileWDrop } from '@/components/common/input-file-w-drop'
import { RawTableGeografia } from '@/components/tables/geografia/table-geografia'
import { ButtonsContainer } from '../buttons-container'
import { SubmitButton } from '@/components/common/submit-button'
import { geografia } from '@/utils/routes'
import { useGeografiaActions } from '@/hooks/useGeografiaActions'

export function GeografiaAddModal({ closeModal }) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    watch
  } = useForm()

  const data = watch('data')
  const { getGeoParams } = useGeografiaActions()

  const onSubmit = async ({ data }) => {
    try {
      const parsedData = data.map(el => ({ ...el, codigo_postal: String(el.codigo_postal) }))
      await geografia.add(parsedData)
      void getGeoParams()
      // TO DO: REINICIAR LOS DATOS
    } catch (err) {
      console.log({ err })
      setError('root.fetchError', { type: 'to-not-invalidate', err })
    }
  }

  return (
    <ModalBackground closeModal={closeModal} onClick={closeModal}>
      <DefaultModalLayout
        closeModal={closeModal}
        title={'Agregar Geografía'}
        className={'max-h-[98vh]'}
        errors={errors}
        loading={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto">
          <div className="min-h-[400px] grid grid-rows-[1fr,auto] [&>*]:flex-1">
            <ControlledInputFileWDrop
              control={control}
              id={'data'}
              name={'data'}
              rules={{ required: { value: true, message: 'Debes subir un archivo!' } }}
            />
            {data && (
              <>
                <div className="overflow-y-auto">
                  <RawTableGeografia data={data} />
                </div>
                <ButtonsContainer disabled={isSubmitting}>
                  <SubmitButton loading={isSubmitting} text="Enviar" />
                </ButtonsContainer>
              </>
            )}
          </div>
        </form>
      </DefaultModalLayout>
    </ModalBackground>
  )
}
