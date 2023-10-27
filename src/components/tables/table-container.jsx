export function TableContainer({ children }) {
  return (
    <div
      id="table-container"
      className="py-2 px-4 min-h-[290px] h-auto overflow-auto border border-gris w-full [&_td:last-of-type]:pl-2 relative"
    >
      {children}
    </div>
  )
}
