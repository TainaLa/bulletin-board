var express = require('express');
var fs = require('fs');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
var fileData = [];


var server = app.listen(3000,listening);
function listening(){
	console.log('Server started, Listening on port 3000')
}
//sets public as the default folder to look for files
app.use(express.static('public'));

//renders the index.html to browsers
// app.get('/home',loadHome);
// function loadHome(request,response){
// 	response.sendFile('index.html');
// }

//when the form is submitted, catches request
app.post('/post/msg',urlencodedParser,postMsg);
function postMsg(request,response){
	console.log('post caught')
	var subject = request.body.subject;
	var msg = request.body.msg;
	var test = {'Title':subject , 'Message':msg};
	// console.log(subject + ': ' +msg);
	fileData.push(test);
	console.log(fileData);
	console.log(fileData[0].Message);

	fs.writeFile('post.json',JSON.stringify(fileData),function(err){
		if(err){
			console.log(err);
		}
	});

}