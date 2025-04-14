require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let mongoose = require('mongoose');
const dns = require('dns');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Make a parser for body in post request
app.use(bodyParser.urlencoded({ extended: false }));
// Basic Configuration
const port = process.env.PORT || 3000;

/**
 * Varify the origin of request
 * @param {Object} request 
 * @param {Object} response 
 * @param {Object} next 
 */
function generalMiddleware(request,response,next) {
  let method = request.method
  let ip = request.ip
  let url = request.url
  let body = request.body
  console.log(`${method} ${ip} - ${url}`)
  console.log(body)
  next()
}

app.use(generalMiddleware)

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});1

/**
 * Use Regex to check if url string is valid
 * @param {String} url 
 * @returns Boolean
 */
function urlValidator(url) {
  regex = /https?:\/\/[ww\.]?.+\.[a-z]{2}[a-z]+?/
  let status = regex.test(url)
  return status
}

/**
 * Get a host name of valid URL
 * @param {String} url 
 * @returns 
 */
function getHostname(url) {
  // Create a new URL
  let newURL = new URL(url)
  let host = newURL.host
  return host
}

// Create a schema for table
let urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true
  },
  short_url:{
    type:Number,
    required:true
  }
});
// Create a schema model
let Url = mongoose.model('Url', urlSchema);

/**
 * Check if url is in database if not will be created
 * @param {String} url 
 * @returns Object
 */
async function checkOrSaveUrl(url) {
  let urlResponse = await Url.findOne({original_url:url}).select('url short_url').exec()
  // If documnet exist return the same short id
  if (urlResponse){
    return urlResponse
  }else{
    // If data is not in database create a new one
    let short_url = await Url.estimatedDocumentCount({}).exec()
    // Create a new document
    let newData = {original_url:url,short_url:short_url}
    let new_url = new Url(newData)
    new_url.save()
    return newData
  }
}

/**
 * Route handler to run URL shortener API
 * @param {Object} request 
 * @param {Object} response 
 */
async function shortUrlHandler(request,response) {
  // Get data from post request
  let url = request.body.url
  // Check with regex if url is valid
  let urlIsValid = urlValidator(url)
  // Catch an error if url is not valid
  if (!urlIsValid){
    response.json({ error: 'invalid url' })
  }else{
    let host = getHostname(url)
    dns.lookup(host, async (error,address)=>{
      if (address) {
        response.data = await checkOrSaveUrl(url)
        response.json(response.data)
      }else{
        response.json({ status: 'Invalid host' })
      }
    })
  }
}

// Your first API endpoint
app.post('/api/shorturl',shortUrlHandler);

/**
 * Get original URL from database and redirect page to original URL
 * @param {Object} request 
 * @param {Object} response 
 */
async function sendToURL(request,response) {
  let shortURL = request.params.url
  let document = await Url.findOne({short_url:shortURL}).exec()
  let originalURL = document.original_url
  response.statusCode = 302
  response.setHeader("Location",originalURL) 
  response.end()
}
// Route to redirect to a original url
app.get('/api/shorturl/:url',sendToURL)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
