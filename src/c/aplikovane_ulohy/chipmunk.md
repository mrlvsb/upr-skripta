# Chipmunk
Při tvorbě interaktivních grafických aplikací nebo her můžeme chtít simulovat pohyb objektů tak, aby
dodržoval fyzikální zákony (působení gravitace, tření a kolize objektů, pohyb lana atd.). K tomu
můžeme použít nějakou knihovnu na simulaci fyziky. [`Chipmunk`](https://chipmunk-physics.net) je
knihovna pro simulování jednoduchých fyzikálních procesů ve 2D prostoru.
[Zde](https://www.youtube.com/watch?v=K84I4qqU8wg) se můžete podívat, co všechno se s takovou
knihovnou dá udělat.

Možná znáte hry jako [Angry Birds](https://youtu.be/aiiQ8btusrs?t=399) nebo
[Fruit Ninja](https://youtu.be/3bdBToxbGqg?t=212). Podobné typy her by se bez nějaké knihovny pro
simulaci fyziky neobešly.

## Instalace
Knihovna Chipmunk nenabízí distribuci již přeložených objektových souborů, musíme tedy její zdrojové
soubory přidat k našemu projektu a přeložit je ručně.

Stáhněte si poslední verzi [zdrojových kódů knihovny](https://chipmunk-physics.net/release/ChipmunkLatest.tgz)
z webu [Chipmunku](https://chipmunk-physics.net/downloads.php), rozbalte je a výslednou složku
(např. `Chipmunk-X.Y.Z` nebo `ChipmunkLatest`) přejmenujte na `Chipmunk`.

Dále můžete knihovnu přidat ke svému `CMake` projektu pomocí následující `CMakeLists.txt` souboru:

<details>
<summary>Ukázkový CMakeLists.txt soubor pro Chipmunk</summary>

```cmake
cmake_minimum_required(VERSION 3.4)

project(physics)

# Parametr -pthread je nutný při použití této knihovny
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -pthread")

# Vložení adresáře Chipmunk
add_subdirectory(Chipmunk)

# Vytvoření programu
add_executable(physics main.c)

# Přidání knihovny k našemu programu
target_include_directories(physics PRIVATE Chipmunk/include/chipmunk)
target_link_libraries(physics chipmunk)
```
</details>

## `Chipmunk` hello world
Stejně jako u [`SDL`](sdl.md) není v silách tohoto textu poskytnout kompletního průvodce touto
knihovnou. Pro to můžete použít [manuál](https://chipmunk-physics.net/release/ChipmunkLatest-Docs/)
nebo podrobnou [dokumentaci funkcí](https://chipmunk-physics.net/release/ChipmunkLatest-API-Reference/modules.html).

Zde je okomentovaná ukázka "hello-world" příkladu, který simuluje pád sady kostek a vykresluje je
pomocí SDL:
<details>
<summary>Okomentovaný program využívající knihovny Chipmunk a SDL</summary>

```c
#include <chipmunk.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <assert.h>
#include <stdbool.h>

const int WIDTH = 800;
const int HEIGHT = 600;

int main() {
    // Vytvoření SDL okna a kreslítka
    assert(!SDL_Init(SDL_INIT_VIDEO));

    SDL_Window* window = SDL_CreateWindow("Physics", 100, 100, WIDTH, HEIGHT, SDL_WINDOW_SHOWN);
    SDL_Renderer* renderer = SDL_CreateRenderer(window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);

    // Načtení obrázku z disku
    SDL_Texture* image = IMG_LoadTexture(renderer, "wood.jpg");
    assert(image);

    SDL_SetRenderDrawColor(renderer, 0, 0, 0, 255);

    // Vytvoření prostoru, ve kterém bude probíhat fyzikální simulace
    cpSpace* space = cpSpaceNew();
    // Nastavení síly gravitace
    cpSpaceSetGravity(space, (cpVect) { .x = 0, .y = -100.0f });

    // Vytvoření země
    cpShape* ground = cpSegmentShapeNew(
        cpSpaceGetStaticBody(space),
        (cpVect) { .x = 0, .y = 10},
        (cpVect) { .x = WIDTH, .y = 10},
        0
    );
    cpShapeSetFriction(ground, 1.0f);    // Nastavení tření země
    cpSpaceAddShape(space, ground);      // Přidání země do světa

    const float mass = 10.0f;            // Váha kostky
    const int dimension = 30;            // Rozměr kostky

    cpShape* boxes[10];                  // Pole kostek
    for (int i = 0; i < 10; i++) {
        // Vytvoření těla kostky, které se bude hýbat
        cpBody* body = cpBodyNew(mass, cpMomentForBox(mass, dimension, dimension));
        // Přidání těla do prostoru
        cpSpaceAddBody(space, body);
        // Nastavení pozice kostky
        cpBodySetPosition(body, (cpVect) {
            .x = 100 + 5 * i,
            .y = 40 + i * (dimension + 10)
        });

        // Vytvoření tvaru kostky, který bude použito pro detekci kolizí
        cpShape* shape = cpBoxShapeNew(body, dimension, dimension, 1);
        // Přidání tvaru do prostoru
        cpSpaceAddShape(space, shape);
        // Nastavení tření kostky
        cpShapeSetFriction(shape, 1.0f);

        boxes[i] = shape;
    }

    Uint64 last = SDL_GetPerformanceCounter();   // Počítání času vykreslování
    float physics_counter = 0.0f;                // Počítání času fyziky
    float timestep = 1.0f / 60.0f;               // Časový krok, o který se bude fyzika posouvat

    bool quit = false;
    while (!quit) {
        SDL_Event event;
        while (SDL_PollEvent(&event)) {
            if (event.type == SDL_QUIT) {
                quit = true;
            }
        }

        Uint64 now = SDL_GetPerformanceCounter();

        // Počet vteřin od poslední iterace herní smyčky
        float delta_time_s = ((float)(now - last) / (float)SDL_GetPerformanceFrequency());
        last = now;

        // Odsimulování času fyziky
        physics_counter += delta_time_s;
        while (physics_counter >= timestep) {
            cpSpaceStep(space, timestep);  // Provedení jednoho časového kroku
            physics_counter -= timestep;
        }

        SDL_RenderClear(renderer);

        for (int i = 0; i < 10; i++) {
            cpShape* shape = boxes[i];
            cpBody* body = cpShapeGetBody(shape);

            cpVect position = cpBodyGetPosition(body);  // Získání pozice kostky
            float angle_radians = cpBodyGetAngle(body); // Získání úhlu kostky (v radiánech)
            float angle_deg = angle_radians * (180 / M_PI); // Převod na stupně

            SDL_Rect rect = {
                .x = position.x - dimension / 2,
                .y = HEIGHT - (position.y + dimension / 2),  // V Chipmunku jde Y nahoru, v SDL dolů, musíme jej vyměnit
                .w = dimension,
                .h = dimension
            };

            SDL_RenderCopyEx(renderer, image, NULL, &rect, -angle_deg, NULL, SDL_FLIP_NONE);
        }

        SDL_RenderPresent(renderer);
    }

    // Uvolnění prostředků
    for (int i = 0; i < 10; i++) {
        cpShape* shape = boxes[i];
        cpBody* body = cpShapeGetBody(shape);

        cpSpaceRemoveShape(space, shape);
        cpSpaceRemoveBody(space, body);
        cpShapeFree(shape);
        cpBodyFree(body);
    }
    cpSpaceRemoveShape(space, ground);
    cpShapeFree(ground);
    cpSpaceFree(space);
    SDL_DestroyTexture(image);
    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);
    SDL_Quit();

    return 0;
}
```
</details>

Ukázka fungování programu:

<video src="../../static/video/chipmunk-boxes.webm" controls></video>

Tento program spolu s `CMakeLists.txt` souborem a knihovnou Chipmunk si můžete stáhnout
[zde](../../static/snippets/physics.zip). Přeložit a spustit ho můžete pomocí následujících příkazů:
```bash
$ mkdir build
$ cd build
$ cmake ..
$ make -j
$ cd ..
$ ./build/physics
```
