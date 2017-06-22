window.addEventListener('load', function() {
	
	initMovies();

	function initMovies() {

		var randomMovie;
		var movies = [];

 		$.getJSON('src/omdb_id.json')
 			.then(function(movies) {
	 			console.log('1');
	 			randomMovie = randomMovies(movies); 
				displayDescriptionBox(randomMovie);
			
				// zabranie tego wylosowanego filmu z listy 
				// displayVideoBoxes(movies);
			}
		);
	
	}


 	function getJsonData() {
 		
	}			


	function randomMovies(movies) {
	
		var randomMovie;

		randomMovie = Math.floor(Math.random() * 14);
		console.log('2' + movies);
		// console.log('randomMovies ' + randomMovie + 'title' + movies[randomMovie].title);

		return movies[randomMovie];
	}


	function displayDescriptionBox(randomMovie) {
		
		console.log('displayDescriptionBox ' + randomMovie);

		$('.filmTitle').text('Netflix prezentuje: ' + randomMovie.title);		

		// zapytanie AJAX'owe do bazy OMBd na bazie randomMovie.id czyli unikalnego ID filmów
	}
	

	function displayVideoBoxes() {
	
		console.log('displayVideoBoxes');

		// $(data).each(function(i, film){
					
			
		// 	console.log(movie.index +' '+movie.id+' '+movie.title);
		// 	console.log(movieArray);
		// });
		// console.log('wybrany film to -> ', movieArray[7].title);
		// 
		// console.log(radomMovie, movieArray[radomMovie]);	
	}
	

});


// var video = videojs('videoBackground');

	// video.ready(function(){
		 
	// 	 setTimeout(function(){
	// 	 	// video.play();
	// 	 	video.volume(0); 	
	// 	 }, 2000);
	// });