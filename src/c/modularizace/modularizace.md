# Modularizace
Prozatím byly naše programy tvořeny pouze jedním zdrojovým souborem. Pro krátké programy do pár
stovek řádků to stačí, nicméně asi si dovedete představit, že programy s tisíce či miliony řádky kódu
už se do jednoho souboru rozumně "nevlezou". V této sekci si tak ukážeme, jak programy v *C* rozdělit
do více zdrojových souborů.

Rozdělení programu do více souborů má spoustu výhod:
- *Větší přehlednost* - pokud by byl veškerý kód v jednom zdrojovém souboru, tak by se v takovém souboru
dalo u větších programů jen těžko vyznat. Pokud budou jednotlivé logické části programu umístěny
v samostatných souborech či adresářích, bude např. mnohem jednodušší najít část programu, kterou
chceme upravit.

    Například u hry bychom mohli rozdělit program do souborů `zvuk.c`, `grafika.c`, `ovladani_priser.c`,
    `zbrane.c`, `klavesnice.c`, `mys.c` atd. Pokud by některý z těchto souborů byl opět moc velký
    nebo složitý, můžeme jeho funkcionalitu rozdělit na více souborů.

- *Menší provázanost* - pokud je vše v jednom souboru, znamená to, že z libovolné funkce lze volat
všechny ostatní funkce (popř. používat všechny ostatní struktury atd.). Toto vede k situaci, kdy jsou
jednotlivé části programu na sobě vzájemně závislé a propojené. To možná zní nevinně, nicméně ve
skutečnosti to téměř nevyhnutelně vede k programu, který je velmi obtížné upravit. Pokud totiž
změníte jednu věc, často se musí změnit i všechny další věci (funkce, struktury), které na dané věci
závisí. Pokud závisí vše se vším, tak i malá změna v jedné části kódu může kaskádově vyvolat nutnost
upravit celý zbytek programu, což je náročné.

    Abychom tomu předešli, je vhodné učinit jednotlivé části programu samostatné, sdílet z nich se
    zbytkem kódu pouze to, co je opravdu potřeba, a zbytek funkcionality učinit "soukromý" pro daný
    soubor. Změny v těchto soukromých částích pak nemohou ovlivnit zbytek kódu, protože ten na nich
    nebude závislý.
 
- *Efektivnější spolupráce v týmu* - rozdělení na více souborů také usnadní týmovou spolupráci.
Pokud budou jednotliví programátoři upravovat jiné soubory, bude mnohem menší riziko tzv. "souběhu",
kdy by jejich změny ve stejném souboru mohly kolidovat. Tyto problémy pak dále řeší tzv.
[verzování](https://cs.wikipedia.org/wiki/Verzov%C3%A1n%C3%AD), o kterém se dozvíte v navazujících
předmětech.

- *Znovuvyužití kódu* - pokud by každý program musel implementovat veškerou funkcionalitu od nuly,
tak by bylo programování i jednoduchého programu nesmírně náročné.[^1] V rámci jednoho programu s
můžeme nějakou ucelenou funkcionalitu (např. sadu funkcí spolu se strukturami) vyčlenit do
samostatného souboru, což nám umožní ji opakovaně používat z ostatních souborů v našem programu.
Napříč programy pak můžeme sdílet kód pomocí tzv. **knihoven** (*libraries*). Pro obojí musíme umět
používat kód, který se nenachází ve zdrojovém souboru, ze kterého ho chceme využít.

[^1]: Ostatně například bez [standardní knihovny *C*](../funkce/stdlib.md) bychom v našem programu
ani nebyli schopni něco vypsat do terminálu.

V programovacích jazycích se obecně různé samostatné části kódu, které jsou typicky umístěny v
adresářích či souborech, a starají se o konkrétní funkcionalitu v programu, nazývají *moduly*.
Proto je tato sekce nazvána modularizace. Jedná se však spíše o obecný pojem, v jazyce *C* se přímo
s pojmem modul zase tak běžně nesetkáte.

Postupně si ukážeme:
- jak funguje překlad programů [s více zdrojovými soubory](linker.md)
- jak používat funkce a proměnné [z jiných souborů](pouzivani_kodu_z_jinych_souboru.md)
- jaké jsou konvence pro používání [více zdrojových souborů v C](hlavickove_soubory.md)
- jak používat kód, který napsal někdo jiný, a nasdílel ho v podobě [knihovny](knihovny.md)
- jak [zautomatizovat překlad](automatizace_prekladu.md) programů skládajících se z více zdrojových
souborů
