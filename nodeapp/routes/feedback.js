const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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

  router.post(
    '/',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('Name is required'),
      check('email').trim().isEmail().normalizeEmail().withMessage('Email is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('Title is required'),
      check('message').trim().isLength({ min: 5 }).escape().withMessage('Message is required'),
    ],
    async (request, response) => {
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
    }
  );

  return router;
};
