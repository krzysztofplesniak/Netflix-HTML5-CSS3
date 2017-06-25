window.addEventListener('load', function() {

// ---------- Zmienne  -----------//

	var scrollDown = document.querySelector('#scrollDown'),
		hamburgerIcon = document.querySelector('.hamburgerIcon'),	// pojemnik na icone hamburger menu
		iconBars = document.querySelectorAll('.iconBar'), 			// 3 belki hamburgera
		menuItems = document.querySelector('header ul'),  			// całe menu czyli hamburger icon i pozycje w menu
		header = document.querySelector('header nav'),
		showMoreText = document.querySelector('.showMoreText'), 
		hiddenText = document.querySelector('.hiddenText');
		

	var pageY, pageWidth;
	
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


// Blok kodu obsługujący różne funkcje, gdy ekran się zmniejszy 
	
	window.addEventListener('resize', showTextReadMore); 
 	
	function showTextReadMore() {
		pageWidth = window.outerWidth;
		
	// chowanie napis u"Czytaj więcej"  
		if ((pageWidth < 480) && (hiddenText.innerText.length === 0)) {
				showMoreText.style.display = 'block';
			}	
	
	// kontrola ilości,  Aby zawsze wyśietlała się pełna liczba video-kafelek w linii  

		if ((pageWidth > 768) && (pageWidth < 1024)) {
				var a = document.querySelector('.videoBox').offsetHeight;
				var b = (6*a);
				document.querySelector('#videoSection').style.height = b;
				var c = document.querySelector('#videoSection').offsetHeight;
				console.log(a,' ',b,' ',c);
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
				
			if ((e.type == 'mouseleave') && (pageWidth > 1300)) {
		   			header.classList.remove('headerBig');
				}	
	}

// Blok kodu scrolowanie myszą = zwiększenie wysokości headera 
	
	// window.addEventListener('scroll', scrollPage);
	
	// function scrollPage() {
	// 					
	// 	if (pageWidth > 1280) {								
		
	// 		if (pageY > 75) { 								
	// 				header.classList.add('headerBig');
	// 				scrollDown.style.display = 'none';  	
		
	// 		}	
	// 		else {
	// 				header.classList.remove('headerBig');
	// 				scrollDown.style.display = 'block';
	// 		}
	// 	}
	// }	


}); 