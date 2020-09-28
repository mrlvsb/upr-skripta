# Globální proměnné
Proměnné, které jsme si ukázali, byly vytvářeny uvnitř [funkcí](../funkce/funkce.md) (tj. ne na nejvyšší
úrovni souboru). Takovéto proměnné se nazývají **lokální proměnné**. Pokud chceme, aby k nějaké
proměnné byl přístup odkudkoliv v programu, tak můžeme vytvořit proměnnou na úrovni souboru.
Takovéto proměnné se nazývají **globální**.

V rámci jednoho souboru lze globální proměnnou použít od místa, kde je definována, až po
konec souboru:
```c,editable
#include <stdio.h>

// zde nelze použít proměnnou `globalni_promenna`

int globalni_promenna = 1;

int main() {
    globalni_promenna += 1;
    printf("%d\n", globalni_promenna);

    return 0;
}
```

### Iniciální hodnota
Narozdíl od lokálních proměnných, globální proměnné se nainicializují na hodnotu `0`[^1], i když
jim žádnou úvodní hodnotu nedáte. I tak je ale dobrým zvykem úvodní hodnotu takovýmto proměnným dát,
aby šlo jasně vidět, že absence úvodní hodnoty není pouze nedopatřením ze strany programátora.

[^1]: Je to zajištěno tím, že jsou uloženy v sekci spustitelného souboru nazývané
[`.bss`](https://en.wikipedia.org/wiki/.bss). Po spuštění programu jsou tak automaticky vynulovány.

### (Ne)používání globálních proměnných
Globální proměnné jsou zde zmíněny pro úplnost, nicméně doporučujeme je používat spíše zřídka,
obzvláště pokud půjde o globální proměnné, které půjde měnit (tj. pokud to nebudou
[konstanty](konstanty.md)). Obecně řečeno, na čím více místech je proměnná dostupná, tím složitější
je přemýšlení nad tím, jak přesně s ní pracovat, proto je lepší používat proměnné lokální, pokud to
jde. 

Když je proměnná globální, tak je k ní přístup v podstatě odkudkoliv v programu. To sice zní
neškodně, ba i užitečně, nicméně přináší to s sebou značné nevýhody, pokud lze proměnnou zároveň
měnit. Jakmile totiž lze proměnnou odkudkoliv změnit, snadno se vám může stát, že nějaký kus programu
vám bude hodnotu takovéto proměnné měnit "pod rukama", a bude obtížné najít kód, který danou proměnnou
změnil (a také důvod, proč ji změnil).

> Globální proměnné také mohou způsobovat problémy, pokud ve vašem problému budete využívat více jader
> procesoru. Tzv. paralelní programy nicméně nebudeme v tomto předmětu řešit, více se o nich dozvíte
> například v předmětu [Architektury počítačů a paralelních systémů](http://poli.cs.vsb.cz/edu/apps/).
