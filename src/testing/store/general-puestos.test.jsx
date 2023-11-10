import { expect, describe, test } from 'vitest'
import { renderWithProviders } from '../testing-utils'
import { act } from 'react-dom/test-utils'
import { setupStore } from '@/store'
import { TablePuestos } from '@/components/tables/general/table-puestos/table-puestos'
import { add_puestos } from '@/store/general/puestosThunks'

describe('Testing de tabla de general/puestos', async () => {
  const store = setupStore()
  const { getByText } = renderWithProviders(<TablePuestos permissions={{ UPDATE: true }} />, { store })

  test('Agregar un nuevo sector y verificar que se haya agregado', async () => {
    const newData = 'testing'

    await act(async () => {
      store.dispatch(add_puestos({ newData }))
      await new Promise(resolve => setTimeout(resolve, 3000))
    })

    const text = getByText(newData)
    expect(text).toBeInTheDocument()
  })
})
