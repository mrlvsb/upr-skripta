# Překlad programu
Pro překlad programů, které budeme psát v jazyce *C*, do **spustitelného** (*executable*) souboru
budeme používat program, kterému se říká překladač.
Překladačů jazyka *C* existuje celá řada, my budeme využívat asi nejpoužívanější překladač pro
Linuxové systémy s názvem [**GCC**](https://gcc.gnu.org/) (GNU Compiler Collection). 

Překladač `gcc`, spolu s dalšími potřebnými nástroji, můžete na Ubuntu v terminálu nainstalovat
pomocí následujících dvou příkazů:
```bash
$ sudo apt update
$ sudo apt install build-essential gdb
```

> Při pokusu o instalaci vás program vyzve, abyste instalaci potvrdili. Udělejte to zmáčknutím klávesy `y`
> a potvrďte klávesou Enter.

## Překlad prvního programu
Ještě než si ukážeme, jak vlastně programovací jazyk *C* funguje, tak zkusíme přeložit velmi jednoduchý
*C* program do spustitelného souboru a spustit jej.
Vytvořte soubor s názvem `main.c` a nakopírujte[^1] do něj následující *C* kód (později si vysvětlíme,
jak tento kód funguje):

```c,editable
#include <stdio.h>

int main() {
    printf("Hello world!\n");
    return 0;
}
```

[^1]: Kód z buněk můžete kopírovat pomocí tlačítka <i class="fa fa-copy"></i> v pravém horním rohu
buňky s kódem.

> Tento program se nazývá `Hello world`, jelikož tento text vypíše na obrazovku.
> Podobný jednoduchý program je zpravidla tím prvním, co programátor vytvoří, když se učí nějaký
> programovací jazyk.

Nyní otevřete terminál (`Ctrl + Alt + T` v Ubuntu), přesuňte se do složky s tímto souborem pomocí
příkazu `cd`, spusťte program `gcc` a předejte mu cestu k tomuto souboru:

```bash
$ gcc main.c -o program
```

Tímto příkazem řeknete "Gécécéčku", aby přeložil zdrojový soubor `main.c` a uložil výsledný spustitelný
soubor do souboru `program`[^2]. Pokud byste přepínač `-o <nazev souboru>` nepoužili, tak se vytvoří spustitelný
soubor s názvem `a.out`.

[^2]: Na Windowsu spustitelné soubory mají obvykle příponu `.exe`, na Linuxu to však není běžnou praxí a spustitelné soubory typicky žádnou příponu nemají.

Pokud chcete nyní program spustit, stačí v terminálu zadat cestu k danému spustitelnému souboru.

```bash
$ ./program
Hello world!
```
Program by měl na výstup vytisknout text `Hello world!`.

<details>
<summary>Tipy pro práci s příkazovou řádkou</summary>

- Při psaní programu budete chtít často po úpravě zdrojového kódu opětovně provést překlad a poté
  program spustit. Abyste to provedli v jednom terminálovém příkazu, můžete tyto dva příkazy spojit pomocí `&&`:
    ```bash
    $ gcc main.c -o main && ./main
    ```
    Pokud překlad proběhne úspěšně, tak operátor `&&` zajistí spuštění následujícího příkazu.
- Pokud nechcete příkazy v terminálu psát neustále dokola, šipkou nahoru (&#8593;) můžete vyvolat nedávno
spuštěné příkazy v terminálu.
- Můžete používat i terminál vestavený přímo ve `Visual Studio Code` (`View -> Terminal`).
</details>

📹 Pro lepší představu o překladu programů zde máte k dispozici ještě krátké shrnující video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hu7l9NpQ3g8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Jak překlad probíhá?
Překlad programu bude detailně vysvětlen později v sekci o [linkeru](../c/modularizace/linker.md).
Prozatím nám bude stačit tato zkrácená verze:

Překlad programů probíhá ve dvou hlavních fázích: **překlad** (*translation*) a **linkování** (*linking*).
Dohromady se oboum těmto krokům také říká **kompilace** (*compilation*).

Při překladu překladač vezme každý *C* zdrojový soubor, který mu předložíme, a samostatně jej přeloží
do tzv. **objektového souboru** (*object file*). Takovýto soubor obsahuje již přeložené instrukce pro
procesor, ale není sám o sobě spustitelný, tj. nejedná se o program, ale pouze o přeložený binární kód.

Jakmile jsou všechny zdrojové soubory přeloženy do objektových souborů, tak přichází na řadu další
program, tzv. **linker**, který tyto objektové soubory spojí dohromady,
[propojí](https://cs.wikipedia.org/wiki/Linker#Funkce_linkeru) je dle potřeby, případně k nim připojí
externí [knihovny](../c/modularizace/knihovny.md) a na konci vytvoří finální spustitelný soubor, který lze poté
spustit.

Když použijete program `gcc` způsobem, jaký jsme si ukázali výše, tak se na pozadí spustí překladač
a poté i linker a oba dva tyto kroky se tak provedou automaticky. Je ale možné provést je i separátně:
```bash
$ gcc -c main.c      # vytvoří objektový soubor main.o
$ gcc main.o -o main # slinkování souboru main.o 
```
