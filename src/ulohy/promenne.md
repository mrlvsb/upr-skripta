# Základy
K vyřešení těchto úloh by vám mělo stačit znát [proměnné](../c/promenne/promenne.md), [datové typy](../c/datove_typy/datove_typy.md),
a základní [výpis výrazů](../c/prikazy_vyrazy.md#výpis-výrazů).

## Obvod a obsah obdélníku
Program bude mít jako vstup dvě proměnné (\\( a \\), \\( b \\)), které budou udávat velikosti stran
obdélníku (hodnoty proměnných si nastavte na začátku programu). Podle známého vzorce (viz níže) poté program vypočítá a
vypíše hodnoty obou stran, spolu s obvodem a obsahem obdélníku s danými délkami stran.

<div style="display: flex; justify-content: center">
  <svg>
    <rect width=200 height=100 fill=#eee stroke=black />
    <text x=100 y=115 fill=black text-anchor=middle font-style=italic>a</text>
    <text x=210 y=50 fill=black text-anchor=middle font-style=italic>b</text>
  </svg>
  <div>
    $$\begin{aligned}
    o &= 2 \cdot (a + b) \\
    S &= a \cdot b
    \end{aligned}$$
  </div>
</div>

<details>
<summary>Ukázkový výstup</summary>

```
a = 200
b = 100
o = 600
S = 20000
```
</details>

## Prohození dvou čísel
Program prohodí hodnotu dvou proměnných. Na začátku programu budou dvě celočíselné proměnné (`a` a `b`) s libovolně
zvolenými hodnotami. Tyto proměnné budou na začátku programu vypsány na výstup.

Dále program prohodí hodnoty těchto dvou proměnných, tj. např. pokud proměnná `a` měla hodnotu
`5` a proměnná `b` měla hodnotu `10`, tak po prohození by měla proměnná `a` mít hodnotu `10` a proměnná `b` hodnotu `5`.
Pro prohození použijte třetí proměnnou. Kód pro prohození dvou proměnných napište obecně - měl by fungovat pro libovolné
hodnoty proměnných `a` a `b`. Po prohození program opět obě proměnné vypíše.

<details>
<summary>Ukázkový výstup</summary>

```
a = 10
b = 50

a = 50
b = 10
```
</details>
