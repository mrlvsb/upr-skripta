# Ukazatele
Abychom v *C* mohli manuálně pracovat s pamětí, potřebujeme mít možnost odkazovat se na jednotlivé
hodnoty v paměti pomocí [adres](../../uvod/pamet.md#adresování-paměti). Adresa je číslo, takže
bychom mohli pro popis adres používat například datový typ `unsigned int`[^1]. To by ale nebyl dobrý
nápad, protože tento datový typ neumožňuje provádět operace, které bychom s adresami chtěli dělat
(načíst hodnotu z adresy či zapsat hodnotu na adresu), a naopak umožňuje provádět operace, které s
adresami dělat nechceme (například násobení či dělení adres obvykle nedává valný smysl).

[^1]: Nejnižší možná adresa je `0`, takže záporné hodnoty nemá cenu reprezentovat.

Z tohoto důvodu *C* obsahuje datový typ, který je interpretován jako adresa v paměti běžícího
programu. Nazývá se **ukazatel** (*pointer*). Kromě toho, že reprezentuje adresu, tak každý datový
typ ukazatele také obsahuje informaci o tom, jaký typ hodnoty by měl být uložen v paměti na adrese
obsažené v ukazateli. Poté říkáme, že ukazatel "ukazuje na" daný datový typ.

Abychom vytvořili datový typ ukazatele, vezmeme datový typ, na který bude ukazovat, a přidáme za něj
hvezdičku (`*`). Takto například vypadá proměnná datového typu "ukazatel na `int`"[^2]:
```c
int* ukazatel;
```

[^2]: Je jedno, jestli hvězdičku napíšete k datovému typu (`int* p`) anebo k názvu proměnné
(`int *p`), bílé znaky jsou zde ignorovány. Pozor však na vytváření více ukazatelů na
[jednom řádku](#definice-více-ukazatelů-najednou).

Je důležité si uvědomit, co tato proměnná reprezentuje. Datový typ `int*` zde říká, že v proměnné
`ukazatel` bude uloženo číslo, které budeme interpretovat jako adresu. V paměti na této adrese poté
bude ležet číslo, které budeme interpretovat jako datový typ `int` (celé číslo se znaménkem).

Ukazatele lze libovolně "vnořovat", tj. můžeme mít například "ukazatel na ukazatel na celé číslo"
(`int**`). Ukazatel ale i tehdy bude prostě číslo, akorát ho budeme interpretovat jako adresu jiné
adresy. Pro procvičení je níže uvedeno několik datových typů spolu s tím, jak je interpretujeme.
- `int` - interpretujeme jako celé číslo
- `int*` - interpretujeme jako adresu, na které je uloženo celé číslo
- `float*` - interpretujeme jako adresu, na které je uloženo desetinné číslo
- `int**` - interpretujeme jako adresu, na které je uložena adresa, na které je uloženo celé číslo

Někdy chceme použít "univerzální" ukazatel, který prostě obsahuje adresu, bez toho, abychom striktně
určovali, jak interpretovat hodnotu na dané adrese. V tom případě můžeme použít datový typ `void*`.

> Velikost všech ukazatelů v programu je obvykle stejná a je dána použitým operačním systémem a
> překladačem. Ukazatele musí být dostatečně velké, aby zvládly reprezentovat libovolnou adresu,
> která se v programu může vyskytnout. Na vašem počítači to bude nejspíše **8 bytů**, protože
> pravděpodobně používáte 64-bitový systém.

## Inicializace ukazatele
Jelikož před spuštěním programu nevíme, na jaké adrese budou uloženy hodnoty, které nás budou
zajímat, tak obvykle nedává smysl inicializovat ukazatel na konkrétní adresu (např. `int* p = 5;`).
Pro inicializaci ukazatele tak existuje několik standardních možností:
- **Inicializace na nulu** Pokud chceme vytvořit "prázdný" ukazatel, který zatím neukazuje na
žádnou validní adresu, tak se dle konvence inicializuje na hodnotu `0`. Takovému ukazateli se pak
říká **nulový ukazatel** (*null pointer*). Jelikož datový typ výrazu `0` je `int`, tak před
přiřazením této hodnoty do ukazatele jej musíme
[přetypovat](../datove_typy/konverze.md) na datový typ cílového
ukazatele:
    ```c
    float* p = (float*) 0;
    ```
    Jelikož tento typ inicializace je velmi častý, [standardní knihovna *C*](../funkce/stdlib.md)
    obsahuje [makro](../preprocesor/makra.md) `NULL`, které konverzi nuly na ukazatel provede za
    vás. Můžete jej najít například v souboru `stdlib.h`:
    ```c
    #include <stdlib.h>
    // ...
    float* p = NULL;
    ```
- **Využití alokační funkce** Pokud budete alokovat paměť [manuálně](dynamicka_pamet.md), tak
použijete funkce, které vám vrátí adresu jako svou návratovou hodnotu.
- **Využití operátoru adresy** Pokud chcete ukazatel nastavit na adresu již existující hodnoty v
paměti, můžete použít **operátor adresy** (*address-of operator*). Ten má syntaxi `&<proměnná>`.
Tento operátor se vyhodnotí jako adresa předané proměnné[^3]:
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
    [proměnná](../promenne/promenne.md)). Nedává tedy smysl použít něco jako `&5`, protože 5 je
    číslo, které nemá samo o sobě žádnou adresu v paměti.

    Při použití tohoto operátoru je také třeba dávat si pozor na to, aby hodnota v paměti, jejíž
    adresu použitím `&` získáme, stále existovala, když se budeme později snažit k této adrese
    pomocí ukazatele přistoupit. V opačném případu by mohlo dojít k
    [paměťové chybě](../../caste_chyby/pametove_chyby.md#segmentation-fault) 💣.

[^3]: Všimněte si, že pro výpis ukazatelů ve funkci `printf` se používá `%p` místo `%d`.

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

<details>
  <summary>Interaktivní vizualizace kódu</summary>

  <iframe width="750" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=%23include%20%3Cstdio.h%3E%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20cislo%20%3D%201%3B%0A%20%20%20%20int*%20ukazatel%20%3D%20%26cislo%3B%0A%0A%20%20%20%20printf%28%22%25p%5Cn%22,%20ukazatel%29%3B%0A%20%20%20%20printf%28%22%25d%5Cn%22,%20*ukazatel%29%3B%0A%20%20%20%20printf%28%22%25d%5Cn%22,%20cislo%29%3B%0A%0A%20%20%20%20return%200%3B%0A%7D%0A&codeDivHeight=400&codeDivWidth=350&curInstr=5&origin=opt-frontend.js&py=c_gcc9.3.0&rawInputLstJSON=%5B%5D"> </iframe>
</details>

Pokud chceme do adresy uložené v ukazateli naopak nějakou hodnotu zapsat, tak můžeme operátor
dereference použít také na levé straně operátoru [zápisu](../promenne/promenne.md#zápis):
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
Tento program vypíše `5`, protože jsme pomocí ukazatele změnili hodnotu na adrese v paměti, kde leží
proměnná `cislo`. Když při výpisu poté načteme hodnotu proměnné `cislo`, tak už v ní bude upravená
hodnota.

<details>
  <summary>Interaktivní vizualizace kódu</summary>

  <iframe width="750" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=%23include%20%3Cstdio.h%3E%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20cislo%20%3D%201%3B%0A%20%20%20%20int*%20ukazatel%20%3D%20%26cislo%3B%0A%20%20%20%20*ukazatel%20%3D%205%3B%0A%0A%20%20%20%20printf%28%22%25d%5Cn%22,%20cislo%29%3B%0A%0A%20%20%20%20return%200%3B%0A%7D&codeDivHeight=400&codeDivWidth=350&curInstr=0&origin=opt-frontend.js&py=c_gcc9.3.0&rawInputLstJSON=%5B%5D"> </iframe>
</details>

Pokud provádíte operace s přímo s proměnnou ukazatele, budete vždy pracovat "pouze" s adresou,
která je v něm uložena. Pokud chcete načíst nebo změnit hodnotu, která leží v paměti na adrese
uložené v ukazateli, musíte použít operátor dereference.

> Pozor na rozdíl mezi `*` používanou pro deklaraci datového typu ukazatel, operátorem dereference
> a operátorem násobení. Všechny tyto věci sice používají hvězdičku, ale jinak spolu nesouvisí.
> Vždy záleží na kontextu, kde jsou tyto znaky použity:
> ```c
> // hvězdička říká, že datový typ proměnné `p` je ukazatel na `int`
> int* p;
> 
> // hvězdička provede dereferenci návratové hodnoty funkce `vrat_ukazatel`
> int x = *vrat_ukazatel();
> 
> // hvězdička provede násobení dvou čísel
> int a = 5 * 6;
> ```

## Aritmetika s ukazateli
Abychom se mohli v paměti "posouvat" o určitý kus dopředu či dozadu (relativně k nějaké adrese),
můžeme k ukazatelům přičítat či odčítat čísla. Toto se označuje jako **aritmetika s ukazateli**
(*pointer arithmetic*). Tato aritmetika má důležité pravidlo – pokud k ukazateli na konkrétní datový
typ přičteme hodnotu `n`, tak se adresa v ukazateli zvýší o `n`-násobek velikosti datového typu,
na který ukazatel ukazuje. Při aritmetice s ukazateli se tak neposouváme po jednotlivých bytech,
ale po celých hodnotách daného datového typu[^4].

[^4]: Z toho vyplývá, že aritmetiku nemůžeme provádět nad ukazateli typu `void*`, protože ty neukazují
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
> [více proměnnými zároveň](../pole/staticka_pole.md#přístup-k-prvkům-pole).

Kromě dereference a aritmetiky lze s ukazateli provádět také porovnávání (klasicky pomocí operátoru
`==`). Díky tomu můžeme zjistit, jestli se dvě adresy rovnají.

## Využití ukazatelů
Jak se dozvíte v [následující sekci](dynamicka_pamet.md), ukazatele jsou nezbytné pro
dynamickou alokaci paměti. Hodí se také při práci s [více proměnnými](../pole/pole.md) zároveň. Kromě
toho je ale lze použít také například v následujících situacích, které všechny souvisí s předáváním
adres (ukazatelů) do funkcí:
- **Změna vnějších hodnot zevnitř funkce** Hodnoty argumentů předávaných při
[volání funkcí](../funkce/funkce.md#parametrizace-funkcí) se do funkce kopírují, nelze tak jednoduše
zevnitř funkce měnit hodnoty proměnných, které existují mimo danou funkci. To je sice samo o sobě
vhodná vlastnost, protože pokud bude funkce měnit pouze své lokální proměnné, případně parametry,
tak bude jednodušší se v ní vyznat. Nicméně, někdy opravdu chceme ve funkci změnit hodnoty externích
proměnných.

  Toho můžeme dosáhnout tak, že si do funkce místo hodnoty proměnné pošleme její adresu v
  ukazateli, a pomocí této adresy pak hodnotu proměnné změníme. Takto například můžeme vytvořit funkci,
  která vezme adresy dvou proměnných a prohodí jejich hodnoty:
  ```c,editable
  #include <stdio.h>

  void vymen(int* a, int* b) {
      int docasna_hodnota = *a;  // načti hodnotu na adrese v `a`
      *a = *b;  // načti hodnotu na adrese v `b` a ulož ji na adresu v `a`
      *b = docasna_hodnota;  // ulož uloženou hodnotu na adresu v `b`
  }
  int main() {
      int x = 5;
      int y = 10;
      vymen(&x, &y);
      printf("Po prehozeni: x=%d, y=%d\n", x, y);
      return 0;
  }
  ```

  <details>
    <summary>Interaktivní vizualizace kódu</summary>

    <iframe width="750" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=%23include%20%3Cstdio.h%3E%0Avoid%20vymen%28int*%20a,%20int*%20b%29%20%7B%0A%20%20%20%20int%20docasna_hodnota%20%3D%20*a%3B%0A%20%20%20%20*a%20%3D%20*b%3B%0A%20%20%20%20*b%20%3D%20docasna_hodnota%3B%0A%7D%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20x%20%3D%205%3B%0A%20%20%20%20int%20y%20%3D%2010%3B%0A%20%20%20%20vymen%28%26x,%20%26y%29%3B%0A%20%20%20%20printf%28%22Po%20prehozeni%3A%20x%3D%25d,%20y%3D%25d%5Cn%22,%20x,%20y%29%3B%0A%20%20%20%20return%200%3B%0A%7D&codeDivHeight=400&codeDivWidth=350&curInstr=12&origin=opt-frontend.js&py=c_gcc9.3.0&rawInputLstJSON=%5B%5D"> </iframe>

  </details>

- **Vrácení více návratových hodnot** Posílání adres proměnných do funkce můžeme využít také k
tomu, abychom z funkce vrátili více než jednu návratovou hodnotu (do adres uložených v parametrech
totiž můžeme zapsat "návratové" hodnoty). Toho bychom však měli využívat pouze, pokud je to opravdu
nezbytné. Takovéto funkce je totiž složitější volat a nejsou
[čisté](../funkce/funkce.md#proč-název-funkce), protože obsahují vedlejší efekt - mění externí stav
programu.
  ```c,editable
  #include <stdio.h>

  void vrat_dve_hodnoty(int* a, int* b) {
      *a = 5;
      *b = 6;
  }

  int main() {
      int a = 0;
      int b = 0;
      vrat_dve_hodnoty(&a, &b);

      printf("a=%d, b=%d\n", a, b);

      return 0;
  }
  ```
- **Sdílení hodnot bez kopírování** Pokud bychom měli proměnné, které v paměti zabírají velké
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

## Definice více ukazatelů najednou
Pokud byste chtěli vytvořit více ukazatelů
[najednou](../promenne/promenne.md#definice-více-proměnných-najednou), musíte si dát pozor na to, že
v tomto případě se hvězdička vztahuje pouze k jednomu následujícímu názvu proměnné. Tento kód tak
vytvoří ukazatel s názvem `x`, a dvě celá čísla s názvy `y` a `z`:
```c
int* x, y, z;
```
Pokud byste chtěli vytvořit tři ukazatele, musíte dát hvězdičku před každý název proměnné:
```c
int* x, *y, *z;
```

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        int* p = &a;
        p = 5;

        printf("%d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `2`. Přiřazením `p = 5` změníme adresu uloženou v ukazateli `p` na `5`. Touto
    operací se tedy nijak nezmění hodnota proměnné `a`, jejíž adresu ukazatel před tímto přiřazením
    obsahoval. Aby k tomuto došlo, museli bychom napsat `*p = 5`.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        int b = 3;

        int* p = &a;
        p = &b;

        *p += 1;

        printf("a = %d, b = %d\n", a, b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `a = 2, b = 4`. Nejprve jsme sice nastavili ukazatel `p` na adresu proměnné `a`,
    ale poté jsme do `p` zapsali adresu proměnné `b`. Řádek `*p += 1;` tak zvedne hodnotu v paměti
    na adrese, kde leží `b`, o jedničku, jinak řečeno zvýší hodnotu proměnné `b` o jedničku.
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    void zmen_ukazatel(int* p, int a) {
        p = &a;
    }

    int main() {
        int a = 2;
        int b = 3;

        int* p = &b;
        zmen_ukazatel(p, a);

        printf("%d\n", *p);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `3`. Když předáme argument typu ukazatele do funkce, tak stejně jako u jiných datových
    typů dojde k tomu, že se ve funkci vytvoří nová proměnná a do ní se nakopíruje hodnota argumentu.
    Změna adresy v ukazateli `p` uvnitř funkce `zmen_ukazatel` tak neovlivní adresu v ukazateli `p`
    uvnitř funkce `main`. A jelikož `p` v `main`u ukazuje na proměnnou `b`, tak dereference tohoto
    ukazatele se vyhodnotí jako hodnota `3`.
    </details>
4) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;

        int* p = &a;
        *p = 4;

        int b = *p;
        *p = 8;

        printf("a = %d, b = %d\n", a, b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `a = 8, b = 4`. Při vytváření proměnné `b` se hodnota na adrese uložené v ukazateli
    `p` uloží do `b`. V danou chvíli je na této adrese uložena hodnota `4`, proto se do proměnné `b`
    uloží právě hodnota `4`. Další změny hodnot na adrese uložené v `p` už proměnnou `b` neovlivní.
    </details>
5) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        int* p = &a;

        printf("%d\n", p);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣, protože jsme použili
    [zástupný znak](../prikazy_vyrazy.md#výpis-výrazů) `%d`, který slouží k výpisu celých čísel, ale
    předali jsme funkci `printf` argument `p`, který je datového typu ukazatel.

    Správně můžeme buď použít zástupný znak `%p`, abychom vypsali adresu uloženou v ukazateli, nebo
    můžeme použít dereferenci a vypsat hodnotu uloženou na adrese v ukazateli:
    ```c
    printf("%p\n", p);
    printf("%d\n", *p);
    ```
    </details>
6) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 2;
        int b = 3;

        int* p = &a;
        int** px = &p;
        *px = &b;

        *p = 8;

        printf("a = %d, b = %d\n", a, b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `a = 2, b = 8`. Proměnná `px` je ukazatel na ukazatel na `int`. Obsahuje adresu,
    kde v paměti leží proměnná `p`. Pomocí `*px` změníme hodnotu na této adrese na `&b`, tj. adresu
    proměnné `b`. V podstatě je to to stejné, jako kdybychom napsali `p = &b`.

    Zkuste si na papír nakreslit, jak tento program bude vypadat v paměti, jaké adresy/hodnoty budou
    v jednotlivých proměnných. Výsledek si můžete ověřit [touto](https://pythontutor.com/render.html#code=%23include%20%3Cstdio.h%3E%0A%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20a%20%3D%202%3B%0A%20%20%20%20int%20b%20%3D%203%3B%0A%0A%20%20%20%20int*%20p%20%3D%20%26a%3B%0A%20%20%20%20int**%20px%20%3D%20%26p%3B%0A%20%20%20%20*px%20%3D%20%26b%3B%0A%0A%20%20%20%20*p%20%3D%208%3B%0A%0A%20%20%20%20printf%28%22a%20%3D%20%25d,%20b%20%3D%20%25d%5Cn%22,%20a,%20b%29%3B%0A%0A%20%20%20%20return%200%3B%0A%7D&cumulative=false&curInstr=9&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=c_gcc9.3.0&rawInputLstJSON=%5B%5D&textReferences=false)
    vizualizací.
    </details>
