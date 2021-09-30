# Linux
Jak už bylo zmíněno v [úvodu](../uvod/uvod.md), v UPR budeme psát a spouštět programy v operačním
systém [Linux](https://en.wikipedia.org/wiki/Linux). Je tak nutné, abyste si na svém počítači
tento operační systém zprovoznili.

Pokud používáte operační systém OS X, tak teoreticky Linux instalovat nemusíte, stačí si nastavit
překladač [`gcc`](https://www.cyberciti.biz/faq/howto-apple-mac-os-x-install-gcc-compiler/).

**Pokud při instalaci Linuxu narazíte na problémy, které se vám nepodaří vyřešit, konzultujte je
ihned s vaším cvičícím, který vám s instalací pomůže. Je nezbytné mít zprovozněný překladač `gcc`
a Linux (nebo OS X), abyste mohli řešit úlohy do UPR.**

Pokud používáte operační systém Windows, tak pro použití Linuxu můžete využít jeden z následujících
tří možností.

> Návod pro práci s terminálem na Linuxu můžete najít např. [zde](https://wiki.ubuntu.cz/syst%C3%A9m/p%C5%99%C3%ADkazov%C3%A1_%C5%99%C3%A1dka/termin%C3%A1l).
> Tahák pro příkazy terminálu najdete [zde](https://github.com/geordi/upr-course/blob/master/assets/cheatsheets/linux.pdf).

## Windows Subsystem for Linux (doporučeno)
WSL je systém, který umožňuje nainstalovat Linux pod operačním systémem Windows. Jakmile jej
nainstalujete, budete mít k dispozici Linuxový terminál (`bash`) a budete moct používat překladač
[gcc](preklad_programu.md) a editor [Visual Studio Code](editor.md). Výhoda tohoto řešení je, že
pro použití Linuxu nemusíte restartovat počítač ani zapínat virtuální stroj, Linux je v podstatě
jenom "další aplikace" pod Windows.

Návod pro zprovoznění WSL spolu s prostředím pro vývoj v jazyce *C* naleznete
[zde](https://code.visualstudio.com/docs/cpp/config-wsl). Při instalaci WSL používejte distribuci
`Ubuntu 20.04`.

Pokud se Vám nedaří zprovoznit WSL podle výše uvedeného oficiálního návodu,
tak zkuste [Virtulizovaný Linux](#virtualizovan%C3%BD-linux), který je popsán hned níže.

## Virtualizovaný Linux
Linux můžete také používat ve virtualizované podobě pomocí
[virtuálního stroje](https://cs.wikipedia.org/wiki/Virtu%C3%A1ln%C3%AD_stroj). Připravili jsme pro
vás tzv. obraz virtuálního stroje, který obsahuje již nastavený Linux, konkrétně `Ubuntu 20.04`,
se vším potřebným pro předmět UPR.

Abyste jej mohli použít, tak si nejprve musíte nainstalovat virtualizační program
[VirtualBox](https://www.virtualbox.org/wiki/Downloads). Poté si
[předpřipravený obraz](http://mrl.cs.vsb.cz/data/upr/UPR.ova) stáhněte, otevřete ho ve VirtualBoxu
a potvrďte import s výchozím nastavením.

Virtuální počítač poté bude možné spustit z programu VirtualBox. Uživatelské jméno i heslo je
`student`.

## Nativní instalace Linuxu
Nejspolehlivější variantou použití Linuxu je nainstalovat si ho přímo "na železo", tj. bez
virtualizace. Můžete jej například nastavit v režimu
[dual boot](https://www.tecmint.com/install-ubuntu-alongside-with-windows-dual-boot/), kdy se při
startu počítače můžete rozhodnout, zdali se nabootuje do Windows (či jiného operačního systému)
nebo do Linuxu. Pokud jste s Linuxem nikdy nepracovali, tak doporučujeme použít Linuxovou
[distribuci Ubuntu](https://itsfoss.com/install-ubuntu/) ve verzi `20.04`.
