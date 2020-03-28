const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  auth
} = require('../controller/auth.controller');

// endpoints
router.post('/auth',auth);

module.exports = router;
