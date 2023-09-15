const { DataTypes, Sequelize } = require('sequelize')

function getUser(sequelize) {
    const User = sequelize.define('Пациенты', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING(16),
            allowNull: false, //?
            unique: true,
            field: 'Номер телефона пациента'
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'ФИО пациента'
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'Почтовый адрес пациента'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return User
}

module.exports = getUser
