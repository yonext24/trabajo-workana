export function FormErrorMessage({ errors, className }) {
  const error = Object.entries(errors)[0]

  return (
    <>
      {error?.[1]?.message && (
        <span className={`text-red-500 text-center ${className ?? ''}`}>
          {error[1].message}
        </span>
      )}
    </>
  )
}
