var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
var port = 8080;

var app = express();
app.use(session({secret: 'lkjsflksjdf#$!lkf@#'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
	clientID: '782856945102897',
	clientSecret: '1f35d65aee2742d5b143fc82cb9d2dfa',
	callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
	return done(null, profile); // first param is an err
}));

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect: '/me',
	failureRedirect: '/login.html'
}))

app.get('/me', function(req, res) {
 res.json(req.user);
})


app.listen(port, function () {
	console.log('Now listening on port' + port)
})