const router = new (require('restify-router')).Router();

const auth = require('./auth');
const singup = require('./singup.');

const user = require('./user');
const device = require('./device');

const bucket = require('./bucket');
const sensor = require('./sensor');
const actor = require('./actor');

const register = require('./register');

router.add('/auth', auth);
router.add('/singup', singup);

router.add('/user', user);
router.add('/device', device);
router.add('/bucket', bucket);
router.add('/sensor', sensor);
router.add('/actor', actor);

router.add('/register', register);

module.exports = router
