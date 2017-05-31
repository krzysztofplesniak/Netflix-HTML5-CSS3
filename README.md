Prosta strona użyciem HTM5, CSS3 i JS. Aplikacja wyglada jak Netflix, dzięki której można oglądać filmy z bazy OMDB. 

Użyłem: 
================
 - tagi semantyczne z HTML5 (header, nav, section)
 - 6 MQ od 320px do 1280px z róznym wyglądem menu za każdym razem i z dostosowującą się wielkością kafelek z filmami
 - kilka efektów z użyciem JS 
   1. menu Header zwija się lekko gdy przewijamy ekran do dołu
   2. hamburger menu z fajnym klawiszem animujacym do znaku X
   3. kalwisz "Szukaj" rozwija się po najechaniu w belkę do wpisywania tytułu filmu 

 
Do zrobienia
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
