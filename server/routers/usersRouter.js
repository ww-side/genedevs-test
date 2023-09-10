const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const usersController = require('../controllers/usersController');

router.get(
  '/getUserById/:userId',
  check('userId', 'ID was not empty').notEmpty(),
  authMiddleware,
  usersController.getUserById,
);

module.exports = router;
