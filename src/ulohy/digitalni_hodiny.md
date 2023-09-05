# Digitální hodiny

<upr-segment />

Vytvořme real-time digitální hodiny ukazující aktuální čas ve stylu [7-segmentových](https://en.wikipedia.org/wiki/Seven-segment_display) displejů.

Cifry hodin budeme vykreslovat do 2D matice realizované pomocí jednodimenzionálního pole.
Jeden segmentový displej bude mít délku či výšku například 3 znaky.
Mezi každou cifrou bude jeden znak volný.
Na základě těchto parametrů vypočítáme potřebnou velikost 2D matice a následně alokujeme potřebnou paměť.

Pro čitelnější kód bude vhodné vytvořit následující funkci:
```c
void screen_draw_pixel(char* screen, int width, int height, int x, int y, char c)
```
Tato funkce vykreslí znak `c` (mřížku nebo mezeru) na souřadnici `[x, y]`.
Uvnitř funkce by také měla byt kontrola, zda se souřadnice nevyskytuje mimo vykreslovanou plochu pro rychlejší detekci případných chyb.

Segmenty jsou reprezentované vodorovnou či svislou čarou.
Vytvoříme si funkci pro kreslení vodorovné čáry:
```c
void screen_draw_hline(char* screen, int width, int height, int x, int y, int len)
```

V cyklu délky `len` budeme následně vykreslovat pixely pomocí dříve vytvořené funkce `screen_draw_pixel`.
Obdobně vytvoříme i funkci `screen_draw_vline` pro vykreslení vertikální čáry.

Následně si vytvoříme funkci, která nám vykreslí pro `n`-tou cifru segment `s` pomocí dříve vytvořených funkcí kreslení čár:
```c
void screen_draw_segment(char* screen, int width, int height, int n, int s);
```
A poté si uděláme funkci pro vykreslení číslice `num`:
```c
void screen_draw_num(char* screen, int width, int height, int n, int num);
```
Alternativně také můžeme obě funkce spojit do jedné a informaci o zobrazovaných segmentech zakódovat do bitů, kde na nejnižším bitu je jednička, pokud má svítit segment G.
Díky této úpravě se nám kod zjednoduší.
```
//     ABCDEFG
// 0 - 1111110
// 1 - 0110000
```

Po úspěšném otestování všech cifer si můžeme vytvořit nekonečnou smyčku a zobrazovat aktuální čas:

```c
#include <time.h>

int main() {
  char *display = ...;

  for(;;) {
    // vymazani terminalu
    printf("\e[1;1H\e[2J");

    // TODO: vykresleni aktualniho casu
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    printf("%d:%d:%d\n", tm->tm_hour, tm->tm_min, tm->tm_sec);

    usleep(1000 * 1000);
  }
}
```
