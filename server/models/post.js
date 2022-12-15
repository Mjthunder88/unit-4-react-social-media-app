const { DataTypes } = require('sequelize')

const { sequelize } = require('../util/database')


module.exports = {
    Post: sequelize.define('post', {     //? Why do we make the Post capital but the other data is lowercaese for the Property. 
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        privateStatus: DataTypes.BOOLEAN
    })
}