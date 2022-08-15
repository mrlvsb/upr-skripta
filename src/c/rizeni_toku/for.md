# Cyklus `for`
V programech velmi často potřebujeme vykonat nějaký blok kódu přesně `n`-krát:
- Projdi `n` řádků ze vstupního souboru a sečti jejich hodnoty.
- Pošli zprávu všem `n` účastníkům chatu.
- Vystřel přesně třikrát ze zbraně.

I když pomocí cyklu `while` můžeme vyjádřit provedení `n` iterací, je to relativně zdlouhavé,
protože je k tomu potřeba alespoň tří řádků kódu:
- Inicializace cyklu: vytvoření řídící proměnné, která se bude kontrolovat v cyklu
- Kontrola výrazu: kontrola, jestli už proměnná dosáhla požadované hodnoty
- Operace na konci cyklu: změna hodnoty řídící proměnné
```c
int i = 0; // inicializace
while (i < 10) { // kontrola výrazu
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

<hr/>

**Cvičení** 🏋

- Napište program, který pomocí cyklu `for` na výstup vypíše čísla od 0 do 9 (včetně).
- Vypište na výstup řádek `Licha iterace` v každé liché iteraci cyklu a řádek `Suda iterace` v každé
sudé iteraci tohoto cyklu.

<hr/>
