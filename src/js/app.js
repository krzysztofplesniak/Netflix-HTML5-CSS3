window.addEventListener('load', function() {

// ---------- Zmienne  -----------//

	var scrollDown = document.querySelector('#scrollDown'),
		hamburgerIcon = document.querySelector('.hamburgerIcon'),	// pojemnik na icone hamburger menu
		iconBars = document.querySelectorAll('.iconBar'), 			// 3 belki hamburgera
		menuItems = document.querySelector('header ul'),  			// całe menu czyli hamburger icon i pozycje w menu
		header = document.querySelector('header nav'),
		showMoreText = document.querySelector('.showMoreText'), 
		hiddenText = document.querySelectorAll('.hiddenText'); 

	var pageY, pageWidth;
	
// Icona hamburger-menu animowana 
    	
	hamburgerIcon.addEventListener('click', function () {
		iconBars.forEach(function(iconBar) {
				iconBar.classList.toggle('changeHambIcon');
			}
		);
		menuItems.classList.toggle('showMenuItems');
	});
	

// Blok kodu obsługujacy anhora "Czytaj więcej"  

	showMoreText.addEventListener('click', showTextDescription); // event nałsuchujący kliknięcia na klawisz 
 															     //	"Czytaj więcej" który odsłoni część tekstu dla małych MQ 
	function showTextDescription() {
		console.log(1);
		hiddenText[0].style.display = 'inline-block';
		hiddenText[1].style.display = 'inline-block';
		showMoreText.style.display = 'none';
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