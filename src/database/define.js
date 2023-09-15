const { Sequelize } = require('sequelize')

const config = require('./config.json')
const sequelize = new Sequelize(...config)

const log4js = require('log4js')
const logger = log4js.getLogger('database')

const { Doctor, User, Schedule, Appointment } = require('./models/index')(sequelize)
const { getEmailed, getFree, setAppointment, setDoctor, setEmailed, setTomorrowSchedule, setUser } = require('./functions/index')

class DataBase {
    #sequelize
    #Doctor
    #User
    #Schedule
    #Appointment
    #getEmailed
    #getFree
    #setAppointment
    #setEmailed
    #setDoctor
    #setTomorrowSchedule
    #setUser

    constructor({ sequelize, models: { Doctor, User, Schedule, Appointment }, functions: { getEmailed, getFree, setAppointment, setDoctor, setEmailed, setTomorrowSchedule, setUser } }) {
        this.#sequelize = sequelize
        this.#Doctor = Doctor
        this.#User = User
        this.#Schedule = Schedule
        this.#Appointment = Appointment
        this.#getEmailed = getEmailed
        this.#getFree = getFree
        this.#setAppointment = setAppointment
        this.#setEmailed = setEmailed
        this.#setDoctor = setDoctor
        this.#setTomorrowSchedule = setTomorrowSchedule
        this.#setUser = setUser
    }

    getEmailed() {
        return this.#getEmailed({ models: { Appointment: this.#Appointment } })
    }
    setEmailed(id) {
        return this.#setEmailed({ models: { Appointment: this.#Appointment }, args: { id } })
    }

    setAppointment({ id, user_id }) {
        return this.#setAppointment({ sequelize: this.#sequelize, models: { User: this.#User, Appointment: this.#Appointment }, args: { id, user_id } })
    }
    setTomorrowSchedule({ doctor_id, date, slots }) {
        return this.#setTomorrowSchedule({ sequelize: this.#sequelize, models: { Schedule: this.#Schedule, Appointment: this.#Appointment }, args: { doctor_id, date, slots } })
    }

    getFree({ date }) {
        return this.#getFree({ models: { Doctor: this.#Doctor, Schedule: this.#Schedule, Appointment: this.#Appointment }, args: { date } })
    }

    setDoctor({ name, spec }) {
        return this.#setDoctor({ models: { Doctor: this.#Doctor }, args: { name, spec } })
    }
    setUser({ phone, name, email }) {
        return this.#setUser({ models: { User: this.#User }, args: { phone, name, email } })
    }
}

function define() {
    return new Promise((resolve, reject) => {
        const database = new DataBase({ sequelize, models: { Doctor, User, Schedule, Appointment }, functions: { getEmailed, getFree, setAppointment, setDoctor, setEmailed, setTomorrowSchedule, setUser } })

        sequelize.sync({ logging: logger.info.bind(logger), alter: false }).then(() => resolve(database)).catch(reject)
    })
}

module.exports = define
