const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const validations = [
  check('name').trim().isLength({ min: 3 }).escape().withMessage('Name is required'),
  check('email').trim().isEmail().normalizeEmail().withMessage('Email is required'),
  check('title').trim().isLength({ min: 3 }).escape().withMessage('Title is required'),
  check('message').trim().isLength({ min: 5 }).escape().withMessage('Message is required'),
];

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const feedback = await feedbackService.getList();
      const errors = request.session.feedback ? request.session.feedback.errors : false;
      const successMessage = request.session.feedback ? request.session.feedback.message : false;
      request.session.feedback = {};
      response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedback,
        errors,
        successMessage,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post('/', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      // Stores error on the session object
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }
      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thank you for your feedback.',
      };
      return response.redirect('/feedback');
    } catch (error) {
      return next(error);
    }
  });

  router.post('/api', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }
      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      const feedback = await feedbackService.getList();
      return response.json({ feedback, successMessage: 'Thank you for the feedback' });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
