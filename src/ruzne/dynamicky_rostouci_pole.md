# Dynamicky rostoucí pole
V kapitolách o [statických](../c/pole/staticka_pole.md) a [dynamických](../c/pole/dynamicka_pole.md)
polích jsme si ukázali, jak můžeme vytvořit paměť pro více proměnných uložených sekvenčně za sebou
v paměti. Tato pole však měla vždy jedno omezení, protože jejich velikost se po jejich vytvoření nedala
měnit. Jakmile však naše programy začnou být složitější, budeme si určitě chtít pamatovat více hodnot
bez toho, abychom museli nutně dopředu vědět, kolik těchto hodnot bude. Například:

- Čteme řádky z textového souboru, a nevíme dopředu, kolik těch řádků bude.
- Chceme projít existující pole a vytáhnout z něj pouze ty prvky, které splňují nějakou vlastnost.
- Uživatel v naší [SDL](../c/aplikovane_ulohy/sdl.md) aplikaci kliká na obrazovku a my chceme na každém
bodu kliknutí něco vykreslit.

Proto je vhodné naučit se vytvořit pole, které můžeme postupně naplňovat, a jehož velikost se může
v čase zvětšovat. Takovému poli budeme říkat **dynamicky rostoucí pole** (dále pouze *rostoucí pole*).
Tato datová struktura je tak užitečná a často využívaná, že se ve spoustě programovacích jazycích
vyskytuje jako vestavěný stavební blok[^1].

[^1]: C++: [std::vector](https://en.cppreference.com/w/cpp/container/vector), Java: [ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html), C#: [List](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1), JavaScript: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

## Implementace
Rostoucí pole bude muset být naalokované na haldě, protože na zásobníku bychom nebyli
schopni jeho velikost měnit, a museli bychom ji znát v době překladu, což by nám nepomohlo. Rostoucí
pole bude fungovat zhruba takto:

1) Naalokujeme na haldě dynamické pole s nějakou počáteční velikostí.
   - Pole bude na začátku "prázdné", tj. nebudou v něm uloženy žádné validní hodnoty, ale bude
   obsahovat dostatečnou kapacitu na uložení nějakého počtu hodnot.
2) Budeme do něj postupně přidávat prvky.
3) Jakmile bude pole zcela zaplněné, tak jej zvětšíme, abychom udělali místo pro další prvky.

Zde je ukázka struktury, která bude implementovat rostoucí pole celých čísel (`int`ů):

```c
typedef struct {
    int* data;
    int pocet;
    int kapacita;
} PoleIntu;
```

