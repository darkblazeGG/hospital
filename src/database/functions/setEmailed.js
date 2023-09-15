const log4js = require('log4js')
const logger = log4js.getLogger('database')

function setEmailed({ models: { Appointment }, args: { id } }) {
    return new Promise((resolve, reject) => {
        Appointment.update({ emailed: new Date() }, { where: { id } }, { logging: logger.info.bind(logger) }).then(resolve).catch(reject)
    })
}

module.exports = setEmailed
