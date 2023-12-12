const db = require('./db')
const helper = require('../helper')
const config = require('../config')

//Función con la consulta para insertar datos en la base de datos: INSERT
async function insertData(req, res) {

    //data tiene los datos que vamos a insertar en la base de datos. Los coge de req.query
    //Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query
    const result = await db.query(
        `Insert into coleccion(nombre,marca,tipo,precio) values ('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')` // REQ COGE LOS DATOS QUENTE MADNA Y LO GUARDA Y FETCH LOS PIDE
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido modificado o añadido. Si ese número es mayor que cero es que ha habido inserción en la base de datos.*/
    return result.affectedRows
}

// FUNCION CON CONSULTA DE OBTENER DATOS DE LA BD SELECT ^FROM COLLECTION
async function getData(req, res) {
    // ROWS ALMACENA LOS DATOS OBTENIDOS EN LA CONSULTA SELECT
    const rows = await db.query(
        `SELECT * FROM coleccion`
    )
    // LOS DATOS OBTENIDOS DE LA CONSULTA SELECT SE PASAN POR LA FUNCION HELPER PA VE SI NO HAY DATOS DEVUELTOS, DEVUELVA ARRAY VACIO
    const data = helper.emptyOrRows(rows)

    // DEVOLVEMOS EL RESULT DEL SELECT, QUE SE ALMACENO ENLA VARIABLE DATA
    return {
        data
    }
}


//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(req, res) {
    //En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.query
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ${data.id}`
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido borrado. Si ese número es mayor que cero es que ha habido borrado en la base de datos.*/
    return result.affectedRows
}

// CREAR AQUI PARA LA NUEVA TABLA EL INSERT SELECT Y DELETE   ---------------------------------------------------------

async function insertUser(req, res) {

    //data tiene los datos que vamos a insertar en la base de datos. Los coge de req.query
    //Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query
    const result = await db.query(
        `Insert into usuasrios(nombre,login,password,rol) values ('${data.nombre}', '${data.login}', '${data.password}', '${data.rol}')` // REQ COGE LOS DATOS QUENTE MADNA Y LO GUARDA Y FETCH LOS PIDE
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido modificado o añadido. Si ese número es mayor que cero es que ha habido inserción en la base de datos.*/
    return result.affectedRows
}

// FUNCION CON CONSULTA DE OBTENER DATOS DE LA BD SELECT ^FROM COLLECTION
async function getUser(req, res) {
    // ROWS ALMACENA LOS DATOS OBTENIDOS EN LA CONSULTA SELECT
    const rows = await db.query(
        `SELECT * FROM usuarios`
    )
    // LOS DATOS OBTENIDOS DE LA CONSULTA SELECT SE PASAN POR LA FUNCION HELPER PA VE SI NO HAY DATOS DEVUELTOS, DEVUELVA ARRAY VACIO
    const data = helper.emptyOrRows(rows)

    // DEVOLVEMOS EL RESULT DEL SELECT, QUE SE ALMACENO ENLA VARIABLE DATA
    return {
        data
    }
}


//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteUser(req, res) {
    //En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.query
    const result = await db.query(
        `DELETE FROM usuarios WHERE id = ${data.id}`
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido borrado. Si ese número es mayor que cero es que ha habido borrado en la base de datos.*/
    return result.affectedRows
}

// --------------------------------------------------------------------- ESTO PA LA RECU
async function insertPrestamo(req, res) {

    //data tiene los datos que vamos a insertar en la base de datos. Los coge de req.query
    //Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query
    const result = await db.query(
        `Insert into prestamo2(id,articulo,persona,fecha) values ('${data.id}', '${data.articulo}','${data.persona}','${data.fecha}')` // REQ COGE LOS DATOS QUE TE MADNA Y LO GUARDA Y FETCH LOS PIDE
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido modificado o añadido. Si ese número es mayor que cero es que ha habido inserción en la base de datos.*/
    return result.affectedRows
}

// FUNCION CON CONSULTA DE OBTENER DATOS DE LA BD SELECT ^FROM COLLECTION
async function getPrestamo(req, res) {
    // ROWS ALMACENA LOS DATOS OBTENIDOS EN LA CONSULTA SELECT
    const rows = await db.query(
        `SELECT * FROM prestamo2`
    )
    // LOS DATOS OBTENIDOS DE LA CONSULTA SELECT SE PASAN POR LA FUNCION HELPER PA VE SI NO HAY DATOS DEVUELTOS, DEVUELVA ARRAY VACIO
    const data = helper.emptyOrRows(rows)

    // DEVOLVEMOS EL RESULT DEL SELECT, QUE SE ALMACENO ENLA VARIABLE DATA
    return {
        data
    }
}


//Función con la consulta para borrar datos de la base de datos: DELETE
async function deletePrestamo(req, res) {
    //En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.query
    const result = await db.query(
        `DELETE FROM prestamo2 WHERE id = ${data.id}`
    )
    /*En la variable result se almacena lo que devueve la consulta. Si accedemos a effectedRow nos da el número de filas de la base de
    datos que ha sido borrado. Si ese número es mayor que cero es que ha habido borrado en la base de datos.*/
    return result.affectedRows
}





module.exports = {
    getData,
    insertData,
    deleteData,
    insertUser,
    deleteUser,
    getUser,
    insertPrestamo, // -> AÑADIR ESTO IMPORTANTE
    getPrestamo,
    deletePrestamo
}

