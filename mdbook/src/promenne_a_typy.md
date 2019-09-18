# Proměnné a datové typy

V staticky typovaných jazycích jako je C musíme deklarovat typy
použitých proměnných (na rozdíl od jazyků jako Python či PHP).

Proměnnou vytvoříme jednoduše tak, že nadefinujeme její typ a pak její
jméno, případně můžeme na jednom řádku definovat více proměnných jednoho
typu různých jmen oddělených čárkou.

```c
int counter;
int sum, no_elements = 0;
```

Na výše uvedeném výpisu je použit výsek kódu, který deklaruje na prvním
řádku celočíselnou proměnnou typu `int`, která reprezentuje integer, což je
datový typ reprezentující celá čísla.
Druhý řádek demonstruje, že je možno
deklarovat více proměnných jednoho datového typu na jednom řádku. Je
deklarována proměnná `sum` a `no_elements`, do které je přiřazena
počáteční hodnota `0` (pokud do proměnné rovnou přiřadíme hodnotu, je to definice proměnné).
Pokud hodnotu do proměnné takto nepřiřadíme na začatku při její deklaraci,
musíme takovou proměnnou před prvním použitím nejříve nastavit na
požadovanou hodnotu. Typicky se toto děje, pokud používáme proměnnou
jako nějaké počítadlo.

```c
int counter;

int sum, no_elements = 0;

printf( "sum: %d\n", sum );                  // muze byt cokoli: sum: 432749
printf( "no_elements: %d\n", no_elements );  // no_elements: 0
```

Na řádku 5 a 6 vidíme použití knihovní funkce `printf`, která nám bude sloužit pro
tisk obsahu proměnných na konzoli. Můžete vidět, že funkce `printf` používá
formátovací řetězec, kde celá čísla (`int`eger) jsou zastoupena znakem `%d`.
Obecně je formátovácí řetězec uvozen znakem `%` následovaný formátovacím
znakem. Více o formátování výstupu se můžete dozvědet např. zde:
[^1],[^2].

```c
int a = 5, b = 10;

int c = a + b;

printf( "%d + %d = %d\n", a, b, c );  // 5 + 10 = 15
```

[^1]: Standardní vstup a výstup, [http://www.sallyx.org/sally/c/c07.php](http://www.sallyx.org/sally/c/c07.php)

[^2]: Dokumentace funkce `printf`, [http://www.cplusplus.com/reference/cstdio/printf/](http://www.cplusplus.com/reference/cstdio/printf/)