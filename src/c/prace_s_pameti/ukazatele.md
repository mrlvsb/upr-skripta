# Ukazatele
Abychom v *C* mohli manuálně pracovat s pamětí, potřebujeme mít možnost odkazovat se na jednotlivé
hodnoty v paměti pomocí [adres](../../uvod/pamet.md). Adresa je číslo, takže bychom mohli pro popis
adres používat například datový typ `unsigned int`[^1]. To by ale nebyl dobrý nápad, protože tento
datový typ neumožňuje provádět operace, které bychom s adresami chtěli dělat (načíst hodnotu z adresy
či zapsat hodnotu na adresu), a naopak umožňuje provádět operace, které s adresami dělat nechceme
(například násobení či dělení adres obvykle nedává valný smysl).

[^1]: Nejnižší možná adresa je `0`, takže záporné hodnoty nemá cenu reprezentovat.

Z tohoto důvodu *C* obsahuje datový typ, který je interpretován jako adresa v paměti běžícího
programu. Nazývá se **ukazatel** (*pointer*). Kromě toho, že reprezentuje adresu, tak každý datový
typ ukazatele také obsahuje informaci o tom, jaký typ hodnoty je uložen v paměti na adrese obsažené
v ukazateli. Poté říkáme, že ukazatel "ukazuje na" daný datový typ.

Abychom vytvořili datový typ ukazatele, vezmeme datový typ, na který bude ukazovat, a přidáme za něj
hvezdičku (`*`). Takto například vypadá proměnná datového typu "ukazatel na `int`":
```c
int* ukazatel;
```

Je důležité si uvědomit, co tato proměnná reprezentuje. Datový typ `int*` zde říká, že v proměnné
`ukazatel` bude uloženo číslo, které budeme interpretovat jako adresu. V paměti na této adrese poté
bude ležet číslo, které budeme interpretovat jako datový typ `int` (celé číslo se znaménkem).

Ukazatele lze libovolně "vnořovat", tj. můžeme mít například "ukazatel na ukazatel na celé číslo"
(`int**`). Ukazatel ale i tehdy bude prostě číslo, akorát ho budeme interpretovat jako adresu na
adresu. Pro procvičení je níže uvedeno několik datových typů spolu s tím, jak je interpretujeme.
- `int` - interpretujeme jako celé číslo
- `int*` - interpretujeme jako adresu, na které je uloženo celé číslo
- `float*` - interpretujeme jako adresu, na které je uloženo desetinné číslo
- `int**` - interpretujeme jako adresu, na které je uložena adresa, na které je uloženo celé číslo

Někdy chceme použít "univerzální" ukazatel, který prostě obsahuje adresu, bez toho, abychom striktně
určovali, jaká hodnota na dané adrese bude uložena. V tom případě můžeme použít datový typ `void*`.

> Velikost všech ukazatelů v programu je stejná a je daná použitým operačním systémem a překladačem.
> Ukazatele musí být dostatečně velké, aby zvládli reprezentovat libovolnou adresu, která se v programu
> může vyskytnout. Na vašem počítači to bude nejspíše 8 bytů, protože pravděpodobně používáte
> 64-bitový systém.

