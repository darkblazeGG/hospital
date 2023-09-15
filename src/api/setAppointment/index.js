const log4js = require('log4js')
const logger = log4js.getLogger('api')

function validate({ id, user_id }) {
    return id && user_id && typeof id === 'string' && typeof user_id === 'string'
}

function setAppointment({ app, database }) {
    app.post('/setAppointment', (request, response) => {
        if (!validate(request.body))
            return response.status(400).json({ error: 'Bad data' })

        database.setAppointment(request.body).then(result => {
            if (result[0] === 0)
                return response.status(400).json({ error: 'Already used' })
            response.status(200).json({ success: true })
        }).catch(error => {
            logger.error(error)
            response.status(500).json({ error: 'Internal Error' })
        })
    })
}

module.exports = setAppointment
