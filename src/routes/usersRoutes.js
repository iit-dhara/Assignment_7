var express = require('express');

var usersRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var router = function(nav){

	usersRouter.route('/')
	.get(function(req,res){
		var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){

				var collection = db.collection('users');

				collection.find({}).toArray(
					function(err, results){
						res.render('usersListView', {title: 'This is App ', 
						nav: nav,
						users : results
					});
				});

			});		
	});

	usersRouter.route('/:id')
	//.all(function(req,res,next){
		.get(function(req,res){
			var id = new ObjectId(req.params.id);
			var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){

				var collection = db.collection('users');

				collection.findOne({_id: id},
					function(err, results){
						res.render('userView', {title: 'This is App ', 
						nav: nav,
						user : results
					});
				});

			});	
		//});
		});	

	usersRouter.route('/:id/addReminder')
	//.all(function(req,res,next){
		.get(function(req,res){
			var id = new ObjectId(req.params.id);
			var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){

				var collection = db.collection('reminders');
				
					collection.findOne({_id: id},
					function(err, results){
						res.render('addReminders', {title: 'This is App ', 
						nav: nav,
						reminder : results
					});
				});

				});	
		});	

return usersRouter;

};

module.exports = router;
