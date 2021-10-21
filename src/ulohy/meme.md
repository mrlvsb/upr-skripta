# Meme generátor

Vytvořme generátor meme obrázku dle instrukcí na standardním vstupu:
```
blank.tga
meme.tga
2 2
I dont always do
memes
but when i do
i do them in C
```
<img src="meme.png">

Možné kroky pro vytvoření generátoru:

1. načíst [TGA obrázek](../c/aplikovane_ulohy/tga.md) pozadí, uložit a otestovat správnost
  
   Jeden pixel obrázku budeme reprezentovat pomocí čtyř kanálu/bajtů: RGB + alfa průhlednost

2. načíst obrázek s jedním písmenkem a vložit jej na pozadí

   Pro začátek zapisovat pixel písmenka pouze, pokud není průhledný (tj. alfa > 0).
   
3. načíst si všechna písmenka do pole (interpunkci a jiné znaky neřešme)
4. vykreslit string do obrázku
   
   <img src="memerect.png">
   
   Po vykreslení písmenka se musíme posunout v X o šírku písmene
5. načíst a zpracovat data ze vstupu (vstupní soubor/výstupní)
   
   Jednotlivé řádky vstupu je vhodné získávat pomocí funkce `fgets`.
   První řádek obsahuje cestu ke vstupnímu obrázku pozadí, druhý řádek je cesta k výstupnímu obrázku.
   Následující řádek se dvěma čísly značí počet řádků ve vrchní a spodní části obrázku.

6. vykreslit více řádků do obrázku
7. Alfa blending

   Výslednou barvu pixelu vypočítáme pro každou barevnou složku jako: 
   $$ \text{RES} = \frac{\text{LETTER} \cdot \text{LETTER.ALFA} + \text{BG} \cdot (255 - \text{LETTER.ALFA})}{255} $$
