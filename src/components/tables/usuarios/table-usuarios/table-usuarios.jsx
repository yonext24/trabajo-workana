import { useSelector } from 'react-redux'

const toShow = [
  'usuario',
  'nombres',
  'apellidos',
  'telefono',
  'celular',
  'CUI',
  'registro_personal',
  'correo',
  'nacionalidad'
]

export function TableUsuarios() {
  const showing = useSelector(s => s.usuarios.usuarios.showing)

  console.log({ showing })

  return (
    <div
      className="border border-gris flex flex-col w-full font-bold
  [&>#row]:grid [&>#row]:grid-cols-2 [&_#td]:py-[9px] [&_#row:not(:last-of-type)>#td]:border-b [&_#td]:px-2"
    >
      {toShow
        .map(key => ({ [key]: showing[key] }))
        .map(el => {
          const element = Object.entries(el)[0]

          return (
            <div id="row" key={element[0]}>
              <div id="td" className="capitalize border-r">
                {element[0].replace(/_/g, ' ')}
              </div>
              <div id="td" className="text-center">
                {element[1]}
              </div>
            </div>
          )
        })}
    </div>
  )
}

// {
//   nombres: 'María',
//   apellidos: 'González',
//   telefono: '123456789',
//   celular: '987654321',
//   cui: '1234567890123',
//   registro_de_personal: 'RP12345',
//   correo: 'maria@example.com',
//   pais: 'Guatemala',
//   usuario: 'maria_g',
//   rol: 'Empleado',
//   dependencia: 'Departamento de Ventas',
//   puesto: 'Ejecutivo de Ventas',
//   referencia_de_oficio: 'OF123',
//   fecha_de_desactivacion: '2023-12-31'
// }

// ------------------------>

// [
//   ['nombres', 'María'],
//   ['apellidos', 'González'],
//   ['telefono', '123456789'],
//   ['celular', '987654321'],
//   ['cui', '1234567890123'],
//   ['registro_de_personal', 'RP12345'],
//   ['correo', 'maria@example.com'],
//   ['pais', 'Guatemala'],
//   ['usuario', 'maria_g'],
//   ['rol', 'Empleado'],
//   ['dependencia', 'Departamento de Ventas'],
//   ['puesto', 'Ejecutivo de Ventas'],
//   ['referencia_de_oficio', 'OF123'],
//   ['fecha_de_desactivacion', '2023-12-31']
// ]
