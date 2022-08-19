# Příkaz `if`
Základním příkazem pro tzv. **podmíněné vykonání** kódu je příkaz `if`:

```c
if (<výraz typu bool>) {
    // blok kódu
}
```

Pokud se výraz v závorce za `if` vyhodnotí jako `true` (pravda), tak se provede
[blok](../promenne/promenne.md#platnost) kódu za závorkou tak, jak jste zvyklí, a poté bude program
dále pokračovat za příkazem `if`. Pokud se však výraz vyhodnotí jako `false` (nepravda), tak se blok
kódu za závorkou vůbec neprovede. V následujícím programu zkuste změnit výraz uvnitř závorek za `if`
tak, aby se blok v podmínce vykonal:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int delka_hesla = 5;

    printf("Kontroluji heslo...\n");
    if (delka_hesla > 5) {
        printf("Heslo je dostatecne dlouhe\n");
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

Jazyk *C* tak umožňuje přidat k příkazu `if` další příkaz, který se provede pouze v případě, že podmínka
"`if`u" není splněna. Takto lze řetězit více podmínek za sebou, kdy v každé následující podmínce víme,
že žádná z předchozích nebyla splněna. Dosáhneme toho tak, že za blokem podmínky `if` použijeme klíčové
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

    Na konec spojené podmínky můžete opět vložit klíčové slovo `else` s blokem bez podmínky. Tento blok
    se provede pouze, pokud žádná z předchozích podmínek není splněna:
    ```c
    if (body > 90) {
        // blok A, více než 90 bodů
    } else if (body > 80) {
        // blok B, méně než 90 bodů, ale více než 80 bodů
    } else {
        // blok C, méně než 81 bodů
    }
    ```

    > Všimněte si, že tento kód opět můžeme přečíst jako intuitivní větu. Pokud je počet
    bodů vyšší, než 90, tak proveď A. V opačném případě, pokud je vyšší než 80, tak proveď B. Jinak
    proveď C.

<hr />

**Cvičení** 🏋

Upravte následující program, aby vypsal:
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

**Cvičení** 🏋

Upravte hodnotu proměnných `delka_hesla` a `delka_jmena` v programu výše tak, aby program
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

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        if (a >= 3) {
          printf("a >= 3\n");
        } else if (a >= 2) {
          printf("a >= 2\n");
        } else if (a >= 1) {
          printf("a >= 1\n");
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `a >= 2`. Příkaz `if`, za kterým následuje sada návazných příkazů `else if`,
    případně na poslední pozici `else`, se vyhodnocuje shora dolů. Provede se blok kódu prvního `if`u,
    jehož podmínka (výraz v závorce) se vyhodnotí jako `true`, což je v tomto případě podmínka `else if (a >= 2)`.
    I když jistě platí i podmínka `a >= 1`, tak blok kódu za posledním `else if` se zde neprovede, protože
    se už provedl blok kódu za dřívější podmínkou.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        if (a >= 3) {
          printf("a >= 3\n");
        } else if (a >= 2) {
          printf("a >= 2\n");
        } if (a >= 1) {
          printf("a >= 1\n");
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    a >= 2
    a >= 1
    ```
    Všimněte si, že před posledním příkazem `if` není `else`! To znamená, že se jedná o nezávislý
    příkaz `if`, který nijak nesouvisí s prvním příkazem `if` nad ním. Kvůli toho se tento příkaz
    provede, i když byl předtím proveden blok za podmínkou `else if (a >= 2)`.

    V běžném programu by byl tento kód formátován spíše následovně:

    ```c
    int a = 2;
    if (a >= 3) {
      printf("a >= 3\n");
    } else if (a >= 2) {
      printf("a >= 2\n");
    }
    
    if (a >= 1) {
      printf("a >= 1\n");
    }
    ```
    S tímto formátováním je mnohem jednodušší rozpoznat, že spolu tyto dva příkazy `if` nesouvisí.
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 1;
        int b = 4;

        if (a > 1) {
          if (b == 4) {
             printf("b == 4\n");
          } else {
             printf("b != 4\n");
          }
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program nevypíše nic. Podmínka `a > 1` se vyhodnotí jako `false`, takže blok kódu za touto
    podmínkou se vůbec nevykoná.
    </details>
4) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 1;
        if (a = 2) {
          printf("a se rovna dvoum\n");
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program vypíše `a se rovna dvoum`. Pozor na to, že operátor přiřazení `[x] = [y]` přiřadí
    výraz `[y]` do `[x]`, a vyhodnotí se jako hodnota `[y]`. V tomto případě se tedy do proměnné
    `a` uloží hodnota `2`, a jelikož `2` se po [převodu](../datove_typy/pravdivostni_typy.md#konverze)
    na `bool` vyhodnotí jako pravda (`true`), se tělo příkazu `if` provede. Záměna přiřazení (`=`)
    a `==` (porovnání) je častou [začátečnickou chybou](../../caste_chyby/caste_chyby.md#záměna--a-).
    
    </details>
