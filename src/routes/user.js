const
    Router = require('restify-router').Router,
    router = new Router()

// controllers
const {
  find,
  findOne,
  create,
  put
} = require('../controller/user');

const {
  authUser
} = require('../middleware/auth')

// endpoints
router.get('',  find);
router.get('/:id',  findOne);
router.post('',  create);
router.put('/:id',  put)
router.use(authUser)
module.exports = router;
