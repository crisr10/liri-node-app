var action = process.argv[2];
console.log(process.argv[3]);
var keys = require('./keys.js');

if (action==='movie-this') {

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s

		for (var i = 3; i < nodeArgs.length; i++) {

		  if (i > 2 && i < nodeArgs.length) {

		    movieName = movieName + "+" + nodeArgs[i];

		  }

		  else {

		    movieName += nodeArgs[i];

		  }
		}

		// Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

		// This line is just to help us debug against the actual URL.
		console.log(queryUrl);

		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("Movie Name: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("Rating: " + JSON.parse(body).imdbRating);
		    console.log("Country : " + JSON.parse(body).Country);
		    console.log("Language: " + JSON.parse(body).Language);
		    console.log("Plot: " + JSON.parse(body).Plot);
		    console.log("Cast: " + JSON.parse(body).Actors);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Year);
		    console.log("Rotten Tomatoes URL: " + JSON.parse(body).Year);
		  }
	});
} 
else if (action==='my-tweets') {
	var params = {screen_name: 'nodejs'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  	if (!error) {
		    console.log(JSON.stringify(tweets, null, 2));
		 	}
		});
} 
else if (action==='spotify-this-song')
