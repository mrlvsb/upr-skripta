# Statická pole
Pole v [automatické paměti](../prace_s_pameti/automaticka_pamet.md)[^1] (na zásobníku) se označují
jako **statická pole** (*static arrays*). Můžeme je vytvořit tak, že při definici proměnné za její
název přidáme hranaté závorky s číslem udávajícím počet prvků v poli. Takto například vytvoříme pole
celých čísel s třemi prvky:
```c
int pole[3];
```
Takováto proměnná bude obsahovat paměť pro 3 celá čísla (tedy nejspíše na vašem počítači dohromady
12 bytů). Počet prvků v poli se označuje jako jeho **velikost** (*size*).

> Pozor na to, že hranaté závorky se udávají za název proměnné, a ne za název datového typu.
> `int[3] pole;` je tedy špatně.

[^1]: Pole můžete tímto způsobem vytvořit také v
[globální paměti](../prace_s_pameti/globalni_pamet.md), pokud vytvoříte
[globální proměnnou](../promenne/globalni_promenne.md) datového typu pole.

Čísla takového pole budou v paměti uložena jedno za druhým[^2]:
<upr-container>
  <upr-array array='[0, 0, 0]'></upr-array>
</upr-container>

[^2]: Každý zelený čtverec na tomto obrázku reprezentuje 4 byty v paměti (velikost jednoho `int`u).

V jistém smyslu je tak pole pouze zobecněním normální proměnné. Pokud totiž vytvoříte pole o
velikosti jedna (`int a[1];`), tak v paměti bude reprezentováno úplně stejně jako klasická proměnná
(`int a;`).

> Pole lze vytvořit také na haldě pomocí [dynamické alokace paměti](dynamicka_pole.md). Všechny níže
> popsané koncepty jsou platné i pro dynamická pole, nicméně budeme je demonstrovat na statických
> polích, protože ty je jednodušší vytvořit.

### Konstantní velikost statického pole
Hodnota zadaná v hranatých závorkách by měla být "konstantním výrazem", tj. buď přímo číselná hodnota anebo
číselná hodnota pocházející z [makra](../preprocesor/makra.md)[^3]. Pokud budete potřebovat pole dynamické velikosti,
tak byste měli použít [dynamickou alokaci paměti](dynamicka_pole.md).

