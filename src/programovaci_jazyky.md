# Programovací jazyky
Z pohledu počítače je program sekvence příkazů (nazývaných **instrukce**), které může počítač vykonat
k vyřešení nějakého problému. Abychom mohli počítači říct, co má vykonávat, potřebujeme mu příkazy
zadat ve formě, které bude rozumět. Ač se to možná nezdá, tak počítače umí vykonávat pouze velmi
jednoduché příkazy. V podstatě umí pouze provádět aritmetické a logické operace (sečti/odečti/vynásob/vyděl)
s čísly a manipulovat (ukládat, kopírovat, přesouvat) s těmito čísly v paměti.
Veškeré složitější úkoly, jako třeba vykreslení obrázku na obrazovku, zapsání textu do dokumentu
nebo simulace světa v počítačové hře je výsledkem kombinací tisíců či milionů takovýchto jednoduchých
instrukcí.

Zde je ukázka jednoduchého programu, který zdvojnásobí číslo pomocí příkazů `MOV` a `ADD`: 
```x86asm
MOV EAX, 8
ADD EAX, EAX
```

Pokud bychom programy psali pomocí těchto jednoduchých příkazů, tak by bylo složité se v nich vyznat,
obzvláště, pokud by obsahovaly stovky, tisíce, miliony nebo dokonce miliardy takovýchto příkazů.
Ideálně bychom chtěli programy zapisovat v přirozeném jazyce (`Vykresli čtverec na obrazovku`,
`Zapiš text do dokumentu`), nicméně tomu počítače nerozumí a je velmi náročné
jej převést na správnou sekvenci příkazů pro počítač, protože jazyky, které používáme,
jsou často nejednoznačné a nemají jednotnou strukturu.

Jako kompromis tak vznikly **programovací jazyky**, které umožňují zápis programů ve formě, která je
lidem srozumitelná, ale zároveň ji lze relativně jednoduše převést na příkazy, které je schopen počítač
provést. Převodu programu zapsaného v programovacím jazyce na počítačové instrukce se říká **překlad**
(*compilation*) a programy, které tento překlad provádějí, se nazývají **překladače** (*compilers*).
Později si ukážeme, jak takovýto překladač použít k překladu kódu.

Zde je ukázka programu v jazyce C:
```c
while (is_key_pressed(SPACE)) {
    move_up(character);
}
```

I někdo, kdo se s jazykem C nikdy nesetkal, může z tohoto programu zhruba odvodit, co asi dělá,
pokud ho přečte jako větu v angličtině. Tento program však může být převeden na stovky až tisíce
počítačových instrukcí a z takového množství příkazů už by bylo složité odvodit, k čemu je program
určen.
