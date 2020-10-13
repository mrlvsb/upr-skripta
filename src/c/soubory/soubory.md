# Soubory
V sekci o [vstupu a výstupu](../text/vstupavystup.md) jsme si ukázali, jak pracovat se souborovými
deskriptory `stdin` a `stdout` pro základní komunikaci s okolním světem (obvykle s terminálem).
Nyní si ukážeme, jak si vytvořit vlastní souborové deskriptory pomocí otevírání souborů na disku.
Použijeme k tomu funkce ze standardní knihovny *C*, které se opět nachází v souboru `<stdio.h>`.

Stejně jako u obecného vstupu a výstupu platí, že soubor na disku je pouze seznamem čísel (bytů).
Jejich význam je daný čistě tím, kdo a jak je bude interpretovat. Stejný soubor může být například:
- Textovým editorem pokládán za textový dokument
- Prohlížečem obrázků pokládán za obrázek
- Hudebním přehrávačem pokládan za zvukovou nahrávku

Obvykle souborům dáváme přípony (`.txt`, `.jpg`, `.mp3` atd.), abychom dali najevo, jak by se
daný soubor měl interpretovat. Samotná přípona však sama o sobě nic neznamená. Změnou přípony z
`.txt` na `.jpg` sice můžeme změnit způsob interpretace souboru, samotná data v něm však zůstanou
stále stejná – pokud v souboru předtím nebyla data ve formátu [JPEG](https://en.wikipedia.org/wiki/JPEG),
změna přípony tento stav nijak nezmění.

Nejprve si ukážeme, jak můžeme [otevírat](otevreni_souboru.md) soubory na disku, a poté jak do
otevřených souborů [zapisovat nebo číst](prace_se_soubory.md) data.
