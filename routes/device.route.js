const router = new (require('restify-router')).Router();

// controllers
const {
  find,
  findOne,
  create,
  put
} = require('../controller/device.controller');

const {
  authUserToken
} = require('../controller/auth.controller')
// endpoints
router.get('',  find);
router.get('/:id',  findOne);
router.post('',  create);
router.put('/:id',  put)
router.use(authUserToken)
module.exports = router;
