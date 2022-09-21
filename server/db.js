const Pool = require("pg").Pool

const pool = new Pool({
  user: "vagrant", 
  password: "vagrant",
  host: "localhost",
  port: 5432,
  database: "perntodo",
}); 


module.exports = pool; 