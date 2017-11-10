var express = require('express');

var reminderRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;

var router = function(nav){

	reminderRouter.route('/')
	.get(function(req,res){
		var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){

				var collection = db.collection('reminders');

				collection.find({}).toArray(
					function(err, results){
						res.render('reminderListView', {title: 'This is App ', 
						nav: nav,
						reminders : results
					});
				});

			});		
	});

	reminderRouter.route('/:id')
	//.all(function(req,res,next){
		.get(function(req,res){
			var id = new ObjectId(req.params.id);
			var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){

				var collection = db.collection('reminders');

				collection.findOne({_id: id},
					function(err, results){
						res.render('reminderView', {title: 'This is App ', 
						nav: nav,
						reminder : results
					});
				});

			});	
		//});
		});	

return reminderRouter;

};

module.exports = router;
