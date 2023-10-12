# Výstup
Stejně jako pro načítání vstupu, i pro výpis textu na výstup nabízí standardní knihovna *C* sadu
užitečných funkcí, opět umístěných v souboru `<stdio.h>`. Stejně jako u načítání [vstupu](vstup.md)
bychom i u výstupu měli řešit [ošetření chyb](vstupavystup.md#ošetření-chyb). Nicméně, u zápisu to
(alespoň u malých programů) není až tak nezbytné, protože chyby zápisu jsou vzácnější než chyby při
vstupu. Zdrojem dat je totiž náš program, a nemusíme tedy tak striktně kontrolovat, jestli jsou
vypsaná data validní. Tato povinnost v jistém smyslu přechází na druhou stranu, s kterou náš program
komunikuje, protože ta bude námi vypsaná data číst.

## Vypsání znaku
Pro vypsání jednoho znaku na standardní výstup (`stdout`) můžeme použít funkci
[`putchar`](https://devdocs.io/c/io/putchar).

```c,editable,mainbody
#include <stdio.h>

int main() {
    putchar('x');
    return 0;
}
```

## Vypsání řetězce
Pro vypsání celého řetězce na `stdout` můžete použít funkci [`puts`](https://devdocs.io/c/io/puts),
která zároveň za řetězcem vypíše znak odřádkování `\n`:

```c,editable,mainbody
#include <stdio.h>

int main() {
    puts("Ahoj");
    puts("UPR");
    return 0;
}
```

Dávejte si pozor na to, že v předaném řetězci musí být obsažen ukončovací `NUL` znak! Funkce `puts`
se bude snažit číst a vypisovat znaky ze zadané adresy, až dokud na takovýto znak nenarazí. Pokud
by tento znak v předaném řetězci nebyl, tak se bude funkce pokoušet číst nevalidní paměť za koncem
řetězce, dokud na `NUL` nenarazí, což by vedlo k
[paměťové chybě](../../caste_chyby/pametove_chyby.md) 💣.

## Vypsání formátovaného textu
K výpisu formátovaného textu na `stdout` můžeme použít funkci `printf`, s kterou jsme se již
mnohokrát setkali. Prvním parametrem funkce je formátovací řetězec, do kterého můžete dávat
zástupné znaky začínající procentem (např. `%d` nebo `%s`). Pro každý takovýto zástupný znak funkce bude očekávat jednu
hodnotu (argument) za formátovacím řetězcem, která bude zformátována na výstup. Například takto můžeme vytisknout číslo
a po něm řetězec:
```c
const char* text = "Cislo";
int cislo = 5;
printf("Cislo %d, retezec %s: \n", cislo, text);
```
Jelikož jsme ve formátovacím řetězci předali dva zástupné znaky (`%d` - číslo a `%s` - řetězec), tak po řetězci musíme
do funkce `printf` předat jeden argument číselného typu, a poté jeden řetězec.

Zástupné znaky funkcí `printf` i `scanf` jsou obdobné, jejich seznam a různé možnosti nastavení
můžete najít v [dokumentaci](https://devdocs.io/c/io/fprintf). Nejčastěji budeme používat tyto zástupné znaky:
- `%d` - výpis celého čísla se znaménkem, nejčastěji datový typ `int`
- `%f` - výpis desetinného čísla, datový typ `float`
- `%s` - výpis řetězce, datový typ `char*` (ukazatel na znak)
  - Na předané adrese musí ležet řetězec, tj. pole znaků **ukončené znakem `'\0'`**!

> Stejně jako `scanf` má i funkce `printf` různé varianty pro formátovaný výpis do souborů
> (`fprintf`) či do řetězce v paměti (`sprintf`).

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 1;

        printf("Hodnota: %f", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje [**nedefinované chování**](../../ruzne/nedefinovane_chovani.md) 💣. Říkáme funkci `printf`,
    že chceme vypsat desetinné číslo (zástupný znak `%f`), ale jako argument předáváme výraz typu celé číslo (`int`).
    Tento program tedy není validní.
    </details>
2) Co vypíše následující program?
   ```c,editable,mainbody
   #include <stdio.h>

   int main() {
       int a = 1;

       printf("Hodnota: %d (a=%d)", a);

       return 0;
   }
   ```
   <details>
   <summary>Odpověď</summary>

   Tento program obsahuje [**nedefinované chování**](../../ruzne/nedefinovane_chovani.md) 💣. Říkáme funkci `printf`, že
   jí předáme dvě hodnoty (dva výrazy) typu celého čísla (zástupný znak `%d`), ale předáváme pouze jednu hodnotu (`a`).
   Tento program tedy není validní.
   </details>
3) Co vypíše následující program?
   ```c,editable,mainbody
   #include <stdio.h>

   int main() {
       int a = 1;

       printf("Hodnota: %s", a);

       return 0;
   }
   ```
   <details>
   <summary>Odpověď</summary>

   Tento program obsahuje [**nedefinované chování**](../../ruzne/nedefinovane_chovani.md) 💣. Říkáme funkci `printf`, že
   jí předáme hodnotu typu řetězec (zástupný znak `%s`), ale předáváme pouze hodnotu typu celé číslo (`int`). Tento
   program tedy není validní.
   </details>
