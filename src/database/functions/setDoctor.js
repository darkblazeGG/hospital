function setDoctor({ models: { Doctor }, args: { name, spec } }) {
    return new Promise((resolve, reject) => {
        Doctor.create({ name, spec }).then(resolve).catch(reject)
    })
}

module.exports = setDoctor
