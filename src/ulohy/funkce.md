# Funkce
K vyřešení těchto úloh by vám mělo stačit znát [funkce](../c/funkce/funkce.md) (a samozřejmě veškeré předchozí učivo).

## Maximum
Napište funkci `max`, která přijme dva celočíselné argumenty a vrátí větší z nich.

<details>
<summary>Ukázka použití funkce</summary>

```c
printf("%d", max(0, 0));    // Vypíše 0
printf("%d", max(1, 5));    // Vypíše 5
printf("%d", max(2, -3));   // Vypíše 2
```
</details>

## Výpočet daně (funkce)
Naimplementujte úlohu [Výpočet daně](./podminky_a_cykly.md#výpočet-daně) pomocí funkce `vypocti_dan`. Funkce dostane
částku utracenou za nákupy akcií a průměrnou mzdu, a vrátí vypočtenou daň ve formě celého čísla.

<details>
<summary>Ukázka použití funkce</summary>

```c
printf("Dan=%d", vypocti_dan(10021, 41265));    // Vypíše Dan=0
printf("%d", vypocti_dan(10412, 41265));        // Vypíše 1561
printf("%d", vypocti_dan(2000000, 41265));      // Vypíše 460000

int dan = vypocti_dan(100000, 40000) + vypocti_dan(200000, 38000);
// dan bude 45000
```
</details>

## Textové kreslení obrazců (funkce)
Naimplementujte úlohu [Textové kreslení obrazců](./podminky_a_cykly.md#textové-kreslení-obrazců) pomocí funkcí. Pro
každý typ obrazce udělejte separátní funkci, která obdrží parametry nutné pro vykreslení daného obrazce, a vykreslí jej
na výstup pomocí znaku `x`.
Parametry můžou být např:
- délka strany pro funkci `ctverec`
- délka dvou stran (šířka × výška) pro funkci `obdelnik`
- délka a směr diagonály pro funkci `diagonala`

<details>
<summary>Ukázka použití funkce</summary>

```c
ctverec(4); // Vykreslí:
// xxxx
// xxxx
// xxxx
// xxxx

obdelnik(2, 3); // Vykreslí:
// xx
// xx
// xx

obdelnik(3, 1); // Vykreslí:
// xxx
```
</details>

## Fibonacciho číslo
Napište funkci `fibonacci`, která vypočte `n`-té [Fibonacciho číslo](https://cs.wikipedia.org/wiki/Fibonacciho_posloupnost)
(`n` bude parametrem funkce).

<details>
<summary>Ukázka použití funkce</summary>

```c
printf("%d", fibonacci(0));   // Vypíše 0
printf("%d", fibonacci(1));   // Vypíše 1
printf("%d", fibonacci(2));   // Vypíše 1
printf("%d", fibonacci(3));   // Vypíše 2
printf("%d", fibonacci(4));   // Vypíše 3
printf("%d", fibonacci(5));   // Vypíše 5
printf("%d", fibonacci(6));   // Vypíše 8
```
</details>

## Faktoriál
Napište funkci `factorial`, která vypočte [faktoriál](https://cs.wikipedia.org/wiki/Faktori%C3%A1l) předaného
parametru.

<details>
<summary>Ukázka použití funkce</summary>

```c
printf("%d", factorial(0));   // Vypíše 1
printf("%d", factorial(1));   // Vypíše 1
printf("%d", factorial(4));   // Vypíše 24
printf("%d", factorial(5));   // Vypíše 120
```
</details>
