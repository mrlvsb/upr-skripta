# Pole
Počítače slouží k (rychlému) zpracování velkého objemu dat, běžně tak v programech potřebujeme
zpracovávat mnoho proměnných najednou. Například:
- V dokumentu otevřeném ve Wordu můžete mít uložené tisíce různých znaků.
- Na server v online hře může v danou chvíli být připojené velké množství hráčů a všem musíme
posílat informace o stavu hry.
- Obrázky se běžně v programech reprezentují jako 2D mřížka pixelů. Například černobílý obrázek
s rozměry `1024x1024` vyžaduje držet v paměti `1048576` bytů (čísel) reprezentujících jednotlivé
pixely.

Asi si dovedete představit, že například pro reprezentaci obrázku bychom si s proměnnými, které jsme
používali doposud, nevystačili. Pokud bychom po jedné vytvářeli proměnné `pixel1`, `pixel2`,
`pixel3`, tak by jednak byl náš zdrojový kód obrovský a nedalo by se v něm vyznat, a také bychom
nemohli mít velikost obrázku závislou na vstupu programu, protože počet proměnných by byl
"zadrátovaný" ve zdrojovém kódu programu. Chtěli bychom tak mít možnost napsat kód, který bude umět
zpracovat 1, 2, 100 nebo 1000 hodnot bez toho, abychom tento kód museli jakkoliv měnit.

Asi nejběžnějším a nejjednodušším způsobem, jak v paměti počítače uchovávat větší množství hodnot,
je uložit všechny hodnoty jednu po druhé za sebou v paměti[^1]. Tento koncept uložení dat se nazývá
**pole** (*array*) a je tak běžný, že ho programovací jazyky obvykle přímo podporují, a jazyk *C*
není výjimkou.

[^1]: Způsoby, jak v paměti počítače uchovávat komplexní a rozsáhlá data, se nazývají
[datové struktury](https://cs.wikipedia.org/wiki/Datov%C3%A1_struktura). Pole je jednou z
nejjednodušších datových struktur.

V následujících sekcích se dozvíte, jak s poli pracovat, jak je vytvořit v
[automatické](staticke_pole.md) a [dynamické paměti](dynamicke_pole.md) a jak lze v počítači
reprezentovat [vícerozměrná pole](vicerozmerne_pole.md).
