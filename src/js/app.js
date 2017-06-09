window.addEventListener('load', function() {

// ---------- Zmienne  -----------//

	var scrollDown = document.querySelector('#scrollDown'),
		header = document.querySelector('header nav'),
		hamburgerIcon = document.querySelector('.hamburgerIcon'),	// pojemnik na icone hamburger menu
		iconBars = document.querySelectorAll('.iconBar'), 			// 3 belki hamburgera
		menuItems = document.querySelector('header ul'),  			// całe menu czyli hamburger icon i pozycje w menu
		showMoreText = document.querySelector('.showMoreText'), 
		hiddenText = document.querySelectorAll('.hiddenText'), 
		pageY = window.pageYOffset,
		pageWidth = window.outerWidth;
	
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
		hiddenText[0].style.display = 'inline-block';
		hiddenText[1].style.display = 'inline-block';
		showMoreText.style.display = 'none';
	}	

// Blok kodu scrolowanie myszą = zwiększenie wysokości headera 
	
	window.addEventListener('scroll', scrollPage); 			// złapanie zdarzenia scrolowania myszą
	
	function scrollPage() {
			
		if (pageWidth > 1280) {								// dla ekranów większych niż tablety i smartfony
		
			if (pageY > 75) { 								// gdy nastąpi pierwszy scroll myszką to..
					header.classList.add("headerSmall");
					scrollDown.style.display = 'none';  	// scrollDown znika
			}	
			else {
					header.classList.remove("headerSmall");
					scrollDown.style.display = 'block';
			}
		}
	}	

// Blok kodu zmiany wysokości headera po najechaniu myszką 
	
	header.addEventListener('mouseenter', headerExpand);   // złapanie zdarzenia polegającego na najechaniu i opuszczeniu hedera	
	header.addEventListener('mouseleave', headerExpand);
	
	function headerExpand(e) {
		console.log('1');
		if  ((e.type == "mouseenter") && (pageWidth > 1300))
				header.classList.remove("headerSmall");
			
		if ((e.type == "mouseleave") && (pageWidth > 1300)) {
	   			header.classList.add("headerSmall");
			}	
	}
}); 