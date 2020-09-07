## Pole

Jedním z důležitých prvků jazyka C je práce s poli. Již jsme si v
předchozím odstavci ukázali, jak vytvořit dynamicky alokované pole pro
reprezentaci řetězce. Samozřejmě můžeme vytvořit podobné pole pro
reprezentaci intigerů, floatů, apod. Je také bez problému možné vytvořit
pole na stacku, které nemusíme dealokovat. Jeho platnost je však pouze v
rámci bloku, ve kterém je deklarováno, např. tedy funkce. Takové pole
také nelze z funkce vrátit pomocí klíčového slova `return`. Pojďme si nyní
ukázat, jak je možno s poli pracovat.

<upr-container>
  <upr-array array='["A", "h", "o", "j", "\\0"]' highlight='{"4": "muted"}'></upr-array>
  <upr-arrow src-anchor="north" dst=".index-4" dst-anchor="south" ctrl-distance="-15">
    ukončovací nula
  </upr-arrow>
</upr-container>

```c,editable,mainbody
#include <stdio.h>

int main() {
  char str[] = "Ahoj";
  printf( "%c %c %c %c\n", str[ 0 ], str[ 1 ], str[ 2 ], str[ 3 ] );
  // A h o j
}
```

Z uvedeného příkladu vyplývá, že k jednotlivým prvkům pole se přistupuje
přes operátor hranaté závorky (`[]`).

Pole můžeme též modifikovat. Nejjednodušeji lze modifikovat určitý prvek
pole tak, že jej indexujeme a do takto indexovaného prvku přiřadíme
požadovanou hodnotu. Stávající hodnota se v poli přepíše hodnotou novou.

```c,editable,mainbody
#include <stdio.h>

int main() {
  char str[] = "Ahoj";
  printf( "%s\n", str );  // Ahoj
  str[ 1 ] = 'A';
  printf( "%s\n", str );  // AAoj
}
```

## Příklady
### Suma pole
<upr-array-sum array="[1, 2, 3, 4, 5]"></upr-array-sum>

### Minimální hodnota v poli
<upr-array-min array="[5, 6, 3, 4, 1]"></upr-array-min>

### Převrácení pole
<upr-array-reverse array="[1, 2, 3, 4, 5]"></upr-array-reverse>
