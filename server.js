//server.js

var express = require('express')
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean-bookmanager');

var Book = mongoose.model('Book', {
	name: String,
	author: String,
	price: Number,
	url: String 
});

// Configuración
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

app.get('/api/books', function(req, res) {
	Book.find(function(err, books) {
		if(err) {
			res.send(err);
		}
		res.json(books);
	});
});

app.post('/api/books', function(req, res) {
	Book.create({
		name: req.body.name,
		author: req.body.author,
		price: req.body.price,
		url: req.body.url
	}, function(err){
		if(err) {
			res.send(err);
		}

		Book.find(function(err, books) {
			if(err){
				res.send(err);
			}
			res.json(books);
		});
	});
});

app.delete('/api/books/:bookid', function(req, res) {
	Book.remove({
		_id: req.params.bookid
	}, function(err) {
		if(err){
			res.send(err);
		}

		Book.find(function(err, books) {
			if(err){
				res.send(err);
			}
			res.json(books);
		});

	})
});

app.listen(8082, function() {
	console.log('App listening on port 8082');
});

