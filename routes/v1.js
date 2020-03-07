const router = require('express').Router();

// Controllers
const health = require('../controller/v1/helth.controller');
const user = require('../controller/v1/user.controller');

router.use('/health', health.getHelth);

// User
router.get('/user',user.getAll);
router.get('/user/:id', user.getOne);
router.post('/user', user.create);
router.put('/user/:id', user.putData)


module.exports = router;
