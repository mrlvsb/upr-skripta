# PvP fight game

<asciinema-player src="pvp.cast"></asciinema-player>

Vytvořte simulaci PvP bitevní hry dle vašich představ.
Hra bude simulována dle náhody v herních kolech dle následující kostry programu:
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

Životy nepřátel reprezentujme pomocí pole čísel a na začátku hry jim náhodně přiřaďme čísla z intervalu např. 150 - 400.
Hrdinovi životy vygenerujme obdobně - využijte tedy **funkci** pro vygenerovaní životů, ať zbytečně nekopírujeme kód.
Obdobně můžeme také vytvořit pole štítů a zbraní.
Konkrétního nepřítele můžeme vybrat pomocí několika strategií - každá může být naimplementovaná ve funkci přijímající pole životů/štítů/zbraní a počet nepřátel.
Funkce pak může vracet index vybraného hrdiny na kterého zaútočíme.
1. vybrat nepřítele náhodně
2. vybrat nepřítele s nejmenším počtem životů
3. vybrat nepřítele s nejmenším počtem životů a štítu
4. vybrat nepřítele s nejslabší zbraní

Po zaútočení ubereme nepříteli životy a zajistíme, aby nemohly být záporné - například pomocí ternárního výrazu.
Pokud má však štít, tak musíme mu nejprve ubrat životy ze štítu a poté z životů.

Zraněný nepřítel poté zaútočí na nás a odebere nám štít či životy - použijme funkci ať nekopírujeme kód.

Poté naimplementujeme funkci v podmínce cyklu - funkce bude vracet `TRUE`, pokud je hrdina naživu a zároveň je naživu alespoň jeden nepřítel.

Hru můžeme dále vylepšit o:
- critical damage 4%
  - pokud vygenerujeme číslo z rozsahu 0-99 a hodnota bude menší než např. 4, tak zaútočíme s dvojnásobným poškozením
- degradace zbraní
  - po každém útoku se poškozeni zbraně zmenší o 5%
- inventář zbraně hrdiny
  - hrdina bude mít několik zbraní
  - po každém útoku si hrdina vymění zbraň za následující v inventáři
    - realizujte to posunováním zbraní v inventáři
      - zazálohujeme si nultý prvek v poli do proměnné
      - první prvek nakopírujeme do nultého prvku
      - druhý prvek nakopírujeme do prvního prvku atd
      - následně na poslední index uložíme hodnotu zazálohovanou v proměnné
    - alternativně si pamatujte index aktuální zbraně a ten inkrementujeme
      - pokud bude index vetší nebo roven počtu prvků, tak jej vrátíme opět na začátek
      - můžeme elegantně také využít operátor zbytku po dělení - tím nám odpadne podmínka či ternární výraz
- prohazování zbraní dvou nepřátel po každém útoku
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

Návrh hry také můžete později vylepšit pomocí [struktury](../c/struktury/vlastni_datove_typy.md) `Player`, která by obsahovala životy, štít a zbraně jednoho hráče po kupě.
