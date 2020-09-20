# Ukazatele a pole
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

### Načtení dynamického počtu hodnot
Načtěte od uživatele číslo `n`. Poté naalokujte paměť o velikosti `n` `int`ů a 
načtěte ze vstupu `n` čísel, které postupně uložte do vytvořeného pole. Vypište součet načteného
pole.

### Naplnění pole
Vytvořte funkci `fill_array`, která naplní pole `array` čísly zvětšujícími se po `increment` a
začínajícími od `start`. 
```c
void fill_array(int* array, int len, int start, int increment);
```

Zavolání `fill_array(nums, 6, 10, 5)` naplní pole `nums` čísly: `10`, `15`, `20`, `25`, `30`, `35`.

### Počítání výskytů čísla
Vytvořte funkci `num_count`, která spočítá počet výskytů čísla `num` v poli `array`.
```c
int num_count(int* array, int len, int num);
```

### Počítání čísel v intervalu
Vytvořte funkci `in_interval`, která spočítá počet čísel z uzavřeného intervalu `[from, to]` v poli
 `array`.
```c
int in_interval(int* array, int len, int from, int to);
```

### Průměrná hodnota
Vytvořte funkci `average`, která spočítá průměr čísel v poli `array`.
```c
double average(int* array, int len);
```
Při dělení nezapomeňte přetypovat alespoň jeden operand na typ `double`, jinak by došlo k
celočíselnému dělení.

### Minimální a maximální hodnota
Vytvořte funkci `min_max`, která nalezne minimum a maximum z pole `array` a uloží je do ukazatelů
`min` a `max`.
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

![Obrácení pole](../static/img/array_reverse.svg)

Přehození dvou prvků nemůžete udělat najednou. Uložte si například prvek z levého konce do proměnné
a následně do tohoto prvku zapište hodnotu z pravého konce. Poté hodnotu z proměnné uložte do pravého
konce. Alternativně také můžete využít funkci `void swap(int* a, int* b)` z úloh s
[ukazateli](ukazatele.md).

### Skalární součin
Vytvořte funkci `dot`, která spočítá
[skalární součin](https://cs.wikipedia.org/wiki/Skal%C3%A1rn%C3%AD_sou%C4%8Din).
```c
int dot(int* a, int* b, int len);
```

### Třízení
Naimplementujte funkci, která setřídí pole. Můžete použít například algoritmus
[bubble sort](https://en.wikipedia.org/wiki/Bubble_sort).

### 2D pole
Matici/2D pole/obrázek můžete reprezentovat pomocí 1D pole tak, že řádky budou v paměti ležet jeden
za druhým. Index dvojrozměrného prvku v 1D poli můžeme spočítat jako `řádek * počet_sloupců + sloupec`.

![2D pole](../static/img/2d_array.svg)

### Vytisknutí matice
Vytvořte funkci `print_matrix`, která vypíše obrázek reprezentovaný 2D polem.
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

![Násobení matice vektorme](../static/img/matrix_vector.svg)
