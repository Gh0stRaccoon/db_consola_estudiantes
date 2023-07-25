const {
  crear_estudiante,
  consultar_estudiantes,
  editar_estudiante,
  eliminar_estudiante
} = require("./controllers/students.js")


function init() {
  const palabras = process.argv
  const accion = palabras[2]

  if (accion == 'nuevo') {
    crear_estudiante(palabras)
  }
  else if (accion == 'consulta') {
    consultar_estudiantes()
  }
  else if (accion == 'eliminar') {
    eliminar_estudiante(palabras)
  }
  else if (accion == 'editar') {
    editar_estudiante(palabras)
  }
  else {
    console.log("Acción no implementada")
  }
}
init()




