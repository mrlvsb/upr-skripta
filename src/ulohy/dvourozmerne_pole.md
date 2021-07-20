# Dvourozměrné pole


## Vytisknutí matice
Vytvořte funkci `print_matrix`, která vypíše obrázek reprezentovaný
[dvourozměrným](../c/pole/vicerozmerne_pole.md) (2D) polem.
```c
void print_matrix(int* matrix, int rows, int cols);
```
Projděte matici po řádcích a sloupcích a vypište jednotlivé prvky.

## Vykreslení hvězdice
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
Zkuste vytvořit funkce na vykreslení dalších tvarů (čára, čtverec, kružnice, trojúhelník, …).

## Násobení matice skalárem
Vytvořte funkci `matrix_mul_scalar`, která vynásobí každý prvek matice číslem `k`. 
```c
void matrix_mul_scalar(int* matrix, int rows, int cols, int k);
```

![Násobení matice skalárem](../static/img/matrix_scalar.svg)

## Násobení matice vektorem
Vytvořte funkci `matrix_mul_vector`, která vynásobí matici vektorem.
```c
int* matrix_mul_vec(int* matrix, int rows, int cols, int *vec, int len);
```

<!--
![Násobení matice vektorem](../static/img/matrix_vector.svg)
-->

<upr-matrix-mul a="[[1, 2, 3], [4, 5, 6], [7, 8, 9]]" b="[[10], [20], [30]]"></upr-matrix-mul>

## Násobení matice maticí

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
