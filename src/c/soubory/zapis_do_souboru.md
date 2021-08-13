# Zápis do souboru
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

    // binární zápis do souboru
    int zapsano = fwrite(pole, sizeof(int), 5, soubor);
    assert(zapsano == 5);

    // zavření souboru
    fclose(soubor);    

    return 0;
}
```
> Při takovémto použití `fwrite` může dojít k zapsání například pouze `3` čísel, pokud během zápisu
> dojde k chybě[^1]. Pokud bychom chtěli zapsat buď vše nebo nic, můžeme říct, že zapisujeme pouze
> jeden prvek a parameter `count` nastavit na celkovou velikost všech dat, které chceme zapsat:
> ```c
> int pole[5] = { 1, 2, 3, 4, 5 };
> fwrite(pole, sizeof(pole), 1, soubor);
> ```

[^1]: V takovémto případě by funkce `fwrite` vrátila hodnotu `3`.

Pokud bychom zapsali `pole` do souboru takto, uloží se do něj celkem `20` (`5` * `4`) bytů (čísel),
které později můžeme v programu zase [načíst zpátky](cteni_ze_souboru.md). Pokud bychom se podívali,
co v souboru je, nalezli bychom seznam čísel `1 0 0 0 2 0 0 0 3 0 0 0 4 0 0 0 5 0 0 0`, což odpovídá
paměťové reprezentaci pole pěti `int`ů, které bylo vytvořeno výše.

## Textový zápis
Pokud bychom chtěli tato data zapsat do souboru v textové podobě (a ne pouze jako jejich binární
reprezentaci), můžeme čísla z výše zmíněného pole zapsat pomocí nějakého textového kódování,
například [ASCII](../text/znaky.md). K tomu můžeme využít funkci
[`fprintf`](https://devdocs.io/c/io/fprintf), která funguje stejně jako `printf`, s tím rozdílem,
že text nevypisuje na `stdout`, ale do předaného souboru[^2]:
```c
#include <stdio.h>
#include <assert.h>

int main() {
    int pole[5] = { 1, 2, 3, 4, 5 };

    // otevření souboru
    FILE* soubor = fopen("soubor.txt", "w");
    assert(soubor);

    // textový zápis do souboru
    for (int i = 0; i < 5; i++) {
        fprintf(soubor, "%d ", pole[i]);
    }

    // zavření souboru
    fclose(soubor);    

    return 0;
}
```

[^2]: Všimněte si, že zde jsme použili [mód otevření](otevirani_souboru.md#Mód-otevření) pro textový
zápis (`"w"`), namísto binárního zápisu `"wb"` použitého výše.

V tomto případě by se do souboru zapsalo deset bytů (čísel) `49 32 50 32 51 32 52 32 53 32`, protože
číslice jsou v [ASCII](https://www.asciitable.com/) reprezentovány čísly `48` až `57` a mezera je
reprezentována číslem `32`. Pokud bychom tento soubor otevřeli v textovém editoru, tak by se nám
zobrazil text `1 2 3 4 5 `.

## Bufferování
Stejně jako při zápisu do `stdout` se i při zápisu do souborů uplatňuje
[*bufferování*](../text/vstupavystup.md#standardní-souborové-deskriptory). Data, která do souboru
zapíšeme, se tak v něm neobjeví hned. Pokud bychom chtěli donutit náš program, aby data uložená
v bufferu opravdu vypsal do souboru, můžeme použít funkci [`fflush`](https://devdocs.io/c/io/fflush)
[^3].

[^3]: Ani zavolání funkce `fflush` však nezajistí, že se data opravdu zapíšou na fyzické médium
(například harddisk). To je ve skutečnosti velmi obtížný [problém](https://lwn.net/Articles/457667/).
