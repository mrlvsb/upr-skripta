## Co je CMake?

CMake je open-source build systém, který automatizuje proces konfigurace a sestavení softwarových projektů napříč různými platformami.

## Co znamená jednotlivý řádek, když vytvořím projekt v CLionu?

Když vytváříme projekt v CLionu, automaticky se vygeneruje soubor **CMakeLists.txt**, který vypadá následovně:

```cmake
cmake_minimum_required(VERSION 3.21)
project(testupr C)

set(CMAKE_C_STANDARD 11)

add_executable(testupr main.c)
```

```cmake
cmake_minimum_required(VERSION 3.21)
```

- Tento řádek určuje minimální požadovanou verzi CMake, která je potřebná pro sestavení projektu. V tomto případě je požadovaná verze 3.21. Pokud máte starší verzi CMake, sestavení projektu nebude
  možné.

```cmake
project(testupr C)
```

- Definuje název projektu, který je v tomto případě "testupr", a určuje, že projekt je napsán v jazyce C.

```cmake
set(CMAKE_C_STANDARD 11)
```

- Tento řádek nastavuje verzi standardu jazyka C, kterou má kompilátor použít. Zde je to C11.

```cmake
add_executable(testupr main.c)
```

- Tento příkaz říká, že výsledkem buildu bude spustitelný soubor nazvaný "testupr".

> Když chcete přidat další soubory do projektu, jednoduše je přidejte takto:
> ```cmake
> add_executable(testupr main.c funkce.c)
> ```
> Pokud soubor vytvoříte přes CLion automaticky vám je zde přidá.

![CMake_přidání_souboru](../../static/video/cmake_add_file.gif)

## Přidání SDL2 do projektu

Pokud chceme přidat externí knihovnu do našeho projektu, musíme zkontrolovat, zda také používá CMake. To zjistíme tak, že v kořenovém adresáři knihovny hledáme soubor **CMakeLists.txt**. SDL ho používá a
pokud tento soubor otevřete, uvidíte, že název projektu je **SDL2**. Tento název je pro nás důležitý, protože podle něj ho budeme linkovat do naší aplikace.

1. Najděte SDL2 baliček, který jste stáhnuli výše
    ```cmake
   add_subdirectory(vendor/SDL)
   ```
2. Přidejte header soubory:
   ```cmake
   target_include_directories(<název vašeho projektu> PUBLIC vendor/SDL/include)
   ```
3. Linkněte SDL
   ```cmake
   target_link_libraries(<název vašeho projektu> PUBLIC SDL2::SDL2main SDL2::SDL2-static)
   ```

Finální soubor by mohl vypadat následovně

```cmake
cmake_minimum_required(VERSION 3.21)
project(sdlapp C)

set(CMAKE_C_STANDARD 11)

add_executable(sdlapp main.c)

find_package(SDL2 REQUIRED)

target_include_directories(sdlapp PUBLIC vendor/SDL/include)
target_link_libraries(sdlapp PUBLIC SDL2::SDL2main SDL2::SDL2-static)
```





