export function TableHeader({ columns }) {
  return (
    <thead className="border-b border-gris font-bold">
      <tr className="text-center text-xs sm:text-sm md:text-base [&_td]:pb-3 [&_td]:pt-1 [&_td]:px-2">
        {columns.map(col => (
          <td className={`capitalize ${col.className ?? ''}`} key={col.text}>
            {col.text}
          </td>
        ))}
      </tr>
    </thead>
  )
}
