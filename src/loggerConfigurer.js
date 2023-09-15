const log4js = require('log4js')

log4js.configure({
    appenders: {
        default: {
            type: 'dateFile',
            filename: __dirname + '\\logs/default/log.log',
            compress: true,
            keepFileExt: true,
            numBackups: 5,
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601_WITH_TZ_OFFSET}] [%p] %c - %m'
            }
        },
        database: {
            type: 'dateFile',
            filename: __dirname + '\\logs/database/log.log',
            compress: true,
            keepFileExt: true,
            numBackups: 5,
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601_WITH_TZ_OFFSET}] [%p] %c - %m'
            }
        },
        api: {
            type: 'dateFile',
            filename: __dirname + '\\logs/api/log.log',
            compress: true,
            keepFileExt: true,
            numBackups: 5,
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601_WITH_TZ_OFFSET}] [%p] %c - %m'
            }
        },
        email: {
            type: 'dateFile',
            filename: __dirname + '\\logs/email/log.log',
            compress: true,
            keepFileExt: true,
            numBackups: 5,
            layout: {
                type: 'pattern',
                pattern: '[%d{ISO8601_WITH_TZ_OFFSET}] [%p] %c - %m'
            }
        },
        output: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '%[[%d{ISO8601_WITH_TZ_OFFSET}] [%p] %c - %] %m'
            }
        }
    },
    categories: {
        default: {
            appenders: ['default', 'output'],
            level: 'info'
        },
        database: {
            appenders: ['default', 'database'],
            level: 'info'
        },
        api: {
            appenders: ['default', 'api', 'output'],
            level: 'info'
        },
        email: {
            appenders: ['default', 'email', 'output'],
            level: 'info'
        }
    }
})