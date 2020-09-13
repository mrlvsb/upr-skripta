# Podmínky
V programech se často potřebujeme rozhodnout, co by se mělo provést, v závislosti na hodnotě nějakého
výrazu:
- Pokud uživatel nakoupil zboží v posledním týdnu, odešli mu e-mail.
- Zadal uživatel správné heslo? Pokud ano, tak ho přesměruj na jeho profil. Pokud ne, tak zobraz chybovou hlášku.
- Jaké má uživatel konto? Pokud kladné, tak ho vykresli zelenou barvou, pokud záporné, tak červenou a
pokud nulové, tak černou.

V *C* můžeme provádět takováto rozhodnutí pomocí **podmínek** (*conditions*). Základním příkazem
pro tzv. **podmíněné vykonání** kódu je podmínka `if`:

```c
if (<výraz typu bool>) {
    // blok kódu
}
```

Pokud se výraz předaný `if`u vyhodnotí jako `true` (pravda), tak se provede
[blok](c_promenne.md#deklarace-a-platnost) kódu uvnitř `if`u tak, jak jste zvyklí, a program dále
bude pokračovat za příkazem `if`. Pokud se však výraz vyhodnotí jako `false` (nepravda), tak se blok kódu
uvnitř `if`u vůbec neprovede. V následujícím programu zkuste změnit výraz uvnitř závorek za `if` tak,
aby se blok v podmínce vykonal:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int password_length = 5;

    printf("Checking password...\n");
    if (password_length > 5) {
        printf("Password is long enough\n");
    }
    printf("Password check completed\n");

    return 0;
}
```

> Anglické slovo `if` znamená v češtině `Jestliže`. Všimněte si tak, že kód výše můžete přečíst jako
> anglickou větu, která bude mít stejný význam jako uvedený *C* kód: `Jestliže je délka hesla větší
> než pět, tak (proveď kód v bloku)`.

### Provádění alternativ
Často v programu chceme provést jednu ze dvou (nebo více) alternativ, opět v závislosti na hodnotě
nějakého výrazu. To sice můžeme provést pomocí několika `if` příkazů za sebou:
```c
if (points > 90) { grade = 1; }
if (points <= 90 && points > 80) { grade = 2; }
if (points <= 80 && points > 50) { grade = 3; }
...
```
Nicméně to může být často dost zdlouhavé. *C* tak umožňuje přidat k příkazu `if` příkaz, který se provede
v případě, že výraz v podmínce `if` není splněn. Takto lze řetězit více podmínek za sebou, kdy v každé
následující podmínce víme, že žádná z předchozích nebyla splněna. Dosáhneme toho tak, že za blokem podmínky
`if` použijeme klíčové slovo `else` ("v opačném případě"):

```c
if (<výraz typu bool>) {
    // blok kódu
} else ...
```
Pokud za blok podmínky `if` přidáte `else`, tak se program začne vykonávat za `else`, pokud výraz
podmínky není splněn. Za `else` pak může následovat:
- Blok kódu, který se rovnou provede:
    ```c
    if (points > 90) {
        // blok A
    } else {
        // blok B
    }
    // X
    ```
    Pokud platí `points > 90`, provede se blok A, pokud ne, tak se provede blok B. V obou případech
    bude dále program vykonávat kód od bodu `X`.
- Další `if` podmínka, která je opět vyhodnocena. Takovýchto podmínek může následovat libovolný počet:
    ```c
    if (points > 90) {
        // blok A, více než 90 bodů
    } else if (points > 80) {
        // blok B, méně než 91 bodů, ale více než 80 bodů
    } else if (points > 70) {
        // blok C, méně než 81 bodů, ale více než 70 bodů
    }
    // X
    ```
    Takovéto spojené podmínky se vyhodnocují postupně shora dolů. První podmínka `if`, jejíž výraz
    je vyhodnocen jako `true`, způsobí, že se provede blok této podmínky, a následně program pokračuje
    za celou spojenou podmínkou (bod `X`).

    Na konec spojené podmínky můžete opět vložit i `else` s blokem bez podmínky. Tento blok se
    provede pouze, pokud žádná z předchozích podmínek není splněna:
    ```c
    if (points > 90) {
        // blok A, více než 90 bodů
    } else if (points > 80) {
        // blok B, méně než 90 bodů, ale více než 80 bodů
    } else {
        // blok C, méně než 81 bodů
    }
    ```
  
    Všimněte si, že tento kód opět můžeme přečíst jako intuitivní anglickou větu. Pokud je počet
    bodů vyšší, než 90, tak proveď A. V opačném případě, pokud je vyšší než 80, tak proveď B. Jinak
    proveď C.

**Cvičení**: Upravte následující program, aby vypsal:
- `Student uspel s vyznamenanim`, pokud je hodnota `points` větší než `90`.
- `Student uspel`, pokud je hodnota `points` v (uzavřeném) intervalu `[51, 90]`.
- `Student neuspel`, pokud je hodnota `points` menší než `51`.

```c,editable,mainbody
#include <stdio.h>

int main() {
    int points = 50;

    printf("Student uspel\n");

    return 0;
}
```

### Vnořování podmínek
Někdy potřebujeme zkontrolovat složitou podmínku (nebo sadu podmínek). Jelikož podmínky jsou *příkazy*
a bloky kódu můžou obsahovat libovolné příkazy, tak vám nic nebrání v tom podmínky *vnořovat*:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int password_length = 4;
    int username_length = 3;
    if (password_length > 5) {
        if (username_length > 3) {
            printf("Uzivatel byl zaregistrovan\n");
        } else {
            printf("Uzivatelske jmeno neni dostatecne dlouhe\n");
        }
    } else {
        printf("Heslo neni dostatecne dlouhe\n");
    }

    return 0;
}
```

**Cvičení**: Upravte hodnotu promměných v programu výše tak, aby program vypsal `Uzivatel byl zaregistrovan`.
Neměňte v programu nic jiného.

#### Vynechání složených zárovek
Za `if` nebo `else` můžete vynechat složené závorky (`{`, `}`). V takovém případě se bude podmínka
vztahovat k (jednomu) příkazu následujícímu za `if/else`:
```c
if (points> 80) printf("Student uspel\n");
else printf("Student neuspel\n");
```
