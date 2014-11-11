var lastFmApp = {};

lastFmApp.apikey = '51657a939714920b12e608782d9961d0';
lastFmApp.tracks = [];
lastFmApp.months = {
	'Jan': 0,
	'Feb': 0,
	'Mar': 0,
	'Apr': 0,
	'May': 0,
	'Jun': 0,
	'Jul': 0,
	'Aug': 0,
	'Sep': 0,
	'Oct': 0,
	'Nov': 0,
	'Dec': 0
};
lastFmApp.totalPages = 0;
lastFmApp.totalTracks = 0;
lastFmApp.startDate = '1388534400';
lastFmApp.endDate = '1420070399';
lastFmApp.artist = '';
lastFmApp.user = '';

lastFmApp.init = function(){
	$('.submit .svg-rock').hover(function(){
		$('.submit h3').css('color', '#FFF');
	}, function(){
		$('.submit h3').css('color', '#E52B50');
	});

	$('.small-submit .svg-roll').hover(function(){
		$('.small-submit p').css('color', '#FFF');
	}, function(){
		$('.small-submit p').css('color', '#E52B50');
	});

	$('.svg-rock').focus(function(){
		$('.submit h3').css('color', '#FFF');
	});

	$('.svg-roll').focus(function(){
		$('.small-submit p').css('color', '#FFF');
	});

	lastFmApp.question();

	$('.svg-rock, .svg-roll').on('click', function(){
		$(this).loaders({spinnerNumber: 3, backgroundColor: '#E52B50'});
		// $('.submit').css('display', 'none');
		// $('.small-submit').css('display', 'block');
		lastFmApp.reset();
		lastFmApp.user = $('#userName').val();
		lastFmApp.artist = $('#artistName').val();
		var startDate = '1388534400';
		var endDate = '1420070399';
		$('.year-link:first').css({'color': '#B42024', 'text-decoration': 'none'});
		$('.year-link').hover('text-decoration', 'underline');
		lastFmApp.getTracks(lastFmApp.artist, lastFmApp.user, startDate, endDate); 
	});
	$('.textfield, .svg-rock').on('keydown', function(){
		if (event.keyCode == 13) {
			$(this).loaders({spinnerNumber: 3, backgroundColor: '#E52B50'});
			// $('.submit').css('display', 'none');
			// $('.small-submit').css('display', 'block');
			lastFmApp.reset();
			lastFmApp.user = $('#userName').val();
			lastFmApp.artist = $('#artistName').val();
			var startDate = '1388534400';
			var endDate = '1420070399';
			$('.year-link:first').css({'color': '#B42024', 'text-decoration': 'none'});
			$('.year-link').hover('text-decoration', 'underline');
			lastFmApp.getTracks(lastFmApp.artist, lastFmApp.user, startDate, endDate); 
		};
	});
};

lastFmApp.reset = function(){
	lastFmApp.tracks.length = 0;
	lastFmApp.months = {
		'Jan': 0,
		'Feb': 0,
		'Mar': 0,
		'Apr': 0,
		'May': 0,
		'Jun': 0,
		'Jul': 0,
		'Aug': 0,
		'Sep': 0,
		'Oct': 0,
		'Nov': 0,
		'Dec': 0
	}; 
	$('.year-link').css({'color': '#FFF', 'text-decoration': 'none'});
	$('.year-link').hover('text-decoration', 'underline');
};

lastFmApp.getTracks = function(artist, user, startDate, endDate){ 
	$.ajax({
		url: 'http://ws.audioscrobbler.com/2.0/',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			method: 'user.getartisttracks',
			user: user,
			artist: artist,
			startTimestamp: startDate,
			endTimestamp: endDate,
			api_key: lastFmApp.apikey,
			format: 'json'
		},
		success: function(result){
			if (typeof (result.artisttracks) === 'undefined') {
				swal({
					title: 'No results!',
					text: 'Check that the username and artist name are spelled correctly.',
					type: 'error'
				});
			}
			else if (typeof (result.artisttracks['@attr']) === 'undefined') {
					swal({
						title: 'No results!',
						text: 'Try choosing another date or entering a different artist.',
						type: 'error'
					});
				}
			else {
				$('.submit').css('display', 'none');
				$('.small-submit').css('display', 'block');
				lastFmApp.totalTracks = result.artisttracks['@attr'].total;
				lastFmApp.totalPages = result.artisttracks['@attr'].totalPages;
				for (var i = 0; i < result.artisttracks.track.length; i++) {
					lastFmApp.tracks.push(result.artisttracks.track[i]);	
				}
				if (lastFmApp.totalPages == 1) {
					lastFmApp.getDate(lastFmApp.tracks);
				} 
				else {
					lastFmApp.getPages(result, artist, user);
				};
			};
		}
	}); // end of ajax
}; // end of getTracks


