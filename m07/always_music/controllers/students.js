const pool = require("../config/db.js");
const { validateFull, validateRut } = require("../utils/validate.js")

async function crear_estudiante(palabras) {
  const nombre = palabras[3]
  const rut = palabras[4]
  const curso = palabras[5]
  const nivel = palabras[6]

  console.log(`Creando el estudiante ${nombre} con rut ${rut} ${curso} ${nivel}`);

  // 2. Ejecutar la consulta
  try {
    validateFull(nombre, rut, curso, nivel)
    // 1. Solicitar un cliente al pool de conecciones
    const client = await pool.connect()
    await client.query(
      'insert into estudiantes (rut, nombre, curso, nivel) values ($1, $2, $3, $4)',
      [rut, nombre, curso, parseInt(nivel)]
    )
    // 3. Devolvemos el cliente al pool
    client.release()

    console.log(`Se ha creado el alumno ${nombre}`)
  }
  catch (error) {
    console.log("Error de consulta PG", error)
    return
  }
}

async function consultar_estudiantes() {
  // 1. Solicitamos un cliente al pool
  const client = await pool.connect()

  // 2. Ejecutamos la consulta
  try {
    const { rows } = await client.query('select * from estudiantes')
    // 3. Devolvemos el cliente al pool
    client.release()

    // 4. Mostramos el resultado en consola
    console.log(rows)
  } catch (error) {
    console.log(error)
    return
  }
}

async function eliminar_estudiante(palabras) {
  const rut = palabras[3]
  console.log(`Eliminando alumno con el rut ${rut}...`)

  try {
    validateRut(rut)
    // 1. Solicitamos un cliente al pool
    const client = await pool.connect()
    // 2. Ejecutamos consulta
    const { rows } = await client.query('delete from estudiantes WHERE rut=$1 RETURNING *',
      [rut])

    // 3. Devolvemos el cliente al pool
    client.release()

    // 4. devolvemos el resultado a la vista
    console.log(`Se elimnó el usuario ${rows[0].nombre}`)

  } catch (error) {
    console.log(error)
    return
  }
}

async function editar_estudiante(palabras) {
  const rut = palabras[3]
  const nombre = palabras[4]
  const curso = palabras[5]
  const nivel = palabras[6]

  console.log(`Editando alumno con el rut ${rut}...`)
  try {
    validateFull(nombre, rut, curso, nivel)
    // 1. Solicitamos un cliente al pool
    const client = await pool.connect()
    // 2. Ejecutamos consulta
    const { rows } = await client.query('UPDATE estudiantes SET nombre=$2, curso=$3, nivel=$4 WHERE rut = $1 RETURNING *',
      [rut, nombre, curso, parseInt(nivel)])

    // 3. Devolvemos el cliente al pool
    client.release()

    // 4. devolvemos el resultado a la vista
    console.log(`Se editó el usuario ${rows[0].nombre}, ahora toca ${rows[0].curso} en nivel ${rows[0].nivel}`)
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports = {
  crear_estudiante,
  consultar_estudiantes,
  eliminar_estudiante,
  editar_estudiante
}