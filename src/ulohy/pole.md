# Pole
K vyřešení těchto úloh by vám mělo stačit znát [pole](../c/pole/pole.md) (a samozřejmě veškeré
předchozí učivo).

## Naplnění pole
Vytvořte funkci `fill_array`, která naplní pole `array` čísly zvětšujícími se po přírůstku `increment` a
začínajícími od hodnoty `start`. 
```c
void fill_array(int* array, int len, int start, int increment);
```

Níže je interaktivní diagram znázorňující, jak má vypadat pole po provedení funkce. Jednotlivé argumenty
volané funkce můžete v diagramu měnit.

<upr-array-fill></upr-array-fill>

## Počítání výskytů čísla

> 📹 K této úloze je k dispozici [video](https://www.youtube.com/watch?v=QCmH3uN9Au8) \[13:31] s popisem řešení.

Vytvořte funkci `num_count`, která spočítá a vrátí počet výskytů čísla `num` v poli `array`.
```c
int num_count(int* array, int len, int num);
```

Níže je interaktivní animace, která zobrazuje průběh programu.

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="4" to="4"></upr-array-interval>

## Počítání čísel v intervalu
Vytvořte funkci `in_interval`, která spočítá počet čísel z uzavřeného intervalu `[from, to]` v poli
 `array`.
```c
int in_interval(int* array, int len, int from, int to);
```

Níže je interaktivní animace, která zobrazuje průběh programu.

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="2" to="5"></upr-array-interval>

## Průměrná hodnota
Vytvořte funkci `average`, která spočítá průměr čísel v poli `array`.
```c
double average(int* array, int len);
```
Při dělení nezapomeňte přetypovat alespoň jeden operand na typ `double`, aby nedošlo k
celočíselnému dělení. Pokud bude pole prázdné, vraťte hodnotu `0.0`.

## Minimální hodnota v poli
Vytvořte funkci, která v poli `array` nalezne minimální hodnotu.

```c
int array_min(int *array, int len);
```

Níže je interaktivní animace, která zobrazuje průběh programu.

<upr-array-min array="[3, 5, 2, 8, 7, 1, 3]"></upr-array-min>

Následně funkci upravte, aby funkce vrátila pomocí ukazatele poslední index v poli, na kterém je minimální hodnota
daného pole.
```c
int array_min(int *array, int len, int *min_index);
```

## Minimální a maximální hodnota
Předchozí funkci upravte, aby hledala minimum a maximum zároveň.
Nalezené extrémy vraťte pomocí ukazatelů `min` a `max`.

```c
void min_max(int* array, int len, int *min, int *max);
```
Ve funkci si nejprve nastavte index minimální a maximální hodnoty na nultý prvek.
Parametr `min` je ukazatel, a je tedy nutné přistupovat k jeho hodnotě pomoci dereference - `*min`,
protože výraz `min` obsahuje pouze adresu, kde je minimální index uložen. Následně projděte
pole a pokud bude hodnota aktuálního prvku menší než hodnota prvku na dosud nalezeném indexu,
nastavte hodnotu minimálního indexu na aktuální index. Stejný postup aplikujte i pro nalezení
maximálního prvku (stačí udělat jeden průchod polem).

## Obrácení pole
Vytvořte funkci `array_reverse`, která obrátí prvky v poli.
```c
void array_reverse(int* array, int len);
```
Pole projděte pomoci cyklu do jeho půlky a vždy prohazujte prvky z obou konců.

Níže je interaktivní animace, která zobrazuje průběh programu.

<upr-array-reverse array="[10, 20, 30, 40, 50, 60]"></upr-array-reverse>

Přehození dvou prvků nemůžete udělat najednou. Uložte si například prvek z levého konce do proměnné
a následně do tohoto prvku zapište hodnotu z pravého konce. Poté hodnotu z proměnné uložte do pravého
konce. Alternativně také můžete využít [dříve](ukazatele.md#prohození-hodnoty) naimplementovanou funkci
`void swap(int* a, int* b)`.

## Skalární součin
Vytvořte funkci `dot`, která spočítá
[skalární součin](https://cs.wikipedia.org/wiki/Skal%C3%A1rn%C3%AD_sou%C4%8Din) dvou vektorů.
```c
int dot(int* a, int* b, int len);
```

## Načtení dynamického počtu hodnot
Načtěte od uživatele číslo `n`. Poté naalokujte paměť o velikosti `n` `int`ů a 
načtěte ze vstupu `n` čísel, které postupně uložte do vytvořeného pole. Vypište součet načteného
pole.

## Třízení
Naimplementujte funkci, která setřídí pole. Můžete použít například algoritmus
[bubble sort](https://en.wikipedia.org/wiki/Bubble_sort).

## Counting sort
Vygenerujte pole 10 000 000 [náhodných čísel](../ruzne/nahodna_cisla.md) z intervalu \\( \langle 1000, 2000 \rangle \\).
Pomocí algoritmu counting sort seřaďte čísla v poli od nejmenšího po největší.

1. vytvořte pole počítadel pro všechny možné hodnoty v poli
2. vynulujte počitadla na 0
3. sekvenčně projděte pole čísel a inkrementujte odpovídající počítadlo
4. projděte pole počítadel a tiskněte hodnotu tolikrát, kolik je hodnota počítadla

<upr-counting-sort></upr-counting-sort>
