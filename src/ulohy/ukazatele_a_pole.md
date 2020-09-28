# Ukazatele a pole
## Ukazatele
### Nastavení maxima
Vytvořte funkci `set_max`, která přijme adresu celého čísla (`int`) pomocí ukazatele a dvě další
čísla a nastaví paměť na dané adrese na větší ze dvou zadaných čísel.
```c
int res;
set_max(&res, 5, 6);
// res == 6
```

### Prohození hodnoty
Vytvořte funkci `swap`, která přijme dva ukazatele a prohodí hodnoty proměnných, na které ukazují.
```c
int a = 5, b = 6;
swap(&a, &b);
// a == 6, b == 5
```

### Výpočet kořenů kvadratické rovnice
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

## Pole

### Naplnění pole
Vytvořte funkci `fill_array`, která naplní pole `array` čísly zvětšujícími se po `increment` a
začínajícími od `start`. 
```c
void fill_array(int* array, int len, int start, int increment);
```

<upr-array-fill></upr-array-fill>

### Počítání výskytů čísla
Vytvořte funkci `num_count`, která spočítá a vrátí počet výskytů čísla `num` v poli `array`.
```c
int num_count(int* array, int len, int num);
```

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="4" to="4"></upr-array-interval>


### Počítání čísel v intervalu
Vytvořte funkci `in_interval`, která spočítá počet čísel z uzavřeného intervalu `[from, to]` v poli
 `array`.
```c
int in_interval(int* array, int len, int from, int to);
```

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="2" to="5"></upr-array-interval>

### Průměrná hodnota
Vytvořte funkci `average`, která spočítá průměr čísel v poli `array`.
```c
double average(int* array, int len);
```
Při dělení nezapomeňte přetypovat alespoň jeden operand na typ `double`, aby nedošlo k
celočíselnému dělení.

### Minimální hodnota v poli
Vytvořte funkci, která v poli `array` nalezne minimální hodnotu.

```c
int array_min(int *array, int len);
```

<upr-array-min array="[3, 5, 2, 8, 7, 1, 3]"></upr-array-min>

Následně funkci upravte, aby funkce vrátila pomocí ukazatele první index s minimální hodnotou.
```c
int array_min(int *array, int len, int *min_index);
```

### Minimální a maximální hodnota
Předchozí funkci upravte, aby hledala minimum a maximum zároveň.
Nalezené extrémy vraťte pomocí ukazatelů `min` a `max`.

```c
void min_max(int* array, int len, int *min, int *max);
```
Ve funkci si nejprve nastavte index minimální a maximální hodnoty na nultý prvek.
Parametr `min` je ukazatel, a je tedy nutné přistupovat k jeho hodnotě pomoci dereference - `*min`,
protože výraz `min` obsahuje pouze adresu, kde je minimální index uložen. Následně projděte
pole a pokud bude hodnota aktuálního prvku menší než hodnota prvku na dosud nalezeném indexu,
nastavte hodnotu minimálního indexu na aktuální index. Stejný postup aplikujte i pro nalezení
maximálního prvku (stačí udělat jeden průchod polem).

### Obrácení pole
Vytvořte funkci `array_reverse`, která obrátí prvky v poli.
```c
void array_reverse(int* array, int len);
```
Pole projděte pomoci cyklu do jeho půlky a vždy prohazujte prvky z obou konců.

<upr-array-reverse array="[10, 20, 30, 40, 50, 60]"></upr-array-reverse>

Přehození dvou prvků nemůžete udělat najednou. Uložte si například prvek z levého konce do proměnné
a následně do tohoto prvku zapište hodnotu z pravého konce. Poté hodnotu z proměnné uložte do pravého
konce. Alternativně také můžete využít dříve naimplementovanou funkci `void swap(int* a, int* b)`.

