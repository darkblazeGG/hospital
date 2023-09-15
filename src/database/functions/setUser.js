const log4js = require('log4js')
const logger = log4js.getLogger('database')

function setUser({ models: { User }, args: { phone, name, email } }) {
    return new Promise((resolve, reject) => {
        User.create({ phone, name, email }, { logging: logger.info.bind(logger) }).then(resolve).catch(reject)
    })
}

module.exports = setUser
