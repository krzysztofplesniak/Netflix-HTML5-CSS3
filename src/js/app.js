window.addEventListener('load', function() {
	
// Icona hamburger-menu animowana 
    // pojemnik na icone hamburger menu
	var hamburgerIcon = document.querySelector('.hamburgerIcon');

	// 3 belki hamburgera
	var iconBars = document.querySelectorAll('.iconBar');
	var menuItems = document.querySelector('header ul');
	

	hamburgerIcon.addEventListener('click', function () {

		iconBars.forEach(function(iconBar) {
				iconBar.classList.toggle('changeHambIcon');
		});
		
		menuItems.classList.toggle('showMenuItems');
	
		);
	}

// Blok kodu obsługujacy anhora "Czytaj więcej"  

	var showMoreText = document.querySelector('.showMoreText'); 
	var hiddenText = document.querySelectorAll('.hiddenText'); 
	
	// event nałsuchujący kliknięcia na klawisz "Czytaj więcej" który odsłoni część tekstu dla małych MQ
	showMoreText.addEventListener('click', showTextDescription); 

	function showTextDescription() {
		hiddenText[0].style.display = 'inline-block';
		hiddenText[1].style.display = 'inline-block';
		showMoreText.style.display = 'none';
	}	

// Blok kodu scrolowanie myszą = zwiększenie wysokości headera 

	// złapanie elementu header i nav w celu zmiany płynnej wysokości o 40px podczas scrolowania ekranu w dół
	var header = document.getElementById('header');
	var navi = document.getElementById('navi');
	var scrollDown = document.querySelector('#scrollDown');


	// złapanie zdarzenia scrolowania myszą
	window.addEventListener('scroll', scrollPage);
	
	function scrollPage() {
		
		var pageY = window.pageYOffset;
		var pageWidth = window.outerWidth;
		//dla ekranów większych niż tablety i smartfony
		if (pageWidth > 1280) {
		
			if (pageY > 75) { // gdy nastąpi pierwszy scroll myszką to..
				// header.style.height = '100px';  
				// navi.style.marginTop = '5px';
				div.classList.add("headerSmall");
				scrollDown.style.display = 'none';  // scrollDown znika
			}	
			else {
				// header.style.height = '120px';
				// navi.style.marginTop = '15px';
				div.classList.remove("headerSmall");
				scrollDown.style.display = 'block';
			}
			
		}
	}	

// Blok kodu zmiany wysokości headera i wielkości czcionek przy najechaniu myszą

	// złapanie elemenetów li>a 
	var menuATags = document.querySelectorAll('.menuItems a');
	
	//złapanie zdarzenia polegającego na najechaniu i opuszczeniu hedera	
	header.addEventListener('mouseenter', headerExpand);
	header.addEventListener('mouseleave', headerExpand);
	
	var div = document.querySelector('header nav');

	
	function headerExpand(e) {
		var pageWidth = window.outerWidth;
		

		if  ((e.type == "mouseenter") && (pageWidth > 1300)) {
				div.classList.remove("headerSmall");

				// header.style.height = '120px'; // zwiększ wysokość hedaera do 140px 
				// navi.style.marginTop = '15px'; // zwiększ  margin-top elelementów w hedaer navi = logo + ul
				// menuATags.forEach(function(menuATag, index) {
				// 	menuATag.style.fontSize = "1.4rem"; // zwiększ  wielkości czcionek	
				// });
				
			}

		if ((e.type == "mouseleave") && (pageWidth > 1300)) {
				div.classList.add("headerSmall");
				// header.style.height = '100px';
				// navi.style.marginTop = '5px';  
				// menuATags.forEach(function(menuATag) {
				// 	menuATag.style.fontSize = "1.3rem"; 
				// });
			}	
	}

  
}); 