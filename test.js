const define = require('./src/database/define')

define().then(async database => {
    let doctor = await database.setDoctor({ name: 'Victor NonFrankenstein', spec: 'Хирург' }).catch(console.error)
    if (!doctor)
        return

    let user = await database.setUser({ phone: '+7-999-888-77-66', name: 'Albert Einstein', email: 'darkblazegg@gmail.com' }).catch(console.error)
    if (!user)
        return

    let now = new Date()
    now = new Date(`${now.getMonth() + 1 < 10 ? '0' : ''}${now.getMonth() + 1}.${now.getDate() < 10 ? '0' : ''}${now.getDate()}.${now.getFullYear()}`)

    let slots = [...new Array(16)].map((_, index) => new Date(+now + 8 * 60 * 60 * 1000 + 30 * 60 * 1000 * index))

    schedule = await database.setTomorrowSchedule({ doctor_id: doctor.id, date: `${now.getDate() < 10 ? '0' : ''}${now.getDate()}.${now.getMonth() + 1 < 10 ? '0' : ''}${now.getMonth() + 1}.${now.getFullYear()}`, slots }).catch(console.error)
    if (!schedule)
        return
}).then(_ => console.log('База успешно заполнена')).catch(console.error)
