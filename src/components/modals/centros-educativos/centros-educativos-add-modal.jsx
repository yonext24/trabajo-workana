import { useForm } from 'react-hook-form'
import { DefaultModalLayout } from '../default-modal-layout'
import { ModalBackground } from '../modal-background'
import { ControlledInputFileWDrop } from '@/components/common/input-file-w-drop'
import { ButtonsContainer } from '../buttons-container'
import { SubmitButton } from '@/components/common/submit-button'
import { useCallback } from 'react'
import { geografia } from '@/utils/routes'
import { CentrosEducativosAddTable } from '@/components/tables/centros-educativos/centros-educativos-add-table'
import { useCentrosEducativosActions } from '@/hooks/useCentrosEducativosActions'

export function CentrosEducativosAddModal({ closeModal }) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    watch
  } = useForm()

  const data = watch('data')

  const { addCentrosExcel, setShouldRevalidate } = useCentrosEducativosActions()

  const onSubmit = async ({ data }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const parsedData = data.map(({ departamento, municipio, codigo_titulo, ...rest }) => ({
        ...rest,
        codigo_titulo: String(codigo_titulo)
      }))

      await addCentrosExcel(parsedData)
      setShouldRevalidate()
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
      const res = await geografia.get_departamentos_municipios_guatemala()

      const { parseExcel } = await import('@/utils/excel/parseExcel')
      const { mapCentrosExcel } = await import('@/utils/excel/mappers')

      const json = await parseExcel(file)
      const parsedRows = mapCentrosExcel(json, res)

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
        title={'Cargar Excel de Centros Educativos'}
        className={`max-h-[98vh] ${data && '!max-w-[1100px]'}`}
        errors={errors}
        loading={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col overflow-y-auto p-2">
          <div className="min-h-[400px] grid grid-rows-[1fr,auto] [&>*]:flex-1">
            <ControlledInputFileWDrop
              control={control}
              id={'data'}
              name={'data'}
              rules={{ required: { value: true, message: 'Debes subir un archivo!' } }}
              handleParseFile={handleParseFile}
            />
            {data && (
              <>
                <div className="overflow-y-auto">
                  <CentrosEducativosAddTable data={data} />
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
