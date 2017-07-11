	var btnWatchVideo = document.querySelector('.btnWatchVideo'),
		btnShowIMDB = document.querySelector('.btnShowIMDB'),
		menuSearch = document.querySelector('.menuSearch'),
		expandedBox  = document.querySelector('.expandedBox'),
		smallBox = document.querySelector('.smallBox'),
		closeModal = document.querySelector('.fa-window-close-o'),
		videoContainer = document.querySelector('#videoSection .videoBoxes'),
		modal = $('.modalBackground');
	
	var player;

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
			.then(function(response) {

				moviesArray	= response.movies;
			    randomMovie = randomMovies(45);						// wylosowanie jednego filmu z pliku JSON
			   	displayDescriptionBox(moviesArray[randomMovie],'JSON');	// wyświetlenie danych losowego filmu w descriptionBox
			   	displayVideoBoxes(moviesArray);						// wyświetlenie posterów i tytułów filmów w sekcji Videosection
			   	
				// !!! DO ZROBIENIA wykasowanie z tablicy wylosowanego filmu 
			});
 		}	
	
	// wybranie losowo jednego filmu z listy 45 filmów 
	function randomMovies(items) {
		return Math.floor(Math.random() * items);  // zwracany jest wylosowany numer z zakresu
	}
	
	// pobranie rozszerzonej ilości danych o jednym filmie tj. tytuł, rok, reżyser,
	// rok, aktorzy itp...na bazie zapytania do bazy OMDB z wykorzystaniem
	// id z plik JSON
	function searchMovie(type, requestedData) {
	
	var movieDetails, requestUrl, request,
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

	    if (source === 'JSON') {movieDetails = searchMovie('ID', movieToDisplay.id);}
		else if (source === 'OMDB') {movieDetails = searchMovie('ID', movieToDisplay.imdbID);}	
 		
		// wklejenie danych w descriptionBox losowego filmu
		$('.filmTitle').text(movieDetails.Title);
		$('.filmDescriptionP1').text(movieDetails.Plot.slice(0,100));
		$('.filmDescriptionP2').text(movieDetails.Plot.slice(100,movieDetails.Plot.length));
	    $('.filmGenre').text(movieDetails.Genre);
	    $('.filmDirector').text(movieDetails.Director);
	    $('.filmWriter').text(movieDetails.Writer);
	    $('.filmActors').text(movieDetails.Actors);
	    $('.filmAwards').text(movieDetails.Awards);
		$('.filmRating').text(movieDetails.imdbRating);
		$('.filmYear').text(movieDetails.Year);
		$('.filmRuntime').text(movieDetails.Runtime);
		$('.filmPoster').attr('src',movieDetails.Poster);

		// podmianka w butonach atrybutu data-url potrzebnego pózniej do otworzenia filmu lub strony IMDB z tym filmem 
		// $('.btnWatchVideo').attr('data-url', "http://www.youtube.com/watch?v=z_R04FgGvtw");
		$('.btnWatchVideo').attr('data-video-id', "_KJHRF6RlTQ");
	    $('.btnShowIMDB').attr('data-url', "http://www.imdb.com/title/"+ movieDetails.imdbID +"/");

	    // wklejenie w tag <video> danych filmu, kóry ma sie wyśietlic w tle
	    $('#videoBackground').attr('poster',movieDetails.Poster);
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
			outputHtml += '<div class="videoBox" data-video-id="4IM1XhTxPAE">';
			outputHtml += '<img src="'+ movieDetails.Poster +'">';
			outputHtml += '<i class="fa fa-play-circle"></i>';
			outputHtml += '<p>'+ movieDetails.Title +'</p>';
			outputHtml += '</div>';

			$('.videoBoxes').append(outputHtml);
		
		}
		setVideoRows(4); // pokazanie ograniczonej liczby wierszy

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

	// funkcja która naprzemiennie pokazuj i chowa elementy menuSearch
	function menuSearchDisplay(option) {
		
		if (option == 'show') {
			smallBox.style.display = 'none';
			expandedBox.style.display = 'block';
			menuSearch.classList.add('mouseSearchClick');
		}

		else if (option == 'hide') {
			smallBox.style.display = 'block';
			expandedBox.style.display = 'none';
			menuSearch.classList.remove('mouseSearchClick');
		}	
				
		expandedBox.value = 'Wpisz film';
	} 
	
	// obsługa inputa "Szukaj"
	function searchInput(movieTitle) {

		var movieDetails;
				
		// wywołanie AJAX'owego zapytania do bazy 
    	movieDetails = searchMovie('Title', movieTitle);
       	displayDescriptionBox(movieDetails,'OMDB');
	}

	// pokazanie Modalu na ekranie
	function openVideoModal(movieToDisplay) {
		var modalWindow, modalVideo;
		
		modalVideo = '';
		modalVideo += '<video id="modalVideo"';
		modalVideo +=  			' class="video-js vjs-big-play-centered vjs-default-skin vjs-16-9"';
		modalVideo +=			' autoplay preload="auto" controls>';
		modalVideo +=		' <source src="http://www.youtube.com/watch?v=' + movieToDisplay + '"';
		modalVideo +=		' type="video/youtube">';
		modalVideo +=  '</video>';
				
		modal.addClass('modalOpen');
		modalWindow = $('.modalWindow');
		modalWindow.append(modalVideo);

		console.log('ostatecznie', modalWindow.find('#modalVideo').find('source').attr('src'));
	}

	// odtworzenie Video w Modalu
	function playVideoInModal() {
		player = videojs('modalVideo');
		player.ready( function() {
			player.currentTime(5);
			player.volume(0.5);
			player.play();
		});
  		
  		// event zakończenia filmu 
		player.on('ended', function() {
			modal.removeClass('modalOpen');
		});
	}

	// funkcja obsługująca nasłuch na elementach związanych z video 
	function eventListenerVideoBox() {
				
		// event kliknięcia na input "Szukaj"
		menuSearch.addEventListener('click', function () {
			expandedBox.value = '';
		});
		
		// event najechania na input "Szukaj"
		menuSearch.addEventListener('mouseenter', function () {
			menuSearchDisplay('show');
		});

		// event opuszczenia inputu "Szukaj"
		menuSearch.addEventListener('mouseleave', function () {
			menuSearchDisplay('hide');
		});

		// event Enter na inpucie "Szukaj"
		menuSearch.addEventListener('keyup', function (event) {
			
			if ((event.which || event.keyCode) == 13) {
				scrollViewTo('#heroImage');
				hamburgerMenu();
				searchInput(expandedBox.value);
				menuSearchDisplay('hide');			
			}
		});
		
		// event na buttonie "Zobacz więcej" 
		btnShowIMDB.addEventListener('click', function () {
			window.open($('.btnShowIMDB').attr('data-url'));
		});

		// po kliknięciu na button "Podgląd filmu", wyświetlany jest modal .modalWindow
		// z videofilmem, ten sam co prezentowany w descriptionBox (jeden losowo wybrany film)
		btnWatchVideo.addEventListener('click', function () {
				
			// przekazanie ID filmu, który jest zapisany  w atrybucie data-video-id buttona "Pokaż film"
			openVideoModal($('.btnWatchVideo').attr('data-video-id'));											
			playVideoInModal();			
		});

		// evet kliknięcia na kafelek z video, ukazanie się modala z filmem 
		videoContainer.addEventListener('click', function (event) {
			var videoBox = event.target.parentNode;

			if (videoBox.className == 'videoBox') {
				
				// przekazanie ID filmu, który jest zapisany  w atrybucie data-video-id w videoBox
				openVideoModal($(videoBox).attr('data-video-id'));
				playVideoInModal();
			}	
		});

		// eventy: ESC & spacja, gdy wyświetlany jest trailer video
		window.addEventListener('keydown', function (event) {
			
			if ((event.which || event.keyCode) == 27) {
				modal.removeClass('modalOpen');
				player.dispose();
			}
			if ((event.which || event.keyCode) == 32) {

				if (player.paused() === true) {
					player.play();	
				}	
				else {
					player.pause();
				}
				event.preventDefault();	
			}
		});

		// event kliknięcia na punkt zamkniecia okna modal w prawym górnym rógu
		closeModal.addEventListener('click', function () {
			modal.removeClass('modalOpen');
			player.dispose();
		});
		
	}	