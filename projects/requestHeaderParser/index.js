// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Get user data from header request and return ip, language and user agent as JSON
 * @param {Object} requests 
 * @param {Object} response 
 */
function getUserHardwareInfo(requests,response) {
  let ip = requests.ip
  let language = requests.headers["accept-language"]
  let userAgent = requests.headers["user-agent"]
  response.json({
  "ipaddress":ip,
  "language":language,
  "software":userAgent
  })
}
// Route for microservice
app.get('/api/whoami', getUserHardwareInfo);

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
