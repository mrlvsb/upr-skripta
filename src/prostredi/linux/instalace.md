# Instalace Linuxu
Pokud používáte operační systém Windows, tak pro použití Linuxu můžete využít jeden z následujících
tří možností.

> Linux není pouze jeden operační systém, ale pouze tzv. **jádro** (*kernel*) operačního systému,
nad kterým vznikají tzv. *distribuce*, které se liší ve vizuální stránce, způsobu ovládání, správě
softwarových balíčků atd. Jednou z nejrozšířenějších a zároveň nejpoužívanějších distribucí Linuxu
je **Ubuntu**. Při instalaci Linuxu vám tak doporučujeme použít právě tuto distribuci.

## Windows Subsystem for Linux (doporučeno)
`WSL` je systém, který umožňuje nainstalovat Linux pod operačním systémem Windows tak, že se Linux
bude chovat jako program spouštěný pod Windows. Tato varianta vám umožní jednoduše sdílet data
mezi Windows a Linuxem, a také vám umožní si jednoduše pod Windows spustit Linuxový terminál, ze
kterého budete moct např. překládat své *C* programy.

Nejprve si musíte na Windows `WSL` nainstalovat. Návod pro instalaci naleznete [zde](https://docs.microsoft.com/cs-cz/windows/wsl/install),
mělo by stačit v příkazové řádce Windows spustit příkaz `wsl --install` a restartovat počítač.
Tento příkaz by vám měl nainstalovat distribuci *Ubuntu* do vašeho Windows počítače.

Poté můžete spustit terminál (`bash`) běžící pod Ubuntu spuštěním programu `Ubuntu` (např. z nabídky
Start). Tento [terminál](linux.md#základy-používání-linuxu) můžete používat pro práci se soubory nebo
překlad *C* programů.

> **Soubory z Windows jsou v příkazové řádce Ubuntu pod WSL dostupné na cestě `/mnt/c`. Pokud byste
> se tak například chtěli v terminálu přesunout do složky `C:/Users/Katka/Desktop`, tak v terminálu
> spusťte příkaz `cd /mnt/c/Users/Katka/Desktop`**.

Podrobnější návod pro zprovoznění WSL spolu s prostředím pro vývoj v jazyce *C* naleznete
[zde](https://code.visualstudio.com/docs/cpp/config-wsl).

## Virtualizovaný Linux
Linux můžete také používat ve virtualizované podobě pomocí
[virtuálního stroje](https://cs.wikipedia.org/wiki/Virtu%C3%A1ln%C3%AD_stroj). V této variantě se
pod Windows spustí celý virtuální počítač, na kterém poběží Linux, který nebude mít vůbec tušení o
tom, že je spuštěn pod Windows. Výhodou tohoto řešení je, že se virtuální počítač bude chovat jako
plnohodnotná instalace Linuxu, a téměř vše by tedy na něm mělo fungovat (i včetně např. grafických
aplikací). Nevýhodou je, že virtuální počítač je značně náročný na procesor i paměť počítače,
a může být obtížnější s virtuálním počítačem sdílet data z Windows (ve srovnání s WSL).

Připravili jsme pro vás tzv. obraz virtuálního stroje, který obsahuje již nastavený Linux, konkrétně
`Ubuntu 20.04`, se vším potřebným pro předmět UPR. Abyste jej mohli použít, tak si nejprve musíte
nainstalovat virtualizační program [VirtualBox](https://www.virtualbox.org/wiki/Downloads). Poté si
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
[distribuci Ubuntu](https://itsfoss.com/install-ubuntu/) ve verzi `21.04`.
