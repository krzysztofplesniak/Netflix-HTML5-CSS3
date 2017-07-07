Link do hostingu -> http://krzysztofplesniak.github.io

Opis działania aplikacji 
---------------------------
- aplikacja wyglądem przypominająca Netflix,  i służąca do przegladania filmów,
- filmy zaciągane są z bazy TMDb/OMDB,  
- jedne z filmów jest losowo wybierany do pokazania w tle, 
- strona za każdym razem pokazuje inne zdjecia i opisy filmu. Zmiana losowa z każdą nową sesją przeglądarki, 
- aplikacja korzysta z pliku JSON, gdzie są zapisane ID do 45 filmów, 
- pobrane z pliku ID, służą do odpytania bazy TMDb, aby pobrać rozszerzone dane tj. poster, url z trailerem, rok produkcji, aktorzy, reżyser, nagrody itp. 
- trailer filmu można zobaczyć klikając na button "Podgląd filmu" (losowy film),
- input "Szukaj" w menu służy do wyszukania własnego tutuł filmu, 
- w sekcji dolnej VideoSection są prezentowane pozostałe postery 44 filmów zeskładowanych w pliku JSON,
- po naciśnięciu ikonki PLAY, na dole można także zobaczyć trailery tych filmów,
- po naciśnięciu "Pokaż więcej" z IMDB można dowiedzieć się dokładnego opisi i także przeglądanć film . 
- kontrola filmu częsciowo spoczywa na biblotece video.js obsługującej tag <video> a częściowo na własnej logide kontroli filmu

Przewdziane dodatki w przyszłości 
------------------------------------
- modal: eventy, customizacja css od pakiet Video.js,
- zmiana zapytań z bazy OMDb na TMDb: polskie opisy i trailery filmów,
- podstrona "Więcej o filmie": prezentacja szczegółowa wybranego filmu,
- podstrona "Przeglądaj" i "Dzieci" - zaczytanie kilku nowości filmowych lub filmów dedkowanych dla dzieci. 
- obsługa przycisków PLAY: wyświetlanie filmów w sekcji które są w sekcji VideoSection,
- input Szukaj: przy wpisywaniu w input, AJAX-owe podpowiedzi 5 pasujących tytułów filmów,
- refaktryzacja kodu CSS/JS i modularyzacja JS: lepsza organizacja kodu poprzez likwidację powtórzeń, wydzielenie bloków kodu, kontrola scope itp.
- SASS z BEM: przerobienie projektu, osiągniecie wiekszej czytelniości kodu CSS i otymalizacja kodu poprzez wyłapanie nadpisań.
- podział projekt na pliki CSS, gdzie każdy będzie odpowiadał za jakiś fragment funcjonalny np. layout  osobo, moduły osobno. To razem z  BEM i z SASS jest całkiem ciekawe podeście, ale też rozwali projekt zanim to przerobię.     
- obsługa błędów: AJAX'owe catch, asychnroniczne zapytania, brak plików, brak połączenia z baza, długi czas oczekiwania na dane,
- odpytanie bazy TMDb z pomocą dedykowanej bibloteki https://www.npmjs.com/package/omdb
- poprawa kodu AJAX'owego: dodanie obsługi blędów, poprawa callback heel, zamiana na promise lub modyfikacja callback'ów

Wykorzytane technologie: 
-------------------------
 - responsywność dla 6 stopni od 350px do 1280px dla trybu portrait i landscape.
 - JSON plik z ID filmów potrzebnych do późniejszego odpytania bazy OMDb.
 - Ajax'owe zapytania do bazy TMDb, za pomocą prywatnego api-key. 
 - GULP pluginy: poprawa kodu JSHint , HTMLHINT, minifikacja CSS i HTML, łączenia plików w jeden, tłumacz subkodu SASS oraz wiele innych, jednym słowem automatyzacje niezbędne dla FRONT-owca.   
 - bibloteki zewn. do wyświetlania video: Video.JS (przyszłość).