Pro implementaci budeme potřebovat minimálně tyto tři údaje:
- `data` - ukazatel na data na haldě, která budou naalokovaná funkcí [`malloc`](https://devdocs.io/c/memory/malloc).
- `pocet` - současný počet prvků v poli. Při práci s jakýmkoliv polem potřebujeme vždy vědět, kolik
prvků v něm je. Abychom si tuto informaci nemuseli pamatovat někde bokem, dáme ji přímo do struktury
rostoucího pole.
- `kapacita` - maximální počet prvků, které pole může obsahovat. Tato hodnota odpovídá tomu, pro kolik
prvků jsme vyalokovali paměť funkcí `malloc`.

Nyní si ukážeme jak naimplementovat funkce, které budou s tímto polem pracovat.

### Vytvoření pole
Pro vytvoření pole potřebujeme naalokovat paměť na haldě s nějakou úvodní `kapacitou`, kterou si můžeme
do funkce na vytvoření pole poslat jako argument:

```c
void poleintu_vytvor(PoleIntu* pole, int kapacita) {
    // Naalokujeme pamet na halde
    pole->data = (int*) malloc(sizeof(int) * kapacita);
    // Na zacatku je pole prazdne, takze je pocet prvku 0
    pole->pocet = 0;
    // Kapacita odpovida tomu, kolik je pole schopne udrzet prvku, nez mu dojde misto
    pole->kapacita = kapacita;
}
```

### Přidání prvku do pole
Při přidávání prvku do pole musíme daný prvek zapsat na první "volné" místo v poli. Na jaký index
musíme prvek zapsat?

- Když je pole prázdné (`pocet = 0`), tak zapíšeme nový prvek na index `0`:
  ```
  [?, ?, ?, ?]
   ^
  ```
- Když má pole jeden prvek (`pocet = 1`), tak zapíšeme nový prvek na index `1`:
  ```
  [8, ?, ?, ?]
      ^
  ```
- Když má pole dva prvky (`pocet = 2`), tak zapíšeme nový prvek na index `2`:
  ```
  [8, 4, ?, ?]
         ^
  ```

Počet prvků v poli tedy vždy přímo odpovídá indexu, na který bychom měli zapsat příští prvek.

Dejme tomu, že máme pole s kapacitou `4`, s dvěma prvky (`pocet` je `2`) a chceme do něj uložit
novou hodnotu `8`. Tuto hodnotu musíme zapsat na index `2`. A po zápisu prvku musíme také zvýšit
počet prvků v poli, protože jsme do pole vložili nový prvek!

```
[5, 4, ?, ?]
       ^
       (pocet = 2)

[5, 4, 8, ?]
          ^
          (pocet = 3)
```

V kódu by to mohlo vypadat takto:
```c
void poleintu_pridej(PoleIntu* pole, int hodnota) {
    // Zapiseme novy prvek na index dany soucasnemu poctu prvku
    pole->data[pole->pocet] = hodnota;
    // Zvysime pocet prvku o jednicku
    pole->pocet += 1;
}
```

### Zvětšení velikosti pole
Nicméně to samo o sobě nestačí. Co když je totiž pole už plné? V tom případě nesmíme zapsat hodnotu
do paměti na indexu `pocet`, protože bychom zapsali data mimo validní paměť a došlo by tak k
[paměťové chybě](../caste_chyby/pametove_chyby.md#segmentation-fault) 💣!

Pokud tedy dojde k situaci, že už je naše pole plné, tak jej nejprve musíme zvětšit. To můžeme udělat
následujícím postupem:

1) Naalokujeme nové, větší pole na haldě.
    - Jakou velikost (kapacitu) zvolit pro nové pole? Pokud bychom zvyšovali velikost o `1`, tak budeme
    muset pole zvětšovat při přidání každého prvku, což by bylo velmi neefektivní. Obvykle se kapacita
   rostoucích polí zdvojnásobí, díky čehož bude velikost růst exponenciálně a my tak nebudeme muset
   často velikost zvětšovat.
2) Překopírujeme původní data ze starého pole do nového pole.
3) Uvolníme paměť starého pole.
4) Nastavíme ukazatel (`data`) na nové pole na haldě.

