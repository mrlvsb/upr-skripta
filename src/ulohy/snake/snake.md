# Had
Zkuste vytvořit jednoduchý klon hry [Snake](https://en.wikipedia.org/wiki/Snake_(video_game_genre)) pomocí
[SDL](../../c/aplikovane_ulohy/sdl.md).

<a href="demo/a.html">Demo</a>

1. Vykreslete mřížku s políčky o rozměrech 32x32
   
   - Nekreslete první dvě a poslední dvě políčka
   - Do struktury `Game` přidejte rozměry vnitřní mřížky
   - Presuňte vykreslování do vlastní funkce
   
   <img src="grid.png" width="400px">

2. Reprezentace a inicializace hada pomocí struktury `Snake`

    ```c
	typedef struct {
       SDL_Point *parts; // pole souradnic clanku hada
       int tail; // index souradnice ocasu v poli parts
       int head; // index souradnice hlavy v poli parts
    } Snake;
	```

   - pamatujeme si souřadnice (`SDL_Point`) všech aktivních článků hada v mřížce
     - had může maximálně zabírat celou mřížku - alokace pole o velikosti ROWS x COLS
     - pamatujeme si index ocasu a index hlavy, které pak budeme posunovat pro pohyb
   - vytvoříme hada o dvou článcích uprostřed mřížky
   	 - uložíme souřadnici článku a inkrementujeme indexy hlavy
     - a ještě jednou pro ten druhý článek
     
     <upr-snake></upr-snake>

3. Vykreslení hada

   - projdeme všechny články od ocasu k hlavě a vykreslíme jako čtverce v mřížce
   - nastavíme si `i = tail`
   - cyklus dokud `i` není index hlavy
     - vykreslíme čtverec se souřadnici `i` v mřížce
     - posuneme se na další článek
        - pokud jsme na konci pole, tak pokračujeme od začátku pole `parts` (modulo...)
   
   <img src="init.png" width="300px">

4. Pohyb hada

   - pokud uběhlo 200 ms, tak pohnout hada o políčko
   - inkrementace indexu ocasu (opět s modulem)
   - výpočet nové hlavy jako `old_head + direction`
   - uložení nové hlavy do pole parts na index hlavy
   - inkrementace indexu hlavy (opět s modulem)
   
5. Pohyb pomocí šípek
6. Generování jablek

   - vygenerovat náhodnou souřadnici jablka a vykreslovat jako čtverec
   - pokud se hlava dostane na pozici jablka, tak neposunovat index ocasu (dojde k zvětšeni hada)

7. Při nárazu do stěny či do sebe vypsat konec hry se skórem

8. Vykreslení hada pomoci textur včetně záhybů

   Textura obsahuje v mřížce políčka o velikosti 64x64. 
   Jednotlivá políčka lze vybrat pomocí třetího parametru `srcrect` v `SDL_RenderCopy`.
   Záhyb lze vybrat podle pozice předchozího a následujícího článku.

   <img src="https://rembound.com/files/creating-a-snake-game-tutorial-with-html5/snake-graphics.png" width="300px" />
