# Odrážející se kulička v terminálu
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
  [`usleep`](https://man7.org/linux/man-pages/man3/usleep.3.html): `usleep(100 * 1000)`.
</details>

Výsledek by měl vypadat zhruba takto:

![Odrážející se kulička v terminálu](../static/video/ball_terminal.gif)
