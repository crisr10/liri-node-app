var action = process.argv[2];
var keys = require('./keys.js');
var title = "";
var nodeArgs = process.argv;

function movieThis() {
	if (nodeArgs.length<4) {
		console.log('If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
    	console.log('It\'s on Netflix!');
	} else if (nodeArgs.length>3) {
	// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
	var request = require("request");
	fullTitle();

		// Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

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
	}// else if ()
}

function myTweets(){
	var Twitter = require('twitter');
	var twitterKeys = keys.twitterKeys;

	var client = new Twitter(twitterKeys);

	var params = {screen_name: 'CristianRocas'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i=0; i<tweets.length;i++) {
	  		console.log('========================');
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  		console.log('========================');
	  	}
	  }
	});
}

function spotifyThis() {

	if (nodeArgs.length<4) {
		title = 'The+Sign';
		spotifyData();

	} else if (nodeArgs.length>3) {
		fullTitle();
		spotifyData();
	}
}

function spotifyData() {

	var spotify = require('spotify');
	spotify.search({ type: 'track', query: title}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    console.log('Artist: '+data.tracks.items[0].album.artists[0].name);
	    console.log('Song: '+data.tracks.items[0].name);
	    console.log('Preview Link: '+data.tracks.items[0].preview_url);
	    console.log('Album: '+data.tracks.items[0].album.name);
	});
}

function fullTitle() {

	// 	Check if the user inputer a name longer than 1 word
	if (nodeArgs.length<5) {

		title = process.argv[3];

	} else if (nodeArgs.length>=5) {

	// Loop through all the words in the node argument
	// And do a little for-loop magic to handle the inclusion of "+"s

		for (var i = 3; i < nodeArgs.length; i++) {
		  if (i > 2 && i < nodeArgs.length) {
		    title = title + "+" + nodeArgs[i];
		  }
		  else {
		    title += nodeArgs[i];
		  }
		}
	}
}

if (action==='movie-this') {
	movieThis();
}
else if (action==='my-tweets') {
	myTweets();
}
else if (action==='spotify-this-song'){
	spotifyThis();
}