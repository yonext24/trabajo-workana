export const centrosExcelToJsonColsMapper = {
  SECTOR: 'sector',
  CODIGO_SECTOR: 'codigo_sector',
  ESTABLECIMIENTO: 'establecimiento',
  CODIGO_ESTABLECIMIENTO: 'codigo_establecimiento',
  TITULO: 'titulo',
  CODIGO_TITULO: 'codigo_titulo',
  DEPARTAMENTO: 'departamento',
  MUNICIPIO: 'municipio'
}

export const geografiaExcelToJsonColsMapper = {
  PAIS: 'pais',
  DEPARTAMENTO: 'departamento',
  MUNICIPIO: 'municipio',
  NACIONALIDAD: 'nacionalidad',
  CODIGO: 'codigo_postal'
}

export const reportesJsonToExcelColsMapper = {
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
export const reportesRowTypesToJson = {
  codigo_carrera_activa: 'boolean',
  codigo_prerrequisito: 'boolean',
  estado_ingreso: 'boolean',
  estado_reingreso: 'boolean',
  estado_cierre: 'boolean',
  estado_graduado: 'boolean',
  fecha_activacion: 'date',
  fecha_creacion: 'date'
}
