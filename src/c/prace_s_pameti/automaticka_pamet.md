# Automatická paměť
Zatím jsme používali (lokální) proměnné, které vznikají a zanikají uvnitř funkcí. Nemuseli jsme se
tedy nijak starat o to, kde existují v paměti. Lokální proměnné se ukládají do oblasti v paměti,
kterou nazýváme **zásobník** (*stack*). Každý běžící program má vyhrazen určitou oblast
adresovatelné paměti, která je použita právě jako zásobník.

Při každém zavolání funkce vznikne na zásobníku tzv. **zásobníkový rámec** (*stack frame*).
V tomto rámci je vyhrazena paměť pro lokální proměnné volané funkce a také pro její
[parametry](../funkce/funkce.md#parametrizace-funkcí). Rámec vzniká při zavolání funkce, v jednu chvíli tak
na zásobníku může existovat více rámců (s různými hodnotami proměnných a parametrů) pro stejnou funkci.
Rámce vznikají v paměti jeden za druhým, a jsou uvolněny v momentě, kdy se jejich funkce dokončí.[^1]

[^1]: Rámce tak mohou vznikat nebo zanikat pouze na konci zásobníku, ne uprostřed. Proto se tato
oblast nazývá zásobník, podle
[datové struktury](https://cs.wikipedia.org/wiki/Z%C3%A1sobn%C3%ADk_(datov%C3%A1_struktura)), která
má tuto vlastnost.

Při zavolání funkce se do paměti určené pro jednotlivé parametry v rámci nakopírují hodnoty argumentů
předaných při volání funkce. Jakmile funkce skončí, tak je rámec, spolu s pamětí lokálních
proměnných, uvolněn[^2].

[^2]: Uvolnění zde znamená pouze to, že program bude pokládat danou paměť za volnou k dalšímu použití.
Pokud tak například funkce bude mít lokální proměnnou s hodnotou `5` a vykonání funkce skončí, tato
hodnota v paměti zůstane, dokud nebude přepsána příštím zavoláním funkce.

V následující animaci můžete vidět sekvenci volání funkcí. Ve sloupci vpravo je zobrazen stav
zásobníku při provádění tohoto programu. Modře jsou v něm znázorněny hodnoty parametrů a červeně
hodnoty lokálních proměnných. Můžete si všimnout, že lokální proměnné mají
[nedefinovanou hodnotu](../promenne/promenne.md#vždy-inicializujte-proměnné), dokud do nich není
nějaká hodnota zapsána, nicméně paměť pro ně již existuje od začátku provádění funkce.

<upr-svgs src="../../static/animations/stack/stack-" to="15" height="400"></upr-svgs>

V animaci si můžete všimnout, že rámce vždy vznikají a zanikají pouze na konci zásobníku.[^3]
Uhodnete, jaké číslo tento program vypíše?

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
číslo `n` a my bychom chtěli vytvořit paměť pro `n` čísel, tak nestačí použití zásobníku.
- Paměť lokálních proměnných a parametrů je uvolněna při dokončení provádění funkce. Jediným způsobem,
jak předat hodnotu z volání funkce, je pomocí návratového typu, lze takto tedy vrátit pouze jednu
hodnotu. Nelze tak jednoduše sdílet hodnoty mezi funkcemi, protože paměť lokálních proměnných je po
dokončení volání funkce uvolněna a nelze ji tak použít z volající funkce.  
- Argumenty předávané do funkcí se kopírují do zásobníkového rámce volané funkce a návratová hodnota
se zase kopíruje zpět do rámce volající funkce. Toto kopírování může být zbytečně pomalé pro hodnoty
zabírající velký počet bytů. 

[^4]: Obvykle jde o jednotky KiB/MiB.

Abychom mohli alokovat větší množství paměti či jednoduššeji sdílet hodnoty proměnných mezi funkcemi,
tak musíme mít možnost explicitně adresovat hodnoty v paměti a případně i alokovat a uvolňovat
paměť manuálně. K tomu slouží [ukazatele](ukazatele.md).
