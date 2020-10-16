# Práce se soubory
Jakmile jsme se pokusili o otevření souboru, ujistili jsme se, že se to opravdu povedlo a získali
jsme ukazatel `FILE*`, můžeme začít do programu zapisovat nebo z něj číst data (podle toho, v jakém
módu jsme ho otevřeli).

## Pozice v souboru
Struktura `FILE` má vnitřně uloženou **pozici** v souboru, na které probíhají veškeré operace čtení
a zápisu. Pro zjednodušení práce se soubory se pozice automaticky posouvá dopředu o odpovídající
počet bytů po každém čtení či zápisu. Jakmile tedy přečtete ze souboru `n` bytů, tak se pozice posune
o `n` pozic dopředu. Pokud byste tedy dvakrát po sobě přečetli jeden byte ze souboru obsahující text
`ABC`, nejprve získáte znak `A`, a podruhé už znak `B`, protože po prvním čtení se pozice posunula
dopředu o jeden byte.

> Tím, že je pozice sdílená pro čtení a zápis, tak se raději vyvarujte současnému čtení i zápisu
> nad stejným otevřeným souborem. V opačném případě budete muset být opatrní, abyste si omylem
> nepřepsali data nebo nečetli data ze špatné pozice.

Současnou pozici v souboru můžete zjistit pomocí funkce [`ftell`](https://devdocs.io/c/io/ftell).
Pokud byste chtěli pozici ručně změnit, můžete použít funkci [`fseek`](https://devdocs.io/c/io/fseek),
pomocí které se také například můžete v souboru přesunout na začátek (např. abyste ho přečetli
podruhé) nebo na konec (např. abyste zjistili, kolik soubor celkově obsahuje bytů)[^1].

[^1]: Toho můžete dosáhnout tak, že pomocí `fseek(file, 0, SEEK_END)` přesunete pozici na konec
souboru, a dále pomocí `ftell(file)` zjistíte, na jaké pozici jste. To vám řekne, kolik má soubor
celkově bytů.

> Při použití módu `"a"` budou veškeré zápisy probíhat vždy na konci souboru. Tento mód se hodí
> například při zápisu do tzv. **logovacích souborů**, které chronologicky zaznamenávají události v
> programu (události tak vždy pouze přibývají). Zároveň se však po každém zápisu v tomto módu
> pozice posune na jeho konec. Raději tak nepoužívejte mód `"a+"`, který umožňuje zápis na konec i
> čtení. Práce s pozicí při současném zapisování i čtení je v takovémto módu totiž poněkud náročná.

## Zápis do souboru
Pokud chceme do otevřeného souboru zapsat nějaké byty, můžeme použít funkci
[`fwrite`](https://devdocs.io/c/io/fwrite):
```c
size_t fwrite(
    const void* buffer, // adresa, ze které načteme data do souboru
    size_t size,        // velikost prvku, který zapisujeme
    size_t count,       // počet prvků, které zapisujeme
    FILE* stream        // soubor, do kterého zapisujeme
);
```
Funkce `fwrite` předpokládá, že budeme do souboru zapisovat více hodnot stejného datového typu.
Parametr `size` udává velikost tohoto datového typu a parametr `count` počet hodnot, které chceme
zapsat. Pokud tuto funkci zavoláme, tak dojde k zápisu `size * count` bytů z adresy `buffer` do
souboru `stream`. Návratová hodnota `fwrite` značí, kolik prvků bylo do souboru úspěšně zapsáno.
Pokud je tato hodnota menší než `count`, tak došlo k nějaké chybě. Například zápis pěti celých
čísel do souboru by mohl vypadat následovně:
```c
#include <stdio.h>
#include <assert.h>

int main() {
    int pole[5] = { 1, 2, 3, 4, 5 };

    // otevření souboru
    FILE* soubor = fopen("soubor", "wb");
    assert(soubor);

    // zápis do souboru
    int zapsano = fwrite(pole, sizeof(int), 5, soubor);
    assert(zapsano == 5);

    // zavření souboru
    fclose(soubor);    

    return 0;
}
```
Při takovémto použití `fwrite` může dojít k zapsání například pouze `3` čísel, pokud během zápisu
dojde k chybě[^2]. Pokud bychom chtěli zapsat buď vše nebo nic, můžeme říct, že zapisujeme pouze
jeden prvek a parameter `count` nastavit na celkovou velikost všech dat, které chceme zapsat:
```c
int pole[5] = { 1, 2, 3, 4, 5 };
fwrite(pole, sizeof(pole), 1, soubor);
```

[^2]: V takovémto případě by funkce `fwrite` vrátila hodnotu `3`.

Pokud bychom zapsali `pole` do souboru takto, uloží se do něj celkem `20` (`5` * `4`) bytů (čísel),
které později můžeme v programu zase [načíst zpátky](#čtení-ze-souboru). Pokud bychom se podívali,
co v souboru je, nalezli bychom seznam čísel `1 0 0 0 2 0 0 0 3 0 0 0 4 0 0 0 5 0 0 0`, což odpovídá
paměťové reprezentaci pole pěti `int`ů, které bylo vytvořeno výše.

### Textový zápis
Pokud bychom si tato data chtěli přečíst jako text, můžeme čísla z výše zmíněného pole zapsat do
souboru pomocí nějakého textového kódování, například [ASCII](../text/znaky.md). K tomu můžeme
využít funkci [`fprintf`](https://devdocs.io/c/io/fprintf), která funguje stejně jako `printf`, s
tím rozdílem, že text nevypisuje na `stdout`, ale do předaného souboru:
```c
#include <stdio.h>
#include <assert.h>

int main() {
    int pole[5] = { 1, 2, 3, 4, 5 };

    // otevření souboru
    FILE* soubor = fopen("soubor.txt", "w");
    assert(soubor);

    // zápis do souboru
    for (int i = 0; i < 5; i++) {
        fprintf(soubor, "%d ", pole[i]);
    }

    // zavření souboru
    fclose(soubor);    

    return 0;
}
```
V tomto případě by se do souboru zapsalo deset bytů (čísel) `49 32 50 32 51 32 52 32 53 32`, protože
číslice jsou v [ASCII](https://www.asciitable.com/) reprezentovány čísly `48` až `57` a mezera je
reprezentována číslem `32`. Pokud bychom tento soubor otevřeli v textovém editoru, tak by se nám
zobrazil text `1 2 3 4 5 `.

### Bufferování
Stejně jako při zápisu do `stdout` se i při zápisu do souborů uplatňuje
[*bufferování*](../text/vstupavystup.md#standardní-souborové-deskriptory). Data, která do souboru
zapíšeme, se tak v něm neobjeví hned. Pokud bychom chtěli donutit náš program, aby data uložená
v bufferu opravdu vypsal do souboru, můžeme použít funkci [`fflush`](https://devdocs.io/c/io/fflush)
[^3].

[^3]: Ani zavolání funkce `fflush` však nezajistí, že se data opravdu zapíšou na fyzické médium
(například harddisk). To je ve skutečnosti velmi obtížný [problém](https://lwn.net/Articles/457667/).

## Čtení ze souboru
Pro čtení ze souboru můžeme použít funkci [`fread`](https://devdocs.io/c/io/fread), která je
protikladem funkce `fwrite`:
```c
size_t fread(
    void* buffer,   // adresa, na kterou zapíšeme data ze souboru
    size_t size,    // velikost prvku, který načítáme
    size_t count,   // počet prvků, které načítáme
    FILE* stream    // soubor, ze kterého čteme
);
```
Tato funkce opět předpokládá, že budeme ze souboru načítat několik hodnot stejného datového typu.
Například načtení pěti celých čísel, které jsme zapsali v kódu [výše](#zápis-do-souboru), by mohlo
vypadat následovně:
```c
#include <stdio.h>
#include <assert.h>

int main() {
    int pole[5] = { 1, 2, 3, 4, 5 };

    // otevření souboru
    FILE* soubor = fopen("soubor", "rb");
    assert(soubor);

    // čtení ze souboru
    int precteno = fread(pole, sizeof(int), 5, soubor);
    assert(precteno == 5);

    // zavření souboru
    fclose(soubor);    

    return 0;
}
```
Funkce vrátí počet prvků, které úspěšně načetla ze souboru.

### Textové čtení
Pokud bychom chtěli načítat ze souboru ASCII text, opět můžeme použít funkce pro načítání textu,
například [`fgets`](https://devdocs.io/c/io/fgets)[^4] nebo [`fscanf`](https://devdocs.io/c/io/fscanf).

[^4]: S funkcí `fgets` jsme se setkali již [dříve](../text/vstup.md#načtení-řádku), kdy jsme jí
jako poslední parametr globální proměnnou `stdin`. Datový typ proměnné `stdin` je právě `FILE*` –
při spuštění programu standardní knihovna *C* vytvoří proměnné `stdin`, `stdout` a `stderr` a uloží
do nich standardní vstup, výstup a chybový výstup.

> U načítání dat si vždy dejte pozor na to, abyste na adrese, kterou předáváte do `fread` nebo
> `fgets`, měli dostatek naalokované validní paměti. Jinak by se mohlo stát, že data ze souboru
> přepíšou adresy v paměti, kde leží nějaké nesouvisející hodnoty, což by vedlo k
> [paměťové chybě](../../caste_chyby/pametove_chyby.md#segmentation-fault) 💣.

### Rozpoznání konce souboru
Při čtení ze souboru je třeba vyřešit jednu dodatečnou věc – jak rozpoznáme, že už jsme soubor
přečetli celý a už v něm nic dalšího nezbývá? Pokud načítáme data ze souboru "binárně", tj.
interpretujeme je jako byty a ne jako (ASCII) text, obvykle stačí si velikost souboru
[předpočítat](#pozice-v-souboru) po jeho otevření pomocí funkcí [`ftell`](https://devdocs.io/c/io/ftell)
a [`fseek`](https://devdocs.io/c/io/fseek) nebo si ji přečíst přímo ze samotného souboru[^5].

[^5]: Spousta binárních formátů (např. `JPEG`) jsou tzv. **samo-popisné** (*self-describing*), což
znamená, že typicky na začátku souboru je v pevně stanoveném formátu uvedeno, jak je daný soubor
velký. Využijeme toho například při práci s obrázkovým formátem [`TGA`](../aplikovane_ulohy/tga.md).

Co ale dělat, když načítáme textové soubory, jejichž formát obvykle není ani zdaleka pevně daný?
Předpočítat si velikost souboru a pak muset po každém načtení např. řádku počítat, kolik znaků jsme
vlastně načetli, by bylo relativně komplikované. Při čtení textových souborů se tak obvykle využívá
jiná strategie – čteme ze souboru tak dlouho, dokud nedojde k chybě. Způsob detekce chyby záleží na
použité funkci:
- [`fscanf`](https://devdocs.io/c/io/fscanf) vrátí číslo `<= 0`, pokud se jí nepodaří načíst žádný
zástupný znak ze vstupu.
- [`fgets`](https://devdocs.io/c/io/fgets) vrátí ukazatel s hodnotou `0`, pokud dojde k chybě při
čtení.

Jakmile dojde k chybě, tak bychom ještě měli ověřit, jestli jsme opravdu na konci souboru, anebo
byla chyba způsobena něčím jiným[^6]. To můžeme zjistit pomocí funkcí
[`feof`](https://devdocs.io/c/io/feof), která vrátí nenulovou hodnotu, pokud jsme se před jejím
zavoláním pokusili o čtení a [pozice](#pozice-v-souboru) již byla na konci souboru, a
[`ferror`](https://devdocs.io/c/io/ferror), která vrátí nenulovou hodnotu, pokud došlo k nějaké
jiné chybě při práci se souborem. 

[^6]: Například pokud čteme soubor z USB disku, který je během čtení odpojen od počítače.

Program, který by načítal a rovnou vypisoval řádky textu ze vstupního souboru, dokud nedojde na
jeho konec, by tedy mohl vypadat například takto:
```c
#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <string.h>

int main() {
    FILE* soubor = fopen("soubor.txt", "r");
    assert(soubor);

    char radek[80];
    while (1) {
        if (fgets(radek, sizeof(radek), soubor)) {
            // radek byl uspesne nacten
            printf("Nacteny radek: %s", radek);
        }
        else {
            if (feof(soubor)) {
                printf("Dosli jsme na konec souboru\n");
            } else if (ferror(soubor)) {
                printf("Pri cteni ze souboru doslo k chybe: %s\n", strerror(errno));
            }

            break;
        }
    }

    fclose(soubor);

    return 0;
}
```
