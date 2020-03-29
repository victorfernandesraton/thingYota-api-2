const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  authUser
} = require('../controller/auth.controller');

// endpoints
router.post('/auth',authUser);

module.exports = router;
