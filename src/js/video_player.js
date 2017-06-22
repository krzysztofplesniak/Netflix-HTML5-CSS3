
window.addEventListener('load', function() {
	
	// wysołanie bloku kodu do obsługi bazy OMDB 
	initMovies();

	// funkcja która wszystko spaja w całosc
	function initMovies() {

		var randomMovie;
		// pobranie polecanych filmów które sa zaczytywane z lokalnego pliku JSON
  		$.getJSON('src/omdb_id.json')
			.then(function(data) {
				
			    randomMovie = randomMovies(data.movies); 
			   	displayDescriptionBox(randomMovie);
				displayVideoBoxes(data.movies);

				// DO ZROBIENIA !!!!!!!!!!!! zabranie tego wylosowanego filmu z listy 

			});
 		}	
	
	// pobranie reszty danych tj. tytuł, rok, reżyser itp... dla filmów z pliku JSON, na bazie zapytania do bazy OMDB z wykorzystaniem id zeskładowanego w plik
	function getMoviesFromOMDB(movieID) {
		
		var DescriptionPart1, DescriptionPart2, Title, Poster, Director, Genre, Year, Runtime;
		
		$.getJSON('https://www.omdbapi.com/?i='+ movieID +'&apikey=3a2d81a4')
			.then(function(data) {

				Title = data.Title;
				DescriptionPart1 = data.Plot; 	
				Director = data.Director;			
				Genre = data.Genre;
				Year = data.Year;
				Runtime = data.Runtime;
				Poster = data.Poster;

				if (DescriptionPart1.length > 400) {
						DescriptionPart1 = data.Plot.slice(0,400);
						DescriptionPart2 = data.Plot.slice(400,data.Plot.length);
					} 
				else 
					{
						DescriptionPart2 = '';
					}

				$('.filmTitle').text(Title);
				$('.filmDescriptionP1').text(DescriptionPart1);
				$('.filmDescriptionP2').text(DescriptionPart2);
			    $('.filmGenre').text(Genre);
			    $('.filmDirector').text(Director);
			    $('.filmYear').text(Year);
			    $('.filmRuntime').text(Runtime);
			    $('.filmPoster').attr('src', Poster);
			    $('#readAboutFilm').attr('href', "http://www.imdb.com/title/"+ movieID +"/");
			});	
	}

	// wybranie losowo jednego filmu z listy 15 filmów 
	function randomMovies(movies) {
	
		var randomMovie = Math.floor(Math.random() * 15);
	
		// console.log('2 random' + movies[randomMovie]);
		return movies[randomMovie];
	}

	// wyświetlenie jednego wybranego filmu w roszeszonym formacie w descirptionBOX 
	function displayDescriptionBox(movie) {
		
		// console.log('displayDescriptionBox ' + movie.id);

		$('.filmTitle').text('Netflix prezentuje: ' + movie.title);		

		// zapytanie AJAX'owe do bazy OMBd na bazie randomMovie.id czyli unikalnego ID filmów
		getMoviesFromOMDB(movie.id);
	}
	
	// wyświetlenie pozostałych filmów w tzw. kafelkach videoBox, tj. tylko poster tytuł i po kliknięciu na kafelek film moze dzięki temu się wysietlic
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