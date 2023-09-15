const log4js = require('log4js')
const logger = log4js.getLogger('database')

function setDoctor({ models: { Doctor }, args: { name, spec } }) {
    return new Promise((resolve, reject) => {
        Doctor.create({ name, spec }, { logging: logger.info.bind(logger) }).then(resolve).catch(reject)
    })
}

module.exports = setDoctor
