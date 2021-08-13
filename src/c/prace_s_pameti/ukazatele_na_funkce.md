# Ukazatele na funkce

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Ve funkcionálních jazycích[^1] můžeme [funkce](../funkce/funkce.md) používat jako kterékoliv jiné
hodnoty a provádět tak s nimi operace jako je uložení funkce do proměnné, předání funkce jako
argument jiné funkci, vrácení funkce jako návratové hodnoty z jiné funkce atd. V *C* tyto operace
s funkcemi přímo provádět nemůžeme, nicméně toto omezení lze alespoň částečně obejít použitím
**ukazatele na funkci** (*function pointer*).

[^1]: Jako je např. [Haskell](https://www.haskell.org/).

Ukazatel na funkci je číslo, které neinterpretujeme jako adresu nějaké hodnoty, ale jako
adresu kódu (tedy přeložených instrukcí) funkce v paměti běžícího programu. Tyto ukazatele se od
běžných ukazatelů liší tím, že používají jinou syntaxi a také umožňují zavolat funkci, jejíž adresa
je v ukazateli uložena.

## Syntaxe
Syntaxe datového typu ukazatele na funkci vychází ze syntaxe [signatury funkce](../funkce/funkce.md#syntaxe)
a vypadá takto:
```c
<datový typ> (*)(<parametr 1>, <parametr 2>, ...)
```
Zde je několik ukázek:
- Ukazatel na funkci, která vrací `int` a bere parametr `int`: `int (*)(int)`
- Ukazatel na funkci, která vrací `int` a bere parametry `int` a `bool`: `int (*)(int, bool)`
- Ukazatel na funkci, která nic nevrací a nemá žádné parametry: `void (*)()`

Ukazatel na funkci tak v podstatě odpovídá signatuře funkce, na kterou ukazuje, s tím rozdílem,
že místo názvu funkce obsahuje znaky `(*)`.

Jelikož v definici ukazatele na funkci jsou důležité hlavně datové typy parametrů, nemusíte jednotlivé
parametry pojmenovávat. Pokud ale chcete kód učinit přehlednější, můžete jim dát jména:
```c
int (*)(int mocnina, int mocnitel); 
```

## Použití v proměnné
Pokud chcete vytvořit promměnou (či parametr) datového typu ukazatel na funkce, tak musíte použít
speciální syntaxi. Běžně při vytváření proměnné nejprve napíšeme její datový typ a poté její název.
U ukazatele na funkci se však název proměnné nepíše až za datový typ, ale dovnitř závorek s hvězdičkou.
Takto lze vytvořit proměnnou s názvem `ukazatel1`, do které půjde uložit adresu funkcí, které vrací `int`
a berou dva parametry, oba typu `int`:
```c
int (*ukazatel1)(int, int);
```

## Inicializace a volání funkce
Pokud chcete nastavit do ukazatele na funkci nějakou hodnotu, stačí do něj přiřadit název existující
funkce.
```c
int funkce(int x) {
    return x + 1;
}

int main() {
    int (*ukazatel)(int) = funkce;

    return 0;
}
```
Signature přiřazené funkce musí odpovídat datovému typu ukazatele, nelze tak například přiřadit
funkci, která nic nevrací, do ukazatele, který má signaturu `int (*)()`.

Jakmile máme v proměnné ukazatele na funkci uloženou adresu nějaké funkce, můžeme pomocí názvu této
proměnné danou funkci zavolat.
```c,editable
#include <stdio.h>

int funkce(int x) {
    printf("Funkce zavolana s parametrem %d\n", x);
    return x + 1;
}

int main() {
    int (*ukazatel)(int) = funkce;
    
    int ret = ukazatel(1);
    printf("Funkce vratila %d\n", ret);

    return 0;
}
```

## Případy použití
K čemu vlastně ukazatel na funkce může sloužit? Už víme, že pomocí funkcí můžeme
[parametrizovat](../funkce/funkce.md#parametrizace-funkcí) kód, což nám umožňuje používat identický
kód nad různými vstupními hodnotami bez toho, abychom tento kód museli neustále duplikovat.

Prozatím jsme pro parametrizaci používali pouze jednoduché hodnoty, jako čísla nebo pravdivostní
hodnoty. Pomocí ukazatelů na funkce však můžeme parametrizovat samotný kód, který se má uvnitř
nějaké funkce provést.

Představte si například, že chcete vytvořit funkci, která provede nějakou operaci (např. přičtení
konstanty, vynásobení konstantou nebo vypsání na výstup) s číslem, ale pouze v případě, že toto číslo
je kladné. V opačném případě by měla funkce toto číslo pouze vrátit, bez jakékoliv změny. Jak byste
tuto funkci napsali, bez toho, abyste ji duplikovali pro každou operaci, která se má s kladným číslem
provést?

První řešení by mohlo vypadat například takto:
```c,editable
#include <stdio.h>

int proved_pro_kladne(int cislo, int operace) {
    if (cislo <= 0) return cislo;
    
    if (operace == 0) {
        return cislo * 3;
    } else if (operace == 1) {
        return cislo + 1;
    } else {
        printf("Cislo: %d\n", cislo);
        return cislo;
    }
}

int main() {
    printf("%d\n", proved_pro_kladne(-1, 0));
    printf("%d\n", proved_pro_kladne(1, 0));
    printf("%d\n", proved_pro_kladne(1, 1));
    printf("%d\n", proved_pro_kladne(1, 2));

    return 0;
}
```
Toto řešení jistě bude fungovat, nicméně je dost nepraktické, protože musíme ve funkci
`proved_pro_kladne` dopředu vyjmenovat všechny možné operace, které lze s číslem provést. Pokud
bychom tak chtěli přidat novou operaci, budeme muset tuto funkci upravit. Zároveň je také dost
nepřehledné předávat funkci informaci o tom, jaká operace se má provést, pomocí proměnné typu `int`
(parametr `operace`).

Pomocí ukazatele na funkci můžeme funkci `proved_pro_kladne` předat kód[^2], který se má provést,
pokud je předané číslo kladné. Pomocí toho můžeme od sebe oddělit logiku naší funkce (kontrola,
jestli je číslo kladné či ne) a samotnou operaci, která se má provést s kladným číslem.
Pokud tak vytvoříme novou operaci, nemusíme funkci `proved_pro_kladne` jakkoliv upravovat, stačí
ji zavolat s jiným argumentem.

[^2]: Ve formě adresy funkce.

```c,editable
#include <stdio.h>

int proved_pro_kladne(int cislo, int(*operace)(int)) {
    if (cislo <= 0) return cislo;
    return operace(cislo);
}

int vynasob_dvema(int cislo) { return cislo * 2; }
int pricti_jednicku(int cislo) { return cislo + 1; }
int vypis(int cislo) {
    printf("Cislo: %d\n", cislo);
    return cislo;
}

int main() {
    printf("%d\n", proved_pro_kladne(-1, vynasob_dvema));
    printf("%d\n", proved_pro_kladne(1, vynasob_dvema));
    printf("%d\n", proved_pro_kladne(1, pricti_jednicku));
    printf("%d\n", proved_pro_kladne(1, vypis));

    return 0;
}
```
Ukazatele na funkce nám umožňují vytvářet kód, který je více *composable*, jinak řečeno lze do
sebe skládat jako kostky Lega a nenutí nás zadrátovat možné způsoby použití dopředu (jako tomu bylo
v prvním řešení s parametrem `int operace`).

Ještě užitečnější jsou ukazatele na funkci v kombinacemi se zpracováním více hodnot pomocí
[polí](../pole/pole.md), kdy můžeme napsat obecnou funkci, která nějak zpracovává pole, a předat jí
například ukazatel na funkci, která se má zavolat nad každým prvkem v poli. Hodí se také při práci
se [strukturami](../struktury/struktury.md), kdy můžeme do atributu struktury uložit ukazatel na
funkci a přidat tak individuální chování k různým hodnotám struktur.
