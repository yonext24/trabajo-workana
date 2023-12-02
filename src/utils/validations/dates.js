export const validateDate = date => {
  if (new Date(date) < new Date()) {
    return 'La fecha de desactivación no puede ser menor a la fecha actual.'
  }
}
