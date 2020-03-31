const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  find,
  findOne,
  create,
  put
} = require('../controller/user.controller');

const {
  authUserToken
} = require('../controller/auth.controller')

// endpoints
router.get('', authUserToken, find);
router.get('/:id', authUserToken, findOne);
router.post('', authUserToken, create);
router.put('/:id', authUserToken, put)

module.exports = router;
