# Vykonávání programů
Jak už víme, programy jsou [sekvence příkazů](../uvod/programovaci_jazyky.md) pro počítač, který je provádí
instrukci po instrukci (resp. řádek po řádku). Jakmile počítač vykoná jeden řádek vašeho programu, tak skočí
na řádek níže, dokud nedojde na konec programu. Aby počítač věděl, kterou instrukci má provést
jako první, tak mu musíme říct, kde má začít. K tomu přesně slouží funkce se speciálním názvem
`main`:
```c
int main() {
    // ZDE
    return 0;
}
```

Výše zmíněný program se po [překladu](../prostredi/preklad_programu.md) a spuštění začne vykonávat na prvním řádku
funkce `main`, a jakmile provede všechny řádky, tak program skončí. Tento program je
v podstatě prázdný, takže se pouze zapne a vypne. Prozatím budeme veškerý kód psát dovnitř funkce
`main`, mezi složené závorky (`{`, `}`) a před řádek `return 0;` (tedy na místo komentáře `ZDE`).
Později si vysvětlíme, jak tato funkce funguje, prozatím to berte tak, že v programu vždy musí funkce
`main` být, aby počítač věděl, odkud začít vykonávání kódu. 

# Příkazy
Programy v *C* se skládají z **příkazů** (*statements*). Příkaz říká počítači, co má provést, na
mnohem vyšší úrovni než [instrukce](../uvod/programovaci_jazyky.md) - jeden C příkaz může být přeložen
překladačem na desítky instrukcí pro procesor. Existuje mnoho různých typů příkazů, které naleznete
v následujících sekcích.

# Výrazy
Jak už vyplává z jeho názvu, nejpřirozenější a hlavní funkcí počítače je něco počítat. Jedním ze
základních konstrukcí jazyka *C* (i jiných programovacích jazyků) tak je možnost počítat různé hodnoty.
Něco, co se dá vypočítat (tak, aby výsledkem byla nějaká hodnota), se nazývá **výraz** (*expression*).
Příkladem asi nejjednoduššího výrazu je číslo, např. `5`. Takovýto výraz již není nutné dále vyhodnocovat,
jeho hodnota je prostě `5`.

V *C* můžeme s výrazy provádět různé operace pomocí **operátorů**. Můžeme například použít operátor `+`
s dvěma výrazy, čímž vznikne složitější výraz: `5 + 5`, který se v programu vyhodnotí na hodnotu `10`.

### Výpis výrazů
Abyste si ze začátku mohli jednoduše zobrazit hodnoty výrazů, tak si ukážeme kód, pomocí kterého
můžete vypsat text na výstup programu (do terminálu). K výpisu můžete použít příkaz
```c
printf("<text>");
```

Text, který vložíte mezi uvozovky (`"`) se vypíše na výstup programu[^2]:
```c,editable
#include <stdio.h>

int main() {
    printf("Hello world!\n");
    return 0;
}
```
Abyste `printf` mohli použít, musíte na začátek programu vložit řádek `#include <stdio.h>`.
Tento řádek i `printf` zatím berte jako "black box", později si vysvětlíme, jak přesně fungují.

[^2]: Tento kód můžete modifikovat i spustit přímo v prohlížeči. Stačí kliknout na ikonu
<i class="fa fa-play"></i> vpravo nahoře nebo stisknout `Ctrl+Enter`.

V zadaném textu můžete používat určité speciální znaky. Například sekvence znaků `\n` způsobí, že
na výstupu dojde k **odřádkování** (*newline*), po kterém se text začne vypisovat na dalším řádku:
```c,editable
#include <stdio.h>

int main() {
    printf("Prvni radek\nDruhy radek");
    return 0;
}
```

Abyste mohli tisknout hodnoty výrazů, můžete použít **zástupné znaky** (*placeholders*). Pokud chcete
vypsat *číselnou* hodnotu na výstup programu, stačí v textu použít zástupný znak `%d`, za uvozovky
přidat čárku a doplnit výraz na místo určené komentářem:
```c,editable
#include <stdio.h>

int main() {
    printf("Cislo: %d\n", /* Hodnota tohoto výrazu se vypíše na výstup */ 1);
    return 0;
}
```

Když chcete vypsat například výsledek vyhodnocení výrazu `10 + 5`, tak stačí napsat:
`printf("%d\n", 10 + 5);` a na výstup programu by se měl vypsat text `15`.

Pokud chcete vytisknout více hodnot, tak prostě řádek s `printf(...);` zkopírujte a na uvedené místo
vložte jiný výraz. Počítač provádí programy řádek po řádku, odshora dolů. Uhodnete, co se vypíše
na výstup po přeložení a spuštění následujícího programu?
```c,editable,readonly
#include <stdio.h>

int main() {
    printf("%d\n", 1);
    printf("%d\n", /* tady vložte výraz */);
    return 0;
}
```
 
**Cvičení**: Zkuste si na místo komentáře doplnit několik výrazů (např. `5 + 8`, `8 * 3`, `12 * (2 + 3)`),
přeložit program, spustit ho a podívat se, co vypíše na výstup, abyste si vyzkoušeli vyhodnocování
výrazů.

### Datové typy
Každý výraz má svůj datový typ, který udává, jak je hodnota výrazu v programu interpretována a také
jaké operace má smysl nad výrazem dělat. Více o datových typech a operátorech se dozvíte v sekci
[Datové typy](datove_typy.md).

### Vedlejší efekty
Pokud chcete pouze vypočítat výraz ("jen tak"), mimo nějaký příkaz, stačí za něj dát středník. Tím
ze samostatného výrazu uděláte příkaz:
```c
1 + 1; // vypočte se `2`, výsledek se na nic nepoužije
```
Toto má smysl dělat pouze u výrazů, které mají nějaký **vedlejší efekt** (*side effect*), který
způsobí, že při provádění výrazu se v programu něco změní. Jinak by výraz sám o sobě byl vypočten,
ale nic dalšího by se nestalo. O výrazech, které umí produkovat vedlejší efekty, se dozvíte později.

#### Příkazy vs výrazy
Jakmile se budete postupně učit o jednotlivých konstrukcích jazyka C, je důležité uvědomit si, jaký
je rozdíl mezi výrazem (něco, co se dá vypočítat) a příkazem, pomocí kterého počítači říkáme, aby
něco (s nějakým výrazem) udělal (například vypsal ho na výstup, zapsal do paměti atd.).
