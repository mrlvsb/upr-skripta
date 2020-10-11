# Znaky
Už víme, že v paměti počítače je nakonec vše reprezentováno číslem, a ani textové znaky
nejsou výjimkou. Přirozeným způsobem, jak od sebe znaky odlišit, je přiřadit každému znaku jiné číslo,
například znak `A` můžeme reprezentovat číslem `0`, znak `B` číslem `1` atd. Kdyby si však každý
program(átor) definoval vlastní způsob, jak převádět znaky na čísla, tak by mezi sebou programy
nemohly rozumně komunikovat, protože by si nerozuměly.

Z toho důvodu vzniklo za poslední desítky let mnoho **textových kódování**
(*character encoding*), které definují, jaká čísla přiřadit jednotlivým znakům. Dnešním de-facto
standardem je kódování [Unicode](https://en.wikipedia.org/wiki/Unicode), které obsahuje přes sto tisíc
různých znaků, od dávných hieroglyfů, přes českou či anglickou abecedu, až po všelijaké emoji.
Práce s kódováním Unicode však není v jazyce *C* přímočará, navíc pro naše potřeby vůbec není potřeba[^1].

[^1]: Pokud byste se o kódování znaků a Unicode chtěli dozvědět více, přečtěte si tento
[článek](https://kunststube.net/encoding/). 

V rámci předmětu UPR si tak vystačíme s kódováním [ASCII](https://en.wikipedia.org/wiki/ASCII)
(American Standard Code for Information Interchange). Toto kódování sice obsahuje pouze 128 znaků
(čísla, malá a velká písmena anglické abecedy, interpunkce apod.), nicméně práce s ním je díky tomu
velmi jednoduchá. Je navíc podmnožinou Unicode, takže programy, které podporují Unicode kódování, si
s ASCII hravě poradí. Tabulku, která uvádí, jak ASCII mapuje jednotlivé znaky na čísla, naleznete např.
[zde](https://www.asciitable.com/)[^2].

[^2]: V tabulce si můžete všimnout, že čísla nejsou znakům přiřazena
zcela náhodně, například znaky reprezentující číslice `0` až `9` mají přiřazena čísla ležící za sebou
(`48` - `57`), a stejně je tomu i u písmen anglické abecedy. Této vlastnosti můžeme využít pro
usnadnění některých textových [operací](../../ulohy/retezce.md#převod-textu-na-číslo).

## ASCII znaky v *C*
Jelikož ASCII "kóduje" pouze 128 znaků, tak pro reprezentaci ASCII znaku by nám stačilo 7 bitů.
Nicméně pracovat se sedmibitovými hodnotami by bylo poněkud nepraktické, proto se běžně ASCII znak
ukládá do jednobytového (osmibitového) čísla. V *C* se pro reprezentaci jednoho ASCII znaku používá
datový typ `char`[^3], s kterým jsme se
[již setkali](http://localhost:3000/c/datove_typy/celociselne_typy.html).

[^3]: *C* neobsahuje specializovaný typ pro jednobytové celé číslo, `char` tak reprezentuje jak
ASCII znak, tak i celé číslo s jedním bytem. Záleží pak na nás, jak budeme hodnotu v `char`u
interpretovat - jestli jako celé číslo nebo jako ASCII znak.

Pokud bychom chtěli do proměnné s typem `char` nějaký znak uložit, tak bychom mohli použít přímo
jeho číslo z ASCII [tabulky](https://www.asciitable.com/):
```c
char znak = 65; // tento znak bude reprezentovat písmeno A
```
Nicméně takto by si každý programátor musel nazpaměť pamatovat ASCII tabulku, což je dost nepraktické.
*C* tak nabízí zkratku v podobě **znakového literálu** (*char literal*). Pokud napíšete jeden ASCII
znak do apostrofů (`'`), tento výraz se vyhodnotí jako ASCII číselná hodnota daného znaku s datovým
typem `char`. Obvykle tak znaky v programech zadáváme v apostrofech pro zjednodušení:
```c
char znak = 'A'; // tento znak bude reprezentovat písmeno A
```
Pokud bychom si chtěli ověřit, že hodnota tohoto znaku je opravdu `65`, jak udává ASCII, můžeme
si ho vypsat na výstup programu jako číslo:
```c,editable,mainbody
#include <stdio.h>

int main() {
    char znak = 'A';
    printf("%d\n", (int) znak);
    return 0;
}
```

Do apostrofů nikdy nedávejte více než jeden znak! Překladač by se snažil takovýto zápis interpretovat
jako vícebytový znak, což téměř jistě není to, čeho chcete dosáhnout. Pro práci s textem (více znaky
najednou) slouží [řetězce](retezce.md). Jedinou výjimkou jsou speciální znaky, které se zapisují
pomocí zpětného lomítka, například:
- `'\n'` reprezentuje znak `LF`, který udává, že má dojít k přechodu kurzoru na nový řádek.[^4]
- `'\t'` reprezentuje znak `TAB`, který reprezentuje tabulátor.
- `'\0'` reprezentuje znak `NUL` s číselnou hodnotou `0`.

[^4]: Nepleťte si ho se znakem `'n'`, který reprezentuje klasické písmeno `n` z abecedy.

### Čísla vs znaky
Při používání apostrofů je mimo jiné třeba si dávat pozor na to, jestli pracujeme s číselnou
hodnotou nebo se znakem, který reprezentuje nějakou číslici. Například zde:
```c
char znak = 9;
```
Nedojde k uložení znaku `9` do proměnné. Bude do ní uložen znak `TAB`, který má v ASCII hodnotu `9`
a pomocí apostrofů ho lze zapsat jako `'\t'`. Pokud bychom do znaku chtěli zapsat znak reprezentující
číslici `9`, musíme použít buď literál `'9'` nebo číselnou hodnotu `57`, která devítku v ASCII
reprezentuje.

Pokud byste chtěli převést ASCII znak číslice na její číselnou hodnotu, stačí od něho odečíst hodnotu
`48`, neboli znak `'0'`. `'0' - '0'` je `0`, `'5' - `0'` je `5` atd. To je způsobeno tím, že číslice
v ASCII mají přiřazeny sekvenční číselné hodnoty.
