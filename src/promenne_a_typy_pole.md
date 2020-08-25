## Pole

Jedním z důležitých prvků jazyka C je práce s poli. Již jsme si v
předchozím odstavci ukázali, jak vytvořit dynamicky alokované pole pro
reprezentaci řetězce. Samozřejmě můžeme vytvořit podobné pole pro
reprezentaci intigerů, floatů, apod. Je také bez problému možné vytvořit
pole na stacku, které nemusíme dealokovat. Jeho platnost je však pouze v
rámci bloku, ve kterém je deklarováno, např. tedy funkce. Takové pole
také nelze z funkce vrátit pomocí klíčového slova `return`. Pojďme si nyní
ukázat, jak je možno s poli pracovat.


```c
char str[] = "Ahoj";
printf( "%c %c %c %c\n", ret[ 0 ], ret[ 1 ], ret[ 2 ], ret[ 3 ] );
// A h o j
```

Z uvedeného příkladu vyplývá, že k jednotlivým prvkům pole se přistupuje
přes operátor hranaté závorky (`[]`).

Pole můžeme též modifikovat. Nejjednodušeji lze modifikovat určitý prvek
pole tak, že jej indexujeme a do takto indexovaného prvku přiřadíme
požadovanou hodnotu. Stávající hodnota se v poli přepíše hodnotou novou.

```c
char str[] str = "Ahoj";
printf( "%s\n", str );  // Ahoj
str[ 1 ] = 'A'
printf( "%s\n", str );  // AAoj
```
