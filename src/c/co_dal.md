# Co dál?
*C* je relativně malý jazyk, pokud jste si tedy přečetli předchozí část tohoto textu, tak znáte
většinu důležitých prvků, která jsou v *C* dostupné. Nicméně neukázali jsme si úplně všechny – zde
je seznam několika vybraných věcí, které byly buď moc pokročilé pro UPR anebo jsme je jednoduše
nepotřebovali použít:
- [**Variadiacké funkce**](https://en.cppreference.com/w/c/variadic), které umožňují přijímat
libovolný počet parametrů (takto funguje například i nám známá funkce
[`printf`](https://devdocs.io/c/io/fprintf)).
- [**Ukazatele na funkce**](https://www.cprogramming.com/tutorial/function-pointers.html)
(*function pointers*), které umožňují ukládat adresy funkcí do ukazatelů.
- [**Enumerace**](https://en.cppreference.com/w/c/language/enum) (*enumerations*), které umožňují
seskupit pojmenované konstanty.
- [**Sjednocené struktury**](https://en.cppreference.com/w/c/language/union) (*unions*), které
umožňují interpretovat strukturu jako více různých datových typů.
- [**Bitová pole**](https://en.cppreference.com/w/c/language/bit_field) (*bit fields*), která
umožňují rozdělit paměť struktury na úrovni jednotlivých bitů. 

Pokud si chcete ověřit, jak jste na tom se znalostí jazyka *C*, projděte si tyto
[slidy](https://www.slideshare.net/olvemaudal/deep-c). Pokud budete umět odpovídat jako blonďatý
kluk, tak znáte základy jazyka *C*. Pokud budete umět odpovídat jako dívka s růžovými vlasy,
tak už vás v jazyce *C* téměř nic nepřekvapí.

Se znalostí samotného jazyka *C* souvisí i spousta dalších konceptů, se kterými se postupně musíte
seznámit, pokud chcete opravdu dopodrobna pochopit, co přesně se v počítači děje, když spustíte
vámi napsaný program. Poté můžete těchto znalostí využít k tvorbě robustnějších a rychlejších
programů. Na následujících odkazech se můžete dozvědět například:
- Jak fungují [operační systémy](http://poli.cs.vsb.cz/edu/osy/osnova.html).
    - Nebo dokonce jak si nějaký [napsat od nuly](https://littleosbook.github.io/).
- Jak komunikovat s jinými programi po [síti](http://www.beej.us/guide/bgnet/).
- Jak psát programy pomocí [instrukcí procesoru](http://poli.cs.vsb.cz/edu/soj/down/soj-skripta.pdf)
- Jak urychlit provádění programů:
    - Pomocí [vláken](https://computing.llnl.gov/tutorials/pthreads/), které umí využít potenciál
    vícejádrových procesorů.
    - Pomocí [vektorových instrukcí](http://www.cs.uu.nl/docs/vakken/magr/2017-2018/files/SIMD%20Tutorial.pdf),
    které umí pracovat s více než jednou hodnotou najednou.
    - Pomocí pochopení [architektury procesoru](https://github.com/Kobzol/hardware-effects), která
    silně ovlivňuje výkon programů.
- Jak si napsat vlastní [překladač](https://www3.nd.edu/~dthain/compilerbook/compilerbook.pdf),
abyste pochopili, jak funguje.