V kódu by to mohlo vypadat např. takto:
```c
// Pokud je pole plne
if (pole->pocet == pole->kapacita) {
    // Zdvojnasobime kapacitu
    pole->kapacita = pole->kapacita * 2;
    // Naalokujeme nove pole s dvojnasobnou kapacitou
    int* nove_pole = (int*) malloc(sizeof(int) * pole->kapacita);
    // Prekopirujeme hodnoty ze stareho pole do noveho
    for (int i = 0; i < pole->pocet; i++) {
        nove_pole[i] = pole->data[i];
    }
    // Uvolnime pamet stareho pole
    free(pole->data);
    // Nastavime ukazatel na nove pole
    pole->data = nove_pole;
}
```
Jelikož je tato funkcionalita v jazyce *C* relativně často používaná, standardní knihovna *C* obsahuje
funkci [`realloc`](https://devdocs.io/c/memory/realloc), která toto zvětšení pole umí udělat za nás.
Kód výše tak lze zjednodušit:
```c
if (pole->pocet == pole->kapacita) {
    pole->kapacita = pole->kapacita * 2;
    pole->data = (int*) realloc(pole->data, sizeof(int) * pole->kapacita);
}
```

Kompletní kód funkce na přidání prvku do rostoucího pole naleznete níže. 

### Smazání pole
Nesmíme samozřejmě zapomenout ani na to po sobě uklidit. Po skončení práce s polem bychom tedy měli
jeho paměť smazat:
```c
void poleintu_smaz(PoleIntu* pole) {
    free(pole->data);
}
```

Celý kód dynamicky rostoucího pole `int`ů můžete naleznout zde:

<details>
<summary>Dynamicky rostoucí pole intů</summary>

```c
typedef struct {
    // Ukazatel na data na haldě
    int* data;
    // Soucasny pocet prvku v poli
    int pocet;
    // Pocet prvku, ktery lze v poli maximalne mit.
    // Maximalni hodnota, ktere muze nabyvat `pocet`.
    int kapacita;
} PoleIntu;

void poleintu_vytvor(PoleIntu* pole, int kapacita) {
    // Naalokujeme pamet na halde
    pole->data = (int*) malloc(sizeof(int) * kapacita);
    // Na zacatku je pole prazdne, takze je pocet prvku 0
    pole->pocet = 0;
    // Kapacita odpovida tomu, kolik je pole schopne udrzet prvku, nez mu dojde misto
    pole->kapacita = kapacita;
}

void poleintu_pridej(PoleIntu* pole, int hodnota) {
    // Pokud je pole plne
    if (pole->pocet == pole->kapacita) {
        // Zdvojnasobime kapacitu
        pole->kapacita = pole->kapacita * 2;
        // Naalokujeme nove pole s dvojnasobnou kapacitou a nastavime ukazatel na nove pole
        pole->data = (int*) realloc(pole->data, sizeof(int) * pole->kapacita);
    }

    // Zapiseme novy prvek na index dany soucasnemu poctu prvku
    pole->data[pole->pocet] = hodnota;
    // Zvysime pocet prvku o jednicku
    pole->pocet += 1;
}

void poleintu_smaz(PoleIntu* pole) {
    // Smazeme dynamicke pole
    free(pole->data);
}
```

</details>

## Zobecnění pro více datových typů
Výše popsané pole je velmi užitečné, nicméně můžeme jej použít pouze s jedním datovým typem (`int`).
V našich programech si určitě budeme chtít ukládat do rostoucího pole více datových typů. Jak toho
můžeme dosáhnout?

### Separátní kód pro každý datový typ
Asi nejjednodušší způsob je prostě vzít kód tohoto pole a zkopírovat jej pro každý datový typ, který
budeme chtít do pole ukládat. Takže nám vzniknou struktury `PoleIntu`, `PoleCharu`, `PoleBoolu` atd.

I když je tento způsob relativně jednoduchý na provedení (`Ctrl + C`, `Ctrl + V` a přejmenování názvů),
tak asi tušíte, že má řadu nevýhod. V našem programu by vznikla spousta kódu, který by byl silně
zduplikovaný a pokud bychom narazili na nějakou chybu, tak bychom ji museli opravit na více místech.
Tento opakující se kód by také pravděpodobně byl dost nepřehledný.

Můžeme si trochu pomoct využitím [maker](../c/preprocesor/makra.md):
```c
#define VYTVOR_LIST(nazev, typ)\
typedef struct {\
   typ* data;\
   int pocet;\
   int kapacita;\
} nazev;

VYTVOR_LIST(PoleIntu, int)
VYTVOR_LIST(PoleFloatu, float)
```
Nicméně to má také své nevýhody (upravovat kód makra je relativně namáhavé) a pořád budeme mít separátní
datovou strukturu pro každý datový typ.

### Pole ukazatelů
Pokud se zamyslíme nad tím, proč nemůžeme použít `PoleIntu` pro libovolný datový typ, je to způsobeno
tím, že každý prvek v tomto poli má fixní velikost (`sizeof(int)`, tedy pravděpodobně `4` byty). Do
tohoto pole tedy nemůžeme jednoduše ukládat prvky, které mají jinou velikost, což je problém.

Abychom tento problém obešli, můžeme vytvořit pole, jehož prvky budou mít také fixní velikost, ale
zároveň budou schopny poskytovat přístup k libovolné hodnotě libovolného datového typu. Toho můžeme
dosáhnout tak, že do pole nebudeme ukládat přímo hodnoty, které si chceme zapamatovat, ale pouze jejich
adresy. Vytvoříme tedy pole ukazatelů! Jelikož nevíme, s jakým datovým typem bude chtít uživatel toto
pole použít, tak nezvolíme pro typ ukazatele `int*` nebo např. `float*`, ale použijeme datový typ
"obecného" ukazatele, který prostě obsahuje adresu, ale neříká, co na dané adrese leží. Tím je typ
`void*`.

Strukturu pole bychom tedy mohli upravit takto:
```c
typedef struct {
    void** data;
    int pocet;
    int kapacita;
} RostouciPole;
```
Předtím jsme uchovávali ukazatel, v němž byla adresa, na které ležel datový typ `int`, proto byl typ
atributu `data` `int*`. Nyní uchováváme ukazatel, v němž bude adrese, na které bude ležet datový typ
`void*`, proto bude typ atributu `data` `void**`.

V paměti bude tedy pole vypadat cca takto:
```
// Predtim
[5, 8, 6, 4]

// Ted
 5
 ^   6
 |   ^
[|,|,|,|]
   |   |
   |   v
   |   4
   |
   ╰-> 8
```

Každý prvek pole bude mít fixní velikost (`sizeof(void*)`, tedy pravděpodobně `8` bytů), a bude obsahovat
pouze adresu nějakého prvku (libovolného datového typu).

Když si tedy pole pamatuje adresy, odkud je vzít? Pokud bychom do pole dávali adresy např. lokálních
proměnných, tak pravděpodobně brzy narazíme na problémy:
```c
RostouciPole pole;
pole_vytvor(&pole, 10);
for (int i = 0; i < 10; i++) {
    // Vloz do pole adresu promenne i
    pole_pridej(&pole, &i);
}
```

1) Lokální proměnná může zaniknout dříve, než pole. V ten moment bude adresa v poli neplatná a dojde
k nedefinovanému chování 💣.
2) V případě výše si ukládáme do pole adresu té stejné proměnné, takže všechny prvky v poli budou mít
stejnou hodnotu.
3) I pokud lokální proměnná bude existovat dostatečně dlouho, a budeme do pole ukládat adresy různých
proměnných, tak pořád budeme mít problém v tom, že si budeme muset tuto proměnnou ukládat "někde bokem",
protože v poli bude pouze její adresa. Tím nevyřešíme náš původní problém s pole rostoucí velikosti,
pouze jej přesuneme jinam.

