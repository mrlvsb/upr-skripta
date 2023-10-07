# Vykreslování grafu funkce

Napište program, který dokáže vykreslit graf funkce. Graf vykreslujte do terminálu, není třeba
implementovat grafickou aplikaci. Využijte například znak `|` pro znázornění osy y, znak `-`
pro znázornění osy x, a `+` pro znázornění počátku. Pomocí znaku `*` můžete znázornit funkci
vlastního výběru.

## Ukázka

<details>
<summary>Graf lineární funkce</summary>

```
                              |
                              |     *
                              |
                              |    *
                              |
                              |   *
                              |
                              |  *
                              |
                              | *
                              |
                              |*
                              |
                              *
                              |
                             *|
------------------------------+------------------------------
                            * |
                              |
                           *  |
                              |
                          *   |
                              |
                         *    |
                              |
                        *     |
                              |
                       *      |
                              |
                      *       |
                              |
```
</details>

<details>
<summary>Graf exponenciální funkce</summary>

```
                              |   *
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |  *
                              |
                              |
                              |
                              | *
                              |
                              |*
                              *
******************************+------------------------------
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
                              |
```
</details>

## Tipy

* Zvolte si fixní šířku a výšku grafu, aby se graf vešel do rozumně velkého okna terminálu
(v ukázkách je využita velikost 61x31).
* Funkci vykreslujte jen pro celé hodnoty `x` (graf tedy bude nespojitý).
* Experimentujte s funkcemi a zkuste vykreslit grafy různých funkcí (např. logaritmus,
exponenciální funkce, kvadratická a kubická funkce, ...).
* Pro výpočet funkcí lze využít matematickou knihovnu `math.h`, která je součástí standardní
knihovny jazyka C. Knihovnu je ovšem potřeba při kompilaci explicitně slinkovat přepínačem `-lm`,
který pouze předáte kompilátoru (`gcc main.c -o main -lm -std=c2x`).

## Složitější varianta

Zkuste graf vykreslovat spojitě. Využít můžete například
[Bresenhamům algoritmus pro vykreslení přímky](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm).

Nebo zkuste vykreslování grafů implementovat jako interaktivní terminálovou aplikaci. Využít lze
například knihovnu [ncurses](https://man.archlinux.org/man/ncurses.3x.en), nebo přímo ANSI
escape sekvence. Aplikace může umožnit panning (posouvání doleva, doprava, nahoru a dolů)
a zooming (změná škály souřadnicových os).

Interaktivní aplikace by také mohla na okrajích okna znázorňovat, na jaké souřadnice se uživatel
dívá (ať se při procházení grafu neztratí) a aktuální úroveň přiblížení, a implementovat klávesovou
zkratku pro reset náhledu na graf (vycentrování počátku a nastavení zoomu na `1.0`).

Student, který se skutečně nudí, může také naprogramovat možnost zadat vlastní funkci za běhu
programu. Toho lze dosáhnout jak manuálním parsováním uživatelského vstupu, tak embeddováním
nějakého skriptovacího jazyka (např. [Lua](https://www.lua.org/pil/24.html)) do svého programu,
a umožněním uživateli naprogramovat si vlastní, libovolně složitou funkci (využívající například
podmínky, atp.). Fantazii se meze nekladou.

Složitější varianta **není vhodná** pro úplné začátečníky.
