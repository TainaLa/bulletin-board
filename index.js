var express = require('express');
var fs = require('fs');
var app = express();

var server = app.listen(3000,listening);
function listening(request,response){
	console.log('Server started, Listening on port 3000')
}
//sets public as the default folder to look for files
app.use(express.static('public'));

//renders the index.html to browsers
app.get('/home',loadHome);
function loadHome(request,response){
	response.render('index.html');
}

//when the form is submitted, catches request
app.get('/post',postMsg);
function postMsg(request,response){
	var title = request.body.title;
	var msg = request.body.msg;

	console.log(title + ': ' +msg);
}