# Vkládání souborů
Příkaz `#include` slouží ke vložení obsahu jiného souboru do vašeho zdrojového kódu. Tento příkaz
existuje ve dvou variantách:
```c
#include <cesta k souboru>
#include "cesta k souboru"
```
Rozdíl mezi nimi je popsán [níže](#rozdíl-mezi-include--a-include-).

Jakmile preprocesor narazí na tento příkaz, tak se pokusí najít soubor na uvedené cestě, zpracuje
jeho obsah (tj. vyhodnotí případné další příkazy jako `#include`, které v něm mohou být) a poté jeho
obsah vloží na místo, kde je `#include` použit. Jedná se o prosté textové nahrazení (`Ctrl+C -> Ctrl+V`).

Tento příkaz slouží k tomu, abychom mohli používat stejný kód ve více souborech bez toho, abychom
jej museli neustále ručně kopírovat. Prozatím budeme vkládat do našeho kódu zejména soubory
obsahující různé funkce [standardní knihovny *C*](../funkce/stdlib.md). Později si pak ukážeme,
jak vytvářet *C* programy sestávající se z [více zdrojových souborů](../modularizace/modularizace.md).

Zkuste si například tento zdrojový soubor pojmenovat jako `main.c` a pomocí příkazu `gcc -P -E main.c`
v terminálu zjistit, jak vypadá poté, co na něj byl aplikován preprocesor:
```c
#include <stdio.h>
int main() {
    printf("Hello world\n");
    return 0;
}
```
Asi je zřejmé, že by nebylo praktické kopírovat ručně všechen tento kód pokaždé, když bychom chtěli
něco vytisknout na výstup programu.

## Relativní cesta
Cesta k souboru zadávaná v `#include` by měla být relativní, tj. není dobrý nápad používat něco
podobného:
```c
#include "C:/Users/Kamil/Desktop/upr/muj_soubor.h"
```
Takovýto program by totiž jistě nefungoval na jiném než vašem počítači. Z jakého bodu se tato
relativní cesta vyhodnotí je popsáno níže.

## Rozdíl mezi `#include <…>` a `#include "…"`
Rozdíl mezi těmito variantami není pevně definován, nicméně většina preprocesorů (resp. překladačů)
funguje takto:
- `#include <…>` nejprve vyhledá zadanou cestu v tzv. systémových cestách. Jedná se o známé adresáře,
ve kterých jsou uloženy jednak soubory standardní knihovny *C*, a také dalších knihoven, které máte
v systému nainstalované. Pouze pokud se zde daný soubor nenalezne, tak se cesta vyhodnotí relativně
ke zdrojovému souboru, ve kterém byl `#include` použit.

    Seznam systémových cest si můžete vypsat pomocí příkazu `echo | gcc -E -Wp,-v -` v Linuxovém
    terminálu. Do tohoto seznamu můžete také přidat dodatečné adresáře, když `gcc` předáte parametr
    `-I`. Více se dozvíte v sekci o [knihovnách](../modularizace/knihovny.md).
    
    Pokud soubor, který chcete do vašeho kódu vložit, se nachází v externí knihovně, která nepatří
    do vašeho projektu, je běžné používat právě `#include <>`.

- `#include "…"` se nedívá do systémových cest, ale rovnou hledá zadanou cestu relativně k souboru,
ve kterém byl `#include` použit. Tuto formu používejte, pokud budete vkládat soubory z vašeho
projektu.

