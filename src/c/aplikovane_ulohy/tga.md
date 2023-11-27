# TGA
[TGA](https://en.wikipedia.org/wiki/Truevision_TGA) je formát pro ukládání rastrových obrázků na
disk. Slouží tedy ke stejnému účelu jako známější formáty `JPEG` nebo `PNG`, ale oproti nim je
mnohem jednodušší. Díky tomu můžeme načíst i zapsat `TGA` soubor pomocí několika řádků kódu, zatímco
např. u `JPEG` nebo `PNG` bychom potřebovali buď použít již existující knihovnu anebo naimplementovat
jejich relativně komplikované standardy, které čítají stovky stránek.

TGA soubory jsou uloženy v binárním formátu, což znamená, že do nich budeme číselné hodnoty ukládat ve formátu,
v jakém jsou uloženy v paměti programu, a nebudeme je formátovat pomocí textových kódování, např. ASCII. To sice
znamená, že obsah TGA souboru nebude v "lidsky čitelném formátu", nicméně zároveň nám to i částečně usnadní programatické
čtení a zápis těchto souborů.

## Hlavička `TGA`
Soubory ve formátu `TGA` obsahují na svém začátku tzv. **hlavičku** (*header*), která obsahuje informace
popisující daný obrázek. Tyto informace jsou reprezentovány byty, které jsou umístěny na pevně
daných pozicích. Zde je seznam jednotlivých částí hlavičky TGA:

|        Název        | Pozice prvního bytu | Počet bytů |
|:-------------------:|:-------------------:|:----------:|
|         ID          |          0          |     1      |
|  Typ barevné mapy   |          1          |     1      |
|   **Typ obrázku**   |          2          |     1      |
|    Barevná mapa     |          3          |     5      |
|      Počátek X      |          8          |     2      |
|      Počátek Y      |         10          |     2      |
|      **Šířka**      |         12          |     2      |
|      **Výška**      |         14          |     2      |
| **Barevná hloubka** |         16          |     1      |
|      Popisovač      |         17          |     1      |

Tato tabulka udává, jak máme interpretovat jednotlivé byty na začátku `TGA` souboru. Pokud bychom tedy
například otevřeli `TGA` soubor a přečteli si jeho 12. a 13. byte, tak se dozvíme šířku tohoto obrázku. 
Nás budou zajímat zejména tučně vyznačené části:
- **Typ obrázku**: Hodnota `2` udává nekomprimovaný RGB obrázek, hodnota `3` udává nekomprimovaný
obrázek ve stupních šedi ("černobílý" obrázek). Ostatní platné hodnoty typu obrázku můžete nalézt
např. na [Wikipedii](https://en.wikipedia.org/wiki/Truevision_TGA).
- **Rozměry**: Tato část hlavičky určuje rozměry obrázku. Každý rozměr (**šířka** i **výška**) zabírá
dva byty (aby formát podporoval i obrázky s rozměry většími než 255 pixelů).
- **Barevná hloubka**: Udává, kolik bitů bude zabírat každý pixel obrázku. Pokud použijeme typ obrázku
RGB (typ `2`), měli bychom použít hloubku 24 bitů (8 bitů na každou barevnou složku), pokud použijeme typ
obrázku ve stupních šedi (typ `3`), tak použijeme hloubku 8 bitů.

> Při načítání binárních dat ze souborů musíme dávat pozor na to, jestli jsou hodnoty uloženy v
> **little-endian** nebo **big-endian** formátu. U `TGA` je určeno, že musí být v little-endian, což je
> zároveň s velkou pravděpodobností i formát, který používá vás počítač, nemusíme tedy provádět žádnou
> konverzi. Více o tzv. **endianness** můžete nalézt např. [zde](https://en.wikipedia.org/wiki/Endianness).

## Načtení hlavičky ze souboru
Jednotlivé části z hlavičky bychom mohli načítat byte po bytu, nicméně to by bylo dosti nepraktické.
V případě, že formát, který chceme načíst, má pevně dané rozložení bytů, je mnohem jednodušší
nadefinovat si [strukturu](../struktury/struktury.md), která bude danému rozložení odpovídat, a poté
celou strukturu načíst ze souboru najednou.

Jednotlivé hodnoty v hlavičce jsou reprezentovány byty bez znaménka. Jelikož tento datový typ v *C*
má trochu zdlouhavý název, vytvořme si pro něj nejprve nové jméno `byte`:
```c
typedef unsigned char byte;
```

Nyní si vytvořme strukturu, která bude reprezentovat `TGA` hlavičku. Jednotlivé atributy struktury
musí přesně odpovídat hodnotám v hlavičce a musí být také uvedeny ve stejném pořadí:
```c
typedef struct {
    byte id_length;
    byte color_map_type;
    byte image_type;
    byte color_map[5];
    byte x_origin[2];
    byte y_origin[2];
    byte width[2];
    byte height[2];
    byte depth;
    byte descriptor;
} TGAHeader;
```

> Možná vám přijde zvláštní, proč např. šířku definujeme jako pole dvou bytů namísto použití
> "dvou-bajtového celého čísla", např. datového typu `uint16_t`. Děláme to, aby do této struktury překladač
> nevložil žádné [mezery](../struktury/pametova_reprezentace.md#struktury-a-zarovnání). Pokud by je tam
> vložil, tak by naše struktura v paměti už neodpovídala hlavičce `TGA` v souboru a četli bychom tak
> neplatné hodnoty. Když použijeme pro všechny atributy datový typ s velikostí 1 byte, tak překladač
> žádné mezery vkládat nebude.
> 
> Alternativním řešením by bylo říct překladači, ať do dané struktury žádné mezery
> [nevkládá](https://stackoverflow.com/a/40642888/1107768).

Nyní už stačí pouze otevřít nějaký `TGA` soubor (např. [tento](../../static/img/carmack.tga)),
[načíst](../soubory/cteni_ze_souboru.md) z něj počet bytů odpovídající naší struktuře
a poté si z ní můžeme přečíst informace o daném obrázku:
```c,mainbody
#include <stdio.h>
#include <assert.h>

int main() {
    FILE* file = fopen("carmack.tga", "rb");
    assert(file);

    TGAHeader header = {};
    assert(fread(&header, sizeof(TGAHeader), 1, file) == 1);

    printf("Image type: %d, pixel depth: %d\n", header.image_type, header.depth);

    return 0;
}
```

Pokud budeme chtít pracovat s hodnotami rozměrů, musíme je nejprve převést z pole bytů
na celé číslo. Toho můžeme dosáhnout pomocí funkce [`memcpy`](https://devdocs.io/c/string/byte/memcpy):
```c
int width = 0;
int height = 0;

memcpy(&width, header->width, 2);
memcpy(&height, header->height, 2);
```

> Datový typ `int` sice velmi pravděpodobně bude mít více bytů, než `2` (pravděpodobně bude mít `4` byty), ale jelikož
> v paměti i v souboru jsou data uložena ve formátu "little-endian", tak stačí do `int`u načíst dva byty, a bude to fungovat
> tak, jak očekáváme. **Musíme však nejprve proměnnou `int`u inicializovat na nulu, jinak by vyšší dva byty měly nedefinovanou
> hodnotu!**

## Načtení pixelů ze souboru
Jakmile jsme načetli hlavičku, můžeme načíst ze souboru i samotné pixely. Ty jsou umístěny v souboru
hned za hlavičkou, řádek po řádku, zleva doprava a shora dolů. To znamená, že pixel v levém horním rohu obrázku je v souboru
uložen jako první, tj. hned za hlavičkou, zatímco pixel v pravém dolním rohu obrázku je v souboru uložen jako poslední,
na úplném konci souboru. Každý pixel má odpovídající počet bytů podle typu obrázku (u RGB obrázků 3 byty[^1],
u obrázků ve stupních šedi 1 byte) a celkový počet pixelů je poté dán rozměry obrázku (`šířka * výška`).

[^1]: V `TGA` jsou jednotlivé barevné složky uložené v pořadí `blue`, `green`, `red`. Jedná se tedy
vlastně o formát BGR.

Můžeme si tak vytvořit pole pro pixely a načíst je z obrázku. Pro RGB obrázky by načtení pixelů
mohlo vypadat např. takto: 
```c
typedef struct {
    byte blue;
    byte green;
    byte red;
} Pixel;

Pixel* load_pixels(TGAHeader header, FILE* file) {
    int width = 0;
    int height = 0;

    memcpy(&width, header.width, 2);
    memcpy(&height, header.height, 2);

    Pixel* pixels = (Pixel*) malloc(sizeof(Pixel) * width * height);
    assert(fread(pixels, sizeof(Pixel) * width * height, 1, file) == 1);
    return pixels;
}
```

## Práce s pixely
Jakmile máme načtené pixely v mřížce (poli pixelů) v paměti, tak s nimi můžeme pracovat jako s
[vícerozměrným polem](../pole/vicerozmerna_pole.md). Pokud bychom například prošli všechny hodnoty pixelů, a nastavili
jejich barevnou složku `red` (reprezentující červenou barvu) na hodnotu `0`, tak z obrázku zcela odstraníme červenou barvu:

```c
Pixel* pixels = load_pixels(header, file);
for (int row = 0; row < height; row++) {
    for (int col = 0; col < width; col++) {
        Pixel* pixel = pixels + (row * width + col);
        pixel->red = 0;
    }
}
```

## Zapsání `TGA` do souboru
Jakmile jsme nějakým způsobem upravili obsah načteného TGA obrázku (nebo si vytvořili prázdný TGA obrázek v paměti a něco
do něj nakreslili), tak musíme pixely z paměti zapsat zpět do `TGA` souboru na disku, abychom si obrázek mohli prohlédnout
v nějakém prohlížeči či editoru obrázků. Zápis bude probíhat v podstatě úplně stejně, jako načtení obrázku. Otevřeme
soubor pro zápis, uložíme do něj binárně (pomocí funkce [`fwrite`](../soubory/zapis_do_souboru.md#zápis-do-souboru))
TGA hlavičku, a hned za ní do něj opět binárně zapíšeme všechny pixely obrázku z paměti, řádek po řádku.
