const log4js = require('log4js')
const logger = log4js.getLogger('database')

function setTomorrowSchedule({ sequelize, models: { Schedule, Appointment }, args: { doctor_id, date, slots } }) {
    return new Promise(async (resolve, reject) => {
        const transaction = await sequelize.transaction({ logging: logger.info.bind(logger) }).catch(reject)
        if (!transaction)
            return

        const exist = await Schedule.findOne({ where: { doctor_id, date } }, { logging: logger.info.bind(logger), transaction }).catch(reject)
        if (exist === undefined)
            return transaction.rollback({ logging: logger.info.bind(logger) }).catch(logger.error.bind(logger))
        if (exist)
            return transaction.rollback({ logging: logger.info.bind(logger) }).then(_ => reject('Already exist')).catch(logger.error.bind(logger))

        const { id: schedule_id } = (await Schedule.create({ doctor_id, date }, { logging: logger.info.bind(logger), transaction }).catch(reject) || {})
        if (!schedule_id)
            return transaction.rollback({ logging: logger.info.bind(logger) }).catch(logger.error.bind(logger))

        for (let date_time of slots)
            if (!(await Appointment.create({ schedule_id, doctor_id, date_time }, { logging: logger.info.bind(logger), transaction }).catch(reject)))
                return transaction.rollback({ logging: logger.info.bind(logger) }).catch(logger.error.bind(logger))
        transaction.commit({ logging: logger.info.bind(logger) }).then(_ => resolve(true)).catch(reject)
    })
}

module.exports = setTomorrowSchedule
