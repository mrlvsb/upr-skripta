# Ternární operátor

> 🤓 Tato sekce obsahuje doplňující učivo. Pokud je toho na vás moc, můžete ji prozatím přeskočit
> a vrátit se k ní později.

Občas chcete použít jeden ze dvou výrazů v závislosti na hodnotě nějaké podmínky. Například pokud byste
chtěli přiřadit minimum ze dvou hodnot do proměnné:
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
Toto lze provést zkráceně pomocí výrazu **ternárního operátoru** (*ternary operator*). Tento výraz
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
