# Rekurze

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Pokud funkce obsahuje volání sama sebe, tak tuto situaci nazýváme **rekurzí** (*recursion*).
Pro řešení některých problémů může být přirozené rozdělovat je na čím dál tím menší podproblémy,
dokud se nedostaneme k podproblému, který je dostatečně jednoduchý, abychom ho vyřešili rovnou.
Toto můžeme modelovat právě rekurzí, kdy voláme stejnou funkci s různými argumenty, dokud se
nedostaneme k hodnotám, pro které umíme problém vyřešit jednoduše, a v ten moment rekurzi ukončíme.

Jedním z jednoduchých problémů, na kterém můžeme rekurzi demonstrovat, je výpočet
[faktoriálu](https://cs.wikipedia.org/wiki/Faktori%C3%A1l). Faktoriál lze nadefinovat například takto:

\\(n! = n * (n - 1)!\\)

Vidíme, že tato samotná definice je "rekurzivní": pro výpočet faktoriálu `n` musíme znát hodnotu
faktoriálu `n - 1`. Výpočet faktoriálu můžeme provést například následující funkcí:
```c
int faktorial(int n) {
    if (n <= 1) return 1;
    return n * faktorial(n - 1);
}
```
Pokud je parametr `n` menší než `1`, umíme faktoriál vypočítat triviálně. Pokud ne, tak spočteme
faktoriál `n - 1` a vynásobíme ho hodnotou `n`. Je důležité si uvědomit, v jakém pořadí zde probíhá
výpočet. Například při volání `factorial(4)`:
1) Zavolá se `factorial(4)`.
2) `factorial(4)` zavolá `factorial(3)`.
3) `factorial(3)` zavolá `factorial(2)`.
4) `factorial(2)` zavolá `factorial(1)`.
5) `factorial(1)` vrátí `1`.
6) `factorial(2)` vrátí `2 * 1`.
7) `factorial(3)` vrátí `3 * 2 * 1`.
8) `factorial(4)` vrátí `4 * 3 * 2 * 1`.

Nejprve tak dojde k vypočtení `factorial(1)`, poté `factorial(2)` atd. Výpočet je tak v jistém
smyslu "otočen". Zkuste si výpočet faktoriálu [odkrokovat](../../prostredi/ladeni.md#krokování), abyste
si ujasnili, jak výpočet probíhá.

## Přetečení zásobníku
Je důležité dávat si pozor na to, abychom vždy ve funkci měli podmínku, která rekurzi ukončí.
Jinak by se funkce volala "donekonečna", dokud by nakonec nedošlo k
[přetečení zásobníku](../../caste_chyby/pametove_chyby.md#stack-overflow).
