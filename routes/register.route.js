const
    Router = require('restify-router').Router,
    router = new Router()
    authToken = require('../controller/auth.controller').authToken

// controllers
const {
  find,
} = require('../controller/register.controller');

// endpoints
router.get('',authToken,find);

module.exports = router;
