# Chat cleaner

Napište program, který transformuje cO0l zPráVy<img height="20" src="https://emoji.gg/assets/emoji/GWjiangoOmegaLUL.png"><img height="20" src="https://emoji.gg/assets/emoji/1219_KEKW.png"> z chatu do čitelné podoby.
Zprávy jsou do našeho programu přesměrovány na standardní vstup - úkolem bude číst zprávy nebo části zprav po řádcích a provádět následující úpravy:


1. odstranit bílé znaky (whitespace - mezera, tabulátor, ...) ze začátku a konce každého řádku

   možné řešení:
   1. najít pozici prvního non-whitespace znaku
   2. překopírovat všechny znaky od této pozice na začátek pomocí vlastního cyklu nebo `strcpy`, `memcpy` či `memmove`
   3. cyklem jít od konce řetězce a najít první non-whitespace znak
   4. uložit za něj nový konec `\0`

2. transformovat cO0L tExT do čitelné podoby

   Každá věta začne velkým písmem a všechna ostatní písmena ve větě budou převedena na malá písmena.
   Věta je ukončena znakem `.`, `!` nebo `?`.

   Např. si před cyklem vytvořit proměnnou indikující start nové věty.
   Cyklem projít všechny znaky a první písmeno věty zvětšit a zbytek zmenšovat.
   Tečka, otazník či vykřičník poté nastaví nastaví proměnnou indikující novou větu.

3. nahrazení opakujících se znaků jedním výskytem

   Např. si pamatovat proměnnou s předchozím znakem nebo porovnávat přímo předchozí znak - pozor abychom nepřistoupili před/za pole.
   Na velikosti písmen nebude záležet - `xXxxXx` se také nahradí jedním `x`.
   Můžeme si udržovat dva indexy - jeden ve vstupním stringu a druhý ve výstupním stringu.
   Pokud se znak opakuje, tak jej nepřidáváme do výstupního stringu.

4. smazání smajlíku zapsaných pomocí `:nazev:`

   Procházíme znak po znaku a pamatujeme si, jestli jsme narazili na `:`.
   Pokud ano, tak nepřidáváme znaky do výstupního stringu.
   Pokud nenarazíme na ukončovací `:`, tak text musíme do stringu přidat - viz ukázka v testu.

5. cenzura slov pomocí hvězdiček

   Každé slovo z pole blocklistu o velikosti `sizeof(blocklist) / sizeof(blocklist[0])` zkusíme najít v řetězci.
   Pokud najdeme, tak celé slovo vyhvězdičkujeme a zkusíme hledat další výskyt od konce tohoto výskytu.
   Při hledání nebude záležet na velikosti písmen.

   ```c
   const char *blocklist[] = {
      "windows",
      "mac",
      "c#",
      "fortnite",
      "php",
      "javascript",
      ".net",
   };
   // blocklist[0] je "windows"
   ```
