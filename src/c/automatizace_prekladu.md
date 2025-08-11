# Automatizace překladu
Možná vás napadlo, že v případě rozdělení programu do více zdrojových souborů a při použití knihoven
začne být docela namáhavé náš program vůbec přeložit. Musíme přeložit zvlášť každou
[jednotku překladu](modularizace/linker.md#překlad-programu), nakonec je všechny slinkovat dohromady
a případně ještě předat potřebné cesty k použitým knihovnám. A toto je třeba po jakékoliv změně v
kódu našeho programu, pokud ji budeme chtít otestovat.

Tento problém se dá řešit různými způsoby, od vytvoření [shell skriptu](https://en.wikipedia.org/wiki/Shell_script),
pomocí kterého můžeme všechny tyto úkony provést pomocí jediného příkazu v terminálu, až po pokročilé
**sestavovací systémy** (*build systems*), které umí automaticky vyhledávat cesty ke knihovnám a
překládat pouze změněné soubory pro urychlení opakovaných překladů programu.

Bohužel neexistuje jednotný standardní sestavovací systém pro programy napsané v *C*. Různé projekty
či knihovny tak používají různé sestavovací systémy, což může někdy představovat problém při jejich
integraci do našich programů. Sestavovací systémy se navíc obvykle nastavují pomocí konfiguračních
souborů, které jsou psány v proprietárních jazycích, které se musíte naučit a pochopit, abyste daný
sestavovací systém mohli používat. Situaci nepomáhá ani to, že se od sebe jednotlivé systémy značně
liší a bývají velmi komplikované. 

## [make](https://en.wikipedia.org/wiki/Make_(software))
Asi stále nejpoužívanějším sestavovacím systémem pro programy v jazyce *C* je `make`, který existuje již od roku 1976.
Pro jeho použití musíte vytvořit soubor `Makefile`, ve kterém popíšete, jak se má váš program přeložit, a poté
spustíte program `make`, který jej dle konfiguračního souboru přeloží.
  
Návod pro vytvoření konfiguračního souboru `Makefile` a použití `make` naleznete například
[zde](https://www.itnetwork.cz/cecko/linux/tutorial-c-linux-makefile).

## `CMake`
Poněkud modernější alternativou je [`CMake`](https://cmake.org/). Jedná se o tzv. meta systém, ve
skutečnosti totiž neřídí překlad vašeho programu, ale pouze generuje potřebné soubory pro nějaký
jiný sestavovací systém, který váš program teprve přeloží. Výhodou pak je, že z jednoho `CMake`
konfiguračního souboru tak můžete vygenerovat např. `Makefile` pro přeložení na Linuxu anebo jiné
konfigurační soubory pro přeložení stejného programu pod Windows.

Další výhodou `CMake` je, že některá vývojová prostředí (např.
[Visual Studio Code](../prostredi/editor/vscode.md) nebo [CLion](../prostredi/editor/clion.md))
mu rozumí a dokáží díky němu usnadnit analýzu a ladění vašich programů.

### Instalace
`CMake` můžete na Ubuntu nainstalovat následujícím příkazem v terminálu:
```bash
$ sudo apt update
$ sudo apt install cmake
```

### Použití

Pro použití `CMake` musíte vytvořit konfigurační soubor `CMakeLists.txt`, ve kterém popíšete jednotlivé
zdrojové soubory vašeho programu, a také zadáte knihovny, které chcete k vašemu programu připojit.

Minimální soubor `CMakeLists.txt` může vypadat např. takto:
```cmake
# Minimální požadovaná verze CMaku
cmake_minimum_required(VERSION 3.12)

# Název projektu
project(projektupr C)

# Vytvoření programu s názvem `du1`
# Program se bude skládat ze dvou zadaných zdrojových souborů (jednotek překladu).
# Pokud chcete do programu přidat více zdrojových souborů,
# přidejte je do tohoto seznamu.
add_executable(du1 main.c funkce.c)
```

Zde je ukázka trochu komplexnějšího souboru pro sestavení [SDL](aplikovane_ulohy/sdl.md#nastavení-sdl-pomocí-cmake) aplikace:

```cmake
cmake_minimum_required(VERSION 3.12)

project(hra C)

# Přidání přepínačů překladače
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -fsanitize=address")

# Vyhledání knihovny SDL
find_package(SDL2)

# Vytvoření programu s názvem `hra`
add_executable(hra hra.c grafika.c)

# Přidání adresářů s hlavičkovými soubory k programu (obdoba -I)
target_include_directories(hra PRIVATE ${SDL2_INCLUDE_DIRS})

# Přilinkování knihoven k programu (obdoba -l)
target_link_libraries(hra ${SDL2_LIBRARIES} m)
```

Jakmile tento soubor vytvoříte, můžete pomocí příkazu `cmake` vytvořit `Makefile`:
```bash
# Jsme ve složce s CMakeLists.txt
# Vytvoříme složku pro sestavení projektu
$ mkdir build
# Přepneme se do složky
$ cd build
# Sestavíme Makefile
$ cmake ..
```
a poté pomocí `make` program finálně přeložit:
```bash
$ make
```

Dobrá zpráva je, že pokud používáte kompatibilní vývojové prostředí, tak tyto úkony typicky provádí
za vás a vám tak stačí správně nastavit soubor `CMakeLists.txt`.

Návod k použití `CMake` naleznete například [zde](https://cmake.org/cmake/help/latest/guide/tutorial/index.html).

### Použití ve Visual Studio Code
Pokud chcete spustit či ladit `CMake` projekt ve VS Code, tak proveďte tyto kroky:
1) Nainstalujte si [toto](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) rozšíření do VS Code
2) Otevřete ve VS Code adresář, který bude obsahovat soubor `CMakeLists.txt`
3) Spusťte program pomocí `Ctrl + F5`
