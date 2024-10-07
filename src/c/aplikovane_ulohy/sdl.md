# SDL
> 📹 K tématu SDL byly pořízeny následující záznamy z doučování UPR:
> - [Základy SDL](https://www.youtube.com/watch?v=jUktXOH5o1I) \[01:23:06]
> - [Flappy Bird v SDL](https://www.youtube.com/watch?v=umuMcTKhm0w) \[01:22:29]

[`SDL`](https://www.libsdl.org/) je knihovna pro tvorbu interaktivních grafických aplikací a her.
Umožňuje nám vytvářet okna, vykreslovat do nich jednotlivé pixely, obrázky či text, snímat vstup z
myši a klávesnice či třeba přehrávat zvuk. Jedná se tak v podstatě o tzv. **herní engine**, i když
ve srovnání např. s enginy [Unity](https://unity.com/) nebo [Unreal](https://www.unrealengine.com/)
je tento engine velmi jednoduchý.

V této kapitole naleznete informace o tom, jak SDL nainstalovat, jak přeložit program využívající SDL funkcí
a jak může vypadat základní SDL program, který něco vykresluje na obrazovku. V následujících podkapitolách se poté můžete
dozvědět více o konceptech SDL užitečných pro tvorbu her:

- [Herní smyčka](sdl/herni_smycka.md)
- [Kreslení](sdl/kresleni.md)
- [Zpracování vstupu](sdl/vstup.md)

## Instalace `SDL`
Narozdíl od knihovny, kterou jsme si ukazovali pro vytváření [`GIF` animací](gif.md), `SDL` obsahuje
spoustu zdrojových i hlavičkových souborů, a nebylo by tak ideální ji kopírovat k našemu programu.
Připojíme ji tedy k našemu programu jako klasickou
[knihovnu](../modularizace/knihovny.md#použití-knihoven-s-gcc) ve formě archivu. Abychom knihovnu
mohli použít, nejprve si ji musíme stáhnout. To můžeme udělat dvěma způsoby:
- **Instalace pomocí správce balíčků** (*doporučeno*): Jelikož je `SDL` velmi známá a používaná
knihovna, ve většině distribucí Linuxu není problém ji nainstalovat přímo pomocí správce balíčků.
V Ubuntu to můžete provést pomocí následujícího příkazu v terminálu, který nainstaluje kromě základní SDL knihovny
také dvě další pomocné knihovny potřebné pro vykreslování obrázků a textu[^1]:
    ```bash
    $ sudo apt update
    $ sudo apt install libsdl2-dev libsdl2-image-dev libsdl2-ttf-dev
    ```
    Výhodou tohoto způsobu je, že knihovna bude nainstalována v systémových cestách, a překladač `gcc` ji tak
    bude umět naleznout i bez toho, abychom mu museli zadat explicitní cestu. Nevýhodou může být, že verze
    knihoven nabízené správci balíčků bývají typicky docela zastaralé.

[^1]: Pokud by vás zajímalo, které všechny soubory a kam se nainstalovaly, můžete po instalaci balíčků
použít příkaz
```bash
$ dpkg -L libsdl2-dev
```

- **Manuální stažení knihovny**: Knihovnu si můžete také stáhnout manuálně, např. z
[GitHubu SDL](https://github.com/libsdl-org/SDL/releases/download/release-2.28.3/SDL2-2.28.3.zip). Některé knihovny
můžete naleznout na internetu už přeložené, nicméně `SDL` oficiálně pro Linux přeložené knihovní soubory (`.so`)
nenabízí. V tomto případě tak musíte knihovnu nejenom stáhnout, ale také ručně přeložit, než ji budete moct použít ve
svém programu.

## Přilinkování knihovny `SDL`
Pokud jste nainstalovali `SDL` pomocí systémových balíčků, stačí při překladu programu přilinkovat
knihovnu `SDL2`:
```bash
$ gcc main.c -omain -lSDL2
```
Pokud jste knihovnu překládali manuálně, musíte ještě použít parametry `-I` pro předání cesty k
hlavičkovým souborům a `-L` pro předání cesty k adresáři s přeloženou knihovnou, jak již bylo
vysvětleno [zde](../modularizace/knihovny.md#použití-knihoven-s-gcc).

Pro práci s obrázky bude dále nutné přilinkovat knihovnu `SDL2_image` a pro práci s textem knihovnu
`SDL2_ttf`.

Pokud byste chtěli používat SDL v kombinaci s [CMake](../automatizace_prekladu.md#cmake), můžete použít
tento vzorový `CMakeLists.txt` soubor:

<details>
<summary>CMakeLists.txt soubor pro SDL</summary>

Najděte SDL2 baliček, který jste stáhli [výše](#instalace-sdl)
```cmake
find_package(SDL2 REQUIRED)
```
Linkněte SDL
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

target_link_libraries(sdlapp PUBLIC SDL2::SDL2main SDL2::SDL2-static)
```

</details>

## Zprovoznění SDL pod WSL
Pokud chcete použít knihovnu SDL v kombinaci s použitím systému [WSL](../../prostredi/linux/instalace.md),
budete si muset nastavit zobrazování grafických Linux aplikací na Windows.

Pokud máte aktuální verzi Windows 11 a WSL, tak by mělo stačit spustit grafický program (např. C program
využívající SDL). Více detailů se můžete dozvědět [zde](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps).
Pokud nemáte Windows 11 nebo se vám grafický výstup aplikace nezobrazuje, tak budete muset použít tzv. "Emulaci X serveru",
popsanou níže.

<details>
<summary>Emulace X serveru</summary>

Jedním ze způsobů, který se na Linuxu používá pro vykreslování grafiky, je tzv.
[X server](https://en.wikipedia.org/wiki/X_Window_System). Funguje tak, že aplikace, které chtějí něco
vykreslit, komunikují s X serverem, který poté grafiku vykreslí v nějakém okně.

Aby toto fungovalo pod Windows, tak musíte na Windows spustit X server, ke kterému se poté připojí
klient (vaše C SDL aplikace) spuštěná pod systémem WSL.

Návod, jak tento X server na Windows nainstalovat, naleznete např. [zde](https://techcommunity.microsoft.com/t5/windows-dev-appconsult/running-wsl-gui-apps-on-windows-10/ba-p/1493242).

Zkrácená verze návodu:
1) Stáhněte a nainstalujte si program [VcXsrv](https://sourceforge.net/projects/vcxsrv/).
2) Zapněte na Windows program `XLaunch` a v nastavení zaškrtněte volbu `Disable access control`.

   Tento program musí běžet na pozadí, aby fungovalo spouštění grafických aplikací pod WSL (pokud
   restartujete počítač, budete ho muset spustit znovu).
3) Ve WSL terminálu poté musíte nastavit proměnnou prostředí `DISPLAY` na správnou hodnotu, aby
   spuštěný program komunikoval s X serverem spuštěným pod Windows. Dosáhnout toho můžete např. následujícím
   příkazem:
    ```console
    $ export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"
    ```
   Tento příkaz musíte spustit v terminálu, odkud budete vaši SDL aplikaci spouštět. Pokud spustíte
   nový terminál, musíte příkaz spustit znovu.
4) Dále by mělo stačit spustit SDL aplikaci a její grafický výstup by se měl objevit v novém okně
   pod Windows.
</details>

## Dokumentace
Abyste mohli používat nějakou složitější knihovnu, je nutné se zorientovat v její dokumentaci. V té
naleznete jednak deklarace a popis fungování jednotlivých funkcí, které knihovna nabízí, ale také
různé návody pro to, jak s knihovnou pracovat.

Dokumentaci funkcí `SDL` naleznete [zde](https://wiki.libsdl.org/APIByCategory), návody pro jeho
použití například [tady](https://www.willusher.io/pages/sdl2/). V předmětu `UPR` budeme používat
pouze `SDL` verze 2, které se značně liší od předchozí verze. Dávejte si tedy u návodů na internetu
pozor na to, jestli se týkají správné verze `SDL`.

> `SDL` je relativně rozsáhlá knihovna a není v silách tohoto textu, abychom ji plně popsali.
> Níže naleznete stručný "Hello world" a seznam věcí, které vám SDL umožňuje, a v následujících podkapitolách
> poté základní informace o použití SDL ke tvorbě her. Zbytek naleznete v dokumentaci a návodech na internetu.

## `SDL` hello world
Abychom něco vykreslili, tak jako první věc musíme nainicializovat SDL a vytvořit okno[^2]:

[^2]: Pro zpřehlednění kódu bude v ukázkách níže vynechána kontrola chyb. Celý program i s kontrolou
chyb naleznete na konci této sekce.

```c
// Vložení hlavního hlavičkového souboru SDL
#include <SDL2/SDL.h>

int main(int argc, char *argv[])
{
    // Inicializace SDL
    SDL_Init(SDL_INIT_VIDEO);

    // Vytvoření okna
    SDL_Window* window = SDL_CreateWindow(
        "SDL experiments",  // Titulek okna
        100,                // Souřadnice x
        100,                // Souřadnice y
        800,                // Šířka
        600,                // Výška
        SDL_WINDOW_SHOWN    // Okno se má po vytvoření rovnou zobrazit
    );
```
Jakmile máme otevřené okno, můžeme do něj něco začít vykreslovat. K tomu musíme nejprve vytvořit
`SDL_Renderer`, neboli kreslítko:
```c
    // Vytvoření kreslítka
    SDL_Renderer* renderer = SDL_CreateRenderer(
        window,
        -1,
        SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC
    );
```

S kreslítkem už můžeme něco nakreslit na obrazovku. Musíme vytvořit tzv.
[**herní smyčku**](https://en.wikipedia.org/wiki/Video_game_programming#Game_structure) (*game
loop*), která se bude provádět neustále dokola. Ve smyčce nejprve získáme události, které nastaly
(např. došlo ke stisknutí klávesy nebo pohybu myši), poté je zpracujeme, vykreslíme nový obsah
okna a odešleme jej k vykreslení (za použití tzv.
[**double bufferingu**](https://en.wikipedia.org/wiki/Multiple_buffering#Double_buffering_in_computer_graphics)).

Konkrétně budeme vykreslovat jednoduchou posouvající se čáru, dokud uživatel nezavře otevřené okno:
```c
    SDL_Event event;
    int running = 1;
    int line_x = 100;

    while (running == 1)
    {
        // Dokud jsou k dispozici nějaké události, ukládej je do proměnné `event`
        while (SDL_PollEvent(&event))
        {
            // Pokud došlo k uzavření okna, nastav proměnnou `running` na `0`
            if (event.type == SDL_QUIT)
            {
                running = 0;
            }
        }

        // Posuň pozici čáry doprava
        line_x++;

        // Nastav barvu vykreslování na černou
        SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);

        // Vykresli pozadí
        SDL_RenderClear(renderer);

        // Nastav barvu vykreslování na červenou
        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255);

        // Vykresli čáru
        SDL_RenderDrawLine(renderer, line_x, 50, line_x, 250);

        // Zobraz vykreslené prvky na obrazovku
        SDL_RenderPresent(renderer);
    }
```
A na konci už akorát vše uvolníme:
```c
    // Uvolnění prostředků
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}
```

> Pokud spustíte program využívající `SDL` s Address sanitizerem, může se stát, že vám sanitizer
> zobrazí nějakou [neuvolněnou paměť](../../caste_chyby/pametove_chyby.md#memory-leak). Pokud zdroj
> alokace nepochází z vašeho kódu, můžete tyto chyby ignorovat. Tyto chyby pochází přímo z SDL a nemáte
> se jich jak zbavit.

<details>
<summary>Celý kód i s ošetřením chyb</summary>

```c
#include <SDL2/SDL.h>

int main(int argc, char *argv[])
{
    if (SDL_Init(SDL_INIT_VIDEO)) {
        fprintf(stderr, "SDL_Init Error: %s\n", SDL_GetError());
        return 1;
    }
    SDL_Window* window = SDL_CreateWindow("SDL experiments", 100, 100, 800, 600, SDL_WINDOW_SHOWN);
    if (!window) {
        fprintf(stderr, "SDL_CreateWindow Error: %s\n", SDL_GetError());
        SDL_Quit();
        return 1;
    }

    SDL_Renderer* renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
    if (!renderer) {
        SDL_DestroyWindow(window);
        fprintf(stderr, "SDL_CreateRenderer Error: %s", SDL_GetError());
        SDL_Quit();
        return 1;
    }

    int line_x = 100;

    SDL_Event event;
    int running = 1;

    while (running == 1)
    {
        while (SDL_PollEvent(&event))
        {
            if (event.type == SDL_QUIT)
            {
                running = 0;
            }
        }

        line_x++;
    
        SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255); // Nastavení barvy na černou
        SDL_RenderClear(renderer);                      // Vykreslení pozadí

        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255); // Nastavení barvy na červenou
        SDL_RenderDrawLine(renderer, line_x, 50, line_x, 250); // Vykreslení čáry

        SDL_RenderPresent(renderer);  // Prezentace kreslítka
    }

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}
```
</details>

## Co lze všechno dělat pomocí `SDL`?
Knihovna `SDL` nabízí spoustu funkcionality k tvorbě interaktivních aplikací a her. Můžete s ní
například:
- [Vykreslovat](https://wiki.libsdl.org/CategoryRender) body, čáry či obdélníky.
- Reprezentovat [obdélníky](https://wiki.libsdl.org/CategoryRect) a počítat jejich průniky (např.
pro detekci kolizí herních objektů).
- [Reagovat](https://wiki.libsdl.org/CategoryEvents) na vstup uživatele, ať už z klávesnice nebo z myši.
- Načítat a vykreslovat [obrázky](https://wiki.libsdl.org/SDL_image/FrontPage).
- Načítat a vykreslovat [text](https://wiki.libsdl.org/SDL_ttf/FrontPage).
- Přehrávat [zvuk](https://wiki.libsdl.org/CategoryAudio).
