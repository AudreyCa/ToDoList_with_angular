const Pool = require("pg").Pool
// librairie pg (postgres)

// On instancie une nouvelle pool avec le contenu de notre BDD
const pool = new Pool({
    user: "postgres",
    password: "Digifab74",
    host: "localhost",
    port: 5432,
    database: "todolistangular"
})

// on exporte pour le mettre dans index.js
module.exports = pool