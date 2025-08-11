# Linux
Jak už bylo zmíněno v [úvodu](../../uvod/uvod.md), v UPR budeme psát a spouštět programy v operačním
systém [Linux](https://en.wikipedia.org/wiki/Linux). Je tak nutné, abyste si na svém počítači
tento operační systém zprovoznili.

## Proč Linux?
Linux je v současné době v oblasti IT téměř všude - používá ho většina webových serverů, cloudových
služeb, mobilních zařízení nebo třeba i superpočítačů. Umožňuje nám ovládat počítač jednoduše pomocí
textových příkazů v terminálu, díky čehož si můžeme zautomatizovat a ulehčit práci s počítačem, a
zároveň můžeme trochu nahlédnout pod pokličku toho, jak počítač funguje.

Pro používání jazyka *C* nám Linux umožňuje velmi jednoduše překládat programy právě z terminálu,
a díky tomu, že je *C* na Linuxu "jako doma", tak nám to usnadní i další věci, např. používání knihoven
(kódu, který již pro nás naprogramoval někdo jiný). Ostatně i samotný Linux je napsán téměř výlučně
v jazyce *C* a samotný jazyk *C* vznikl před 50 lety pro tvorbu operačních systémů `Unix`, které
byly inspirací pro vznik Linuxu.

## Co si mám nainstalovat?
- Pokud používáte operační systém Windows, tak si musíte Linux nainstalovat. Jako návod k tomu
slouží [samostatná stránka](instalace.md).
- Pokud používáte operační systém macOS, tak teoreticky Linux instalovat nemusíte, stačí si nastavit
překladač [`gcc`](https://osxdaily.com/2023/05/02/how-install-gcc-mac/).
- Pokud již používáte operační systém Linux, nemusíte nic dalšího řešit a můžete přejít k
nastavení [editoru](../editor/editor.md).

> **Pokud při instalaci Linuxu narazíte na problémy, které se vám nepodaří vyřešit, konzultujte je
ihned s vaším cvičícím, který vám s instalací pomůže. Je nezbytné mít zprovozněný překladač `gcc`
a Linux (nebo macOS), abyste mohli řešit úlohy do UPR.**

## Základy používání Linuxu
Linux se v zásadě používá velmi podobně jako operační systém Windows, nicméně narozdíl od Windows,
kde jste asi zvyklí ovládat počítač zejména myší, se v Linuxu běžně spousta úkonů provádí v tzv.
**terminálu**, neboli příkazové řádce (*command line*), kde ovládáte počítač pomocí textových příkazů.

Pro otevření terminálu na Linuxu zmáčkněte `Ctrl + Alt + T` nebo zmáčkněte klávesu `Start`
a vyhledejte program `Terminal`. Pokud používáte WSL, tak spusťte z nabídky Start program `Ubuntu`.

Po otevření terminálu byste měli vidět něco podobného:
![](../../static/img/terminal1.png)

Před znakem dolaru (`$`) vždy uvidíte adresář[^1], ve kterém se zrovna v terminálu nacházíte. Odpovídá
to zhruba tomu, jako když na Windows v prohlížeči souborů rozkliknete nějaký adresář a vidíte soubory,
které se v něm nachází. Pomocí příkazu `cd` (viz níže) se můžete mezi adresáři přepínat.

[^1]: Adresář (nebo taky složka) označuje pojmenovanou sadu souborů umístěnou na nějaké **cestě** (např. `/home/franta/soubor.c` nebo `/mnt/c/users/franta/Desktop/soubor.c`) na
disku. Adresáře mohou obsahovat jak soubory, tak další adresáře.

Nyní můžete do terminálu psát příkazy, pomocí kterých si můžete např. vypsat soubory v současném
adresáři, vytvořit nový adresář, spustit nějaký program nebo se přesunout do jiného adresáře:
- Vypsání souborů v současném adresáři (`ls = list files`)
    ```bash
    ~$ ls
    soubor1
    soubor2
    slozka1
    ```
- Přepnutí se do jiného adresáře (`cd = change directory`)
    ```bash
    ~$ cd slozka1
    ~/slozka1$
    ```
- Vytvoření adresáře (`mkdir = make directory`)
    ```bash
    ~$ mkdir moje-slozka
    ~$ ls
    moje-slozka
    ```
- Spuštění programu
    ```bash
    ~$ ./program
    ```

Více informací o práci s terminálem a Linuxem se dozvíte na internetu. Zkuste se podívat např.
na [tento kurz](https://naucse.python.cz/2021/linuxadmin-podzim/sessions/shell-1/).
[Zde](https://github.com/geordi/upr-course/blob/master/assets/cheatsheets/linux.pdf) poté naleznete
tahák různých užitečných příkazů, které můžete v terminálu použít.
