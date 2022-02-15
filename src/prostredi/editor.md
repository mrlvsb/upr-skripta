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
- Pokud používáte `WSL`, tak si stáhněte a nainstalujte VSCode **na Windows**. Při instalaci vyberte
možnost `Add to PATH`, aby byl VSCode poté jednoduše dostupný z WSL. Dále budete muset do VSCod
doinstalovat [toto](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
rozšíření pro práci s WSL. Podrobný návod, jak zprovoznit VSCode v kombinaci s WSL, naleznete
[zde](https://code.visualstudio.com/docs/remote/wsl) nebo [zde](https://code.visualstudio.com/docs/cpp/config-wsl).

## Instalace potřebných rozšíření (pomocí terminálu)
VSCode podporuje programovací jazyky pomocí rozšíření, po první instalaci VSCode
tak nejprve musíme nainstalovat potřebná rozšíření pro jazyk *C*. V terminálu spusťte tyto příkazy:

```bash
$ code --install-extension ms-vscode.cpptools
```

## Instalace potřebných rozšíření (pomocí uživatelského rozhraní)
1. Otevřete obrazovku rozšíření (`Ctrl+Shift+X` nebo spusťte akci `Install Extensions`)
2. Vyhledejte rozšíření `C/C++` a nainstalujte ho

## Ukázka nastavení projektu
Jako vzorový projekt můžete použít [tuto](https://github.com/geordi/upr-course/tree/master/faq/vscode-template-project)
šablonu. Pro otevření adresáře ve VSCode klikněte na `Soubor (File) -> Otevřít adresář (Open Folder)`
a vyberte nějaký adresář, ve kterém chcete programovat.

![Nastavení VSCode](../static/video/vsc_first_run.gif)

## Užitečné zkratky 
- Spustit program - `F5`
- Naformátovat kód - `Ctrl + Shift + I`
- Zobrazit vyhledávač akcí - `Ctrl + Shift + P`