lastFmApp.getPages = function(result, artist, user){
	for (var i = 2; i <= lastFmApp.totalPages; i++) {
		$.ajax({
			url: 'http://ws.audioscrobbler.com/2.0/',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				method: 'user.getartisttracks',
				user: user,
				artist: artist,
				startTimestamp: lastFmApp.startDate,
				endTimestamp: lastFmApp.endDate,
				page: i.toString(),
				api_key: lastFmApp.apikey,
				format: 'json'
			}, // end data
			success: function(result){
				for (var n = 0; n < result.artisttracks.track.length; n++) {
					lastFmApp.tracks.push(result.artisttracks.track[n]);	
				};
				if (lastFmApp.tracks.length == lastFmApp.totalTracks) {
					lastFmApp.getDate(lastFmApp.tracks);
				}
			} //end success
		}); //end ajax
	} // end for
};

lastFmApp.getDate = function(tracks){  
	for (var i = 0; i < lastFmApp.tracks.length; i++) {
		if (tracks[i].date['#text'].slice(-15, -12) == 'Jan') {
			lastFmApp.months['Jan']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Feb') {
			lastFmApp.months['Feb']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Mar') {
			lastFmApp.months['Mar']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Apr') {
			lastFmApp.months['Apr']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'May') {
			lastFmApp.months['May']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Jun') {
			lastFmApp.months['Jun']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Jul') {
			lastFmApp.months['Jul']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Aug') {
			lastFmApp.months['Aug']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Sep') {
			lastFmApp.months['Sep']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Oct') {
			lastFmApp.months['Oct']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Nov') {
			lastFmApp.months['Nov']++;
		}
		else if (tracks[i].date['#text'].slice(-15, -12) == 'Dec') {
			lastFmApp.months['Dec']++;
		};
	};
	lastFmChart();

};

$('.year-link').on('click', function(){
	lastFmApp.reset();
	$(this).loaders({spinnerNumber: 3, backgroundColor: '#E52B50'});
	$('.year-link:first').css('color', '#FFF');
	var year = $(this).text();
	$(this).css({'color': '#B42024', 'text-decoration': 'none'});
	$(this).hover('text-decoration', 'underline');
	lastFmApp.changeYear(year);	
});

lastFmApp.changeYear = function(year) {

	if (year == '2014') {
		lastFmApp.startDate = '1388534400';
		lastFmApp.endDate = '1420070399';
	}
	else if (year == '2013') {
		lastFmApp.startDate = '1356998400';
		lastFmApp.endDate = '1388534399';
	}
	else if (year == '2012') {
		lastFmApp.startDate = '1325376000';
		lastFmApp.endDate = '1356998399';
	}
	else if (year == '2011') {
		lastFmApp.startDate = '1293840000';
		lastFmApp.endDate = '1325375999';
	}
	else if (year == '2010') {
		lastFmApp.startDate = '1262304000';
		lastFmApp.endDate = '1293839999';
	}
	else if (year == '2009') {
		lastFmApp.startDate = '1230768000';
		lastFmApp.endDate = '1262303999';
	}
	else if (year == '2008') {
		lastFmApp.startDate = '1199145600';
		lastFmApp.endDate = '1230767999';
	}
	else if (year == '2007') {
		lastFmApp.startDate = '1167609600';
		lastFmApp.endDate = '1199145599';
	};

	lastFmApp.getTracks(lastFmApp.artist, lastFmApp.user, lastFmApp.startDate, lastFmApp.endDate);
};

lastFmApp.question = function() {
	$('.svg-question').on('click', function(){
		swal({
			title: 'Hi There!',
			text: "This app uses data from your Last.fm account. Last.fm is great and if you don't have an account you should sign up,  but if you want to see how this app works, test it out with my account. Username is elevature. For artists, try Spoon, The National, or Arcade Fire.",
			imageUrl: "img/speakers.png"
		});
	});
};

$(document).ready(function(){
	lastFmApp.init();
});

