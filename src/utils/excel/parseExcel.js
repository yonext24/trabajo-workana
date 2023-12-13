import * as XLSX from 'xlsx'

export const parseExcel = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = e => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })

      const firstSheet = workbook.SheetNames[0]
      const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet])
      resolve(excelRows)
    }

    reader.onerror = e => {
      reject(e)
    }

    reader.readAsArrayBuffer(file)
  })
}
