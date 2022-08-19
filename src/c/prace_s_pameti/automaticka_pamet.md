# Automatická paměť
Zatím jsme používali (lokální) proměnné, které vznikají a zanikají uvnitř funkcí. Nemuseli jsme se
tedy nijak starat o to, kde existují v paměti. Lokální proměnné se ukládají do oblasti v paměti,
kterou nazýváme **zásobník** (*stack*). Každý běžící program má vyhrazen určitou oblast
adresovatelné paměti, která je použita právě jako zásobník.

Při každém zavolání funkce vznikne na zásobníku tzv. **zásobníkový rámec** (*stack frame*).
V tomto rámci je vyhrazena (tzv. **naalokována**) paměť pro lokální proměnné volané funkce a také pro
její [parametry](../funkce/funkce.md#parametrizace-funkcí). Rámec vzniká při každém zavolání funkce,
v jednu chvíli tak na zásobníku může existovat více rámců (s různými hodnotami proměnných a parametrů)
pro stejnou funkci. Rámce vznikají v paměti za sebou, a jsou uvolněny v momentě, kdy se jejich
funkce dokončí.[^1]

[^1]: Rámce tak mohou vznikat nebo zanikat pouze na konci zásobníku, ne uprostřed. Proto se tato
oblast nazývá zásobník, podle
[datové struktury](https://cs.wikipedia.org/wiki/Z%C3%A1sobn%C3%ADk_(datov%C3%A1_struktura)), která
má tuto vlastnost.

Při zavolání funkce se do paměti určené pro jednotlivé parametry v rámci nakopírují hodnoty předaných
argumentů. Jakmile funkce skončí, tak je rámec, a tedy i paměť obsahující lokální proměnné a parametry
dané funkce, uvolněn[^2].

[^2]: Uvolnění zde znamená pouze to, že program bude pokládat danou paměť za volnou k dalšímu použití.
Pokud tak například funkce bude mít lokální proměnnou s hodnotou `5` a vykonání funkce skončí, tato
hodnota v paměti zůstane, dokud nebude přepsána příštím zavoláním funkce.

V následující animaci můžete vidět sekvenci volání funkcí. Ve sloupci vpravo je zobrazen stav
zásobníku při provádění tohoto programu:
- Šedé obdélníky označují zásobníkové rámce.
- Modré obdélníky znázorňují hodnoty parametrů v rámci.
- Červené obdélníky znázorňují hodnoty lokálních proměnných v rámci. Můžete si
všimnout, že lokální proměnné mají
[nedefinovanou hodnotu](../promenne/promenne.md#vždy-inicializujte-proměnné), dokud do nich není
nějaká hodnota zapsána, nicméně paměť pro ně již existuje od začátku provádění funkce.
- Oranžová šipka označuje, který řádek programu je právě prováděn.

Pomocí šipek v levém horním rohu animace se můžete postupně proklikat průběhem vykonání tohoto programu.
Uhodnotete, jaké číslo tento program vypíše?

<div style="height: 450px">
    <upr-slideshow src="../../static/animations/stack/stack-" to="15" extension="png"></upr-slideshow>
</div>

V animaci si můžete všimnout, že rámce vždy vznikají a zanikají pouze na konci zásobníku.[^3]
Pokud byste si chtěli tento program spustit lokálně, tak jeho zdrojový kód je dostupný níže.

<details>
<summary>Zdrojový kód programu</summary>

```c,editable
#include <stdio.h>

int fun1(int par) {
    int res = par * 2;
    if (res < 50) {
        return fun1(res);
    }
    else { return res; }
}
int fun2(int a, int b) {
    int x = a + b * 2;
    int y = fun1(x);
    return x + y;
}
int main() {
    printf("%d\n", fun2(5, 6));
    return 0;
}
```
</details>

[^3]: Z [historických](https://stackoverflow.com/questions/2035568/why-do-stacks-typically-grow-downwards)
důvodů zásobník roste "dolů", tj. nové rámce se vytvářejí na nižší adrese v paměti.

## Výhody automatické paměti
Používání automatické paměti má značné výhody:
- Nemusíme se starat o to, jak je paměť alokována a uvolňována, vše za nás řeší překladač, který
generuje instrukce pro vytváření a uvolňování rámců při volání/dokončení provádění funkce.
- Alokace i uvolnění paměti je velmi rychlá. Jde v podstatě o provedení jediné instrukce, která si
pamatuje, kde zrovna zásobník "končí" v paměti.

Pokud tedy nepotřebujete žádnou složitější funkcionalitu, první volbou by mělo být právě použití
automatické paměti (tedy lokálních proměnných).

## Nevýhody automatické paměti
Automatická paměť je sice velmi užitečná, nicméně někdy potřebujeme použít i jiné typy paměti,
protože automatická paměť má i určité nedostatky:
- Maximální velikost zásobníku je omezena[^4]. Nemůžeme tak na něm naalokovat větší množství paměti.
- Počet a velikost lokálních proměnných je "zadrátována" do programu během jeho překladu. Nemůžeme
tak naalokovat paměť s velikostí závislou na vstupu programu. Například pokud uživatel zadá
číslo `n` a my bychom chtěli vytvořit paměť pro `n` čísel, tak obvykle nestačí použití zásobníku.
- Paměť lokálních proměnných a parametrů je uvolněna při dokončení provádění funkce. Jediným způsobem,
jak předat hodnotu z volání funkce, je pomocí návratové hodnoty. Takto lze vrátit pouze jednu
hodnotu a nelze jednoduše sdílet paměť mezi funkcemi, protože paměť lokálních proměnných je po dokončení
volání funkce uvolněna a nelze ji tak použít z volající funkce.  
- Argumenty předávané do funkcí se kopírují do zásobníkového rámce volané funkce a návratová hodnota
se zase kopíruje zpět do rámce volající funkce. Toto kopírování může být zbytečně pomalé pro hodnoty
zabírající velký počet bytů. 

[^4]: Obvykle jde o jednotky KiB nebo MiB.

Abychom mohli alokovat větší množství paměti či jednoduššeji sdílet hodnoty proměnných mezi funkcemi,
tak musíme mít možnost alokovat a uvolňovat paměť manuálně. K tomu ale nejprve potřebujeme vědět,
jak pracovat přímo s adresami v paměti, k čemuž slouží [ukazatele](ukazatele.md).
