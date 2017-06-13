var express = require('express');
var fs = require("fs");
var jsonfile = require('jsonfile');
var config = require('config.json');
var bodyParser = require('body-parser');
var port = 4004;
var app = express();
var sumanth=[]
var arrayr=[]
var details=[]
var viewdetails=[]
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});



app.post('/reged', function (req, res) {

	var email=req.body.email;
	var pass=req.body.pass;
	console.log(email);
	var buffer = new Buffer(pass);
    var password = buffer.toString('base64');

		sumanth.push({"email":email,"pass":password})
		
		console.log(JSON.stringify(sumanth))
		console.log(sumanth[0].email);

var data = JSON.stringify(sumanth);

fs.writeFile("input.json", data, function(err) {
   if (err) {
      return console.error(err);
   }
   });
             
   feedback={"output":"Inserted"}
   res.json(feedback)

});

app.post('/login', function (req, res){
	
	var email=req.body.email;
	var pass=req.body.pass;
	console.log(email);
	 
  fs.readFile('input.json', 'utf8', function (err, data) {
  if (err) throw err;
  arrayr = JSON.parse(data);
  console.log(arrayr)
  console.log("arrayr")

	 for(var i=0; i<arrayr.length; i++){
		 var iemail = arrayr[i].email;
		 
		 var b = new Buffer( arrayr[i].pass, 'base64')
		 var ipass = b.toString();
		 console.log("password is "+ipass);
		 
		 console.log("array"+JSON.stringify(arrayr[i]))
		 if(iemail===email && ipass===pass){
			 console.log(arrayr[i]);
			 console.log("login success");
			 
			  feedback={"output":iemail}
              res.json(feedback)
		 }
		 else{
			 console.log("not mathced");
		 }
		 
	 }
  });
	});
	
app.post('/bookdata', function (req, res) {

	var book=req.body.book;
	var author=req.body.author;
	var branch=req.body.branch;
	var email=req.body.email;
	console.log(author);
	
		details.push({"book":book,"author":author,"branch":branch,"email":email})
		
		console.log(JSON.stringify(details))

		var data = JSON.stringify(details);

  fs.writeFile("details.json", data, function(err) {
    if (err) {
      return console.error(err);
    }
  });
             
   feedback={"output":details}
   res.json(feedback)

});

app.post('/viewdata',function (req, res){
		
  fs.readFile('details.json', 'utf8', function (err, data) {
  if (err) throw err;
  viewdetails = JSON.parse(data);
  console.log(viewdetails)
	 
			 console.log("book found");

			  feedback={"output":viewdetails}
              res.json(feedback)
	 
})
	
})

app.post('/delindex',function (req, res){
	
	var index = req.body.index;
		
  fs.readFile('details.json', 'utf8', function (err, data) {
  if (err) throw err;
  viewdetails = JSON.parse(data);
  console.log(viewdetails)
	 
			 console.log("book found");
			 viewdetails.splice(index, 1);

			  feedback={"output":"deleted"}
              res.json(feedback)
  console.log(viewdetails)
    var data = JSON.stringify(viewdetails);
  fs.writeFile("details.json", data, function(err) {
   if (err) {
      return console.error(err);
   }
 });
})
	
})

app.post('/editdata', function(req, res){
	
	var book = req.body.book;
	var author = req.body.author;
	var branch = req.body.branch;
	var index = req.body.index;
	 fs.readFile('details.json', 'utf8', function (err, data) {
  if (err) throw err;
  viewdetails = JSON.parse(data);
  console.log(viewdetails)
	
		     console.log(viewdetails[index].email);
			 viewdetails[index]=[{"book":book,"author":author,"branch":branch,"email":viewdetails[index].email}];
			 console.log(viewdetails[index].book)
			  feedback={"output":"Edited"}
              res.json(feedback)
		
		 
  console.log(viewdetails)
    var data = JSON.stringify(viewdetails);
  fs.writeFile("details.json", data, function(err) {
   if (err) {
      return console.error(err);
   }
 });
})
})







	
app.listen(port);
	console.log("server is running on 4004");

	
	
	
	
	
	
	
	