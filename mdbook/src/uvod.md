# Úvod

Tento text vznikl pro potřeby výuky předmětu Úvod do programování.
Studentům by měl sloužit pro získání nutného minima znalostí ke
zvládnutí programování v jazyce kurzu – tedy jazyka C [@chist]. V žádném
případě však není text plnohodnotnou náhradou za poslechy přednášek a
návštěvy cvičení. Studentům je tudíž velmi doporučeno, aby přednášky a
cvičení navštěvovali. Tento text si též neklade za cíl vytvořit
kompletního průvodce jazykem C. Pro takovýto účel lze doporučit některý
knižní titul, např.: [@herout].

## Úvod do kompilovaných jazyků

Jednotlivé programy jsou tvořeny zdrojovými kódy, které jsou kombilovány
do strojového kódu, který je následně spuštěn na hardware, pro který byl
zkompilován[^3]. Jazyk C je multiplatformní, což znamená, že stený kód je
možno zkompilovat na různých platformách a následně spouštět. To je
poněkud rozdíl oproti tzv. interpretovaným jazykům, které jsou čteny a
spouštěny za běhu speciálním programem, tzv. interpretem (odpadá zde
tedy nutnost kompilace). Mezi takové jazyky patří např. Python,
JavaScript (ECMAScript), do jisté mírý i Java nebo C#, a další.

Jazyk C teží z toho, že byl navržen jako nádstavba nad assemblerem, což
je jazyk symbolických instrukcí procesou. Výsledný program je tak velice
rychlý. Proto se drtivá většina systémových aplikací píše v jazyce C.
Jazyk C je používán všude
tam, kde je nutné mít plnou kontrolu nad prostředky počítače. Proto je C
typický jazyk pro psaní jader operačních systémů[^2]. Nad takovéto
zdrojové kódy je pak možno dopsat skriptovací vrstvu, která usnadňuje
práci pro rychlejší vývoj aplikací. Skripty tak najdeme u her (Quake),
grafických uživatelských rozhraní (XULRunner v produktech Mozilla),
apod. Skriptovacími jazyky se budem zabývat v jednom z dalších předmětů.

**Výhody:**

- Rychlost. Program běží přímo na HW bez dalších mezivrstev,
- nižší paměťová náročnost. Máme plnou kontrolu nad pamětí.

**Nevýhody:**

- Je nutné provádět po každé změně kódu kompilaci,
- obtížnější údržba, vývoj a správa kódu.

## Programovací jazyk C

Jazyk C je kompilovaný, procedurální, a strukturovaný programovací
jazyk, který v roce 1972 navrhli Dennis Ritchie and Ken Thompson. Jazyk
C je ISO standardem, jehož poslední revizí je C18 (ISO/IEC 9899:2018
[@iso-c18]). Pro jazkyk C existuje několik kompilátorů. Namátkou vyberme
např.: [GCC](https://www.gnu.org/software/gcc/), Clang, Intel C, Microsoft Visual C++.


[^1]: https://en.wikipedia.org/wiki/Restrict

[^2]: http://kernel.org

[^3]: The C++ Build Process Explained, http://github.com/green7ea/cpp-compilation