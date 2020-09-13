# Generování náhodných čísel
Počítače jsou **deterministické** stroje, což znamená, že stejný program vždy na stejný vstup
vrátí stejný výstup. Často ovšem chceme, aby naše programy obsahovaly prvky "náhody", když chceme
například:
- Hodit si kostkou v deskové hře
- Udělit náhodný počet zranění v rozsahu zbraně
- Oživit hráče na náhodné pozici na mapě

Počítače samy o sobě opravdovou náhodu vytvořit nemohou, nicméně můžou ji simulovat pomocí tzv.
**pseudo-náhodných generátorů čísel** (*pseudo-random number generation*).

Vygenerovat (pseudo-)náhodnou sekvenci čísel pomocí deterministických operací můžeme například
následujícím algoritmem:
1) Začneme s číslem `S`, které se nazývá **počáteční náhodná hodnota** (*random seed*).
2) Aplikujeme nějakou matematickou operaci na `S` a vyjde nám nové číslo `N`.
3) `N` použijeme jako vygenerované "náhodné číslo".
4) Nastavíme `S = N`.
5) Opakujeme postup od bodu 2).

Ukázka kódu, který takovýto algoritmus implementuje:
```c,editable
int S = 5;
int random() {
    int N = S;
    N = (5 * N + 3) % 6323;
    N = (4 * N + 2) % 8127;
    S = N;
    return N;
}
int main() {
    int r1 = random(); // 114
    int r2 = random(); // 2294
    int r3 = random(); // 4348
    int r4 = random(); // 2971
    int r5 = random(); // 723
    return 0;
}
```
Takovýto algoritmus bude generovat (nekonečnou) sekvenci čísel, která bude lidem připadat "náhodná"
(bude těžké uhodnout, jaké číslo algoritmus vrátí příště).

### Volba počáteční hodnoty `S`
Určite jste si všimli, že výše zmíněný algoritmus bude pokaždé generovat stejnou sekvenci čísel pro
stejné počáteční `S`. To se může hodit, chceme-li například mít možnost zpětně přehrát sekvenci
pseudo-náhodných čísel, například pro odladění chyby v programu. Nicméně pokud by sekvence byla pokaždé
stejná, tak o (pseudo-)náhodě nemůže být řeč.

Proto se obvykle hodnota *seedu* volí tak, aby při každém spuštění programu byla jiná. Přirozenou
volbou pro počáteční hodnotu `S` je tak například čas[^1] při spuštění programu. Lze ale také použít
například pohyby myši nebo stisky kláves, které nedávno na počítači proběhly.

[^1]: Ve formě [UNIX časového razítka](https://en.wikipedia.org/wiki/Unix_time), tedy počtu vteřin
uběhlých od 1. 1. 1970.

### Pseudo-náhodný generátor ve standardní knihovně *C*
Při praktickém použití si obvykle nebudete psát generátor pseudo-náhodných sami, ale použijete již
hotové řešení. To nabízí například standardní knihovna *C* ve formě funkcí `srand` (nastav hodnotu
*seed*u) a `rand` (vygeneruj pseudo-náhodné číslo):
```c,editable
#include <stdlib.h>
#include <time.h>

int main() {
    int now = (int) time(NULL); // získej současný čas
    srand(now); // nastav S na současný čas

    int num1 = rand(); // pseudo-náhodné číslo z intervalu [0, RAND_MAX]
    int num2 = rand() % 100; // z intervalu [0, 99]
    int num3 = rand() % 100 + 5; // z intervalu [5, 104]
    float num4 = rand() / (float) RAND_MAX; // z intervalu [0.0, 1.0]

    return 0;
}
```
