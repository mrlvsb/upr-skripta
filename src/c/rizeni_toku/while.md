# Cyklus `while`
Nejjednodušším cyklem v *C* je cyklus `while` ("dokud"):
```c
while (<výraz typu bool>) {
    // blok cyklu
}
```
Funguje následovně:
1) Nejprve se vyhodnotí (Booleovský) výraz v závorce za `while` a provede se bod 2.
2) Pokud:
    - Je výraz pravdivý, tak se provede blok[^1] cyklu a dále se pokračuje opět bodem 1.
    - Není výraz pravdivý, tak se provede bod 3.
3) Program pokračuje za cyklem `while`.

[^1]: [Blok](../promenne/promenne.md#platnost) cyklu se také často nazývá jako **tělo** (*body*) cyklu.

Jinak řečeno, dokud bude splněná podmínka za `while`, tak se budou opakovaně provádět příkazy uvnitř
těla cyklu. Vyzkoušejte si to na následujícím příkladu:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pocet = 0;
    while (pocet < 5) {
        printf("Telo cyklu se provedlo, hodnota promenne pocet=%d\n", pocet);
        pocet = pocet + 1;
    }
    return 0;
}
```
Tento kód opět můžeme přečíst jako větu: `Dokud je hodnota proměnné pocet menší než pět, prováděj tělo
cyklu`. Jedno vykonání těla cyklu se nazývá **iterace**. Cyklus v ukázce výše tedy provede pět iterací,
protože se tělo cyklu provede pětkrát.

Pokud výraz za `while` není vyhodnocen jako pravdivý v momentě, kdy se `while` začne vykonávat, tak
se tělo cyklu nemusí provést ani jednou (tj. bude mít nula iterací).

### Nekonečný cyklus
Je důležité dávat si pozor na to, aby cyklus, který použijeme, nebyl nechtěně **nekonečný**
(*infinite loop*), jinak by náš program nikdy neskončil. Zkuste v kódu výše zakomentovat nebo odstranit
řádek `pocet = pocet + 1;` a zkuste program spustit. Jelikož se hodnota proměnné `pocet` nebude nijak
měnit, tak výraz `pocet < 5` bude stále pravdivý a cyklus se tak bude provádět neustále dokola.
Této situaci se lidově říká "zacyklení"[^2].

> Pokud se vám někdy stalo, že se program, který jste zrovna používali, "zaseknul" a přestal reagovat
> na váš vstup, mohlo to být právě například tím, že v něm nechtěně došlo k provedení nekonečného
> cyklu (došlo k zacyklení).

[^2]: Pokud program spouštíte v terminálu a zacyklí se, můžete ho přerušit pomocí klávesové zkratky `Ctrl + C`.
Pokud jej spustíte v prohlížeči, tak poté radši restartujte tuto stránku pomocí `F5` :)

### Řídící proměnná
Provést úplně identický kód opakovaně se někdy hodí, ale většinou chceme provést v těle cyklu trochu
jiné příkazy, v závislosti na tom, která iterace se zrovna vykonává.
K tomu můžeme použít proměnnou, která si budeme pamatovat, v jaké iteraci cyklu
se nacházíme, a podle ní se poté provede odpovídající operace. Takováto proměnná se obvykle označuje
jako **řídící proměnná** (*index variable*).

Například pokud chceme něco provést pouze v první iteraci cyklu, můžeme použít
příkaz [if](if.md) s podmínkou, ve které zkontrolujeme aktuální hodnotu řídící proměnné:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int i = 0;
    while (i < 5) {
        if (i == 0) {
            printf("Prvni iterace\n");
        }
        printf("Hodnota i=%d\n", i);
        i += 1;
    }
    return 0;
}
```
Řídící proměnná je zde `i` - tento název se pro řídící proměnné pro jednoduchost často používá.

<hr/>

**Cvičení** 🏋

Upravte kód výše tak, aby program vypsal `Posledni iterace` při provádění poslední
iterace cyklu. Zkuste poté kód upravit tak, aby fungoval pro libovolný počet iterací (tj.
ať už bude počet iterací libovolný, kód v těle i podmínce samotného cyklu musí zůstat stejný).

<hr/>

### Řízení toku cyklu
V cyklech můžete využít dva speciální příkazy, které fungují pouze uvnitř těla (bloku kódu) nějakého
cyklu:
- Příkaz `continue;` způsobí, že se přestane vykonávat tělo cyklu, a program bude pokračovat ve
vykonávání na začátku cyklu (tedy u `while` na vyhodnocení výrazu). `continue` lze chápat jako skok
na další iteraci cyklu. Zkuste uhodnout, co vypíše následující kód:
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int pocet = 0;
        while (pocet < 10) {
            pocet = pocet + 1;

            if (pocet < 5) {
                continue;
            }

            printf("Hodnota: %d\n", pocet); 
        }
    
        return 0;
    }
    ```
- Příkaz `break;` způsobí, že se cyklus přestane vykonávat a program začne vykonávat kód, který
následuje za cyklem. Cyklus se tak zcela přeruší. Zkuste uhodnout, co vypíše následující kód:
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int pocet = 0;
        while (pocet < 10) {
            if (pocet * 2 > 12) {
                break;
            }

            printf("Hodnota: %d\n", pocet);
            pocet = pocet + 1;
        }
    
        return 0;
    }
    ```

