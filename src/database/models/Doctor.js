const { DataTypes, Sequelize } = require('sequelize')

function getDoctor(sequelize) {
    const Doctor = sequelize.define('Врачи', {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            field: 'ФИО врача'
        },
        spec: {
            type: DataTypes.STRING(128),
            validate: {
                customValidator: (value) => {
                    const enums = ['Терапевт', 'Травматолог', 'Хирург', 'Дерматолог', 'Лор', 'Психолог', 'Гинеколог', 'Ортапед']
                    if (!enums.includes(value))
                        throw new Error('Not a valid spec')
                }
            },
            allowNull: false,
            field: 'Специальность врача'
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })

    return Doctor
}

module.exports = getDoctor
