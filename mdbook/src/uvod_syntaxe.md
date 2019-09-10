## Syntaxe

Přece jen má jazyk C syntaxi, která obsahuje jisté množství různých
,,kudrlinek” (anglicky je toto nazýváno pojmem ,,boilerplate”). Hlavní
rysy syntaxe by se daly shrnout do následujících bodů:

- používají se složené závorky pro označení bloku,
- u podmínek příkazů `if`, `while`, `for` se používají kulaté závorky `(` `)` následované blokem kódu,
- příkaz `do` je následován blokem kódu a podmínka je pak vyjádřena za slovem `while` v kulatých závorkách `(` `)`,
- pro ukončení příkazu používáme středník `;`.

Uveďme si nyní jednoduchý příklad, který shrnuje tyto vlastnosti:

```c
if ( a > 0 ) {
    puts( "Positive" );
}
else if ( a < 0 ) {
    puts( "Negative" );
}
else {
    puts( "Zero" );
}
```

Na příkladu můžeme vidět, že bloky jednotlivých větví příkazu `if` jsou
uvozeny složenou závorkou a jejich tělo (blok) je vyjádřen pomocí
složených závorek `{` `}` a odsazen o 4 (typicky)
mezery doprava oproti korespondující větvi. Samozřejmě můžeme do bloku
umístit více příkazů tak, že je postupně řadíme pod sebe. Jednotlivé
příkazy jsou odděleny použitím znaku středníku.
