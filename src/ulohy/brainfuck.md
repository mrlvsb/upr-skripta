# Překladač jazyka Brainfuck

Jazyk [Brainfuck](https://esolangs.org/wiki/Brainfuck) je velmi jednoduchý esoterický programovací
jazyk obsahující pouze osm instrukcí, lineární paměť a adresu aktuální paměťové buňky. Jedna buňka
odpovídá jednomu bytu.

* Instrukce `+` inkrementuje hodnotu aktuální buňky.
* Instrukce `-` dekrementuje hodnotu aktuální buňky.
* Instrukce `>` inkrementuje adresu buňky (po inkrementaci ukazujeme na následující buňku).
* Instrukce `<` dekrementuje adresu buňky (po dekrementaci ukazujeme na předcházející buňku).
* Instrukce `[` uvozuje začátek cyklu. Cyklus probíhá, dokud hodnota buňky adresované v době
  vyhodnocování podmínky není nulová (adresovanou buňku můžeme měnit uvnitř cyklu).
* Instrukce `]` představuje konec těla cyklu. Jakmile program narazí na instrukce `]`, zkontroluje
  hodnotu v aktuálně adresované paměťové buňce, a buď se vrátí zpět na odpovídající `[`, nebo je
  cyklus ukončen a vykonávání programu pokračuje prováděním instrukcí bezprostředně za cyklem.
* Instrukce `,` přečte jeden byte ze vstupu a uloží hodnotu do aktuálně adresované buňky.
* Instrukce `.` vypíše hodnotu aktuálně adresované buňky jako ASCII znak na standardní výstup.

Všechny ostatní znaky jsou ignorovány.

Program `Hello, World!` v jazyce Brainfuck může vypadat například následovně:

```
++++++++
[
    >++++++++<-
]
>++++++++.>++++++++
[
    >++++++++++++<-
]
>+++++.+++++++..+++.>++++++++
[
    >+++++<-
]
>++++.------------.<<<<+++++++++++++++.>>.+++.------.--------.>>+.
```

Naprogramujte interpret jazyka Brainfuck. Interpret (angl. *interpreter*), je překladač, který
zdrojový kód vykonává při každém spuštění cílového programu. Program se tedy nikdy nekompiluje
do spustitelného binárního souboru.

## Implementace

* Program procházejte znak po znaku a jednotlivé instrukce interpretujte.
* Pokud narazíte na konec cyklu (`]`), stačí se vrátit v textu zpět na odpovídající `[`.
* Nezapomeňte, že cykly můžou být i vnořené.
* Paměť lze reprezentovat polem bytů fixní velikosti.
* Adresu lze reprezentovat indexem nebo ukazatelem.
* Vstup můžeme číst například pomocí `getc(stdout)`.
* Výstup můžeme realizovat pomocí funkce `putchar`.
* Při vstupu a výstupu paměť interpretujte jako ASCII znaky. V opačných případech ji lze
  interpretovat jako obyčejné číslo.
* Při přístupu mimo alokovanou paměť interpret vypíše chybu a překlad programu skončí.

## Ukázkové programy

Pro otestování svého překladače můžete využít například následující programy. Další programy
napsané v jazyce Brainfuck naleznete na internetu, případně si můžete zkusit napsat program
vlastní.

Hello, World:

```
++++++++[>++++++++<-]>++++++++.>++++++++[>++++++++++++<-]>+++++.+++++++..+++.>++++++++[>+++++<-]>++++.------------.<<<<+++++++++++++++.>>.+++.------.--------.>>+.
```

Echo (program opakující svůj vstup):

```
+[>,.<]
```

## Složitější varianta

Namísto pásky pevně dané velikosti naprogramujte paměť, která se bude zleva i zprava zvětšovat,
pokud se program pokusí přistoupit za hranice pásky.

Zkuste místo přímé interpretace vstupního řetězce nejprve sestavit
[abstraktní syntaktický strom (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
reprezentující daný program. Tvorba AST bude vyžadovat znalosti z pozdějších lekcí. Interpretujte
poté AST, ne přímo vstupní řetězec.

Při tvorbě AST proveďte základní optimalizace - například sérii inkrementací převeďte na jedno
přičtení většího čísla (tedy např. sérii osmi inkrementací převedeme na přičtení čísla osm).

Nakonec můžete zkusit namísto interpretace program zkompilovat. Kompilovat můžete například
do Assembly, nebo do [LLVM IR kódu](https://llvm.org/docs/LangRef.html). Výstup vašeho překladače
nakonec necháte přeložit assemblerem nebo LLVM.