Nauka wyniesiona z projektu na podstawie popełnionych błędów 
--------------------------------------------------------------
1. Problem wielkości relatywnej VW. Okazuje się, że nie jest tak pieknie ja się wydaje, dlatego, że jest brak kontroli nad rozmiarem obrazków.   
- miałem problem zachowania ratio 67% szerokośćc do wysokości obrazka. 
- dla przeglądarki OperaMini dla 320px nie działa podawanie rozmiarów w VW.
- po sprawdzeniu na canIuseIT okazuje się, że problem dotyczy znikomego procentu urządzeń. 
- okazuje się, że w testach na komputerze było wszystko OK, a jak pokazała rzeczywistość, ciągle jest prawdziwe stwierdzzenie o wyższości testowania na żywym organizmie. Teraz dla wstępnej developerki testuję na BrowserSync, a testy użytecznosci na urządzeniu. 
2. Poznałem znaczenie CodeReview 
 - spojrzenie swieżym okiem na kod po czasie pozwala znacząco poprawić efektywności uprościć kod, 
 - po czasie lepiej rozwiązałem problem centrowania elementu Ikony PLAY względem rodzica
3. Używanie na codzień automatów korygujących składnię i wykrywających błędy: JS & MTML hinty z GULPEM
  - proste błędy jak: niedomknięcie tagu />, błędna kolejność plików JS, nie skasowany komentarz */ w CSS, wykrycie znaku porównania == zamiast przypisania = itp 
 - inny przykład do zastosowanie 2 prostych metod classList.add & classList.remove, które wydatnie zmniejszyły ilości kodu JS do obsługi MQ. 
 - nie do przejścia był problem inline'jnowego wstawiania przez JS wartości, które później przeważają nad innymi wartościami wpisanymi bezśporednio w CSS.
4. W projekcie wstępnie używałem zamienie margin i padding. Ale po czasie wyraźnie rozgraniczyłem ich użycie. Zamiast margin często lepszy pading. Przykładowo: 
- dla znacznika <a> w menu, jest teraz tylko padding i dodatkowo posiada cechę elementu blokowego z 100% szerokością elementu rodzica.
- zlikwidowałem padingi w elemencie nav > ul > li. Lepiej zrobić element <a> blockiem. Użycie marginu pozoliło mi dokładnie pozycjonowac element wzgledem innych. 
- był problem napisu "Szukaj", który zawsze był za nisko w stosunku do innych w menu. Dodatkowo wspomogłem się ostatecznie pozycjonowanie relatywnym. Pozycjonowanie uzyskałem dzięki kombinacji   relative+top zamiast line-heigth.
- problem używania padding pojawił się też dla ustalania wyglądu dla każdego posredniego MQ problem. Krok po kroku trzeba pilnować, gdzie się coś zmienia.  
5. Deklaracja zmniennych JS w jednym miejscu, pozwoliła w pewnym stopniu na uniknięcie nadpisania. Wystąpił problem, gdy raz użyłem w CSS stylowania "header nav", a innym razem poprzez klasę "navi". Element "nie łapał się" poprzez document.querySelector('navi').
6. Dla poprawy czytelności kodu z użyję w projekcie SASS'a, aby w prostyszy i przejrzysty sposób opisywać elementy. 
 - wielokrotnie muszę wracać do kodu HTML, aby przypomnieć do czego służy pewna klasa, której nazwa może na początku przy nadawaniu jej nazwy coś znaczy, ale zatraca swoje jednoznnaczne znaczenie z czase. 
- projekt zostanie przebudowany z BEM, aby zotymalizowac kod dla 6 rozdzielczości MQ. Szukanie w kodze czy selektor nie jest nadmiarowy jest męczace i prowadzi do błędów. 
- wraz z użyciem BEM będę mógł szybciej pracować nad aplikacją oraz unikać problemów z nazewnictwem klas, kóre pomimo tego, że są opisowe to mało mówią o zachowaniu i funncji elementu w kodzie CSS/HTML. 
 
