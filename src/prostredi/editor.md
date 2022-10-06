# Vývojové prostředí
Abychom mohli přeložit a spustit nějaký program, musíme ho obvykle nejprve zapsat do
jednoho nebo více souborů ve formě tzv. **zdrojového kódu** (*source code*). K usnadnění tohoto procesu
existují **textové editory** a **vývojová prostředí** jako například `MS Visual Studio`, `QtCreator`, `JetBrains CLion`,
`CodeBlocks`, `Visual Studio Code`, `vim`, `emacs` apod. Tyto programy usnadňují psaní kódu pomocí zvýrazňování
syntaxe, automatizace překladu, spouštění a testování programů a také správy projektů.

Na cvičeních UPR budeme používat editor `Visual Studio Code`, který je
[dostupný zdarma](https://code.visualstudio.com/). Níže je stručný návod k jeho použití. Při
programování se hodí detailně znát a efektivně využívat editor, který používáte, ale pro začátek
nám budou stačit naprosté základy.

## Instalace VSCode
- Pokud používáte virtualizovaný nebo nativní Linux (Ubuntu), stáhněte si [odsud](https://code.visualstudio.com/)
`.deb` soubor s balíčkem VSCode a nainstalujte jej (poklikáním myši na soubor nebo spuštěním příkazu
    ```bash
    $ sudo apt install ./<nazev-souboru>.deb
    ```
- Pokud používáte `WSL`, tak by už měl být VSCode předinstalovaný[^1]. Spustíte ho tak, že v `bash`
terminálu spustíte tento příkaz:
    ```bash
    $ code .
    ```
    Ten otevře VSCode v adresáři, ve kterém se zrovna v terminálu budete nacházet. Ve VSCode
    si poté také nainstalujte dodatečné rozšíření
    [`Remote Development`](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
    (viz návod, jak instalovat rozšíření [níže](#instalace-potřebných-rozšíření-pomocí-uživatelského-rozhraní)).

    Podrobný návod, jak zprovoznit VSCode v kombinaci s WSL, naleznete
    [zde](https://code.visualstudio.com/docs/remote/wsl) nebo [zde](https://code.visualstudio.com/docs/cpp/config-wsl).

[^1]: Pokud by tomu tak nebylo, návod na instalaci VSCode na Linuxu naleznete
[zde](https://code.visualstudio.com/docs/setup/linux).

### Chybějící hlavičkové soubory
Pokud spustíte VSCode, otevřete v něm nějaký program s *C* kódem a budete mít červeně podtržený např.
takovýto řádek:
```c
#include <stdio.h>
```
tak je to pravděpodobně způsobeno jednou z dvou následujících věcí:
1) Spouštíte VSCode z Windows a ne z Ubuntu WSL terminálu. Spouštějte VSCode vždy přímo z Ubuntu
terminálu, aby mělo správný přístup k systémovým souborům jazyka *C*. Viz
[VSCode na WSL](linux/instalace.md#visual-studio-code).
2) Nemáte nainstalovaný překladač (`gcc`). Spusťte Ubuntu terminál a nainstalujte jej, viz
[překlad programu](preklad_programu.md).

> Obecně řečeno, to, že se vám ve VSCode ukazuje nějaký problém s kódem, ještě neznamená, že tento
> problém v kódu opravdu je. Důležité je, co řekne [překladač](preklad_programu.md) při překladu
> programu, VSCode je občas zmatené anebo není správně nastavené. 

## Instalace potřebných rozšíření (pomocí terminálu)
VSCode podporuje programovací jazyky pomocí rozšíření, po první instalaci VSCode
tak nejprve musíme nainstalovat potřebná rozšíření pro jazyk *C*. V terminálu spusťte tyto příkazy:

```bash
$ code --install-extension ms-vscode.cpptools
```

## Instalace potřebných rozšíření (pomocí uživatelského rozhraní)
1. Spusťte Visual Studio Code
2. Otevřete obrazovku rozšíření (`Ctrl+Shift+X` nebo spusťte akci `Install Extensions`)
3. Vyhledejte rozšíření (`C/C++`) a nainstalujte jej

## Ukázka nastavení projektu
Jako vzorový projekt můžete použít [tuto](https://github.com/geordi/upr-course/tree/master/faq/vscode-template-project)
šablonu. Pro otevření adresáře ve VSCode klikněte na `Soubor (File) -> Otevřít adresář (Open Folder)`
a vyberte nějaký adresář, ve kterém chcete programovat.

![Nastavení VSCode](../static/video/vsc_first_run.gif)

## Užitečné zkratky 
- Spustit program - `F5`
- Naformátovat kód - `Ctrl + Shift + I`
- Zobrazit vyhledávač akcí - `Ctrl + Shift + P`
