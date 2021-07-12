# Digitální hodiny

Vytvořte real-time digitální hodiny ukazující aktuální čas ve stylu [7-segmentových](https://en.wikipedia.org/wiki/Seven-segment_display) displejů.

Hodiny vykreslujte do 2D matice realizované pomocí jednodimenzionálního pole.
Jeden segmentový displej bude mít délku či výšku například 5 znaků.
Mezi každou cifrou bude jeden znak volný.
Vypočítejte na zakladě těchto parametrů potřebnou velikost 2D matice a následně alokujte potřebnou pamět.

Pro čítelnější kód bude vhodné vytvořit funkcí `void screen_draw_pixel(char* screen, int width, int height, int x, int y, char c)`, která vykreslí znak `c` na souřadnici `[x, y]`.
Uvnitř funkce by také měla byt kontrola, zda se souřadnice nevyskytuje mimo vykreslovanou plochu pro rychlejší detekci případných chyb.

Segmenty jsou reprezentované vodorovnou či svislou čarou.
Vytvořte funkci pro kreslení vodorovné čáry `void screen_draw_hline(char* screen, int width, int height, int x, int y, int len)`.
V cyklu délky `len` budeme následně vykreslovat pixely pomocí dříve vytvořené funkce `screen_draw_pixel`.
Obdobně vytvoříme i funkci `screen_draw_vline` pro vykreslení vertikální čáry.

Následně si vytvoříme funkci, která nám vykreslí pro `n`-tou cifru segment `s` pomocí dříve vytvořených funkcí kreslení čár:
```
void screen_draw_segment(char* screen, int width, int height, int n, int s);
```
A poté si uděláme funkci pro vykreslení číslice `num`:
```
void screen_draw_num(char* screen, int width, int height, int n, int num);
```
Alternativně také můžeme obě funkce spojit do jedné a informaci o zobrazovaných segmentech zakodovat do bitů, kde na nejnižším bitu je jednička, pokud má svítít segment G.
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
