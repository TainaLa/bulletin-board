var express = require('express');
var fs = require('fs');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
var fileData = [];
var inputdata = fs.readFileSync('post.json');
fileData = JSON.parse(inputdata)
var inputdata = [];


var server = app.listen(3000,listening);
function listening(){
	console.log('Server started, Listening on port 3000')
}
app.use(session({secret:'hhh'}));
// console.log(fileData);

//this fuction binds the app to the funtion. ensures fileData exists. MUST HAVE!!!
app.use(function(req, res, next){
    if (typeof(req.session.fileData) == 'undefined') {
        req.session.fileData = [];
    }else {
    	req.session.fileData = fileData;
    }
    next();
});
//this route loads homepage and should fill list with data from JSON file
app.get('/home', function(request, response) { 
	console.log(fileData);
    response.render('index.ejs', {fileData: request.session.fileData});
    console.log('this works');
});

//sets public as the default folder to look for files
//app.use(express.static('public'));

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
	response.redirect('/home')
}

app.use(function(request,response,next){
	response.redirect('/home');
});



