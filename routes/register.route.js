const
    Router = require('restify-router').Router,
    router = new Router()

const {
  authUserToken,
} = require('../controller/auth.controller')

// controllers
const {
  find,
  findOne,
  create
} = require('../controller/register.controller');

// endpoints
router.get('',authUserToken,find);
router.get('/:id',authUserToken,findOne);
router.post('',authUserToken,create);

module.exports = router;
