import { useState } from 'react'

export function useModal() {
  const [modalName, setModalName] = useState(null)
  const [open, setOpen] = useState(false)

  const openModal = name => {
    setOpen(true)
    setModalName(name)
  }

  const closeModal = () => {
    setOpen(false)
    setModalName(null)
  }

  return { open, openModal, closeModal, modalName }
}
