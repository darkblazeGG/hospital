const { Op } = require("sequelize")

const log4js = require('log4js')
const logger = log4js.getLogger('database')

function getEmailed({ models: { Appointment } }) {
    return new Promise(async (resolve, reject) => {
        Appointment.findAll({
            where: { user_id: { [Op.ne]: null } }, date_time: { [Op.gt]: new Date() }, include: {
                all: true
            }
        }, { logging: logger.info.bind(logger) }).then(resolve).catch(reject)
    })
}

module.exports = getEmailed
