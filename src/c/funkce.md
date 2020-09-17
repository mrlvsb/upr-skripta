# Funkce
Zatím jsme veškerý kód psali pouze na jedno místo v programu, do "mejnu". Jakmile programy začnou
být větší a větší, tak začne také být neustále těžší a těžší se v nich zorientovat a udržet je celé
v hlavě, abychom nad nimi mohli přemýšlet. Zároveň se nám v programu brzy začnou objevovat úseky kódu,
které jsou téměř totožné, ale liší se v drobných detailech. Chtěli bychom tak mít možnost takovýto
kód napsat pouze jednou a tyto měnící se detaily do něj pouze "dosadit". K rozdělení kódu programu
do sady ucelených částí a jejich parametrizaci slouží **funkce** (*functions*).

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
[pojmenovávání proměnných](promenne_pojmenovavani.md).

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

[^2]: Stejně jako u [cyklů](while.md) se bloku kódu funkce často říká **tělo funkce** (*function body*).

Zavolání funkce je výraz, při jehož vyhodnocení dojde k provedení kódu funkce, která se volá.
Když se v programu nahoře ve funkci `main` vykoná řádek `vypis_text();`, tak se začne vykonávat kód
funkce `vypis_text`. Jakmile se příkazy z této funkce vykonají, tak program bude pokračovat ve funkci
`main`.

Pomocí volání funkcí můžeme mít kus kódu v programu zapsán pouze jednou ve funkci, a poté ho
můžeme spouštět z různých částí programu, podle toho, kdy se nám to zrovna bude hodit.

### Parametrizace funkcí
Funkcím lze dávat vstupy zvané **parametry** (*parameters*). Parametry jsou proměnné uvnitř funkce,
jejichž hodnotu nastavujeme při zavolání dané funkce. Například následující funkce `vypis_cislo` má
parametr `cislo` s datovým typem `int`.
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
datového typu `int`: `vypis_cislo(5)`. Před spuštěním příkazů ve funkci dojde k tomu, že hodnota každého
parametru se nastaví na hodnotu předanou ve volání funkce[^3]. Při zavolání `vypis_cislo(5)` si tak můžete
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

Parametrů mohou funkce brát libovolný počet, nicméně obvykle se používá maximálně cca 5
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

**Cvičení**: Zkuste naprogramovat funkci `vypis_ctverec`.

### Návratová hodnota funkcí
Nejenom, že funkce můžou přijímat vstup, ale umí také vracet výstup. Datový typ uvedený před názvem
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
a poté ji vrátí. Toho můžeme dosáhnout pomocí příkazu `return <výraz>;`. Při provedení tohoto výrazu
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
> `return`! Pokud k tomu nedojde, tak program může začít vykazovat [nedefinované chování](promenne.md#vždy-inicializujte-proměnné)
> a může se tak chovat nepředvídatelně. Například následující funkce je špatně, protože pokud hodnota
> parametru `cislo` bude nezáporná, tak se ve funkci neprovede příkaz `return`:
> ```c
> int absolutni_hodnota(int cislo) {
>     if (cislo < 0) {
>       return -cislo;
>     }
> }
> ```

Pokud má funkce návratový typ `void`, tak její provádění můžete ukončit pomocí příkazu `return;`
(zde nepředáváte žádný výraz, protože funkce nic nevrací).

### Syntaxe
Syntaxe funkcí v *C* vypadá takto:
```c
<datový typ> <název funkce>(<dat. typ par. 1> <název par. 1>, <dat. typ par. 2> <název par. 2>, ...) {
    // blok kódu
} 
```
Datovému typu, názvu funkce a jejím parametrům se dohromady říká **signature** (*signature*) funkce.
Tato informace je důležitá, abychom věděli, jak s danou funkcí pracovat (jak ji volat), k tomu není
nutné znát obsah těla funkce.

### Výhody funkcí
Zde je pro zopakování uveden přehled výhod používání funkcí:
- Znovupoužitelnost kódu: pokud chcete stejný kód použít na více místech programu, nemusíte ho
"copy-pastovat". Stačí ho vložit do funkce a tu poté zavolat.
- Parametrizace kódu: pokud chcete spouštět stejný kód nad různými vstupními hodnotami, stačí udělat
funkci, která dané hodnoty přijme jako parametry (a případně vrátí výsledek výpočtu jako svou
návratovou hodnotu).
- Abstrakce: když rozdělíte logiku programu do sady funkcí, tak si značně usnadníte přemýšlení nad
celým programem. Jednotlivé funkce budete moct testovat a přemýšlet nad nimi separátně, nezávisle na
zbytku programu. Pomocí používání funkcí také bude mnohem přehlednější čtení programu, protože bude
stačit číst, co se provádí (která funkce se volá) a ne jak se to provádí (jaké příkazy jsou v těle
funkce). Takovýhle kód pak lze číst téměř jako větu v přirozeném jazyce:
    ```c
    int health = get_player_health(player_id);
    health = health - calculate_enemy_damage(enemy_id);
    set_player_health(player_id, health);
    ```
- Sdílení kódu: pokud budete chtít použít kód, který napsal někdo jiný, tak toho dosáhnete právě
používáním funkcí, které vám někdo [připraví](knihovny.md).

<!-- <upr-svgs src="../animations/stack/stack-" to="15"></upr-svgs> -->
