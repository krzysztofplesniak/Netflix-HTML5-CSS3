window.onload=function() {

	var showMoreText = document.querySelector('.showMoreText'); 
	var hiddenText = document.querySelectorAll('.hiddenText'); 

	// event nałsuchujący kliknięcia na klawisz "Czytaj więcej" który odsłoni część tekstu dla małych MQ
	showMoreText.addEventListener('click', showTextDescription); 

	// wykrycie  eventu scrolowania dokumentu strony
	document.addEventListener('scroll', scrollPage); 

	function showTextDescription() {
		hiddenText[0].style.display = "inline-block";
		hiddenText[1].style.display = "inline-block";
		showMoreText.style.display = "none";
	}	

	function scrollPage() {
		 window.scrollBy(0, 100);
	}
} 