# Herní smyčka
Základem víceméně všech "real-time" počítačových her je tzv. herní smyčka. Jedná se o cyklus v programu,
který se stará o aktualizaci stavu hry, a vykreslení jednoho tzv. **snímku** (*frame*) na obrazovku. Hry typicky fungují
tak, že běží donekonečna v tomto cyklu (herní smyčce), a např. 60x za vteřinu aktualizují stav hry a poté jej vykreslí.
Z toho také pochází pojem **Snímků za vteřinu** (*Frame per second*, *FPS*), který udává, jak často je hra schopná se
vykreslit za vteřinu.

Herní smyčku vytvoříme jednoduše jako cyklus, který poběží až do doby, než bude potřeba naši hru vypnout:
```c
int running = 1;
while (running == 1) {
    // Tělo herní smyčky
}
```

V každé iteraci herní smyčky bychom měli provést následující činnosti (ideálně v tomto pořadí):
1) Přečíst a zareagovat na události operačního systému
   - Např. žádost o vypnutí aplikace, stisk klávesy, pohyb myši
2) Aktualizovat stav hry v paměti
   - Např. pohnout postavou či projektilem, aktualizovat čas cooldownu atd.
3) Vykreslit aktuální stav hry na obrazovku

## Reakce na události
Jako úplný základ bychom měli mít v herní smyčce čtení událostí operačního systému, které si můžeme přečíst pomocí
volání funkce [`SDL_PollEvent`](https://wiki.libsdl.org/SDL2/SDL_PollEvent). Do této funkce předáme adresu struktury
[`SDL_Event`](https://wiki.libsdl.org/SDL2/SDL_Event), a pokud funkce vrátí hodnotu `1`, tak došlo k nějaké události,
a my si můžeme informaci o této události z předané struktury `SDL_Event` přečíst:

```c
SDL_Event event;
while (SDL_PollEvent(&event)) {
    // Pokud došlo k uzavření okna, nastav proměnnou `running` na `0`
    if (event.type == SDL_QUIT) {
        running = 0;
    }
}
```

Pokud dojde k události `SQL_QUIT`, tak se uživatel snaží naši aplikaci vypnout (např. kliknutím na ikonku křížku v rohu
okna aplikace). Na tuto událost bychom měli zareagovat tak, že náš program (hru) vypneme.[^1]

[^1]: Pokud bychom tak neudělali, tak se aplikace "zasekne", a zobrazí se nechvalně známý dialog operačního systému o
neresponzivní aplikaci.

Při kontrole událostí budeme chtít typicky reagovat na vstup uživatele z klávesnice či myši. Více o zpracování vstupu
se můžete dozvědět [zde](vstup.md).

## Kompenzace FPS
Při aktualizaci stavu hry a provádění jakéhokoliv pohybu, rotace apod. bychom měli vždy brát v potaz **kompenzaci FPS**
(snímků za vteřinu). Představte si, že v naší hře máme nějaký pohybující se objekt, který chceme posouvat v
každém snímku hry o nějaký počet pixelů daným směrem:
```c
int position = 0;
while (running == 1) {
    // ...

    position += 1;
    SDL_RenderDrawLine(renderer, position, 100, position, 200);

    // ...
}
```
V kódu výše posouváme v každé iteraci pozici čáry o jeden pixel. Co se v tomto případě stane, když naše aplikace bude mít
60 FPS? Čára se za jednu vteřinu posune o 60 pixelů. Pokud by naše aplikace měla ale např. pouze 20 FPS, tak se čára posune
pouze o 20 pixelů! A kdyby měla 1000 FPS, tak se naopak posune o celých 1000 pixelů.

Pokud by logika her závisela na počtu FPS, tak by to jistě způsobovalo problémy. Představte si například, že v hrách,
jako je Call of Duty nebo Counter-Strike, by počet FPS ovlivňoval, jak rychle postava poběží nebo jak rychle se budou
pohybovat projektily, které postava vystřelí. S takovýmto řešením by hráči ani autoři hry určitě nebyli spokojeni.

Ideálně bychom chtěli, aby se v naší hře vše pohybovalo stanovenou rychlostí, nezávisle na současné hodnotě FPS.
Toho můžeme dosáhnout pomocí tzv. **delta času** (*delta time*). Delta je označení pro čas vykonání jedné iterace herní
smyčky. Čím více bude mít naše hra FPS, tím menší bude delta:

- Při `60 FPS` je delta `~0.016 s`, neboli `~16 ms`
- Při `10 FPS` je delta `~0.1 s`, neboli `~100 ms`
- Při `1 FPS` je delta `~1 s`, neboli `~1000 ms`

Deltu můžeme vypočítat pomocí funkcí na měření času nabízených knihovnou SDL:
```c
// Uložení poslední hodnoty čítače
Uint64 last = SDL_GetPerformanceCounter();

while (running == 1) {
    // Zjištění současné hodnoty čítače
    Uint64 now = SDL_GetPerformanceCounter();
    
    // Výpočet delty, času od posledního provedení tohoto řádku (tj. délky iterace herní smyčky)
    double deltaTime = (double)((now - last) / (double)SDL_GetPerformanceFrequency());

    // Uložení poslední hodnoty čítače
    last = now;

    // ...
}
```

> Pokud si chcete naměřit a vypisovat hodnotu FPS své hry, stačí vypsat převrácenou hodnotu delty, tj. platí
> `FPS = 1 / deltaTime`.

Jakmile máme k dispozici hodnotu delty, můžeme ji využít k tomu, abychom pohyb ve hře přizpůsobili počtu FPS. Toho dosáhneme
tak, že budeme každý pohyb ve hře "škálovat" (neboli násobit) hodnotou delty:
```c
position += 100 * deltaTime;
```

Když budeme mít hodně FPS (tj. malou hodnotu delty), tak budeme hýbat (a vykreslovat) objekty spoustakrát za vteřinu, takže
chceme, aby objekty dělaly malé kroky, a hýbaly se plynule. V tomto případě bude delta mít malou hodnotu, takže pohyb
se bude provádět po malých krocích. Pokud budeme mít naopak málo FPS (tj. velkou hodnotu delty), tak budeme hýbat
objekty pouze několikrát za vteřinu, takže poté musí objekty udělat větší krok, aby urazily stejnou vzdálenost za stejnou
časovou jednotku. V tomto případě bude delta mít velkou hodnotu, takže pohyb se bude provádět po velkých krocích.

Tento princip si můžeme demonstrovat na následujících animaci, které zobrazují pohyb tří obdélníků s různým počtem
snímků za vteřinu. První obdélník se pohybuje s 60 FPS, druhý obdélník s 10 FPS, a třetí obdélník s 1 FPS.
Všimněte si, že za stejnou dobu všechny obdélníky urazí cca stejnou vzdálenost. Díky kompenzaci pohybu pomocí
delta času jsou tak rychlosti obdélníků nezávislé na FPS.

<img src="../../../static/img/sdl/fps-compensation.gif" width="300" height="200" alt="FPS compensation demonstration" />

**Nezapomeňte tak ve svých hrách všechny pohyby, rotace, animace, aktualizace času, cooldownů atd. násobit deltou!**

U násobení hodnot deltou je potřeba dát si pozor na jednu věc, a to jsou desetinná čísla. Pokud budeme mít např. pozici
nějakého objektu ve hře reprezentovanou celým číslem (`int`), tak může dojít k problému se zaokrouhlováním. Pokud např.
budeme chtít tento objekt posunout rychlostí 10, a budeme mít 60 FPS, tak `10 * 0.016` je `0.16`, což se při převodu
na `int` zaokrouhlí na hodnotu `0`! Při násobení deltou bychom se tedy mohli dostat do situace, kdy se naše objekty
vůbec nebudou hýbat, protože jednotlivé kroky budou moc malé na to, aby se vůbec na hodnotě celého čísla projevily. Proto
se snažte reprezentovat veškeré pozice a podobné hodnoty, které musíte násobit deltou, pomocí desetinných čísel, tj.
datových typů `float` nebo `double`.

## V-sync
Pokud spustíte svou hru a naměříte si počet FPS, tak možná zjistíte, že počet snímků je "zamknutý" na nějaké pevné hodnotě,
např. 60 FPS, a nestoupá výše. Toto je pravděpodobně způsobeno tím, že jste si nastavili při vytváření kreslítka (tj.
volání funkce [`SDL_CreateRenderer`](https://wiki.libsdl.org/SDL2/SDL_CreateRenderer)) vlastnost ("flag")
[`SDL_RENDERER_PRESENTVSYNC`](https://wiki.libsdl.org/SDL2/SDL_RendererFlags). Tento parametr zapíná tzv. V-sync, což je
mechanismus pro synchronizaci FPS vaší hry a vykreslovací frekvence vašeho monitoru. Váš monitor má pravděpodobně nějakou
omezenou maximální vykreslovací frekvenci, typicky např. 60, 120, 144 FPS. Pokud by vaše hra měla více snímků za vteřinu,
např. 1000 FPS, tak by se vykreslovala výrazně jinou frekvenci, než váš monitor, což by mohlo způsobovat nepříjemné
vizuální artefakty.

Mechanismus V-sync tomuto zabraňuje tím, že vytvoří maximální limit pro FPS vaší hry, který bude odpovídat vykreslovací
frekvenci vašeho monitoru. Z toho důvodu při zapnutém V-syncu vaše hra bude typicky mít maximálně třeba 60 FPS. Pro
jednoduché SDL hry v UPR doporučujeme nechat V-sync zapnutý, aby vaše hra neměla zbytečně moc FPS. Pokud byste totiž
dlouhodobě vykreslovali vaši hru bez omezení FPS, může to mít negativní vliv na váš hardware (např. grafickou kartu),
která se tím může přetížit, začít pískat nebo se i dokonce zničit. Proto raději používejte V-sync a ujistěte se, že vaše
hra nemá nesmyslně vysokou hodnotu (např. 1000+) FPS.

## Double buffering
Při vykreslování stavu hry do "kreslítka" (`SDL_Renderer`) vždy vykreslujeme věci postupně - nejprve nakreslíme pozadí,
poté např. hráčovu postavu, poté letící projektily atd. Pokud by se ihned po vykreslení nakreslené objekty zobrazovaly
na monitoru, nepůsobilo by to graficky pěkně, protože by hráč viděl částečně vykreslený stav, který by vůbec nemusel dávat
smysl.

Z toho důvodu se při vykreslování her využívá princip tzv. [**double bufferingu**](https://en.wikipedia.org/wiki/Multiple_buffering#Double_buffering_in_computer_graphics),
který je zabudovaný přímo v SDL. Myšlenka double bufferingu je taková, že v paměti budeme mít dvě plátna. Do jednoho plátna
budeme vždy postupně kreslit současný stav hry, a druhé plátno se bude ukazovat hráčovi na monitoru. V momentě, kdy
nakreslíme celý stav hry, tak pouze řekneme, že se mají plátna prohodit, tj. naše nakreslené plátno se zobrazí na monitoru,
a dále budeme kreslit na plátno z minulé iterace herní smyčky. Díky tomu, že prohození je velmi rychlá operace, tak při
tomto přístupu hráč vždy uvidí pouze kompletně vykreslené snímky, a ne žádný částečně vykreslený stav. V SDL dosáhneme
prohození těchto dvou pláten pomocí zavolání funkce [`SDL_RenderPresent`](https://wiki.libsdl.org/SDL2/SDL_RenderPresent).
Volání této funkce by se mělo vyskytovat na úplném konci naší herní smyčky, a mělo by ukončit vykreslování stavu naší hry.

Jelikož při použití double bufferingu neustále pracujeme se stejnými dvěmi plátny, a plátno, do kterého kreslíme, může
obsahovat libovolné pixely (např. ty, které jsme vykreslili v minulé iteraci herní smyčky), měli bychom vždy na začátku
vykreslování toto plátno celé překreslit barvou pozadí, ideálně pomocí funkce [`SDL_RenderClear`](https://wiki.libsdl.org/SDL2/SDL_RenderClear).
Pokud tak neučiníte, můžou na plátně být vizuální artefakty, obsah plátna z minulé iterace, případně cokoliv jiného,
což určitě není žádoucí.
