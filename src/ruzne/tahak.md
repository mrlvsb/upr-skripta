# Tahák
Tato stránka obsahuje zkomprimované informace o všech důležitých syntaktických konstrukcích jazyka *C*, které budeme
v UPR používat. Zejména ze začátku může být užitečná pro to, abyste si mohli rychle připomenout, jak v *C* zapsat nějaký
konkrétní příkaz. Podobné taháky můžete naleznout také třeba [zde](https://quickref.me/c.html) nebo
[zde](https://cheatography.com/ashlyn-black/cheat-sheets/c-reference/).

### Základní program ([učivo](../c/prikazy_vyrazy.md#výpis-výrazů))
```c
#include <stdio.h>

int main() {
  // Radkovy komentar
  /*
   * Blokovy komentar
   */
  printf("Hello world\n");
  return 0;
}
```

### Překlad a spuštění programu ([učivo](../prostredi/preklad_programu.md#překlad-prvního-programu))
```bash
$ gcc main.c -g -fsanitize=address -o main
$ ./main
```

### Základní výpis ([učivo](../c/prikazy_vyrazy.md#výpis-výrazů))
- Textu
  ```c
  printf("Ahoj UPR\n");
  ```
- Číselného výrazu
  ```c
  printf("Cislo: %d\n", <výraz>);
  printf("Cislo: %d\n", 1 + 2);
  ```

### Proměnné ([učivo](../c/promenne/promenne.md))
- Vytvoření: `<datový typ> <název> = <úvodní výraz>;`
  ```c
  int vek = 18;
  ```
  - Užitečné datové typy:
    - `int`: celé číslo se znaménkem
    - `float`, `double`: desetinné číslo
    - `char`: znak
- Čtení: `<název proměnné>`
  ```c
  printf("%d\n", vek);
  int x = vek + 1;
  ```
- Zápis: `<název proměnné> = výraz;`
  ```c
  vek = 42;
  ```

### Výrazy ([učivo](../c/datove_typy/celociselne_typy.md#tabulka-aritmetických-operátorů))
- Sčítání: `a + b`
- Odčítání: `a - b`
- Násobení: `a * b`
- Dělení: `a / b`
- Zbytek po dělení: `a % b`
- Rovná se: `a == b`
- Menší než: `a < b`
- Menší nebo rovno než: `a <= b`
- Větší než: `a > b`
- Větší  nebo rovno než: `a >= b`
- A zároveň: `a && b`
- Nebo: `a || b`


### Podmínky ([cislo](../c/rizeni_toku/podminky.md))
- [If](../c/rizeni_toku/if.md)
```c
if (<vyraz 1>) {
  // Provede se, pokud je <vyraz 1> pravdivý
} else if (<vyraz 2) {
  // Provede se, pokud <vyraz 1> není pravdivý, a <vyraz 2> je pravdivý
} else {
  // Provede se, pokud <vyraz 1> není pravdivý, a <vyraz 2> také není pravdivé
}
```

```c,editable,mainbody
#include <stdio.h>

int main() {
  int a = 10;
  if (a > 5) {
    printf("a je vetsi nez 5\n");
  } else {
    printf("a je mensi nebo rovno 5\n");
  }
  return 0;
}
```

### Cykly ([učivo](../c/rizeni_toku/cykly.md))
- [While](../c/rizeni_toku/while.md)
  ```c
  // <vyraz> -> <telo> -v
  //    ^               |
  //    -----------------
  // Dokud je <vyraz> pravdivý
  while (<vyraz>) {
    <telo>
  }
  ```

  ```c,editable,mainbody
  #include <stdio.h>
  
  int main() {
    int a = 10;
    while (a > 0) {
      printf("a=%d\n", a);
      a = a - 1;
    }
    return 0;
  }
  ```
- [For](../c/rizeni_toku/for.md)
  ```c
  // <prikaz> -> <vyraz 1> -> <telo> -> <vyraz 2> -v
  //                ^                              |
  //                -------------------------------<
  // Dokud je <vyraz 1> pravdivý
  for (<prikaz>; <vyraz 1>; <vyraz 2>) {
    <telo>
  }
  ```

  ```c,editable,mainbody
  #include <stdio.h>
  
  int main() {
    for (int i = 0; i < 10; i++) {
      printf("i = %d, i * 2 = %d\n", i, i * 2);
    }
    return 0;
  }
  ```

### Funkce ([učivo](../c/funkce/funkce.md))
- Deklarace
  ```c
  <datový typ> <název funkce>(
    <dat. typ par. 1> <název par. 1>,
    <dat. typ par. 2> <název par. 2>, …
  ) {
    // tělo
  }
  ```
- Funkce, která nic nevrací
  ```c
  void vypis_text() {
    printf("Ahoj\n");
  }
  ```
- Funkce, která vrací hodnotu
  ```c
  int secti(int a, int b) {
    return a + b;
  }
  ```
- Volání funkce
  ```c
  int main() {
    int c = secti(1, 2);
    return 0;
  }
  ```

### Ukazatele ([učivo](../c/prace_s_pameti/ukazatele.md))
- Vytvoření ukazatele
  ```c
  int* p = NULL;
  ```
- Získání adresy proměnné
  ```c
  int a = 5;
  int* p = &a;
  ```
- Dereference ukazatele
  ```c
  int a = 5;
  int* p = &a;
  printf("%d\n", *p);
  ```

### Pole ([učivo](../c/pole/staticka_pole.md))
- Vytvoření pole na zásobníku
  ```c
  int arr[10] = {};
  ```
- Inicializace prvků pole
  ```c
  int arr[5] = {1, 2, 3, 4, 5};
  ```
- Čtení z pole
  ```c
  int arr[5] = {1, 2, 3, 4, 5};
  int druhy_prvek = arr[1];
  ```
- Zápis do pole
  ```c
  int arr[5] = {1, 2, 3, 4, 5};
  arr[1] = 1;
  ```

### Dynamická paměť ([učivo](../c/prace_s_pameti/dynamicka_pamet.md))
- Alokace proměnné na haldě
  ```c
  int* mem = (int*) malloc(sizeof(int));
  ```
- Alokace pole na haldě
  ```c
  int* mem = (int*) malloc(sizeof(int) * 10);
  ```
- Uvolnění dynamické paměti
  ```c
  free(mem);  
  ```

### Řetězce ([učivo](../c/text/retezce.md))
- Vytvoření řetězce pro čtení (nelze modifikovat)
  ```c
  const char* text = "Hello UPR";
  ```
- Vytvoření řetězce na zásobníku (lze modifikovat)
  ```c
  char text[] = "Hello UPR";
  ```
- Vypsání řetězce
  ```c
  printf("%s\n", text);
  ```
- Přístup k znaku řetězce
  ```c
  char c = text[1];
  ```
- Zjištění délky řetězce
  ```c
  #include <string.h>
  …
  const char* text = "Hello UPR";
  int delka = strlen(text);
  ```
- Porovnání dvou řetězců
  ```c
  #include <string.h>
  …
  const char* text1 = "Hello UPR";
  const char* text2 = "Hello";
  if (strcmp(text1, text2) == 0) {
    // Řetězce jsou stejné
  }
  ```
- Převod textu na číslo
  ```c
  #include <stdlib.h>
  …
  const char* text = "123";
  int cislo = strtol(text, NULL, 10);
  ```

### Vstup ([učivo](../c/text/vstup.md))
- Načtení řádku
  ```c
  char buf[80];
  fgets(buf, sizeof(buf), stdin);
  ```
- Načtení formátovaného vstupu
  ```c
  int a;
  scanf("%d", &a);
  ```

### Struktury ([učivo](../c/struktury/struktury.md))
- Deklarace struktury
  ```c
  struct <název struktury> {
    <datový typ prvního členu> <název prvního členu>;
    <datový typ druhého členu> <název druhého členu>;
    <datový typ třetího členu> <název třetího členu>;
    …
  };
  ```

  ```c
  typedef struct {
    const char* login;
    int age;
  } Student;
  ```
- Inicializace proměnné typu struktury
  ```c
  Student s = { .login = "BER0134", age = 29 };
  ```
- Čtení atributu
  ```c
  int age = s.age;
  ```
- Zápis atributu
  ```c
  s.age = s.age + 1;
  ```
- Přístup k atributu přes ukazatel
  ```c
  Student* p = &s;
  p->age = p->age + 1;
  ```

### Soubory ([učivo](../c/soubory/soubory.md))
- Otevření souboru pro čtení
  ```c
  FILE* file = fopen("file.txt", "r"); // Textový mód
  FILE* file2 = fopen("file.txt", "rb"); // Binární mód
  ```
- Otevření souboru pro zápis
  ```c
  FILE* file = fopen("file.txt", "w"); // Textový mód
  FILE* file2 = fopen("file.txt", "wb"); // Binární mód
  ```
- Zavření souboru
  ```c
  fclose(file);
  ```
- Textový zápis do souboru (vyžaduje textový mód)
  ```c
  fprintf(file, "%d", 1);
  ```
- Textové čtení ze souboru (vyžaduje textový mód)
  ```c
  char row[80];
  fgets(row, sizeof(radek), file);
  ```
- Zjištění, jestli předchozí pokus o čtení vyústil v konec souboru
  ```c
  if (feof(file)) { … }
  ```
- Binární zápis do souboru (vyžaduje binární mód)
  ```c
  int arr[5] = { 1, 2, 3, 4, 5 };
  fwrite(arr, sizeof(int), 5, file);
  ```
- Binární čtení ze souboru (vyžaduje binární mód)
  ```c
  int arr[5] = { 1, 2, 3, 4, 5 };
  fread(arr, sizeof(int), 5, file);
  ```

### Modularizace ([učivo](../c/modularizace/modularizace.md))
- Hlavičkový soubor `functions.h`
  ```c
  #pragma once

  int secti(int a, int b);
  ```
- Zdrojový soubor `functions.c`
  ```c
  #include "functions.h"
  
  int secti(int a, int b) {
    return a + b;
  }
  ```
- Zdrojový soubor `main.c`
  ```c
  #include <stdio.h>
  #include "functions.h"

  int main() {
    printf("%d\n", secti(1, 2));
    return 0;
  }
  ```
- Překlad
  ```bash
  $ gcc -c functions.c
  $ gcc -c main.c
  $ gcc functions.o main.o -o main
  ```
