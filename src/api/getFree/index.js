const log4js = require('log4js')
const logger = log4js.getLogger('api')

function validate({ date }) {
    return typeof date === 'string' && date?.match(/\d{2}\.\d{2}\.\d{4}/)?.[0].length === date.length
}

function getFree({ app, database }) {
    app.get('/getFree', (request, response) => {
        if (!validate(request.query))
            return response.status(400).json({ error: 'Bad data' })

        database.getFree(request.query).then(result => response.status(200).json(result)).catch(error => {
            logger.error(error)
            response.status(500).json({ error: 'Internal Error' })
        })
    })
}

module.exports = getFree
