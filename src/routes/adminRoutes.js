var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

// var users = [{
// 					name: 'Mike',
// 					email: 'mike1@gmail.com'
// 				},
// 				{
// 					name: 'Lizz',
// 					email: 'lizz@gmail.com'
// 				},
// 				{
// 					name: 'Nancy',
// 					email: 'nancy@gmail.com'
// 				},
// 				{
// 					name: 'Robert',
// 					email: 'robert@gmail.com'
// 				},
// 				{
// 					name: 'Jose',
// 					email: 'jose@gmail.com'
// 				},
// 				{
// 					name: 'Martin',
// 					email: 'martin@gmail.com'
// 				}
// 			];

// var router = function(nav){

// 	adminRouter.route('/adduser')
// 		.get(function(req,res){

// 			var users = [req.body];

// 			var url = 'mongodb://localhost:27017/userApp';

// 			mongodb.connect(url, function(err, db){
// 				var collection = db.collection('users');
// 				collection.insert(users, function(err,results){
// 					res.send(results);
// 					db.close();
// 				});
// 			});

// 			//res.send('inserting Users..');
// 		});

// 	return adminRouter;
// };

// module.exports = router;

