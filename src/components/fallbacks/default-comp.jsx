// El default comp es para asegurarse de que react no tire un error por intentar pasarle props a un componente que no existe
export function DefaultComp ({ props }) {
  return <span {...props} ></span>
}
