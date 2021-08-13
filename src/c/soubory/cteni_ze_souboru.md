# Čtení ze souboru
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
Například načtení pěti celých čísel, které jsme zapsali v kódu [zde](zapis_do_souboru.md), by mohlo
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
Funkce `fread` vrací počet prvků, které úspěšně načetla ze souboru.

## Textové čtení
Pokud bychom chtěli načítat ze souboru ASCII text, můžeme použít již známé funkce pro načítání textu,
například [`fgets`](https://devdocs.io/c/io/fgets)[^1] nebo [`fscanf`](https://devdocs.io/c/io/fscanf),
což je varianta funkce `scanf` určená pro formátované čtení ze souborů.

[^1]: S funkcí `fgets` jsme se setkali již [dříve](../text/vstup.md#načtení-řádku), kdy jsme jí
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
[předpočítat](prace_se_soubory.md#pozice-v-souboru) po jeho otevření pomocí funkcí
[`ftell`](https://devdocs.io/c/io/ftell) a [`fseek`](https://devdocs.io/c/io/fseek) nebo si ji
přečíst přímo ze samotného souboru[^2].

[^2]: Spousta binárních formátů (např. `JPEG`) jsou tzv. **samo-popisné** (*self-describing*), což
znamená, že typicky na začátku souboru je v pevně stanoveném formátu (tzv. *hlavičce*) uvedeno,
jak je daný soubor velký. Využijeme toho například při práci s obrázkovým formátem
[`TGA`](../aplikovane_ulohy/tga.md).

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
byla chyba způsobena něčím jiným[^3]. To můžeme zjistit pomocí funkcí
[`feof`](https://devdocs.io/c/io/feof), která vrátí nenulovou hodnotu, pokud jsme se před jejím
zavoláním pokusili o čtení a [pozice](prace_se_soubory.md#pozice-v-souboru) již byla na konci souboru,
a [`ferror`](https://devdocs.io/c/io/ferror), která vrátí nenulovou hodnotu, pokud došlo k nějaké
jiné chybě při práci se souborem. 

[^3]: Například pokud čteme soubor z USB flashky, který je během čtení odpojen od počítače.

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
