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
Tento příkaz vyhodnotí výraz v závorce za klíčovým slovem `switch`. Pokud se v bloku kódu za závorkou
nachází klíčové slovo `case` následované hodnotou odpovídající hodnotě výrazu, tak program začne vykonávat
blok kódu, který následuje za tímto `case`. Dále se program bude vykonávat sekvenčně až do bloku `switch`e
(při tomto vykonávání už se klíčová slovo `case` i hodnoty za ním ignorují)[^1].

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
Do bloku kódu příkazu `switch` lze předat i blok pojmenovaný `default`, na který program skočí v
případě, že se nenalezne žádný `case` s odpovídající hodnotou:
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
Velmi často chceme provést pouze jeden blok kódu u jednoho `case` a nepokračovat po něm až do konce
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

## Hodnota za `case`
Hodnota za klíčovým slovem `case` musí být konstantní, jinak řečeno musí to být hodnota známá již v
době překladu programu, např. [literál](../prikazy_vyrazy.md#výrazy). Za `case` tak nelze dát např.
výraz obsahující název proměnné.

## Použití příkazu `switch`
Výraz v závorce za `switch` vestavěný datový typ, v podstatě se zde dá použít pouze celé číslo.
Nelze jej použít např. na porovnávání [struktur](../struktury/struktury.md) či [řetězců](../text/retezce.md).
Jeho chování také může být matoucí, pokud se za jednotlivými `case` konstrukcemi nepoužije příkaz
`break`. Proto tak doporučujeme ze začátku používat pro podmíněné vykonávání spíše příkaz [`if`](if.md).
