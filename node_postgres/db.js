const Pool = require("pg").Pool
const router = require("./routes/routes.user")

const pool = new Pool({
  user:"postgres",
  password:"background",
  host:"localhost",
  port:"5432",
  database:"node_postgres"
})


module.exports = pool 











