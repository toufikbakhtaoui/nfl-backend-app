const config = {
    environment: process.env.NODE_ENV || 'dev',
    server: {
        port: process.env.PORT || 3400,
    },
    mongo: {
        url: 'mongodb+srv://toufik:lM1rTOxGPxlxompk@cluster0.jsmca.mongodb.net/nfldb?retryWrites=true&w=majority',
        //|| 'mongodb://localhost/nfldb',
    },
}

module.exports = config
