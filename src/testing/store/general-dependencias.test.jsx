import { expect, describe, test } from 'vitest'
import { renderWithProviders } from '../testing-utils'
import { act } from 'react-dom/test-utils'
import { setupStore } from '@/store'
import { add_dependencias } from '@/store/general/dependenciasThunks'
import { TableDependencias } from '@/components/tables/general/table-dependencias/table-dependencias'

describe('Testing de tabla de general/dependencias', async () => {
  const store = setupStore()
  const { getByText } = renderWithProviders(
    <TableDependencias permissions={{ UPDATE: true }} />,
    { store }
  )

  test('Agregar un nuevo sector y verificar que se haya agregado', async () => {
    const newData = { nombre: 'testing' }

    await act(async () => {
      store.dispatch(add_dependencias({ newData }))
      await new Promise(resolve => setTimeout(resolve, 3000))
    })

    const text = getByText('testing')
    expect(text).toBeInTheDocument()
  })
})
