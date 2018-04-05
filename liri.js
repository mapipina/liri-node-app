//Stating the required packages as dependencies
const dotenv = require('dotenv').config();
const keys = require('./keys');
const request = require('request');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const fs = require('file-system');

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
// if (arg === 'spotify-this-song' && q !== null) {
//   songs();
// } else {
//   q = 'I Want it That Way';
// };

var songs = function() {spotify.search({type: 'track', query: q, limit: 1}, function(err, data)
  {if(arg === 'spotify-this-song' && q !== null){
    console.log(data.tracks.items[0].album.artists[0].name); 
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].external_urls.spotify);
    } else {
      q = 'I Want it That Way';
    };
  });
};

// OMBD portion
var movie = process.argv[3];


function movieRequest () {
  request("http://www.omdbapi.com/?apikey=trilogy&t=" + movie, function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error) {
    // Then we print out the imdbRating
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year Released: " + JSON.parse(body).Released);
    console.log("imdbRating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    // console.log("RT: " +JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Cast: " + JSON.parse(body).Actors);
  }
});
}

if (arg === 'movie-this') {
  movieRequest();
}

// lookUpMovie: (movie) => {
//         var options = {
//             uri: ‘http://www.omdbapi.com/',
//             qs: {
//                 apikey: keys.omdb.key, // -> uri + ‘?access_token=xxxxx%20xxxxx’
//                 t: movie
//             },
//             headers: {
//                 ‘User-Agent’: ‘Request-Promise’
//             },
//             json: true // Automatically parses the JSON string in the response
//         };
//         rp(options)
//         .then((body) => {
//           console.log(`# Title: ${body.Title}`);
//           console.log(`# Year: ${body.Released}`);
//           console.log(`# IMDB Rating: ${body.Ratings[0].Value}`);
//           console.log(`# Rotten Tomatoes Rating: ${body.Ratings[1].Value}`);
//           console.log(`# Country: ${body.Country}`);
//           console.log(`# Language: ${body.Language}`);
//           console.log(`# Plot: ${body.Plot}`);
//           console.log(`# Cast: ${body.Actors}`);
//         })
//         .catch(error => {
//             console.log("error:", error); 
//         });
//     };

// Do what it says portion
function doit () {
  fs.readFile("./random.txt", "utf8", (err, data) => {
  if (err) throw err;
  // console.log(data);
  const lines = data.split(',')
  for (var i = 0; i < lines.length; i++) {
      console.log(lines[i])
  };
});
}

if (arg === 'do-what-it-says') {
  doit();
};
