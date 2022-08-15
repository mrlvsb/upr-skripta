# Pravdivostní typy
Posledním základním datovým typem, který si ukážeme, je pravdivostní typ
**[Booleovské logiky](https://cs.wikipedia.org/wiki/Boolean)**. Hodnoty tohoto datového typu mají
pouze dvě možné varianty - **pravda** (*true*) nebo **nepravda** (*false*). Tento typ se hodí
zejména pro různé logické operace, například porovnávání hodnot (`Je a menší než b?` - `ano`/`ne`).

V *C* se Booleovský datový typ nazývá `_Bool`. Nicméně tento název je docela krkolomný, obvykle se
proto používá spíše název `bool`. Abyste ho mohli použít, tak na začátek programu musíte vložit řádek
`#include <stdbool.h>`. [Později](../preprocesor/vkladani_souboru.md) si vysvětlíme, co tento řádek
dělá.
```c,editable,mainbody
#include <stdbool.h>
#include <stdio.h>

int main() {
    bool venku_je_hezky = true;
    bool upr_je_slozite = false;

    printf("%d\n", venku_je_hezky);
    printf("%d\n", upr_je_slozite);

    return 0;
}
```
Jak lze v ukázce výše vidět, `true` reprezentuje pravdivý Booleovský výraz a `false` nepravdivý
Booleovský výraz a `bool` hodnoty lze vytisknout na výstup stejným způsobem jako celočíselné hodnoty.[^1]
Hodnoty Booleovského typu obvykle zabírají v paměti jeden *byte*.

[^1]: Při výpisu dojde ke [konverzi](#konverze) `bool`u na celé číslo.

### Logické operace
V (Booleovské) logice existují tři základní operátory:
- **logický součin** (*AND*): `platí X a zároveň Y`
- **logický součet** (*OR*): `platí X nebo Y`
- **logická negace** (*NOT*): `neplatí X`

Tyto logické operace lze v *C* použít pomocí následujících operátorů:

- **AND**: `&&`
- **OR**: `||`
- **NOT**: `!`

Tyto operátory můžete použít mezi dvěma výrazy datového typu `bool`. Například:
```c
bool je_muz = true;
bool je_zena = false;
bool je_clovek = je_muz || je_zena; // true || false -> true

bool je_rodic = true;
bool je_otec = je_rodic && je_muz;  // true && true -> true
bool je_matka = je_rodic && !je_otec; // true && !true -> true && false -> false
```

Pro připomenutí, zde je pravdivostní tabulka těchto logických operátorů:

| `X`     |   `Y`   | `X && Y` | <code>X &#124;&#124; Y</code> |  `!X`   |
|---------|:-------:|:--------:|:-----------------------------:|:-------:|
| `false` | `false` | `false`  |            `false`            | `true`  |
| `false` | `true`  | `false`  |            `true`             | `true`  |
| `true`  | `false` | `false`  |            `true`             | `false` |
| `true`  | `true`  |  `true`  |            `true`             | `false` |

### Porovnávání hodnot
Při programování často potřebujete porovnat hodnoty mezi sebou:
- `Má Jarda více bodů než Kamil?`
- `Má uživatelovo heslo více než 5 znaků?`
- `Má Lenka na účtu alespoň 100 dolarů?`

K tomu slouží šest základních porovnávacích operátorů:
- **Rovná se**[^2]: `==`
- **Nerovná se**: `!=`
- **Větší**: `>`
- **Větší nebo rovno**: `>=`
- **Menší**: `<`
- **Menší nebo rovno**: `<=`

[^2]: Zde si dávejte velký pozor na rozdíl mezi `=` (přiřazení hodnoty) a `==` (porovnání dvou hodnot).
Záměna těchto dvou operátorů je častou [začátečnickou chybou](../../caste_chyby/caste_chyby.md#záměna--a-)
a vede k obtížně nalezitelným chybám.

Porovnávat mezi sebou můžete libovolné hodnoty dvou stejných datových typů. Výsledkem porovnání
je výraz datového typu `bool`:
```c
int jarda_body = 13;
int kamil_body = 10;

bool remiza = jarda_body == kamil_body; // false
bool vyhra_jardy = jarda_body > kamil_body; // true

int delka_hesla = 8;
bool heslo_moc_kratke = delka_hesla <= 5; // false
```

Dávejte si ovšem pozor na to, že pouze operátory `==` a `!=` lze použít univerzálně na všechny datové typy.
Například použít `<` pro porovnání dvou Booleovských hodnot obvykle nedává valný smysl, operátory
`<`, `<=`, `>` a `>=` jsou obvykle využívány pouze pro porovnávání čísel.

Porovnávání hodnot můžete zkombinovat s logickými operátory pro vyhodnocení komplexních pravdivostních
výrazů:
```c,editable,mainbody
#include <stdbool.h>
#include <stdio.h>

int main() {
    int delka_hesla = 8;
    bool email_overen = false;
    int rok_narozeni = 1994;

    bool uzivatel_validni = delka_hesla >= 9 && (email_overen || rok_narozeni > 1990); // false
    bool uzivatel_validni2 = delka_hesla >= 9 && email_overen || rok_narozeni > 1990; // true

    printf("%d\n", uzivatel_validni);
    printf("%d\n", uzivatel_validni2);

    return 0;
}
```
Zde je opět třeba dávat si pozor na [prioritu operátorů](https://en.cppreference.com/w/c/language/operator_precedence)
(například `&&` má větší prioritu než `||`) a v případě potřeby výrazy uzávorkovat. Pokud si zkusíte
přeložit tento program, tak vás dokonce překladač bude varovat před tím, že jste výraz neuzávorkovali a
může tak vracet jiný výsledek, než očekáváte.

### Tabulka logických operátorů
Zde je pro přehlednost tabulka s logickými operátory.
Datový typ výsledku je u těchto operátorů vždy `bool`.

|         Operátor          |        Popis         |                Příklad                 |
|:-------------------------:|:--------------------:|:--------------------------------------:|
|           `&&`            | Logický součin (AND) |           `a == b && c >= d`           |
| <code>&#124;&#124;</code> | Logický součet (OR)  | <code>a < b &#124;&#124; c == d</code> |
|            `!`            | Logická negace (NOT) |          `!(a > b && c < d)`           |
|           `==`            |       Rovná se       |                `a == 5`                |
|           `!=`            |      Nerovná se      |                `a != 5`                |
|            `>`            |      Větší než       |                `a > 5`                 |
|           `>=`            | Větší nebo rovno než |                `a >= 5`                |
|            `<`            |      Menší než       |                `a < 5`                 |
|           `<=`            | Menší nebo rovno než |                `a <= 5`                |

### Zkrácené vyhodnocování
Při vyhodnocování Booleovských výrazů s logickými operátory se v *C* používá tzv. **zkrácené vyhodnocování**
(*short-circuit evaluation*). Například pokud se vyhodnocuje výraz `a || b`, tak může dojít k následující
situaci:
- Počítač vše provádí v sekvenčních krocích, tj. nejprve vyhodnotí `a`.
- Pokud má výraz `a` hodnotu `true`, tak už je jasné, že celý výraz `a || b` bude mít hodnotu `true`.
- K vyhodnocení výrazu `b` tak už nedojde, protože je to zbytečné.

Toto chování může urychlit provádění programu, protože přeskakuje provádění zbytečných příkazů,
nicméně může také způsobit nečekané chyby. Pokud by například vyhodnocení výrazu `b` obsahovalo nějaké
[vedlejší efekty](../prikazy_vyrazy.md#vedlejší-efekty), které se projeví při jeho provedení (například
změna hodnoty v paměti), tak může být problematické, pokud se vyhodnocení tohoto výrazu zcela
přeskočí. Pokud si pamatujete na [inkrementaci](../promenne/slozeny_zapis.md#inkrementace-a-dekrementace),
tak ta je jedním z případů výrazů, které mají vedlejší efekt (změnu hodnoty proměnné).

### Konverze
Pokud se pokusíte o převod celého či desetinného čísla na `bool`, tak můžou nastat dvě varianty:
- Pokud je číslo nenulové, výsledkem bude `true`.
- Pokud je číslo nula, výsledkem bude `false`.

V opačném směru (konverze `bool` u na číslo) dojde k následující konverzi:
- `true` se převede na `1`
- `false` se převede na `0`

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>
    #include <stdbool.h>

    int main() {
        int pocet_zidli = 14;
        int pocet_lidi = 8;
        int pocet_znicenych_zidli = 4;

        bool dostatek_zidli = (pocet_zidli - pocet_znicenych_zidli) >= pocet_lidi;
        bool dostatek_lidi = pocet_lidi >= 6;
        bool party_pripravena = dostatek_zidli && dostatek_lidi;

        printf("Party: %d\n", party_pripravena);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `Party: 1`.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>
    #include <stdbool.h>

    int main() {
        int a = 5;
        int b = 4;

        bool x = a >= 3 || (b = 8);

        printf("a=%d\n", a);
        printf("b=%d\n", b);
        printf("x=%d\n", x);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    a=5
    b=4
    x=1
    ```
    Výraz přiřazení `b = 8` se neprovede kvůli [zkrácenému vyhodnocování](#zkrácené-vyhodnocování),
    hodnota proměnné `b` se tak nezmění. Raději nepoužívejte výrazy obsahující vedlejší efekty v
    kombinaci s `||` a `&&`.
    </details>
