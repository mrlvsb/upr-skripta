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
[blok](../promenne/promenne.md#definice-a-platnost) kódu uvnitř `if`u tak, jak jste zvyklí, a program dále
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

> Anglické slovo `if` znamená v češtině `Jestliže`. Všimněte si tak, že kód výše můžete přečíst jako
> větu, která bude mít stejný význam jako uvedený *C* kód: `Jestliže je délka hesla větší
> než pět, tak (proveď kód v bloku)`.

### Provádění alternativ
Často v programu chceme provést jednu ze dvou (nebo více) alternativ, opět v závislosti na hodnotě
nějakého výrazu. To sice můžeme provést pomocí několika `if` příkazů za sebou:
```c
if (body > 90) { znamka = 1; }
if (body <= 90 && body > 80) { znamka = 2; }
if (body <= 80 && body > 50) { znamka = 3; }
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

### Vnořování podmínek
Někdy potřebujeme zkontrolovat složitou podmínku (nebo sadu podmínek). Jelikož podmínky jsou *příkazy*
a bloky kódu můžou obsahovat libovolné příkazy, tak vám nic nebrání v tom podmínky *vnořovat*:
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

**Cvičení**: Upravte hodnotu proměnných v programu výše tak, aby program vypsal `Uzivatel byl zaregistrovan`.
Neměňte v programu nic jiného.

#### Vynechání složených zárovek
Za `if` nebo `else` můžete vynechat složené závorky (`{`, `}`). V takovém případě se bude podmínka
vztahovat k (jednomu) příkazu následujícímu za `if/else`:
```c
if (body > 80) printf("Student uspel\n");
else printf("Student neuspel\n");
```

> Zejména ze začátku za podmínkami vždy však raději používejte složené závorky, abyste předešli případným
> chybám a učinili kód přehlednějším.

### Ternární operátor
Občas chcete použít jeden ze dvou výrazů v závislosti na hodnotě nějaké podmínky. Například pokud byste
chtěli přiřadit minimum ze dvou hodnot do proměnné:
```c
int a = 1;
int b = 5;

int c = 0;
if (a < b) {
    c = a;
} else {
    c = b;
}
```
Toto lze provést zkráceně pomocí výrazu **ternárního operátoru** (*ternary operator*). Tento výraz
má následující syntaxi:
```c
<výraz X typu bool> ? <výraz A> : <výraz B>
```
Pokud je výraz `X` pravdivý, tak se ternární operátor vyhodnotí jako hodnota výrazu `A`, v opačném
případě se vyhodnotí jako hodnota výrazu `B`. Uhodnete, co vypíše následující program?
```c,editable,mainbody
#include <stdio.h>

int main() {
    int a = 1;
    int b = 5;
    int c = (a >= b) ? a - b : a + b;
    printf("%d\n", c);

    return 0;
}
```
