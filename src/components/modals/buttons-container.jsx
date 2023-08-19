// Como la mayoría de modales tienen 2 botones, y uno de ellos es para cerrar, hago este componente
// que recibe un sólo boton en children y el otro ya lo tengo controlado
export function ButtonsContainer ({ children, closeModal }) {
  return <div id='buttons-container' className="grid grid-cols-2 gap-12 text-white px-12
  [&>button]:py-1 [&>button]:text-button [&>button]:bg-gris-oscuro [&>button]:rounded-md">
    {children}
    <button type='button' onClick={closeModal}>Salir</button>

  </div>
}
