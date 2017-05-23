window.onload=function() {

	var showMoreText = document.querySelector('.showMoreText'); 
	var hiddenText = document.querySelectorAll('.hiddenText'); 
	
	// event nałsuchujący kliknięcia na klawisz "Czytaj więcej" który odsłoni część tekstu dla małych MQ
	showMoreText.addEventListener('click', showTextDescription); 

	function showTextDescription() {
		hiddenText[0].style.display = "inline-block";
		hiddenText[1].style.display = "inline-block";
		showMoreText.style.display = "none";
	}	

	// wykrycie  eventu scrolowania dokumentu strony
	document.addEventListener('scroll', scrollPage); 
	
	// złapanie eklemntu descriptionBox gdzie jest wyświetlany opis wybranego filmu
	var descriptionBoxHeight = document.querySelector('.descriptionBox'); 
	
	function scrollPage() {
	 	 
	 	 // przesuniecie strony wzgledem osi Y
	 	 pageYoffset = window.pageYOffset;
	 	 console.log(pageYOffset);

	 	 if (pageYoffset > 400 ) {descriptionBoxHeight.style.height = "0px";}
	 	 else {descriptionBoxHeight.style.height = "auto";}
	}
} 