var express = require('express');

var authRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var router = function(){
	authRouter.route('/adduser')
		.post(function(req,res){
			console.log(req.body);
			
			var users = [req.body];

			var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){
				var collection = db.collection('users');
				collection.insert(users, function(err,results){
					if(err !== null){
						console.log(err);
					}
					else if (results !== null){
						res.send(results);
						db.close();
					}
					else{
						res.status(204).send('No Content');
					}
				});
			});

	});

	return authRouter;
};		

module.exports = router;
