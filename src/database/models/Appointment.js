const { DataTypes, Sequelize } = require('sequelize')

function getAppointment({ sequelize, Doctor, User, Schedule }) {
    const Appointment = sequelize.define('Записи', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        schedule_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        doctor_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: true
        },
        date_time: {
            type: 'TIMESTAMP',
            allowNull: false,
            field: 'Время записи'
        },
        emailed: {
            type: 'TIMESTAMP',
            allowNull: true,
            field: 'Время рассылки'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    // Appointment.belongsTo(Doctor)
    // Appointment.belongsTo(User)
    // Appointment.belongsTo(Schedule)

    return Appointment
}

module.exports = getAppointment
