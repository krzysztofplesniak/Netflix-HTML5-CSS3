window.addEventListener('load', function() {
	
	initMovies();


	function initMovies() {

		var randomMovie;

  		$.getJSON('src/omdb_id.json')
			.then(function(data) {
				
			    randomMovie = randomMovies(data.movies); 
			   	displayDescriptionBox(randomMovie);
				
				// DO ZROBIENIA !!!!!!!!!!!! zabranie tego wylosowanego filmu z listy 
				displayVideoBoxes(data.movies);
			});
 		}	
	

	function getMoviesFromOMDB(movieID) {
		
		var DescriptionPart1, DescriptionPart2, Title, Poster, Director, Genre, Year, Runtime;
		
		$.getJSON('http://www.omdbapi.com/?i='+ movieID +'&apikey=3a2d81a4')
			.then(function(data) {
				Title = data.Title;
				DescriptionPart1 = data.Plot; 	
				Director = data.Director;			
				Genre = data.Genre;
				Year = data.Year;
				Runtime = data.Runtime;
				Poster = data.Poster;

				console.log(data.Plot);

				// if (DescriptionPart1.length > 200) {
				// 		DescriptionPart1 = data.Plot.slice(1,200);
				// 		DescriptionPart2 = data.Plot.slice(201,data.Plot.length);
				// } else 
				// {
				// 		DescriptionPart2 = null;
				// }

				$('.filmTitle').text('Netflix prezentuje: ' + Title);
				$('.filmDescriptionP1').text('Opis filmu:' + DescriptionPart1);
				// $('filmDescriptionP2').text(DescriptionPart2);
			    $('.filmGenre').text('Typ filmu: ' + Genre);
			    $('.filmDirector').text('Reżyser: ' + Director);
			    $('.filmYear').text(Year);
			    $('.filmRuntime').text(Runtime);
			    

			});	
	}

	function randomMovies(movies) {
	
		var randomMovie = Math.floor(Math.random() * 14);
	
		// console.log('2 random' + movies[randomMovie]);
		return movies[randomMovie];
	}


	function displayDescriptionBox(movie) {
		
		// console.log('displayDescriptionBox ' + movie.id);

		$('.filmTitle').text('Netflix prezentuje: ' + movie.title);		


		// zapytanie AJAX'owe do bazy OMBd na bazie randomMovie.id czyli unikalnego ID filmów
		getMoviesFromOMDB(movie.id);
	}
	

	function displayVideoBoxes(movies) {
	
		// console.log('displayVideoBoxes' + movies);

		for (i=0; i< movies.length; i++) {
			// console.log('film -> ', movies[i].title);
		}
				
		
	}
	

});


// var video = videojs('videoBackground');

	// video.ready(function(){
		 
	// 	 setTimeout(function(){
	// 	 	// video.play();
	// 	 	video.volume(0); 	
	// 	 }, 2000);
	// });