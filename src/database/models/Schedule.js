const { DataTypes, Sequelize } = require('sequelize')

function getSchedule({ sequelize, Doctor }) {
    const Schedule = sequelize.define('Расписание', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        doctor_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        date: {
            type: 'TIMESTAMP',
            allowNull: false,
            field: 'Дата'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    // Schedule.belongsTo(Doctor)

    return Schedule
}

module.exports = getSchedule
