export function accentParser(texto) {
  const tildes = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U'
  }

  return texto.replace(/[áéíóúÁÉÍÓÚ]/g, letra => tildes[letra])
}
