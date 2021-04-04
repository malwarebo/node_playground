const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');
const { request } = require('http');
const { response } = require('express');
const app = express();

const port = 3000;

// Session management
app.set('trust proxy', 1); // Allow the app to trust the cookie-session
app.use(
  cookieSession({
    name: 'session',
    keys: ['Rand123sjdnwehr83', '47ry3fb38ry347dsubdwe7'],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine {ejs}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Roux Meetups';
app.use(express.static(path.join(__dirname, './static')));

app.use(async (request, response, next) => {
  try {
    const names = await speakerService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (error) {
    return next(error);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakerService,
  })
);

app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
