# Časté chyby
V této sekci naleznete často se vyskytující chyby, na které můžete narazit, spolu s návodem, jak je
vyřešit.

### Záměna `=` a `==`
- Operátor `=` [přiřazuje](../c/promenne/promenne.md#zápis) hodnotu do svého levého operandu a vyhodnotí se s
hodnotou pravého operandu.
- Operátor `==` [porovnává](../c/datove_typy/pravdivostni_typy.md#porovnávání-hodnot) dvě hodnoty a vyhodnotí
se jako pravdivostní hodnota `bool`.

Je důležité tyto operátory nezaměňovat! Oba dva operátory jsou výrazy, takže se v něco vyhodnotí a
i když je použijete špatně, tak často nedostanete chybovou hlášku, což jejich záměnu dělá ještě
nebezpečnější.

```c
int a = 0;
a = 5; // nastaví hodnotu `5` do proměnné `a`
a == 5; // porovná `a` s hodnotou `5`, vrátí hodnotu `true`, ale nic se neprovede

// podmínka se provede, pokud se `a` rovná `5`
if (a == 5) {}

// podmínka se provede vždy, výraz `a = 5` se vyhodnotí na `5` (`true`)
// zároveň při provedení podmínky se přepíše hodnota proměnné `a` na `5`
if (a = 5) {}
```

### Záměna `&` s `&&` nebo `|` s `||`
- Operátor `&` provádí [bitový součin](../c/datove_typy/celociselne_typy.md#tabulka-aritmetických-operátorů),
očekává jako operandy celá čísla (např. `int`) a vrací celé číslo.
- Operátor `&&` provádí [logický součin](../c/datove_typy/pravdivostni_typy.md#tabulka-logických-operátorů),
očekává jako operandy pravdivostní hodnoty (`bool`) a vrací pravdivostní hodnotu.

Je důležité tyto operátory nezaměňovat. Jelikož `bool` lze implicitně převést na celé číslo a naopak,
záměna těchto operátorů opět typicky nepovede k chybě při překladu, nicméně program nejspíše při
jejich záměně nebude fungovat tak, jak má. Operátor `&` má zároveň větší
[přednost](https://en.cppreference.com/w/c/language/operator_precedence) než `&&`, takže se výraz
s tímto operátorem může vyhodnotit jinak, než očekáváte. Obdobná situace platí i u dvojice
operátorů `|` (bitový součet) a `||` (logický součet).

```c
int a = 3;
a & 4; // `0` 
a && 4; // `true`

// stejné jako a > (5 & a) < 6
if (a > 5 & a < 6) {}
```

### Použití operátoru `^` pro umocnění
Operátor `^` provádí v *C* bitovou operaci [XOR](../c/datove_typy/celociselne_typy.md#operace-s-číselnými-typy),
nesnažte se jej tedy použít k výpočtu mocnin! Pro výpočet mocniny použijte funkci [`pow`](https://devdocs.io/c/numeric/math/pow)
(*power* je anglické označení pro mocninu).

```c,editable,mainbody
#include <stdio.h>
#include <math.h>

int main() {
    int a = 5 ^ 2;
    printf("%d\n", a);

    int b = pow(5, 2);
    printf("%d\n", b);

    return 0;
}
```

### Použití neexistujících negací operátorů porovnávání
Jediné existující operátory porovnávání v *C* jsou `<`, `<=`, `>`, `>=`, `==` a `!=`.
Operátory jako `!<`, `!>`, `=<` ani `=>` v *C* neexistují! Negací operátoru `<` je operátor `>=` a negací operátoru
`>` je operátor `<=`.

### Porovnávání výrazu s více hodnotami najednou
Pokud budete chtít zjistit, jestli např. nějaká proměnná je menší než jedna hodnota a zároveň větší
než jiná hodnota, musíte tyto dvě kontroly provést separátně a poté jejich výsledek spojit logickým
operátorem `&&`. Pokud použijete výraz jako např. `2 < a < 8`, tak se `2 < a` vyhodnotí jako hodnota
typu `bool`, a poté se provede porovnání `true < 8`, popřípadě `false < 8`, což nejspíše není to, co
zamýšlíte.

```c,editable,mainbody
#include <stdio.h>

int main() {
    int a = 100;

    // špatně
    if (2 < a < 8) {
        printf("A: a patri do intervalu (2, 8)\n");
    }

    // správně
    if (2 < a && a < 8) {
        printf("B: a patri do intervalu (2, 8)\n");
    }

    return 0;
}
```

### Středník za `for`, `while` nebo `if`
Příkazy `for`, `while` nebo `if` za svou uzavírací závorkou `)` očekávají jeden příkaz:
```c
if (a > b) printf("%d", a);
```
nebo blok s příkazy:
```c
if (a > b) {
    printf("%d", a);
    ...
}
```

Pokud však za závorku dáte rovnou středník (`;`), tak to překladač pochopí jako prázdný příkaz, který
nic nedělá.

V následující ukázce se provede 10× prázdné tělo cyklu `for` a následně se jednou vypíše řetězec `"Hello\n"`.
```c,editable,mainbody
#include <stdio.h>

int main() {
    for(int i = 0; i < 10; i++); {
        printf("Hello\n");
    }
    return 0;
}
```

Zde opět středník za `if` reprezentuje prázdný příkaz, takže blok kódu s příkazem `printf` se provede
vždy, i když je tato podmínka nesplnitelná.

```c,editable,mainbody
#include <stdio.h>

int main() {
    if(0); {
        printf("Hello\n");
    }

    return 0;
}
```

Je to ekvivalentní, jako byste napsali

```c,editable,mainbody
#include <stdio.h>

int main() {
    if (0) { /* zde není co provést */ }

    // tento blok se provede vždy
    {
      printf("Hello\n");
    }

    return 0;
}
```

### Špatné volání funkce
Abychom zavolali funkci (tj. řekli počítači, aby začal vykonávat kód, který v ní je), napíšeme
název funkce, závorky a do nich případně seznam argumentů. Při volání funkce už nezadáváme její
návratový typ, ten se udává pouze u definice funkce.

```c
int secti(int a, int b) {
    return a + b;
}
int main() {
    secti(1, 2);        // správně
    int secti(1, 2);    // špatně

    return 0;
}
```

### Záměna `'` s `"`
- Apostrof (`'`) slouží k zapsání (jednoho) [znaku](../c/text/znaky.md). Neukládejte do něj více znaků či celý text.
- Uvozovky (`"`) slouží k zapsání [řetězce](../c/text/text.md), tj. pole znaků ukončeného hodnotou `0`.

```c
char a = 'asd'; // špatně, více znaků v ''
char a = "asd"; // špatně, ukládáme řetězec do typu `char` (mělo by být `const char*`)

char a = 'x';               // správně
const char* str = "hello";  // správně
```

### Porovnávání řetězců pomocí `==`
Řetězce jsou v jazyce *C* reprezentovány jako [pole znaků](../c/text/retezce.md). Když pracujete
s řetězcem, tak máte obvykle k dispozici [ukazatel](../c/prace_s_pameti/ukazatele.md) na jeho první
[znak](../c/text/znaky.md).

Pokud k porovnání dvou řetězců použijete operátor `==`, tak vlastně porovnáte akorát hodnotu dvou
ukazatelů. Pokud budou tyto ukazatele obsahovat stejnou adresu v paměti, tak bude výsledek pravdivý.
Ale dva řetězce se můžou rovnat i v případě, že leží na různých místech v paměti! Pro porovnání
dvou řetězců tak použijte funkci [`strcmp`](https://devdocs.io/c/string/byte/strcmp).

```c
#include <string.h>

void funkce(const char* a, const char* b) {
    if (a == b) { ... }             // špatně
    if (strcmp(a, b) == 0) { ... }  // správně
}
```

> Může vám přijít zvláštní, že pokud porovnáváte dva [řetězcové literály](../c/text/retezce.md#Řetězcový-literál),
> tak porovnání dvou stejných řetězců pomocí `==` bude fungovat (vrátí pravdivou hodnotu). To je ale
> dáno pouze tím, že překladač stejné řetězcové literály ukládá na stejné místo v paměti, takže mají
> stejnou adresu a `==` zde bude fungovat. Pro porovnávání řetězců, které ale načtete např. z
> terminálu nebo ze souboru, to však fungovat nebude, proto `==` nikdy pro porovnávání řetězců
> nepoužívejte.

### Porovnávání řetězce načteného funkcí `fgets`
Funkce `fgets` umí načíst [řádek](../c/text/vstup.md#načtení-řádku) ze vstupního souboru či ze
standardního vstupu. Pokud s takto načteným řádkem chcete dále pracovat, dejte si pozor na to, že
na konci tohoto řetězce může být znak odřádkování (`'\n'`)! Pokud tomu tak bude, tak nebude např.
fungovat přímé porovnání řádku s nějakým řetězcovým literálem:

```c
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[80];
    fgets(buffer, sizeof(buffer), stdin);

    // Pokud uživatel zadá v terminálu ahoj, tak v proměnné `buffer` bude
    // řetězec "ahoj\n", takže toto porovnání nebude fungovat.
    if (strcmp(buffer, "ahoj") == 0) {
        printf("Ahoj!\n");
    }

    return 0;
}
```

Pokud tedy chcete takto pracovat s načteným řádkem, nejprve byste se měli podívat, jestli nekončí
znakem odřádkování, a pokud ano, tak tento znak
[odstranit](../c/text/retezce.md#k-čemu-slouží-nulový-znak-na-konci).

Znak odřádkování na konci řetězce být nemusí například pokud načtete poslední řádek ze souboru,
který není ukončen znakem odřádkování. Před změnou řetězce s načteným řádkem byste tak vždy měli
nejprve zkontrolovat, že se na jeho konci znak odřádkování opravdu nachází.

### Špatná práce s ukazatelem
[Ukazatele](../c/prace_s_pameti/ukazatele.md) jsou čísla, která interpretujeme jako
[adresy v paměti](../uvod/pamet.md). Můžete s nimi sice provádět některé aritmetické operace
(například sčítání či odčítání), nicméně v takovém případě provádíte výpočet s adresou, ne s
hodnotou, která je na dané adrese uložena.

Například v této funkci, která by měla přičíst hodnotu `x` k paměti na adrese `ptr`, musíte
nejprve přistoupit k hodnotě na dané adrese (`*ptr`), a až k této hodnotě pak přičíst `x`:
```c
void pricti_hodnotu(int* ptr, int x) {
    ptr += x;   // špatně, přičteme `x` k adrese `ptr`
    *ptr += x;  // správně, přičteme `x` k hodnotě na adrese `ptr` 
}
```

### Vytváření spousty proměnných místo použití pole
Pokud potřebujete jednotně pracovat s větším počtem hodnot v paměti, použijte [pole](../c/pole/pole.md).
Signálem, že jste měli použít pole, může být to, že máte ve funkci spoustu proměnných a pro rozlišení
každé proměnné musíte přidat nový řádek kódu:
```c
for (a0 = 0, a1 = 0, a2 = 0, a3 = 0, a4 = 0, a5 = 0; i < pocet; i++)
{
    if (hodnota == 1)
    {
        a0++;
    }
    else if (hodnota == 2)
    {
        a1++;
    }
    else if (hodnota == 3)
    {
        a2++;
    }
    ...
}
```

### Použití operátoru `sizeof` na ukazatel
Operátor `sizeof` se často hodí ke zjištění velikosti pole. Pokud jej ovšem použijete na ukazatel
(i kdyby v daném ukazateli byla adresa pole!), tak vám vrátí pouze velikost ukazatele, tedy
pravděpodobně hodnotu `8` na 64-bitovém systému.
```c
char pole[3];
char* ptr = pole;

sizeof(pole); // 3
sizeof(ptr);  // 8
```

Pozor na to, že pokud použijete datový typ pole pro parametr funkce, tak pro překladač se takový
parametr chová jako ukazatel! Pole se do funkcí vždy předávají jako adresa prvního prvku pole.

```c
void print_size(char pole[3]) {
    sizeof(pole); // 8
}
```

Podobný problém může vzniknout i třeba při alokaci paměti. Například zde:
```c
typedef struct {
    int vek;
    const char* jmeno;
} Osoba;

int main() {
    Osoba* osoby = (Osoba*) malloc(sizeof(Osoba*) * 5);

    return 0;
}
```
Dochází k alokaci paměti pro 5 ukazatelů na datový typ `Osoba`, místo alokace paměti pro pět hodnot typu `Osoba`!
Správné použití by bylo `malloc(sizeof(Osoba) * 5)`;

### `undefined reference to 'NAZEV'`
Snažíte se zavolat funkci `NAZEV`, která nebyla nalezena v žádném
[objektovém souboru](../c/modularizace/linker.md), který jste předali pro překlad. Ověřte si, že
máte název volané funkce správně.
