# Desetinné číselné typy
Pokud budete chtít provádět výpočty s desetinnými čísly, tak můžete využít datové typy s tzv.
**plovoucí řádovou čárkou** (*floating point numbers*). Hodnoty těchto datových typů umožňují pracovat
s čísly, které se skládají z celé a z desetinné části. Díky
tomu, jak jsou [navržena](https://cs.wikipedia.org/wiki/Pohybliv%C3%A1_%C5%99%C3%A1dov%C3%A1_%C4%8D%C3%A1rka),
tato čísla dokáží reprezentovat jak velmi malé, tak velmi velké hodnoty (za cenu menší přesnosti
desetinné části).

V *C* jsou dva základní vestavěné datové typy pro práci s desetinnými čísly, které se liší velikostí
(a tedy i tím, jak přesně dokáží desetinná čísla reprezentovat). Oba dva typy jsou znaménkové:

| Název    | Počet bytů |                  Rozsah hodnot                   |   Přesnost    |        Se znaménkem         |
|----------|:----------:|:------------------------------------------------:|:-------------:|:---------------------------:|
| `float`  |     4      |  \[-3.4x10<sup>38</sup>; 3.4x10<sup>38</sup>\]   | ~7 des. míst  | <i class="fa fa-check"></i> |
| `double` |     8      | \[-1.7x10<sup>308</sup>; 1.7x10 <sup>308</sup>\] | ~16 des. míst | <i class="fa fa-check"></i> |

Slovo `double` pochází z pojmu "double precision", tedy dvojitá přesnost (typ `float` se také někdy
označuje pomocí "single precision").

Pokud chcete v programu vytvořit výraz datového typu `double`, stačí napsat desetinné číslo (jako
desetinný oddělovač se používá tečka, ne čárka): `10.5`, `-0.73`. Pokud chcete vytvořit výraz typu
`float`, tak za toto číslo ještě přidejte znak `f`: `10.5f`, `-0.73f`.

### Formátovaný výstup desetinných čísel
Pokud chcete vytisknout na výstup hodnotu datového typu `float` nebo `double`, můžete použít
[zástupný znak](../prikazy_vyrazy.md#výpis-výrazů) `%f`:

```c
printf("Desetinne cislo: %f\n", 1.0);
```

Jednoduché použití zástupného znaku `%f` však způsobí, že se desetinné číslo vypíše v rozvoji,
tj. pro číslo `1.0` se vypíše do termínálu `1.000000`.

Abychom mohli specifikovat, kolik číslic chceme vypsat za desetinnou tečkou, musíme k zástupnému znaku
doplnit formátování. Pro datový typ `float` a `double` používáme následující syntaxi:

```c
printf("Desetinne cislo: %.2f\n", 1.0);
```
kde před zástupný znak `f` napíšeme `.` a doplníme požadovaným počtem číslic za desetinnou tečkou.
Takto specifikovaný řetězec se zástupným znakem již vytiskne číslo `1.00`.

### Přesnost desetinných čísel
Je třeba si uvědomit, že desetinná čísla v počítači mají pouze konečnou přesnost a jsou reprezentována
v dvojkové soustavě:
- V počítači nelze reprezentovat iracionální čísla s nekonečnou přesností. Pokud tedy chcete do paměti
uložit například hodnotu `π`, budete ji muset zaokrouhlit.
- Kvůli použití dvojkové soustavy některé desetinné hodnoty nelze vyjádřit přesně. Například číslo
\\( \frac{1}{3} \\) lze v desítkové soustavě vyjádřit zlomkem, ale v dvojkové soustavě toto číslo
má nekonečný desetinný rozvoj (`0.010101…`) a opět tedy nelze vyjádřit přesně:
    ```c,editable,mainbody
    #include <stdio.h>
    int main() {
        printf("%f\n", 1.0 / 3.0);
        return 0;
    }
    ```

### Konverze na celé číslo
Pokud budete [konvertovat](konverze.md) desetinné číslo na celé číslo, tak dojde k "useknutí"
desetinné části:
```c,editable,mainbody
#include <stdio.h>
int main() {
    printf("%d\n", (int) 1.6);
    printf("%d\n", (int) -1.6);
    return 0;
}
```
Toto chování odpovídá zaokrouhlení k nule, tj. kladná čísla se zaokrouhlí dolů a záporná čísla nahoru.
<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        printf("%d\n", 1.5);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje [**nedefinované chování**](../../ruzne/nedefinovane_chovani.md) 💣. Pokud při použití příkazu
    `printf` v textu mezi uvozovkami použijeme zástupný znak `%d`, musíme za čárkou předat výraz datového typu celého
    čísla. Zde jsme ale předali výraz datového typu desetinného čísla.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        float a = 2.0f;
        float b = 5.0f;
        int c = b / a;
        printf("%d\n", c);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `2`, protože výraz desetinného číselného typu `b / a`, který se vyhodnotil na
    `2.5`, byl poté uložen do proměnné celočíselného typu, která si z něj ponechala pouze celou část,
    tj. `2`.
    </details>
