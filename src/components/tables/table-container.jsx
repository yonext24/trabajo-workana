export function TableContainer ({ children }) {
  return <div id='table-container' className="py-2 px-4 border border-gris w-full [&_td:last-of-type]:pl-2 relative">
    {children}
  </div>
}
