# Instalace Linuxu
Pokud používáte operační systém Windows, tak pro použití Linuxu můžete využít jednu z následujících
tří možností.

> Linux není pouze jeden operační systém, ale pouze tzv. **jádro** (*kernel*) operačního systému,
nad kterým vznikají tzv. *distribuce*, které se liší ve vizuální stránce, způsobu ovládání, správě
softwarových balíčků atd. Jednou z nejpoužívanějších a také nejjednodušší distribucí Linuxu
je **Ubuntu**. Při instalaci Linuxu vám tak doporučujeme použít právě tuto distribuci.

## Windows Subsystem for Linux (doporučeno)
`WSL` je systém, který umožňuje nainstalovat Linux pod operačním systémem Windows tak, že se Linux
bude chovat jako program spouštěný pod Windows. Tato varianta vám umožní jednoduše sdílet data
mezi Windows a Linuxem, a také vám umožní si jednoduše pod Windows spustit Linuxový terminál, ze
kterého budete moct např. překládat své *C* programy.

Nejprve si musíte na Windows `WSL` nainstalovat. Návod pro instalaci naleznete [zde](https://docs.microsoft.com/cs-cz/windows/wsl/install).
Pokud máte aktualizovaný Windows 10/11, tak by mělo stačit spustit příkazovou řádku Windows jako administrátor[^1],
poté napsat `wsl.exe --install` a zmáčknout klávesu Enter. Jakmile se WSL nainstaluje, tak restartujte počítač.
Tento příkaz by vám měl nainstalovat distribuci *Ubuntu* do vašeho Windows počítače.

[^1]: Nabídka start -> Napište `cmd` -> Klikněte pravým tlačítkem na nalezený příkazový řádek -> Spustit jako administrátor

Poté můžete spustit terminál (`bash`) běžící pod Ubuntu spuštěním programu `Ubuntu` (např. z nabídky
Start). Tento [terminál](os.md#základy-používání-linuxu) můžete používat pro práci se soubory nebo
překlad *C* programů.

> Soubory z Windows jsou v příkazové řádce Ubuntu pod WSL dostupné na cestě `/mnt/c`. Pokud byste
> se tak například chtěli v terminálu přesunout do složky `C:/Users/Katka/Desktop`, tak v terminálu
> spusťte příkaz `cd /mnt/c/Users/Katka/Desktop`.
>
> Naopak soubory z WSL jsou pod Windows dostupné na cestě `\\wsl$\Ubuntu\<cesta>`. Když do adresního
> řádku prohlížeče souborů ve Windows napíšete `\\wsl$`, tak se můžete k souborům proklikat.

Jakmile budete ve WSL `bash` terminálu, tak si nejprve nainstalujte programy nutné pro práci s `C`
(zejména překladač) pomocí následujích dvou příkazů:
```bash
$ sudo apt update
$ sudo apt install build-essential gdb
```

> Při pokusu o instalaci vás program vyzve, abyste instalaci potvrdili. Udělejte to zmáčknutím klávesy `y`
> a potvrďte klávesou Enter.


## Nativní instalace Linuxu
Nejspolehlivější variantou použití Linuxu je nainstalovat si ho přímo "na železo", tj. bez
virtualizace. Můžete jej například nastavit v režimu
[dual boot](https://www.tecmint.com/install-ubuntu-alongside-with-windows-dual-boot/), kdy se při
startu počítače můžete rozhodnout, zdali se nabootuje do Windows (či jiného operačního systému)
nebo do Linuxu. Pokud jste s Linuxem nikdy nepracovali, tak doporučujeme použít Linuxovou
[distribuci Ubuntu](https://itsfoss.com/install-ubuntu/) ve verzi `24.04`.