## Inicializace ukazatele
Jelikož před spuštěním programu nevíme, na jaké adrese budou uloženy hodnoty, které nás budou
zajímat, tak obvykle nedává smysl inicializovat ukazatel na konkrétní adresu (např. `int* p = 5;`).
Pro inicializaci ukazatele tak existuje několik standardních možností:
- **Inicializace na nulu**: Pokud chceme vytvořit "prázdný" ukazatel, který zatím neukazuje na
žádnou validní adresu, tak se dle konvence inicializuje na hodnotu `0`. Takovému ukazateli se pak
říká **nulový ukazatel** (*null pointer*). Jelikož datový typ výrazu `0` je `int`, tak před
přiřazením této hodnoty do ukazatele jej musíme
[přetypovat](../datove_typy/celociselne_typy.md#explicitní-konverze) na datový typ cílového
ukazatele:
    ```c
    float* p = (float*) 0;
    ```
    Jelikož tento typ inicializace je velmi častý, [standardní knihovna *C*](../funkce/stdlib.md)
    obsahuje [makro](../preprocesor/makra.md) `NULL`, které konverzi nuly na ukazatel provede za
    vás. Můžete jej najít například v souboru `stdlib.h`:
    ```c
    #include <stdlib.h>
    float* p = NULL;
    ```
- **Využití alokační funkce**: Pokud budete alokovat paměť [manuálně](dynamicka_pamet.md), tak
použijete funkce, které vám hodnotu ukazatele vrátí jako svou návratovou hodnotu.
- **Využití operátoru adresy**: Pokud chcete ukazatel nastavit na adresu již existující hodnoty v
paměti, můžete použít **operátor adresy** (*address-of operator*). Ten má syntaxi `&<proměnná>`.
Tento operátor se vyhodnotí jako adresa předané proměnné[^2]:
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int x = 1;
        int* p = &x;

        printf("%d\n", x);  // hodnota proměnné x
        printf("%p\n", p);  // adresa v paměti, kde je uložena proměnná x

        return 0;
    }
    ```

    Výraz předaný operátoru `&` se musí vyhodnotit na něco, co má adresu v paměti (většinou to bude
    [proměnná](../promenne/promenne.md)). Nedává smysl použít něco jako `&5`, protože 5 je číselná
    hodnota, která nemá žádnou adresu v paměti.
    
    Při použití tohoto operátoru je také třeba dávat si pozor na to, aby hodnota v paměti, jejíž
    adresu použitím `&` získáme, stále existovala, když se budeme později snažit k této adrese
    pomocí ukazatele přistoupit. V opačném případu by mohlo dojít k
    [paměťové chybě](../../caste_chyby/pametove_chyby.md#segmentation-fault) 💣.

[^2]: Všimněte si, že pro výpis ukazatelů ve funkci `printf` se používá `%p` místo `%d`.

## Přístup k paměti pomocí ukazatele
Když už máme v ukazateli uloženou nějakou (validní) adresu v paměti, tak k této paměti můžeme
přistoupit pomocí operátoru **dereference**. Ten má syntaxi `*<výraz typu ukazatel>`. Při použití
tohoto operátoru na ukazateli program přečte adresu v ukazateli, podívá se do paměti a načte hodnotu
uloženou na této adrese. Podle toho, na jaký datový typ ukazatel ukazuje, se načte odpovídající
počet bytů z paměti:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int cislo = 1;
    int* ukazatel = &cislo;

    printf("%p\n", ukazatel);
    printf("%d\n", *ukazatel);
    printf("%d\n", cislo);

    return 0;
}
```
V tomto programu se do proměnné `ukazatel` uloží adresa proměnné `cislo`, a poté dojde k načtení
hodnoty (`*ukazatel`) této proměnné z paměti přes adresu uloženou v ukazateli.

