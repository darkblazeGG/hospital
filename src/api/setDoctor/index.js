const log4js = require('log4js')
const logger = log4js.getLogger('api')

const enums = ['Терапевт', 'Травматолог', 'Хирург', 'Дерматолог', 'Лор', 'Психолог', 'Гинеколог', 'Ортапед']

function validate({ name, spec }) {
    return name && spec && typeof name === 'string' && typeof spec === 'string' && enums.includes(spec)
}

function setDoctor({ app, database }) {
    app.post('/setDoctor', (request, response) => {
        if (!validate(request.body))
            return response.status(400).json({ error: 'Bad data' })

        database.setDoctor(request.body).then(result => response.status(200).json(result)).catch(error => {
            logger.error(error)
            response.status(500).json({ error: 'Internal Error' })
        })
    })
}

module.exports = setDoctor
