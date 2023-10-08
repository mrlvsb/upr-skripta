# Překladač jazyka Brainfuck

Jazyk [Brainfuck](https://esolangs.org/wiki/Brainfuck) je velmi jednoduchý esoterický programovací
jazyk obsahující pouze osm operátorů, lineární paměť a adresu aktuální paměťové buňky. Jedna buňka
odpovídá jednomu bytu.

* Operátor `+` inkrementuje hodnotu aktuální buňky.
* Operátor `-` dekrementuje hodnotu aktuální buňky.
* Operátor `>` inkrementuje adresu buňky (po inkrementaci ukazujeme na následující buňku).
* Operátor `<` dekrementuje adresu buňky (po dekrementaci ukazujeme na předcházející buňku).
* Operátor `[` uvozuje začátek cyklu. Cyklus probíhá, dokud hodnota buňky adresované v době
  vyhodnocování podmínky není nulová (adresovanou buňku můžeme měnit uvnitř cyklu).
* Operátor `]` představuje konec těla cyklu, ale nereprezentuje žádné chování.
* Operátor `,` přečte jeden byte ze vstupu a uloží hodnotu do aktuálně adresované buňky.
* Operátor `.` vypíše hodnotu aktuálně adresované buňky jako ASCII znak na standardní výstup.

Všechny ostatní znaky jsou ignorovány.

Naprogramujte interpret jazyka Brainfuck. Interpret (angl. *interpreter*), je překladač, který
zdrojový kód překládá při každém spuštění cílového programu. Program se tedy nikdy nekompiluje
do spustitelného binárního souboru.

## Implementace

* Program procházejte znak po znaku a jednotlivé operátory interpretujte.
* Pokud narazíte na konec cyklu (`]`), stačí se vrátit v textu zpět na odpovídající `[`.
* Nezapomeňte, že cykly můžou být i vnořené.
* Paměť lze reprezentovat polem bytů fixní velikosti.
* Adresu lze reprezentovat indexem nebo ukazatelem.
* Vstup můžeme číst například pomocí `getc(stdout)`.
* Výstup můžeme realizovat pomocí funkce `putchar`.
* Při přístupu mimo alokovanou paměť interpret vypíše chybu a překlad programu skončí.

## Složitější varianta

Namísto pásky pevně dané velikosti naprogramujte paměť, která se bude zleva i zprava zvětšovat,
pokud se program pokusí přistoupit za hranice pásky.

Zkuste místo přímé interpretace vstupního řetězce nejprve sestavit
[abstraktní syntaktický strom (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
reprezentující program. Tvorba AST bude vyžadovat znalosti z pozdějších lekcí. Interpretujte poté
AST, ne přímo vstupní řetězec.

Při tvorbě AST proveďte základní optimalizace - například sérii inkrementací převeďte na jedno
přičtení většího čísla.

Nakonec můžete zkusit namísto interpretace program zkompilovat. Kompilovat můžete například
do Assembly, nebo do [LLVM IR kódu](https://llvm.org/docs/LangRef.html). Výstup vašeho překladače
nakonec necháte přeložit assemblerem nebo LLVM.
