const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  find,
  findOne,
  create,
  put
} = require('../controller/device.controller');

const {
  authDeviceToken
} = require('../controller/auth.controller')
// endpoints
router.get('', authDeviceToken, find);
router.get('/:id', authDeviceToken, findOne);
router.post('', authDeviceToken, create);
router.put('/:id', authDeviceToken, put)

module.exports = router;
