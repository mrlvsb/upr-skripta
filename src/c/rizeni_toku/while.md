# Cyklus `while`
Nejjednodušším cyklem v *C* je cyklus `while` ("dokud"):
```c
while (<výraz typu bool>) {
    // blok cyklu
}
```
Funguje následovně:
1) Nejprve se vyhodnotí (Booleovský) výraz v závorce za `while`.
2) Pokud výraz není pravdivý, tak se provede bod 3.
Pokud je výraz pravdivý, tak se provede blok[^1] cyklu a dále se pokračuje bodem 1.
3) Program pokračuje za cyklem `while`.

[^1]: Blok cyklu se také často nazývá jako **tělo** (*body*) cyklu.

Jinak řečeno, dokud bude splněná podmínka za `while`, tak se bude opakovaně provádět tělo cyklu.
Vyzkoušejte si to na následujícím příkladu:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int pocet = 0;
    while (pocet < 5) {
        printf("Telo cyklu se provedlo\n");
        pocet = pocet + 1;
    }
    return 0;
}
```
Tento kód opět můžeme přečíst jako větu: `Dokud je hodnota proměnná menší než pět, prováděj tělo
cyklu`. Jedno vykonání těla cyklu se nazývá **iterace**. Cyklus v ukázce výše tedy provede pět iterací,
protože se tělo cyklu provede pětkrát.

Pokud výraz za `while` není splněn, když se `while` začne vykonávat, tak se tělo cyklu nemusí
provést ani jednou (tj. bude mít nula iterací).

Je důležité dávat si pozor na to, aby cyklus, který použijeme, nebyl nechtěně **nekonečný**
(*infinite loop*), jinak by náš program nikdy neskončil. Zkuste v kódu výše zakomentovat nebo odstranit
řádek `count = count + 1;` a zkuste program spustit. Jelikož se hodnota proměnné `count` nebude nijak
měnit, tak výraz `count < 5` bude stále pravdivý a cyklus se tak bude provádět neustále dokola.
Této situaci se lidově říká "zacyklení"[^2]. Po spuštění nekonečného cyklu v prohlížeči radši
restartujte tuto stránku :)

[^2]: Pokud program spouštíte v terminálu a zacyklí se, můžete ho přerušit pomocí klávesové zkratky `Ctrl + C`.

### Řídící proměnná
Často chceme provést v těle cyklu jinou operaci v závislosti na tom, která iterace se zrovna vykonává.
K tomu obvykle slouží tzv. **řídící proměnná** (*index variable*), která udává, v jaké iteraci cyklu
se nacházíme, a podle ní se poté provede odpovídající operace. Například pokud bychom chtěli vypsat
na výstup řadu čísel `0` až `4`, tak to můžeme provést s `while` cyklem následovně:
```c,editable,mainbody
#include <stdio.h>

int main() {
    int i = 0;
    while (i < 5) {    
        printf("%d\n", i);
        i += 1;
    }
    return 0;
}
```
Řídící proměnná je zde `i` - tento název se pro řídící proměnné pro jednoduchost často používá.

### Řízení toku cyklu
V cyklech můžete využívat dva speciální příkazy, které fungují pouze v těle nějakého cyklu:
- Příkaz `continue;` způsobí, že se přestane vykonávat tělo cyklu, a program se vrátí
na začátek cyklu (tedy u `while` na vyhodnocení výrazu). `continue` lze chápat jako skok na další
iteraci cyklu. Zkuste uhodnout, co vypíše následující kód:
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int pocet = 0;
        while (pocet < 10) {
            pocet = pocet + 1;

            if (pocet < 5) continue;

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
            if (pocet * 2 > 12) break;
    
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
cyklus pomocí `while (true) { … }`, dále vytvořte tělo cyklu a až nakonec vymyslete podmínku,
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

Místo `while (true)` můžete použít také `while (1)`, protože `1` se při převodu na `bool` převede
na `true`.
</details>

### Vnořování cyklů
Stejně jako podmínky, i cykly jsou příkazy, a můžete je tak používat libovolně v blocích *C* kódu
a také je [vnořovat](podminky.md#vnořování-podmínek). Chování vnořených cyklů může být ze začátku
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
Tento kód můžeme číst jako `Dělej <tělo cyklu>, dokud platí <výraz>`.

Jediný rozdíl mezi `while` a `do while` je, že v cyklu `do while` se výraz, který určuje, jestli se má
provést další iterace cyklu, vyhodnocuje až na konci cyklu. Tělo cyklu tak bude pokaždé provedeno
alespoň jednou (i kdyby byl výraz od začátku nepravdivý).

Pokud pro to nemáte zvláštní důvod, asi není třeba tento typ cyklu používat.
