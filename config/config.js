const config = {
    environment: process.env.NODE_ENV || 'dev',
    server: {
        port: process.env.PORT || 8080,
    },
    mongo: {
        url: process.env.DATABASE_URL || 'mongodb://localhost/nfldb',
    },
}

module.exports = config
