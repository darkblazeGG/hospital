const log4js = require('log4js')
const logger = log4js.getLogger('api')

function validate({ doctor_id, date, slots }) {
    return doctor_id && date && slots && typeof doctor_id === 'string' && typeof date === 'string' && date?.match(/\d{2}\.\d{2}\.\d{4}/)?.[0].length === date.length
        && Array.isArray(slots) && slots.filter(slot => (new Date(slot) !== 'Invalid Date') && !isNaN(new Date(slot)))
}

function transfer({ slots }) {
    return slots.map(slot => new Date(slot))
}

function setTomorrowSchedule({ app, database }) {
    app.post('/setTomorrowSchedule', (request, response) => {
        if (!validate(request.body))
            return response.status(400).json({ error: 'Bad data' })

        request.body.slots = transfer(request.body)

        database.setTomorrowSchedule(request.body).then(result => response.status(200).json({ success: true })).catch(error => {
            logger.error(error)
            response.status(500).json({ error: 'Internal Error' })
        })
    })
}

module.exports = setTomorrowSchedule
