# GIF
[GIF](https://en.wikipedia.org/wiki/GIF) je velmi populární formát pro sdílení animací. `GIF` animace
se skládá z jednoho nebo více tzv. **snímků** (*frames*), které mají určenou délku, po kterou se mají
zobrazit. Při přehrání animace se pak jednotlivé snímky zobrazují postupně jeden za druhým, což
vytváří dojem animace.

Pořád se jedná o relativně jednoduchý formát, nicméně je už trošku složitější než např. [TGA](tga.md),
protože používá kompresi a pixely nejsou uloženy v souboru přímo, místo toho je každý pixel reprezentován
indexem do tabulky (palety) předpřipravených barev.

Pro vytvoření `GIF` animace tak použijeme kód, který už pro nás připravil někdo jiný. Konkrétně se
bude jednat o [knihovnu `gifenc`](https://github.com/lecram/gifenc)[^1]. Stáhněte si soubory
`gifenc.c` a `gifenc.h` a použijte je při [překladu](../modularizace/pouzivani_kodu_z_jinych_souboru.md)
svého programu.

[^1]: I když jsme se předtím bavili o tom, že sdílet knihovny ve formě zdrojových kódů není
[úplně běžné](../modularizace/knihovny.md#sdílení-knihoven), tato knihovna je velmi malá a
jednoduchá a zároveň je open-source, takže zkopírovat její zdrojové kódy do našeho programu je asi
nejjednodušší způsob, jak ji použít.

## Vytvoření `GIF` animace
Pro práci s `GIF` souborem si nejprve musíme nadefinovat tzv. **paletu** (*palette*). Paleta není
nic jiného než pole barev, které můžeme v naší animaci používat. Jednotlivým pixelům každého snímku
pak pouze řekneme, jaký index z této palety se má použít pro jejich vykreslení. Například tato paleta
definuje čtyři barvy:
```c
typedef unsigned char byte;

byte palette[] = {
    0x00, 0x00, 0x00, /* 0 -> černá   (R=0, G=0, B=0)   */
    0xFF, 0x00, 0x00, /* 1 -> červená (R=255, G=0, B=0) */
    0x00, 0xFF, 0x00, /* 2 -> zelená  (R=0, G=255, B=0) */
    0x00, 0x00, 0xFF, /* 3 -> modrá   (R=0, G=0, B=255) */
};
```
Pokud použijeme pro pixel index `1`, bude vykreslen červenou barvou, protože v této paletě se na
pozici `1` nachází červená barva.

Jakmile máme nadefinovanou paletu, můžeme použít funkci `ge_new_gif`, která umožňuje vytvořit nový
`GIF` soubor. Funkci musíme předat cestu k výstupnímu souboru, jeho rozměry, informace o paletě a o
tom, kolikrát se má animace přehrát[^2]:
```c
int width = 300;
int height = 300;

ge_GIF* gif = ge_new_gif(
    "output.gif",
    width,
    height,
    palette,
    2,  /* hloubka palety */
    0   /* opakovat neustále dokola */
);
```
Parametr hloubky palety by měl být nastaven na dvojkový logaritmus počtu baret v paletě. V naší
paletě jsou 4 barvy, takže jsme zde předali hodnotu parametru `2`. Poslední parametr udává, kolikrát
se má animace přehrát. Hodnota `0` udává, že se má animace opakovat neustále dokola[^3].

[^2]: Pro použití hlavičkového souboru knihovny nezapomeňte na začátku svého programu
[vložit](../preprocesor/vkladani_souboru.md) [hlavičkový soubor](../modularizace/hlavickove_soubory.md)
`gifenc.h`.

[^3]: Všechny tyto údaje lze vyčíst z [dokumentace](https://github.com/lecram/gifenc/blob/master/README#L25)
knihovny.

### Zápis snímků
Když nyní máme vytvořenou animaci, můžeme do ní postupně zapisovat snímky. Zápis probíhá následovně:
1) Do pole uloženého v atributu `gif->frame` zapíšeme hodnoty všech pixelů jednoho snímku.
Každá hodnota by měla být indexem odpovídající barvy z námi zvolené palety. Pro adresování použijeme
klasický převod z [2D na 1D index](../pole/vicerozmerne_pole.md#indexování).
2) Zavoláme funkci `ge_add_frame`, které řekneme, na jak dlouhou dobu se má tento snímek zobrazit.
Tato doba je v setinách vteřiny.

Jakmile zapíšeme jeden snímek, můžeme celý proces opakovat pro zápis dalších snímků.

Uhodnete, jakou animaci vygeneruje následující kód[^4]?
```c
for (int i = 0; i < 100; i++) {
    memset(gif->frame, 0, sizeof(uint8_t) * width * height);

    for (int row = 0; row < height; row++) {
        gif->frame[row * height + i] = ((i * 10) / 30) % 3 + 1;
    }
    for (int col = 0; col < width; col++) {
        gif->frame[i * height + col] = ((i * 10) / 30) % 3 + 1;
    }

    ge_add_frame(gif, 8);
}
```

[^4]: Pro ověření tipu si program přeložte a podívejte se na výslednou animaci. Zakomentujte řádek
s `memset` a zkuste odhadnout, jak a proč to změní výslednou animaci.

<details>
<summary>Výsledek animace</summary>

![](../../static/img/animace.gif)

</details>

### Dokončení práce s animací
Jakmile zapíšeme všechny snímky, které chceme v animaci mít, nesmíme zapomenout animaci uložit do
souboru a uvolnit její paměť pomocí funkce `ge_close_gif`:
```c
ge_close_gif(gif);
```

## Načtení `GIF` animace
Pokud byste naopak chtěli nějakou `GIF` animaci načíst ze souboru a něco s ní dále provést, můžete
použít knihovnu [`gifdec`](https://github.com/lecram/gifdec) od stejného autora, která slouží k
načítání `GIF` souborů.

<hr />

**Cvičení** 🏋

Zkuste použít knihovnu `gifdef` pro převod animace z `GIF` do `TGA`:
1) Načtěte `GIF` animaci z disku.
2) Projděte všechny snímky animace.
3) Pro každý snímek převeďte pixely snímku z indexované palety do klasické mřížky pixelů používané
ve formátu `TGA`.
4) Zapište každý snímek na disk jako individuální `TGA` obrázek. Můžete na kraj obrázku vykreslit
informaci o pořadí snímku.

<hr />
