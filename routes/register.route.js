const
    Router = require('restify-router').Router,
    router = new Router()

const {
  authDeviceToken
} = require('../controller/auth.controller')

// controllers
const {
  find,
} = require('../controller/register.controller');

// endpoints
router.get('',authDeviceToken,find);

module.exports = router;
