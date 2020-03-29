const
    Router = require('restify-router').Router,
    router = new Router()

const {
  authUserToken
} = require('../controller/auth.controller')

// controllers
const {
  find,
} = require('../controller/register.controller');

// endpoints
router.get('',authUserToken,find);

module.exports = router;
