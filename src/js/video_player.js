
window.addEventListener('load', function() {
	
	//  wywołanie bloku kodu do obsługi video: 
	//	1. randomMovies() - wylosowane jednego filmu, 
	//	2. displayDescriptionBox() - odwołania do baza OMDB, 
	//	3. displayVideoBoxes() - wyświetlenie danych filmów,

	initMovies();
	eventListenerVideoBox();

	function initMovies() {

		var randomMovie;
		// pobranie polecanych filmów, które są zaczytywane z lokalnego pliku JSON
  		$.getJSON('src/omdb_id.json')
			.then(function(data) {

			    randomMovie = randomMovies(data.movies);	// wylosowanie jednego filmu z sposród 20 z pliku JSON
			   	displayDescriptionBox(randomMovie);			// wyświetlenie danych w HTML losowego filmu
				displayVideoBoxes(data.movies);				// wysietlenie posterów i tytułów filmów w sekcji Videosection

				// !!! DO ZROBIENIA wykasowanie z tablicy wylosowanego filmu 
			});
 		}	
	
	// pobranie rozszerzonej ilości danych o jednym filmie tj. tytuł, rok, reżyser,
	// rok, aktorzy itp...na bazie zapytania do bazy OMDB z wykorzystaniem
	// id z plik JSON
	function getMoviesFromOMDB(movieID) {
		
		var MovieDetails = new Object();
		
		$.ajax({
			url: 'https://www.omdbapi.com/?i='+ movieID +'&apikey=3a2d81a4',
			type:'GET',
        	dataType:'json',
        	async: false,
        	success: function(data){
            	
            	MovieDetails.Title = data.Title;
				MovieDetails.DescriptionPart1 = data.Plot; 	
				MovieDetails.Director = data.Director;			
				MovieDetails.Genre = data.Genre;
				MovieDetails.Year = data.Year;
				MovieDetails.Runtime = data.Runtime;
				MovieDetails.Poster = data.Poster;
				MovieDetails.Writer = data.Writer;
				MovieDetails.Actors = data.Actors;
				MovieDetails.Awards = data.Awards;
				MovieDetails.Rating = data.imdbRating;

				if (MovieDetails.DescriptionPart1.length > 400) {
						MovieDetails.DescriptionPart1 = data.Plot.slice(0,400);
						MovieDetails.DescriptionPart2 = data.Plot.slice(400,data.Plot.length);
				} 
				else {
						MovieDetails.DescriptionPart2 = '';
				}
				// console.log('OMDB ',data.Title);
			}
			
        });
		
        return  MovieDetails; // przekazanie obiektu na zewnątrz danymi do wybranego filmem 
			
	}
	

	// wyświetlenie jednego wybranego filmu w descirptionBOX 
	function displayDescriptionBox(randomMovie) {
			
		// zapytanie AJAX'owe do bazy OMBd z użyciem unikalne ID filmu na bazie wylosowanego filmu.
		// randomMovie ma jedną ze składowych randomMovieID, która jest unikalnym ID w bazie OMDb,
		// wykorzystanym do odpytania bazy o więcej danych o tym filmie

		var movieDetails = getMoviesFromOMDB(randomMovie.id);

		// wklejenie w strukture HTML danych o wybranym losowym filmie
		$('.filmTitle').text(movieDetails.Title);
		$('.filmDescriptionP1').text(movieDetails.DescriptionPart1);
		$('.filmDescriptionP2').text(movieDetails.DescriptionPart2);
	    $('.filmGenre').text(movieDetails.Genre);
	    $('.filmDirector').text(movieDetails.Director);
	    $('.filmYear').text(movieDetails.Year);
	    $('.filmRuntime').text(movieDetails.Runtime);
		$('.filmWriter').text(movieDetails.Writer);
		$('.filmActors').text(movieDetails.Actors);
		$('.filmAwards').text(movieDetails.Awards);
		$('.filmRating').text(movieDetails.Rating);
		$('.filmPoster').attr('src',movieDetails.Poster);
	    $('#readAboutFilm').attr('href', "http://www.imdb.com/title/"+ randomMovie.id +"/");
	}
	
	// wyświetlenie pozostałych filmów w tzw. kafelkach videoBox,
	// tytuł & poster ze zdjęciem z filmu
	function displayVideoBoxes(movie) {
		
		var outputHtml, movieDetails;
	
		for (i=0; i < movie.length; i++) {
			
			// pobranie rozszerzonych danych o filmie z zewnetrznej bazy OMDb 
			// w zmnienniej movie są tylko podstawowe dane tj. url, id, poster, tytuł i opis
			movieDetails = getMoviesFromOMDB(movie[i].id);
		
			outputHtml = '';
			outputHtml += '<div class="videoBox">';
			outputHtml += '<img src="'+ movieDetails.Poster +'">';
			outputHtml += '<i class="fa fa-play-circle"></i>';
			outputHtml += '<p>'+ movieDetails.Title +'</p>';
			outputHtml += '</div>';

			$('.videoBoxes').append(outputHtml);
		
			// console.log('DISPLAY ', i +' '+ movieDetails.Title);
		
		}
	}

	// wybranie losowo jednego filmu z listy 20 filmów 
	function randomMovies(movies) {
	
		var randomMovie = Math.floor(Math.random() * 20);
		// console.log('randomMovie ', i +' '+ movieDetails.Title);		
		return movies[randomMovie];  // zwracany jest jeden filmów z listy 20 
	}

	// funkcja obsługująca nasłuch na kliknięcie kafelka filmem 
	function eventListenerVideoBox () {
		console.log('eventListenerVideoBox');
        // eventy na kaflach 
		// event na Szukaj
		// event na buttonie "Pokaż film" 

		searchInput();
		displayMovie(filmURL);
	}
	
	// modal wyświetleniem z traialem filmu
	function displayMovie(movieUrl) {
		console.log('displayMovie', movieUrl);
	}
	
	// obsługa klawisza "Szukaj"
	function searchInput() {
		console.log('searchInput');
	}
});

// var video = videojs('videoBackground');

	// video.ready(function(){
		 
	// 	 setTimeout(function(){
	// 	 	// video.play();
	// 	 	video.volume(0); 	
	// 	 }, 2000);
	// });