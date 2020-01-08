const Sequelize  = require('sequelize')

const database = 'tfgnext';
const host = 'tfgnext-db.cadatjvkitbq.us-east-2.rds.amazonaws.com';
const username = 'postgres';
const password = 'TfgNextRDS1';

const pgClient =  new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: 'postgres'
    }
)

const Pizza = pgClient.define('pizza', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    toppings: {
        type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
    },
    username: {
        type: Sequelize.STRING,
    },
    created: {
        type: Sequelize.BIGINT,
    },
    // createdAt: {
    //     type: Sequelize.TIME,
    // },
    // updatedAt: {
    //     type: Sequelize.TIME,
    // },
})

Pizza.sync()
    .then((pizza) => {
        console.log('sync pizza')
    })
    .catch(e => {
        console.error(e.message);
        // console.error(e);
    })

module.exports = Pizza;