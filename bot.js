// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var mediaArtsSearch = {q: "@blister", count: 10, result_type: "recent"}; 
console.log('Bot starting!');
console.log('Tweeting hello message');
T.get('search/tweets', mediaArtsSearch, function (error, data) {
	console.log('I ran the search first');
});
T.post('statuses/update', { status: 'I am alive! In upcoming days, I will tweet out usage instructions.' }, function(err, reply) {
	if ( err ) {
		console.log('Error:', err);
	} else {
		console.log('It tweeted.');
	}
});

console.log('I think I am done. Exit please.');
// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	
	T.get('search/tweets', mediaArtsSearch, function (error, data) {

		// If our search request to the server had no errors...
		console.log(error, data);
		
		if (!error) {
			// ...then we grab the ID of the tweet we want to retweet...
			var retweetId = data.statuses[0].id_str;
			
			// ...and then we tell Twitter we want to retweet it!
			T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
				if (response) {
					console.log('Success! Check your bot, it should have retweeted something.')
				}
				// If there was an error with our Twitter call, we print it out here.
				if (error) {
					console.log('There was an error with Twitter:', error);
				}
			});

		// However, if our original search request had an error, we want to print it out here.
		} else {
			console.log('There was an error with your hashtag search:', error);
		}
	});
}

// Try to retweet something as soon as we run the program...
//retweetLatest();

// ...and then every twenty minutes after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 20 = 20 minutes --> 1000 * 60 * 20
//setInterval(retweetLatest, 1000 * 60 * 20);
