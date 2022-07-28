const router = require('express').Router();
const UserController = require('../controllers/user.controller');
// const Middleware = require('../middleware/checkAuth.middleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/:username/changePassword', UserController.changePassword);

module.exports = router;