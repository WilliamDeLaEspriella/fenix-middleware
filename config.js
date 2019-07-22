require("dotenv").config();
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    connectionString: process.env.connectionString,
    db: process.env.MONGODB || 'mongodb://localhost:27017/fenix-milddleware',
    port: process.env.PORT || 3000,
    ssl: process.env.SSL
}
// "postgres://scoutz_master_david:ESFy5vANs6ZM8tBS@scoutzdb.cre4ovu3rbk0.us-east-1.rds.amazonaws.com:5432/schoolsdb";