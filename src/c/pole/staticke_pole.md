# Statické pole
Pole v [automatické paměti](../prace_s_pameti/automaticka_pamet.md)[^1] (na zásobníku) se označují
jako **statická pole** (*static arrays*). Můžeme je vytvořit tak, že za název proměnné přidáme
hranaté závorky s číslem udávající počet prvků v poli. Takto například vytvoříme pole celých čísel
s třemi prvky:
```c
int array[3];
```
Takováto proměnná bude obsahovat paměť pro 3 celá čísla (tedy nejspíše na vašem počítači dohromady
12 bytů). Počet prvků v poli se označuje jako jeho **velikost** (*size*).

> Pozor na to, že hranaté závorky se udávají za název proměnné, a ne za název datového typu.
> `int[3] array;` je tedy špatně.

[^1]: Pole můžeme tímto způsobem vytvořit také v
[globální paměti](../prace_s_pameti/globalni_pamet.md).

Čísla takového pole budou v paměti uložena jeden za druhým[^2]:
<upr-container>
  <upr-array array='[0, 0, 0]'></upr-array>
</upr-container>

[^2]: Každý zelený čtverec na tomto obrázku reprezentuje 4 bytů v paměti (velikost jednoho `int`u).

V jistém smyslu je tak pole pouze zobecněním normální proměnné. Pokud totiž vytvoříte pole o
velikosti jedna (`int a[1]`), tak v paměti bude reprezentováno úplně stejně jako klasická proměnná
(`int a`).

> Pole lze vytvořit také na haldě pomocí [dynamické alokace paměti](dynamicke_pole.md). Všechny níže
> popsané koncepty jsou platné i pro dynamická pole, nicméně budeme je demonstrovat na statických
> polích, protože ty je jednodušší vytvořit.

