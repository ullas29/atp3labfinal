var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');





//go to login
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});




//go to home[index] page

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});





//view user

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});


//go to edit

router.get('/edit/:uid', function(req, res){
	userModel.getById(req.params.uid, function(result){
		res.render('home/edit', {user: result});
	});
});






router.post('/edit/:uid', function(req, res){
	
		var user = {
			uid: req.params.uid,
			uname: req.body.uname,
			username: req.body.username,
			password: req.body.password,
			phone: req.body.phone,
			email: req.body.email,
			age: req.body.age,
			gender: req.body.gender,
			utid: req.body.utid
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.uid);
			}
		});
});



//view book

router.get('/view_book', function(req, res){
	
		userModel.getAllbook(function(results){
			if(results.length > 0){
				res.render('home/view_book', {booklist: results});
			}else{
				res.redirect('/home');
			}
		});
});

module.exports = router;