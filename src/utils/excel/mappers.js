import {
  centrosExcelToJsonColsMapper,
  geografiaExcelToJsonColsMapper,
  reportesJsonToExcelColsMapper,
  reportesRowTypesToJson
} from './excel-cols-rows'

export const mapCentrosExcel = (excelRows, { departamentos, municipios }) => {
  const parsedRows = excelRows.map(row => {
    const parsedRow = {}
    for (const key in row) {
      const value = row[key]
      const newKey = centrosExcelToJsonColsMapper[key]
      if (newKey === undefined)
        throw new Error(
          'El formato del excel es incorrecto, debe tener las columnas: SECTOR, CODIGO_SECTOR, ESTABLECIMIENTO, CODIGO_ESTABLECIMIENTO, TITULO, CODIGO_TITULO, DEPARTAMENTO y MUNICIPIO'
        )
      if (newKey) parsedRow[newKey] = value
    }

    const foundDepartamento = departamentos.find(
      dep => String(dep.nombre).toLowerCase() === String(parsedRow.departamento).toLowerCase()
    )
    if (foundDepartamento === undefined)
      throw new Error(`El departamento ${parsedRow.departamento} no existe, asegúrese de que el nombre sea correcto.`)
    const foundMunicipio = municipios.find(
      mun => String(mun.nombre).toLowerCase() === String(parsedRow.municipio).toLowerCase()
    )
    if (foundMunicipio === undefined)
      throw new Error(`El municipio ${parsedRow.municipio} no existe, asegúrese de que el nombre sea correcto.`)

    parsedRow.id_departamento = foundDepartamento.id_departamento
    parsedRow.id_municipio = foundMunicipio.id_municipio

    return parsedRow
  })

  return parsedRows
}

export const mapGeografiaExcel = excelRows => {
  const parsedRows = excelRows.map(row => {
    const parsedRow = {}
    for (const key in row) {
      const value = row[key]
      const newKey = geografiaExcelToJsonColsMapper[key]
      if (newKey === undefined)
        throw new Error(
          'El formato del excel es incorrecto, debe tener las columnas: PAIS, DEPARTAMENTO, MUNICIPIO, NACIONALIDAD y CODIGO'
        )
      if (newKey) parsedRow[newKey] = value
    }

    const id = `${parsedRow.pais}-${parsedRow.departamento}-${parsedRow.municipio}`

    parsedRow.id = id

    for (const key in geografiaExcelToJsonColsMapper) {
      const value = geografiaExcelToJsonColsMapper[key]
      if (parsedRow[value] === undefined)
        throw new Error(
          'El formato del excel es incorrecto, debe tener las columnas: PAIS, DEPARTAMENTO, MUNICIPIO, NACIONALIDAD y CODIGO'
        )
    }

    return parsedRow
  })

  return parsedRows
}

export const reportesJsonToExcelMapper = json => {
  const parsedJson = json.map(row => {
    const parsedRows = {}

    for (const key in row) {
      const parsedColumn = reportesJsonToExcelColsMapper[key] ?? key

      if (reportesRowTypesToJson[key] === 'boolean') {
        parsedRows[parsedColumn] = row[key] ? '1' : '0'
        continue
      }

      parsedRows[parsedColumn] = row[key]
    }

    return parsedRows
  })

  return parsedJson
}
