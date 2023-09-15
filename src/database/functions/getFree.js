function getFree({ models: { Doctor, Schedule, Appointment }, args: { date } }) {
    return new Promise((resolve, reject) => {
        Doctor.findAll({
            include: {
                model: Schedule,
                as: 'schedule',
                where: {
                    date
                },
                include: {
                    model: Appointment,
                    as: 'appointments',
                    where: {
                        user_id: null
                    }
                }
            }
        }).then(resolve).catch(reject)
    })
}

module.exports = getFree
