# Zubatá pole

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Občas můžete narazit na situaci, kdy potřebujete vytvořit vícerozměrné pole, kde některá z dimenzí
nemá fixní velikost. Například první řádek může mít dva sloupce, druhý řádek tři sloupce, třetí řádek
žádný sloupec atd.

V takovém případě můžete vytvořit tzv. **zubaté pole** (*jagged array* nebo také *ragged array*).
Zubaté pole je v podstatě "pole polí" - vytvoříte (dynamické)[^1] pole řádků, a každý řádek bude opět
dynamické pole sloupců. Kvůli tomuto vnoření polí je nutné jako datový typ použít ukazatel na ukazatel.
Následující kód vytvoří pole pěti studentů, a každému studentovi vytvoří pole s různým počtem ID předmětů,
které studuje:
```c,editable,mainbody
#include <stdlib.h>

int main() {
    // Vytvoření pole studentů
    int** studenti = (int**) malloc(5 * sizeof(int*));

    for (int i = 0; i < 5; i++) {
        // Vytvoření pole předmětů pro konkrétního studenta
        studenti[i] = (int*) malloc((i + 1) * sizeof(int));
    }

    // Druhý předmět třetího studenta bude mít ID 5
    studenti[2][1] = 5;

    for (int i = 0; i < 5; i++) {
        // Uvolnění pole předmětů pro konkrétního studenta
        free(studenti[i]);
    }

    // Uvolnění pole studentů
    free(studenti);
    return 0;
}
```

[^1]: Vnější pole řádků teoreticky nemusí být dynamické, ale pokud už potřebujete dynamické
počty sloupců, obvykle budete chtít i dynamický počet řádků. 

Při přístupu k prvkům pole můžeme klasicky využít hranatých závorek. `studenti[2]` vrátí adresu
pole předmětů třetího studenta, a nad tímto polem (resp. ukazatelem) můžeme opět použít hranaté
závorky pro přístup k druhému předmětu. Zde se tak neprovádí žádný převod 2D na 1D indexy ani naopak,
protože jednotlivá pole v paměti nejsou uložena za sebou.

Všimněte si, že jednotlivé pole předmětů ("řádky" našeho vícerozměrného pole) musíme uvolňovat
zvlášť, a musíme je uvolnit dříve, než uvolníme samotné pole studentů (řádků), jinak bychom už k
adresám polí předmětů nesměli přistupovat.

> Pokud by zubaté pole mělo tři dimenze, typ "vnějšího" pole by byl `int***`, pokud čtyři dimenze,
> tak `int****` atd.

Vytváření a uvolňování zubatého pole je o dost náročnější než u klasického vícerozměrného pole. To
je totiž v paměti uloženo jako klasické 1D pole, které akorát indexujeme vícerozměrným indexem, kdežto
zubaté pole je opravdu pole polí (polí polí...). Někdy je ovšem nutné mít různou velikost jednotlivých
řádků, a tehdy zubatá pole přijdou vhod.
