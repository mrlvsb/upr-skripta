# Paměťové chyby
V *C* lze s pamětí programu pracovat [manuálně](../c/prace_s_pameti/dynamicka_pamet.md), což velmi často vede
k různým paměťovým chybám, které můžou způsobit špatné chování či pád programu. Jsou také
nejčastějším zdrojem různých
[zranitelností](https://owasp.org/www-community/attacks/Buffer_overflow_attack), které umožňují
útočníkům převzít kontrolu nad programem nebo celým počítačem.

Pro částečnou prevenci paměťových chyb silně doporučujeme při vývoji *C* programů používat
nástroj [Address sanitizer](../prostredi/ladeni.md#address-sanitizer).

## Stack overflow
Pokud bychom vytvořili v zásobníkovém rámci moc proměnných, proměnné, které jsou
[moc velké](../c/pole/pole.md), anebo bychom měli v jednu chvíli aktivních moc zásobníkových rámců
(například při moc hluboké [rekurzi](../c/funkce/rekurze.md)), tak může dojít paměť určená pro zásobník.
Tato situce se nazývá **přetečení zásobníku** (*stack overflow*):
```c
int funkce(int x) {
    return funkce(x + 1);
}
int main() {
    funkce(0);
    return 0;
}
```

## Segmentation fault
Tato chyba je způsobena pokusem o zapsání nebo čtení neplatné adresy v paměti. K této chybě často
dochází zejména při těchto situacích:
- Zapísujeme nebo čteme z paměti pole mimo jeho rozsah (tj. "před" nebo "za" pamětí pole).
Tato situace se nazývá [*buffer overflow*](https://owasp.org/www-community/vulnerabilities/Buffer_Overflow).
Tato chyba už způsobila nespočet bezpečnostních chyb v různých softwarech.
    ```c
    #include <stdlib.h>

    int main() {
        int* p = (int*) malloc(sizeof(int));
        p[1] = 5;
        return 0;
    }
    ```
- Pokoušíme se přečíst hodnotu na adrese 0 (`NULL`), která je používána pro inicializaci
ukazatelů. Tato situace se nazývá
[*null pointer dereference*](https://owasp.org/www-community/vulnerabilities/Null_Dereference).
    ```c
    int main() {
        int* p = (void*) 0;
        int a = *p;
    
        return 0;
    }
    ```
- Snažíme se přistoupit k paměti, která již byla [uvolněna](../c/prace_s_pameti/dynamicka_pamet.md#uvolnění-paměti).
Tato situace se nazývá
[*use-after-free*](https://owasp.org/www-community/vulnerabilities/Using_freed_memory).
    ```c
    #include <stdlib.h>

    int main() {
        int* p = (int*) malloc(sizeof(int));
        free(p);

        *p = 1;
        return 0;
    }
    ```
    Přístup k již uvolněné paměti může nastat i bez použití
    [dynamické paměti](../c/prace_s_pameti/dynamicka_pamet.md). Například tento kód není správně:
    ```c
    #include <stdlib.h>

    int* vrat_ukazatel(int x) {
        int y = x + 1;
        return &y;
    }

    int main() {
        int* p = vrat_ukazatel(1);
        *p = 1;
        return 0;
    }
    ```
    Jakmile totiž vykonávání funkce `vrat_ukazatel` skončí, tak se
    [uvolní](../c/prace_s_pameti/automaticka_pamet.md) paměť jejich lokálních proměnných. Adresa
    uložená v `p` tak obsahuje nevalidní paměť a je chybou k ní přistupovat (ať už číst, tak
    zapisovat).

- Snažíme se uvolnit pamět, která již byla uvolněna. Tato situace se nazývá
[*double free*](https://owasp.org/www-community/vulnerabilities/Doubly_freeing_memory).
    ```c
    #include <stdlib.h>

    int main() {
        int* p = (int*) malloc(sizeof(int));
        free(p);
        free(p);
        return 0;
    }
    ```

## Memory leak
Pokud (opakovaně) alokujeme [dynamickou paměť](../c/prace_s_pameti/dynamicka_pamet.md) a neuvolňujeme ji, tak
dochází k tzv. [*memory leaku*](https://owasp.org/www-community/vulnerabilities/Memory_leak)
(úniku paměti). Pokud paměť programu stále roste a není nijak uvolňována, tak postupem času počítači
nutně dojde paměť a program tak bude násilně ukončen.
```c
void leak() {
    // adresa alokované paměti je zahozena, nelze ji tedy uvolnit
    malloc(sizeof(int));
}
```
Tato chyba je celkem zákeřná, protože pokud paměť roste pomalu, tak může trvat dost dlouho, než se
projeví. K nalezení chyby doporučujeme použít Address sanitizer, který na konci programu zkontroluje,
jestli všechny dynamicky naalokované bloky byly korektně uvolněny.

> Nemusíte se však bát, že by neuvolněná paměť ve vašem programu nějak narušovala chod operačního
> systému. I když paměť manuálně neuvolníte, tak moderní operační systémy veškerou paměť vašeho
> spuštěného programu uvolní, jakmile program skončí. Dokud však program běží, tak bude neuvolněná
> paměť zabírat místo, což může způsobovat problémy.

