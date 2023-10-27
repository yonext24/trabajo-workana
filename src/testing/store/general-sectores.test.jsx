import { expect, describe, test } from 'vitest'
import { renderWithProviders } from '../testing-utils'
import { act } from 'react-dom/test-utils'
import { TableGeneral } from '@/components/tables/general/table-general/table-general'
import { setupStore } from '@/store'
import { add_sectores_data } from '@/store/general/sectoresThunks'

describe('Testing de tabla de general/sectores', async () => {
  const store = setupStore()
  const { getByText } = renderWithProviders(
    <TableGeneral permissions={{ UPDATE: true }} />,
    { store }
  )

  test('Agregar un nuevo sector y verificar que se haya agregado', async () => {
    const newData = 'testing'

    await act(async () => {
      store.dispatch(add_sectores_data({ newData }))
      await new Promise(resolve => setTimeout(resolve, 3000))
    })

    const text = getByText(newData)
    expect(text).toBeInTheDocument()
  })
})
