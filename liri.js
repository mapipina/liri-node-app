//Stating the required packages as dependencies
const dotenv = require('dotenv').config();
const keys = require('./keys');
const request = require('request');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');

//Storing access tokens and keys in constants
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

//Grabbing commands 
var arg = process.argv[2];

// Twitter
//setting the parameters for the response
const params = {
	screen_name: '1_mpina09',
	count: 20,
};
//grabbing Tweets from Twitter API
var tweets = function(){
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!!error) {
    console.log(error);
  } else {
  	for (var i = 0; i < tweets.length; i++) {
  		console.log(tweets[i].created_at + " " + tweets[i].text)
  	};
  }
});
};
//my-tweets
if (arg === 'my-tweets') {
	tweets();
};

// Spotify
var q = '';
for (var i = 2; i < process.argv.length; i++) {
  q = q + " " + process.argv[i];
};
// if statement for 
if (arg === 'spotify-this-song' && q !== null) {
} else {
  q = 'I Want it That Way';
};

var songs = function() {spotify.search({type: 'track', query: q, limit: 1}, function(err, data)
  {if(err){
    console.log("this error is " + err)
    };
  console.log(data.tracks.items[0].album.artists[0].name); 
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].album.name);
  console.log(data.tracks.items[0].external_urls.spotify);
  })
};

songs();


