http://krzysztofplesniak.github.io
Opis działania apliikacji 
Aplikacja wyglądem przypominająca Netflix z użyciem HTML5, CSS3 i JS. Filmy zaciągane są z bazy OMDB/IMDB.  
Filmy są losowo wybierane do pokazania w tle, z puli 10 filmów zapisanych w pliku JSON. W nim są identyfikatory potrzebne do bazy w celu pobrania danych tj. poster, url z trailerem, rok produkcji, aktorzy, reżyser, nagrody  itp. 
Trailery filmów można przeglądać z pola "Szukaj" w menu, po naciśnięciu klawisza PLAY bezpośrednio z listy kafelek z filmami na dole lub zobaczyć jeden proponowany film w sekcji głównej heroImage. Menu "Szukaj" podpowiada dobrane do wpisywanego ciągu znaków tytuły filmów. Opis filmu wraz możliwością oglądania filmu jest realizowany w oknie typu modal.  Kontrola       

Wykorzytane technologie: 
 - responsywność dla 6 stopni od 350px do 1280px dla trybu portrait i landscape,
 - JSON baza z ID do pózniejszego odpytania bazy IMDB,
 - Ajax zapytania do bazy IMDB z obsługą błędów, za pomocą prywatnego api-key 
 - GULP do poprawy kodu, minifikacji, łączenia, używanai w kodzie SASS itp jednym słowem automatyzacje niezbedne dla FRontowca,   
 - bibloteki zewnętrzne: IMDB-API , Video.JS, Modal-Video--JS
 
Sukcesywnie będę dodawał
-------------------------------------------------------
1. BEM i SASS dla lepszej organizacji i czytelności. Aby nie rozwalać projektu jeszcze nie przerobiłem jego z wykorzystaniem SASS'a i nie ponazywałem inaczej klas zgodnie z BEM. Mały projekt, a odczuwam już dyskomfort w tym spaghetii. 

2. Podzielić projekt na pliki CSS, gdzie każdy będzie odpowiadał za jakiś fragment funcjonalny np. layout  osobo, moduły osobno. To razem z  BEM i z SASS jest całkiem ciekawe podeście, ale też rozwali projekt zanim to przerobię.     

3. Zapytania Ajaxsowe do bazy OMDB (baza z filmami www.omdbapi.com, niestety Netflix nie udostepnia API) 
      Wpisywanie tytułu filmu w pole Szukaj 
      Za każdym nowym znakiem będzie pokazywać się lista 5 filmów pasujących do słowa wpisanego.  
4. Odtwarzanie trailera filmu po naciśniecu klawisza PLAY
5. Zmiana na głównej stronie zdjecia i opisu filmu 
      Zmiana losowa za każdym nowym otworzeniem zakładki przeglądarki.  
      Teraz na stałe jest jedna grafika i tekst.  
6. Modal z logowaniem 
      weryfikacja danych wpisywanych w fomularzu z wyrażeniami regularnymi
      dane zapamiętywane przez przeglądarkę. Przy tworzeniu "usera" skrypy sprawdza, czy taki login lub email już wystepuje
7. Podstrona "Przeglądaj" i "Dzieci"
      zaczytanie kilku filmów nowości lub tylko dla dzieci 
