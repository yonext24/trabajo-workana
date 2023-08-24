import { useModalLogic } from '../../hooks/useModalLogic'

export function ModalBackground ({ children, className, closeModal, ...props }) {
  useModalLogic({ closeModal })

  return <div
    id='modalBackground'
    className={`bg-black/30 animate-appear fixed top-0 left-0 w-screen px-4 h-screen z-50 flex justify-center items-center ${className}`}
    {...props}
  >
    {children}
  </div>
}
