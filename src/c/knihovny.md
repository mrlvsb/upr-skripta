# Knihovny
Tato sekce je ve výstavbě 🚧.

<!--**Knihovny** (*libraries*) jsou kusy kódu, které lze používat pomocí nadefinovaného rozhraní a díky tomu
je lze sdílet mezi více projekty/programy, aby se stejný kód nemusel psát pokaždé znovu. Existuje obrovské
množství *C* knihoven, které jsou volně dostupné na internetu, například pro [vykreslování grafiky](https://www.libsdl.org/),
[sazbu fontů](https://www.freetype.org/) nebo [kompresi dat](http://zlib.net/). 

Knihovny se obvykle nesdílí čistě jako archiv nebo adresář se zdrojovým kódem. Obvykle se setkáte s tím,
že knihovna poskytuje dvě věci: 

1. **Hlavičkové soubory** (*header files*) s příponou `.h`, které definují rozhraní, jak knihovnu používat.
2. Soubory s příponami `.a` nebo `.so`, které obsahují již přeložené zdrojové soubory knihovny ve formě
spustitelného kódu.

> Více o knihovnách se můžete dozvědět například [zde](https://www.itnetwork.cz/cecko/linux/cecko-a-linux-staticke-a-dynamicke-knihovny).

#### Použití knihoven pomocí `gcc`
Abyste ve vašem programu použili nějakou knihovnu, musíte ji k vašemu programu tzv. **přilinkovat**.
O to se stará tzv. **linker**, který za vás umí spustit překladač `gcc`.

Dejme tomu, že chcete použít knihovnu s názvem `foo`, která obsahuje hlavičkové soubory v adresáři
`/usr/foo/include` and zkompilovaný knihovní soubor v adresáři `/usr/foo/lib/libfoo.so`. Překladači
`gcc` musíte říct, kde jsou umístěny knihovní soubory pomocí přepínače `-L`, které konkrétní soubory chcete
přilinkovat pomocí přepínače `-l` a kde jsou umístěny hlavičkové soubory pomocí přepínače `-I`:

```bash
$ gcc -o program main.c -L/usr/foo/lib/ -lfoo -I/usr/foo/include
```

Používá se konvence, že pokud je název knihovního souboru `lib<nazev>.so`, tak název knihovny je `<nazev>`,
pro `gcc` se tedy zadá pouze `-l<nazev>` a ne `-llib<nazev>.so`. Přepínače `-l` by měly být vpravo (za)
názvy zdrojových souborů. Všechny tři tyto přepínače lze použít vícekrát v rámci jednoho spuštění `gcc`.

Poté ve zdrojovém souboru vložíte hlavičkové soubory knihovny a můžete používat funkce, které nabízí.

Pokud je knihovna statická (knihovní soubor má příponu `.a`), tak už není třeba dělat nic dále. Pokud
je však knihovna dynamická (přípona `.so`), tak k načtení knihovny dojde až při samotném spuštění programu
(ne při jeho překladu). Musíme tak programu při jeho spuštění říct, kde má knihovnu hledat (pokud ji neumí
naleznout automaticky).

Abychom zjistili, které dynamické knihovny náš program vyžaduje, můžeme použít program `ldd`:
```bash
$ ldd program
linux-vdso.so.1 (0x00007ffce73ae000)
libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f193e1af000)
/lib64/ld-linux-x86-64.so.2 (0x00007f193e7a2000)
foo => ...
```

Pokud pro naši knihovnu ve výstupu není uvedena správná cesta, musíme při spuštění programu nastavit
**proměnnou prostředí** `LD_LIBRARY_PATH` a uložit do ní cestu k adresáři, ve které se naše knihovna nachází:

```bash
$ LD_LIBRARY_PATH=/usr/foo/lib ./program
```
-->
