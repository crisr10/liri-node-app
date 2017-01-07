var action = process.argv[2];
var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var title = "";
var nodeArgs = process.argv;
var fs = require('fs');

function movieThis() {
	if (nodeArgs.length<4) {
		console.log('* If you haven\'t watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/');
    	console.log('* It\'s on Netflix!');
	} else if (nodeArgs.length>3) {
	// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
	var request = require("request");
	fullTitle();

		// Then run a request to the OMDB API with the movie specified
		var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&tomatoes=true";

		request(queryUrl, function(error, response, body) {

		  // If the request is successful
		  if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("* Movie Name: " + JSON.parse(body).Title);
		    console.log("* Release Year: " + JSON.parse(body).Year);
		    console.log("* Rating: " + JSON.parse(body).imdbRating);
		    console.log("* Country : " + JSON.parse(body).Country);
		    console.log("* Language: " + JSON.parse(body).Language);
		    console.log("* Plot: " + JSON.parse(body).Plot);
		    console.log("* Cast: " + JSON.parse(body).Actors);
		    console.log("* Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
		    console.log("* Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

		    fs.appendFile('log.txt', '\n\nMovie This!');
		    fs.appendFile('log.txt', "\n* Movie Name: " + JSON.parse(body).Title);
		    fs.appendFile('log.txt', "\n* Release Year: " + JSON.parse(body).Year);
		    fs.appendFile('log.txt', "\n* Rating: " + JSON.parse(body).imdbRating);
		    fs.appendFile('log.txt', "\n* Country : " + JSON.parse(body).Country);
		    fs.appendFile('log.txt', "\n* Language: " + JSON.parse(body).Language);
		    fs.appendFile('log.txt', "\n* Plot: " + JSON.parse(body).Plot);
		    fs.appendFile('log.txt', "\n* Cast: " + JSON.parse(body).Actors);
		    fs.appendFile('log.txt', "\n* Rotten Tomatoes Rating: " + JSON.parse(body).tomatoUserRating);
		    fs.appendFile('log.txt', "\n* Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
		  }
		});
	}// else if ()
}

function myTweets(){

	var twitterKeys = keys.twitterKeys;

	var client = new Twitter(twitterKeys);

	var params = {screen_name: 'CristianRocas'};

	console.log('\n\nMy Tweets');
	fs.appendFile('log.txt', '\n\nMy Tweets');

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i=0; i<20;i++) {
	  		console.log('-------------------------------------');
	  		console.log('Tweet: '+tweets[i].text);
	  		console.log('Created: '+tweets[i].created_at);

	  		fs.appendFile('log.txt', '\n-------------------------------------');
		    fs.appendFile('log.txt', '\n'+tweets[i].text);
		    fs.appendFile('log.txt', '\n'+tweets[i].created_at);
	  	}
	  }
	});
}

// function to create the s[ptify query
function spotifyThis() {

	// If user didn't input a song, then it automatically looks for "The Sign"
	if (nodeArgs.length<4) {
		title = 'The+Sign+Ace';
		// Calls function that console logs what needes from the spotify API
		spotifyData();

	// User inputed a title
	} else if (nodeArgs.length>3) {
		fullTitle();
		spotifyData();
	}
}
// Get's the data from the JSON spotify query
function spotifyData() {

	spotify.search({ type: 'track', query: title}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    console.log('* Artist: '+data.tracks.items[0].album.artists[0].name);
	    console.log('* Song: '+data.tracks.items[0].name);
	    console.log('* Preview Link: '+data.tracks.items[0].preview_url);
	    console.log('* Album: '+data.tracks.items[0].album.name);

	    fs.appendFile('log.txt', '\n\nspotify-this-song');
	    fs.appendFile('log.txt', '\n* Artist: '+data.tracks.items[0].album.artists[0].name);
	    fs.appendFile('log.txt', '\n* Song: '+data.tracks.items[0].name);
	    fs.appendFile('log.txt', '\n* Preview Link: '+data.tracks.items[0].preview_url);
	    fs.appendFile('log.txt', '\n* Album: '+data.tracks.items[0].album.name);
	});
}

// 	Check if the user inputed a name longer than 1 word
function fullTitle() {
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
// this function grabs the song specified in random.txt
function randomText() {

	fs.readFile("random.txt", "utf8", function(error, data) {

	  // Then split it by commas (to make it more readable)
	  var dataArr = data.split(",");

	  // We will then re-display the content as an array for later use.
	  var randomSongQuo = dataArr[1];
	  var randomSong = randomSongQuo.slice(1, 19);

	  // We split the name of the song in order to make it a string that fits the spotify url
	  var randomSongArray = randomSong.split(" ");

	  for (var i=0; i<randomSongArray.length; i++) {
	  	title = title+'+'+randomSongArray[i];
	  }
	  spotifyData();

	});
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
else if (action==='do-what-it-says') {
	randomText();
}


