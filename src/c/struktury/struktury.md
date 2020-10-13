# Struktury
**Struktury** (*structures*) nám umožňují popsat nový datový typ, který se bude skládat z
jednoho či více tzv. **členů** (*members*)[^1]. Každému členu musíme určit jeho jméno a datový typ.
Novou strukturu můžeme popsat pomocí tzv. *deklarace struktury*:
```c
struct <název struktury> {
    <datový typ prvního členu> <název prvního členu>;
    <datový typ druhého členu> <název druhého členu>;
    <datový typ třetího členu> <název třetího členu>;
    ...
};
```
> Při definici struktury nezapomínejte na finální středník za složenými závorkami, je povinný.

[^1]: Můžete se setkat také s názvy **atribut** (*attribute*), **vlastnost** (*property*) nebo
*field*. V kontextu struktur *C* označují všechny tyto názvy jedno a to samé - člena struktury.

Například, pokud bychom chtěli vytvořit datový typ reprezentující `příšeru`, která má své jméno
a počet životů, můžeme deklarovat následující strukturu:
```c
struct Prisera {
    const char* jmeno;
    int pocet_zivotu;
};
```
Tento kód sám o sobě **nic neprovádí**! Pouze pomocí něho říkáme překladači, že vytváříme nový datový
typ s názvem `struct Prisera`. Poté nám překladač umožní dále v programu vytvořit například lokální
proměnnou tohoto datového typu:
```c
// lokální proměnná s názvem `karel` a datovým typem `struct Prisera`
struct Prisera karel;
```

