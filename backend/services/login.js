const db = require('./db')
const helper = require('../helper')
const config = require('../config')

// HACER CONSULTA
async function getUserData (user, password) {
    const rows = await db.query(`
            select nombre, rol
            from usuarios
            where login = '${user}'
            and password ='${password}'

    `)

    const data = helper.emptyOrRows(rows[0]) // para ver si esta vacia la bd

    return {
        data 
    }
}

module.exports = {
    getUserData
}
