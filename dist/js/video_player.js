window.addEventListener("load",function(){function t(t){var e=new Object;return $.ajax({url:"https://www.omdbapi.com/?i="+t+"&apikey=3a2d81a4",type:"GET",dataType:"json",async:!1,success:function(t){e.Title=t.Title,e.DescriptionPart1=t.Plot,e.Director=t.Director,e.Genre=t.Genre,e.Year=t.Year,e.Runtime=t.Runtime,e.Poster=t.Poster,e.Writer=t.Writer,e.Actors=t.Actors,e.Awards=t.Awards,e.Rating=t.imdbRating,e.DescriptionPart1.length>400?(e.DescriptionPart1=t.Plot.slice(0,400),e.DescriptionPart2=t.Plot.slice(400,t.Plot.length)):e.DescriptionPart2=""}}),e}function e(t){var e=new Object;return console.log("https://www.omdbapi.com/?s="+t+"&apikey=3a2d81a4"),$.ajax({url:"https://www.omdbapi.com/?s="+t+"&apikey=3a2d81a4",type:"GET",dataType:"json",async:!1,success:function(t){console.log(t),e.Title=t.Title,e.DescriptionPart1=t.Plot,e.Director=t.Director,e.Genre=t.Genre,e.Year=t.Year,e.Runtime=t.Runtime,e.Poster=t.Poster,e.Writer=t.Writer,e.Actors=t.Actors,e.Awards=t.Awards,e.Rating=t.imdbRating,e.DescriptionPart1.length>400?(e.DescriptionPart1=t.Plot.slice(0,400),e.DescriptionPart2=t.Plot.slice(400,t.Plot.length)):e.DescriptionPart2=""}}),e}function r(e){var i=t(e.id);$(".filmTitle").text(i.Title),$(".filmDescriptionP1").text(i.DescriptionPart1),$(".filmDescriptionP2").text(i.DescriptionPart2),$(".filmGenre").text(i.Genre),$(".filmDirector").text(i.Director),$(".filmYear").text(i.Year),$(".filmRuntime").text(i.Runtime),$(".filmWriter").text(i.Writer),$(".filmActors").text(i.Actors),$(".filmAwards").text(i.Awards),$(".filmRating").text(i.Rating),$(".filmPoster").attr("src",i.Poster),$("#readAboutFilm").attr("href","http://www.imdb.com/title/"+e.id+"/"),$("#videoBackground").attr("poster",i.Poster),$("#videoBackground").children().attr("src",e.url)}function o(e){var r,o;for(i=0;i<e.length;i++)r="",r+='<div class="videoBox">',r+='<img src="'+(o=t(e[i].id)).Poster+'">',r+='<i class="fa fa-play-circle"></i>',r+="<p>"+o.Title+"</p>",r+="</div>",$(".videoBoxes").append(r)}function n(t){return t[Math.floor(20*Math.random())]}function s(t){console.log(t)}function a(){var t;l.addEventListener("keyup",function(i){13!=i.which&&13!=i.keyCode||(t=d.value,console.log("wpisany film to ",t),console.log(e(t)))})}var c=document.querySelector(".btnWatchVideo"),l=document.querySelector(".menuSearch"),d=document.querySelector(".expandedBox"),u=document.querySelector(".smallBox");!function(){var t;$.getJSON("src/omdb_id.json").then(function(e){r(t=n(e.movies)),o(e.movies)})}(),function(){c.addEventListener("click",function(){s("URL")}),l.addEventListener("mouseenter",function(){u.style.display="none",d.style.display="block",l.classList.add("mouseenter"),a()}),l.addEventListener("mouseleave",function(){u.style.display="block",d.style.display="none",l.classList.remove("mouseenter")})}()});