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

// if (arg === 'spotify-this-song') {
// 	spotify.search({type:'track', query:'Californication', limit: 1}, function(err, data){
// 		if (err) {
// 			return console.log('Error occurred: ' + err);
// 		}
// 		console.log(JSON.stringify(data, null, 2));
// 	});
// } 

