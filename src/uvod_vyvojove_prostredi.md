## Vývojové prostředí

Pro práci v jazyce C můžete použít jak textový editor a kompilaci a
spuštění na příkazové řádce, tak samozřejmě několik vývojových
prostředí. K takovým prostředím patří např. MS Visual Studio, QtCreator,
JetBrains CLion, CodeBlocks, apod.

Ukažme si tedy nejjednodušší program, který na konzoli vypíše text
,,Hello, World!".

```c
#include <stdio.h>

int main( int argc, char **argv ) {
    printf( "Hello, World!" );
}
```

Na prvním řádku provádím načtení tzv. hlavičkového souboru, který nám
zajišťuje vstup a výstup programu. Následně je definována funkce `main`, která
je vstupním bodem každého programu. Bez definice této funkce nepůjde náš
program slinkovat a následně spustit. Funkce `printf` slouží pro tisk řetězce
znaků na výstup. Po volání této funkce vidíme výsledek v konzoli, ve které jsme program spustili.

**Cvičení:** Vytvořte si jednoduchý program, který vypíše
na výstup řetězec ,,Hello, World!" a ověřte jeho funkcionalitu.
