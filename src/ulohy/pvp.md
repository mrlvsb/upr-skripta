# PvP fight game

Vytvořte simulaci PvP bitevní hry dle vaších představ.
Hra bude simulována dle náhody v herních kolech dle následující kostry:
```c
while(nepratele_nebo_hrac_nazivu()) {
  // zvolim si nepritele
  // zautocim na nej a sebere mu zivoty
  // nepritel zautoci na me a sebere mi zivoty
  
  // smazani terminalu
  printf("\e[1;1H\e[2J");

  // nove vykresleni

  // uspani na 500 ms
  usleep(500 * 1000);
}
```

Životy nepřátelu reprezentujme pomocí pole čísel a na začátku hry jim náhodně přiřaďme čísla z intervalu např. 150 - 400.
Hrdinovi životy vygenerujme obdobně - využíjte tedy **funkci** pro vygenerovaní životů, ať zbytečně nekopírujeme kód.
Obdobně můžeme také vytvořit pole štítů a zbraní.
Konkrétního nepřítele můžeme vybrat pomocí několika strategií - každá může být naimplementovaná ve funkci přijímající pole životů/štítů/zbraní a počet nepřátel.
Funkce pak může vracet index vybraného hrdiny na kterého zautočíme.
1. vybrat nepřítele náhodně
2. vybrat nepřítele s nejmenším počtem životů
3. vybrat nepřítele s nejmenším počtem zivotů a štítu
4. vybrat nepřítele s nejslabší zbraní

Po zaútočení ubereme nepříteli životy a zajistíme, aby nemohly být záporné - například pomocí ternárního výrazu.
Pokud má však štít, tak musíme mu nejprve ubrat životy ze štítu a poté z životů.

Zraněný nepřítel poté zautočí na nás a odebere nám štít či životy - použijte funkci a nekopírujte kód.

Poté naimplementujte funkci v podmínce cyklu - funkce bude vracet `TRUE`, pokud je hrdina naživu a zároveň je naživu alespoň jeden nepřítel.

Hru můžete dále vylepšit o:
- critical damage 4%
  - pokud vygenerujeme číslo z rozsahu 0-99 a hodnota bude menší než např. 4, tak zaútočíme dvojnásobným poškozením
- degradace zbraní
  - po každém útoku se poškožení zbraně zmenší o 5%
- inventář zbraně hrdiny
  - hrdina bude mít několik zbraní
  - po každém útoku si hrdina vymění zbraň za následující v inventáři
    - realizujte to posunováním zbraní v intenvařáří
      - zazálohujeme si nultý prvek v poli do proměnné
      - první prvek nakopírujeme do nultého prvku
      - druhý prvek nakopírujeme do prvního prvku atd
      - následně na poslední index uložíme hodnotu zazálohovanou v proměnné
    - alternativně si pamatujte index aktuální zbraně a ten inkrementujte
      - pokud bude index vetší nebo roven počtu prvků, tak jej vrátime opět na začátek
      - můžeme elegantně také využít operátor zbytku po dělení
- prohazování zbraní dvou nepřátel
- náhodné uzdravování a postupná regenerace štítu

[Rámečky](https://en.wikipedia.org/wiki/Box-drawing_character) můžeme kreslit pomocí Unicode znaků - stačí je jenom zkopírovat a vložit do `printf`.

Barvy v terminálu můžeme měnit pomocí escape sekvencí:
```c
#define RESET "\x1B[0m"
#define RED "\x1B[31m"
#define GREEN "\x1B[32m"
#define YELLOW "\x1B[33m"
#define BLUE "\x1B[34m"
#define MAGENTA "\x1B[35m"
#define CYAN "\x1B[36m"
#define WHITE "\x1B[37m"
...
printf(RED "%d" RESET, hp_left); 
```
Preprocesor poté spojí řetězce do jednoho.

Návrh hry také můžete později vylepšit pomocí [struktury](/c/struktury/vlastni_datove_typy.md) `Player`, která by obsahovala životy, štít a zbraně jednoho hráče.


<asciinema-player src="pvp.cast"></asciinema-player>
