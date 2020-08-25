## Funkce pro práci se strukturami

Práce se strukturami ve funkcích nepodléhá nějakým syntaktickým
pravidlům. Zavedeme si však pár pravidel pro nás samotné, abychom se v
našem kódu lépe orientovali.

Pokud budeme pracovat se strukturou ve funkcích, bývá dobrým zvykem, aby
jméno takové funkce začínalo názvem struktury (malými pásmeny) a
následně jsou podtržítky oddělena slova vyjadřující operaci, kterou se
strukturou provádíme.

Ukažme si, jak bychom alokovali strukturu, kterou používíme pod aliasem `Image`.

```c
struct ImageStruct {
    unsigned char * data;
    int rows;
    int cols;
};

typedef struct ImageStruct Image;

Image * heap_image;

// alokuje prazdny obrazek
Image * image_new( const int rows, const int cols ) {
    Image * image = NULL;
    image = (Image *)malloc( sizeof( image[ 0 ] ) );
    image->data = (unisgned char *)malloc( rows * cols * sizeof( image->data[ 0 ] ) );
    image->rows = rows;
    image->cols = cols;
    return image;
}

heap_image = image_new( 640, 480 );
```

Na výpisu kódů uvedeném výše můžeme vidět, že funkce `image_new` vytváří dynamicky
alokovanou datovou strukturu `Image`. Popišme si, co se přesně děje. Návratový
typ funkce `image_new` je pointer na strukturu `Image` (je to tedy `Image *`).
Na řádku 13 si vytvoříme nový
pointer na `Image`, se kterým budeme pracovat (alokovat jej a jeho atributy) a
také jej vrátíme na konci funkce. Pro tento pointer alokujeme paměť o
velikosti struktury `Image` na řádku 15. Dále alokujeme prostor pro jasy jednotlivých
pixelů obrázku na řádku 17. Atributy `rows` a `cols` struktury `Image` nastavujeme na řádcích 19 a 20.
Nakonec vracíme takto vytvořenou strukturu na řádku 22. Volání takové
funkce je ukázáno na řádku 25, kde vytváříme obrázek o velikosti
$640 \times 480$ pixelů.

Ukažme si ještě, jak bychom takto naalokovanou struktury zase uvolnili,
tzn. vrátili bychom alokovanou paměť zpět OS.

```c
// dealokuje strukturu s obrazkem
void image_free( Image * self ) {
    free( image->data );  // uvolnujeme jasy pixelu
    free( image );        // uvolnujeme strukturu
}

image_free( heap_image );
```

Jak můžeme vidět, funkce `image_free` akceptuje jeden argument, který je pointrem na
strukturu `Image`. Ten je předán pod názvem `self`, ale můžeme si jej pojmenovat jak
nám libo. V těle funkce se nácházeji dvě dealokační volání funkce `free`.
První volání uvolňuje pamět pro jasy pixelů. Druhé volání pak uvolňuje
paměť, kterou zabírá samotná datová struktura. Důležité je, v jakém
pořadí jsou jednotlivé atributy a datová struktura samotná uvolňovány.
Platí jednoduché pravidlo, že nejprve uvolňujeme data atributů a až pak
můžeme uvolnit strukturu samotnou. V opačném případě bychom totiž při
uvolnění struktury ztratili pointer na atributy a tím by paměť byla až
do konce běhu programu ztracena.

**Cvičení:** Upravte funkci `image_new` tak, aby data, která
reprezentují pixely byla nastavena na černou barvu (hodnota `0`).

**Cvičení:** Vytvořte funkci, která na zadanou souřadnici
pixelu v obrázku reprezentovaného strukturou `Image` nastaví zadanou hodnotu.

**Cvičení:** Vytvořte funkci, která do obrázku
reprezentovaného strukturou `Image` nakreslí zvoleným jasem obdélník o zadaných
rozměrech.
