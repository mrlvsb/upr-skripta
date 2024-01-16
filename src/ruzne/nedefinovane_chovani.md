# Nedefinované chování
V těchto skriptech často zmiňujeme pojem **nedefinované chování** 💣 (*undefined behaviour* neboli *UB*).
Tento mechanismus jazyka *C* je často těžko uchopitelný, a nemusí být jasné, proč jej vlastně tento jazyk obsahuje,
a jak velké nebezpečí pro korektnost programů představuje. Tato kapitola se pokusí situaci trochu více osvětlit.

> Příklady v této kapitole předpokládají znalost některých konstrukcí *C*, které jsou postupně vysvětlovány ve skriptech.
> Pokud jste se k těmto konstrukcím ještě nedostali a příkladům nerozumíte, tak se k nim vraťte později, až toho budete
> znát z *C* více.

Jazy *C* má svůj [standard](https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf), což je dokument, který definuje,
jaká jsou pravidla programů napsaných v *C*, a jakým způsobem se musí chovat překladače, aby *C* programy korektně přeložily.
Tento dokument popisuje například jaké velikosti můžou mít datové typy, jak má fungovat volání funkcí atd. Zároveň ale
také popisuje řadu situací, které jsou označeny jako **nedefinované chování**, odkud pochází název UB (undefined behaviour).
Tím, že jsou tyto situace označeny jako nedefinované, tak překladače při překladu programu mohou **předpokládat, že k nim
nikdy nedojde**.

Díky tomuto předpokladu jsou překladače schopny lépe optimalizovat *C* programy, a generovat tak efektivnější
strojový kód[^1]. Zároveň to ale znamená, že pokud programátor ve svém *C* programu takovouto nedefinovanou situaci vytvoří,
tak budou porušeny předpoklady překladače, což znamená, že může dojít k tomu, že překladač náš **program přeloží špatně**.
Pokud tedy ve vašem programu je situace způsobující UB, nemá žádný smysl bavit se o tom, co program dělá nebo co by mohl dělat.
Program je prostě špatně z pohledu pravidel jazyka *C*, a překladač z něj může vygenerovat program, který provádí něco
naprosto nesmyslného (nebo neprovádí vůbec nic). Problematické chování programů způsobené UB se projeví zejména, pokud
překládáte program s [optimalizacemi](parametry_prekladace.md), nicméně to neznamená, že bez optimalizací je UB neškodné!

Někdy lze nedefinované chování detekovat již pomocí statické analýzy, kterou provádí kompilátor.
Velké množství statické analýzy, kterou kompilátor dokáže provést, ovšem není implicitně zapnuto,
a musíme je vynutit při překladu pomocí [parametrů kompilátoru](parametry_prekladace.md).
Při kompilaci je vhodné využívat alespoň parametry `-Wall -Wextra -Wconversion -Wuninitialized`.

Ne všechny situace způsobující nedefinované chování je ovšem možné zachytit statickou analýzou.
Musíte se tak spolehnout na to, že budete pozorně zkoumat svůj kód, a případně využívat nástrojů,
jako je [Address sanitizer](../prostredi/ladeni.md#address-sanitizer), Undefined behaviour
sanitizer nebo [Valgrind](../prostredi/ladeni.md#valgrind), které vám mohou pomoci detekovat
následky přítomnosti UB ve vašich programech za běhu programu.

[^1]: Toto je také původní motivací, proč vůbec něco jako UB bylo vytvořeno - aby překladače mohly generovat efektivnější
kód, díky tomu, že můžou spoléhat na více předpokladů o našich programech.

# Příklad
Zde si ukážeme příklad UB způsobeného přístupem mimo validní paměť pole. Na tomto příkladu si můžeme ukázat, že přítomnost
UB v našem zdrojovém kódu může způsobit kompletní rozklad programu, a že nemá smysl spekulovat nad tím, jak se program
obsahující UB bude nebo nebude chovat.

V této funkci dochází k zjišťování, jestli se předaný argument nachází v poli čtyř čísel. V cyklu dochází k UB - naleznete
jej?
```c
int je_cislo_v_poli(int v) {
    int table[4] = { 5, 13, 8, 12 };

    for (int i = 0; i <= 4; i++) {
        if (table[i] == v) return 1;
    }
    return 0;
}
```

Jedná se o přístup mimo pole, protože podmínka for cyklu je `i <= 4`, místo `i < 4`. Pokud uvidíte takovýto kód, může
vás napadnout, že při páté iteraci cyklu dojde k přístupu mimo paměť, možná se vyvolá
[segmentation fault](../caste_chyby/pametove_chyby.md#segmentation-fault), ale pokud je funkce zavolána např. s argumentem
`5`, tak vlastně funkce proběhne "normálně". Není tomu tak! Tento program obsahuje UB, takže jej překladač může přeložit,
jak se mu zachce.

Například může dojít k tomuto:
1) Překladač vidí, že `table[4]` je UB, tj. k této situaci nikdy nemůže dojít.
2) Tím pádem `i` nikdy nemůže být `4`.
3) Pokud `i` nikdy nemůže být `4`, tak logicky nikdy nemůže být ani `5` (protože jinak by předtím muselo být `i=4`).
4) Jelikož `i` nemůže být `5`, tak smyčka je nekonečná, a jediný způsob, jak se může uvnitř smyčky funkce ukončit, je
provedením `return 1;`.
5) Tím pádem překladač funkci přeloží takto:
    ```c
    int je_cislo_v_poli(int v) {
        return 1;
    }
    ```

