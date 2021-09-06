# Otevírání souborů
Abychom mohli s nějakým souborem začít pracovat, musíme ho nejprve v našem programu otevřít, aby
byl vytvořen souborový deskriptor, do kterého pak můžeme zapisovat či z něho číst data. K tomu slouží
funkce [`fopen`](https://devdocs.io/c/io/fopen), která má následující
[signaturu](../funkce/funkce.md#syntaxe):
```c
FILE* fopen(const char* filename, const char* mode);
```

## Cesta k souboru
Jako svůj první parametr funkce `fopen` očekává řetězec s cestou k souboru, který má být otevřen.
Cestu můžete zadat dvěma způsoby:
- **Absolutní cesta** (*absolute path*) je cesta, která začíná kořenovým adresářem souborového
systému, například `/home/student/upr/soubor.txt`[^1]. Aby byla cesta absolutní, musí na Linuxu
začínat dopředným lomítkem.
- **Relativní cesta** (*relative path*) se vyhodnotí relativně k tzv. **pracovnímu adresáři**
(*working directory*) běžícího programu. Pokud spustíte váš program z terminálu, tak se pracovní
adresář implicitně nastaví na adresář, ze kterého jste program spustili. Pokud tedy například spustíte
váš program z adresáře `/home/student/upr` a funkci `fopen` předáte cestu `soubor.txt`, tak se funkce
pokusí otevřít soubor na cestě `/home/student/upr/soubor.txt`.

Při zadávání cesty můžete využít zkratky `.` a `..`, které jsou užitečné zejména u relativních cest:
- Zkratka `.` se odkazuje na současný adresář, `./soubor.txt` je tedy to samé jako `soubor.txt`.
- Zkratka `..` se odkazuje na rodičovský adresář, `../data/abc.txt` tedy říká:
`Podívej se do rodičovského adresáře, tam nalezni adresář data a v něm soubor abc.txt`.

Nepokoušejte se však zadávat cesty k neexistujícím adresářům. `fopen` sice umí vytvořit nový soubor
(pokud použijete odpovídající [mód](#mód-otevření)), neexistující adresář za vás nicméně nevytvoří.

> Doposud jsme používali prvky *C*, které byly vesměs nezávislé na použitém operačním systému. Jakmile
> ale naše programy začnou interagovat se **souborovým systémem** (*file system*), budeme muset začít
> respektovat zákonitosti operačního systému, na kterém náš program poběží. Proto například u cesty
> k souborům vždy používejte dopředná lomítka (`/`) pro oddělování adresářů, pokud program budete
> spouštět na Linuxu. 

[^1]: Na Windows by podobná cesta mohla vypadat například jako
`C:\Users\student\upr\soubor.txt`.

## Mód otevření
Druhým parametrem funkce `fopen` je řetězec, jehož obsah určuje, v jakém **módu** (*mode*) se má
soubor otevřít. Kompletní seznam všech kombinací módů naleznete v
[dokumentaci](https://devdocs.io/c/io/fopen), zde je seznam běžných variant:

| Mód | Možné operace | Co se stane, když už soubor existuje? | Co se stane, když soubor neexistuje? |
|:---:|:---:|:---:|:---:|
| `"r"` | Čtení | | chyba |
| `"w"` | Zápis | obsah souboru je smazán | soubor je vytvořen |
| `"a"` | Zápis na konci | | soubor je vytvořen |
| `"r+"` | Čtení, zápis | | chyba |
| `"w+"` | Čtení, zápis | obsah souboru je smazán | soubor je vytvořen |
| `"a+"` | Čtení, zápis na konci | | soubor je vytvořen |

Při otevírání souboru si musíte rozmyslet, jestli z něj chcete číst, zapisovat do něj nebo provádět
obojí. Zároveň si musíte určit, jestli chcete soubor vytvořit v případě, že neexistuje, popřípadě
jestli má být jeho obsah smazán, pokud už existuje. Podle těchto vlastností si pak zvolte odpovídající
mód otevření souboru.

### Textový vs binární režim
Pokud použijete jeden ze základních módů, soubor se otevře v tzv. **textovém režimu**. V tomto režimu
dochází ke konverzi určitých bytů při čtení a zápisu ze souboru. Asi nejdůležitějším znakem, který
je takto konvertován, je `'\n'`, neboli **odřádkování** (*newline*). Různé operační systémy totiž
při interpretaci souborů používají různé znaky pro odlišení situace, kdy má dojít k přesunu kurzoru
na nový řádek:
- `LF`: Linux a macOS[^2] používají pro konec řádku přímo ASCII znak `LF (line feed)`, který lze v
*C* zapsat jako `'\n'`.
- `CRLF`: Windows používá pro konec řádku dvojici ASCII znaků `CR (carriage return)` a `LF`
(v tomto pořadí). `CR` lze v *C* zapsat jako `'\r'`.

[^2]: V [dávných dobách](https://en.wikipedia.org/wiki/Classic_Mac_OS) používal Mac OS pro odřádkování
pouze znak `CR`.

Na Windows tak při zápisu do souborů otevřených v textovém módu dojde ke konverzi znaku odřádkování
`\n` na dvojici znaků `\r\n`. Stejně tak při načítání dat ze souboru se dvojice znaků `\r\n` převedou
na `\n`. Na Linuxu textový mód v podstatě nic nedělá, protože se zde pro odřádkování používá přímo
 znak `\n`.

Pokud byste však chtěli mít jistotu, že opravdu k žádné konverzi nedojde, a budete zapisovat data,
která nemají být interpretována jako text, můžete na konec módu přidat znak `b`. Poté se soubor
otevře v tzv. **binární režimu**, kde k žádné konverzi nedojde. Mód `"rb"` tak například říká
`Otevři soubor pro čtení v binárním režimu`.

> Pokud byste chtěli explicitně říct, že se má použít textový režim, můžete na konec módu přidat
> znak `t`. Například mód `"rt"` je ekvivalentní s módem `"r"` a označuje otevření souboru pro
> textové čtení.

### Ošetření chyb
Jakmile řeknete funkci `fopen` jaký soubor (a v jakém módu) má otevřít, funkce jej otevře a vrátí
vám ukazatel na strukturu `FILE`, pomocí které můžete se souborem dále pracovat[^3]. Stejně jako
u jakékoliv práce se vstupem a výstupem i při práci se soubory však může často docházet k různým
chybám.

[^3]: `FILE` je tzv. **neprůhledná** (*opaque*) struktura deklarovaná ve standardní knihovně *C*.
Nebudete přistupovat k žádným jejím členům, pouze budete ukazatel na ni posílat do různých funkcí
pro práci se soubory, abyste určili, s jakým (otevřeným) souborem chcete pracovat.

Pokud byste se například pokoušeli otevřít neexistující soubor v módu pro čtení `"r"`, dojde k chybě.
V takovém případě vám funkce `fopen` vrátí adresu nula (tzv. `NULL` ukazatel). Po každém pokusu o
otevření souboru byste tak měli ověřit, zdali se otevření opravdu podařilo nebo ne. Pokud při otevření
došlo k chybě, tak se do [globální proměnné](../promenne/globalni_promenne.md)
[`errno`](https://devdocs.io/c/error/errno) uloží číslo, které identifikuje, o jaký typ chyby šlo[^4].
K proměnné budete mít přístup, pokud do svého programu [vložíte](../preprocesor/vkladani_souboru.md)
soubor `<errno.h>`. Pomocí funkce [`strerror`](https://devdocs.io/c/string/byte/strerror) ze souboru
`<string.h>` pak můžete získat řetězec, který danou chybu popisuje:
```c
#include <stdio.h>
#include <errno.h>
#include <string.h>

int main() {
    FILE* soubor = fopen("soubor.txt", "r");
    if (soubor == NULL) {
        printf("Doslo k chybe pri otevirani souboru: %s\n", strerror(errno));
        return 1; // došlo k chybě, vrátíme 1 jako chybový stav programu
    }

    return 0;
}
```

[^4]: Seznam různých chybových hodnot, které se můžou v `errno` objevit, můžete naleznout například
[zde](https://www.thegeekstuff.com/2010/10/linux-error-codes/#optiontable).

### Použití `assert`
Pokud píšete malý program a nechce se vám ručně každou chybu ošetřovat, můžete využít
[makro](../preprocesor/makra.md) [`assert`](https://devdocs.io/c/error/assert) ze souboru `<assert.h>`.
Toto makro očekává pravdivostní hodnotu a kontroluje, zdali platí (`assert` znamená
`ujisti se, že platí …`). Pokud hodnota neplatí, tj. vyhodnotí se na `0` či `false`, tak dojde k
okamžitému ukončení vašeho programu. Nebudete tak sice moct ovlivnit vypsanou chybovou hlášku, ale
ošetření chyby se značně zjednodušší:
```c
FILE* soubor = fopen("soubor.txt", "r");
assert(soubor); // pokud je `soubor` roven `NULL`, program se zde ukončí
```

Ošetření chyb je dobré nepodceňovat. Pokud chybu ošetříte okamžitě po jejím možném vzniku (i kdyby
to mělo být okamžitým vypnutím programu), tak bude mnohem jednodušší zjistit, kde v kódu a proč vznikla.
Jinak se může jednoduše stát, že k chybě sice dojde, ale program bude pokračovat vesele dál. Tato
chyba pak může v průběhu programu způsobit kaskádu dalších chyb, které nakonec dříve či později povedou
k "spadnutí" nebo špatnému fungování programu. V takové situaci bude mnohem náročnější zjistit, kde
vznikla původní chyba, která vše způsobila, protože program může spadnout na úplně jiném místě v kódu. 

## Zavření souboru
Jakmile se souborem přestanete pracovat, je **nutné** ho zavřít. K tomu slouží funkce
[`fclose`](https://devdocs.io/c/io/fclose):
```c
FILE* soubor = fopen("soubor.txt", "w");
// zápis/čtení ze souboru…
fclose(soubor);
```
Funkce `fclose` vrací číselnou hodnotu, která oznamuje, zdali funkce proběhla v pořádku nebo ne.
Pokud funkce vrátí `0`, tak se soubor úspěšně uzavřel. I u zavírání souborů bychom tedy měli mít
alespoň základní ošetření chyb[^5]:
```c
assert(!fclose(soubor));
```

[^5]: Operátor `!` provede logickou negaci. Pokud jej použijeme s hodnotou `0`, vrátí hodnotu `1`.
Pokud jej použijeme s jakoukoliv jinou hodnotou, vrátí hodnotu `0`. Pokud tedy funkce `fclose` vrátí
cokoliv jiného než `0`, `assert` ukončí program.

Pokud bychom soubor nezavřeli, tak se například může stát, že kvůli použitému
[*bufferování*](../text/vstupavystup.md#standardní-souborové-deskriptory) by se data, která jsme do
souboru zapsali, nemusela objevit na souborovém systému.
