# Příkaz `switch`

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

V případě, že byste chtěli provést rozlišný kód v závislosti na hodnotě nějakého výrazu,
a tento výraz (např. hodnota proměnné) může nabývat většího množství různých hodnot, tak může být
zdlouhavé použít spoustu `if`ů:
```c
if (a == 0) {
    ...
}
else if (a == 1) {
    ...
}
else if (a == 2) {
    ...
}
...
```
Jako jistá zkratka může sloužit příkaz `switch`. Ten má následující syntaxi:
```c
switch (<výraz>) {
    case <hodnota A>: <blok kódu>
    case <hodnota B>: <blok kódu>
    case <hodnota C>: <blok kódu>
    ...
}
```
Tento příkaz vyhodnotí předaný výraz, a pokud se ve `switch`i nachází klíčové slovo `case` následované
hodnotou odpovídající hodnotě výrazu, tak program skočí na blok, který následuje za `case`. Dále se program
bude vykonávat sekvenčně až do konce `switch`e (při tomto vykonávání už se `case` ignoruje)[^1].

[^1]: Toto chování se anglicky označuje jako *fallthrough*.

Tento program vypíše `52`, protože předaný výraz má hodnotu `5`, takže program skočí na blok za
`case 5` a dále pokračuje sekvenčně až do konce bloku `switch` příkazu.
```c,editable,mainbody
#include <stdio.h>

int main() {
    switch (5) {
        case 0: printf("0");
        case 1: printf("1");
        case 5: printf("5");
        case 2: printf("2");
    }

    return 0;
}
```

## Klíčové slovo `default`
Do `switch`e lze předat i blok pojmenovaný `default`, na který program skočí v případě, že se
nenalezne žádný `case` s odpovídající hodnotou:
```c,editable,mainbody
#include <stdio.h>

int main() {
    switch (10) {
        case 0: printf("0");
        case 1: printf("1");
        case 5: printf("5");
        case 2: printf("2");
        default: printf("nenalezeno");
    }

    return 0;
}
```

## Klíčové slovo `break`
Velmi často chcete provést pouze jeden blok kódu u jednoho `case` a nepokračovat po něm až do konce
celého `switch` bloku. Běžně se tedy za každým `case` blokem používá příkaz `break`, který ukončí
provádějí celého `switch` příkazu:
```c,editable,mainbody
#include <stdio.h>

int main() {
    switch (1) {
        case 0: printf("0"); break;
        case 1: printf("1"); break;
        case 2: printf("2"); break;
        default: printf("nenalezeno");
    }

    return 0;
}
```

## Použití příkazu `switch`
Příkaz `switch` lze použít pouze s vestavěnými datovými typy, zejména s čísly. Nelze jej použít např.
na porovnávání [struktur](../struktury/struktury.md) či [řetězců](../text/retezce.md). Jeho chování
také může být ze začátku matoucí, pokud za jednotlivými `case` konstrukcemi nepoužijete příkaz `break`.
Proto tak doporučujeme ze začátku používat pro podmíněné vykonávání spíše příkaz [`if`](if.md).
