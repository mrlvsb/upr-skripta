# Instalace CLionu

Nejlepší způsob instalace je použití aplikace [Toolbox](https://www.jetbrains.com/toolbox-app/), která vám umožní spravovat všechna vaše IDE od JetBrains. Pokud narazíte na problém, kompletní návod
naleznete [zde](https://www.jetbrains.com/help/clion/installation-guide.html#toolbox).

## První projekt

Po spuštění CLionu klikněte na `New Project` a vyberte `C Executable`. Nastavte umístění projektu a můžete také zvolit standard jazyka C, který lze později změnit i v CMaku. Program spustíte pomocí
klávesové zkratky `Shift + F10` nebo kliknutím na tlačítko **Run**.

  <img src="../../static/img/clion/clion_run.png" width="557" height="432" >

### Výběr kompilátoru

Pokud chcete používat **gcc** kompilátor z **WSL**, stačí jej přepnout v nastavení.

1. Stisknutím klávesové zkratky `CTRL + Shift + A` otevřete vyhledávací okno.
2. Napište **Toolchains** a stiskněte `Enter`.
3. Pokud máte správně nainstalované WSL, mělo by se objevit v nabídce. Klikněte na něj a posuňte jej nahoru pomocí `Alt + Up`.
4. Potvrďte kliknutím na **Apply** a následně **OK**.

> ⚠️ Pokud vám program nejde spustit po přepnutí na WSL, může to být způsobeno chybějícími balíčky nebo starší verzí CMaku.

Nainstalujte potřebné balíčky:

```bash
$ sudo apt-get install build-essential cmake gdb
```

V souboru CMakeLists.txt nastavíme starší verzi CMaku na verzi 3.21

```cmake
cmake_minimum_required(VERSION 3.21)
```

> Pokaždé, když v CMaku uděláme změnu je potřeba soubor znovu načíst. Buď si zapnete auto-reload pomocí příkazu `Auto-Reload CMake Project` nebo kliknete na soubor pravým a dáte `Reload CMake Project`

Pokud chcete pochopit fungování CMaku, tak můžete [zde](../../c/automatizace_prekladu.md#cmake).

Jak naimportovat SDL pro následující projekt můžete najít [zde](../../c/aplikovane_ulohy/sdl.md#přilinkování-knihovny-sdl).

## Licence Education Pack na jíne produkty JetBrains

JetBrains má spoustu jiných produktů na vývoj, ladění, práci s databázemi atd. Část z nich potřebuje pro používání licenci, o kterou můžete jako studenti požádat zdarma [zde](https://www.jetbrains.com/shop/eform/students).

- Na stránce jsou čtyři způsoby, jak licenci získat. Nejjednodušší je použít váš školní e-mail. Email je v následujícím tvaru: `<login>@vsb.cz`, např. `UPR0123@vsb.cz`
- Po vyplnění dotazníku vám přijde potvrzovací e-mail o schválení **Educational Packu**. Otevřete odkaz v e-mailu a potvrďte podmínky. Poté si vytvořte účet s vaším školním
  e-mailem [zde](https://account.jetbrains.com/login).
- Stav vaší licence můžete zkontrolovat [zde](https://account.jetbrains.com/licenses). Zde také uvidíte všechny produkty, na které se licence vztahuje.

- Nakonec se stačí v **Toolboxu** přihlásit pod účtem, který jste si vytvořili.

<img src="../../static/video/toolbox_login.gif" width="288" height="409" >
