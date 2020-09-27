# Ukazatele
Tato sekce je ve výstavbě 🚧.

Automatic memory!!! pointer na lokální proměnnou
- pointerová aritmetika
- NULL
- void*

Prozatím jsme se zabývali jednoduchými datovými typy.
Ty používáme pro ukládání hodnot do proměnných se specifikovaným datovým typem.
Taková proměnná po přiřazení nějaké hodnoty obsahuje ve vymezeném místě v paměti počítače onu hodnotu.
Prozatím se nám všehny hodnoty ukládaly do místa v paměti, které nazýváme **zásobník** (*stack*).
Každý běžící program má vyhrazen zásobník o přesně definované velikosti [^1].

[^1]: To je dáno buď nastavením prostředí operačního systému nebo hodnotou zadanou při kompilaci.

Každá funkce má na tomto zásobníky také svuj **zásobníkový rámec** (*stack frame*).
Do tohoto rámce se ukládají lokální proměnné definované ve funkcích a také hodnoty [parametrů funkcí](../funkce/funkce.md#parametrizace-funkcí).

Podívejme se tedy, jak se takový parametr funkce chová při volání funkce.
Chceme-li např. vytvořit funkci `swap`, která zamění hodnoty ve dvou proměnných, tak bychom ji aktuálně napsali zřejmě následovně:

```c,editable
#include <stdio.h>
void swap( int a, int b ) {
    int tmp = a;
    a = b;
    b = tmp;
}
int main() {
    int x = 5, y = 10;
    swap( x, y );
    printf( "Po prehozeni: x= %d, y= %d\n", x, y ); // Vytiskne: x= 5, y= 10
    return 0;
}
```

Funkce `swap` správně zamění hodnoty v proměnných `a` a `b`, které jí byly předány pomocí argementů `x` a `y`, jež byly nahrazeny hodnotami `5` a `10`.
Hodnoty argumentů `x` a `y` při volání funkce `swap` se nakopírovaly do nových lokálních proměnných `a` a `b` této funkce.

Problém ovšem je, že hodnoty proměnných `x` a `y` se po zavolání funkce `swap` ve funkci `main` nezmění, jak bychom asi očekávali.

#### Proč se tomu tak děje?

Chyba je v tom, že funkce `swap` pracuje s lokálními kopiemi hodnot proměnných z funkce `main`.
Jak jsme již řekli, každá funkce má svůj zásobníkový rámec, který není pro další funkce viditelný.

#### Jak tedy zajistíme, aby se hodnoty proměnných zaměnily?

Budeme muset nějakým způsobem zajistit to, abychom ve funkci `swap` nepracovali s lokálními kopiemi hodnot, ale přímo s proměnnými definovanými ve funkci `main`.
Toho dossáhneme tak, že použijeme nový koncept, který se nazývá **ukazatel** (*pointer*).

*Ukazatel* je něco, co je schopno odkazovat na různá místa v paměti z různých míst programu, např. mezi zásobníkovými rámci různých funkcí, v rámci jednoho běžícího programu.

## Deklarace ukazatele

Ukazatel, podobně jako proměnné, má definovaný datový typ.
Pokud chceme ukazovat na nějakou proměnnou typu `int` i ukazatel musí být tohoto typu.
Ukazatel definujeme tak, že před název proměnné umístíme znak `*`.
Proměnné v jazyce *C* jsou symbolické názvy pro adresy v paměti.
Na těchto adresách jsou uloženy hodnoty proměnných.
Ukazatele mají také svou hodnotu, které je adresou, na kterou ukazují.

Můžeme tedy pro jednoduchost vytvořit proměnnou s nějakou hodnotou a ukazatel, který na ni bude ukazovat.

```c,editable
#include <stdio.h>
int main() {
    int x = 5;
    int *p_to_x = &x;
    Hodnota x= 5, adresa promenne x= 0x7fffffffdb1c
    Odkazovana hodnota *p_to_x= 5, hodnota v promenne p_to_x= 0x7fffffffdb1c
    return 0;
}
```

Program vypíše např. následující výstup (hodnoty adres se budou témeř vždy lišit):

```
Hodnota x= 5, adresa promenne x= 0x7fffffffdb1c
Odkazovana hodnota *p_to_x= 5, hodnota v promenne p_to_x= 0x7fffffffdb1c
```

Přibyly nám zde dva nové znaky a to `*` a `&`.
Znak `*` říkáme derefence a prakticky nám zajistí to, že z ukazatele dostaneme hodnotu proměnné, na kterou ukazuje.
To, aby se ukazatel odkazoval na nějakou proměnnou zajistíme tak, že do něj uložíme adresu proměnné (v našem případě proměnné `x`) pomocí adresního operátoru `&`.

Trošku matoucí může být zápis, který  je uveden v našem zdrojovém kódu, porotože nám říka, že do hodnotu ukazatele `*p_to_x` zapisujeme adresu proměnné `&x`.
To je dáno tím, že jsme definici ukazatel sdružili s jeho deklarací.
Zcela stejného výsledku můžeme dosáhnout pomocí následujícího kódu:

```c,editable
#include <stdio.h>
int main() {
    int x = 5;
    int *p_to_x;
    p_to_x = &x;
    printf( "Hodnota x= %d, adresa promenne x= %p\n", x, &x );
    printf( "Odkazovana hodnota *p_to_x= %d, hodnota v promenne p_to_x= %p\n", *p_to_x, p_to_x );
    return 0;
}
```

Jak by nám ukazatele mohly nakonec pomoci v úvodním příkladu pro prohození čísel?

Jak už jsme si řekli, ukazatel může odkazovat na proměnné mezi různými zasobníkovými rámci.
Toho docílíme tak, že parametry funkce `swap` budeme deklarovat jako ukazatele a jako argumenty použijeme adresy lokálních proměnných z fukce `main`.

```c,editable
#include <stdio.h>
void swap( int *a, int *b ) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
int main() {
    int x = 5, y = 10;
    swap( &x, &y );
    printf( "Po prehozeni: x= %d, y= %d\n", x, y ); // Vytiskne, jiz spravne: x= 10, y= 5
    return 0;
}
```

Všimněme si také toho, že ve funkci `swap` používáme lokální proměnnou `tmp`, do které můžeme dočasně uložit hodnotu odkazovanou ukazatelem.
