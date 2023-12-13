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

export const reportesJsonToExcelMapper = json => {
  const columnMapper = {
    codigo_ua: 'Código Unidad Académica',
    unidad: 'Unidad Académica',
    codigo_extension: 'Código Extensión',
    extension: 'Extensión',
    codigo_carrera: 'Código Carrera',
    carrera: 'Carrera',
    codigo_nivel: 'Código Nivel',
    nivel: 'Nivel Académico',
    codigo_carrera_activa: 'Código Carrera Activa',
    carrera_activa: 'Carrera Activa',
    codigo_prerrequisito: 'Código Prerrequisito',
    prerrequisito: 'Prerrequisito',
    fecha_activacion: 'Fecha de Activación',
    fecha_creacion: 'Fecha de Creación',
    estado_ingreso: 'Estado Ingreso',
    estado_reingreso: 'Estado Reingreso',
    estado_cierre: 'Estado Cierre',
    estado_graduado: 'Estado Graduado'
  }
  const rowMapper = {
    codigo_carrera_activa: 'boolean',
    codigo_prerrequisito: 'boolean',
    estado_ingreso: 'boolean',
    estado_reingreso: 'boolean',
    estado_cierre: 'boolean',
    estado_graduado: 'boolean',
    fecha_activacion: 'date',
    fecha_creacion: 'date'
  }

  const parsedJson = json.map(row => {
    const parsedRows = {}

    for (const key in row) {
      const parsedColumn = columnMapper[key] ?? key

      if (rowMapper[key] === 'boolean') {
        parsedRows[parsedColumn] = row[key] ? '1' : '0'
        continue
      }
      if (rowMapper[key] === 'date') {
        const newDate = new Date(row[key])
        const day = newDate.getDate()
        const month = newDate.getMonth()
        const year = newDate.getFullYear()
        const date = `${day}/${month}/${year}`
        parsedRows[parsedColumn] = date
        continue
      }

      parsedRows[parsedColumn] = row[key]
    }

    return parsedRows
  })

  return parsedJson
}
