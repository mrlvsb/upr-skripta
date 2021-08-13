# Makra

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Občas můžeme chtít v programech použít stejnou hodnotu na více místech. V takovém případě se hodí
danou hodnotu pojmenovat, aby bylo zřejmé, co reprezentuje. Zároveň by bylo užitečné ji nadefinovat
pouze na jednom místě, abychom její hodnotu mohli jednoduše upravit bez toho, abychom při tom
museli upravovat všechna místa, kde danou hodnotu používáme.

Pomocí příkazu `#define <název> <hodnota>` můžeme vytvořit **makro** (*macro*) s daným názvem a
hodnotou. Pokud preprocesor v kódu od řádku s `#define` do konce zdrojového souboru narazí na název
makra, tak tento název nahradí hodnotou makra (opět se jedná o prosté textové nahrazení, tedy
`Ctrl+C -> Ctrl+V`). Zkuste si například, co vypíše tento program:
```c,editable
#include <stdio.h>

#define CENA 25

int main() {
    printf("Cena je %d\n", CENA);
    printf("Dvojnasobek ceny je %d\n", CENA * 2);

    return 0;
}
```
Představte si, že hodnotu tohoto makra používáme v programu na stovkách míst. Pokud bychom ji
potřebovali změnit, tak stačí změnit jeden řádek s `#define` a preprocesor se poté postará o to,
že se hodnota aktualizuje na všech použitých místech.

Makra jsou dle konvence obvykle pojmenována s "caps-lockem", tedy velkými písmeny (respektive stylem
[screaming snake case](../promenne/pojmenovavani.md#víceslovné-názvy)).

Je třeba brát na vědomí, že preprocesor opravdu dělá pouhé textové nahrazení. Například následující
kód tak nedává smysl:
```c
#define CENA 25
int main() {
    CENA = 0;
    return 0;
}
```
protože po spuštění preprocesoru se z něj stane tento (nesmyslný) kód:
```c
int main() {
    25 = 0;
    return 0;
}
```

## Makra s parametry
Makra mohou také obsahovat parametry:
```c
#define <název_makra>(<param1>, <param2>, …) <hodnota_makra>
```
Tyto parametry můžete použít pro definici hodnoty. Nicméně je opět třeba dát pozor na to, že
preprocesor pracuje pouze s textem, nerozumí jazyku *C*. Parametry tak jsou předávány čistě jako
text, je tak potřeba dávat si pozor na několik věcí:
- **Priorita operátorů** Pokud bychom chtěli vytvořit například makro pro výpočet druhé mocniny,
můžeme ho napsat takto:
    ```c
    #define MOCNINA(a) a * a
    ```
    Pokud však takovéto makro použijeme s nějakým komplexním výrazem, nemusíme dosáhnout kýženého
    výsledku kvůli priority operátorů:
    ```c,editable,mainbody
    #include <stdio.h>

    #define MOCNINA(a) a * a

    int main() {
        printf("%d\n", MOCNINA(1 + 1));
        return 0;
    }
    ```
    Řádek s `printf` totiž preprocesor změní na `printf("%d\n", 1 + 1 * 1 + 1);`, což jistě není to,
    co jsme chtěli. Proto je dobré při použití maker s parametry obalovat jednotlivé parametry
    závorkami:
    ```c
    #define MOCNINA(a) (a) * (a)
    ```
    Pak by zde již došlo k úpravě na `printf("%d\n", (1 + 1) * (1 + 1));`, což vrátí druhou mocninu
    hodnoty `1 + 1`, tedy `4`.
- **Vedlejší efekty** Pokud mají argumenty předávané do makra nějaké
[vedlejší efekty](../prikazy_vyrazy.md#vedlejší-efekty), je třeba si dávat pozor na to, že makro může
jednoduše takovýto argument rozkopírovat a tím pádem vedlejší efekt provést vícekrát. Například při
použití makra `MOCNINA` výše by zde došlo k dvojnásobené inkrementaci proměnné `x`:

    ```c,editable,mainbody
    #include <stdio.h>

    #define MOCNINA(a) a * a

    int main() {
        int x = 0;
        int mocnina = MOCNINA(x++);
        printf("x=%d, mocnina=%d\n", x, mocnina);
  
        return 0;
    }
    ```

    Do maker tak radši nedávejte argumenty, které způsobují vedlejší efekty.

    <hr />

    **Cvičení**: Zamyslete se nad tím, jaké hodnoty vypsal program s makrem s vedlejšími efekty výše.
    Zkuste si rozepsat makro a odsimulovat v hlavě běh programu. Dojdete ke stejnému výsledku?

    <hr />

## Makra vs globální proměnné
[Globální proměnné](../promenne/globalni_promenne.md) jsou také pojmenované hodnoty definované na
jednom místě, proč tedy potřebujeme makra? Je to z několika důvodů:
- Makra s parametry umožňují definici hodnot či textu závislou na použitých parametrech, což
globální proměnné neumožňují.
- Konstantní globální proměnné nelze použít například pro určení velikosti statických
[polí](../pole/pole.md).
- Globální proměnné zabírají místo v paměti programu a zároveň zvyšují velikost spustitelného
souboru, protože v něm musí být uložena jejich iniciální hodnota
(pokud to tedy [není `0`](../promenne/globalni_promenne.md#iniciální-hodnota)). Makra se pouze textově
nahradí během překladu programu, takže samy o sobě žádnou paměť nezabírají.

Nicméně, makra jsou občas problémová kvůli toho, že se nahrazují čistě jako text. **Pokud je to tedy
možné, zkuste raději použít pro definici konstant v kódu konstantní globální proměnné.**

## Podmíněný překlad
Makra mohou také být použity k tzv. **podmíněnému překladu** (*conditional compilation*). Pomocí
příkazů preprocesoru jako `#ifdef` nebo `#if` můžete přeložit kus kódu pouze, pokud je nadefinované
určité makro (popřípadě pouze pokud má určitou hodnotu). Toho se běžně využívá například pro tvorbu
programů, které jsou kompatibilní s více operačními systémy (např. jedna funkce může mít jinou
implementaci pro Linux a jinou pro Windows).

V UPR se s podmíněným překladem nesetkáme, více se o něm můžete dozvědět například
[zde](https://docs.microsoft.com/en-us/cpp/preprocessor/hash-if-hash-elif-hash-else-and-hash-endif-directives-c-cpp).
