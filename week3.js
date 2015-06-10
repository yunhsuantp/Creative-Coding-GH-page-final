function getInstagramData(theInstagramObj){
	console.log("Going to get a photo!");
	console.log(theInstagramObj);

	var apiKEY = 'f6fa6aecfd764bab98f01d90354cdf5e';
	var tagName = theInstagramObj;
	var instagramURL = 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?client_id=';
	var searchInstagramURL = instagramURL + apiKEY;

	$.ajax({
		url: searchInstagramURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(err){
			console.log("Tears");
			console.log(err);
			$('#theInstagramResults').html('Sorry we can not find images through the TAG in Instagram.');
		},
		success: function(theData){
			console.log("Yes");
			console.log(theData);
			
			console.log(theData.data[0].images.low_resolution.url);

// 


// <div id="slider">
// 		      <ul id="categories">
// 		        <li class="category">
// 		          <h2>Instagram #Photos</h2>
// 		          <a href="#"><div id="theInstagramResults"></div></a>
// 		        </li>
// 		      </ul>
// 		      <a class="prev disabled"></a> <a class="next disabled"></a>
// 		      <div style="clear:both"></div>
// 		    </div>
// 




			$('#theInstagramResults').html('<p id="loadingMsg">The first 10 images from Instagram with the playlist tag.</p>');
			for(i=0; i<10; i++){
				var theImage = theData.data[i].images.low_resolution.url;
				var instagramLike = theData.data[i].likes.count;
				console.log("Likes");
				console.log(instagramLike);
				var theHTMLInstagramString ='<li class="category"><h2>' + '<img src="'+ theImage + '">';
				theHTMLInstagramString +=  instagramLike + 'Likes</h2></li>';
				$('#theInstagramResults').append(theHTMLInstagramString);
			}
			
			
		}
	});

}

function getSpotifyData(searchArtist){
	var spotifyURL = 'https://api.spotify.com/v1/search?q=';
	var searchURL = spotifyURL + searchArtist + '&type=playlist';
	console.log(searchURL);

	$.ajax({
		url: searchURL,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("We got problems");
			console.log(data);
			$('#theSpotifyResults').html('Sorry we can not find the playlist in Spotify.');
		},
		success: function(data){
			console.log("Woooo!!!");
			console.log(data);
			console.log(data.playlists);
			console.log(data.playlists.items);
			console.log(data.playlists.items[0].images[0]);
			console.log(data.playlists.items[0].images[0].url);
			var theInstagramObj = data.playlists.items[0].name;

			$('#theSpotifyResults').html('');
			var imageLink = data.playlists.items[0].images[0].url;
			var theHTMLString = '<img src="'+ imageLink + '">';
			console.log(theHTMLString);
			$('#theSpotifyResults').append(theHTMLString);

			getInstagramData(theInstagramObj);
			/*
			var theOriginalSearchTerm = data[0];
			var theNames =data[1];
			var totalResults = data[1].length;
			var theLinks =data[3];

			var theHTMLString = '<ol>';
			for(var i=0;i<totalResults;i++){
				var currentName = theNames[i];
				var currentLink = theLinks[i];
				console.log(currentName + "---" + currentLink);

				theHTMLString += '<li><a href="' + currentLink +'">'+currentName+'</a></li>';
			}
			theHTMLString += '<ol>'
			$('#theResults').html(theHTMLString);
			*/
			
		}
	});

}




// console.log("Loading 1");
$(document).ready(function(){
	// console.log("Loading 2");
	//Set up event listeners
	$('#wikiButton').click(function(){
		//do stuff in here
		var theInput = $('#theInputBox').val();
		console.log(theInput);
		getSpotifyData(theInput);
	});


});

// console.log("Loading 3");
