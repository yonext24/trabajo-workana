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

export const mapGeografiaExcel = excelRows => {
  const columnMapper = {
    PAIS: 'pais',
    DEPARTAMENTO: 'departamento',
    MUNICIPIO: 'municipio',
    NACIONALIDAD: 'nacionalidad',
    CODIGO: 'codigo_postal'
  }

  const parsedRows = excelRows.map(row => {
    const parsedRow = {}
    for (const key in row) {
      const value = row[key]
      const newKey = columnMapper[key]
      if (newKey === undefined)
        throw new Error(
          'El formato del excel es incorrecto, debe tener las columnas: PAIS, DEPARTAMENTO, MUNICIPIO, NACIONALIDAD y CODIGO'
        )
      if (newKey) parsedRow[newKey] = value
    }

    const id = `${parsedRow.pais}-${parsedRow.departamento}-${parsedRow.municipio}`

    parsedRow.id = id

    for (const key in columnMapper) {
      const value = columnMapper[key]
      if (parsedRow[value] === undefined)
        throw new Error(
          'El formato del excel es incorrecto, debe tener las columnas: PAIS, DEPARTAMENTO, MUNICIPIO, NACIONALIDAD y CODIGO'
        )
    }

    return parsedRow
  })

  return parsedRows
}
