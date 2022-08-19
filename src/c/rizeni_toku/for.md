# Cyklus `for`
V programech velmi často potřebujeme vykonat nějaký blok kódu přesně `n`-krát:
- Projdi `n` řádků ze vstupního souboru a sečti jejich hodnoty.
- Pošli zprávu všem `n` účastníkům chatu.
- Vystřel přesně třikrát ze zbraně.

I když pomocí cyklu `while` můžeme vyjádřit provedení `n` iterací, je to relativně zdlouhavé,
protože je k tomu potřeba alespoň tří řádků kódu:
- Inicializace cyklu: vytvoření řídící proměnné, která se bude kontrolovat v cyklu
- Kontrola výrazu: kontrola, jestli už řídící proměnná dosáhla požadované hodnoty
- Operace na konci cyklu: změna hodnoty řídící proměnné
```c
int i = 0; // inicializace řídící proměnné
while (i < 10) { // kontrola hodnoty řídící proměnné
    // tělo cyklu
    i += 1; // změna hodnoty řídící proměnné
}
```

Cyklus `for` existuje, aby tuto častou situaci zjednodušil. Kód výše by se dal pomocí cyklu `for`
přepsat takto:
```c
for (int i = 0; i < 10; i += 1) {
    // tělo cyklu
}
```

Jak lze vidět, `for` cyklus v sobě kombinuje inicializaci cyklu, kontrolu výrazu a provedení příkazu
po každé iteraci. Obecná syntaxe tohoto cyklu vypadá takto:
```c
for (<příkaz A>; <výraz typu bool>; <příkaz B>) {
    // tělo cyklu
}
```
Takovýto cyklus se vykoná následovně:
1) Jakmile se cyklus začne vykonávat, nejprve se provede příkaz `A`. Zde se typicky vytvoří
řídící proměnná s nějakou počáteční hodnotou.
2) Zkontroluje se výraz. Pokud není pravdivý, cyklus končí a program pokračuje za cyklem `for`.
Pokud je pravdivý, provede se tělo cyklu a program pokračuje bodem 3.
3) Provede se příkaz `B` a program pokračuje bodem 2.

> Výraz v příkazu `for` může chybět, v takovém případě se pokládá automaticky za `true`. Zároveň platí,
> že středníkem (`;`) lze vyjádřit tzv. *prázdný příkaz*, který nic neprovede. Všechny tři části cyklu
> `for` tak můžou chybět, v tom případě se pak jedná o [nekonečný cyklus](while.md#nekonečný-cyklus):
> ```c
> for (;;) {
>    ...
> }
> ```

<hr/>

**Cvičení** 🏋

- Napište program, který pomocí cyklu `for` na výstup vypíše čísla od 0 do 9 (včetně).
- Vypište na výstup řádek `Licha iterace` v každé liché iteraci cyklu a řádek `Suda iterace` v každé
sudé iteraci tohoto cyklu.

<hr/>

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 5;
        for (; a >= 0; a = a - 1) {
           printf("iterace %d\n", a);
        }
        printf("a = %d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```c
    iterace 5
    iterace 4
    iterace 3
    iterace 2
    iterace 1
    iterace 0
    a = -1
    ```
    Při poslední iteraci cyklu se hodnota proměnné `a` zmenší z `0` na `-1`, poté už se podmínka cyklu
    vyhodnotí na `false` a cyklus skončí.

    Všimněte si, že definice a inicializace řídící proměnné je mimo cyklus, jinak bychom k této proměnné
    po ukončení provádění cyklu již neměli přístup. Definice řídící proměnné před cyklem se nám může
    občas hodit, pokud bychom s hodnotou řídící proměnné chtěli pracovat dále za cyklem (například
    abychom zjistili, kolik iterací cyklus provedl).
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        for (int a = 0; a <= 5; a = a + 1) {
           printf("iterace %d\n", a);
           if (a <= 2) {
             a = a + 1;
           }
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```c
    iterace 0
    iterace 2
    iterace 4
    iterace 5
    ```
    Pokud je při provádění iterace cyklu hodnota `a` menší nebo rovno dvoum, tak se hodnota `a` v
    iteraci zvýší o jedničku dvakrát (jednou uvnitř příkazu `if` a jednou na konci iterace cyklu `for`).
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        for (int a = 0; a = 5; a = a + 1) {
           printf("iterace %d\n", a);
        }

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program program bude neustále vypisovat hodnotu proměnné `a`, protože výraz `a = 5` se vyhodnotí
    jako `5`, a toto číslo se při [převodu](../datove_typy/pravdivostni_typy.md#konverze) na `bool`
    vyhodnotí jako pravda (`true`), takže tento cyklus je nekonečný. Záměna přiřazení (`=`)
    a `==` (porovnání) je častou [začátečnickou chybou](../../caste_chyby/caste_chyby.md#záměna--a-).
    </details>
