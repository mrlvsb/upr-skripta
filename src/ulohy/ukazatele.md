# Ukazatele
K vyřešení těchto úloh by vám mělo stačit znát [ukazatele](../c/prace_s_pameti/ukazatele.md) (a samozřejmě veškeré
předchozí učivo).

## Nastavení maxima
Vytvořte funkci `set_max`, která přijme adresu celého čísla (`int`) pomocí ukazatele a dvě další
čísla a nastaví paměť na dané adrese na větší ze dvou zadaných čísel.
```c
int res;
set_max(&res, 5, 6);
// res == 6
```

## Prohození hodnoty
Vytvořte funkci `swap`, která přijme dva ukazatele a prohodí hodnoty proměnných, na které ukazují.
```c
int a = 5, b = 6;
swap(&a, &b);
// a == 6, b == 5
```

## Výpočet kořenů kvadratické rovnice
Vytvořte funkci `quadratic_roots`, která vrátí počet kořenů kvadratické rovnice \\( ax^2 + bx + c = 0 \\) pomocí `return` a vypočítané kořeny vrátí pomocí předaných ukazatelů v argumentech funkce.

```c
int quadratic_roots(float a, float b, float c, float *x1, float *x2);
```

Počet kořenů lze zjistit vypočítáním diskriminantu \\( D = b^2 - 4ac \\).
Pokud vyjde diskriminant záporný, tak funkce vrátí nulu, protože žádné řešení v \\( \\mathbb{R} \\) neexistuje.
Pro nulový diskriminant funkce vrátí `1` a uloží dvojnásobný kořen na adresu ukazatelů `x1`, `x2`.
Pro kladný diskriminant funkce vrátí `2` a vypočítá kořeny pomocí:
$$ x_{1, 2} = \frac{-b \pm \sqrt{D}}{2a} $$

<upr-parabola></upr-parabola>
