# Střelba na terče

<svg xmlns="http://www.w3.org/2000/svg">
	<!-- targets -->
	<circle cx="50" cy="70" r="40.000000" fill="red" />
	<circle cx="160" cy="90" r="60.000000" fill="#32CD32" />
	<!-- missiles -->
	<circle cx="25" cy="70" r="5" fill="black" />
	<circle cx="80" cy="90" r="5" fill="black" />
	<circle cx="150" cy="100" r="5" fill="black" />
	<circle cx="55" cy="140" r="5" fill="black" />
</svg>

1. načíst terče z textového souboru předaného v prvním argumentu programu

   ```c
   TargetsArray* targets_load(const char* path);
   ```

   - terče reprezentovat pomocí struktury
   - souřadnice jsou typu `int`
   - radius je typu `float`
   - barva může mít maximálně 15 znaků
   - na řádku může být pouze jeden terč
   - ošetřit neexistenci souboru a různé chyby nesplňující formát (viz testy):

   ```
   # targets.txt
   pocet_tercu
   terc0_x terc0_y terc0_radius terc0_barva
   terc1_x terc1_y terc1_radius terc1_barva
   ...
   ```

2. načíst střely z binárního souboru předaného v prvním argumentu programu

   ```c
   MissilesArray* missiles_load(const char* path) {
     // 1. otevreme soubor path pro binarni cteni
     // 2. zkontrolujeme, zda se podarilo nacist
     
     // 3. nacist ze souboru bajt s poctem prvku N (a zkontrolovat)
     // 4. alokovat strukturu MissilesArray (sizeof(MissilesArray)
     // 5. alokovat pamet pro N items typu Missile 
     
     // 6. cyklus pres vsechny prvky N
     // 7. precteme 2x uint32_t a ulozime do struktury (a kontrolujeme)
     
     // 8. zkontrolujeme, ze je konec souboru
     
     // 9. vratime pointer na missiles
   }
   ```
  
   - střely také reprezentovat pomocí struktury
   - ošetřit různé chyby při čtení (kratší soubor, delší soubor, ...)
   - první bajt soubor obsahuje počet terčů
   - každý terč je pak reprezentován dvěma čísly o velikosti 4 bajty (lépe použít `uint32_t`)
  
   <br>
   Obsah souboru: (lze najet myší na skupinky bajtů)<br>
   <code>$ xxd -g 1 01_missiles.bin</code>
<div class="hex">
 <span>04<span>1 unsigned bajt<br>počet střel</span></span>
 <span>19 00 00 00<span>unsigned int (uint32_t) v low endian<br>0x00000019 = 25<br>X souřadnice nulté střely</span></span>
 <span>46 00 00 00<span>unsigned int (uint32_t) v low endian<br>Y souřadnice nulté střely</span></span>
 <span>50 00 00 00<span>unsigned int (uint32_t) v low endian<br>X souřadnice první střely</span></span>
 <span>5a 00 00 00<span>unsigned int (uint32_t) v low endian<br>Y souřadnice první střely</span></span>
 <span>96 00 00 00<span>unsigned int (uint32_t) v low endian<br>X souřadnice druhé střely</span></span>
 <span>64 00 00 00<span>unsigned int (uint32_t) v low endian<br>Y souřadnice druhé střely</span></span>
 <span>37 00 00 00<span>unsigned int (uint32_t) v low endian<br>X souřadnice třetí střely</span></span>
 <span>8c 00 00 00<span>unsigned int (uint32_t) v low endian<br>Y souřadnice třetí střely</span></span>
</div>


3. vykreslit terče a střely do textového SVG obrázku `result.svg`

   ```c
   bool render_svg(const char *path, const TargetsArray *targets, const MissilesArray *missiles) {
   	// 1. otevreme soubor pro textovy zapis
    // 2. zkontrolovat
     
    // 3. projdeme vsechny targets a vytiskneme <circle>
    // 4. projdeme vsechny missiles a vytiskneme <circle>
     
    // 5. zavrit soubor
   }
   ```
   
   SVG obrázek musí byt v tomto formátu:
   ```
   <svg xmlns="http://www.w3.org/2000/svg">
      <!-- targets -->
      <circle cx="90" cy="70" r="40.000000" fill="red" />
      <circle cx="160" cy="90" r="60.000000" fill="#ffaabb" />
      <!-- missiles -->
      <circle cx="125" cy="70" r="5" fill="black" />
      <circle cx="80" cy="90" r="5" fill="black" />
      <circle cx="150" cy="100" r="5" fill="black" />
      <circle cx="55" cy="140" r="5" fill="black" />
	</svg>
   ```
   
4. vypočitání zásahu a uložení do binárního souboru `score.dat`

   ```c
   void calculate_score(TargetsArray *targets, const MissilesArray *missiles) {
   	// projdeme vsechny terce
      // projdeme vsechny strely
        // spocitame vzdalenost stredu terce od strely pomoci Pythagorovy vety
        // zjistime, jestli je to v terci - tj. vzdalenost je mensi nebo rovna polomeru
     	// inkrementujeme pocet zasahu ve strukture Terce
   }

   bool save_score(const char *path, TargetsArray *targets) {
   	// 1. otevreme soubor pro binarni zapis
    // 2. zkontrolujeme
    // 3. projdeme vsechny strely
    // 4. pokud je nenulovy pocet zasahu, tak ulozime index terce (1 `uint8_t`) + pocet zasahu (`uint32_t`)
   }
   ```
   
   - každý terč s **nenulovým** počtem zásahu bude uložen do souboru
   	- index terče uložen jako `unsigned char`
    - počet zásahů uložen jako `unsigned int`
   
      <code>$ xxd -g 1 score.dat</code>
<div class="hex" style="margin-bottom: 95px">
 <span>00<span>1 unsigned bajt<br>index nultého terče</span></span>
 <span>02 00 00 00<span>unsigned int (uint32_t) v low endian<br>0x00000002 = 2<br>nultý terč má dva zásahy</span></span>
 <span>01<span>1 unsigned bajt<br>index prvního terče</span></span>
 <span>01 00 00 00<span>unsigned int (uint32_t) v low endian<br>0x00000001 = 1<br>první terč má jeden zásah</span></span>
</div>


   

<style>
    div.hex > p > span {
      position: relative;
      border: 1px solid black !important;
      cursor: pointer;
      font-family: monospace;
    }
    div.hex span span {
      font-family: arial;
      display: none;
      position: absolute;
      white-space: nowrap;
      background: white;
      padding: 3px;
    }
    div.hex span:hover span {
      display: block;
      left: 0;
      z-index: 5;
    }
 </style>
