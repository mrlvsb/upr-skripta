# Desetinné číselné typy
Pokud budete chtít provádět výpočty s desetinnými čísly, tak můžete využít datové typy s tzv.
**plovoucí řádovou čárkou** (*floating point numbers*). Hodnoty těchto datových typů umožňují udržovat
čísla sestávající se z celé a z desetinné části. Díky
tomu, jak jsou [navržena](https://cs.wikipedia.org/wiki/Pohybliv%C3%A1_%C5%99%C3%A1dov%C3%A1_%C4%8D%C3%A1rka),
tato čísla dokáží reprezentovat jak velmi malé, tak velmi velké hodnoty (za cenu přesnosti desetinné části).

V *C* jsou dva základní vestavěné datové typy pro práci s desetinnými čísly, liší se pouze velikostí
(a tedy i tím, jak přesně dokáží desetinná čísla reprezentovat). Oba dva typy jsou znaménkové:

| Název | Počet bytů | Rozsah hodnot | Přesnost | Se znaménkem |
|---|:---:|:---:|:---:|:---:|
| `float` | 4 | [-3.4x10<sup>38</sup>; 3.4x10<sup>38</sup>] | ~7 des. míst | <i class="fa fa-check"></i> |
| `double` | 8 | [-1.7x10<sup>308</sup>; 1.7x10 <sup>308</sup>] | ~16 des. míst | <i class="fa fa-check"></i> |

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

Pro to, abychom mohli specifikovat kolik číslic chceme vypsat za desetinnou tečkou, musíme k zástupnému znaku
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
Pokud budete konvertovat desetinné číslo na celé číslo, tak dojde k "useknutí" desetinné části:
```c,editable,mainbody
#include <stdio.h>
int main() {
    printf("%d\n", (int) 1.6);
    printf("%d\n", (int) -1.6);
    return 0;
}
```
Toto chování odpovídá zaokrouhlení k nule, tj. kladná čísla se zaokrouhlí dolů a záporná čísla nahoru.
