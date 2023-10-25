import { FormErrorMessage } from '../common/form-error-message'
import { Plus } from '../icons'

export function DefaultModalLayout ({ title, className, children, closeModal = false, noButton = false, loading, errors }) {
  return <div className={`border-2 border-black flex flex-col w-full bg-white max-w-xl ${className ?? ''}`} onClick={e => e.stopPropagation()}>
    <header className="bg-azulfondo text-white py-1 text-center border-b-2 border-black relative">
      <span className="font-semibold">{title}</span>
      {!noButton && <button disabled={loading} onClick={() => { closeModal && closeModal() }} className="rounded-full p-px absolute right-1 top-1/2 -translate-y-1/2 border-2 border-white text-white">
        <Plus className='h-4 w-4 rotate-45' strokeWidth={3} />
      </button>}
    </header>
    {children}
    {
      errors && <FormErrorMessage errors={errors} className='mb-2' />
    }
  </div>
}