Z toho důvodu se nám vyplatí ukládat do pole takové adresy, jejichž životnost bude neomezená, a nebudeme
se tak muset starat o to, jestli náhodou nejsou dealokovány moc brzy. Jinak řečeno, můžeme do pole
ukládat paměť alokovanou na [haldě](../c/prace_s_pameti/dynamicka_pamet.md).

Takovéto pole by pak šlo používat např. takto:
```c
RostouciPole pole;
pole_vytvor(&pole, 10);

for (int i = 0; i < 10; i++) {
    int* pamet = malloc(sizeof(int));
    *pamet = i + 1;
    pole_pridej(&pole, pamet);
}

for (int i = 0; i < 10; i++) {
    int* pamet = (int*) pole->data[i];
    printf("Prvek cislo %d: %d\n", i, *pamet);
}

pole_smaz(pole);
```

Při mazání pole bychom neměli zapomenout na uvolnění všech adres, které jsou v něm uloženy:
```c
void pole_smaz(RostouciPole* pole) {
    for (int i = 0; i < pole->pocet; i++) {
        free(pole->data[i]);
    }
    free(pole->data);
}
```

> V současné podobě lze funkci `pole_vloz` špatně použít. Pokud do ní dáme adresu, která nepochází
> z funkce `malloc`, tak dojde k nedefinovanému chování při mazání pole. Zkuste navrhnout jinou verzi
> funkce `pole_vloz`, která nepůjde použít špatně, a která zajistí, že paměť bude vždy vytvořena na
> haldě. Můžete (musíte!) pro to změnit signaturu funkce.

#### Typová kontrola
U obecného rostoucího pole je třeba dávat si velký pozor na to, že do něj budeme vkládat a poté z něj
vybírat stejné datové typy! Tím, že používáme typ `void*`, tak nás překladač nebude upozorňovat na
práci s nekompatibilními datovými typy. Pokud do pole nejprve vložíte adresu `int`u, a poté se k této
adrese budete chovat, jako by to byla adresa např. `float`u (`float*`), tak se váš program nebude
chovat správně!

