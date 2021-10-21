# Vyhodnocování výrazů
Abyste pochopili, co se děje, když váš program běží, a uměli ho odladit, tak je důležité, abyste si
uměli myšlenkově "odsimulovat", co přesně procesor provádí, když vykonává příkazy vašeho programu.
Asi nejlepším nástrojem pro tento účel je použití [debuggeru](../prostredi/ladeni.md#krokování),
pomocí kterého můžete provádět váš program příkaz po příkazu a sledovat, jak se během toho měni
jeho výstup a hodnoty v paměti.

Důležité je zejména vědět, jak fungují příkazy [řízení toku](../c/rizeni_toku/rizeni_toku.md) a
jak funguje vyhodnocování [výrazů](../c/prikazy_vyrazy.md). Níže naleznete několik příkladů, které
slouží k demonstraci toho, jak se postupně vyhodnocují výrazy v jazyce *C*.[^1]

[^1]: Procesor ve skutečnosti s největší pravděpodobností nebude výrazy vyhodnocovat přesně tak,
jak je zde ukázáno, ale mnohem efektivněji. Výsledek by však měl být stejný, proto se vyplatí umět
vyhodnocovat výrazy "v hlavě", abychom si ověřili, že program dělá to, co očekáváme.

- Aritmetické [operace](../c/datove_typy/celociselne_typy.md) a čtení [proměnných](../c/promenne/promenne.md)
    ```c
    int a = 5;
    int b = 8;
    int c = 6;

    // Níže je rozepsané vyhodnocení výrazu `c = (a + b) * c + 1 - b`
    c = (a + b) * c + 1 - b;

    // c = (a + b) * c + 1 - b
    // c = (5 + b) * c + 1 - b
    // c = (5 + 8) * c + 1 - b
    // c = (13) * c + 1 - b
    // c = 13 * c + 1 - b
    // c = 13 * 6 + 1 - b
    // c = 78 + 1 - b
    // c = 79 - b
    // c = 79 - 8
    // c = 71

    // Hodnota proměnné c je nyní 71
    ```
- Volání [funkcí](../c/funkce/funkce.md)
    ```c
    int foo(int a, int b) {
        int c = a + b;
        return c * 2 + b;
    }
    int main() {
        int x = 8;
        int y = foo(x, 5 + 2);
        // y = foo(x, 5 + 2)
        // y = foo(8, 5 + 2)
        // y = foo(8, 7)
        // y = 37

        int z = foo(foo(x, x), foo(y, 1) + 8);
        // z = foo(foo(x, x), foo(y, 1) + 8)
        // z = foo(foo(8, x), foo(y, 1) + 8)
        // z = foo(foo(8, 8), foo(y, 1) + 8)
        // z = foo(40, foo(y, 1) + 8)
        // z = foo(40, foo(37, 1) + 8)
        // z = foo(40, 77 + 8)
        // z = foo(40, 85)
        // z = foo(40, 85)
        // z = 335

        return 0;
    }
    ```
