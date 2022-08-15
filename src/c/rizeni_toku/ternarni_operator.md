# Ternární operátor

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Občas se nám může hodit vytvořit výraz, který bude mít hodnotu jednoho ze dvou konkrétních výrazů,
v závislosti na hodnotě nějaké podmínky. Například pokud bychom chtěli přiřadit minimum ze dvou
hodnot do proměnné, tak to můžeme napsat takto:
```c
int a = 1;
int b = 5;

int c = 0;
if (a < b) {
    c = a;
} else {
    c = b;
}
```
Všimněte si, že do proměnné `c` ukládáme buď výraz `a` nebo výraz `b`, v závislosti na tom, jaká je
hodnota podmínky `a < b`.

Jelikož je tato situace relativně častá, a její vyřešení pomocí příkazu `if` je relativně zdlouhavé,
tak jazyk `C` obsahuje zkratku v podobě **ternárního operátoru** (*ternary operator*). Tento výraz
má následující syntaxi:
```c
<výraz X typu bool> ? <výraz A> : <výraz B>
```
Pokud je výraz `X` pravdivý, tak se ternární operátor vyhodnotí jako hodnota výrazu `A`, v opačném
případě se vyhodnotí jako hodnota výrazu `B`. Uhodnete, co vypíše následující program?
```c,editable,mainbody
#include <stdio.h>

int main() {
    int a = 1;
    int b = 5;
    int c = (a >= b) ? a - b : a + b;
    printf("%d\n", c);

    return 0;
}
```
