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

## Předpřipravený virtuální počítač
V případě, že si nechceme instalovat Linux a následně konfigurovat vše potřebné, tak jsme pro Vás připravili obraz virtuálního stroje.
Nejprve je nutné nainstalovat program [VirtualBox](https://www.virtualbox.org/wiki/Downloads) a poté stáhnout [předpřipravený obraz](http://mrl.cs.vsb.cz/data/upr/UPR.ova) virtuálního stroje.
Na stažený soubor stačí poklikat a potvrdit import s výchozím nastavením.
Virtuální počítač je pak možné spustit z programu Virtualbox a následující sekci, zabývající se instalací rozšíření, můžeme přeskočit.
Uživatelské jméno a heslo je `student`.

## Instalace potřebných rozšíření (pomocí terminálu)
VSCode podporuje programovací jazyky pomocí rozšíření, po první instalaci VSCode
tak nejprve musíme nainstalovat potřebná rozšíření pro jazyk C. V terminálu spusťte tyto příkazy:

```bash
$ code --install-extension ms-vscode.cpptools
```

> Návod pro práci s terminálem na Linuxu můžete najít např. [zde](https://wiki.ubuntu.cz/syst%C3%A9m/p%C5%99%C3%ADkazov%C3%A1_%C5%99%C3%A1dka/termin%C3%A1l).
> Tahák pro příkazy terminálu najdete [zde](https://github.com/geordi/upr-course/blob/master/assets/cheatsheets/linux.pdf).

## Instalace potřebných rozšíření (pomocí uživatelského rozhraní)
1. Otevřete obrazovku rozšíření (`Ctrl+Shift+X` nebo spusťte akci `Install Extensions`)
2. Vyhledejte rozšíření C/C++ a nainstalujte ho

## Ukázka nastavení projektu
Jako vzorový projekt můžete použít [tuto](https://github.com/geordi/upr-course/tree/master/faq/vscode-template-project)
šablonu.

![Nastavení VSCode](../static/video/vsc_first_run.gif)

## Užitečné zkratky 
- Spustit program - `F5`
- Naformátovat kód - `Ctrl + Shift + I`
- Zobrazit vyhledávač akcí - `Ctrl + Shift + P`
