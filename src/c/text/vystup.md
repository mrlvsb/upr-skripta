# Výstup
Stejně jako pro načítání vstupu, i pro výpis textu na výstup nabízí standardní knihovna *C* sadu
užitečných funkcí, opět umístěných v souboru `<stdio.h>`. Stejně jako u načítání [vstupu](vstup.md)
bychom i u výstupu měli řešit [ošetření chyb](vstupavystup.md#ošetření-chyb). Nicméně, u zápisu to
(alespoň u malých programů) není až tak nezbytné, protože chyby zápisu jsou vzácnější než chyby při
vstupu. Zdrojem dat je totiž náš program, a nemusíme tak kontrolovat, jestli jsou data validní.
Tato povinnost v jistém smyslu přechází na druhou stranu, s kterou náš program komunikuje.

## Vypsání znaku
Pro vypsání jednoho znaku na standardní výstup (`stdout`) můžeme použít funkci
[`putchar`](https://devdocs.io/c/io/putchar).

## Vypsání řetězce
Pro vypsání celého řetězce na `stdout` můžete použít funkci [`puts`](https://devdocs.io/c/io/puts).

```c
puts("Ahoj svete!\n");
```

Dávejte si pozor na to, že v předaném řetězci musí být obsažen ukončovací `NUL` znak! Funkce `puts`
se bude snažit číst a vypisovat znaky ze zadané adresy, až dokud na takovýto znak nenarazí. Pokud
by tento znak v předaném řetězci nebyl, tak se může funkce pokoušet číst nevalidní paměť i za pamětí
řetězci, dokud na `NUL` nenarazí.

## Vypsání formátovaného textu
K výpisu formátovaného textu na `stdout` můžeme použít funkci `printf`, s kterou jsme se již
mnohokrát setkali. Prvním parametrem funkce je formátovací řetězec, do kterého můžete dávat
zástupné znaky. Pro každý zástupný znak funkce očekává jednu hodnotu (argument) za formátovacím
řetězcem, která bude zformátována na výstup. Například takto můžeme vytisknout číslo a po něm řetězec:
```c
const char* text = "Cislo";
int cislo = 5;
printf("Cislo %d, retezec %s: \n", cislo, text);
```

Zástupné znaky funkcí `printf` i `scanf` jsou obdobné, jejich seznam a různé možnosti nastavení
můžete najít v [dokumentaci](https://devdocs.io/c/io/fprintf).

> Stejně jako `scanf` má i funkce `printf` různé varianty pro formátovaný výpis do souborů
> (`fprintf`) či do řetězce v paměti (`sprintf`).