[^3]: Dokonce ani [konstantní](../promenne/konstanty.md) proměnná
[není](https://stackoverflow.com/questions/62354105/why-is-const-int-x-5-not-a-constant-expression-in-c)
v C "konstantním výrazem".

Jazyk *C* od verze [*C99*](https://en.wikipedia.org/wiki/C99) již sice povoluje dávat do hranatých
závorek i "dynamické" hodnoty, tj. výrazy, jejichž hodnota nemusí být známa v době překladu:
```c
int velikost = ...; // velikost se načte např. ze souboru
int pole[velikost];
```
Tato funkcionalita zvaná [VLA](https://en.wikipedia.org/wiki/Variable-length_array) (variable-length array)
je nicméně určená pro velmi specifické použití a nese s sebou různé nevýhody, proto ji v rámci předmětu
UPR **nepoužívejte**. Pokud si chcete být jisti, že se VLA ve vašem kódu nevyskytuje, překládejte své programy s
[parametrem překladače](../../ruzne/parametry_prekladace.md) <code style="white-space: nowrap;">-Werror=vla</code>.

<details>
<summary>Proč ne VLA?</summary>

Zásobník má značně [omezenou velikost](../prace_s_pameti/automaticka_pamet.md#nevýhody-automatické-paměti)
a není určen pro alokaci velkého množství paměti[^4]. Pokud velikost takovéhoto pole může ovlivnit
uživatel programu (např. zadáním vstupu), může váš program jednoduše "shodit" (v lepším případě)
nebo způsobit přepsání existující paměti (v horším případě), pokud by zadal velké
číslo a došlo by k pokusu o vytvoření moc velkého pole na zásobníku. VLA má také různé problémy s
kompatibilitou mezi překladači a jeho implementace překladači není zdaleka triviální.

Alokace paměti s dynamickou velikostí na zásobníku se může hodit ve velmi specifických případech,
např. při vývoji embedded zařízení nebo při vysoce efektivní práci s I/O (vstup/výstup). Nicméně pro
účely běžného programování v *C* a předmětu UPR rozhodně není potřeba, proto se VLA prosíme zkuste
vyhnout.

</details>

[^4]: Můžete si například zkusit přeložit následující program:
```c
int main() {
    int pole[10000000];
    return 0;
}
```
Při spuštění by měl program selhat na
[paměťovou chybu](../../caste_chyby/pametove_chyby.md#segmentation-fault), i když váš počítač má
pravděpodobně více než `10000000 * 4` (cca `38` MiB) paměti. Pokud chcete alokovat více než několik
stovek bytů, použijte raději [dynamickou alokaci](dynamicka_pole.md) na haldě.

## Počítání od nuly
Pozice jednotlivých prvků v poli se označují jako jejich **indexy** (*array indices*). Tyto pozice
se číslují od hodnoty `0` (tedy ne od jedničky, jak můžete být jinak zvyklí). První prvek pole je
tedy ve skutečnosti na nulté pozici (indexu), druhý na první pozici atd. (viz obrázek nahoře).
**Počítání od nuly** (*zero-based indexing*) je ve světě programování běžné a budete si na něj
muset zvyknout. Jeden z důvodů, proč se prvky počítají právě od nuly, se dozvíte
[níže](#přístup-k-prvkům-pole).

Z tohoto vyplývá jedna důležitá vlastnost - poslední prvek pole je vždy na indexu
`<velikost pole> - 1`! Pokud byste se pokusili přistoupit k prvku na indexu `<velikost pole>`,
budete přistupovat mimo paměť pole, což způsobí
[paměťovou chybu](../../caste_chyby/pametove_chyby.md).

## Inicializace pole
Stejně jako u normálních lokálních proměnných
[platí](../promenne/promenne.md#vždy-inicializujte-proměnné), že pokud pole nenainicializujete,
tak bude obsahovat nedefinované hodnoty. V takovém případě nesmíte hodnoty v poli jakkoliv číst,
jinak by došlo k nedefinovanému chování 💣! K inicializaci pole můžete použít složené závorky se
seznamem hodnot oddělených čárkou, které budou do pole uloženy. Pokud nezadáte dostatek hodnot
pro vyplnění celého pole, tak zbytek hodnot bude nastaveno na nulu.
```c
int a[3];               // pole bez definované hodnoty, nepoužívat!
int b[3] = {};          // pole s hodnotami 0, 0, 0
int c[4] = { 1 };       // pole s hodnotami 1, 0, 0, 0
int d[2] = { 2, 3 };    // pole s hodnotami 2, 3
```
Hodnot samozřemě nemůžete zadat více, než je velikost pole.

Pokud využijete inicializaci statického pole, můžete vynechat velikost pole v hranatých závorkách.
Překladač v tomto případě dopočítá velikost za vás:
```c
int p[] = { 1, 2, 3 }; // p je pole s třemi čísly, překladač si odvodí int p[3]
```

## Přístup k prvkům pole
Abychom využili toho, že nám pole umožňují vytvořit větší množství paměti najednou, musíme mít
možnost přistupovat k jednotlivým prvkům v poli. K tomu můžeme využít
[ukazatelů](../prace_s_pameti/ukazatele.md). Proměnná pole se totiž chová jako ukazatel na první
prvek (prvek na nultém indexu!) daného pole, pomocí operátoru
[dereference](../prace_s_pameti/ukazatele.md#přístup-k-paměti-pomocí-ukazatele) tak k tomutu prvku
můžeme jednoduše přistoupit:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pole[3] = { 1, 2, 3 };
    printf("%d\n", *pole);
    return 0;
}
```
Abychom přistoupili i k dalším prvkům v poli, tak můžeme využít
[aritmetiky s ukazateli](../prace_s_pameti/ukazatele.md#aritmetika-s-ukazateli). Pokud chceme
získat adresu prvku na `i`-tém indexu, stačí k ukazateli na první prvek přičíst `i`[^5]:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pole[3] = { 1, 2, 3 };
    printf("%d\n", *(pole + 0));   // první prvek pole
    printf("%d\n", *(pole + 1));   // druhý prvek pole
    printf("%d\n", *(pole + 2));   // třetí prvek pole
    return 0;
}
```

[^5]: Všimněte si, že při použití operátoru dereference zde používáme závorky. Je to z důvodu
[priority operátorů](https://en.cppreference.com/w/c/language/operator_precedence). Výraz `*pole + 2`
by se vyhodnotil jako první prvek z pole `pole` plus `2`, protože `*` (dereference) má větší
prioritu než sčítání. 

Nyní už možná tušíte, proč se při práci s poli vyplatí počítat od nuly. Prvek na nultém indexu je
totiž vzdálen nula prvků od začátku pole. Prvek na prvním indexu je vzdálen jeden prvek od začátku
pole atd. Pokud bychom indexovali od jedničky, museli bychom při výpočtu adresy relativně k ukazateli
na začátek pole vždy odečíst jedničku, což by bylo nepraktické.

> Přistupování k prvkům pole se běžně označuje pojmem **indexování pole**.

## Operátor přístupu k poli
Jelikož je operace přístupu k poli ("posunutí" ukazatele a jeho dereference) velmi
běžná (a zároveň relativně krkolomná), *C* obsahuje speciální operátor, který ji zjednodušuje.
Tento operátor se nazývá *array subscription operator* a má syntaxi

```
<výraz a>[<výraz b>]
```

Slouží jako zkratka[^6] za výraz

```
*(<výraz a> + <výraz b>)
```

Příklad:
- `pole[0]` je ekvivalentní výrazu `*(pole + 0)`
- `pole[5]` je ekvivalentní výrazu `*(pole + 5)`

```c
int pole[3] = { 1, 2, 3 };
pole[0] = 5;       // nastavili jsme první prvek pole na hodnotu `5`
int c = pole[2];   // nastavili jsme `c` na hodnotu posledního (třetího) prvku pole
```

[^6]: Takovéto "zkratky", které v programovacím jazyku nepřináší novou funkcionalitu, pouze zkracují
či zjednoduššují často používané kombinace příkazů, se označují jako
[**syntactic sugar**](https://en.wikipedia.org/wiki/Syntactic_sugar).

Jelikož je používání hranatých závorek přehlednější než používání závorek a hvězdiček, doporučujeme
je používat pro přistupování k prvkům pole, pokud to půjde.

> Pozor na rozdíl mezi tímto operátorem a definicí pole. Obojí sice používá hranaté závorky, ale
> jinak spolu tyto dvě věci nesouvisejí. Podobně jako se `*` používá pro definici datového typu
> ukazatele a [zároveň](../prace_s_pameti/ukazatele.md#přístup-k-paměti-pomocí-ukazatele)
> jako operátor dereference (navíc i jako operátor pro násobení). Vždy záleží na kontextu, kde jsou
> tyto znaky použity.

## Použití polí s cykly
Pokud bychom k polím přistupovali po individuálních prvcích, tak bychom nemohli využít jejich plný
potenciál. I když umíme jedním řádkem kódu vytvořit například 100 různých hodnot (`int pole[100];`),
pokud bychom museli psát `pole[0]`, `pole[1]` atd. pro přístup k jednotlivým prvkům, tak bychom
nemohli s polem efektivně pracovat. Smyslem polí je umožnit zpracování velkého množství dat jednotným
způsobem pomocí krátkého kusu kódu. Jinak řečeno, chtěli bychom mít stejný kód, který umí zpracovat
pole o velikosti `2` i `1000`. K tomu můžeme efektivně využít [cykly](../rizeni_toku/cykly.md).

Často je praktické použít [řídící proměnnou](../rizeni_toku/while.md#Řídící-proměnná) cyklu k tomu,
abychom pomocí ní indexovali pole. Například, pokud bychom měli pole s velikostí `10`, tak ho můžeme
"projít"[^7] pomocí cyklu `for`:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pole[10] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    for (int i = 0; i < 10; i++) {
        printf("%d ", pole[i]);
    }
    return 0;
}
```

[^7]: Používá se také pojem *proiterovat*.

Situace, kdy pomocí cyklu projdeme pole, je velmi častá a určitě se s ní mnohokrát setkáte a
využijete ji. Zkuste si to procvičit například pomocí
[těchto úloh](../../ulohy/pole.md#minimální-hodnota-v-poli).

## Předávání pole do funkcí
Pole můžeme (stejně jako hodnoty jiných datových typů) předávat jako argumenty do funkcí.
Musíme si při tom však dávat pozor zejména na dvě věci.

### Převod pole na ukazatel
Už víme, že když předáváme [argumenty](../funkce/funkce.md#parametrizace-funkcí) do funkcí, tak se
jejich hodnota zkopíruje. U statických polí tomu tak ovšem není, protože pole můžou být potenciálně
velmi velká a provádění kopií polí by tak potenciálně mohlo brzdit provádění programu. Když tak
použijeme proměnnou pole jako argument při volání funkce, dojde k tzv. **konverzi pole na ukazatel**
(*array to pointer decay*). Pole se tak vždy předá jako ukazatel na jeho první prvek:
```c,editable
#include <stdio.h>

void vypis_pole(int* pole) {
    printf("%d\n", pole[0]);
}

int main() {
    int pole[3] = { 1, 2, 3 };
    vypis_pole(pole);
    return 0;
}
```

Pro parametry sice můžete použít datový typ pole:
```c
void vypis_pole(int pole[3]) { ... }
```
nicméně i v tomto případě se bude takovýto parametr chovat stejně jako ukazatel (v tomto případě
tedy `int*`). Navíc překladač ani nebude kontrolovat, jestli do takového parametru opravdu dáváme
pole se správnou velikostí. Pro parametry reprezentující pole tak raději rovnou používejte ukazatel,
abychom čtenáře kódu nemátli.

### Předávání velikosti pole
Když ve funkci přijmeme jako parametr ukazatel na pole, tak nevíme, kolik prvků v tomto poli je.
Tato informace je ale stěžejní, bez ní totiž nevíme, ke kolika prvkům pole si můžeme dovolit
přistupovat. Pokud tedy ukazatel na pole předáváme do funkce, je obvykle potřeba zároveň s ním
předat i délku daného pole:
```c
int secti_pole(int* pole, int velikost) {
    int soucet = 0;
    for (int i = 0; i < velikost; i++) {
        soucet += pole[i];
    }
    return soucet;
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
> `sizeof` vrátí velikost ukazatele (což bude na vašem PC nejspíše `8` bytů). Více v kvízech níže.

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int pole[3] = { 1, 4, 7 };
        int a = *pole + 1;
        int b = *(pole + 1);

        printf("a = %d, b = %d\n", a, b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `a = 2, b = 4`. Jelikož má operátor dereference (`*`) větší
    [prioritu](https://en.cppreference.com/w/c/language/operator_precedence) než operátor sečtení
    (`+`), tak se do proměnné `a` uloží hodnota (`2`). Nejprve se totiž provede výraz `*pole`, kde
    dojde k dereferenci ukazatele na první prvek pole, čímž vznikne hodnota `1`, a k ní se poté přičte
    jednička.

    V případě proměnné `b` se nejprve ukazatel na první prvek pole posune o jeden prvek dopředu, tj.
    na adresu druhého prvku pole, který má hodnotu `4`. Poté dojde k dereferenci adresy tohoto prvku,
    do proměnné `b` se tak uloží hodnota `4`.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    void prijmi_pole(int p[3]) {
        p[2] += 1;
    }

    int main() {
        int pole[3] = { 1, 2, 3 };

        prijmi_pole(pole); 

        printf("{ %d, %d, %d }\n", pole[0], pole[1], pole[2]);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `{ 1, 2, 4 }`. Při předávání statického pole do funkce dojde pouze k předání
    ukazatele na jeho první prvek (i když má parametr typ `int p[3]`). Pokud tedy pomocí ukazatele
    `p` změníme hodnotu třetího prvku pole, tato změna se nám projeví i ve funkci `main`, protože
    stále pracujeme s tou stejnou pamětí.
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int pole[3] = { 1, 2, 3 };
        int *p = pole;

        p[1] = 5;
        pole[0] = 8;

        printf("%d, %d\n", *p, pole[1]);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `8, 5`. Do ukazatele `p` jsme si uložili adresu prvního prvku v poli. Pomocí
    `p[1]` posuneme ukazatel o jeden prvek v paměti "dopředu" (bude tedy ukazovat na druhý prvek pole)
    a rovnou na tuto adresu v paměti zapíšeme hodnotu `5`. Poté změníme hodnotu prvního prvku pole
    na `8`. Jelikož `p` ukazuje na první prvek v poli, tak při jeho dereferenci získáme právě hodnotu
    `8`. A jelikož jsme předtím pomocí ukazatele `p` změnili druhý prvek pole na `5`, tak `pole[1]`
    také vrátí hodnotu `5`.
    </details>
4) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int pole[3] = { 1, 2, 3 };
        printf("%d\n", pole);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣, protože jsme použili
    [zástupný znak](../prikazy_vyrazy.md#výpis-výrazů) `%d`, který slouží k výpisu celých čísel, ale
    předali jsme funkci `printf` argument `pole`, který je datového typu pole (resp. ukazatel na první
    prvek tohoto pole).
    </details>
5) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int p[3] = { 1, 2, 3 };
        for (int i = 0; i <= 3; i++) {
            printf("%d\n", p[i]);
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣, protože jsme přistoupili (dereferencovali)
    paměť mimo rozsah pole! Pole `p` má pouze tři prvky, nesmíme tedy přistoupit k indexu `3` či vyššímu,
    což se však v tomto programu stane, protože proměnná `i` nabývá hodnot `0`, `1`, `2` a `3`.

    Ať už tento program při konkrétním spuštění vypíše cokoliv, nemá cenu se tím zaobírat. Tento program
    obsahuje paměťovou chybu, která může způsobit pád programu, libovolnou změnu hodnot v paměti nebo
    cokoliv jiného. Chybu musíte nejprve odstranit, jinak program nebude správně fungovat.
    </details>
6) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int pole[3] = { 1, 2, 3 };
        2[pole] = 5;

        printf("%d\n", pole[2]);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `5`. I když to vypadá zvláštně, tak jelikož je sčítání komutativní, a operátor
    `a[b]` je definován jako `*(a + b)`, tak je jedno, jestli napíšete `a[b]` nebo `b[a]`. Takovýto
    zápis je nicméně nestandardní a nepoužívá se, tato úloha pouze měla demonstrovat, že jej takto
    teoreticky použít lze, a že `a[b]` opravdu není nic jiného, než zkratka za `*(a + b)`.
    </details>
7) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        char pole[3];
        char* ptr = pole;

        printf("%d\n", (int) sizeof(pole));
        printf("%d\n", (int) sizeof(ptr));

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>
    Program vypíše toto (na 32-bitovém systému by druhé číslo bylo pravděpodobně 4):

    ```
    3
    8
    ```
    
    Operátor `sizeof` vrátí velikost celého statického pole, pokud jej do něj předáme. Pokud však
    do něj dáme pouze ukazatel, tak `sizeof` neví, jak velká paměť leží na adrese uložené v tomto
    ukazateli, proto nám místo toho vrátí pouze velikost daného ukazatele, což bude na 64-bitovém
    systému pravděpodobně `8` bytů.
    </details>
8) Co vypíše následující program?
    ```c,editable
    #include <stdio.h>

    void print_size(char pole[3]) {
        printf("%d\n", (int) sizeof(pole));
    }
   
    int main() {
        char pole[3];
        print_size(pole);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>
    Program pravděpodobně vypíše řádek s hodnotou 8 (na 64-bitovém systému) či 4 (na 32-bitovém
    systému). Pokud použijeme datový typ pole jako parametr funkce, tak se k němu překladač bude
    víceméně chovat jako k běžnému ukazateli. Je to z toho důvodu, že překladač neví, jak velkou paměť
    do funkce předáváme (můžeme tuto funkci zavolat
    s ukazatelem na různě velká pole!). Z toho důvodu je tak lepší pro parametry funkcí vždy používat
    rovnou ukazatel a ne pole, abychom zamezili nejasnostem.

    Tyto následující tři signatury funkce jsou tedy v podstatě totožné:
    ```c
    void print_size(char pole[3]);
    void print_size(char pole[]);
    void print_size(char* pole);
    ```
    </details>
