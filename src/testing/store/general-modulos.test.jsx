import { expect, describe, test } from 'vitest'
import { renderWithProviders } from '../testing-utils'
import { act } from 'react-dom/test-utils'
import { setupStore } from '@/store'
import { TableModulos } from '@/components/tables/general/table-modulos/table-modulos'
import { add_modulos } from '@/store/general/modulosThunks'

describe('Testing de tabla de general/dependencias', async () => {
  const store = setupStore()
  const { getByText } = renderWithProviders(<TableModulos permissions={{ UPDATE: true }} />, { store })

  test('Agregar un nuevo sector y verificar que se haya agregado', async () => {
    const newData = { tipo: 'testing', nombre: 'unique' }

    await act(async () => {
      store.dispatch(add_modulos({ newData }))
      await new Promise(resolve => setTimeout(resolve, 3000))
    })

    const text = getByText('testing')
    expect(text).toBeInTheDocument()
  })
})
