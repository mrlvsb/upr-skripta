# Funkce standardní knihovny
Když už nyní víme, co jsou to [funkce](funkce.md), tak si můžeme vysvětlit, odkud
se berou některé funkce, které jsme doposud používali, i když jsme je sami nenapsali.

Například příkaz `printf("…")` je volání funkce s názvem `printf`. Tato funkce pochází ze
**standardní knihovny C** (*C standard library*). Jedná se o sadu užitečných funkcí, které jsou tak
často využívané, že jsou implicitně překladačem přidány k vašemu programu, abyste je mohli využít
a nemuseli ztrácet čas jejich psaním v každém programu od nuly.

Tyto funkce se starají například o následující oblasti:
- Čtení ze vstupu programu a zápis na výstup programu (například funkce `printf`)
- [Dynamická alokace](../prace_s_pameti/dynamicka_pamet.md) paměti
- Čtení a zápis [souborů](../soubory/soubory.md) na disku
- [Generování náhodných čísel](../../ruzne/nahodna_cisla.md)
- [Práce s textem](../text/text.md)
- [Práce s časem a datem](http://www.cplusplus.com/reference/ctime/)

a mnoho dalších.

Abychom mohli tyto funkce používat, potřebujeme v našem programu vložit kód, který obsahuje
signatury těchto funkcí. Toho dosáhneme pomocí použití [preprocesoru](../preprocesor/preprocesor.md)
– zde se dozvíte, jak funguje příkaz `#include <…>`, který jsme doposud používali jako "black box".

Seznam funkcí dostupných v standardní knihovně můžete naleznout například
[zde](https://www.cplusplus.com/reference/clibrary/)[^1].

[^1]: Dívejte se pouze na funkce pro `C99`, a ne na funkce `C++`. Jedná se o jiný jazyk.

Jak je standardní knihovna *C* připojena k vašim programům a jak si vytvořit vlastní knihovnu se
dozvíme později v sekci o [knihovnách](../modularizace/knihovny.md).
