require("dotenv").config();
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    connectionString: process.env.connectionString,
    user_database: process.env.USER_DATABASE || 'haskhell',
    password_database: process.env.PASSWORD_DATABASE || 'haskhell8888',
    database: process.env.DATABASE || 'fenix_middleware_development',
    port_database: process.env.PORT_DATABASE || '5432',
    port: process.env.PORT || 3000,
    ssl: process.env.SSL
}
// "postgres://scoutz_master_david:ESFy5vANs6ZM8tBS@scoutzdb.cre4ovu3rbk0.us-east-1.rds.amazonaws.com:5432/schoolsdb";