Pokud chceme do adresy uložené v ukazateli naopak nějakou hodnotu zapsat, tak můžeme operátor
dereference použít také na levé straně operátoru [zápisu](../promenne/promenne.md#zápis).
Uhodnete, co vypíše tento program?
```c,editable,mainbody
#include <stdio.h>

int main() {
    int cislo = 1;
    int* ukazatel = &cislo;
    *ukazatel = 5;

    printf("%d\n", cislo);

    return 0;
}
```

Pokud provádíte operace s přímo s proměnnou ukazatele, budete vždy pracovat "pouze" s adresou,
která je v něm uložena. Pokud chcete načíst nebo změnit hodnotu, kter v paměti leží na adrese
uložené v ukazateli, musíte použít operátor dereference.

## Aritmetika s ukazateli
Abychom se mohli v paměti "posouvat" o určitý kus dopředu či dozadu (relativně k nějaké adrese),
můžeme k ukazatelům přičítat či odčítat čísla. Toto se označuje jako **aritmetika s ukazateli**
(*pointer arithmetic*). Tato aritmetika má důležité pravidlo – pokud k ukazateli na konkrétní datový
typ přičteme hodnotu `n`, tak se adresa v ukazateli zvýší o `n`-násobek velikosti datového typu,
na který ukazatel ukazuje. Při aritmetice s ukazateli se tak neposouváme po jednotlivých bytech,
ale po celých hodnotách daného datového typu[^3].

[^3]: Z toho vyplývá, že aritmetiku nemůžeme provádět nad ukazateli `void*`, protože ty neukazují
na žádný konkrétní datový typ.

Například, pokud bychom měli ukazatel `int* p` s hodnotou `16` (tj. "ukazuje" na adresu `16`) a
velikost `int`u by byla `4`, tak výraz `p + 1` bude ukazatel s hodnotou `20`, výraz `p + 2` bude
ukazatel s adresou `24` atd.

Je důležité [rozlišovat](../../caste_chyby/caste_chyby.md#Špatná-práce-s-ukazatelem), jestli při
použití sčítání/odčítání pracujeme s hodnotou ukazatele anebo s hodnotou na adrese, která je v
ukazateli uložena:
```c
int x = 1;
int* p = &x;

*p += 1;    // zvýšili jsme hodnotu na adrese v `p` (tj. proměnnou `x`) o `1`
p += 1;     // zvýšili jsme adresu v `p` o `4` (tj. p nyní už neukazuje na `x`)
```

> K čemu je aritmetika s ukazateli užitečná se dozvíte v sekci o práci s
> [více proměnnými zároveň](../pole/staticke_pole.md#přístup-k-prvkům-pole).

Kromě dereference a aritmetiky lze s ukazateli provádět také porovnávání (klasicky pomocí operátorů
`==` nebo `>`). Díky toho můžeme například zjistit, jestli se dvě adresy rovnají.

## Využití ukazatelů
Jak se dozvíte v [následující sekci](dynamicka_pamet.md), ukazatele jsou nezbytné pro
manuální alokaci paměti. Hodí se také při práci s [více proměnnými](../pole/pole.md) zároveň. Kromě
toho je ale lze použít také například v následujících situacích, které všechny souvisí s předáváním
adres (ukazatelů) do funkcí:
- **Změna vnějších hodnot zevnitř funkce** - hodnoty argumentů předávaných při
[volání funkcí](../funkce/funkce.md#parametrizace-funkcí) se do funkce kopírují, nelze tak jednoduše
zevnitř funkce měnit hodnoty proměnných, které existují mimo danou funkci. To je sice samo o sobě
vhodná vlastnost, protože pokud bude funkce měnit pouze své lokální proměnné, případně parametry,
tak bude jednodušší se v ní vyznat. Nicméně, někdy opravdu chceme ve funkci změnit hodnoty externích
proměnných. Toho můžeme dosáhnout tak, že si do funkce místo hodnoty proměnné pošleme její adresu v
ukazateli, a pomocí této adresy pak hodnotu proměnné změníme. Takto například můžeme vytvořit funkci,
která vezme adresy dvou proměnných a prohodí jejich hodnoty:
    ```c,editable
    #include <stdio.h>
    void swap(int* a, int* b) {
        int tmp = *a;
        *a = *b;
        *b = tmp;
    }
    int main() {
        int x = 5;
        int y = 10;
        swap(&x, &y);
        printf("Po prehozeni: x=%d, y=%d\n", x, y);
        return 0;
    }
    ```
- **Vrácení více návratových hodnot** - posílání adres proměnných do funkce můžeme využít také k
tomu, abychom z funkce vrátili více než jednu návratovou hodnotu (do adres uložených v parametrech
totiž můžeme zapsat "návratové" hodnoty). Toho bychom však měli využívat pouze, pokud je to opravdu
nezbytné. Takovéto funkce je totiž složitější volat a nejsou
[čisté](../funkce/funkce.md#proč-název-funkce), protože obsahují vedlejší efekt - mění externí stav
programu.
- **Sdílení hodnot bez kopírování** - pokud bychom měli proměnné, které v paměti zabírají velké
množství bytů (například [struktury](../struktury/struktury.md)), a předávali je jako argumenty
funkci, tak může být zbytečně pomalé je pokaždé kopírovat. Pokud do funkce pouze předáme jejich
adresu, tak dojde ke kopii pouze jednoho čísla s adresou, nezávisle na tom, jak velká je proměnná,
která je na dané adrese uložena. Ukazatele tak můžeme použít ke sdílení hodnot v paměti mezi funkcemi
bez toho, abychom je kopírovali.

## Konstantní ukazatele
Pokud použijeme klíčové slovo [`const`](../promenne/konstanty.md) v kombinaci s ukazateli, je
potřeba si dávat pozor na to, k čemu se tohle klíčové slovo váže. To závisí na tom, zda je `const`
v datovém typu před nebo za hvězdičkou. Zde jsou možné kombinace, které můžou vzniknout u
jednoduchého ukazatele:
- `int*` - ukazatel na celé číslo. Adresu v ukazateli lze měnit, hodnotu čísla na adrese v ukazateli
také lze měnit.
- `const int*` - ukazatel na konstantní celé číslo. Adresu v ukazateli lze měnit, hodnotu čísla na
adrese v ukazateli nikoliv.
- `int const *` - konstantní ukazatel na celé číslo. Adresu v ukazateli nelze měnit, hodnotu čísla na
adrese v ukazateli lze měnit.
- `const int const *` - konstantní ukazatel na konstantní celé číslo. Adresu v ukazateli nelze měnit,
hodnotu čísla na adrese v ukazateli také nelze měnit.
