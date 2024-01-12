import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { ControlledInputFileWDrop } from '@/components/common/input-file-w-drop'
import { RawTableGeografia } from '@/components/tables/geografia/table-geografia'
import { ButtonsContainer } from '../buttons-container'
import { SubmitButton } from '@/components/common/submit-button'
import { geografia } from '@/utils/routes'
import { useGeografiaActions } from '@/hooks/useGeografiaActions'
import { useCallback } from 'react'

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
      closeModal()
    } catch (err) {
      setError('root.fetchError', { type: 'to-not-invalidate', err })
    }
  }

  const handleParseFile = useCallback(async file => {
    const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isExcel) {
      throw new Error('El archivo debe ser de tipo excel')
    }

    try {
      const { parseExcel } = await import('@/utils/excel/parseExcel')
      const { mapGeografiaExcel } = await import('@/utils/excel/mappers')

      const json = await parseExcel(file)
      const parsedRows = await mapGeografiaExcel(json)
      return parsedRows
    } catch (err) {
      const errMessage =
        err instanceof Error ? err.message : 'Ocurrió un error desconocido, si el error persiste infórmele a soporte'
      throw new Error(errMessage)
    }
  }, [])

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
              handleParseFile={handleParseFile}
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
                <ButtonsContainer disabled={isSubmitting} className={'py-3'}>
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
