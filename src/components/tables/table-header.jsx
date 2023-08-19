export function TableHeader ({ columns }) {
  return <thead className="border-b border-gris">

    <tr className="text-center [&_td]:pb-3 [&_td]:pt-1">

      {
        columns.map(col => <td className={`capitalize ${col.className ?? ''}`} key={col.text}>{col.text}</td>)
      }

    </tr>

  </thead>
}
