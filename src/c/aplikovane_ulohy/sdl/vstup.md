# Vstup
Aby naše hry či jiné SDL programy byly interaktivní, tak budeme muset reagovat na vstup od uživatele. Zejména se bude
jednat o vstup z klávesnice (zmáčknutí klávesy) či myši (pohyb, zmáčknutí tlačítka, otočení kolečka).

## Reakce na události operačního systému
V kapitole o [herní smyčce](herni_smycka.md#reakce-na-události) už jsme si ukázali, jak můžeme číst události operačního
systému. Jelikož se čtení událostí výrazně dotýká i vstupu od uživatele, tak si jej zde popíšeme více do detailu. Pro
připomenutí, takto můžeme vyčíst všechny události, které nastaly od poslední iterace herní smyčky:

```c
SDL_Event event;
while (SDL_PollEvent(&event)) {
    // Zde můžeme pracovat s proměnnou `event`
}
```

Když se podíváte na dokumentaci struktury [`SDL_Event`](https://wiki.libsdl.org/SDL2/SDL_Event), tak tam najdete
různé typy událostí, ke kterým může dojít. Abyste zjistili, k jakému typu události došlo, musíte se podívat na
atribut `type` struktury `SDL_Event`. Tento atribut může nabývat hodnot, které jsou znázorněny v prvním sloupci
[**této tabulky**](https://wiki.libsdl.org/SDL2/SDL_Event#table). Jedná se například o následující typy událostí:
- Žádost o vypnutí aplikace `SDL_QUIT`
- Pohnutí myši `SDL_MOUSEMOTION`
- Zmáčknutí tlačítka myši `SDL_MOUSEBUTTONDOWN`
- Zmáčknutí tlačítka klávesnice `SDL_KEYDOWN`

V programu byste poté měli mít podmínku, kterou zkontrolujete, jestli došlo k události, na kterou chcete zareagovat.
Uvnitř podmínky poté můžete přistupovat k atributu struktury `SDL_Event`, který odpovídá danému typu události. Název
tohoto atributu se dozvíte ve třetím sloupci zmíněné tabulky, a datový typ tohoto atributu poté najdete ve druhém sloupci.

Pokud by tedy např. došlo k události otočení kolečka myši (`SDL_MOUSEWHEEL`), tak poté můžete přistoupit k atributu
`event.wheel`, který bude mít typ [`SDL_MouseWheelEvent`](https://wiki.libsdl.org/SDL2/SDL_MouseWheelEvent), a z tohoto
atributu si poté můžete vyčíst dodatečné informace o události:
```c
if (event.type == SDL_MOUSEWHEEL) {
    SDL_MouseWheelEvent wheel_event = event.wheel;
    printf(
        "Kolecko mysi se pohnulo o %d vertikalne a %d horizontalne\n",
        wheel_event.y,
        wheel_event.x
    );
}
```

Kromě čtení událostí pomocí smyčky využívající funkce `SDL_PollEvent` můžeme také pomocí různých SDL funkcí kdykoliv v
programu získat současný stav myši či klávesnice. Oba dva přístupy nám přijdou vhod. Například, ve hře se můžeme kdykoliv
zeptat, jestli je zrovna zmáčknuté tlačítko myši. Pokud ale budeme chtít zareagovat na pohyb myši, tak spíše budeme chtít
dostat upozornění na to, že došlo k pohybu (pomocí čtení událostí), protože pohyb není vyjádřen současným stavem, ale spíše
změnou stavu (tedy událostí). Při popisu klávesnice i myši níže si tedy vždy ukážeme oba dva způsoby, jak vstup získat,
pomocí událostí i pomocí získání současného stavu.

## Myš
U myši nás bude zajímat primárně její pozice, případně stav tlačítek. Můžeme ale také zjistit např. jestli uživatel otočil
kolečkem.

### Události
Následující události jsou užitečné pro práci s myší:
- [`SDL_MOUSEMOTION`](https://wiki.libsdl.org/SDL2/SDL_MouseMotionEvent) Hráč pohnul s myší.
  - V atributech `event.motion.x` a `event.motion.y` poté naleznete současnou pozici myši.
- [`SDL_MOUSEBUTTONDOWN`](https://wiki.libsdl.org/SDL2/SDL_MouseButtonEvent), [`SDL_MOUSEBUTTONUP`](https://wiki.libsdl.org/SDL2/SDL_MouseButtonEvent)
  Hráč stisknul (`DOWN`) či uvolnil (`UP`) tlačítko myši.
  - V atributu `event.button.button` naleznete informace o tlačítku, které bylo zmáčknuto či uvolněno (např. `SDL_BUTTON_LEFT` nebo `SDL_BUTTON_RIGHT`).
- [`SDL_MOUSEWHEEL`](https://wiki.libsdl.org/SDL2/SDL_MouseWheelEvent) Hráč otočil kolečkem myši.
  - V atributu `event.wheel.y` naleznete hodnotu vertikálního posunu, v atributu `event.wheel.x` poté hodnotu horizontálního posunu.

Můžete si všimnout, že "kliknutí myši" je rozděleno na dvě události - stisknutí a povolení tlačítka. Pokud byste tedy
chtěli ve své hře reagovat na opravdové "kliknutí" (třeba na nějaký herní objekt), a ne pouze na stisknutí tlačítka, tak
si nejprve musíte zapamatovat, že uživatel tlačítko stisknul, a poté jej upustil (a obojí provedl nad stejným objektem).

### Současný stav
Pokud bychom chtěli získat současný stav pozice a tlačítek myši, můžeme využít funkci [`SDL_GetMouseState`](https://wiki.libsdl.org/SDL2/SDL_GetMouseState).
Ta jako parametry bere ukazatele na čísla (souřadnice `x` a `y`), do kterých uloží současnou pozici myši. Souřadnice budou
relativní vzhledem k oknu, nad kterým se zrovna myš nachází, což je obvykle to, co chceme. Návratová hodnota této funkce
poté obsahuje číslo, jehož jednotlivé bity označují, která tlačítka myši jsou zrovna stisknuta. Stav tlačítek poté můžeme
zjistit pomocí makra `SDL_BUTTON`:
```c
int x = 0;
int y = 0;
Uint32 buttons = SDL_GetMouseState(&x, &y);
int left = (buttons & SDL_BUTTON(SDL_BUTTON_LEFT)) != 0;
int right = (buttons & SDL_BUTTON(SDL_BUTTON_RIGHT)) != 0;

printf("Mouse is at (%d, %d). Left button: %d, right button: %d\n", x, y, left, right);
```

## Klávesnice
U klávesnice nás bude zajímat zejména to, zda došlo ke stisknutí či uvolnění nějaké klávesy.

### Události
U klávesnice jsou k dispozici události [`SDL_KEYDOWN`](https://wiki.libsdl.org/SDL2/SDL_KeyboardEvent) (stisk klávesy)
a [`SDL_KEYUP`](https://wiki.libsdl.org/SDL2/SDL_KeyboardEvent) (uvolnění klávesy). U obou událostí můžete přistoupit k
atributu `event.key.keysym.sym`, který obsahuje hodnotu datového typu [`SDL_Keycode`](https://wiki.libsdl.org/SDL2/SDL_Keycode),
která reprezentuje stisknutou klávesu. Seznam možných hodnot kláves, na které můžete reagovat, je k dispozici v třetím
sloupci [této tabulky](https://wiki.libsdl.org/SDL2/SDL_Scancode). Např. mezerník je reprezentován hodnotou `SDLK_SPACE`,
klávesa `a` hodnotou `SDLK_a` a šipka doprava hodnotou `SDLK_RIGHT`.

Zde je ukázka toho, jak můžeme zareagovat na stisk jednotlivých kláves:
```c
if (event.type == SDL_KEYDOWN) {
    SDL_Keycode code = event.key.keysym.sym;
    if (code == SDLK_SPACE) {
        printf("Uzivatel stisknul mezernik\n");
    } else if (code == SDLK_RIGHT) {
        printf("Uzivatel stisknul sipku doprava\n");
    }
}
```

Reakce na události klávesnice se hodí pro případy, kdy chceme zareagovat na nějakou jednorázovou událost, např. když hráč
stiskne klávesu, která způsobuje vystřelení projektilu. Není však vhodné přímo využívat reakce na
události klávesnice pro zpracování kláves, které hráč bude typicky "držet", např. šipky pro pohyb postavy.
Pokud hráč klávesu bude držet stisknutou, operační systém sice vaší hře bude předávat pravidelně nové události typu
`SDL_KEYDOWN`, nicméně bude to dělat dost pomalu, v řádu jednotek událostí za vteřinu. To by znamenalo, že pokud byste
ve své hře přímo vyvolávali např. pohyb hráčovy postavy v reakci na událost stisknutí klávesy, tak by se postava pohybovala
trhaně.

```c
if (event.type == SDL_KEYDOWN) {
    // Toto je špatné řešení pohybu!
    if (event.key.keysym.sym == SDLK_RIGHT) {
        hrac.pozice.x += 10 * deltaTime;
    }
}
```

Mnohem lepší řešení je použít následující přístup:
1) Mít v paměti uložený současný stav stisknutých kláves. To můžete udělat buď pomocí funkce na
[získání stavu klávesnice](#současný-stav-1), nebo si můžete vytvořit proměnné, které si budou pamatovat stav kláves,
které vás zajímají, a poté aktualizovat jejich stav při čtení událostí. Pokud obdržíte událost `SDL_KEYDOWN`, tak nastavíte
stav klávesy na `stisknuto`, pokud obdržíte událost `SDL_KEYUP`, tak nastavíte stav na `uvolněno`.
2) V části herní smyčky, kde aktualizujete stav hry, se podíváte, jaký je stav kláves, a podle tohoto stavu uděláte danou
akci (např. posunete postavou hráče). Díky tomu se bude pohyb provádět plynule (např. 60 za vteřinu). Zároveň bude také
tento pohyb synchronizovaný s pohybem ostatních objektů hry, které nejsou ovládány klávesami.

Pokud použijete tento přístup, tak si musíte dát pozor na to, aby se některé akce neopakovaly vícekrát. Například, pokud
budete při zmáčknutí klávesy vyvolávat nějakou jednorázovou akci (např. vystřelení projektilu), tak byste měli přidat do
hry kontrolu, jestli od posledního vyvolání této akce uběhl dostatečný čas ("cooldown"). I když totiž uživatel zmáčkne
klávesu velmi krátce, tak bude klávesa zmáčknutá pravděpodobně alespoň po dobu několika snímků! Pokud bychom tedy
nekontrolovali čas od posledního vyvolání akce, tak by se akce provedla opakovaně, což nemusí být žádoucí. Pro počítání
času, který ve hře uběhl, můžete použít [delta čas](herni_smycka.md#kompenzace-fps), který si stačí v každé iteraci
přičítat do nějaké proměnné, která si bude pamatovat, kolik už uběhlo ve hře času.

### Současný stav
Pokud bychom chtěli získat současný stav všech kláves, můžeme využít funkci [`SDL_GetKeyboardState`](https://wiki.libsdl.org/SDL2/SDL_GetKeyboardState).
Tato funkce vrátí adresu pole, které můžeme indexovat pomocí hodnot datového typu [`SDL_Scancode`](https://wiki.libsdl.org/SDL2/SDL_Scancode).
Jednotlivé hodnoty můžeme naleznout v druhém sloupci [této tabulky](https://wiki.libsdl.org/SDL2/SDL_Scancode). Např.
mezerník je reprezentován hodnotou `SDL_SCANCODE_SPACE`, klávesa `a` hodnotou `SDL_SCANCODE_A` a šipka doprava hodnotou
`SDL_SCANCODE_RIGHT`. Pokud je hodnota na daném indexu klávesy v poli nenulová, tak to znamená, že je tato klávesa
zrovna stisknutá:
```c
const Uint8* key_state = SDL_GetKeyboardState(NULL);
if (key_state[SDL_SCANCODE_SPACE]) {
    printf("Prave ted je stisknut mezernik\n");
}
```
