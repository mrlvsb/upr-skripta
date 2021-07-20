# Létající písmenka

Využijte znalosti [dvourozměrných polí](/c/pole/vicerozmerne_pole.md), [řetězců](/c/text/retezce.md) a [argumentů programu](/ruzne/funkce_main.html#vstupní-parametry-funkce-main.md) pro vytvoření následující animace:

<asciinema-player src="letters.cast"></asciinema-player>

1. Vytvoříme si strukturu reprezentující vykreslovací plochu

   ```c
   typedef struct {
    char *content; // rows x cols "pixelu"
    int rows;
    int cols;
   } Board;
   ```
2. Naimplementujeme si funkci pro vytvoření nové vykreslovací plochy o předaných rozměrech

   ```c
   Board* board_new(int rows, int cols) {
    // dynamická alokace paměti pro strukturu složenou z pointeru na obsah a dvou proměnných udávající rozměry
    // dynamická alokace paměti pro rows*cols pixelů typu char a uložení do pointeru content
    // uložení rows a cols do struktury a vrácení
   }
   ```
   
   Nesmíme také zapomenout ošetřovat různé chybové stavy - alokace paměti nemusí být vždy úspěšná a musíme provést kontrolu, zda navrácená paměť není `NULL`.
   K této funkci je také vhodné doimplementovat funkci pro uvolnění pixelů a poté samostatné struktury:
   ```c
   void board_delete(Board* b);
   ```

3. Funkce pro vykreslení pixelu / znaku

   Pro jednoduší a čitelnější kód si naimplementujeme funkci, která nám vykreslí znak `c` na řádek `row` a sloupec `col`.
   Funkce by také měla zkontrolovat, zda souřadnice není před nultým či posledním řádkem a sloupcem, aby nedocházelo k pádu programu nebo k vykreslování jinam.

   ```c
   void board_draw_pixel(Board *b, int row, int col, char c);
   ```

   Přepočet 2D souřadnice `[row, col]` na 1D index můžeme podle následujícího obrázku:
   <img src="/static/img/2d_array.svg">

4. Vykreslení rámečku
   
   Kolem okrajů vykreslíme rámeček pomocí funkce `board_draw_pixel`.
   Pro vykreslování rámečku **NENÍ** potřeba procházet vnitřek - stačí dvě smyčky za sebou.
   První smyčka bude procházet všechny řádky a kreslit na nultý a poslední sloupec.
   Obdobně druhá smyčka bude procházet sloupce a kreslit na nultý a poslední řádek.
   Procházením vnitřku plochy se může znatelně zpomalit např. při rozlišení 8k.

   ```
   #################
   #               #
   #               #
   #               #
   #               #
   #               #
   #               #
   #################
   ```
5. Reprezentace písmenka a jeho vykreslování

   Písmenko budeme reprezentovat pomocí struktury složené ze znaku, pozice a rychlost pohybu:
   ```c
   typedef struct {
    int row;
    int col;
   } Coord;

   typedef struct {
     char c;
     Coord position;
     Coord speed;
   } Letter;
   ```

   Rychlost pohybu `speed` bude nabývat hodnot `-1` pro směr vlevo v případě sloupcové souřadnice nebo směr nahoru v případě řádkové souřadnice.
   Hodnota `1` pak bude znamenat směr doprava respektive dolů.

   Následně si vytvoříme funkci pro jeho vykreslení do plochy:
   ```
   void letter_render(Letter *letter, Board *board);
   ```

6. Pohyb písmenka s odrážením od stěn

   Vytvoříme si funkci simulující jeden pohyb písmenka:
   ```
   void letter_step(Letter *letter, Board *board);
   ```
   
   K aktuální pozici písmenka v řádku a sloupci přičteme rychlost `speed` z odpovídající souřadnice.
   Poté zkontrolujeme, zda je nová pozice na prvním řádku/sloupci či předposledním řádku/sloupci.
   Pokud ano, tak změníme směr písmenka a tím dojde v příštím kroku k odrazu.
 
7. Hlavní smyčka

   Pro otestování odrazu je opět vhodné si udělat hlavní vykreslovací smyčku:

   ```c
   Board *b = board_new(20, 50);
   Letter l;
   l.c = 'O';
   l.position.row = b->rows / 2;
   l.position.col = b->cols / 2;
   l.speed.row = 1;
   l.speed.col = -1;

   for(;;) {
    // smazani terminalu
    printf("\e[1;1H\e[2J");

    // vykresleni ramecku
    board_draw_border(b);

    // jeden krok pismenka
    letter_step(&l, b);

    // vykresleni pismenka
    letter_render(&l, b);

    // uspani na 500 ms
    usleep(500 * 1000);
   }
   ```
8. Více písmenek

   Textový řetězec si převedeme na pole létajících písmenek pomocí funkce:

   ```c
   typedef struct {
    Letter *letters;
    int count;
   } Sentence;

   Sentence* sentence_new(const char* sentence) {
    // dynamická alokace struktury sentence
    // dynamická alokace pole pro písmenka letters
    // v cyklu projdeme řetězec sentence a nastavíme písmenka v letters, tak aby následovala za sebou a měla náhodnou rychlost
    // vrátíme ukazatel na strukturu
   }
   ```

   Vykreslovací smyčku poté upravíme, aby uměla pracovat s celou větou a ne jenom s jediným písmenkem - prakticky půjde pouze o doplnění cyklu přes všechna písmenka.
