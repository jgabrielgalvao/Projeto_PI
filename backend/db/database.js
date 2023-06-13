const Sequelize = require("sequelize");
const sequelize = new Sequelize(`Animais`, `root`, ` `, {
    dialect: 'mysql',
    host: `127.0.0.1`
});

sequelize.authenticate().then(() => {
    console.log('Connected to MySQL Server');
}).catch((error) => {
    console.error('Failed to connect to MySQL Server. ', error);
});

module.exports = sequelize;