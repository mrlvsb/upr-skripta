# Funkce
Zatím jsme veškerý kód psali pouze na jedno místo v programu, do ["mainu"](../../ruzne/funkce_main.md).
Jakmile programy začnou být větší a větší, tak začne také být neustále těžší a těžší se v nich zorientovat
a udržet je celé v hlavě, abychom nad nimi mohli přemýšlet. Zároveň se nám v programu brzy začnou
objevovat úseky kódu, které jsou téměř totožné, ale liší se v drobných detailech. Chtěli bychom tak
mít možnost takovýto kód napsat pouze jednou a tyto měnící se detaily do něj pouze "dosadit".
K rozdělení kódu programu do sady ucelených částí a jejich parametrizaci slouží **funkce** (*functions*).

Funkce je pojmenovaný blok kódu, na který se můžeme odkázat v jiné části programu a vykonat tak
kód, který se ve funkci nachází. S jednou funkcí už jsme se setkali. Jedná se o funkci `main`, jejíž
kód je proveden při spuštění programu. My si nicméně můžeme vytvořit vlastní funkce. Zde je
příklad vytvoření, tj. **definice** (*definition*) jednoduché funkce s názvem[^1] `vypis_text`:
```c
void vypis_text() {
    printf("Ahoj\n");
}
```

[^1]: Pravidla pro pojmenovávání funkcí jsou totožná s pravidly pro
[pojmenovávání proměnných](../promenne/pojmenovavani.md).

