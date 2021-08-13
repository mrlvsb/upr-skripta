# Knihovny
Nyní už známe vše potřebné na to, abychom si rozdělili náš vlastní program do libovolného množství
zdrojových souborů. Často také ale budeme chtít používat kód, který už před námi napsal někdo jiný.
Pokud bychom si totiž museli vše psát od nuly, tak bychom se daleko nedostali[^1], respektive trvalo
by nám to dlouho.

[^1]: I když napsat si nějaký systém "od nuly" je dobrý způsob, jak se
[zlepšit v programování](../co_dal.md#co-se-dále-naučit).

Aby programátoři mohli sdílet svůj kód s ostatními programátory, tak využívají tzv. **knihovny**
(*libraries*). Knihovna je kód, který řeší nějakou ucelenou funkcionalitu (např.
[vykreslování grafiky](https://www.libsdl.org/), [sazbu fontů](https://www.freetype.org/) nebo
[kompresi dat](http://zlib.net/)) a obsahuje návod (dokumentaci), jak tento kód používat. Klíčové
vlastnosti knihoven jsou znovupoužitelnost (můžeme je použít v různých programech) a abstrakce
(nemusíme rozumět, jak knihovna funguje, pouze ji využijeme k vyřešení konkrétního problému).

> Knihovna není program – neobsahuje žádnou funkci `main` a nelze ji ani přímo spustit. V kontextu
> jazyka *C* je knihovna typicky sada funkcí, struktur a globálních proměnných.

Například pokud bychom programovali hru, můžeme využít knihovny na vykreslení grafiky, na přehrávání
zvuku, na snímání vstupu z klávesnice nebo myši atd. Náš kód se pak může zabývat zejména logikou hry
a nemusí tolik řešit problémy, které již vyřešila spousta programátorů před námi.

Na internetu můžete naleznout [tisice různých knihoven](https://github.com/kozross/awesome-c),
které řeší rozlišné problémy.

## Sdílení knihoven
Teoreticky bychom mohli knihovny používat prostě tak, že si nějakou najdeme na internetu, stáhneme
její hlavičkové a zdrojové soubory k našeho programu a začneme je využívat. I když i tak to lze někdy
udělat, není to obvyklé, protože tento přístup má spoustu nevýhod:
- Jelikož obvykle nebudeme autory knihovny, kterou chceme použít, tak nemusíme ani být schopní
danou knihovnu přeložit. Potřebuje daná knihovna konkrétní překladač nebo jeho specifické nastavení?
Má závislosti na dalších knihovnách? Přeložit "cizí" knihovnu ze zdrojových souborů nemusí být
zdaleka přímočaré.
- Pokud dojde k vydání nové verze knihovny, která může přinášet opravy chyb a novou funkcionalitu,
museli bychom (kromě potenciální úpravy našeho kódu) také překopírovat nebo správně upravit nové a
změněné soubory knihovny, což by bylo náročné a náchylné na chyby.
- Zdrojový kód knihoven není vždy zveřejněn, například aby si jejich autoři uchránili duševní
vlastnictví. Často se tak setkáme se situací, že máme k dispozici pouze objektový kód (např. `.so`
nebo `.dll`) a nemůžeme tak získat zdrojové soubory knihovny.

Z tohoto důvodu jsou knihovny obvykle sdíleny ve formě objektových souborů (ty obsahují implementaci
funkcí) a odpovídajících hlavičkových souborů (ty obsahují
[deklarace](pouzivani_kodu_z_jinych_souboru.md#deklarace-vs-definice), aby šlo knihovnu jednoduše
používat).

## Statické vs dynamické knihovny
Předávat překladači desítky či stovky objektových souborů by bylo docela nepraktické, proto se tyto
soubory při distribuci knihovny balí do jednoho či více archivů, které mají standardizovaný formát
a překladače s nimi umí přímo pracovat. Knihovna může být distribuována v jednom ze dvou typů archivů,
které určují to, jak bude daná knihovna "přilinkována" (připojena) k našemu programu:
- **Dynamická knihovna** (*dynamic library*) - objektové soubory takovéto knihovny nebudou součástí
našeho programu (tj. nebudou obsaženy ve spustitelném souboru, který bude vytvořen překladačem).
K jejich načtení dojde až "dynamicky" při spuštění programu[^2].

    Výhody tohoto přístupu jsou, že bude mít náš spustitelný soubor menší velikost, a to jak na disku,
    tak v operační paměti. Operační systém totiž dokáže jednu dynamickou knihovnu sdílet mezi více
    programy najednou. Dynamickou knihovnu také půjde aktualizovat bez nutnosti překládat znovu náš
    program a můžeme také při spuštění programu knihovnu
    [nahradit jinou implementací](https://stackoverflow.com/questions/426230/what-is-the-ld-preload-trick).

    Nevýhodou je, že při spuštění našeho programu musíme zajistit, že knihovna bude na daném systému
    k dispozici (pokud by nebyla nalezena, tak program nepůjde spustit). To může způsobovat problémy
    zejména při distribuci našeho programu na jiné počítače. Kvůli tomu, že se knihovna načítá
    dynamicky, také může v určitých případech být její použití méně efektivní než v případě statické
    knihovny.

    Archivy s objektovými soubory dynamických knihoven mají příponu `.so`.

- **Statická knihovna** (*static library*) - objektové soubory takovéto knihovny budou přímo přibaleny
k našemu programu (jako bychom je přímo jeden po druhém předali překladači).

    Výhody tohoto přístupu jsou, že náš program bude "samostatný" – knihovnu bude obsahovat uvnitř
    svého spustitelného souboru, takže nebude nutné ji mít dostupnou na cílovém systému (narozdíl
    od dynamické knihovny).

    Nevýhodou je, že výsledný spustitelný soubor bude větší a knihovnu nepůjde aktualizovat bez
    opětovného překladu celého programu.

    Archivy s objektovými soubory statických knihoven mají příponu `.a`.

[^2]: O toto načítání se stará tzv. [dynamický linker](https://man7.org/linux/man-pages/man8/ld.so.8.html).

> Názvy přípon statických a dynamických knihoven závisí na operačním systému. Například na Windows
> se můžete setkat s příponami `.lib` pro statické knihovny a `.dll` pro dynamické knihovny.

## Použití knihoven s `gcc`
Nyní si ukážeme, jak říct překladači `gcc`, aby připojil nějakou knihovnu k našemu programu. Pro to
musíme mít k dispozici archiv s objektovými soubory knihovny (s příponou `.a` nebo `.so`, v
závislosti na typu knihovny) a obvykle také i adresář s hlavičkovými soubory knihovny.

Nejprve si ukážeme, jak překladači předat cestu k hlavičkovým souborům knihovny. Ty obvykle nebudou
součástí našich zdrojových kódů, ale budou nainstalovány v nějakém systémovém adresáři (jako tomu je
např. u `stdio.h`). Budeme je tedy chtít [vkládat](../preprocesor/vkladani_souboru.md) pomocí syntaxe
`#include <>`. Překladači můžeme předat dodatečné adresáře, ve kterých má hledat (hlavičkové) soubory
pro vkládání, pomocí přepínače `-I`. Pokud bychom tak měli hlavičkové soubory knihovny např. v
adresáři `/usr/foo/include`, tak překladači při překladu předáme přepínač `-I/usr/foo/include`.

Dále je třeba překladači říct, které archivy s objektovými soubory knihovny má k našemu programu
přilinkovat. K tomu slouží dva přepínače. `-L` udává adresář, ve kterém se budou vyhledávat knihovny
a `-l` poté specifikuje konkrétní knihovnu, která má být přilinkována k našemu programu. Pokud bychom
tak měli například archiv knihovny v souboru `/usr/foo/lib/libknihovna.so`, tak překladači předáme
parametry`-L/usr/foo/lib` a `-lknihovna`. Při použití přepínače `-l` je třeba si dávat pozor na dvě
věci:

- Všimněte si, že se použila zkrácená konvence pro pojmenování knihovny. Obecně se knihovny
pojmenovávají `lib<název>.so` (nebo `lib<název>.a`) a překladači se poté předává pouze jejich název,
tj. `-l<název>`.
- Přepínač `-l` se aplikuje na zdrojové/objektové soubory, které byly v příkazové řádce zadány před
ním. Používejte jej tedy až po předání vašich zdrojových souborů:
    ```bash
    # správně
    $ gcc main.c -lknihovna
    
    # špatně
    $ gcc -lknihovna main.c
    ```

Celý příkaz pro připojení knihovny k vašemu programu by tak mohl vypadat např. takto:
```bash
$ gcc -o program main.c -L/usr/foo/lib/ -lfoo -I/usr/foo/include
```

### Předání cesty k dynamické knihovně
Pokud přeložíte program s dynamickou knihovnou, může se stát, že při jeho spuštění nebude schopen
danou knihovnu najít. V takovém případě při spuštění programu můžete pomocí
[**proměnné prostředí**](https://cs.wikipedia.org/wiki/Prom%C4%9Bnn%C3%A1_prost%C5%99ed%C3%AD)[^3]
(*environment variable*) `LD_LIBRARY_PATH` předat cestu k adresáři, ve které se daná knihovna nachází:
```bash
$ LD_LIBRARY_PATH=/usr/foo/lib ./program
```

[^3]: Proměnné prostředí jsou způsobem, jak předávat parametry programům (podobně jako
například [parametry příkazového řádku](../../ruzne/funkce_main.md#vstupní-parametry-funkce-main)).
V programu si můžete přečíst hodnotu konkrétní proměnné prostředí pomocí funkce
[`getenv`](https://devdocs.io/c/program/getenv).

### Zobrazení vyžadovaných dynamických knihoven
Pokud si přeložíte nějaký program a použijete na něj program `ldd`, dozvíte se, které dynamické
knihovny vyžaduje ke svému běhu. Měli byste mezi nimi naleznout mj. i
[standardní knihovnu *C*](../funkce/stdlib.md) (`libc`) a dozvědět se tak její umístění na disku:
```bash
$ ldd ./program
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f0d3a328000)
```

> [Standardní knihovna jazyka *C*](../funkce/stdlib.md) je používána téměř každým programem a i z
> tohoto důvodu je obvykle linkována dynamicky, aby její paměť šla sdílet mezi programy.

## Vytvoření knihovny
Pokud byste si chtěli vytvořit vlastní knihovnu, můžete toho jednoduše dosáhnout pomocí `gcc`. Dejme
tomu, že máte soubory `a.c` a `b.c`, které chcete zabalit do knihovny. Nejprve každý zdrojový soubor
přeložíme do objektového souboru[^4]:
```bash
$ gcc -c -fPIC a.c
$ gcc -c -fPIC b.c
```

[^4]: Parametr `-fPIC` je nutný při překladu zdrojových souborů, které poté chceme umístit do
knihovny. Více se můžete dozvědět např. [zde](https://stackoverflow.com/a/5311538/1107768).

Další postup závisí na tom, jaký typ knihovny chceme vytvořit:
- **Vytvoření statické knihovny** - použijeme program `ar` (archiver):
    ```bash
    $ ar rcs libknihovna.a a.o b.o
    ```
- **Vytvoření dynamické knihovny** - použijeme program `gcc` s přepínačem `-shared`:
    ```bash
    $ gcc -shared a.o b.o -o libknihovna.so
    ```
