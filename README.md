# LIRI 

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.


## Geting started

1. Clone the repository on your local machine.
2. Open the terminal in the correct folder and run `npm install` to install all the dependencies
3. If you don't have a twitter key, you can find the information to obtaain one [Here](https://dev.twitter.com/oauth/overview)
4. Create a file in the root folder called *keys.js*. Here is where you will input your twitter keys in the following format:

   exports.twitterKeys = {
     consumer_key: '(input here)',
     consumer_secret: '(input here)',
     access_token_key: '(input here)',
     access_token_secret: '(input here)',
   }

## Using the app

You can enter the following commands:

1. "node liri.js my-tweets"
This will show your last 20 tweets and when they were created at in your terminal/bash window.

2. "node liri.js spotify-this-song '<song name here>'"
This will show the following information about the song in your terminal/bash window.
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

If no song is provided then your program will default to
* "The Sign" by Ace of Base

3. "node liri.js movie-this '<movie name here>'"
This will output the following information to your terminal/bash window:

    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
    * Rotten Tomatoes Rating.
    * Rotten Tomatoes URL.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    * If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
    * It's on Netflix!

4. "node liri.js do-what-it-says"
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "Lose Yourself" as follows the text in random.txt.
