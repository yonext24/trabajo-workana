// Como la mayoría de modales tienen 2 botones, y uno de ellos es para cerrar, hago este componente
// que recibe un sólo boton en children y el otro ya lo tengo controlado
export function ButtonsContainer({
  children,
  closeModal,
  alone,
  className,
  disabled
}) {
  return (
    <div
      id="buttons-container"
      className={`grid ${
        alone ? 'grid-cols-1' : 'grid-cols-2'
      } gap-12 text-white place-content-center
  [&>button]:py-3 [&>button:first-of-type]:ml-auto [&>button:last-of-type]:mr-auto [&>button]:bg-gris-oscuro
  [&>button]:w-full [&>button]:max-w-[140px] [&>button]:sm:max-w-[200px] [&>button]:rounded-md [&>button]:text-md [&>button]:sm:text-button ${
    className ?? ''
  }`}
    >
      {children}
      {!alone && (
        <button type="button" disabled={disabled} onClick={closeModal}>
          Salir
        </button>
      )}
    </div>
  )
}
