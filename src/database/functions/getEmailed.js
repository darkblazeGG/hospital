const { Op } = require("sequelize")

function getEmailed({ models: { Appointment } }) {
    return new Promise(async (resolve, reject) => {
        Appointment.findAll({
            where: { user_id: { [Op.ne]: null } }, date_time: { [Op.gt]: new Date() }, include: {
                all: true
            }
        }).then(resolve).catch(reject)
    })
}

module.exports = getEmailed