Pro pojmenovávání struktur používejte v rámci předmětu UPR jmennou konvenci
[`PascalCase`](../promenne/pojmenovavani.md#víceslovné-názvy).

> Struktury jsou plnohodnotnými datovými typy. Můžete tak vytvářet ukazatele na struktury, pole
> struktur, můžete použít struktury jako [členy jiné struktury](#použití-struktur-ve-strukturách)
> atd.

## Reprezentace struktury v paměti
Pokud vytvoříme proměnnou datového typu struktury, tak překladač naalokuje paměť pro všechny
členy této struktury. V případě výše by proměnná `karel` obsahovala nejprve byty pro ukazatel
`const char*` a poté byty pro `int`. Členové struktury budou v paměti uloženy ve stejném pořadí,
v jakém byly popsány při deklaraci struktury. Neznamená to ovšem, že musí ležet hned za sebou!
Překladač se může rozhodnout mezi členy struktury v paměti vložit mezery (tzv. *padding*) kvůli
urychlení provádění programu[^2].

[^2]: Pro některé typy procesorů může být rychlejší přistupovat k adresám v paměti, které jsou
například násobkem `4` nebo `8`. Proto překladač mezery do struktur vkládá, aby jednotlivé členy
zarovnal (*align*) v paměti. Více se můžete dozvědět například
[zde](https://en.wikipedia.org/wiki/Data_structure_alignment).

Z toho vyplývá, že velikost struktury není vždy zcela intuitivní. Například následující struktura
s názvem `StiskKlavesy` obsahuje jeden znak (`char`) s velikostí 1 byte a jedno číslo (`int`) s
velikostí 4 byty. Kvůli "neviditelným" mezerám vloženým překladačem ovšem velikost struktury nemusí
být `5` bytů!
```c,editable
#include <stdio.h>

struct StiskKlavesy {
    char klavesa;
    int delka;
};

int main() {
    printf("Velikost znaku: %lu\n", sizeof(char));
    printf("Velikost cisla: %lu\n", sizeof(int));
    printf("Velikost struktury StiskKlavesy: %lu\n", sizeof(struct StiskKlavesy));

    return 0;
}
```

Proto pro zjištění velikosti struktury (například při dynamické alokaci paměti) vždy používejte
operátor [`sizeof`](../prace_s_pameti/dynamicka_pamet.md#velikost-alokované-paměti).

### Umístění a platnost struktur
Stejně jako u [proměnných](../promenne/promenne.md#definice-a-platnost) platí, že strukturu lze
používat pouze v oblasti, ve které je platná (v jejím tzv. *scopu*). Narozdíl od
[funkcí](../funkce/funkce.md#umístění-funkcí) lze struktury deklarovat i uvnitř funkcí, nicméně
nejčastěji se struktury deklarují na nejvyšší úrovni souboru (tzv. *global scope*). 

## Inicializace struktury
Stejně jako u [základních datových typů](../promenne/promenne.md#vždy-inicializujte-proměnné) a
[polí](../pole/staticke_pole.md#inicializace-pole) platí, že pokud lokální proměnné s datovým typem
nějaké struktury nedáte počáteční hodnotu, tak bude její hodnota nedefinovaná 💣. Strukturu můžete
nainicializovat pomocí složených závorek se seznamem hodnot pro jednotlivé členy struktury:
```c
struct Prisera karel = { "Karel", 100 };
```
Stejně jako u polí platí, že hodnoty, které nezadáte, se nainicializují na nulu:
```c
struct Prisera karel = {}; // `jmeno` i `pocet_zivotu` bude `0`
struct Prisera karel = { "Karel" }; // `jmeno` bude "Karel", `pocet_zivotu` bude `0`
```
Abyste si nemuseli pamatovat pořadí členů struktury při její inicializaci, můžete jednotlivé členy
nainicializovat explicitně pomocí tečky a názvu daného členu:
```c
struct Prisera karel = { .pocet_zivotu = 100, .jmeno = "Karel"};
```

## Přístup ke členům struktur
Abychom mohli číst a zapisovat jednotlivé členy struktur, můžeme použít operátor
**přístupu ke členu** (*member access operator*), který má syntaxi `<struktura>.<název členu>`:
```c,editable
#include <stdio.h>

struct Osoba {
    int vek;
    int pocet_pratel;
};

int main() {
    struct Osoba martina = { 18, 10 };
    martina.vek += 1;
    martina.pocet_pratel += 20;
    printf("Martina ma %d let a ma %d pratel\n", martina.vek, martina.pocet_pratel);

    return 0;
}
```

Pokud máme k dispozici pouze ukazatel na strukturu, tak je přístup k jejím členům trochu nepraktický
kvůli [prioritě operátorů](https://en.cppreference.com/w/c/language/operator_precedence). Operátor
dereference (`*`) má totiž menší prioritu než operátor přístupu ke členu (`.`). Abychom tak nejprve
z ukazatele na strukturu načetli její hodnotu a až poté přistoupili k jejímu členu, museli bychom
použít závorky:
```c
void pridej_pratele(struct Osoba* osoba) {
    (*osoba).pocet_pratel++;
}
```
Jelikož ukazatele na struktury jsou využívány velmi často, *C* nabízí pro tuto situaci zkratku v
podobě operátoru **přístupu k členu přes ukazatel** (*member access through pointer*), který má
syntaxi `<ukazatel na strukturu>-><název členu>`:
 ```c
void pridej_pratele(struct Osoba* osoba) {
    osoba->pocet_pratel++;
}
```
Operátor `->` je čistě syntaktickou zkratkou, tj. `*(ukazatel).clen == ukazatel->clen`.

## Vytváření nových jmen pro datové typy
Možná vás napadlo, že psát při každém použití struktury klíčové slovo `struct` před jejím názvem je
zdlouhavé. *C* umožňuje dávat datovým typům nové názvy, aby se nám s nimi lépe pracovalo. Lze toho
dosáhnout pomocí syntaxe `typedef <datový typ> <jméno>;`:
```c
typedef int teplota;

int main() {
    teplota venkovni = 24;
    return 0;
}
```
Pomocí `typedef` dáme danému datovému typu nové jméno, pomocí kterého pak tento typ můžeme
používat (původní název datového typu toto nijak neovlivní). Opět platí, že takto vytvořené jméno
lze použít pouze v oblasti (*scopu*), kde byl `typedef` použit. Obvykle se používá na nejvyšší
úrovni souboru. 

U struktur si pomocí `typedef` můžeme zkrátit jejich název z `struct <nazev>` na `<nazev>`:
```c
struct Osoba {
    int vek;
};

typedef struct Osoba Osoba;

int main() {
    Osoba jiri;
    return 0;
}
```
Toto lze ještě více zkrátit, pokud deklaraci struktury použijeme přímo na místě datového typu v
`typedef`:
```c
typedef struct Osoba {
    int vek;
} Osoba;
```
A konečně, abychom nemuseli jméno struktury opakovat dvakrát, můžeme vytvořit tzv. **anonymní
strukturu** (*anonymous structure*) bez názvu, a jméno jí přiřadit až pomocí `typedef`.
```c
typedef struct {
    int vek;
} Osoba;
```
Právě takto se obvykle deklarují struktury v *C*.

## Použití struktur ve strukturách
Jelikož deklarace struktury vytvoří nový datový typ, nic vám nebrání v tom používat struktury jako
členy jiných struktur:
```c
typedef struct {
    float x;
    float y;
} Pozice;

typedef struct {
    const char* jmeno;
    int cena;
} Vec;

typedef struct {
    int pocet_zivotu;
    Pozice pozice;
    Vec korist[10];
} Prisera;
```
Díky tomu můžeme vytvářet celé hierarchie datových typů, což může značně zpřehlednit náš program,
protože poté náš kód poté může pracovat na vyšší úrovni abstrakce.

Pokud bychom ovšem chtěli použít jako člena struktury tu stejnou strukturu (například struktura
`Osoba` může mít člen `matka` opět s datovým typem `Osoba`), nemůžeme takovýto člen uložit ve
struktuře přímo, můžeme tam uložit pouze jeho adresu:
```c
struct Osoba {
    int vek;
    struct Osoba* matka;
};
```
Je to proto, že pokud by `Osoba` byla definována pomocí `Osoby`, tak by došlo k rekurzivní definici,
kterou nelze vyřešit.
