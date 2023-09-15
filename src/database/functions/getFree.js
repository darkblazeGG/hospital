const log4js = require('log4js')
const logger = log4js.getLogger('database')

function getFree({ models: { Doctor, Schedule, Appointment }, args: { date } }) {
    return new Promise((resolve, reject) => {
        Doctor.findAll({
            include: {
                model: Schedule,
                as: 'schedule',
                where: {
                    date
                },
                include: {
                    model: Appointment,
                    as: 'appointments',
                    where: {
                        user_id: null
                    }
                }
            }
        }, { logging: logger.info.bind(logger) }).then(resolve).catch(reject)
    })
}

module.exports = getFree
