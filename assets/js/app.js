window.addEventListener('load', function() {
	
// Icona hamburger-menu animowana 
    // pojemnik na icone hamburger menu
	var hamburgerIcon = document.querySelector('.hamburgerIcon');

	// 3 belki hamburgera
	var iconBars = document.querySelectorAll('.iconBar');

	var menuItems = document.getElementById('menuItems');

	hamburgerIcon.addEventListener('click', function () {
			iconBars.forEach(function(iconBar, index) {
				iconBar.classList.toggle('showMenu');

				}
			)
			
			if (menuItems.style.height == "") {
					menuItems.style.height = "300px";
					menuItems.style.opacity = 1;
				 }
			else {
					menuItems.style.height = "";
					menuItems.style.opacity = 0;
			}		
			
		}
	);


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

	// złapanie zdarzenia scrolowania myszą
	window.addEventListener('scroll', scrollPage);
	
	function scrollPage() {
		
		var pageY = window.pageYOffset;
		var pageWidth = window.outerWidth;
		//dla ekranów większych niż tablety i smartfony
		if (pageWidth > 1300) {
		
			if (pageY > 170) { // gdy ekran zjedzie o więcej jak 125px to zmniejsz wysokosc headera o 40px  
				header.style.height = '100px';
				navi.style.marginTop = '5px';
			} else {
				header.style.height = '120px';
				navi.style.marginTop = '15px';
			}
		}
	};	

// Blok kodu zmiany wysokości headera i wielkości czcionek przy najechaniu myszą

	// złapanie elemenetów li>a 
	var menuItems = document.querySelectorAll('.menuItems a');
	
	//złapanie zdarzenia polegającego na najechaniu i opuszczeniu hedera	
	// header.addEventListener('mouseenter', headerExpand);
	// header.addEventListener('mouseleave', headerExpand);

	function headerExpand(e) {
		var pageWidth = window.outerWidth;
		

		if  ((e.type == "mouseenter") && (pageWidth > 1300)) {
				console.log('YES');	
				header.style.height = '120px'; // zwiększ wyokośc hedaera do 140px 
				navi.style.marginTop = '15px'; // zwiększ  margin-top elelementów w hedaer navi = logo + ul
				menuItems.forEach(function(menuItem, index) {
					menuItem.style.fontSize = "1.5rem"; // zwiększ  wielkości czcionek	
				})
				
			}

		if ((e.type == "mouseleave") && (pageWidth > 1300)) {
				header.style.height = '100px';
				navi.style.marginTop = '5px';  
				menuItems.forEach(function(menuItem, index) {
					menuItem.style.fontSize = "1.3rem"; 
				})
			}	
		
		
	};
}) 