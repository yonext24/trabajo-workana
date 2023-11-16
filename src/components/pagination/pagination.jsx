export function Pagination({ page, pages = 1, handlePageChange }) {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: pages }, (_, i) => i + 1).map(el => (
        <button
          key={el}
          onClick={() => {
            handlePageChange(el)
          }}
          className={`px-4 py-2 rounded-md border border-gris ${
            el === page ? 'bg-azulfondo text-white' : 'bg-white text-black'
          }`}
        >
          {el}
        </button>
      ))}
    </div>
  )
}