### Skalární součin
Vytvořte funkci `dot`, která spočítá
[skalární součin](https://cs.wikipedia.org/wiki/Skal%C3%A1rn%C3%AD_sou%C4%8Din).
```c
int dot(int* a, int* b, int len);
```

### Načtení dynamického počtu hodnot
Načtěte od uživatele číslo `n`. Poté naalokujte paměť o velikosti `n` `int`ů a 
načtěte ze vstupu `n` čísel, které postupně uložte do vytvořeného pole. Vypište součet načteného
pole.

### Counting sort
Vygenerujte pole 10 000 000 čísel z intervalu \\( \langle 1000, 2000 \rangle \\).
Pomocí algoritmu counting sort seřaďte čísla v poli od nejmenšího po největší.

1. vytvořte pole počítadel pro všechny možné hodnoty v poli
2. vynulujte počitadla na 0
3. sekvenčně projděte pole čísel a inkrementujte odpovídající počítadlo
4. projděte pole počítadel a tiskněte hodnotu tolikrát, kolik je hodnota počítadla

<upr-counting-sort></upr-counting-sort>

### Třízení
Naimplementujte funkci, která setřídí pole. Můžete použít například algoritmus
[bubble sort](https://en.wikipedia.org/wiki/Bubble_sort).

### Vytisknutí matice
Vytvořte funkci `print_matrix`, která vypíše obrázek reprezentovaný
[dvourozměrným](../c/pole/vicerozmerne_pole.md) (2D) polem.
```c
void print_matrix(int* matrix, int rows, int cols);
```
Projděte matici po řádcích a sloupcích a vypište jednotlivé prvky.

### Vykreslení hvězdice
Vytvořte funkci `draw_star`, která do 2D matice vykreslí hvězdici.
```c
void draw_star(int* matrix, int rows, int cols);
```
```
X    X    X
 X   X   X 
  X  X  X  
   X X X   
    XXX    
XXXXXXXXXXX
    XXX    
   X X X   
  X  X  X  
 X   X   X 
X    X    X
```

Hvězdici můžete vykreslit do pole pomocí jediného cyklu.
Zkuste vytvořit funkce na vykreslení dalších tvarů (čára, čtverec, kružnice, trojúhelník, ...).

### Násobení matice skalárem
Vytvořte funkci `matrix_mul_scalar`, která vynásobí každý prvek matice číslem `k`. 
```c
void matrix_mul_scalar(int* matrix, int rows, int cols, int k);
```

![Násobení matice skalárem](../static/img/matrix_scalar.svg)

### Násobení matice vektorem
Vytvořte funkci `matrix_mul_vector`, která vynásobí matici vektorem.
```c
int* matrix_mul_vec(int* matrix, int rows, int cols, int *vec, int len);
```

<!--
![Násobení matice vektorem](../static/img/matrix_vector.svg)
-->

<upr-matrix-mul a="[[1, 2, 3], [4, 5, 6], [7, 8, 9]]" b="[[10], [20], [30]]"></upr-matrix-mul>

### Násobení matice maticí

Vytvořte funkci pro násobení matice \\( A \\) o rozměrech \\( rows_1 \\times cols_1 \\) s druhou matici \\( B \\) o rozměrech \\( rows_2 \\times cols_2 \\).
Funkce vrátí `NULL` v případě, že matice nepůjdou vynásobit např. v případě, že počet řádků první matice není shodný s počtem sloupců druhé matice.
Výslednou matici o rozměrech \\( rows_1 \\times cols_1 \\) alokujte dynamicky.

<upr-container>
  <upr-matrix-mul a="[[1, 2, 3], [4, 5, 6]]" b="[[10, 20], [30, 40], [50, 60]]"></upr-matrix-mul>
  <!--
  <upr-arrow dst="table" dst-anchor="south" src-anchor="north">a</upr-arrow>
  <upr-arrow dst="table:nth-of-type(2)" dst-anchor="south" src-anchor="north">b</upr-arrow>
  <upr-arrow dst="table:nth-of-type(3)" dst-anchor="south" src-anchor="north">result</upr-arrow>
  -->
</upr-container>
