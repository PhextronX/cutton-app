const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

app.use(connectLivereload());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
    console.log("🔄 Browser reloaded due to file changes!");
  }, 100);
});


app.use((req, res, next) => {
  const send = res.send;
  res.send = function (body) {
    if (typeof body === 'string' && body.includes('</body>')) {
      body = body.replace(
        '</body>',
        `<script src="http://localhost:35729/livereload.js"></script></body>`
      );
    }
    return send.call(this, body);
  };
  next();
});

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// User serialize/deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Configure Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile); // save profile to session
}));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`
    <h1>Profile</h1>
    <p>Name: ${req.user.displayName}</p>
    <p>Email: ${req.user.emails[0].value}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root '/' to index.html in public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Redirect root '/' to Login Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Redirect root '/' to Login Page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/forgotpass', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forgotpass.html'));
});

app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});
app.get('/reset-pass', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resetpass.html'));
});


// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log(`http://localhost:${PORT}`);
});
