# Celočíselné datové typy
Asi nejpřirozenějším a nejpoužívanějším datovým typem ve většině programovacích jazyků jsou (celá)
čísla. Tyto číselné datové typy nám umožňují pracovat s celými čísly, které mají typicky jednotky
(1 - 8) bytů[^1]. Počet bytů udává, jak velký rozsah mohou hodnoty daného typu obsahovat. Například
číslo s 2 byty (16 bity) bez znaménka může obsahovat hodnoty 0 až 2<sup>16</sup>-1. Čím více bytů,
tím více zabere hodnota daného typu místa v paměti.

[^1]: I když 8 bytů (64 bitů) může znít jako málo, tak pomocí takového čísla můžeme vyjádřit 2<sup>64</sup>
(neboli `18 446 744 073 709 551 616`) různých hodnot, což pro naprostou většinu běžného použití čísel
bohatě stačí.

U celých číselných typů se rozlišuje, zda jsou **signed** (se znaménkem) nebo **unsigned** (bez
znaménka, nezáporné). Tato vlastnost udává, jaké hodnoty může typ nabývat
(tj. jestli mohou být i záporné nebo ne). Například číslem o velikosti jednoho bytu můžeme
reprezentovat 256 různých hodnot. Pokud budeme interpretovat toto číslo se znaménkem, tak může uchovávat
hodnoty -128 až 127. Pokud ho budeme interpretovat bez znaménka, tak může uchovávat hodnoty 0 až 255.

C obsahuje několik základních typů celočíselných proměnných, které se liší v tom, kolik mají bytů a
jestli jsou znaménkové nebo ne. Pokud před název typu napíšeme `signed`, bude se jednat o znaménkový
typ, pokud použijeme `unsigned`, tak použijeme typ bez znaménka. Většina typů je implicitně se
znaménkem, tj. `int` je to samé jako `signed int`. V následující tabulce je seznam nejčastějších
celočíselných typů[^2]:

| Název | Počet bytů | Rozsah hodnot | Se znaménkem |
|---|:---:|:---:|:---:|
| `char` nebo<br />`signed char` | 1 | [-128; 127] | <i class="fa fa-check"></i> |
| `unsigned char` | 1 | [0; 255] | <i class="fa fa-times"></i> |
| `short` nebo<br />`signed short` | 2 | [-32 768; 32 767] | <i class="fa fa-check"></i> |
| `unsigned short` | 2 | [0; 65 535] | <i class="fa fa-times"></i> |
| **`int`** nebo<br />`signed int` | 4 | [-2 147 483 648; 2 147 483 647] | <i class="fa fa-check"></i> |
| `unsigned int` | 4 | [0; 4 294 967 295] | <i class="fa fa-times"></i> |
| `long` nebo<br />`signed long` | 8 | [-9 223 372 036 854 775 808;<br />9 223 372 036 854 775 807] | <i class="fa fa-check"></i> |
| `unsigned long` | 8 | [0; 18 446 744 073 709 551 615] | <i class="fa fa-times"></i> |

