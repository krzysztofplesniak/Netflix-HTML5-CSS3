Link do hostingu -> http://krzysztofplesniak.github.io

Opis działania aplikacji 
---------------------------
- Aplikacja wyglądem przypominająca Netflix z użyciem HTML5, CSS3 i JS. Filmy zaciągane są z bazy OMDB/IMDB.  
- Filmy są losowo wybierane do pokazania w tle. Strona pokazuje zdjecia i opisy filmu za każdym razem inne. Zmiana losowa za każdym nowym otworzeniem sesji przeglądarki.  Aplikacja korzysta z pliku JSON, gdzie są zapisane dane do 20 filmów. 
- W pliku są obiekty, które zawierają ID, potrzebne do odpytania bazy w celu pobrania rozszerzonych danych tj. poster, url z trailerem, rok produkcji, aktorzy, reżyser, nagrody itp. 
- Trailery filmów można zobaczyć klikając na button "Podgląd filmu" (losowy film), lub wyszukując własny tutuł wpisujac go w polu input "Szukaj" w menu. Dodatkowo, można po naciśnięciu ikonki PLAY (lista z filmami na dole) zobaczyć inne domyślne proponowane filmy.
- Menu "Szukaj" podpowiada odnalezione w bazie OMDB tytuły filmów, dobrane do wpisywanego ciągu znaków. 
- Opis dokładny filmu wraz możliwością oglądania filmu jest realizowany w oknie typu modal (przyszłość). 
- Kontrola filmu spoczywa na biblotekach zewętrznych obsługujących tag <video> i wyświetląjących film w modalu (przyszłość).      


Wykorzytane technologie: 
-------------------------
 - responsywność dla 6 stopni od 350px do 1280px dla trybu portrait i landscape,
 - JSON baza z ID do pózniejszego odpytania bazy IMDB,
 - Ajax zapytania do bazy IMDB z obsługą błędów, za pomocą prywatnego api-key 
 - GULP pluginy do: poprawy kodu JSHint , HTMLHINT, minifikacja CSS i HTML, łączenia plików w jeden, tłumacz subkodu SASS oraz wiele innych, jednym słowem automatyzacje niezbedne dla FRontowca,   
 - bibloteki do video: Video.JS, Modal-Video-JS (przyszłość),
 - odpytanie bazy OMDB odbywa się za pomoca biblotek z NPM'a (przyszłość),
 
 
Nauka wyniesiona z projektu na podstawie popełnionych błędów 
--------------------------------------------------------------
1. Problem wielkości relatywnej VW. Okazuje się, że nie jest tak pieknie ja się wydaje, dlatego, że jest brak kontroli nad rozmiarem obrazków.   
Miałem problem zachowania ratio 67% szerokosc do wysokosci obrazka. 
Dla przeglądarki OperaMini dla 320px nie działa podawanie rozmiarów w VW
Po sprawdzeniu na canIuseIT okazuje się, że problem dotyczy znikomego procentu urządzeń. 
Okazuje sie, że w testach na komputerze było wszystko OK, a jak pokazala rzeczywistość, ciągle jest prawdziwe stwierdzzenie o wyższości testowania na żywym organizmie. Teraz dla wstepnej developerki testuję na BrowserSync, a testy użytecznosci na urządzeniu. 
2. Poznałem znaczenie CodeReview - spojrzenie swieżym okiem na kod po czasie pozwala znacząco poprawić efektywności uprościć kod, 
 Po czasie lepiej rozwiązałem problem centrowania elementu Ikony PLAY względem rodzica
3. Używanie na codzień automatów korygujących składnię i wykruywajacych błędy: JS & MTML hinty z GULPEM
  />, kolejność plików JS, i */ komentarz CSS, wykrycie znaku porównania == zamiast przypisania = 
 Inny przykład do zastosowanie dwóch prostych metod classList.add & classList.remove, które wydatnie zmniejszyły ilości kodu JS do obsługi MQ. Nie do przejścia był problem inline'jnowego wstawiania przez JS wartości, które później przeważają nad innymi wartościami wpisanymi bezśporednio w CSS.
