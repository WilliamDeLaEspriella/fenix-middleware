require("dotenv").config();
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    connectionString: process.env.connectionString,
    db: process.env.MONGODB || 'mongodb://localhost:27017/fenix-milddleware',
    secret: process.env.SECRET || 'sdf4sdf5654s6df546sd8f7wrf5wf',
    port: process.env.PORT || 3000,
    port_redis: process.env.PORT_REDIS || 6379,
    host_redis: process.env.HOST_REDIS || '127.0.0.1',
    ssl: process.env.SSL
}
// "postgres://scoutz_master_david:ESFy5vANs6ZM8tBS@scoutzdb.cre4ovu3rbk0.us-east-1.rds.amazonaws.com:5432/schoolsdb";