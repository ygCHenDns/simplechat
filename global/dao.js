const Sequelize = require('sequelize');
const { Client } = require('pg');

const dbName = 'chat_db';

const pgConnection = 'postgres://postgres:admin@localhost:5432/postgres'
const dbConnectionUri = `postgres://postgres:admin@localhost:5432/${dbName}`

// const sequelize = new Sequelize(connection, {
//     schema: 'public'
// });

const client = new Client({
    connectionString: pgConnection,
})

client.connect()

client.query('CREATE DATABASE ' + dbName, function (err) {
    var sequelize = new Sequelize(dbConnectionUri);
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    client.end(); // close the connection
});

