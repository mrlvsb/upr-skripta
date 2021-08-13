# Linker
V této sekci si vysvětlíme detailněji, jak probíhá překlad *C* programů, jehož základní fungování
již bylo stručně popsáno v sekci o [překladu](../../prostredi/preklad_programu.md). Díky tomu pak
budeme schopni vytvářet programy skládající se z více než jednoho zdrojového souboru.

Prozatím jsme naše programy (skládající se z jediného zdrojového souboru) překládali pomocí
příkazu podobnému tomuto:
```bash
$ gcc soubor.c -o program
```
Tímto příkazem jsme ve skutečnosti prováděli dvě věci najednou: **překlad** (*translation*) a
**linkování** (*linking*). Níže si vysvětlíme obě dvě tyto části detailněji.

> Překlad a linkování se dohromady nazývá **kompilace** programu.  

## Překlad programu
Programy v *C* se skládají z jedné či více tzv. **jednotek překladu** (*translation unit*). Jedná se
o nezávislé komponenty, ze kterých je nakonec vytvořen cílový program. Každá jednotka je obvykle
tvořena jedním zdrojovým souborem (obvykle s příponou `.c`). Při překladu **překladač** převede
jednotku ze zdrojového kódu v *C* do instrukcí procesoru, tzv. **objektového kódu** (*object code*).

Pokud chceme překladačem `gcc` (pouze) přeložit zdrojový soubor do objektového kódu (resp.
objektového souboru), můžeme použít přepínač `-c`:
```bash
$ gcc -c soubor.c
```
Pokud nezadáme název výstupu pomocí přepínače `-o`, tak `gcc` implicitně vytvoří objektový soubor
`<nazev-vstupu>.o` (tj. zde `soubor.o`).

Jednotky překladu jsou na sobě nezávislé, můžeme tedy každou jednotku (zdrojový soubor) přeložit
zvlášť:
```bash
$ gcc -c a.c
$ gcc -c b.c
...
```

Jak ale nyní jednotlivé soubory propojíme? Aby vůbec mělo rozdělení do více jednotek (souborů) smysl,
tak musíme mít možnost v jednom souboru používat kód (např. funkce nebo globální proměnné), který je
nadefinovaný v jiném souboru. V *C* toto propojení jednotek neprobíhá při překladu, ale až v následné
fázi nazývané linkování.

## Linkování programu
Jakmile přeložíme všechny naše zdrojové soubory postupně do objektových souborů, potřebujeme z nich
vytvořit finální spustitelný soubor, což je práce programu nazývaného **linker**. Linker obdrží
seznam všech (již přeložených) objektových souborů, ze kterých se má program skládat, propojí je
dohromady a vytvoří z nich spustitelný soubor.

Jak propojení jednotlivých souborů probíhá? Představme si například, že v souboru `a.c` voláme
funkci `foo`, která v tomto souboru neexistuje. Při překladu tohoto souboru překladač vytvoří
objektový soubor `a.o`, ve kterém bude uložena informace, že voláme funkci `foo`. Dejme tomu, že
tato funkce existuje v souboru `b.c`, který je přeložen do objektového souboru `b.o`. Při linkování
linker obdrží seznam všech objektových souborů, tedy `a.o` i `b.o`. Když narazí na informaci, že z
`a.o` chceme volat funkci `foo`, pokusí se tuto funkci naleznout v některém z předaných objektových
souborů:
- Pokud jej nenalezne, tak vypíše chybu a program se nepřeloží[^1].
- Pokud jej nalezne (v tomto případě v `b.o`), tak volání funkce "propojí" tak, aby se volala správná
funkce původně vytvořená v `b.c`.

[^1]: V takovém případě byste se setkali s chybou `undefined reference to 'foo'`.

Manuální použití linkeru[^2] je relativně složité, proto i linker budeme používat přes `gcc`. Tomu
můžeme předat sadu objektových souborů a on se postará o správné zavolání linkeru, který je spojí
a vytvoří finální spustitelný soubor:
```bash
$ gcc a.o b.o -o program
```

[^2]: Na Linuxu lze použít například linker `ld`.

Při finálním linkování programu také dochází ke kontrole toho, jestli je v některém z objektových
souborů obsažena funkce `main`, aby program věděl, kde má začít své vykonávání.

#### Proč takto složitě?
Možná vás napadlo, proč kompilace *C* programů probíhá takto komplikovaně a nestačí prostě překladači
dát všechny zdrojové soubory našeho programu tak, jak jsme to dělali doposud:
```bash
$ gcc soubor1.c soubor2.c soubor3.c ...
```

Ve skutečnosti i to lze provést (tento postup se nazývá tzv. **unity build**). Nicméně má velkou
nevýhodu. Pokud bychom překládali celý náš program najednou, při sebemenší změně kódu bychom museli
přeložit všechny soubory znovu. Pokud bychom tak měli obrovský program s tisícem zdrojových souborů
a změnili jeden znak v jednom souboru, muselo by se všech tisíc souborů přeložit znovu, což může být
dost pomalé[^3].

Pokud překládáme každý soubor zvlášť, tak po změně v jednom souboru stačí přeložit daný soubor a znovu
slinkovat všechny objektové soubory (ty původní můžeme znovuvyužít, protože se nezměnily). To je u
velkých programů mnohem rychlejší než překládat vše od nuly.

[^3]: Velké programy v *C* může trvat přeložit klidně i několik hodin nebo dokonce dnů!

Navíc pokud bychom se nanučili používat zvlášť překladač a linker, nemohli bychom používat
[knihovny](knihovny.md), u kterých obvykle nemáme přístup k samotnému zdrojovému kódu, ale pouze k
již přeloženému objektovému kódu[^4].

[^4]: Například proto, aby autor knihovny zatajil původní zdrojový kód, který je jeho duševním
vlastnictvím.