	// ---------- Zmienne  -----------//

	var scrollDown = document.querySelector('#scrollDown'),
		scrollDownBox = document.querySelector('#scrollDownBox'),
		hamburgerIcon = document.querySelector('.hamburgerIcon'),	// pojemnik na icone hamburger menu
		iconBars = document.querySelectorAll('.iconBar'), 			// 3 belki hamburgera
		menuItems = document.querySelector('header ul'),  			// całe menu czyli hamburger icon i pozycje w menu
		header = document.querySelector('header nav'),
		showMoreText = document.querySelector('.showMoreText'), 
		hiddenText = document.querySelector('.hiddenText'),
		videoSection = $("#videoSection"),
		videoBoxes = $(".videoBoxes");
	
	var pageYOffset, pageWidth, numberOfRows, sectionHeight;
	
// Icona hamburger-menu animowana 
    	
	hamburgerIcon.addEventListener('click', function () {
		iconBars.forEach(function(iconBar) {
				iconBar.classList.toggle('changeHambIcon');
			}
		);
		menuItems.classList.toggle('showMenuItems');
	});
	

// Blok kodu obsługujacy kliknęcie w "Czytaj więcej"  

	showMoreText.addEventListener('click', showTextDescription); // event nałsuchujący kliknięcia na klawisz 
 															     //	"Czytaj więcej" który odsłoni część tekstu dla małych MQ 
	function showTextDescription() {
		
		if (hiddenText.value !== 0) {
			hiddenText.style.display = 'inline-block';
			showMoreText.style.display = 'none';
		}	
	}	 


// Blok kodu obsługujący różne funkcje, gdy zmniejsza się szerokośc ekranu
	window.addEventListener('resize', setVideoRows); 
	
	function setVideoRows(numberOfRows) {
				
		pageWidth = window.outerWidth;
		if (isNan(numberOfRows)) {
			numberOfRows = 5;
			console.log('Nie liczba', numberOfRows);		
		}	

		//kontrola ilości wierszy z kafelkami video, wyświetlanych w videoSection		
		// numberOfRow -> ilosc wierszy z kafelkami (ustalona domyślnie na 5) 
		// sectionHeight -> mnożnik sectionHeight używamy do ograniczenia  widzialnej części videoSection o wyliczony procent
		// w bazie jest 45 filmów, dla 1280px i 6 kafelek w wierszu maksymalnie będize mozna zobaczyc 8 wierszy 
		// my chcemy zawsze tylko 5 wierszy widocznych, czyli bierzemy tylko częśc wysokości 5/8 z 8 dostepnych wierszy, czyli 62,5%
		
		if (pageWidth > 1280) {
				sectionHeight = numberOfRows/Math.ceil(45/6);
				}			
		if ((pageWidth > 1024) && (pageWidth < 1280)) {
				sectionHeight = numberOfRows/Math.ceil(45/5);
				}
		if ((pageWidth > 768) && (pageWidth < 1024)) {
				sectionHeight = numberOfRows/Math.ceil(45/4);
				}	
		if ((pageWidth > 480) && (pageWidth < 768)) {
				sectionHeight = numberOfRows/Math.ceil(45/3);
				}			
		if (pageWidth < 480) {
				sectionHeight = numberOfRows/Math.ceil(45/2);
				}		
		// obliczenie jaka będize widoczna częśc videoSection
		videoSection.height(videoBoxes.height() * sectionHeight);
					
		// schowanie napisu "Czytaj więcej"  
		if ((pageWidth < 480) && (hiddenText.innerText.length === 0)) {
				showMoreText.style.display = 'block';
			}		
	}

// Blok kodu zmiany wysokości headera po najechaniu myszką 
	
	header.addEventListener('mouseenter', headerExpand);   // złapanie zdarzenia polegającego na najechaniu i opuszczeniu hedera	
	header.addEventListener('mouseleave', headerExpand);
	
	function headerExpand(e) {

			pageWidth = window.outerWidth;
		
			if  ((e.type == 'mouseenter') && (pageWidth > 1300)) {
					header.classList.add('headerBig');
			}	
			else if ((e.type == 'mouseleave') && (pageWidth > 1300)) {
		   			header.classList.remove('headerBig');
			}	
	}

//Blok kodu obsługi ekranu gdy nastapi scrolowanie myszą 
	
	window.addEventListener('scroll', scrollPage);
	
	function scrollPage() {
		
		pageWidth = window.outerWidth;
		pageYScroll = window.scrollY;

	//zanik sekcji ScrollDown
		if (pageYScroll > 75) {
				scrollDown.style.display = 'none';  	
		}	
		else {
				scrollDown.style.display = 'block';
		}
		
	//doczytanie dynamiczne wiekszej liczby wierszy z filmami
		if (pageYScroll > (videoSection.position().top + 0.5*videoSection.height())){
			
			setVideoRows(7);
			console.log('setVideoRows = 7');
		} 

	}

//Blok kodu obsługi kliknięcia na strzałkę przy krawędzi dolnej ekranu w sekcji #scrollDown

	scrollDownBox.addEventListener('click', function() {
		scrollViewTo('#videoSection');
	});	

// Uniwersalna funcja do przeskoku w dane miejsce ekranu po #id lub po nazwie klasy 
	function scrollViewTo(element) {
		
		// scroolToY			-> o tyle przesuń ekran wynik odejmowania 
		// pageYOffset			-> punkt górny o tyle przesunietu wzgledem poczatku documentu 
		// elementOffset		-> w tym miejscu znajduje się element 
		// headerFixedPosition	-> o tyle trzeba wszystko skorygowac bo heder belka jest zawsze przzypięta do ekranu

		pageYOffset = window.pageYOffset;
		var elementOffset = $(element).offset().top;
		var headerFixedPosition = 105;

		// kiedyś doda bardziej płynne przejście
		var scrollToY = elementOffset - pageYOffset - headerFixedPosition - 85;
		console.log(pageYOffset);
		window.scrollBy(0, scrollToY); 
	}