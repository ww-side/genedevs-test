const Router = require('express');
const router = Router();
const { check } = require('express-validator');
const testsController = require('../controllers/testsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/createTest',
  [
    check('name', 'Name was not empty').notEmpty(),
    check('description', 'Description was not empty').notEmpty(),
    check('content', 'Content was not empty').notEmpty(),
  ],
  authMiddleware,
  testsController.createTest,
);
router.delete(
  '/deleteTest/:testId',
  authMiddleware,
  testsController.deleteTest,
);
router.post('/passedTest/:testId', authMiddleware, testsController.passedTest);
router.get(
  '/getCompletedTestById/:completedTestId',
  authMiddleware,
  testsController.getCompletedTestById,
);

module.exports = router;
