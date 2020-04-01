const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  authUser,
  authDevice,
  authGuest
} = require('../controller/auth.controller');

// endpoints
router.post('/login',authUser);
router.post('/device', authDevice);
router.post('/guest', authGuest);

module.exports = router;