## Počítání od nuly
Pozice jednotlivých prvků v poli se označují jako jejich **indexy** (*array indices*). Tyto pozice
se číslují od hodnoty `0` (tedy ne od jedničky, jak můžete být jinak zvyklí). První prvek pole je
tedy ve skutečnosti na nulté pozici (indexu), druhý na první pozici, atd. (viz obrázek nahoře).
**Počítání od nuly** (*zero-based indexing*) je ve světě programování běžné a budete si na něj
muset zvyknout. Jeden z důvodů, proč se prvky počítají právě od nuly, se dozvíte
[níže](#přístup-k-prvkům-pole).

Z tohoto vyplývá jedna důležitá vlastnost - poslední prvek pole je vždy na indexu
`<velikost pole> - 1`! Pokud byste se pokusili přistoupit k prvku na indexu `<velikost pole>`,
budete přistupovat mimo paměť pole, což pravděpodobně způsobí
[paměťovou chybu](../../caste_chyby/pametove_chyby.md).

### Konstantní velikost statického pole
Hodnota zadaná v hranatých závorkách by měla být konstantní (tj. buď přímo číselná hodnota anebo
[konstantní proměnná](../promenne/konstanty.md)). Pokud budete potřebovat pole dynamické velikosti,
tak byste měli použít [manuální alokaci paměti](dynamicke_pole.md).

Jazyk *C* od verze [*C99*](https://en.wikipedia.org/wiki/C99) již sice povoluje dávat do hranatých
závorek i "dynamické hodnoty":
```c
int velikost = ...; // velikost se načte např. ze souboru
int pole[velikost];
```
Nicméně tuto [funkcionalitu](https://en.wikipedia.org/wiki/Variable-length_array) není vhodné
používat. Zásobník má
[omezenou velikost](../prace_s_pameti/automaticka_pamet.md#nevýhody-automatické-paměti) a není určen
pro alokaci velkého množství paměti[^3]. Pokud navíc velikost takovéhoto pole může ovlivnit uživatel
programu (např. zadáním vstupu), může váš program jednoduše "shodit", pokud by zadal velké číslo a
došlo by k pokusu o vytvoření velkého pole na zásobníku. Zkuste se tak vyvarovat používání
dynamických hodnot při vytváření polí na zásobníku.

[^3]: Můžete si například zkusit přeložit následující program:
```c
int main() {
    int pole[10000000];
    return 0;
}
```
Při spuštění by měl program selhat na
[paměťovou chybu](../../caste_chyby/pametove_chyby.md#segmentation-fault), i když váš počítač má
pravděpodobně více než `10000000 * 4` (cca `38` MiB) paměti. Pokud chcete alokovat více než několik
stovek bytů, použijte raději [dynamickou alokaci](dynamicke_pole.md) na haldě.

## Inicializace pole
Stejně jako u normálních lokálních proměnných
[platí](../promenne/promenne.md#vždy-inicializujte-proměnné), že pokud pole nenainicializujete,
tak bude obsahovat nedefinované hodnoty. V takovém případě z pole nesmíte jakkoliv číst, jinak by
došlo k nedefinovanému chování 💣! K inicializaci hodnoty můžete použít složené závorky se seznamem
hodnot (oddělených čárkou), které budou do pole uloženy. Pokud nezadáte dostatek hodnot pro vyplnění
celého pole, tak zbytek hodnot bude nulových.
```c
int a[3];               // pole bez definované hodnoty, nepoužívat!
int b[3] = {};          // pole s hodnotami 0, 0, 0
int c[4] = { 1 };       // pole s hodnotami 1, 0, 0, 0
int d[2] = { 2, 3 };    // pole s hodnotami 2, 3
```
Hodnot samozřemě nesmíte zadat více, než je velikost pole.

Pokud využijete inicializaci statického pole, můžete vynechat velikost pole v hranatých závorkách.
Překladač v tomto případě dopočítá velikost za vás:
```c
int p[] = { 1, 2, 3 }; // p je pole s třemi čísly
```

## Přístup k prvkům pole
K přístupu k jednotlivým prvkům pole můžeme využít
[ukazatelů](../prace_s_pameti/ukazatele.md). Proměnná pole se totiž chová jako ukazatel na první
prvek (prvek na nultém indexu) daného pole, pomocí operátoru
[dereference](../prace_s_pameti/ukazatele.md#přístup-k-paměti-pomocí-ukazatele) tak můžeme
jednoduše přistoupit k prvnímu prvku pole:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int array[3] = { 1, 2, 3 };
    printf("%d\n", *array);
    return 0;
}
```
Abychom přistoupili i k dalším prvkům v poli, tak můžeme využít
[aritmetiky s ukazateli](../prace_s_pameti/ukazatele.md#aritmetika-s-ukazateli). Pokud chceme
získat adresu prvku na `i`-tém indexu, stačí k ukazateli na první prvek přičíst `i`[^4]:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int array[3] = { 1, 2, 3 };
    printf("%d\n", *(array + 0));   // první prvek pole
    printf("%d\n", *(array + 1));   // druhý prvek pole
    printf("%d\n", *(array + 2));   // třetí prvek pole
    return 0;
}
```

[^4]: Všimněte si, že při použití operátoru dereference zde používáme závorky. Je to z důvodu
[priority operátorů](https://en.cppreference.com/w/c/language/operator_precedence). Výraz `*array + 2`
by se vyhodnotil jako první prvek z pole `array` plus `2`, protože `*` (dereference) má větší
prioritu než sčítání. 

Nyní už možná tušíte, proč se při práci s poli vyplatí počítat od nuly. Prvek na nultém indexu je
totiž vzdálen nula prvků od začátku pole. Prvek na prvním indexu je vzdálen jeden prvek od začátku
pole atd. Pokud bychom indexovali od jedničky, museli bychom při výpočtu adresy relativně k ukazateli
na začátek pole vždy odečíst jedničku, což by bylo nepraktické.

## Operátor přístupu k poli
Jelikož je operace přístupu k poli ("posunutí" ukazatele a jeho dereference) velmi
běžná (a zároveň relativně krkolomná), *C* obsahuje speciální operátor, který jej zjednodušuje.
Tento operátor se nazývá *array subscription operator* a má syntaxi `<výraz a>[<výraz b>]`. Slouží
jako zkratka[^5] za `*(<výraz a> + <výraz b>)`. Například `array[0]` je ekvivalentní výrazu
`*(array + 0)`, `array[5]` je ekvivalentní výrazu `*(array + 5)` atd:
```c
int array[3] = { 1, 2, 3 };
array[0] = 5;       // nastavili jsme první prvek pole na hodnotu `5`
int c = array[2];   // nastavili jsme `c` na hodnotu posledního prvku pole
```

[^5]: Takovéto "zkratky", které v programovacím jazyku nepřináší novou funkcionalitu, pouze zkracují
či zjednoduššují často používané kombinace příkazů, se označují jako
[**syntax sugar**](https://en.wikipedia.org/wiki/Syntactic_sugar).

Jelikož je používání hranatých závorek přehlednější než používání závorek a hvězdiček, doporučujeme
je používat pro přistupování k prvkům pole, pokud to půjde.

> Pozor na rozdíl mezi tímto operátorem a definicí pole. Obojí sice používá hranaté závorky, ale
> jinak spolu tyto dvě věci nesouvisejí. Podobně jako se `*` používá pro definici datového typu
> [ukazatele](../prace_s_pameti/ukazatele.md) a zároveň jako operátor dereference (navíc i jako
> operátor pro násobení). Vždy záleží na kontextu, kde jsou tyto znaky použity.

## Použití polí s cykly
Pokud bychom k polím přistupovali po individuálních prvcích, tak bychom nemohli využít jejich plný
potenciál. I když umíme jedním řádkem kódu vytvořit například 100 různých hodnot (`int pole[100];`),
pokud bychom museli psát `pole[0]`, `pole[1]` atd. pro přístup k jednotlivým prvkům, tak bychom
nemohli s polem efektivně pracovat. Smyslem polí je zpracovat velké množství dat jednotným způsobem
pomocí malého množství kódu. Jinak řečeno, chtěli bychom mít stejný kód, který umí zpracovat
pole o velikosti `2` i `1000`. K tomu můžeme efektivně využít [cykly](../rizeni_toku/cykly.md).

Velmi často je praktické použít řídící proměnnou cyklu k tomu, abychom pomocí ní indexovali pole.
Například, pokud bychom měli pole s velikostí `10`, tak ho můžeme "projít" pomocí cyklu `for`:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int array[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    for (int i = 0; i < 10; i++) {
        printf("%d ", array[i]);
    }
    return 0;
}
```
Situace, kdy pomocí cyklu procházíte pole je velmi častý a určitě se s ním mnohokrát setkáte a
použijete jej. Zkuste si to procvičit například pomocí
[těchto úloh](../../ulohy/pole.md#minimální-hodnota-v-poli).

## Předávání pole do funkcí
Při předávání polí do funkcí si musíme dávat pozor zejména na dvě věci.

### Převod pole na ukazatel
Už víme, že když předáváme [argumenty](../funkce/funkce.md#parametrizace-funkcí) do funkcí, tak se
jejich hodnota zkopíruje. U statických polí tomu tak ovšem není, protože pole můžou být potenciálně
velmi velká a provádění kopií polí by tak potenciálně mohlo trvat dlouhou dobu. Když tak použijeme
proměnnou pole jako argument při volání funkce, dojde k tzv. **konverzi pole na ukazatel**
(*array to pointer decay*). Pole se tak vždy předá jako ukazatel na jeho první prvek:
```c,editable
#include <stdio.h>

void print_array(int* array) {
    printf("%d\n", array[0]);
}

int main() {
    int array[3] = { 1, 2, 3 };
    print_array(array);
    return 0;
}
```

Pro parametry sice můžete použít datový typ pole:
```c
void print_array(int array[3]) { ... }
```
nicméně i v tomto případě se bude takovýto parametr chovat stejně jako ukazatel (v tomto případě
tedy `int*`). Navíc překladač ani nebude kontrolovat, jestli do takového parametru opravdu dáváme
pole se správnou velikostí. Pro parametry reprezentující pole tak radši používejte ukazatel.

### Předávání velikosti pole
Když ve funkci přijmeme jako parametr ukazatel na pole, tak nevíme, kolik prvků v tomto poli je.
Tato informace je ale stěžejní, bez ní totiž nevíme, ke kolika prvkům pole si můžeme dovolit
přistupovat. Pokud tedy ukazatel na pole předáváme do funkce, je obvykle potřeba zároveň s ním
předat i délku daného pole:
```c
int sum_array(int* array, int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += array[i];
    }
    return sum;
}
```

#### Výpočet velikosti pole
Abyste při změně velikosti statického pole nemuseli ručně jeho velikost upravovat na více místech v
kódu, tak můžete ve funkci, kde definujete statické pole, vypočítat jeho velikost pomocí operátoru
`sizeof`:
```c
int pole[3] = { 1, 2, 3 };
printf("Velikost pole v bytech: %lu\n", sizeof(pole));
```
Abyste zjistili počet prvků ve statickém poli, můžete velikost v bytech vydělit velikostí každého
prvku v poli:
 ```c
int pole[3] = { 1, 2, 3 };
printf("Pocet prvku v poli: %lu\n", sizeof(pole) / sizeof(pole[0]));
```

> Operátor `sizeof` bude pro toto použití fungovat pouze pro statické pole a pouze ve funkci, ve které
> statické pole vytváříte! Pokud pole pošlete do jiné funkce, už z něj bude pouze ukazatel, pro který
> `sizeof` vrátí velikost ukazatele (což bude na vašem PC nejspíše `8` bytů).
