import * as XLSX from 'xlsx'

export const createExcelFromJson = (json, fileName = 'Reportes') => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(json)
  XLSX.utils.book_append_sheet(wb, ws, 'Reportes')
  XLSX.writeFile(wb, `${fileName}.xlsx`)

  return ws
}

export const createCSVFromJson = (json, fileName = 'Reportes') => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(json)
  XLSX.utils.book_append_sheet(wb, ws, 'Reportes')
  XLSX.writeFile(wb, `${fileName}.csv`)

  return ws
}
