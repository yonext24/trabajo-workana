import { RowLayout } from '../row-layout'

export function TableGeografiaRow({ departamento, municipio, codigo_postal }) {
  return (
    <RowLayout>
      <td>{departamento}</td>
      <td>{municipio}</td>
      <td className="!text-center">{codigo_postal}</td>
    </RowLayout>
  )
}
