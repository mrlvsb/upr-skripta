# SDL
[`SDL`](https://www.libsdl.org/) je knihovna pro tvorbu interaktivních grafických aplikací a her.
Umožňuje vám vytvářet okna, vykreslovat do nich jednotlivé pixely, obrázky či text, snímat vstup z
myši a klávesnice či třeba přehrávat zvuk. Jedná se tak v podstatě o tzv. **herní engine**, i když
ve srovnání např. s enginy [Unity](https://unity.com/) nebo [Unreal](https://www.unrealengine.com/)
je tento engine velmi jednoduchý.

## Instalace `SDL`
Narozdíl od knihovny, kterou jsme si ukazovali pro vytváření [`GIF` animací](gif.md), `SDL` obsahuje
spoustu zdrojových i hlavičkových souborů, a nebylo by tak ideální ji kopírovat k našemu programu.
Připojíme ji tedy k našemu programu jako klasickou
[knihovnu](../modularizace/knihovny.md#použití-knihoven-s-gcc) ve formě archivu. Abychom knihovnu
mohli použít, nejprve si ji musíme stáhnout. To můžeme udělat dvěma způsoby:
- **Instalace pomocí správce balíčků** (*doporučeno*): Jelikož je `SDL` velmi známá a používaná
knihovna, ve většině distribucí Linuxu není problém ji nainstalovat přímo z balíčkového manažeru.
V Ubuntu to můžete provést pomocí následujícího příkazu v terminálu, který nainstaluje kromě balíčku
se základní funkcionalitou také dva další balíčky nutné pro vykreslování obrázků a textu[^1]:
    ```bash
    $ sudo apt install libsdl2-dev libsdl2-image-dev libsdl2-ttf-dev
    ```
    Výhodou tohoto způsobu je, že knihovna bude nainstalována v systémových cestách, `gcc` ji tak
    bude umět naleznout i bez toho, abychom mu museli zadat explicitní cestu. Nevýhodou je, že verze
    knihoven nacházejících se v balíčkových manažerech bývají typicky dosti zastaralé.

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
$ gcc main.c -lSDL2
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

```cmake
cmake_minimum_required(VERSION 3.18)

project(sdlapp)

find_package(SDL2 REQUIRED)

add_executable(main main.c)
target_link_libraries(main SDL2 SDL2_image SDL2_ttf)
```

</details>

## Dokumentace
Abyste mohli používat nějakou složitější knihovnu, je nutné se zorientovat v její dokumentaci. V té
naleznete jednak deklarace a popis fungování jednotlivých funkcí, které knihovna nabízí, ale také
různé návody pro to, jak s knihovnou pracovat.

Dokumentaci funkcí `SDL` naleznete [zde](https://wiki.libsdl.org/APIByCategory), návody pro jeho
použití například [tady](https://www.willusher.io/pages/sdl2/). V předmětu `UPR` budeme používat
pouze `SDL` verze 2, které se značně liší od předchozí verze. Dávejte si tedy u návodů na internetu
pozor na to, jestli se týkají správné verze `SDL`.

> `SDL` je relativně rozsáhlá knihovna a není v silách tohoto textu, abychom ji plně popsali. Proto
> níže naleznete pouze velmi stručný "Hello world" a seznam věcí, které vám SDL umožňuje. Zbytek
> naleznete v dokumentaci a návodech na internetu.

## `SDL` hello world
Abychom něco vykreslili, tak jako první věc musíme nainicializovat SDL a vytvořit okno[^2]:

[^2]: Pro zpřehlednění kódu bude v ukázkách níže vynechána kontrola chyb. Celý program i s kontrolou
chyb naleznete na konci této sekce.

```c
#include <SDL2/SDL.h>  // Vložení hlavního hlavičkového souboru SDL
#include <stdbool.h>

int main()
{
    SDL_Init(SDL_INIT_VIDEO);   // Inicializace SDL

    // Vytvoření okna
    SDL_Window* window = SDL_CreateWindow(
        "SDL experiments",  // Název
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
    SDL_Event e;
    bool quit = false;
    int pos = 100;

    while (!quit)
    {
        // Dokud jsou k dispozici nějaké události, ukládej je do proměnné `e`
        while (SDL_PollEvent(&e))
        {
            // Pokud došlo k uzavření okna, nastav proměnnou `quit` na `true`
            if (e.type == SDL_QUIT)
            {
                quit = true;
            }
        }

        // Nastavení barvy vykreslování na černou
        SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);

        // Vykreslení pozadí
        SDL_RenderClear(renderer);

        // Nastavení barvy na červenou
        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255);

        // Vykreslení čáry
        SDL_RenderDrawLine(renderer, pos, pos, pos + 100, pos + 100);

        pos++;

        // Zobrazení vykreslených prvků na obrazovku
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
#include <stdbool.h>

int main()
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

    SDL_Event e;
    bool quit = false;
    int pos = 100;

    while (!quit)
    {
        while (SDL_PollEvent(&e))
        {
            if (e.type == SDL_QUIT)
            {
                quit = true;
            }
        }
        SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255); // Nastavení barvy na černou
        SDL_RenderClear(renderer);                      // Vykreslení pozadí

        SDL_SetRenderDrawColor(renderer, 255, 0, 0, 255); // Nastavení barvy na červenou
        SDL_RenderDrawLine(renderer, pos, pos, pos + 100, pos + 100); // Vykreslení čáry

        pos++;

        SDL_RenderPresent(renderer);  // Prezentace kreslítka
    }

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}
```
</details>

## Co lze dělat pomocí `SDL`?
Knihovna `SDL` nabízí spoustu funkcionality k tvorbě interaktivních aplikací a her. Můžete s ní
například:
- [Vykreslovat](https://wiki.libsdl.org/CategoryRender) body, čáry či obdélníky.
- Reprezentovat [obdélníky](https://wiki.libsdl.org/CategoryRect) a počítat jejich průniky (např.
pro detekci kolizí herních objektů).
- [Reagovat](https://wiki.libsdl.org/CategoryEvents) na vstup uživatele, ať už z klávesnice nebo z myši.
- Načítat a vykreslovat [obrázky](https://wiki.libsdl.org/SDL_image/FrontPage).
- Načítat a vykreslovat [text](https://wiki.libsdl.org/SDL_ttf/FrontPage).
- Přehrávat [zvuk](https://wiki.libsdl.org/CategoryAudio).
