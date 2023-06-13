const Sequelize = require("sequelize");
const database = require("../db/database");

const Animal = database.define("animals", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    breed: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    gender: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    age: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    size: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    city: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    state: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    dewormed: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    castrated: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    vaccinated: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    special_care: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    picture: {
        type: Sequelize.BLOB,
        allowNull: true,
    }
});

module.exports = Animal;