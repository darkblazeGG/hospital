function setEmailed({ models: { Appointment }, args: { id } }) {
    return new Promise((resolve, reject) => {
        Appointment.update({ emailed: new Date() }, { where: { id } }).then(resolve).catch(reject)
    })
}

module.exports = setEmailed
