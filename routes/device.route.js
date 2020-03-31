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
  authArduinoToken
} = require('../controller/auth.controller')
// endpoints
router.get('', authArduinoToken, find);
router.get('/:id', authArduinoToken, findOne);
router.post('', authArduinoToken, create);
router.put('/:id', authArduinoToken, put)

module.exports = router;
