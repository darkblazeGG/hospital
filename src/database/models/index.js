const getDoctor = require('./Doctor')
const getUser = require('./Pacient')
const getAppointment = require('./Appointment')
const getSchedule = require('./Schedule')

function init(sequelize) {
    const Schedule = getSchedule({ sequelize })
    const Appointment = getAppointment({ sequelize })
    const Doctor = getDoctor(sequelize)
    const User = getUser(sequelize)
    Doctor.hasMany(Schedule, {
        as: 'schedule',
        sourceKey: 'id',
        foreignKey: 'doctor_id'
    })
    Doctor.belongsTo(Appointment, {
        sourceKey: 'doctor_id',
        foreignKey: 'id'
    })
    Schedule.belongsTo(Doctor, {
        sourceKey: 'id',
        foreignKey: 'doctor_id'
    })
    Schedule.hasMany(Appointment, {
        as: 'appointments',
        sourceKey: 'id',
        foreignKey: 'schedule_id'
    })
    Appointment.belongsTo(Schedule, {
        sourceKey: 'id',
        foreignKey: 'schedule_id'
    })
    Appointment.hasOne(Doctor, {
        as: 'doctor',
        sourceKey: 'doctor_id',
        foreignKey: 'id'
    })
    Appointment.hasOne(User, {
        sourceKey: 'user_id',
        foreignKey: 'id',
        as: 'user'
    })
    User.belongsTo(Appointment, {
        sourceKey: 'user_id',
        foreignKey: 'id',
    })

    return { Doctor, User, Schedule, Appointment }
}

module.exports = init
// Стоит добавить функцию создания расписания на следующий день
// Продолжу после небольшого перерыва