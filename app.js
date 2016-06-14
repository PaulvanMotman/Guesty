const express = require('express');
const bodyParser= require('body-parser')
const pg = require('pg')
const app = express();
const bcrypt = require('bcrypt')

var Sequelize = require('sequelize');
var session = require('express-session');

/// Requiring modules
var db = require('./app/models/database')


/// Setting the jade views
app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('./public/'));

/// Declaring the session stuff??
app.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));


/// This part renders the landing page

app.get('/', (req, res) => {
	res.render("index")
});

/// This part renders the register page

app.get('/register', (req, res) => {
	res.render("register")
})

app.post('/register', (req, res) => {
	bcrypt.hash(req.body.password, 9, function(err, hash) {
		if (err) {
			return err
		}
		else {
			db.mainuser.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,				
				organisation: req.body.organisation,
				email: req.body.email,
				username: req.body.username,
				password: hash,
				telephone: req.body.telephone,
				location: req.body.location
			})
		}
	})
	res.redirect('/')
})



/// This part tells the app to listen to a server
var server = app.listen(3000, function (){
        console.log ('Blog Application listening on: ' + server.address().port)
});
