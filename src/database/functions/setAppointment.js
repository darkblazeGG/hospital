const log4js = require('log4js')
const logger = log4js.getLogger('database')

function setAppointment({ sequelize, models: { User, Appointment }, args: { id, user_id } }) {
    return new Promise(async (resolve, reject) => {
        const transaction = await sequelize.transaction({ logging: logger.info.bind(logger) }).catch(reject)
        if (!transaction)
            return

        const user = await User.findOne({ where: { id: user_id } }, { logging: logger.info.bind(logger), transaction }).catch(reject)
        if (user === undefined)
            return transaction.rollback({ logging: logger.info.bind(logger) }).catch(logger.error.bind(logger))
        if (!user)
            return transaction.rollback({ logging: logger.info.bind(logger) }).then(_ => reject('No such user')).catch(logger.error.bind(logger))

        Appointment.update({ user_id }, { where: { id, user_id: null } }, { logging: logger.info.bind(logger), transaction }).then(resolve).catch(reject)
    })
}

module.exports = setAppointment
