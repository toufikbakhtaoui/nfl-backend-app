require('dotenv').config()

const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

const config = {
    environment: process.env.NODE_ENV || 'dev',
    server: {
        port: process.env.PORT || 3400,
    },
    mongo: {
        url:
            'mongodb+srv://' +
            dbUsername +
            ':' +
            dbPassword +
            '@cluster0.jsmca.mongodb.net/nfl?retryWrites=true&w=majority',
    },
}

module.exports = config
