
window.addEventListener('load', function() {

var btnWatchVideo = document.querySelector('.btnWatchVideo'),
	btnShowIMDB = document.querySelector('.btnShowIMDB'),
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
		var randomMovie, movies;
		// pobranie polecanych filmów, które są zaczytywane z lokalnego pliku JSON
  		$.getJSON('src/omdb_id.json')
			.then(function(response) {

				//  wywołanie bloku kodu inicjacji video: 
				moviesArray	= response.movies;
			    randomMovie = randomMovies();						// wylosowanie jednego filmu z sposród 20 z pliku JSON
			    // console.log('1 - > pierwsze wywołanie', moviesArray[randomMovie]);
			   	displayDescriptionBox(moviesArray[randomMovie],'JSON');	// wyświetlenie danych losowego filmu w descriptionBox
			   	displayVideoBoxes(moviesArray);						// wysietlenie posterów i tytułów filmów w sekcji Videosection

				// !!! DO ZROBIENIA wykasowanie z tablicy wylosowanego filmu 
			});
 		}	
	
	// wybranie losowo jednego filmu z listy 20 filmów 
	function randomMovies() {
		return Math.floor(Math.random() * 20);  // zwracany jest wylosowany numer z zakresu
	}

	// pobranie rozszerzonej ilości danych o jednym filmie tj. tytuł, rok, reżyser,
	// rok, aktorzy itp...na bazie zapytania do bazy OMDB z wykorzystaniem
	// id z plik JSON
	function searchMovie(type, requestedData) {
	
	var movieDetails, requestUrl;

		var request,
			baseUrl = 'https://www.omdbapi.com/',
			apiKey = '&apikey=3a2d81a4';
		

		if (type === 'ID') { 
				request = '?i=';
			}
		else if (type === 'Title') {
				request = '?t=';
			}

		requestURl = baseUrl + request + requestedData + apiKey;
		
		$.ajax({
			url: requestURl,
			type:'GET',
        	dataType:'json',
        	async: false,
        	success: function (response) {
        	 	movieDetails = response;	
        		}
        });
        
        return movieDetails;
    }

	
	// wyświetlenie jednego wybranego filmu w descirptionBOX 
	function displayDescriptionBox(movieToDisplay, source) {
	
		var movieDetails;

		// zapytanie AJAX'owe do bazy OMBd z użyciem unikalne ID filmu na bazie wylosowanego filmu.
		// randomMovie ma jedną ze składowych randomMovieID, która jest unikalnym ID w bazie OMDb,
		// wykorzystanym do odpytania bazy o więcej danych o tym filmie
		console.log('przed', movieToDisplay);
		if (source === 'JSON') {movieDetails = searchMovie('ID', movieToDisplay.id);}
		else if (source === 'OMDB') {movieDetails = searchMovie('ID', movieToDisplay.imdbID);}	
		
		console.log('po', movieDetails);
		// wklejenie w HTML descriptionBox o wybranym losowym filmie

		$('.filmTitle').text(movieDetails.Title);
		$('.filmDescriptionP1').text(movieDetails.Plot);
		// $('.filmDescriptionP2').text(movieDetails.descriptionPart2);
	    $('.filmGenre').text(movieDetails.Genre);
	    $('.filmDirector').text(movieDetails.Director);
	    $('.filmYear').text(movieDetails.Year);
	    $('.filmRuntime').text(movieDetails.Runtime);
		$('.filmWriter').text(movieDetails.Writer);
		$('.filmActors').text(movieDetails.Actors);
		$('.filmRating').text(movieDetails.Arating);
		$('.filmPoster').attr('src',movieDetails.Poster);

		// podmianka w butonach atrybutu data-url potrzebnego pózniej do otworzenia filmu lub strony IMDB z tym filmem 
		$('.btnWatchVideo').attr('data-url', movieToDisplay.url);
	    $('.btnShowIMDB').attr('data-url', "http://www.imdb.com/title/"+ movieDetails.imdbID +"/");

	    // wklejenie w tag <video> danych filmu, kóry ma sie wyśietlic w tle
	    $('#videoBackground').attr('poster',movieDetails.Poster);
	    $('#videoBackground').children().attr('src', movieToDisplay.url);
	    
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
	function displayVideoBoxes(movieToDisplay) {
		
		var outputHtml, movieDetails;
	
		for ( i=0; i < movieToDisplay.length; i++) {
			
			// pobranie rozszerzonych danych o filmie z zewnetrznej bazy OMDb 
			// w zmnienniej movie są tylko podstawowe dane tj. url, id, poster, tytuł i opis
			movieDetails = searchMovie('ID', movieToDisplay[i].id);
		
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
			// displayMovie('$('.btnWatchVideo').attr('data-url')');
			console.log('Pokaż film', $('.btnWatchVideo').attr('data-url'));
			window.open($('.btnWatchVideo').attr('data-url'));
	  	});
		
		// event na buttonie "Zobacz więcej" 
		btnShowIMDB.addEventListener('click', function() {
			console.log('Zobacz więcej na IMDB', $('.btnShowIMDB').attr('data-url'));
			window.open($('.btnShowIMDB').attr('data-url'));
		});

		// event kliknięcia na input "Szukaj"
		menuSearch.addEventListener('click', function() {
			expandedBox.value = '';
		});
		
		// event kliknięcia na input "Szukaj"
		menuSearch.addEventListener('mouseenter', function() {
			smallBox.style.display = 'none';
			expandedBox.style.display = 'block';
			menuSearch.classList.add('mouseSearchClick');
			expandedBox.value = 'Wpisz film';
		});

		// event opuszczenia input "Szukaj"
		menuSearch.addEventListener('mouseleave', function() {
			smallBox.style.display = 'block';
			expandedBox.style.display = 'none';
			menuSearch.classList.remove('mouseSearchClick');
			expandedBox.value = 'Wpisz film';	
		});

		menuSearch.addEventListener('keyup', function(event) {
				
			if (event.which == 13 || event.keyCode == 13) {
				searchInput(expandedBox.value);
	    	}
						
		});	
	}
	
	// modal z trailerem filmu
	function displayMovie(movieUrl) {
		console.log(movieUrl);
	}
	
	// obsługa klawisza "Szukaj"
	function searchInput(movieTitle) {

		var movieDetails;
				
		// wywołanie AJAX'owego zapytania do bazy 
    	movieDetails = searchMovie('Title', movieTitle);
    	console.log('2 - > Search Input', movieDetails);
    	displayDescriptionBox(movieDetails,'OMDB');
		
	}


	// var video = videojs('videoBackground');
	// video.ready(function(){
		 
	// 	 setTimeout(function(){
	// 	 	// video.play();
	// 	 	video.volume(0); 	
	// 	 }, 2000);
});