Před názvem funkce je nutné uvést datový typ (zde je uveden typ `void`). [Níže](#návratová-hodnota-funkcí)
bude vysvětleno, k čemu tento typ slouží.

Tento blok[^2] kódu se přeloží na instrukce a bude existovat v přeloženém programu stejně jako funkce
`main`, nicméně sám o sobě se nezačne provádět. Abychom kód této funkce provedli, musíme ji tzv.
**zavolat** (*call*). To provedeme tak, že napíšeme název této funkce a za něj dáme
závorky (`()`):
```c,editable,mainbody
#include <stdio.h>

void vypis_text() {
    printf("Ahoj\n");
}
int main() {
    vypis_text(); // zavolání funkce vypis_text
    return 0;
}
```

[^2]: Stejně jako u [cyklů](../rizeni_toku/while.md) se bloku kódu funkce často říká **tělo funkce** (*function body*).

Zavolání funkce je výraz, při jehož vyhodnocení dojde k provedení kódu funkce, která se volá.
Když se v programu nahoře ve funkci `main` vykoná řádek `vypis_text();`, tak se začne vykonávat kód
funkce `vypis_text`. Jakmile se příkazy z této funkce vykonají, tak program bude pokračovat ve funkci
`main`.

Pomocí volání funkcí můžeme mít kus kódu v programu zapsán pouze jednou ve funkci, a poté ho
můžeme spouštět z různých částí programu, podle toho, kdy se nám to zrovna bude hodit.

> Funkce `main` je zavolána při spuštění programu, čímž dojde k tomu, že se začnou vykonávat její
> příkazy.

## Parametrizace funkcí
Funkcím můžeme přiřadit vstupy zvané **parametry** (*parameters*). Parametry jsou proměnné dostupné
uvnitř funkce, jejichž hodnotu nastavujeme při zavolání dané funkce. Například následující funkce
`vypis_cislo` má parametr `cislo` s datovým typem `int`.
```c,editable
#include <stdio.h>

void vypis_cislo(int cislo) {
    printf("Cislo: %d\n", cislo);
}
int main() {
    vypis_cislo(5);
    return 0;
}
```
Při zavolání funkce musíme pro každý její parametr do závorek dát hodnotu odpovídajícího datového typu.
Zde je jediný parameter typu `int`, takže při zavolání této funkce musíme do závorek dát jednu hodnotu
datového typu `int`: `vypis_cislo(5)`. Před spuštěním příkazů ve funkci dojde k tomu, že se každý
parametr nastaví na hodnotu předanou při volání funkce[^3]. Při zavolání `vypis_cislo(5)` si tak můžete
představit, že se vykoná následující kód:
```c
{
    // nastavení hodnot parametrů
    int cislo = 5;

    // tělo funkce
    printf("Cislo: %d\n", cislo); 
}
```

[^3]: Hodnoty (výrazy) předávané při volání funkce se nazývají **argumenty** (*arguments*). Při
volání `vypis_cislo(5)` se tedy do parametru `cislo` nastaví hodnota argumentu `5`.

Je důležité si uvědomit, že při každém zavolání funkce můžeme použít různé hodnoty argumentů:

```c,editable
#include <stdio.h>

void vypis_cislo(int cislo) {
    printf("Cislo: %d\n", cislo);
    if (cislo < 0) {
        printf("Predane cislo je zaporne\n");
    } else {
        printf("Predane cislo je nezaporne\n");
    }
}
int main() {
    vypis_cislo(5);
    vypis_cislo(1 + 8);

    int x = -10;
    vypis_cislo(x);

    return 0;
}
```

Parametrů mohou funkce brát libovolný počet, nicméně obvykle se používají jednotky (maximálně cca 5)
parametrů, aby funkce a její používání (volání) nebylo příliš složité. Jednotlivé parametry jsou
odděleny v definici funkce i v jejím volání čárkami:
```c,editable
#include <stdio.h>

void vypis_cisla(int a, int b) {
    printf("Cislo a: %d\n", a);
    printf("Cislo b: %d\n", b);
}
int main() {
    vypis_cisla(5 + 5, 11 * 2);
    return 0;
}
```

Pomocí parametrů můžeme vytvořit kód, který není "zadrátovaný" na konkrétní hodnoty, ale umí pracovat
s libovolnou hodnotou vstupu. Díky toho lze takovou funkci využít v různých situacích bez toho, abychom
její kód museli kopírovat. Příklady použití parametrů funkcí:
- Funkci `vypis_ctverec`, která přijme jako parametr číslo `n` a vypíše na výstup čtverec tvořený
znaky `x` o straně `n`.
- Funkci `vykresli_pixel`, která přijme jako parametry souřadnici na obrazovce a barvu a vykreslí
na obrazovce na dané pozici pixel s odpovídající barvou.

<hr />

**Cvičení** 🏋

Zkuste naprogramovat funkci `vypis_ctverec`. Další zadání jednoduchých funkcí naleznete
[zde](../../ulohy/zaklady.md#fibonacciho-číslo).

<hr />

## Návratová hodnota funkcí
Nejenom, že funkce mohou přijímat vstup, ale umí také vracet výstup. Datový typ uvedený před názvem
funkce udává, jakého typu bude tzv. **návratová hodnota** (*return value*) dané funkce. V příkladech
výše jsme viděli datový typ `void`. Tento datový typ je speciální, protože říká, že funkce nebude
vracet *nic*. Pokud funkce má návratový typ `void`, tak nevrací žádnou hodnotu - pokud zavoláme
takovouto funkci, tak se sice provede její kód, ale výraz zavolání nevrátí žádnou hodnotu:
```c,editable
void funkce() {}

int main() {
    // chyba při překladu, funkce nic nevrací
    int x = funkce();
    return 0;
}
```

Často bychom nicméně chtěli funkci, která přijme nějaké hodnoty (parametry), vypočte nějakou hodnotu
a poté ji vrátí. Toho můžeme dosáhnout tak, že funkci dáme návratový typ jiný než `void` a poté
ve funkci použijeme příkaz `return <výraz>;`. Při provedení tohoto výrazu
se přestane funkce vykonávat a její volání se vyhodnotí hodnotou předaného výrazu. Zde je příklad
funkce, která bere jako vstup jedno číslo a spočítá jeho třetí mocninu:
 ```c,editable
#include <stdio.h>

int treti_mocnina(int cislo) {
    return cislo * cislo * cislo;
}
int main() {
    printf("%d\n", treti_mocnina(5 + 1));
    return 0;
}
```

> Jak probíhá vyhodnocování funkcí si můžete procvičit [zde](../../ruzne/vyhodnocovani_vyrazu.md).

Příkazů `return` může být ve funkci více:
```c
int absolutni_hodnota(int cislo) {
    if (cislo >= 0) {
        return cislo;
    }
    return -cislo;
}
```
Nicméně je důležité si uvědomit, že po provedení příkazu `return` už funkce dále nebude pokračovat:
```c
int zvetsi(int cislo) {
    return cislo + 1;
    printf("Provadi se funkce zvetsi\n"); // tento řádek se nikdy neprovede
}
```

> Pokud má funkce jakýkoliv jiný návratový typ než `void`, tak v ní musí být vždy proveden příkaz
> `return`! Pokud k tomu nedojde, tak program může začít vykazovat [nedefinované chování](../promenne/promenne.md#vždy-inicializujte-proměnné)
> 💣 a může se tak chovat nepředvídatelně. Například následující funkce je špatně, protože pokud hodnota
> parametru `cislo` bude nezáporná, tak se ve funkci neprovede příkaz `return`:
> ```c
> int absolutni_hodnota(int cislo) {
>     if (cislo < 0) {
>       return -cislo;
>     }
> }
> ```

Pokud má funkce návratový typ `void`, tak její provádění můžeme ukončit pomocí příkazu `return;`
(zde nepředáváme žádný výraz, protože funkce nic nevrací).

## Syntaxe
Syntaxe funkcí v *C* vypadá takto:
```c
<datový typ> <název funkce>(<dat. typ par. 1> <název par. 1>, <dat. typ par. 2> <název par. 2>, …) {
    // blok kódu
} 
```
Datovému typu, názvu funkce a jejím parametrům se dohromady říká **signatura** (*signature*) funkce.
Abychom věděli, jak s danou funkcí pracovat (jak ji volat), tak nám stačí znát její signaturu,
nemusíme nutné znát obsah jejího těla.[^4]

[^4]: Tento fakt bude důležitý [později](../modularizace/pouzivani_kodu_z_jinych_souboru.md#deklarace-vs-definice).

## Výhody funkcí
Zde je pro zopakování uveden přehled výhod používání funkcí:
- **Znovupoužitelnost kódu** Pokud chcete stejný kód použít na více místech programu, nemusíte ho
"copy-pastovat". Stačí ho vložit do funkce a tu poté opakovaně volat.
- **Parametrizace kódu** Pokud chcete spouštět stejný kód s různými vstupními hodnotami, stačí udělat
funkci, která dané hodnoty přijme jako parametry (a případně vrátí výsledek výpočtu jako svou
návratovou hodnotu).
- **Abstrakce** Když rozdělíte logiku programu do sady funkcí, tak si značně usnadníte přemýšlení nad
celým programem. Jednotlivé funkce budete moct testovat a přemýšlet nad nimi separátně, nezávisle na
zbytku programu. Pomocí používání funkcí také bude mnohem přehlednější čtení programu, protože bude
stačit číst, co se provádí (která funkce se volá) a ne jak se to provádí (jaké příkazy jsou v těle
funkce). Takovýhle kód pak lze číst téměř jako větu v přirozeném jazyce:
    ```c
    int zivot = vrat_zivoty_hrace(id_hrace);
    zivot = zivot - vypocti_zraneni_prisery(id_prisery);
    nastav_zivoty_hrace(id_hrace, zivot);
    ```
- **Sdílení kódu** Pokud budete chtít použít kód, který napsal někdo jiný, tak toho můžete dosáhnout
právě používáním funkcí, které vám někdo [nasdílí](../modularizace/knihovny.md).

## Umístění funkcí
Funkce v *C* musíme psát vždy na nejvyšší úrovni souboru. V *C* tedy například není možné definovat
funkci uvnitř jiné funkce:
```c,editable,readonly
int main() {
    int test() { }
}
```

Důležité je ale také to, kam přesně funkci ve zdrojovém kódu umístíte. Abyste mohli nějakou funkci
zavolat, tak její definice se musí v kódu nacházet nad řádkem, kde funkci voláte. Tento kód tak nebude
fungovat:
```c
int main() {
    vypis_text();
    return 0;
}
void vypis_text() {
    // ...
}
```

Proč tomu tak je, a jak lze toto pravidlo obejít, si řekneme
[později](../modularizace/pouzivani_kodu_z_jinych_souboru.md#deklarace-vs-definice). 

## Proč název "funkce"?
Možná vás napadlo, že název funkce zní podobně jako [funkce](https://matematika.cz/co-je-to-funkce)
v matematice. Není to náhoda, funkce v programech se tak opravdu dají částečně chápat – berou nějaký
vstup (parametry) a vracejí výstup (návratovou hodnotu). Například následující matematickou funkci:

\\( f(x) = 2 * x \\)

můžeme v *C* naprogramovat takto:
```c
int f(int x) {
    return 2 * x;
}
```
Aby ale funkce v *C* splňovala požadavky matematické funkce, musí být splněno několik podmínek:
- Funkce nesmí mít žádné [vedlejší efekty](../prikazy_vyrazy.md#vedlejší-efekty). To znamená, že by
měla pouze provést výpočet na základě vstupních parametrů a vrátit vypočtenou hodnotu. Neměla by
číst ani modifikovat [globální proměnné](../promenne/globalni_promenne.md) nebo například pracovat
se soubory na disku či komunikovat po síti.
- Funkce musí mít návratový typ jiný než `void`, aby vracela nějakou hodnotu. Z toho také vyplývá,
že funkce s návratovým typem `void` by měla mít nějaké vedlejší efekty, jinak by totiž nemělo
smysl ji volat (protože nic nevrací).
- Pokud je funkce zavolána se stejnými hodnotami parametrů, musí vždy vrátit stejnou návratovou
hodnotu. Této vlastnosti se říká *idempotence*. Jelikož jsou počítače deterministické, tato
vlastnost by měla být triviálně splněna, pokud funkce neobsahuje žádné vedlejší efekty.

Funkce splňující tyto vlastnosti se nazývají *čisté* (*pure*). S takovýmito funkcemi je jednodušší
pracovat a přemýšlet nad tím, co dělají, protože si můžeme být jistí, že nemodifikují okolní stav
programu a pouze spočítají výsledek v závislosti na svých parametrech. Pokud to tedy jde, snažte se
funkce psát tímto stylem (samozřejmě ne vždy je to možné).

V předmětu
[Funkcionální programování](http://behalek.cs.vsb.cz/wiki/index.php/Functional_programming/cs)
budete pracovat s funkcionálními programovacími jazyky, ve kterých je právě většina funkcí čistých.

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    void zmen_cislo(int cislo) {
        cislo = 5;
    }

    int main() {
        int cislo = 8;
        zmen_cislo(cislo);
        printf("%d\n", cislo);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `8`. Při volání `zmen_cislo` se uvnitř této funkce vytvoří nová lokální proměnná
    pro parametr `cislo` a uloží se do ní hodnota z odpovídajícího předaného argumentu. Změna hodnoty
    tohoto parametru uvnitř `zmen_cislo` nijak neovlivní proměnnou `cislo` uvnitř funkce `main`.

    Můžete si to představit tak, že se při zavolání této funkce provedl cca takovýto kód:

    ```c
    {
      // nastavení parametru
      int cislo = 8;

      // kód funkce
      cislo = 5;
    }
    ```

    To, že se zde parametr jmenuje stejně jako proměnná, kterou předáváme jako argument, nemá žádný
    speciální význam. Funkci jsme mohli klidně zavolat např. takto: `zmen_cislo(1 + 9)`. Z toho je zřejmé,
    že změna hodnoty parametru nijak neovlivní předaný argument.

    > Mimochodem, tím, že `zmen_cislo` nic nevrací a nemá žádný vedlejší efekt, tak v podstatě ani nemá
    > žádný smysl. Je to pouze ukázka.
    </details>
2) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    void vytvor_promennou() {
        int x = 5;
    }

    int main() {
        vytvor_promennou();
        printf("%d\n", x);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program se nepřeloží, protože uvnitř funkce `main` neexistuje proměnná s názvem `x`.
    Lokální proměnné jsou dostupné pouze v rámci [bloku](../promenne/promenne.md#platnost), ve kterém
    byly nadefinovány. Proměnnou `x` tak lze použít pouze v kódu uvnitř funkce `vytvor_promennou`.
    </details>
3) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    void vypis_soucet(int x) {
        int soucet = x + b;
        printf("%d\n", soucet);
    }

    int main() {
        int a = 5;
        int b = 8;

        vypis_soucet(a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program se nepřeloží, protože uvnitř funkce `vypis_soucet` neexistuje proměnná s názvem
    `b`. Na řádku, kde funkci voláme, sice existuje proměnná `b` uvnitř funkce `main`, ale to s tím 
    nijak nesouvisí - co kdybychom `vypis_soucet` volali z nějakého jiného místa programu, kde
    by žádná proměnná `b` neexistovala? Funkce má přístup pouze ke svým lokálním proměnným a parametrům
    (případně také ještě ke [globálním](../promenne/globalni_promenne.md) proměnným). Pokud chceme
    nějakou hodnotu z jedné funkce použít v jiné funkci, musíme ji předat jako parametr:
    ```c
    void vypis_soucet(int x, int b) {
        int soucet = x + b;
        printf("%d\n", soucet);
    }
    
    int main() {
        int a = 5;
        int b = 8;

        vypis_soucet(a, b);

        return 0;
    }
    ```
    </details>
4) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    int vrat_cislo(int x) {
        return x;
    }

    int main() {
        int cislo = 5;
        vrat_cislo(cislo) = 8;
        printf("%d\n", cislo);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program se nepřeloží, protože se snažíme provést operaci přiřazení (`=`), ale na levé straně
    od rovnítka není místo v paměti (např. proměnná), do které bychom mohli hodnotu `8` zapsat.
    Volání funkce je výraz, který se vyhodnotí jako návratová hodnota, kterou tato funkce vrátí.
    Je to jako bychom napsali toto:
    ```c
    5 = 8;
    ```
    Což zřejmě nedává smysl, a proto se program nepřeloží.
    </details>
5) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    int umocni(int x) {
        return x * x;
    }

    int main() {
        int cislo = 5;
        umocni(cislo);
        printf("%d\n", cislo);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `5`. Volání funkce `umocni` sice vrátí hodnotu `25`, ale tato hodnota se okamžitě
    "zahodí", protože ji nikam neuložíme. Hodnota proměnné `cislo` se tak nezmění. Aby program vypsal
    `25`, tak bychom museli návratovou hodnotu z volání funkce uložit zpět do proměnné `cislo`:
    ```c
    cislo = umocni(cislo);
    ```
    </details>
6) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    void vypis_cislo(int x) {
        if (x < 0) {
            return;
        }
        printf("cislo = %d\n", x);
    }

    int main() {
        vypis_cislo(1);
        vypis_cislo(-1);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `cislo = 1`. Při volání `vypis_cislo(-1)` bude splněna podmínka uvnitř `vypis_cislo`,
    takže dojde k ukončení provádění funkce příkazem `return;` a nedojde tak k vypsání tohoto
    záporného čísla.
    </details>
7) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    int vypocet(int x) {
        if (x > 5) {
            return x + 1;
        }
        return x * 2;
    }

    int main() {
        int a = 6;
        int b = 4;
        int c = vypocet(vypocet(a) + vypocet(b));
        printf("%d\n", c);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `16`. Není zde žádná zrada :) Nejprve se vyhodnotí `vypocet(a)` na `7`, poté
    `vypocet(b)` na `8`, a poté se zavolá `vypocet(7 + 8)`, který se vyhodnotí na `16`. Vyhodnocování
    výrazů a volání funkcí si můžete procvičit [zde](../../ruzne/vyhodnocovani_vyrazu.md).
    </details>
