const { Sequelize } = require("sequelize");

const connection = new Sequelize('node-blog', 'root', 'wictorrdossf20', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection