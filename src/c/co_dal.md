# Co dál?
*C* je relativně malý jazyk, pokud jste si tedy přečetli předchozí část tohoto textu, tak znáte
většinu důležitých konstrukcí, která jsou v *C* dostupné. Nicméně neukázali jsme si úplně všechny –
zde je seznam několika vybraných věcí, které byly buď moc pokročilé pro UPR anebo jsme je jednoduše
nepotřebovali použít:
- [**Variadiacké funkce**](https://en.cppreference.com/w/c/variadic) umožňují přijímat
libovolný počet parametrů (takto funguje například i nám známá funkce
[`printf`](https://devdocs.io/c/io/fprintf)).
- [**Enumerace**](https://en.cppreference.com/w/c/language/enum) (*enumerations*) umožňují
seskupit pojmenované konstanty.
- [**Sjednocené struktury**](https://en.cppreference.com/w/c/language/union) (*unions*)
umožňují interpretovat strukturu jako více různých datových typů.
- [**Bitová pole**](https://en.cppreference.com/w/c/language/bit_field) (*bit fields*)
umožňují rozdělit paměť struktury na úrovni jednotlivých bitů. 
- [**Široké znaky**](http://www.cplusplus.com/reference/cwchar/) (*wide chars*) a s nimi související
funkce standardní knihovny umožňují používat složitější kódování než ASCII.
- [**Komplexní čísla**](https://en.cppreference.com/w/c/numeric/complex) (*complex numbers*) vám
umožní pracovat s datovými typy reprezentujícími komplexní čísla.

> Pokud si chcete ověřit, jak jste na tom se znalostí jazyka *C*, projděte si tyto
> [slidy](../static/files/deepc.pdf). Pokud budete umět odpovídat jako blonďatý
> kluk, tak znáte základy jazyka *C*. Pokud budete umět odpovídat jako dívka s růžovými vlasy,
> tak už vás v jazyce *C* téměř nic nepřekvapí.

## Co se dále naučit
Se znalostí samotného jazyka *C* souvisí i spousta dalších konceptů, se kterými se postupně musíte
seznámit, pokud chcete opravdu dopodrobna pochopit, co přesně se v počítači děje, když spustíte
vámi napsaný program. Poté můžete těchto znalostí využít k tvorbě robustnějších a rychlejších
programů. Na následujících odkazech se můžete dozvědět například:
- Jak fungují [operační systémy](http://poli.cs.vsb.cz/edu/osy/osnova.html).
    - Nebo dokonce jak si nějaký [napsat od nuly](https://littleosbook.github.io/).
- Jak komunikovat s jinými programy po [síti](http://www.beej.us/guide/bgnet/).
- Jak psát programy přímo pomocí [instrukcí procesoru](http://poli.cs.vsb.cz/edu/soj/down/soj-skripta.pdf)
- Jak urychlit provádění programů:
    - Pomocí [vláken](https://computing.llnl.gov/tutorials/pthreads/), které umí využít potenciál
    vícejádrových procesorů.
    - Pomocí [vektorových instrukcí](https://www.youtube.com/watch?v=qejTqnxQRcw),
    které umí pracovat s více než jednou hodnotou najednou.
    - Pomocí pochopení [architektury procesoru](https://github.com/Kobzol/hardware-effects), která
    silně ovlivňuje výkon programů.
- Jak si napsat vlastní [překladač](https://www3.nd.edu/~dthain/compilerbook/compilerbook.pdf) či
[programovací jazyk](http://www.buildyourownlisp.com/chapter1_introduction).
- Jak si napsat vlastní [databázi](https://cstack.github.io/db_tutorial/).
- Jak funguje [počítačová grafika](http://mrl.cs.vsb.cz/people/fabian/pg1_course.html).
  - Můžete si napsat vlastní [3D herní engine](https://learnopengl.com/) pomocí OpenGL.
- Jak si napsat program pro nějaké vestavěné (*embedded*) zařízení, například [Arduino](https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink).
