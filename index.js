// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", function(req, res){
  console.log(req.headers);

  let lang = req.headers['accept-language'];
  let userAgent = req.headers['user-agent'];
  let address = req.ip;

  res.json({
    "ipaddress": address,
    "language": lang,
    "software": userAgent
  })
});

app.get("/api/", function(req, res){

  let inputDate = new Date(Date.now());
  
  console.log(Date.now());
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });

});

app.get("/api/:date", function(req, res){

  let userInputDate = req.params.date;

  let inputDate = Date();

  console.log("API Call for date: " + inputDate);
  console.log(Number(userInputDate));
  if (userInputDate == ""){
    inputDate = Date();
  }else{
    if (isNaN(Number(userInputDate))){
      inputDate = new Date(userInputDate);
    }else{
      inputDate = new Date(Number(userInputDate));
    }
  }

  if (!inputDate.getTime()){
    res.json({
      error: "Invalid Date"
    });
  }
  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
