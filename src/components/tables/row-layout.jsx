export function RowLayout({ children, ...props }) {
  return (
    <tr
      className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]"
      {...props}
    >
      {children}
    </tr>
  )
}
