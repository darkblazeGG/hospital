const log4js = require('log4js')
const logger = log4js.getLogger('email')

async function check({ transporter, database }) {
    let appointments = await database.getEmailed().catch(logger.error.bind(logger))
    if (!appointments)
        return setTimeout(check, 5 * 1000, { transporter, database })

    for await (let appointment of appointments) {
        if (!appointment.emailed && +appointment.date_time - +new Date() <= 24 * 60 * 60 * 1000)
            transporter.sendMail({
                to: appointment.user.email,
                from: 'Your Hospital',
                subject: 'Запись на прием',
                text: `{{ ${new Date().getDate() < 10 ? '0' : ''}${new Date().getDate()}.${new Date().getMonth() + 1 < 10 ? '0' : ''}${new Date().getMonth() + 1} }} | Привет {{ ${appointment.user.name} }}! Напоминаем что вы записаны к {{ ${appointment.doctor.spec} }} завтра в {{ ${appointment.date_time.getHours() < 10 ? '0' : ''}${appointment.date_time.getHours()}:${appointment.date_time.getMinutes() < 10 ? '0' : ''}${appointment.date_time.getMinutes()} }}!`
            }, function (error) {
                if (error)
                    logger.error(error)
                else
                    database.setEmailed(appointment.id)
            })
        if (appointment.emailed && +appointment.date_time - +appointment.emailed > 2 * 60 * 60 * 1000 && +appointment.date_time - +new Date() <= 2 * 60 * 60 * 1000)
            transporter.sendMail({
                to: appointment.user.email,
                from: 'Your Hospital',
                subject: 'Запись на прием',
                text: `{{ ${new Date().getDate() < 10 ? '0' : ''}${new Date().getDate()}.${new Date().getMonth() + 1 < 10 ? '0' : ''}${new Date().getMonth() + 1} }} | Привет {{ ${appointment.user.name} }}! Через 2 часа у вас приём у {{ ${appointment.doctor.spec} }} в {{ ${appointment.date_time.getHours() < 10 ? '0' : ''}${appointment.date_time.getHours()}:${appointment.date_time.getMinutes() < 10 ? '0' : ''}${appointment.date_time.getMinutes()} }}!`
            }, function (error) {
                if (error)
                    logger.error(error)
                else
                    database.setEmailed(appointment.id)
            })
    }

    return setTimeout(check, 5 * 60 * 1000, { transporter, database })
}

module.exports = check
