export function FormErrorMessage({ errors, className }) {
  const error = Object.entries(errors)[0]
  let message

  if (error?.[1].message) {
    message = error?.[1].message
  } else {
    if (error === undefined) return
    if (error[0] !== 'root') return
    if (!error[1]['fetchError']) return
    message = error[1].fetchError.message
  }

  return (
    <>
      {message && (
        <span className={`text-red-500 text-center ${className ?? ''}`}>
          {message}
        </span>
      )}
    </>
  )
}
