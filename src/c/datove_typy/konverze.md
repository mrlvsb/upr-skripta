# Explicitní konverze
Někdy potřebujete převést hodnoty mezi různými datovými typy. K tomu slouží **operátor přetypování**
(*cast operator*), který má syntaxi `(<datový typ>) <výraz>` a převede výraz na daný datový typ.
Například `(short) 1` převede výraz `1` z typu `int` na `short`. Je dobré si uvědomit, k čemu může
dojít při převodu mezi různými datovými typy:
- Pokud je cílový datový typ menší a převáděnou hodnotu v něm nelze reprezentovat, tak dojde k
oseknutí hodnoty. V důsledku způsobu reprezentace hodnot v počítači takováto operace odpovídá
zbytku po dělení:
    ```c
    unsigned short a = 256;
    (unsigned char) a // hodnota tohoto výrazu je 0 (256 % 256)
    ```
- Pokud převádíte znaménkový typ na bezznaménkový a hodnota převáděného výrazu je záporná, tak nedojde
k intuitivnímu použití absolutní hodnoty[^1]. V důsledku způsobu reprezentace hodnot v počítači takováto
operace odpovídá přičtení dané hodnoty k maximální možné hodnotě cílového typu:
    ```c
    signed char c = -50;
    (unsigned char) c // hodnota tohoto výrazu je 206 (256 - 50)
    ```

[^1]: K tomu můžete použít například funkci [abs](https://devdocs.io/c/numeric/math/abs).

## Převod z desetinné hodnoty na celočíselnou hodnotu
Často se hodí převádět mezi desetinnými a celočíselnými typy. Při převodu z desetinné hodnoty na celočíselnou dojde k
zaokrouhlení směrem k nule:

```c,editable,mainbody
#include <stdio.h>

int main() {
  float a = 5.8;
  float b = -7.2;

  printf("Kladne cislo zaokrouhlene: %d\n", (int) a);
  printf("Zaporne cislo zaokrouhlene: %d\n", (int) b);
  return 0;
}
```

Pokud se chcete dozvědět více o tom, proč konverze mezi typy fungují tak, jak fungují, tak se podívejte
na to, jak funguje [dvojkový doplněk](https://cs.wikipedia.org/wiki/Dvojkov%C3%BD_dopln%C4%9Bk).
