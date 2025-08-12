# Parametry překladače
Překladač GCC obsahuje sadu několika stovek parametrů, pomocí kterých můžeme ovlivnit, jak překlad
programu proběhne. Můžeme například určit, pro jaký procesor se mají vygenerovat instrukce, jakou
variantu jazyka *C* má překladač očekávat nebo jestli má náš program zoptimalizovat, aby běžel
rychleji.

> Kromě GCC existuje řada dalších překladačů *C*, například [Clang](https://clang.llvm.org/).
> Nejčastější parametry (jako je např. `-o`) obvykle fungují ve všech překladačích obdobně, každý
> překladač ale obsahuje sadu specifických parametrů, které můžete naleznout v jeho
> [dokumentaci](https://clang.llvm.org/docs/ClangCommandLineReference.html).

Seznam všech parametrů můžete naleznout v
[dokumentaci `gcc`](https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html), zde je uveden seznam
nejužitečnějších parametrů:
- **Optimalizace**: Existuje spousta parametrů, pomocí kterých můžete ovlivnit, jak překladač převede
váš zdrojový kód na strojové instrukce a jak je zoptimalizuje. Nejzákladnějším parametrem je `-O`:
    - `-O0` Nebudou použity téměř žádné optimalizace. Toto je implicitní nastavení,
    pokud ho nezměníte. Program v tomto stavu lze dobře [krokovat](../prostredi/ladeni.md#krokování),
    ale může být dost pomalý.
    - `-O1` Aplikuje základní optimalizace.
    - `-O2` Aplikuje nejužitečnější optimalizace. Pokud chcete získat rozumně rychlý program,
    doporučujeme použít tento mód. Díky němu může být program třeba až 1000x rychlejší než s `-O0`.[^1]
    - `-O3` Aplikuje ještě více optimalizací. Program tak může být ještě rychlejší než s `-O2`.
    Obecně při použití optimalizací však platí, že čím vyšší optimalizační stupeň, tím více hrozí,
    že se váš program přestane chovat správně, pokud program obsahuje jakékoliv
    [nedefinované chování](../c/promenne/promenne.md#vždy-inicializujte-proměnné). Je tak třeba dávat
    pozor na to, aby k tomu nedošlo.

    Kromě parametru `-O` lze použít spousty dalších parametrů, které ovlivňují například použití
    [vektorových instrukcí](../c/co_dal.md).
- **Ladění programu**:
    Jak už jste jistě poznali, při použití jazyka *C* je velmi jednoduché způsobit nějaké nedefinované
    chování, například nějakou [paměťovou chybou](../caste_chyby/pametove_chyby.md). Aby šlo tyto
    chyby detekovat, obsahují překladače tzv. *sanitizery*. Při použití sanitizeru se do vašeho
    programu přidají dodatečné instrukce, které poté při běhu programu kontrolují, jestli nedochází
    k nějakému problému. Cenou za tuto kontrolu je pomalejší běh programu (cca 2-5x). Sanitizery tak
    raději používejte pouze při vývoji programu.

    Existuje více [typů sanitizerů](https://gcc.gnu.org/onlinedocs/gcc/Instrumentation-Options.html),
    my si ukážeme dva:
    - `-fsanitize=address` Použije tzv. *Address Sanitizer*, který hlídá paměťové chyby, například
    přístup k nevalidní paměti nebo neuvolnění [dynamické paměti](../c/prace_s_pameti/dynamicka_pamet.md).
    Tento sanitizer je nesmírně užitečný a doporučujeme ho vždy používat při vývoji programů v *C*.
    - `-fsanitize=undefined` Použije tzv. *Undefined behaviour sanitizer*, který hlídá dodatečné
    situace, při kterých může dojít k nedefinovanému chování (kromě paměťových chyb).

    Obecně při ladění programu je taky vhodné vždy použít přepínač `-g`. Ten způsobí, že překladač
    přidá do výsledného spustitelného souboru informace o zdrojovém kódu (ty jinak ve spustitelném
    souboru chybí). Díky tomu budou sanitizery schopny zobrazit konkrétní řádek, na kterém vznikl
    nějaký problém a také půjde program ladit a krokovat. 
- **Analýza kódu**: Kromě sanitizerů, které kontrolují váš program za běhu, lze také spoustu chyb
odhalit již při překladu programu. Bohužel překladač `gcc` v implicitním módu není moc striktní a
některé vyloženě chybné situace vám promine a program přeloží, i když je již dopředu jasné, že při
běhu pak dojde např. k pádu programu. Abychom tomu předešli, můžeme zapnout při překladu dodatečná
**varování** (*warnings*), která nás mohou na potenciálně problematické situace upozornit:
    - `-Wall` Zapne sadu několika desítek základních varování.
    - `-Wextra` Zapne dodatečnou sadu varování.
    - `-Wconversion` Zapne detekci situací, kdy implicitní konverze mezi různými datovými typy
    může způsobit nežádoucí nebo neočekávané chování. Pokud je chování detekované touto analýzou
    žádoucí, je třeba provést explicitní přetypování.
    - `-pedantic` Zapne striktní kontrolu toho, že dodržujete předepsaný standard *C*. V kombinaci
    s tímto přepínačem byste také měli explicitně říct, který standard chcete použít. V UPR používáme
    standard *C99*, který lze zadat pomocí `-std=c99`.
    - `-Werror` Způsobí, že libovolné varování bude vnímáno jako chyba. Pokud tak
    v programu `gcc` nalezne jakoukoliv situaci, která vytvoří varování, program se nepřeloží.

    Pokud chcete mít při překladu co největší zpětnou vazbu od překladače a zajistit co největší
    "bezpečnost" vašeho programu, doporučujeme používat tuto kombinaci přepínačů:
    ```bash
    $ gcc -g -fsanitize=address -Wall -Wextra -Wconversion -pedantic -std=c99
    ```

[^1]: Anebo nemusí být rychlejší vůbec, záleží na programu.
