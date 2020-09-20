# Základy

### Výpis sudých čísel
Vypište sudá čísla od 0 do 100 (včetně).

### FizzBuzz
Naimplementujte [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz)[^1]. Vypište čísla 1 až 100 tak, že:
 - pokud je číslo násobkem 3, tak vypište místo čísla `Fizz`
 - pokud je číslo násobkem 5, tak vypište místo čísla `Buzz`
 - pokud je číslo násobkem 3 i násobkem 5, tak vypíše místo čísla `FizzBuzz`

[^1]: Tento program často bývá obsahem interview programátorů ve firmách.

<details>
<summary>Výstup programu</summary>

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
Fizz Buzz
16
...
```
</details>

### Fibonacciho číslo
Napište funkci, která vypočte `n`-té [Fibonacciho číslo](https://cs.wikipedia.org/wiki/Fibonacciho_posloupnost)
(`n` bude parametrem funkce).

<details>
<summary>Výstup funkce</summary>

```c
fibonacci(0);   // 0
fibonacci(1);   // 1
fibonacci(2);   // 1
fibonacci(3);   // 2
fibonacci(4);   // 3
fibonacci(5);   // 5
fibonacci(6);   // 8
```
</details>

### Faktoriál
Napište funkci, která vypočte [faktoriál](https://cs.wikipedia.org/wiki/Faktori%C3%A1l) předaného
parametru.

<details>
<summary>Výstup funkce</summary>

```c
factorial(0);   // 1
factorial(1);   // 1
factorial(4);   // 24
factorial(5);   // 120
```
</details>

### Textové kreslení obrazců
Vykreslete následující obrazce. Napište program tak, aby počet řádků, na který se
obrazec vykreslí, byl konfigurovatelný, tj. pro změnu počtu řádků by mělo stačit změnit jediný řádek
(jedinou proměnnou).

<details>
<summary>Vyplněný čtverec</summary>

```
xxxx
xxxx
xxxx
xxxx
```
</details>

<details>
<summary>Nevyplněný čtverec</summary>

```
xxxx
x  x
x  x
xxxx
```
</details>

<details>
<summary>Čtverec vyplněný rostoucími čísly</summary>

```
xxxxx
x012x
x345x
x678x
xxxxx
```
</details>

<details>
<summary>Diagonála</summary>

```
x
 x
  x
   x
    x
```
</details>

<details>
<summary>Trojúhelník</summary>

```
  x  
 x x 
xxxxx
```
</details>

<details>
<summary>Písmeno Z</summary>

```
xxxxxx
    x 
   x  
  x 
 x
xxxxxx
```
</details>

### Načítání PINu
Načtěte od uživatele PIN (4 číslice). Poté opakovaně vyzývejte uživatele k zadání PINu. Pokud
uživatel zadá 3x nesprávný PIN, vypište chybovou hlášku a ukončete program.