Celý kód dynamicky rostoucího pole `int`ů můžete naleznout zde:

<details>
<summary>Dynamicky rostoucí pole adres</summary>

```c
typedef struct {
    // Ukazatel na data na haldě
    void** data;
    // Soucasny pocet prvku v poli
    int pocet;
    // Pocet prvku, ktery lze v poli maximalne mit.
    // Maximalni hodnota, ktere muze nabyvat `pocet`.
    int kapacita;
} RostouciPole;

void pole_vytvor(RostouciPole* pole, int kapacita) {
    // Naalokujeme pamet na halde
    pole->data = (void**) malloc(sizeof(void*) * kapacita);
    // Na zacatku je pole prazdne, takze je pocet prvku 0
    pole->pocet = 0;
    // Kapacita odpovida tomu, kolik je pole schopne udrzet prvku, nez mu dojde misto
    pole->kapacita = kapacita;
}

void pole_pridej(RostouciPole* pole, void* adresa) {
    // Pokud je pole plne
    if (pole->pocet == pole->kapacita) {
        // Zdvojnasobime kapacitu
        pole->kapacita = pole->kapacita * 2;
        // Naalokujeme nove pole s dvojnasobnou kapacitou a nastavime ukazatel na nove pole
        pole->data = (void**) realloc(pole->data, sizeof(void*) * pole->kapacita);
    }

    // Zapiseme novy prvek na index dany soucasnemu poctu prvku
    pole->data[pole->pocet] = adresa;
    // Zvysime pocet prvku o jednicku
    pole->pocet += 1;
}

void pole_smaz(RostouciPole* pole) {
    for (int i = 0; i < pole->pocet; i++) {
        free(pole->data[i]);
    }
    free(pole->data);
}
```

</details>

### Pole bytů
Pole ukazatelů je relativně jednoduché na použití, ale má také nevýhody, hlavně co se týče plýtvání
pamětí, protože musíme všechny hodnoty alokovat na haldě, a také s tím související neefektivitou.

Rostoucí pole můžeme navrhnout ještě jinak, pokud se k němu budeme chovat v podstatě jako k poli bytů,
do kterých budeme byte po bytu kopírovat hodnoty, které v něm chceme ukládat. V této variantě bychom
si ve struktuře ukládali pole bytů (znaků), a také velikost datového typu, který chceme do pole ukládat.

```c
typedef struct {
    // Pole bytů/znaků
    char* data;
    // Velikost datového typu
    int velikost_prvku;
    int pocet;
    int kapacita;
} RostouciPole;
```

Při vkládání nového prvku pak stačí jeho byty nakopírovat do našeho pole, a při získávání prvku zase
byty zpět vykopírovat na adresu, kterou poskytne uživatel:
```c
void pole_pridej(RostouciPole* pole, void* adresa) {
    if (pole->pocet == pole->kapacita) { /* zvetseni pole */ }

    // Vypocteme cilovou adresu, která bude na "indexu" `pocet` * `velikost_prvku`
    void* cil = pole->data + (pole->pocet * pole->velikost_prvku);
    // Zapiseme na danou adresu vsechny byty nasi vkladane hodnoty
    memcpy(cil, adresa, pole->velikost_prvku);
}

void pole_vrat(RostouciPole* pole, int index, void* adresa) {
    // Vypocteme cilovou adresu, která bude na "indexu" `index` * `velikost_prvku`
    void* zdroj = pole->data + (indexu * pole->velikost_prvku);
    // Zapiseme na predanou adresu vsechny byty nasi ziskavane hodnoty
    memcpy(adresa, zdroj, pole->velikost_prvku);
}
```

Aby toto řešení bylo plně korektní, museli bychom implementaci ještě rozšířit tak, aby brala v potaz
[zarovnání](../c/struktury/pametova_reprezentace.md#zarovnání) daného datového typu, jinak by se mohlo
stát, že bude vložená hodnota v poli ležet na nezarovnané adrese.
