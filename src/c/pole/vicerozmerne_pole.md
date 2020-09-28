# Vícerozměrné pole
Někdy potřebujeme v programech reprezentovat věci, které jsou přirozeně vícerozměrné. Typickým
příkladem jsou obrázky, které lze reprezentovat jako dvourozměrnou mřížku pixelů (jeden rozměr udává
řádek a druhý sloupec).

[Paměťové adresy](../../uvod/pamet.md) však mají pouze jeden rozměr, jelikož jsou reprezentovány
jedním číslem. Jak tedy můžeme do jednorozměrné paměti uložit vícerozměrnou hodnotu? Způsobů je více,
nicméně asi nejjednodušší je prostě "vyskládat" jednotlivé rozměry (dimenze) v paměti za sebou,
jeden rozměr za druhým. Pokud bychom například měli dvojrozměrnou mřížku[^1] s rozměry `5x5`,
můžeme ji reprezentovat tak, že nejprve do paměti uložíme první řádek, poté druhý řádek, atd.: 

![2D pole](../../static/img/2d_array.svg)

[^1]: Reprezentující například obrázek či [matici](https://matematika.cz/matice).

Tento koncept se označuje jako **vícerozměrné pole** (*multidimensional array*).

## Způsob vyskládání dimenzí
Je na nás, v jakém pořadí jednotlivé dimenze do paměti uložíme. Pokud bychom se bavili o 2D poli,
tak můžeme do paměti uložit řádek po řádku (viz obrázek výše), toto je nazývané jako
**row major ordering**. Můžeme ale také do paměti vyskládat sloupec po sloupci, což se nazývá
**column major ordering**. Je víceméně jedno, který způsob použijeme, je ale důležité se držet
jednoho přístupu, jinak může dojít k záměně indexů. Indexování totiž záleží na tom, jaký způsob
vyskládání použijeme. Níže předpokládáme pořadí *row major*.

## Indexování
Při práci s dvourozměrným polem bychom chtěli pracovat s dvourozměrným indexem (řádek `i`, sloupec
`j`), nicméně při samotném přístupu do paměti pak musíme tento vícerozměrný index převést na 1D
index. A naopak, z 1D indexu bychom chtěli mít možnost získat zpět 2D index. Pro výpočet indexů 2D
pole s `rows` řádky a `cols` sloupci můžeme použít tyto jednoduché vzorce:
- **Převod z 2D do 1D** - abychom se dostali na cílovou pozici, musíme přeskočit `row` řádků, kde
každý řádek má `cols` prvků, a poté ještě musíme přičíst pozici sloupce (`col`).
    ```c
    int to_1d(int row, int col, int cols) {
        return row * cols + col;
    }
    ```
- **Převod z 1D do 2D** - pro převod z 1D indexu zpět na 2D index stačí aplikovat opačný postup.
Nejprve vydělíme 1D index počtem sloupců, abychom zjistili, na jakém jsme řádku, a poté použijeme
zbytek po dělení, abychom zjistili, na jakém jsme sloupci.
    ```c
    void to_2d(int index, int cols, int* row, int* col) {
        *row = index / cols;
        *col = index % col;
    }
    ```

Tento koncept lze zobecnit na libovolně rozměrné pole (3D, 4D, ...).

## Vícerozměrné pole v *C*
*C* obsahuje základní podporu pro vytváření vícerozměrných [statických polí](staticke_pole.md). Při
vytváření pole stačí použít hranaté závorky pro každou dimenzi pole. Například takto lze vytvořit
2D pole s rozměry `3x3` na zásobníku:
```c
int pole[3][3];
```

Výhoda takovýchto polí je, že překladač provede převod z 2D indexu na 1D index za vás, a můžete tak
toto pole přímo indexovat vícerozměrným indexem. Například první prvek pole z kódu výše lze nalézt
na pozici `pole[0][0]`, poslední na pozici `pole[2][2]`.

Takováto pole jsou v paměti vyskládána postupně dle jednotlivých dimenzí zleva. Nejprve tedy v
paměti leží prvek `pole[0][0]`, poté `pole[0][1]`, ..., `pole[1][1]`, `pole[1][2]`, atd. Pokud
bychom měli 2D pole a první index bychom pokládali za index řádku, tak toto vyskládání odpovídá
*row major* pořadí.

Vícerozměrná pole v *C* lze zobecnit do vyšších dimenzí (můžete tak použít například
`int pole[3][3][3]` atd.), nicméně je dobré to nepřehánět, aby kód zůstal přehledný.

## Vícerozměrné dynamické pole
Pokud potřebujete vícerozměrné pole s [dynamickou velikostí](dynamicke_pole.md), stačí při volání
funkce `malloc` vytvořit dostatek paměti pro všechny rozměry. Pokud bychom například chtěli
naalokovat paměť pro 2D obrázek s `rows` řádky a `cols` řádky, můžeme použít následující volání
funkce `malloc`:
```c
int* image_memory = (int*) malloc(rows * cols * sizeof(int)));
```
