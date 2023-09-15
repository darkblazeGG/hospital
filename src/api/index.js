const express = require('express')

const getFree = require('./getFree')
const setAppointment = require('./setAppointment')
const setDoctor = require('./setDoctor')
const setTomorrowSchedule = require('./setTomorrowSchedule')
const setUser = require('./setUser')

const app = express()
app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended: true }))

const config = require('./config')

function lounch(database) {
    getFree({ app, database })
    setAppointment({ app, database })
    setDoctor({ app, database })
    setTomorrowSchedule({ app, database })
    setUser({ app, database })

    app.listen(...config)
}

module.exports = lounch
