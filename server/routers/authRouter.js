const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Username was not empty').notEmpty(),
    check(
      'password',
      'Password should be no less than 4 characters and no more than 16 characters.',
    ).isLength({ min: 4, max: 16 }),
  ],
  authController.registration,
);
router.post('/login', authController.login);

module.exports = router;
