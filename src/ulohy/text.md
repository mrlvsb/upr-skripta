# Text
K vyřešení těchto úloh by vám mělo stačit znát [řetězce](../c/text/retezce.md) a [vstupně/výstupní operace](../c/text/vstupavystup.md)
(a samozřejmě veškeré předchozí učivo).

## Převod na velké znaky
Vytvořte funkci, která převede textový řetězec na velké znaky.
```c
char str[] = { "hello" };
uppercase(str);
// str by se zde měl rovnat "HELLO"
```

## Nahrazení znaku
Vytvořte funkci, která v řetězci nahradí všechny výskyty daného znaku za znak `'X'`.
```c
char str[] = { "hello" };
replace(str, 'l');
// str by se zde měl rovnat "heXXo"
```

## Šifrování řetězce
Vytvořte funkci, která "zašifruje" řetězec tím, že ke každému znaku přičte číslo (klíč).
K ní vytvořte funkci, která řetězec opět odšifruje (odečtením klíče).
```c
char str[] = { "abc" };
encrypt(str, 1);
// str by se zde měl rovnat "bcd"
decrypt(str, 1);
// str by se zde měl opět rovnat "abc"
```

## Délka řetězce
Vytvořte funkci `my_strlen`, která vypočte délku řetězce (obdoba funkce
[`strlen`](https://devdocs.io/c/string/byte/strlen) ze standardní knihovny *C*).
```c
my_strlen("");          // 0
my_strlen("abc");       // 3
my_strlen("abc 0 asd"); // 9
```

## Porovnávání řetězců
Vytvořte funkci, která vrátí `true`, pokud jsou dva předané řetězce stejné.
Vytvořte i variantu funkce, která porovnává řetězce bez ohledu na velikosti znaků.
```c
strequal("ahoj", "ahoj");               // 1
strequal("ahoj", "aho");                // 0
strequal_ignorecase("ahoj", "AhOj");    // 1
```

## Palindrom
Vytvořte funkci, která vrátí `true`, pokud je předaný řetězec
[palindrom](https://cs.wikipedia.org/wiki/Palindrom) (slovo, které se čte stejně zepředu i pozpátku).

![palindrom](../static/img/palindrom.svg)

## Histogram
Vytvořte funkci, která vypočte [histogram](https://cs.wikipedia.org/wiki/Histogram) znaků v řetězci.
Histogram je pole, ve kterém prvek na pozici `x` udává, kolikrát se znak `x` vyskytoval v daném řetězci.
```c
int histogram[255] = {};
calc_histogram("aabacc", histogram);
// histogram['a'] == 3
// histogram['b'] == 1
// histogram['c'] == 2
// histogram['d'] == 0
```

## Převod textu na číslo
Vytvořte funkci, která převede řetězec na číslo v desítkové soustavě. Pokud číslo nelze převést,
vraťte hodnotu `0`.
```c
convert("5");   // vrátí int s hodnotou 5
convert("123"); // vrátí int s hodnotou 123
```
Zkuste přidat i podporu pro záporná čísla.

## Načítání PINu
Načtěte od uživatele PIN (4 číslice). Poté opakovaně vyzývejte uživatele k zadání PINu. Pokud
uživatel zadá 3x nesprávný PIN, vypište chybovou hlášku a ukončete program. Pokud uživatel zadá PIN správně,
tak vypište `"Uspesne zadani PINu"` a ukončete program.

## Hádací hra (*guessing game*)
Vygenerujte [náhodné číslo](../ruzne/nahodna_cisla.md). Poté nechte uživatele hádat, jaké číslo
program vygeneroval. Po každém tipu uživateli dejte vědět, jestli uhádl správně nebo jestli jeho
tip byl vyšší či nižší než číslo, které hádá.

