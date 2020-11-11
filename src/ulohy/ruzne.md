# Různé
## Hádací hra (*guessing game*)
Vygenerujte [náhodné číslo](../ruzne/nahodna_cisla.md). Poté nechte uživatele hádat, jaké číslo
program vygeneroval. Po každém tipu uživateli dejte vědět, jestli uhádl správně nebo jestli jeho
tip byl vyšší či nižší než číslo, které hádá.

## Odrážející se kulička v terminálu
Vykreslujte do terminálu obdélník spolu s pohybující se kuličkou. Jakmile kulička narazí do stěny
čtverce, zvyšte počítadlo nárazů pro danou zeď. Dodržujte princip
[zákonu odrazu](https://cs.wikipedia.org/wiki/Odraz_vln%C4%9Bn%C3%AD).

<details>
<summary>Přibližný postup řešení</summary>
Kuličku reprezentujte dvěmi proměnými (pozice X a Y). Opakovaně provádějte následující akce:

- Posuňte kuličku ve směru jejího pohybu.
- Pokud kulička narazí do stěny, změňte směr jejího pohybu.
- Vyčistěte terminál, aby zmizelo herní pole z minulé iterace. Lze to provést více způsoby:
    - Vytiskněte velké množství prázdných řádků.
    - Vytiskněte text `"\e[1;1H\e[2J"`, který terminál bude interpretovat jako vyčistění obrazovky.
- Vykreslete kuličku a obdélník.
- Uspěte na chvíli program, abyste mohli pozorovat změněný stav hry. Můžete použít například funkci
`usleep`: `usleep(100 * 1000)`.
</details>

Výsledek by měl vypadat zhruba takto:

![Odrážející se kulička v terminálu](../static/video/ball_terminal.gif)

## Kalkulačka
Načtěte ze vstupu programu nebo z [parametrů příkazového řádku](../ruzne/funkce_main.md) matematický
výraz, který bude obsahovat celá čísla a operátory `+`, `-`, `/`, `*` a vypište výsledek tohoto
výrazu.

- *Varianta 1*: Použijte klasický zápis v [infixové notaci](https://cs.wikipedia.org/wiki/Infixov%C3%A1_notace).
Nemusíte řešit prioritu operátorů.
- *Varianta 2*: Přidejte podporu pro prioritu operátorů a závorky `(`, `)`. Použijte algoritmus
[Shunting yard](https://cs.wikipedia.org/wiki/Algoritmus_shunting-yard).
- *Varianta 3*: Použijte [postfixovou notaci](https://cs.wikipedia.org/wiki/Postfixov%C3%A1_notace).
Zde bude fungovat priorita operátorů a "závorkování" bez nutnosti složitého načítání vstupu z
varianty 2.

## Tvorba animace
Pomocí knihovny pro práci s [GIF animacemi](../c/aplikovane_ulohy/gif.md) vytvořte nějakou zajímavou
animaci. Například se zkuste přiblížit této animaci z Matrixu:

![](../static/img/matrix-rain.gif) 
