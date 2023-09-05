# Meme generátor

Vytvořte generátor meme obrázků dle instrukcí na standardním vstupu:
```
blank.tga
meme.tga
2 2
I dont always do
memes
but when i do
i do them in C
```

![Image of a meme](meme/meme.png)

Možné kroky pro vytvoření generátoru:

1. Načtěte [TGA obrázek](../c/aplikovane_ulohy/tga.md) pozadí (např. [tento](meme/meme_bg.tga)), jehož cesta bude zadána na prvním řádku na vstupu
programu. Dále načtěte ze vstupu cestu k výstupnímu TGA obrázku, a počet řádků v horní a spodní části obrázku, do kterých
budete vypisovat text.
2. Načtěte obrázek pro každé písmeno anglické abecedy (obrázky jsou k dispozici [zde](font.zip)), a uložte si tato písmena
do pole. 
3. Načtěte ze vstupu daný počet řádků textu a každý řádek vykrselete do načteného obrázku s pozadím. Pro vykreslení řádku
v cyklu projděte všechny znaky řádku, pro každý znak nalezněte TGA obrázek odpovídající danému znaku, a překopírujte jej
na odpovídající místo v obrázku s pozadím. Po vykreslení každého znaku se posuňte na vykreslované pozici doprava o šířku
vykresleného písmene, po vykreslení řádku se posuňte o výšku řádku níže.
4. Zapište výsledný meme obrázek na cestu zadanou na druhém řádku vstupu programu.

Pokud chcete přidat do výsledku průhlednost, můžete pro vykreslování můžete využít tzv.
[alfa blending](https://en.wikipedia.org/wiki/Alpha_compositing). Při zápisu písmenka do pozadí můžete výslednou barvu
pixelu pro každou barevnou složku vypočítat následovně: 
   $$ \text{RES} = \frac{\text{LETTER} \cdot \text{LETTER.ALFA} + \text{BG} \cdot (255 - \text{LETTER.ALFA})}{255} $$
