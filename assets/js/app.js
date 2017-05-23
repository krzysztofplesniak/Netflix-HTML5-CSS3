window.addEventListener("load", function() {
	
	// złapanie elemntu header i nav w celu zmiany płynnej wysokości o 40px podczas scrolowania ekranu w dół
	var header =  document.getElementById('header');
	var navi =  document.getElementById('navi');

	window.addEventListener("scroll", scrollPage);
	
	function scrollPage() {
		
		var pageY = window.pageYOffset;
		
		if (window.outerWidth > 1300px) {
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