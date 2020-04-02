const
    Router = require('restify-router').Router,
    router = new Router()

const {
  authUserToken
} = require('../controller/auth.controller')

// controllers
const {
  find,
  findOne,
  create
} = require('../controller/register.controller');

// endpoints
router.get('',find);
router.get('/:id',findOne);
router.post('',create);

router.use(authUserToken)

module.exports = router;
