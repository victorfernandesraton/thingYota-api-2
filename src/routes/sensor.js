const Router = require('restify-router').Router;
const router = new Router()

// controllers
const {
  find,
  findOne,
  create,
  put,
  registerValue
} = require('../controller/sensor');

const {authUser} = require('../middleware/auth')

const {responseOk} = require('../middleware/response');

const emitScoket = require('../middleware/socket').sendEmmiter;

// endpoints
router.get('',find);
router.get('/:id',findOne);
router.post('',create);
router.put('/:id',put, emitScoket,responseOk);
router.post('/:id/value', registerValue);

router.use(authUser)

module.exports = router;
