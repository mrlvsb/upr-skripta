# Hlavičkové soubory
Nyní už víme, že pro použití kódu z jiných souborů bychom nejprve měli dané funkce a proměnné
[deklarovat](pouzivani_kodu_z_jinych_souboru.md#deklarace-vs-definice). Pokud bychom však museli
v každém souboru, ve kterém chceme použít kód z jiného souboru, museli vytvářet deklarace pro
každou funkci či proměnnou, kterou chceme použít, bylo by to docela zdlouhavé. Pokud by navíc došlo
ke změně datového typu či názvu takovéto sdílené funkce či proměnné, museli bychom deklarace upravit
ve všech souborech, kde funkci či proměnnou používáme.

Pro vyřešení tohoto problému se v *C* často využívá koncept tzv. **hlavičkových souborů**
(*header files*). Pro každý zdrojový soubor, jehož kód chceme sdílet, vytvoříme hlavičkový soubor,
který bude obsahovat deklarace všech sdílených veřejných funkcí a globálních proměnných z daného
zdrojového souboru. Ve zdrojovém souboru pak budou jejich definice. Dle jmenné konvence se hlavičkový
soubor pojmenovává jako `<název zdrojového souboru>.h`:
```c
// soubor.h
int moje_funkce();
extern int moje_promenna;

// soubor.c
int moje_funkce() {}
int moje_promenna;
```
Hlavičkový soubor tak udává tzv. **rozhraní** (*interface*) odpovídajícího zdrojového souboru –
obsahuje seznam funkcí a proměnných, které jsou sdílené a zbytek programu je může používat.

Ostatní soubory, které chtějí funkce z nějakého zdrojového souboru použít, pak
[vloží](../preprocesor/vkladani_souboru.md) jeho hlavičkový soubor pomocí preprocesoru, aby mohly
používat sdílené funkce a globální proměnné s korektní kontrolou datových typů:
```c
// main.c
#include "soubor.h"

int main() {
    moje_funkce();
    int x = moje_promenna;

    return 0;
}
```
Pokud dojde ke změně signatury funkce či typu/názvu proměnné, tak stačí změnu udělat v hlavičkovém
(a odpovídajícím zdrojovém) souboru. Všechny ostatní soubory, které danou funkci nebo proměnnou
používají, pak budou okamžitě využívat upravenou deklaraci díky použití `#include`.

S hlavičkovými soubory jsme již setkali při použití [standardní knihovny](../funkce/stdlib.md). V
souborech jako je `stdio.h` se nacházejí deklarace funkcí jako je například `printf`, jejichž definice
je poté obsažena v objektových souborech standardní knihovny.

## Obsah hlavičkového souboru
Jelikož hlavičkové soubory jsou určeny k tomu, aby byly využívány (vkládány) v různých zdrojových
souborech, tak se jejich obsah přirozeně může vyskytnout ve více jednotkách překladu. Aby tak nebylo
porušeno [pravidlo jedné definice](pouzivani_kodu_z_jinych_souboru.md#pravidlo-jedné-definice), je
důležité do hlavičkových souborů dávat **pouze deklarace, a ne definice** funkcí a proměnných!

Pokud byste do hlavičkového souboru dali například definici funkce, a tento soubor by se vyskytnul
ve více jednotkách překladu, tak by linkování selhalo kvůli vícenásobné definici. Pokud byste
přecejenom opravdu chtěli definici nějaké funkce "propašovat" do hlavičkového souboru, můžete před
ní použít klíčové slovo `inline`:
```c
// soubor.h
inline void moje_funkce() { ... }
```
Tímto klíčovým slovem slibujete linkeru, že všechny definice funkce s tímto názvem jsou stejné.
Pokud tak linker narazí na definici této funkce vícekrát (což nastane, když tento hlavičkový soubor
bude vložen ve více jednotkách překladu), tak nebude hlásit chybu, ale prostě si jednu z těchto
definicí vybere. Pokud by definice stejné nebyly, může to vést k dost zvláštnímu chování. Pokuste
se tak `inline` raději nevyužívat.

> U (globálních) proměnných nemá smysl `inline` používat.

Kromě deklarací funkcí a proměnných se do hlavičkových souborů také běžně vkládají struktury, které
jsou součástí typů sdílených proměnných či parametrů nebo návratových hodnot sdílených funkcí.

Aby mohly zdrojové soubory používat sdílené struktury i sdílené funkce v
[libovolném pořadí](pouzivani_kodu_z_jinych_souboru.md#jednoprůchodový-překlad), tak obvykle zdrojové
soubory vkládají svůj vlastní hlavičkový soubor:
```c
// soubor.h
typedef struct {
    int vek;
} Osoba;

int zpracuj_osobu(Osoba osoba);

// soubor.c
#include "soubor.h"
int zpracuj_osobu(Osoba osoba) { ... }
```
Pro použití struktur nebo např.
[`typedefů`](../struktury/struktury.md#vytváření-nových-jmen-pro-datové-typy) z ostatních souborů
je také běžné, že hlavičkové soubory vkládají jiné hlavičkové soubory.

## Ochrana vkládání
U hlavičkových souborů je nutné řešit ještě jednu další věc. Jelikož se běžně používají v kombinaci
s `#include`, může se stát, že i v rámci jedné jednotky překladu se jeden hlavičkový soubor vloží do
výsledného zdrojového souboru více než jednou. To může způsobovat různé typy problémů:
- Pokud se budou hlavičkové soubory vkládat navzájem, mohlo by dojít k cyklické závislosti. Například
zde by překlad selhal, protože by se hlavičkové soubory snažili vložit se navzájem donekonečna:
    ```c
    // a.h
    #include "b.h"
    
    // b.h
    #include "a.h"
    ```
- Hlavičkový soubor se zbytečně vícekrát načítá překladačem, což prodlužuje dobu překladu.
- Pokud by hlavičkový soubor obsahoval nějakou definici, tak i kdyby byl použit pouze v jedné
jednotce překladu, došlo by k chybě při linkování, protože by definice byla zduplikovaná. 

Abychom těmto situacím zamezili, tak u hlavičkových souborů budeme používat tzv. **ochranu vkládání**
(*include guard*). Pomocí ochrany vkládání zajistíme, že jeden hlavičkový soubor se v rámci jedné
jednotky překladu vloží maximálně jednou.

Zamezení vícenásobného vložení můžeme dosáhnout pomocí
[podmíněného překladu](../preprocesor/makra.md#podmíněný-překlad):
```c
// soubor.h
#ifndef SOUBOR_H
#define SOUBOR_H

void moje_funkce();

#endif
```
Tohle je nicméně trochu zdlouhavé. Moderní překladače obsahují mnohem jednodušší způsob. Na začátek
hlavičkového souboru stačí vždy vložit řádek `#pragma once` a dál nemusíte nic řešit:
```c
// soubor.h
#pragma once

void moje_funkce();
```
