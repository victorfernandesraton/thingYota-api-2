const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const createDevice = require('../controller/device.controller').create;
const createUser = require('../controller/user.controller').create;

const {
  authGuestToken
} = require('../controller/auth.controller')

router.post('/user', authGuestToken, createUser)
router.post('/device', authGuestToken, createDevice)


module.exports = router;
