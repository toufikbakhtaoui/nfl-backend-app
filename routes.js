const Router = require('express').Router
const routes = new Router()

routes.route('/').get((req, res) => {
    res.json({ message: 'Welcome to the nfl!' })
})

module.exports = routes
