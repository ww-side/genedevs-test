const { validationResult } = require('express-validator');
const crypto = require('crypto');
const Test = require('../models/Test');
const User = require('../models/User');
const CompletedTests = require('../models/CompletedTests');

class TestsController {
  async createTest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Create test error', errors });
      }
      const { name, description, content } = req.body;
      const owner = req.user.userId;

      if (!Array.isArray(content)) {
        return res
          .status(400)
          .json({ message: 'Questions should be an array' });
      }

      const formattedQuestions = content.map(question => {
        const questionTitle = question.questionTitle;
        const options = question.options.map(option => ({
          answer: option.answer,
          isCorrect: option.isCorrect || false,
        }));
        const questionId = crypto.randomBytes(16).toString('hex');
        return {
          questionId,
          questionTitle,
          options,
        };
      });

      const newTest = new Test({
        name,
        description,
        content: formattedQuestions,
        owner,
      });

      await newTest.save();
      await User.findByIdAndUpdate(owner, {
        $push: { ownTests: newTest._id },
      });

      return res.json({ message: 'Test successfully created' });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }

  async deleteTest(req, res) {
    try {
      const testIdToDelete = req.params.testId;

      const testToDelete = await Test.findById(testIdToDelete);
      if (!testToDelete) {
        return res.status(404).json({ message: 'Test not found' });
      }

      if (testToDelete.owner.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      await Test.findByIdAndDelete(testIdToDelete);

      await User.findByIdAndUpdate(req.user.userId, {
        $pull: { ownTests: testIdToDelete },
      });

      return res.json({ message: 'Test successfully deleted' });
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }

  async passedTest(req, res) {
    try {
      const { testId } = req.params;
      const { results } = req.body;
      const userId = req.user.userId;

      const test = await Test.findById(testId);

      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }

      const user = await User.findById(userId);

      if (
        user.completedTests.some(testResult => testResult.testId === testId)
      ) {
        return res
          .status(400)
          .json({ message: 'You have already passed this test' });
      }

      const updatedResults = results.map(result => {
        const question = test.content.find(
          q => q.questionId === result.questionId,
        );

        if (!question) {
          return { ...result, isCorrect: false };
        }

        const correctAnswers = question.options
          .filter(option => option.isCorrect)
          .map(option => option.answer);

        const userAnswers = Array.isArray(result.answer)
          ? result.answer
          : [result.answer];

        const isCorrect = userAnswers.every(answer =>
          correctAnswers.includes(answer),
        );

        return { ...result, isCorrect };
      });

      const newCompletedTest = new CompletedTests({
        testId,
        ownerId: test.owner,
        userId,
        results: updatedResults,
      });

      await newCompletedTest.save();

      await User.findByIdAndUpdate(userId, {
        $push: {
          completedTests: { testId: newCompletedTest._id },
        },
      });

      return res.json({
        message: 'Your request has been successfully registered',
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Error processing test results' });
    }
  }

  async getCompletedTestById(req, res) {
    try {
      const { completedTestId } = req.params;

      const completedTest = await CompletedTests.findById(completedTestId);

      if (!completedTest) {
        return res.status(404).json({ message: 'Completed test not found' });
      }

      return res.json({ completedTest });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: 'Error getting completed test' });
    }
  }
}

module.exports = new TestsController();
