// Array of topics.
var topics = ["Kobe Bryant", "Michael Jordan", "LeBron James", "Russell Westbrook", "KAT", "Anthony Davis", "James Harden", "Kyrie Irving", "D'Angelo Russell", "DeMarcus Cousins"];
// Make the buttons.
for (var i = 0; i < topics.length; i++) {
	var $btn = $("<btn>").text(topics[i]).addClass("btn btn-primary playerButton");
	$btn.attr("player", topics[i]);
	$('#buttonDiv').append($btn);
}

function addButton() {
	var $btn = $("<btn>").text(topics[i]).addClass("btn btn-primary newPlayerButton");
	$btn.attr("player", topics[i]);
	$('#buttonDiv').append($btn);
	i++;
}
// function for putting gifs in html.
function inputImg(item) {
	// grab the url for the still image.
	var imgDiv = $('<div class = "imageDiv">');
	// create rating paragraph text.
	var rating = $('<p>').text('Rating: ' + item.rating);
	// Place rating in imgDiv.
	imgDiv.prepend(rating);

	var stillImgSrc = item.images.fixed_height_still.url;
	// grab the url for the animated image.
	var animatedImgSrc = item.images.fixed_height.url;
	// input still image into html with attr of still.
	var stillImg = $('<img>').attr('src',stillImgSrc).attr('state','still');
	stillImg.attr('stillImgURL',stillImgSrc).attr('animatedImgURL',animatedImgSrc);
	// Append the img to the imgDiv.
	imgDiv.append(stillImg);
	$('#displayGifsHere').append(imgDiv);
}

function ajax(URL) {
	$.ajax({
			url: URL,
			method: 'GET'

		})
		.done(function(response) {
			for(var j=0; j<10; j++) {
				// Call function 10 times that inputs the gifs.
				inputImg(response.data[j]);
				console.log(response);
			}
		})
}

$(document).ready(function(){
	$(document).on('click','img', function() {
		var state = $(this).attr('state');
		if(state === 'still') {
			$(this).attr('src', $(this).attr('animatedImgURL'));
			$(this).attr('state','animated');
		} else if (state === 'animated') {
			$(this).attr('src', $(this).attr('stillImgURL'));
			$(this).attr('state','still');
		}
	});
	$(document).on('click','#addPlayer',function() {
		var input = $('#player-input').val().trim();
		topics.push(input);
		// Add a button for whatever is entered in form.
		addButton();
		$(document).on('click','.newPlayerButton',function() {
			var player = $(this).attr('player');
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";
			$('#displayGifsHere').empty();
			ajax(queryURL);
		});
		// avoids refresh of page.
		return false;
	});
	$(document).on('click','.playerButton', function() {
		$('#displayGifsHere').empty();
		var player = $(this).attr('player');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: 'GET'

		})
		.done(function(response) {
		// console.log(response);
			for(var j=0; j<10; j++) {
				// Call function 10 times that inputs the gifs.
				inputImg(response.data[j]);
			}
		})
	});
});