# Překlad programu
Pro překlad programu z jazyka C do **spustitelného** (*executable*) souboru
budeme používat jiný program, kterému se říká překladač.
Překladačů jazyka C existuje celá řada, my budeme využívat asi nejpoužívanější překladač pro
Linuxové systémy s názvem [**GCC**](https://gcc.gnu.org/) (GNU Compiler Collection). 

Překladač `gcc`, spolu s dalšími potřebnými nástroji na Ubuntu můžete nainstalovat následujícím
příkazem:
```bash
sudo apt install build-essential
```

## Překlad prvního programu
Ještě než si ukážeme, jak vlastně programovací jazyk C funguje, tak zkusíme přeložit velmi jednoduchý
C program do spustitelného souboru a spustit jej.
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

Nyní otevřete terminál (`Ctrl + Alt + T` v Ubuntu) ve složce s tímto souborem, spusťte program
`gcc` a předejte mu cestu k tomuto souboru:

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