<details>
<summary>Tip pro návrh cyklů while</summary>

Příkaz `break` lze také někdy použít k usnadnění návrhu cyklů. Pokud potřebujete napsat `while` cyklus
s nějakou složitou podmínkou ukončení, ze které se vám motá hlava, zkuste nejprve vytvořit "nekonečný"
cyklus pomocí `while (1) { … }`, dále vytvořte tělo cyklu a až nakonec vymyslete podmínku,
která cyklus ukončí pomocí příkazu `break`:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pocet = 0;
    int pocet2 = 1;
    while (1) {
        printf("Hodnota: %d\n", pocet);
        pocet = pocet + 1;
        pocet2 += pocet * 2;

        if (pocet > 10) break;
        if (pocet2 > 64) break;
    }

    return 0;
}
```
Nemusíte tak hned ze začátku vymýšlet výraz pro `while`, na čemž byste se mohli zaseknout. 

Místo `while (1)` můžete použít také `while (true)`. Nezapomeňte ale na
[vložení řádku](../datove_typy/pravdivostni_typy.md)
```c
#include <stdbool.h>
```
na začátek programu!
</details>

### Vnořování cyklů
Stejně jako podmínky, i cykly jsou příkazy, a můžete je tak používat libovolně v blocích *C* kódu
a také je [vnořovat](if.md#vnořování-podmínek). Chování vnořených cyklů může být ze začátku
trochu neintuitivní, proto je dobré si je procvičit. Zkuste si pomocí
[debuggeru](../../prostredi/ladeni.md#krokování) krokovat následující kód, abyste pochopili, jak se
provádí, a zkuste odhadnout, jakých hodnot budou postupně nabývat proměnné `i` a `j`. Poté odkomentujte
výpisy `printf` a ověřte, jestli byl váš odhad správný:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int i = 0;
    while (i < 3) {
        // printf("i: %d\n", i);
        int j = 0;
        while (j < 4) {
            // printf("  j: %d\n", j);
            j = j + 1;
        }

        i = i + 1;
    }
    printf("Konec programu\n");

    return 0;
}
```

Pro každou iteraci "vnějšího" `while` cyklu se provedou čtyři iterace "vnitřního" `while` cyklu.
Dohromady se tak provede celkem `3 * 4` iterací.

### Cyklus `do while`
Cyklus `while` má také alternativu zvanou `do while`. Tento cyklus má následující syntaxi:
```c
do {
    // tělo cyklu
}
while (<výraz typu bool>);
```
Tento kód můžeme číst jako `Prováděj <tělo cyklu>, dokud platí <výraz>`.

Jediný rozdíl mezi `while` a `do while` je ten, že v cyklu `do while` se výraz, který určuje, jestli
se má provést další iterace cyklu, vyhodnocuje až na konci cyklu. Tělo cyklu tak bude pokaždé provedeno
alespoň jednou (i kdyby byl výraz od začátku nepravdivý).

Pokud pro to nemáte zvláštní důvod, asi není třeba tento typ cyklu používat.

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>
    #include <stdbool.h>

    int main() {
        int a = 0;
        int b = 8;

        while (true) {
          if (a > 2) {
            printf("Hodnota a = %d\n", a);
          }

          a = a + 2;

          if (a >= b) {
            break;
          }
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    Hodnota a = 4
    Hodnota a = 6
    ```
    V každé iteraci cyklu se hodnota proměnné `a` zvýší o dvojku. Pokud je na začátku iterace hodnota
    `a` větší, než dva, tak se vypíše její hodnota. V čtvrté iteraci cyklu se hodnota proměnné `a`
    zvýší na osm. Poté se podmínka příkazu `if` vyhodnotí jako `true`, takže se provede příkaz
    `break`, který provádění cyklu ukončí. Hodnota proměnné `a` se tak vypíše pouze dvakrát.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>
    #include <stdbool.h>

    int main() {
        int a = 0;
        int b = 8;

        while (true) {
          if (a > 2) {
            printf("Hodnota a = %d\n", a);
          }

          if (a >= b) {
            break;
          }
          a = a + 2;
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    Hodnota a = 4
    Hodnota a = 6
    Hodnota a = 8
    ```
    V každé iteraci cyklu se hodnota proměnné `a` zvýší o dvojku. Pokud je na začátku iterace hodnota
    `a` větší, než dva, tak se vypíše její hodnota. V páté iteraci cyklu je hodnota proměnné `a`
    osm, takže se cyklus ukončí příkazem `break`. Všimněte si rozdílu pořadí příkazu `if` a zvýšení
    hodnoty proměnné `a` v tomto a předchozím příkladu.
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 0;
        int b = 6;

        while (a > b) {
          printf("Hodnota b = %d\n", b);
          b = b + 1;
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program nevypíše nic, protože podmínka `a > b` se vyhodnotí jako `false`. Tělo cyklu se tak
    neprovede ani jednou.
    </details>
