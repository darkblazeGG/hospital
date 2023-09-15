function setUser({ models: { User }, args: { phone, name, email } }) {
    return new Promise((resolve, reject) => {
        User.create({ phone, name, email }).then(resolve).catch(reject)
    })
}

module.exports = setUser
