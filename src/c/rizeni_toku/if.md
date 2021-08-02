# Příkaz `if`
Základním příkazem pro tzv. **podmíněné vykonání** kódu je příkaz `if`:

```c
if (<výraz typu bool>) {
    // blok kódu
}
```

Pokud se výraz předaný `if`u vyhodnotí jako `true` (pravda), tak se provede
[blok](../promenne/promenne.md#platnost) kódu uvnitř `if`u tak, jak jste zvyklí, a program dále
bude pokračovat za příkazem `if`. Pokud se však výraz vyhodnotí jako `false` (nepravda), tak se blok kódu
uvnitř `if`u vůbec neprovede. V následujícím programu zkuste změnit výraz uvnitř závorek za `if` tak,
aby se blok v podmínce vykonal:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int delka_hesla = 5;

    printf("Kontroluji heslo...\n");
    if (delka_hesla > 5) {
        printf("Heslo je dost dlouhe\n");
    }
    printf("Kontrola hesla dokoncena\n");

    return 0;
}
```

Booleovské výrazy použité v podmíněných příkazech se označují jako **podmínky** (*conditions*), protože
podmiňují vykonávání programu.

> Anglické slovo `if` znamená v češtině `Jestliže`. Všimněte si tak, že kód výše můžete přečíst jako
> větu, která bude mít stejný význam jako uvedený *C* kód: `Jestliže je délka hesla větší
> než pět, tak (proveď kód v bloku)`.

### Provádění alternativ
Často v programu chceme provést *právě jednu* ze dvou (nebo více) alternativ, opět v závislosti na hodnotě
nějakého výrazu (podmínky). To sice můžeme provést pomocí několika `if` příkazů za sebou:
```c
if (body > 90) { znamka = 1; }
if (body <= 90 && body > 80) { znamka = 2; }
if (body <= 80 && body > 50) { znamka = 3; }
...
```
Nicméně to může být často dosti "ukecané", protože se musíme v každé podmínce ujistit, že již nebyla
splněna předchozí podmínka, jinak by se mohla provést více než jedna alternativa.

*C* tak umožňuje přidat k příkazu `if` další příkaz, který se provede pouze v případě, že podmínka "`if`u"
není splněna. Takto lze řetězit více podmínek za sebou, kdy v každé následující podmínce víme, že
žádná z předchozích nebyla splněna. Dosáhneme toho tak, že za blokem podmínky `if` použijeme klíčové
slovo `else` ("v opačném případě"):

```c
if (<výraz typu bool>) {
    // blok kódu
} else ...
```
Pokud za blok podmínky `if` přidáte `else`, tak se program začne vykonávat za `else`, pokud výraz
podmínky není splněn. Za `else` pak může následovat:
- Blok kódu, který se rovnou provede:
    ```c
    if (body > 90) {
        // blok A
    } else {
        // blok B
    }
    // X
    ```
    Pokud platí `body > 90`, provede se blok A, pokud ne, tak se provede blok B. V obou případech
    bude dále program vykonávat kód od bodu `X`.
- Další `if` podmínka, která je opět vyhodnocena. Takovýchto podmínek může následovat libovolný počet:
    ```c
    if (body > 90) {
        // blok A, více než 90 bodů
    } else if (body > 80) {
        // blok B, méně než 91 bodů, ale více než 80 bodů
    } else if (body > 70) {
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
    if (body > 90) {
        // blok A, více než 90 bodů
    } else if (body > 80) {
        // blok B, méně než 90 bodů, ale více než 80 bodů
    } else {
        // blok C, méně než 81 bodů
    }
    ```
  
    Všimněte si, že tento kód opět můžeme přečíst jako intuitivní větu. Pokud je počet
    bodů vyšší, než 90, tak proveď A. V opačném případě, pokud je vyšší než 80, tak proveď B. Jinak
    proveď C.

<hr />

**Cvičení**: Upravte následující program, aby vypsal:
- `Student uspel s vyznamenanim`, pokud je hodnota proměnné `body` větší než `90`.
- `Student uspel`, pokud je hodnota proměnné `body` v (uzavřeném) intervalu `[51, 90]`.
- `Student neuspel`, pokud je hodnota proměnné `body` menší než `51`.

```c,editable,mainbody
#include <stdio.h>

int main() {
    int body = 50;

    printf("Student uspel\n");

    return 0;
}
```

<hr />

### Vnořování podmínek
Někdy potřebujeme vyhodnotit složitou podmínku (nebo sadu podmínek). Jelikož `if` je *příkaz*
a bloky kódu mohou obsahovat libovolné příkazy, tak vám nic nebrání v tom příkazy `if` *vnořovat*:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int delka_hesla = 4;
    int delka_jmena = 3;
    if (delka_hesla > 5) {
        if (delka_jmena > 3) {
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

<hr />

**Cvičení**: Upravte hodnotu proměnných `delka_hesla` a `delka_jmena` v programu výše tak, aby program
vypsal `Uzivatel byl zaregistrovan`. Neměňte v programu nic jiného.

<hr />

#### Vynechání složených zárovek
Za `if` nebo `else` můžete vynechat složené závorky (`{`, `}`). V takovém případě se bude podmínka
vztahovat k (jednomu) příkazu následujícímu za `if/else`:
```c
if (body > 80) printf("Student uspel\n");
else printf("Student neuspel\n");
```

> Zejména ze začátku za podmínkami vždy však raději používejte složené závorky, abyste předešli případným
> [chybám](../../caste_chyby/caste_chyby.md#středník-za-for-while-nebo-if) a učinili kód přehlednějším.
