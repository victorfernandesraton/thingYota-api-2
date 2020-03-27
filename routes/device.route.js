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

// endpoints
router.get('',find);
router.get('/:id', findOne);
router.post('', create);
router.put('/:id', put)

module.exports = router;
