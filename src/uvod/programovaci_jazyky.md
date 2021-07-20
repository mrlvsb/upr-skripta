# Programovací jazyky
Z pohledu počítače je program sekvence příkazů (nazývaných **instrukce**), které může počítač
vykonat k vyřešení nějakého problému. Abychom mohli počítači říct, co má vykonávat, potřebujeme mu
příkazy zadat ve formě, které bude rozumět. Ač se to možná nezdá, tak počítače umí vykonávat pouze
velmi jednoduché příkazy. V podstatě umí pouze provádět aritmetické a logické operace (sčítání,
odčítání, násobení) s čísly a manipulovat (číst, zapisovat, přesouvat) s těmito čísly v paměti.

Veškeré složitější úkoly, jako třeba vykreslení obrázku na obrazovku, zapsání textu do dokumentu
nebo simulace světa v počítačové hře je výsledkem kombinací tisíců či milionů takovýchto
jednoduchých instrukcí.

Zde je ukázka jednoduchého programu, který zdvojnásobí číslo `8` pomocí příkazů `MOV` a `ADD`:

```x86asm
MOV EAX, 8
ADD EAX, EAX
```

Pokud bychom programy psali pouze pomocí těchto jednoduchých příkazů[^1], tak by bylo složité se v
nich vyznat, obzvláště, pokud by obsahovaly stovky, tisíce nebo dokonce miliony takovýchto příkazů.
Ideálně bychom chtěli programy zapisovat v přirozeném jazyce (`Vykresli čtverec na obrazovku`,
`Zapiš text do dokumentu`), nicméně tomu počítače nerozumí a je velmi náročné jej převést na
správnou sekvenci příkazů pro počítač, protože jazyky, které používáme, jsou často nejednoznačné a
nemají jednotnou strukturu.

[^1]: Vyzkoušíte si to v navazujícím předmětu [Architektury počítačů a paralelních systémů](https://poli.cs.vsb.cz/edu/apps/).

Jako kompromis tak vznikly **programovací jazyky**, které umožňují zápis programů ve formě, která
je lidem srozumitelná, ale zároveň ji lze relativně jednoduše převést na příkazy, které je schopen
počítač provést. Převodu programu zapsaného v programovacím jazyce na počítačové instrukce se
říká **překlad**
(*compilation*) a programy, které tento překlad provádějí, se nazývají **překladače** (*compilers*)
. Později si ukážeme, jak takovýto překladač použít k překladu kódu.

Zde je ukázka části programu v jazyce *C*:

```c
while (je_tlacitko_zmacknuto(MEZERNIK)) {
    posun_nahoru(postava);
}
```

I někdo, kdo se s jazykem *C* nikdy nesetkal, může z tohoto kusu kódu zhruba odvodit, co asi dělá,
pokud ho přečte jako větu. Tento program však může být převeden na stovky až tisíce počítačových
instrukcí a z takového množství příkazů už by bylo složité odvodit, k čemu je program určen.
