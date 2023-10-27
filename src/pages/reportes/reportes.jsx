export function Reportes() {
  return (
    <div id="page-content" className="py-12 flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-neutral-800">
        Reporte de carreras
      </h1>

      <button className="w-[200px] bg-gris-oscuro text-white rounded-md my-1 py-2 text-2xl">
        CSV
      </button>
      <button className="w-[200px] bg-gris-oscuro text-white rounded-md my-1 py-2 text-2xl">
        Excel
      </button>
      <button className="w-[200px] bg-gris-oscuro text-white rounded-md my-1 py-2 text-2xl">
        PDF
      </button>
    </div>
  )
}
