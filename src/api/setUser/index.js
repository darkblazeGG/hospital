const log4js = require('log4js')
const logger = log4js.getLogger('api')

const isEmail = require('isemail')

function validate({ phone, name, email }) {
    return phone && name && email && typeof phone === 'string' && typeof name === 'string' && typeof email === 'string' && isEmail.validate(email)
}

function setUser({ app, database }) {
    app.post('/setUser', (request, response) => {
        if (!validate(request.body))
            return response.status(400).json({ error: 'Bad data' })

        database.setUser(request.body).then(result => response.status(200).json(result)).catch(error => {
            logger.error(error)
            response.status(500).json({ error: 'Internal Error' })
        })
    })
}

module.exports = setUser
