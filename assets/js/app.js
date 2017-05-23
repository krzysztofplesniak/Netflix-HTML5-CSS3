window.addEventListener("load", function() {
	
// Icona hamburger-menu animowana 
	var hamburgerIcon = document.querySelector('.hamburgerIcon');
	var iconBar = document.querySelectorAll('.iconBar');
	var menuItems =  document.querySelector('.menuItems');

	hamburgerIcon.addEventListener('click', function () {
			iconBar[0].classList.toggle('showMenu');
			iconBar[1].classList.toggle('showMenu');
			iconBar[2].classList.toggle('showMenu');
			if (menuItems.style.display = "block") {
				menuItems.style.display = "none";
				console.log('none');
			} 
			if (menuItems.style.display = "none") {
				menuItems.style.display = "block";
				console.log('block');
			}
			
		}
	);


// Blok kodu obsługujacy anhora "Czytaj więcej"  

	var showMoreText = document.querySelector('.showMoreText'); 
	var hiddenText = document.querySelectorAll('.hiddenText'); 
	
	// event nałsuchujący kliknięcia na klawisz "Czytaj więcej" który odsłoni część tekstu dla małych MQ
	showMoreText.addEventListener('click', showTextDescription); 

	function showTextDescription() {
		hiddenText[0].style.display = "inline-block";
		hiddenText[1].style.display = "inline-block";
		showMoreText.style.display = "none";
	}	

// Blok kodu animacja zmiany wysokosci ekrany przy scrolowaniu myszą

	// złapanie elemnetu header i nav w celu zmiany płynnej wysokości o 40px podczas scrolowania ekranu w dół
	var header = document.getElementById('header');
	var navi = document.getElementById('navi');

	window.addEventListener("scroll", scrollPage);
	
	function scrollPage() {
		
		var pageY = window.pageYOffset;
		var pageWidth = window.outerWidth;
		console.log(pageWidth);
		if (pageWidth > 1300) {
			console.log("scroll");
			if (pageY > 125) {
				header.style.height = "100px";
				navi.style.marginTop = "0px";
			} else {
				header.style.height = "140px";
				navi.style.marginTop = "20px";
			}
		}
	}	
 	
	
}) 