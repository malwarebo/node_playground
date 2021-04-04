const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

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

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