[^2]: Počet bytů (a znaménkovost u typu `char`) záleží na použitém
operačním systému a překladači. Zde jsou uvedeny hodnoty, se kterými se můžete
nejčastěji setkat na 64-bitovém Linuxovém systému s překladačem GCC při použití
[dvojkového doplňku](https://cs.wikipedia.org/wiki/Dvojkov%C3%BD_dopln%C4%9Bk).

Každý vestavěný datový typ (`char`, `short`, `int`) a modifikátor znaménkovosti (`signed`, `unsigned`)
je zároveň klíčovým slovem.

Pokud ze začátku nebudete vědět, který typ zvolit, tak pro základní aritmetické operace používejte
ze začátku typy se znaménkem s 4 byty, tedy `int`. Tento typ je také implicitně použit, když v programu
použijete číselný výraz, například výraz `1` má datový typ `int`[^3].

[^3]: Pouze pokud by výraz nešel reprezentovat typem `int`, použije se číselný typ s více byty.

> Typ `char` je speciální v tom, že zároveň běžně reprezentuje textové znaky v
> [ASCII](https://www.asciitable.com/) kódování. Více o reprezentaci textu v programech se dozvíte
> v sekci o [řetězcích](retezce.md).

### Operace s číselnými typy
C umožňuje provádět operace nad vestavěnými datovými typy pomocí tzv. **operátorů**. Při práci s
výrazy celočíselných typů lze provádět běžné aritmetické operace `+`, `-`, `/`, `*` nebo `%` (zbytek
po dělení). Například `5 + 8` nebo `2 * 16` tak bude obvykle fungovat tak, jak byste očekávali. Je si
ale třeba dát pozor na několik zrádných věcí:

- Při dělení dvou celočíselných čísel pomocí operátoru `/` dochází k celočíselnému dělení, tj. například
výsledek výrazu `5 / 2` je `2`, a ne `2.5`. Pokud chcete provádět dělení desetinných čísel, musíte
použít [odpovídající](#Desetinné-číselné-typy) datový typ. Zkuste si to:
    ```c,editable,mainbody
    #include <stdio.h>
    int main() {
        printf("%d\n", 5 / 2);
        return 0;
    }
    ```
- Jelikož mají čísla v počítači omezenou přesnost (typicky několik jednotek bytů), tak může při matematických
operacích dojít k tzv. **přetečení** (*overflow*). Například pokud vynásobíme jednobytové číslo `50`
desíti, tak bychom očekávali výsledek `500`, nicméně tak velké číslo nelze v jednom bytu reprezentovat.
Výsledkem místo toho bude `244` (`500 % 256`), pokud se jedná o číslo bez znaménka, nebo `-12`, pokud
jde o číslo se znaménkem. Podobné výsledky jsou silně neintuitivní, pokud tedy váš program vrácí zvláštní
číselný výsledek, zkontrolujte si, jestli neprovádíte operace, při kterých mohlo dojít k přetečení.
- C provádí [implicitní konverze](https://www.guru99.com/c-type-casting.html) mezi datovými typy,
které mohou změnit datový typ výrazů, které používáte, bez vašeho vědomí. Je tak (obzvláště ze začátku)
vhodné ujistit se, že provádíte operace mezi stejnými datovými typy.
- Stejně jako v matematice, tak i v C záleží u operátorů na jejich prioritě a asociativitě.
Seznam všech operátorů spolu s jejich prioritiou naleznete [zde](https://en.cppreference.com/w/c/language/operator_precedence).
Například výsledek výrazu `1 + 2 * 3` je `7`, a ne `9`. Pokud budete chtít prioritu ovlivnit, můžete
výrazy **uzávorkovat**, abyste jim dali větší přednost: `(1 + 2) * 3` se vyhodnotí jako `9`.

Kromě základních aritmetických operací C podporuje také [bitové operace](https://cs.wikipedia.org/wiki/Bitov%C3%A1_operace):
- AND: operátor `&`
- OR: operátor `|`
- XOR: operátor `^`

O dalších typech operátorů se postupně dozvíte během semestru.

### Explicitní konverze
Někdy potřebujete převést hodnoty mezi různými datovými typy. K tomu slouží **operátor převedení**
(*cast operator*), který má syntaxi `(<datový typ>) <výraz>` a převede výraz na daný datový typ.
Například `(short) 1` převede výraz `1` z typu `int` na `short`. Je dobré si uvědomit, k čemu může
dojít při převodu mezi různými datovými typy:
- Pokud je cílový datový typ menší a převáděnou hodnotu v něm nelze reprezentovat, tak dojde k
oseknutí hodnoty. V důsledku způsobu reprezentace hodnot v počítači takováto operace odpovídá
zbytku po dělení:
    ```c
    unsigned short a = 256;
    (unsigned char) a // hodnota tohoto výrazu je 0 (256 % 256)
    ```
- Pokud převádíte znaménkový typ na bezznaménkový a hodnota převáděného výrazu je záporná, tak nedojde
k intuitivnímu použití absolutní hodnoty[^4]. V důsledku způsobu reprezentace hodnot v počítači takováto
operace odpovídá přičtení dané hodnoty k maximální možné hodnotě cílového typu:
    ```c
    signed char c = -50;
    (unsigned char) c // hodnota tohoto výrazu je 206 (256 - 50)
    ```

[^4]: K tomu můžete použít například funkci [abs](http://www.cplusplus.com/reference/cstdlib/abs/).

Pokud se chcete dozvědět více o tom, proč konverze mezi typy fungují tak, jak fungují, tak se podívejte
na to, jak funguje [dvojkový doplněk](https://cs.wikipedia.org/wiki/Dvojkov%C3%BD_dopln%C4%9Bk).
