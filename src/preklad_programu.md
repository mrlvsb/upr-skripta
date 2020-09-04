# Překlad programu
Pro překlad programu z jazyka C do **spustitelného** (*executable*) souboru
budeme používat jiný program, kterému se říká překladač.
Překladačů jazyka C existuje celá řada, my budeme využívat asi nejpoužívanější překladač pro
Linuxové systémy s názvem [**GCC**](https://gcc.gnu.org/) (GNU Compiler Collection). 

Překladač GCC, spolu s dalšími potřebnými nástroji na Ubuntu můžete nainstalovat následujícím
příkazem:
```bash
sudo apt install build-essential
```

## Překlad prvního programu
Vytvořte soubor s názvem `main.c` a nakopírujte do něj následující C kód (později si vysvětlíme,
jak tento kód funguje):

```c
#include <stdio.h>

int main(int argc, char **argv) {
    printf("Hello world!\n");
}
```

> Tento program se nazývá `Hello world`, jelikož tento text vypíše na obrazovku.
> Podobný jednoduchý program je obvykle tím prvním, co programátor v nějakém novém programovacím
> jazyce vytvoří.

Nyní otevřete terminál ve složce s tímto souborem, spusťte program GCC a předejte mu cestu
k tomuto souboru:

```bash
$ gcc main.c -o program
```

Tímto příkazem řeknete "Gécécéčku", aby přeložil zdrojový soubor `main.c` a uložil výsledný spustitelný
soubor do souboru `program`. Pokud byste přepínač `-o <nazev souboru>` nepoužili, tak se vytvoří spustitelný
soubor s názvem `a.out`. 

> Na Windowsu spustitelné soubory mají obvykle příponu `.exe`, na Linuxu to však není běžnou praxí
> a spustitelné soubory typicky žádnou příponu nemají.

Pokud chcete nyní program spustit, stačí v terminálu zadat (relativní) cestu k danému spustitelnému souboru.

```bash
$ ./program
Hello world!
```
Program by měl na výstup vytisknout text `Hello world!`.

### Knihovny
> Tuto sekci budete potřebovat až při práci s knihovnami, pokud jste na začátku, tak ji můžete přeskočit.

**Knihovny** (*libraries*) jsou kusy kódu, které lze používat pomocí nadefinovaného rozhraní a díky tomu
je lze sdílet mezi více projekty/programy, aby se stejný kód nemusel psát pokaždé znovu. Existuje obrovské
množství C knihoven, které jsou volně dostupné na internetu, například pro [vykreslování grafiky](https://www.libsdl.org/),
[sazbu fontů](https://www.freetype.org/) nebo [kompresi dat](http://zlib.net/). 

Knihovny se obvykle nesdílí čistě jako archiv nebo adresář se zdrojovým kódem. Obvykle se setkáte s tím,
že knihovna poskytuje dvě věci: 

1. **Hlavičkové soubory** (*header files*) s příponou `.h`, které definují rozhraní, jak knihovnu používat.
2. Soubory s příponami `.a` nebo `.so`, které obsahují již přeložené zdrojové soubory knihovny ve formě
spustitelného kódu.

> Více o knihovnách se můžete dozvědět například [zde](https://www.itnetwork.cz/cecko/linux/cecko-a-linux-staticke-a-dynamicke-knihovny).

#### Použití knihoven pomocí GCC
Abyste ve vašem programu použili nějakou knihovnu, musíte ji k vašemu programu tzv. **přilinkovat**.
O to se stará tzv. **linker**, který za vás umí spustit překladač GCC.

Dejme tomu, že chcete použít knihovnu s názvem `foo`, která obsahuje hlavičkové soubory v adresáři
`/usr/foo/include` and zkompilovaný knihovní soubor v adresáři `/usr/foo/lib/libfoo.so`. Překladači
GCC musíte říct, kde jsou umístěny knihovní soubory pomocí přepínače `-L`, které konkrétní soubory chcete
přilinkovat pomocí přepínače `-l` a kde jsou umístěny hlavičkové soubory pomocí přepínače `-I`:

```bash
$ gcc -o program main.c -L/usr/foo/lib/ -lfoo -I/usr/foo/include
```

Používá se konvence, že pokud je název knihovního souboru `lib<nazev>.so`, tak název knihovny je `<nazev>`,
pro GCC se tedy zadá pouze `-l<nazev>` a ne `-llib<nazev>.so`. Přepínače `-l` by měly být vpravo (za)
názvy zdrojových souborů. Všechny tři tyto přepínače lze použít vícekrát v rámci jednoho spuštění GCC.

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
