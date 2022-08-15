# Dynamické pole
Pole alokovaná na zásobníku by měly mít velikost danou při překladu programu, často ale potřebujeme
vytvářet pole v závislosti na vstupu programu (například když načítáme soubor, tak dopředu nevíme,
kolik bude mít řádků). Ze sekce o [dynamické paměti](../prace_s_pameti/dynamicka_pamet.md) již víme,
jak alokovat libovolné množství paměti na haldě pomocí funkce `malloc`. Pro vytvoření
**dynamického pole** (*dynamic array*) tak stačí použít funkci `malloc`. Například pro vytvoření
dynamického pole pro `5` celých čísel potřebujeme naalokovat `5 * sizeof(int)` bytů:
```c
int* pole = (int*) malloc(5 * sizeof(int));
```
S takovouto pamětí pak můžeme pracovat jako s polem `int`ů o velikosti `5`. Jakmile již takovéto
pole nepotřebujeme, nesmíme jej samozřejmě zapomenout
[uvolnit](../prace_s_pameti/dynamicka_pamet.md#uvolnění-paměti).

## Změna velikosti pole
Občas potřebujeme velikost dynamického pole změnit (obvykle zvětšit). Například pokud vám
uživatel zadává na vstupu seznam čísel, na začátku můžete vytvořit paměť pro 10 čísel, ale při
zadání 11. čísla musíte tuto paměť zvětšit, jinak byste neměli nové číslo kam zapsat. Tento proces
se nazývá **realokace** (*reallocation*) a lze jej provést například následujícím způsobem:
1) Naalokujeme nové dynamické pole o požadované velikosti
2) Zkopírujeme obsah původního pole do nového pole 
3) Uvolníme paměť původního pole
4) Upravíme odpovídající ukazatel(e) v programu, aby ukazoval(y) na nově naalokované pole

Pokud se vám toto nechce programovat ručně, tak můžete také použít funkci
[`realloc`](https://devdocs.io/c/memory/realloc) ze standardní knihovny *C*, která to udělá za vás.
Tato funkce očekává původní adresu alokace z `malloc`/`calloc` a počet bytů nové alokace.

<hr />

**Cvičení** 🏋

Zkuste naprogramovat funkci `realokace`, která obdrží dynamicky naalokované pole
(tedy ukazatel), jeho původní velikost a novou velikost. Funkce realokuje pole na novou velikost a
vrátí ukazatel na nově naalokované pole.

<hr />
