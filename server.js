//------------------
// Setup
//------------------
var express        = require('express');
// Setja upp Express appið
var app            = express();
// Mongoose fyrir Mongodb			 
var mongoose   	   = require('mongoose');
// Loggar til console    	 
var morgan         = require('morgan');
// Nær í info úr HTML POST      	 
var bodyParser     = require('body-parser');
// DELETE og PUT 	 
var methodOverride = require('method-override'); 

//------------------
// Stillingar
//------------------
// Tengjast við Mongodb
mongoose.connect('localhost:27017/todo');
// Hvar static skrárnar eru, verður t.d. /img en ekki /public/img
app.use(express.static(__dirname + '/public'));
// Logga allt til console
app.use(morgan('dev'));
// Setja upp bodyParser
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
// Fyrir DELETE og PUT aukalega
app.use(methodOverride());

//------------------
// Models
//------------------
var Todo = mongoose.model('Todo', {
	text: String
});

//------------------
// Routes
//------------------
app.route('/api/todos')
	// Ná í öll todo
	.get(function(req, res) {
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err);
			} else {
				// Ef ekki error þá senda todos sem json
				res.json(todos);
			}
		});
	})
	// Búa til todo, kemur með ajax frá angular frontend
	// Sendir svo öll todo til baka þegar búið að er að vista
	.post(function(req, res) {
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err) {
				res.send(err);
			} else {
				// Ef ekki error ná í öll todo og senda til baka sem json
				Todo.find(function(err, todos) {
					if (err) {
						res.send(err);
					} else {
						res.json(todos);
					}
				});
			}
		});
	});

// Eyða todo með ákveðið id
app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo) {
		if (err) {
			res.send(err);
		} else {
			// Ef ekki error ná í öll todo og senda til baka sem json
			Todo.find(function(err, todos) {
				if (err) {
					res.send(err);
				} else {
					res.json(todos);
				}
			});
		}
	});
});

// Senda allar beiðnir á index.html og angular sér um rest
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

//------------------
// Keyra upp app
//------------------
app.listen(3000);
console.log('App hlustar á porti 3000');