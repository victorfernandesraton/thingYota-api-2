const
    Router = require('restify-router').Router,
    router = new Router()

const {
  authArduinoToken
} = require('../controller/auth.controller')

// controllers
const {
  find,
} = require('../controller/register.controller');

// endpoints
router.get('',authArduinoToken,find);

module.exports = router;
