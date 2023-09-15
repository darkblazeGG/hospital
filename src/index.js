require('./loggerConfigurer')

const define = require('./database/define')
const lounch = require('./api')
const email = require('./email')

define().then(database => {
    lounch(database)
    email(database)
})
