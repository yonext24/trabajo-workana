import { expect, test } from 'vitest'
import { renderWithProviders } from './testing-utils'
import { fireEvent } from '@testing-library/react'
import { Login } from '@/pages/login'
import { act } from 'react-dom/test-utils'

test('Debería fallar el login', async () => {
  const { getByText, getByLabelText } = renderWithProviders(<Login />)

  const usernameInput = getByLabelText('Nombre')
  const passwordInput = getByLabelText('Contraseña')

  await act(async () => {
    fireEvent.change(usernameInput, { target: { value: 'fakeUser' } })
    fireEvent.change(passwordInput, { target: { value: 'fakePassword' } })
    fireEvent.click(getByText('Entrar'))
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  const errorMessage = await getByText('Nombre de usuario no válido.')
  expect(errorMessage).toBeInTheDocument()
})
