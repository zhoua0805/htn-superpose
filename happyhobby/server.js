const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var server = require('http').createServer(app);
server.listen(process.env.PORT || 5000);
// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');
app.use(function (req, res, next) {
	if (req.secure || req.headers.host === 'localhost:5000') {
		next();
	} else {
		// request was via http, so redirect to https
		console.log('redirecting');
		console.log(req.headers.host);
		res.redirect(301, 'https://' + req.headers.host + req.url);
	}
});

app.use(express.static(__dirname + '/client/build'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  console.log('test');
  res.send();
});

/*Import all routes from routing folder and attach them to the application*/
// require('./routes/placeholder')(app);

// All routes other than above will go to index.html
app.get('*', (req, res) => {
	res.sendFile(__dirname + '/client/build/index.html');
});

