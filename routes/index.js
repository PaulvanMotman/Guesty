/// This part renders the landing page

// LANDING
app.get('/',
	function(req, res) {
		res.render('index', { user: req.user });
	});
// LOGIN LOCALLY
app.get('/login',
	function(req, res){
		res.render('login');
	});
// REGISTER LOCALLY
app.get('/register', (req, res) => {
	res.render("register")
})
// LOGIN FACEBOOK
app.get('/login/facebook',
	passport.authenticate('facebook', {
		scope : ['public_profile', 'user_events', 'email']
	}));
// RETURN AFTER LOGIN FB
app.get('/login/facebook/return', 
	passport.authenticate('facebook', {
		failureRedirect: '/login', 
	}),
	function(req, res) {
		res.redirect('/profile');
	});
// GO TO PROFILE
app.get('/profile',
	require('connect-ensure-login').ensureLoggedIn(),
	function(req, res){
		console.log("USER TESTING")
		console.log(req.user)
		res.render('profile', { user: req.user });
	});

/// This part renders the register page

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

