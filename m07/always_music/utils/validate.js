const validarRut = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/
const validarNombre = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/
const validarNivel = /^(?:[1]?\d|20)$/

const validateFull = (nombre, rut, curso, nivel) => {
  if (!nombre || !rut || !curso || !nivel) {
    throw new Error('Faltaron parametros por ingresar')
  }
  if (!RegExp(validarRut).test(rut)) {
    throw new Error('El rut no es válido')
  }
  if (!RegExp(validarNombre).test(nombre)) {
    throw new Error('El nombre no es válido')
  }
  if (!RegExp(validarNombre).test(curso)) {
    throw new Error('El curso no es válido')
  }
  if (!RegExp(validarNivel).test(nivel)) {
    throw new Error('El nivel no es válido')
  }
}

const validateRut = (rut) => {
  if (!rut) {
    throw new Error('Faltó el parámetro rut')
  }
  if (!rut || !RegExp(validarRut).test(rut)) {
    throw new Error('El rut no es válido')
  }
}

module.exports = {
  validateRut,
  validateFull
}