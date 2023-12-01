export const nueva_contraseña_validations = {
  minLength: { value: 6, message: 'La nueva contraseña debe tener al menos 6 caracteres' },
  validate: (nueva, formValues) => {
    if (nueva === formValues.actual) return 'La nueva contraseña debe ser diferente a la actual.'
  }
}

export const confirmar_contraseña_validations = {
  validate: (confirmacion, formValues) => {
    if (confirmacion !== formValues.nuevo) return 'Las contraseñas no coinciden.'
  }
}