4. W projekcie wstępnie używałem zamienie margin i padding. Ale po czasie wyraźnie rozgraniczyłem ich użycie. Zamiast margin często lepszy pading. Przykładowo dla znacznika <a> w menu, jest teraz tylko padding i dodatkowo posiada on ceche elementu blokowego z 100% szerokoscią elementu rodzica.  Zlikwidowałem padingi w elemencie nav > ul > li. Lepiej zrobić element <a> blockiem. 
Użycie marginu pozoliło mi dokładnie pozycjonowac element wzgledem innych. Był problem napisu "Szukaj", który zawsze był za nisko w stosunku do innych w menu. Dodatkowo wspomogłem się ostatecznie pozycjonowanie relatywnym. Pozycjonowanie uzyskałem dzięki kombinacji   relative+top zamiast line-heigth.
Problem używania padding pojawił się też dla ustalania wyglądu dla każdego posredniego MQ problem. Krok po kroku trzeba pilnować, gdzie sie co zmienia.  
5. Deklaracja zmniennych JS w jednym miejscu, pozwoliła w pewnym stopniu na unikniecie nadpisania. Wystąpił problem, gdy raz użyłem w CSS stylowania "header nav", a innym razem poprzez klase "navi". Element "nie łapał się" poprzez document.querySelector('navi').
6. Dla poprawy czytelność kodu z uzyję w projewkcie SASS, aby w prostyszy i przejrzysty sposób opisywać elementy. 
7. Wilokrotnie musż ewraca do kodu HTML aby przypomnieć do czego słuzy pewna klasa. Wraz z użyciem BEM będę mógł szybciej pracować nad aplikacją i też unikać problemów z nazewnictwem klas, kóre pomimo tego, że są opisowe to mało mówią o zachowaniu i funcji elementu w kodzie CSS/HTML. Projekt zostanie przebudowany z BEM, aby zotymalizowac kod dla 6 rozdzielczości MQ. Szukanie w kodze czy selektor nie jest nadmiarowy jest męczace i prowadzi do błędów. 

 
Sukcesywnie będę dodawał
-------------------------
1. BEM i SASS dla lepszej organizacji i czytelności. Aby nie rozwalać projektu jeszcze nie przerobiłem jego z wykorzystaniem SASS'a i nie ponazywałem inaczej klas zgodnie z BEM. Mały projekt, a odczuwam już dyskomfort w tym spaghetii. 
2. Podzielić projekt na pliki CSS, gdzie każdy będzie odpowiadał za jakiś fragment funcjonalny np. layout  osobo, moduły osobno. To razem z  BEM i z SASS jest całkiem ciekawe podeście, ale też rozwali projekt zanim to przerobię.     
3. Zapytania Ajaxsowe do bazy OMDB z wykorzystanime dedykowanej bibloteki https://www.npmjs.com/package/omdb
4. Ulepszona funcjonalnośc Inputu "Szukaj". Z każdym nowym wpisanym znakiem będzie powiązane odpytanie bazy i pokazywana będzie lista 5 filmów pasujących do słowa wpisanego.        
5. Odtwarzanie video z trailerem filmu po naciśniecu klawisza PLAY. Do rozwiązania problem braku możliwości pokazania trailerów z uzyskanego URLa z bazy. On nie jest mp4 tylko linkime do serwisu IMDB Baza z filmami www.omdbapi.com, niestety Netflix nie udostepnia API) 
6. Podstrona "Przeglądaj" i "Dzieci" - zaczytanie kilku filmów nowości lub tylko dla dzieci 
7. Modal z logowaniem 
      weryfikacja danych wpisywanych w fomularzu z wyrażeniami regularnymi
      dane zapamiętywane przez przeglądarkę. Przy tworzeniu "usera" skrypy sprawdza, czy taki login lub email już wystepuje

