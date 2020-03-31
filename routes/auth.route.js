const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  authUser,
  authArduino,
  authGuest
} = require('../controller/auth.controller');

// endpoints
router.post('/login',authUser);
router.post('/arduino', authArduino);
router.post('/guest', authGuest);
module.exports = router;
