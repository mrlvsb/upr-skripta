# Instalace VS Code
- Pokud používáte virtualizovaný nebo nativní Linux (Ubuntu), stáhněte si [odsud](https://code.visualstudio.com/)
  `.deb` soubor s balíčkem VS Code a nainstalujte jej (poklikáním myši na soubor nebo spuštěním příkazu
    ```bash
    $ sudo apt install ./<nazev-souboru>.deb
    ```
- Pokud používáte `WSL`, tak by už měl být VS Code předinstalovaný[^1]. Spustíte ho tak, že v `bash`
  terminálu spustíte tento příkaz:
    ```bash
    $ code .
    ```
  Ten otevře VS Code v adresáři, ve kterém se zrovna v terminálu budete nacházet. Ve VS Code
  si poté také nainstalujte dodatečné rozšíření
  [`Remote Development`](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
  (viz návod, jak instalovat rozšíření [níže](#instalace-rozšíření-pomocí-uživatelského-rozhraní)).

  Podrobný návod, jak zprovoznit VS Code v kombinaci s WSL, naleznete
  [zde](https://code.visualstudio.com/docs/remote/wsl) nebo [zde](https://code.visualstudio.com/docs/cpp/config-wsl).

[^1]: Pokud by tomu tak nebylo, návod na instalaci VS Code na Linuxu naleznete
[zde](https://code.visualstudio.com/docs/setup/linux).

## Instalace rozšíření (pomocí terminálu)
VS Code podporuje programovací jazyky pomocí rozšíření, po první instalaci VS Code
tak nejprve musíme nainstalovat potřebná rozšíření pro jazyk *C*. V terminálu spusťte tyto příkazy:

```bash
$ code --install-extension ms-vscode.cpptools
```

Doporučujeme si také nainstalovat následující [rozšíření](https://marketplace.visualstudio.com/items?itemName=jakub-beranek.memviz) pro vizualizaci paměti programů, které jsme pro vás nachystali:

```bash
$ code --install-extension jakub-beranek.memviz
```

## Instalace rozšíření (pomocí uživatelského rozhraní)
1. Spusťte Visual Studio Code
2. Otevřete obrazovku rozšíření (`Ctrl+Shift+X` nebo spusťte akci `Install Extensions`)
3. Vyhledejte rozšíření (`C/C++`) a nainstalujte jej
4. Můžete také vyhledat `memviz` a nainstalovat rozšíření [Memory visualizer](https://marketplace.visualstudio.com/items?itemName=jakub-beranek.memviz) pro vizualizaci paměti.

## Časté problémy
Tato sekce obsahuje vybrané problémy, se kterými se studenti často setkávají při práci s Visual Studio Code (obzvláště
na WSL).

### Chybějící hlavičkové soubory
Pokud spustíte VS Code, otevřete v něm nějaký program s *C* kódem a budete mít červeně podtržený např.
takovýto řádek:
```c
#include <stdio.h>
```
je to pravděpodobně způsobeno jedním ze dvou následujících důvodů:
1) Spouštíte VS Code z Windows a ne z Ubuntu WSL terminálu. Spouštějte VS Code vždy přímo z Ubuntu
   terminálu, aby mělo správný přístup k systémovým souborům jazyka *C*.

   Podle ikony dvou šipek v levém dolním rohu okna VS Code můžete rozpoznat, zdali jste připojení ve VS Code k WSL, nebo ne.
- Pokud je u ikony napsáno WSL, tak je VS Code správně připojen k WSL terminálu:

  ![](../../static/img/vsc-wsl.png)

- Pokud tam jsou pouze dvě šipky a nic více, tak jste VS Code spustili ve Windows místo ve WSL, to je špatně:

  ![](../../static/img/vsc-windows.png)

  Klikněte na ikonu dvou šipek a připojte se k WSL.

2) Nemáte nainstalovaný překladač (GCC). Spusťte Ubuntu terminál a nainstalujte jej, viz
   [překlad programu](../preklad_programu.md).

> Obecně řečeno, to, že se vám ve VS Code ukazuje nějaký problém s kódem, ještě neznamená, že tento
> problém v kódu opravdu je. Důležité je, co řekne [překladač](../preklad_programu.md) při překladu
> programu, VS Code je občas zmatené anebo není správně nastavené. Samozřejmě je ale ideální si ho správně
> nastavit, ať vás to neplete.

### Změny ve zdrojovém kódu se nepromítají v přeloženém programu
Pokud v otevřeném zdrojovém souboru provedete nějaké změny, tak se neuloží na disk, dokud soubor neuložíte (pomocí
klávesové zkratky `Ctrl + S`). Občas se studentům stává, že provedou změnu, poté se snaží přeložit program, ale jejich
změny se neprojeví a studenti nerozumí, proč tomu tak je. Často je to právě proto, že soubor není uložen!
**Neuložený soubor** poznáte tak, že v záložce s názvem souboru je bílé kolečko:
![](../../static/img/vsc-unsaved-file.png)

Vždy tak po provedení změn ukládejte soubor pomocí `Ctrl + S`, případně si můžete v nastavení (`Settings`) zapnout volbu
`Auto Save`.

## Ukázka nastavení projektu
Jako vzorový projekt můžete použít [tuto](https://github.com/geordi/upr-course/tree/master/faq/vscode-template-project)
šablonu. Pro otevření adresáře ve VS Code klikněte na `Soubor (File) -> Otevřít adresář (Open Folder)`
a vyberte nějaký adresář, ve kterém chcete programovat.

![Nastavení VS Code](../../static/video/vsc_first_run.gif)

## Pokročilé možnosti nastavení projektu
Pokud byste si chtěli nastavit VS Code tak, aby překládal nebo spouštěl váš program s jiným, než základním
nastavením, můžete k tomu využít konfiguraci pomocí souborů `launch.json`, který definuje, jak bude VS Code
váš program spouštět, případně `tasks.json`, pomocí kterého můžeme nastavit, jak se bude program překládat.

`launch.json` je možno vytvořit po kliknutí na záložku `Run and Debug` (Ctrl+Shift+D) a poté na tlačítko `create a
launch.json file` (tlačítko se zobrazí, pokud máte otevřený soubor s příponou `.c` ve VS Code). Soubor se vytvoří v současně otevřeném adresáři, ve složce `.vscode` (můžete ho případně i vytvořit manuálně).

Do vygenerovaného souboru můžete zkopírovat tento obsah:
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C program (gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/main",
            "args": [],
            "cwd": "${workspaceFolder}",
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb",
            "preLaunchTask": "C compile"
        }
    ]
}
```

Atributy této konfigurace poté můžete upravovat. Užitečné pro vás budou zejména tyto atributy:
- **program** - cesta ke **spustitelnému** (přeloženému) souboru, který bude konfigurace spouštět
- **cwd** - pracovní adresář, ve kterém se program spustí
- **args** - [argumenty příkazového řádku](../../ruzne/funkce_main.md#vstupní-parametry-funkce-main) předané
  spouštěnému programu

Pokud byste si chtěli při ladění přesměrovat obsah souboru na [standardní vstup](../../c/text/vstup.md) programu,
tak přidejte na konec `args` šipku doleva a cestu k souboru, který chcete přesměrovat na vstup:
```json
"args": [
    "<",
    "${workspaceFolder}/stdin_file.stdin"
]
```

Dále budete muset nastavit soubor **tasks.json**, pro automatický překlad programu
(vytvořte jej opět ve `.vscode` složce projektu). Pokud tento soubor bude chybět, při pokusu o ladění programu
dostanete chybovou hlášku podobnou této:

> launch: program `<cesta>/main` does not exist

Do `tasks.json` si můžete zkopírovat tento obsah:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "cppbuild",
            "label": "C compile",
            "command": "gcc",
            "args": [
                "${workspaceFolder}/main.c",
                "-g",
                "-o",
                "${workspaceFolder}/main"
            ]
        }
    ]
}
```

Zde jsou důležité hlavně dva atributy:
- **label** - název tasku pro spuštění. **Tento název musí odpovídat atributu `preLaunchTask` v souboru `launch.json`**.
- **args** - [parametry překladače](../../ruzne/parametry_prekladace.md) použité při překladu.
    - Prvním argumentem by měla být cesta k překládanému C zdrojovému souboru.
    - Dále by v `args` měla být cesta k výslednému přeloženého souboru, předaná za parametrem `-o`.
      **Tato cesta musí odpovídat atributu `program` v souboru `launch.json`**.
    - Dále zde můžete předávat další parametry překladače, např. zapnout [Address sanitizer](../ladeni.md#address-sanitizer)
      (`-fsanitize=address`) nebo přilinkovat nějaké [knihovny](../../c/modularizace/knihovny.md) (např. `-lm`).

Více informací o možnostech nastavení těchto dvou souborů můžete naleznout na těchto odkazech:
- [Microsoft Configure C/C++ debugging](https://code.visualstudio.com/docs/cpp/launch-json-reference)
- [Microsoft Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)

## Automatické formátování kódu
Pokud s programováním začínáte, tak budete ze začátku nejspíše trochu bojovat s tím, jak zformátovat zdrojový kód,
aby byl přehledný a dalo se v něm vyznat. Tuto činnost však můžete nechat plně na editoru či vývojovém prostředí.
Ve Visual Studio Code můžete použít klávesovou zkratku `Ctrl + Shift + I`, která vám právě otevřený soubor s kódem
automaticky zformátuje.

Můžete si dokonce editor nastavit tak, aby po každém uložení souboru kód automaticky zformátoval. Klikněte na
`File -> Preferences -> Settings`, poté do vyhledávacího okénka napište `Format On Save` a zaškrtněte tuto možnost:
![](../../static/img/vsc-format-on-save.png)

## Užitečné zkratky
- Spustit program - `F5`
- Naformátovat kód - `Ctrl + Shift + I`
- Uložit provedené změny v souboru - `Ctrl + S`
- Zobrazit vyhledávač akcí - `Ctrl + Shift + P`