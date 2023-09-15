const nodemailer = require('nodemailer')

const config = require('./config.json')
const check = require('./check')
let transporter = nodemailer.createTransport(config)

function lounch(database) {
    check({ transporter, database })
}

module.exports = lounch
