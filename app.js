var express = require('express');

var bodyParser = require('body-parser');

var mongodb = require('mongodb').MongoClient;

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
			Link: '/users', 
			Text: 'User'
		} , {
			Link: '/reminders', 
			Text: 'Reminder'
		}];

var usersRouter = require('./src/routes/usersRoutes') (nav);

//var adminRouter = require('./src/routes/adminRoutes') (nav);

var authRouter = require('./src/routes/authRoutes') (nav);

var reminderRouter = require('./src/routes/reminderRoutes') (nav);


app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use('/users',usersRouter);
//app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use('/reminders',reminderRouter);


app.get('/', function(req,res){
	res.render('index' , {title: 'This is App ', 
		nav: [{
			Link: '/users', 
			Text: 'Users'
		} , {
			Link: '/reminders', 
			Text: 'Reminders'
		}]
	});
});

app.post('/remind', function(req,res){
	console.log(req.body);
			
	var reminders = [req.body];

	var url = 'mongodb://localhost:27017/userApp';

			mongodb.connect(url, function(err, db){
				var collection = db.collection('reminders');
				collection.insert(reminders, function(err,results){
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

app.route('/reminders')
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


app.listen(3000, function (err){
	console.log('Server runnning on port ' + port);
});