Zdá se vám to moc divoké? Přesně toto [udělá](https://godbolt.org/z/e8da3qYnx) překladač GCC, pokud takovouto funkci
přeložíte s optimalizacemi.

Nicméně, neznamená to, že se takto program musí zachovat vždy. Kdybyste použili jiný překladač, jinou verzi stejného
překladače, jiné [parametry překladu](parametry_prekladace.md) nebo dokonce program prostě spustili vícekrát, pokaždé
by se mohlo stát něco jiného. **Nemá cenu řešit, jak se zachová program obsahující UB**. Místo toho je nutné UB najít a
z kódu odstranit :)

# Které situace vedou k UB?
Neexistuje jednotný seznam, který by vyjmenovával všechny možné situace vedoucí k UB, nicméně zde je alespoň seznam běžně
se vyskytujících problémových situací:

- **Dělení nulou**
- **Čtení neinicializované paměti**
    U této situace si občas programátoři myslí, že když budou např. číst z neinicializované proměnné, tak program prostě
    přečte nějaká "náhodná" data, která se zrovna vyskytují v paměti. To není pravda! Čtení neinicializované paměti je UB,
    a tím pádem program může udělat cokoliv. Například:
    ```c
    int foo(int a) {
        int b;
        if (a == 5 || b == 6) {
            return 1;
        }
        return 2;
    }
    ```
    Pokud tento program [přeložíte](https://godbolt.org/z/G5E5Y16cb) s optimalizacemi, tak se celá funkce může zredukovat
    pouze na:
    ```c
    int foo(int a) {
        return 1;
    }
    ```
    Jak je to možné? Čtení neinicializované proměnné je UB, takže překladač klidně může předpokládat, že `b` bude vždy `6`,
    a tím pádem bude z funkce vždy vrácena jednička.
- **Chybějící `return` ve funkci, která nevrací `void`**
  ```c
  #include <stdio.h>

  int foo() {}
  int bar() {
    printf("bar\n");
  }
  ```
  Zde je UB, protože `foo` nevrací hodnotu typu `int`. Když se podíváme, jak překladač může tuto funkci
  [přeložit](https://godbolt.org/z/aacGjqhzE), tak se např. může stát to, že `foo` bude na stejné adrese jako `bar`,
  takže kdyby někdo zavolal funkci `foo`, ve skutečnosti se začne provádět funkce `bar`!
- **Přetečení celého čísla se znaménkem**
  Čísla se znaménkem (např. `int`) nesmí "přetéct", tj. dostat se přes svou nejvyšší hodnotu. Tato situace je v jazyce *C*
  UB.
- **Přístup mimo validní paměť** Přístup mimo validní paměť (např. mimo rozsah pole) je klasický příklad UB.
- **Derefence NULL ukazatele** Toto je opět klasický příklad UB.
- **Vícenásobné uvolnění dynamické paměti** Viz [Segmentation fault](http://localhost:3000/caste_chyby/pametove_chyby.html#segmentation-fault).
- **Přístup k uvolněné dynamické paměti** Viz [Segmentation fault](http://localhost:3000/caste_chyby/pametove_chyby.html#segmentation-fault).

# Provedení UB
UB způsobuje problémy "pouze", pokud je kód obsahující UB opravdu proveden za běhu programu. Přesněji řečeno, pokud se
program kdykoliv dostane do stavu, že někdy v budoucnu nutně musí dojít k provedení UB (tj. například program je na řádku
5, UB je na řádku 8, ale mezi těmito řádky není žádný skok/podmínka/cyklus/něco, co by mohlo přerušit chod programu), tak
v tento moment může UB způsobit problémy.

Například, v tomto konkrétním programu není chyba, protože UB (dělení nulou) na řádku 4 se nikdy neprovede.
```c,mainbody
int main() {
    int a = 5;
    if (a > 6) {
        a / 0;
    }

    return 0;
}
```

Naproti tomu, v následujícím programu může dojít k nesmyslnému chování (nevypíše se nic na výstup, i když funkce dostane
nulu jako argument), i když samotné UB v ten moment vzniká až na řádku `5 / a`:
```c
#include <stdio.h>

int foo(int a) {
  if (a == 0) {
    printf("spatny vstup\n");
  }
  return 5 / a;
}
```
Proč? Protože překladač může předpokládat, že k dělení nulou nemůže nikdy dojít (protože dělení nulou je UB). Jelikož
nemůžeme dělit nulou, a ve funkci dochází k dělení `a`, tak `a == 0` musí být nutně `false`! Tím pádem k výpisu nikdy
nemusí dojít, ani kdyby do funkce byl zaslán argument `0`.

Více informací o UB se můžete dozvědět např. [zde](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html).
