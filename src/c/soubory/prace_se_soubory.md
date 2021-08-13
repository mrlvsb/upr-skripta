# Práce se soubory
Jakmile jsme se pokusili o otevření souboru, ujistili jsme se, že se to opravdu povedlo a získali
jsme ukazatel `FILE*`, můžeme začít do programu zapisovat nebo z něj číst data (podle toho, v jakém
módu jsme ho otevřeli).

## Pozice v souboru
Struktura `FILE` má vnitřně uloženou **pozici** v souboru, na které probíhají veškeré operace čtení
a zápisu. Pro zjednodušení práce se soubory se pozice automaticky posouvá dopředu o odpovídající
počet bytů po každém čtení či zápisu. Jakmile tedy přečtete ze souboru `n` bytů, tak se pozice posune
o `n` pozic dopředu. Pokud byste tedy dvakrát po sobě přečetli jeden byte ze souboru obsahující text
`ABC`, nejprve získáte znak `A`, a podruhé už znak `B`, protože po prvním čtení se pozice posunula
dopředu o jeden byte.

> Tím, že je pozice sdílená pro čtení a zápis, tak se raději vyvarujte současnému čtení i zápisu
> nad stejným otevřeným souborem. V opačném případě budete muset být opatrní, abyste si omylem
> nepřepsali data nebo nečetli data ze špatné pozice.

Současnou pozici v souboru můžete zjistit pomocí funkce [`ftell`](https://devdocs.io/c/io/ftell).
Pokud byste chtěli pozici ručně změnit, můžete použít funkci [`fseek`](https://devdocs.io/c/io/fseek),
pomocí které se také například můžete v souboru přesunout na začátek (např. abyste ho přečetli
podruhé) nebo na konec (např. abyste zjistili, kolik soubor celkově obsahuje bytů)[^1].

[^1]: Toho můžete dosáhnout tak, že pomocí `fseek(file, 0, SEEK_END)` přesunete pozici na konec
souboru, a dále pomocí `ftell(file)` zjistíte, na jaké pozici jste. To vám řekne, kolik má soubor
celkově bytů.

> Při použití módu `"a"` budou veškeré zápisy probíhat vždy na konci souboru. Tento mód se hodí
> například při zápisu do tzv. **logovacích souborů**, které chronologicky zaznamenávají události v
> programu (události tak vždy pouze přibývají). Zároveň se však po každém zápisu v tomto módu
> pozice posune na jeho konec. Raději tak nepoužívejte mód `"a+"`, který umožňuje zápis na konec i
> čtení. Práce s pozicí při současném zapisování i čtení je v takovémto módu totiž poněkud náročná.

Všimněte si, že při práci se `stdout` a `stdin` jsme s pozicí manipulovat nemohli. Je to proto, že
tyto dva deskriptory jsou z jistého pohledu "obecnější" než soubory. Můžou být přesměrované na
terminál, do souboru, ale klidně také i do jiného počítače přes síť. Tím, že nevíme, "co jsou zač",
tak si s nimi nemůžeme dovolit provádět některé operace, jako je právě manipulace s pozicí. Pokud
například odešleme data přes síť, už je nemůžeme "vrátit zpátky" změnou pozice. U souborů však
víme, že opravdu pracujeme se souborem, takže pozici pro zápis a čtení měnit můžeme.

## Zápis a čtení souborů
V následujících sekcích se dozvíte, jak [zapisovat](zapis_do_souboru.md) a [číst](cteni_ze_souboru.md)
ze souborů.
