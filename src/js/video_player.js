
window.addEventListener('load', function() {

var btnWatchVideo = document.querySelector('.btnWatchVideo'),
	menuSearch = document.querySelector('.menuSearch'),
	expandedBox  = document.querySelector('.expandedBox'),
	smallBox = document.querySelector('.smallBox');


	//  najważniejsze funkcje 
		//	1. initMovies() - pokazanie opisu wybranego filmu w sekcji descriptionBox oraz wyświetlenie kafelek z video sekcja videoScetion
		//  2. eventListenerVideoBox() - nasłuch na każdym elementcie związanym video
		//  3. searchInput() - obsługa inputa "Szukaj" w header'ze  
		//  4. displayMovie('URL') - wyświetlenie video-trailera filmu w modalu po nacisnieciu klawisza Play na kafelkach lub klawisza 
		//	5. randomMovies() - wylosowane jednego filmu, 
		//	6. displayDescriptionBox() - odwołania do baza OMDB, 
		//	7. displayVideoBoxes() - wyświetlenie danych filmów,

	initMovies();
	eventListenerVideoBox();
	
	
	function initMovies() {

		var randomMovie;
		// pobranie polecanych filmów, które są zaczytywane z lokalnego pliku JSON
  		$.getJSON('src/omdb_id.json')
			.then(function(data) {

				//  wywołanie bloku kodu inicjacji video: 
					
			    randomMovie = randomMovies(data.movies);	// wylosowanie jednego filmu z sposród 20 z pliku JSON
			   	displayDescriptionBox(randomMovie);			// wyświetlenie danych w HTML losowego filmu
				displayVideoBoxes(data.movies);				// wysietlenie posterów i tytułów filmów w sekcji Videosection

				// !!! DO ZROBIENIA wykasowanie z tablicy wylosowanego filmu 
			});
 		}	
	
	// pobranie rozszerzonej ilości danych o jednym filmie tj. tytuł, rok, reżyser,
	// rok, aktorzy itp...na bazie zapytania do bazy OMDB z wykorzystaniem
	// id z plik JSON
	function searchMovieById(movieID) {
		
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

				// if (MovieDetails.DescriptionPart1.length > 400) {
				// 		MovieDetails.DescriptionPart1 = data.Plot.slice(0,400);
				// 		MovieDetails.DescriptionPart2 = data.Plot.slice(400,data.Plot.length);
				// } 
				// else {
				// 		MovieDetails.DescriptionPart2 = '';
				// }
				// console.log('OMDB ',data.Title);
			}
			
        });
		
        return  MovieDetails; // przekazanie obiektu na zewnątrz danymi do wybranego filmem 
			
	}

	function searchMovieByTitle(movieTitle) {
		
		var MovieDetails = new Object();
		
		$.ajax({
			url: 'https://www.omdbapi.com/?s='+ movieTitle +'&apikey=3a2d81a4',
			type:'GET',
        	dataType:'json',
        	async: false,
        	success: function(response){
        		var data = response.Search[0];
            	console.log('film tytuł', data);

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

				// if (MovieDetails.DescriptionPart1.length > 400) {
				// 		MovieDetails.DescriptionPart1 = data.Plot.slice(0,400);
				// 		MovieDetails.DescriptionPart2 = data.Plot.slice(400,data.Plot.length);
				// } 
				// else {
				// 		MovieDetails.DescriptionPart2 = '';
				// }
				
			}
			
        });
		
        return  MovieDetails; // przekazanie obiektu na zewnątrz z danymi do wpisanego w pole Szukaj filmem 
			
	}

	
	// wyświetlenie jednego wybranego filmu w descirptionBOX 
	function displayDescriptionBox(movie) {
			
		// zapytanie AJAX'owe do bazy OMBd z użyciem unikalne ID filmu na bazie wylosowanego filmu.
		// randomMovie ma jedną ze składowych randomMovieID, która jest unikalnym ID w bazie OMDb,
		// wykorzystanym do odpytania bazy o więcej danych o tym filmie

		var movieDetails = searchMovieById(movie.id);

		// wklejenie w HTML descriptionBox o wybranym losowym filmie
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
	    $('#readAboutFilm').attr('href', "http://www.imdb.com/title/"+ movie.id +"/");

	    // wklejenie w tag <video> danych filmu, kóry ma sie wyśietlic w tle
	    $('#videoBackground').attr('poster',movieDetails.Poster);
	    $('#videoBackground').children().attr('src', movie.url);
	    
	    // console.log($('#videoBackground').children().attr('src'));
	    
	    // var video1 = document.querySelector('#videoBackground');
	    // var video2 = videojs('videoBackground');
	    // video2.ready(function(){
	    // 	video1.play();
	    // 	video1.volume(0.3);
	    // 	console.log('video ready');	
	    // });	

		// video.addEventListener('loadstart', function(){
		// });

	}
	
	// wyświetlenie pozostałych filmów w tzw. kafelkach videoBox,
	// tytuł & poster ze zdjęciem z filmu
	function displayVideoBoxes(movie) {
		
		var outputHtml, movieDetails;
	
		for (i=0; i < movie.length; i++) {
			
			// pobranie rozszerzonych danych o filmie z zewnetrznej bazy OMDb 
			// w zmnienniej movie są tylko podstawowe dane tj. url, id, poster, tytuł i opis
			movieDetails = searchMovieById(movie[i].id);
		
			outputHtml = '';
			outputHtml += '<div class="videoBox">';
			outputHtml += '<img src="'+ movieDetails.Poster +'">';
			outputHtml += '<i class="fa fa-play-circle"></i>';
			outputHtml += '<p>'+ movieDetails.Title +'</p>';
			outputHtml += '</div>';

			$('.videoBoxes').append(outputHtml);
		
		}

		// dodanie taga <video> do kafelka z filmem
			// var modal = document.querySelector('.showModal');
			// modal.style.display = 'block';
			// outputHtml = '';	
			// outputHtml = '<video id="videoModal" poster="'+ movieDetails.Poster +'">';
			// outputHtml = '<source src="'+ movie[i].url +'" type="video/mp4">';
			// outputHtml = '</video>';
			// $('#body').append(outputHtml);
			// console.log('modal', outputHtml);
		
	}

	// wybranie losowo jednego filmu z listy 20 filmów 
	function randomMovies(movies) {
	
		var randomMovie = Math.floor(Math.random() * 20);
		return movies[randomMovie];  // zwracany jest jeden filmów z listy 20 
	}

	// funkcja obsługująca nasłuch na elementy związane z Video 
	function eventListenerVideoBox() {
			 
		// event reakcja na naciśnięcie klawisza PLAY
		// var videoPlay = document.querySelector('.fa-play-circle');
		// videoPlay.addEventListener('click', function() {
		// 	console.log('naciśnięto PLAY');
		// 	displayMovie('URL');
		// });

		
		// event na buttonie "Pokaż film" 
		btnWatchVideo.addEventListener('click', function() {
			displayMovie('URL');
		});

		// event najechania na input "Szukaj"
		menuSearch.addEventListener('mouseenter', function() {
			smallBox.style.display = 'none';
			expandedBox.style.display = 'block';
			menuSearch.classList.add('mouseenter');
			searchInput();
		});
		
		// event opuszczenia input "Szukaj"
		menuSearch.addEventListener('mouseleave', function() {
			smallBox.style.display = 'block';
			expandedBox.style.display = 'none';
			menuSearch.classList.remove('mouseenter');
			expandedBox.value = 'Wpisz ponownie tytuł filmu';	
		});
	}
	
	// modal z trailerem filmu
	function displayMovie(movieUrl) {
		console.log(movieUrl);
	}
	
	// obsługa klawisza "Szukaj"
	function searchInput() {
		var movieDetails, movieEntered;

		menuSearch.addEventListener('mousedown', function(event) {
			expandedBox.value = '';	
			menuSearch.addEventListener('keyup', function(event) {
				
				if (event.which == 13 || event.keyCode == 13) {
	     			movieEntered = expandedBox.value;
	     			console.log('wpisany film to ', movieEntered);

	     			// wywołanie AJAX'owego zapytania do bazy 
	     			movieDetails = searchMovieByTitle(movieEntered);
	     			// displayDescriptionBox(movieDetails);
				}
				
			});
		});	
	}

	// var video = videojs('videoBackground');
	// video.ready(function(){
		 
	// 	 setTimeout(function(){
	// 	 	// video.play();
	// 	 	video.volume(0); 	
	// 	 }, 2000);
});