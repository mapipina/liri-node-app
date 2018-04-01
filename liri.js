var dotenv = require('dotenv').config();
var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var arg = process.argv[2];

if (arg === 'spotify-this-song') {
	spotify.search({type:'track', query:'Californication', limit: 1}, function(err, data){
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(JSON.stringify(data, null, 2));
	});
} 

