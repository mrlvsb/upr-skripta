# Vstup
Abychom mohli našim programům dávat příkazy nebo parametrizovat jejich chování, téměř vždy v nich
potřebujeme přečíst nějaké informace ze vstupu programu. V této sekci si ukážeme několik užitečných
funkcí ze [standardní knihovny *C*](../funkce/stdlib.md), které nám to umožňují. Pro použití těchto
funkcí musíte ve svém programu [vložit](../preprocesor/vkladani_souboru.md) soubor `<stdio.h>`.

## Načtení jednoho znaku
Pro načtení jednoho znaku ze standardního vstupu (`stdin`) můžeme použít funkci
[`getchar`](https://devdocs.io/c/io/getchar). Ta nám vrátí jeden znak ze vstupu, popřípadě hodnotu
makra `EOF`[^1], pokud již je vstup uzavřený a nelze z něj nic dalšího načíst nebo pokud došlo při
načítání k nějaké chybě.

[^1]: End-of-file

## Načtení řádku
Načítat vstup po jednotlivých znacích je poměrně zdlouhavé. Velmi často chceme ze vstupu načíst
jeden řádek textu. Toho můžeme dosáhnout například použitím funkce
[`fgets`](https://devdocs.io/c/io/fgets). Ta jako parametry přijímá ukazatel na řetězec, do kterého
zapíše načítaný řádek, maximální počet znaků, který lze načíst[^2]. Třetí parametr je
[soubor](../soubory/soubory.md), ze kterého se má vstup načíst. O souborech se dozvíte více později,
pokud chcete načítat data ze standardního vstupu, tak použijte jako třetí parametr globální proměnnou
`stdin`, která je nadefinována v souboru `<stdio.h>`. Pro jednoduché zjištění délky řetězce, do
kterého zapisujete, můžete použít operátor `sizeof`:
```c
#include <stdio.h>

int main() {
    char buf[80];
    // načti řádek textu ze vstupu do řetězce `buf`
    fgets(buf, sizeof(buf), stdin);

    return 0;
}
```
Pokud tato funkce vrátí návratovou hodnotu `NULL`, tak při načítání došlo k chybě. Tuto chybu byste
tak ideálně měli nějak ošetřit:
```c
#include <stdio.h>

int main() {
    char buf[80];
    if (fgets(buf, sizeof(buf), stdin) == NULL) {
        printf("Nacteni dat nevyslo. Ukoncuji program\n");
        return 1;
    }

    return 0;
}
```

[^2]: Tato velikost je včetně znaku `'\0'`, který je vždy zapsán na konec vstupního řetězce. Pokud
tak máte řetězec (pole) o délce `10`, předejte do `fgets` hodnotu `10`. Funkce načte maximálně `9`
znaků a na konec řetězce umístí znak `'\0'`.

## Načtení formátovaného textu
Pokud chceme načítat text, který má očekávaný formát, popřípadě chceme text rovnou zpracovat,
například jej převést na číslo, můžeme použít formátované načítání vstupu pomocí funkce
[`scanf`](https://devdocs.io/c/io/fscanf). Této funkci předáme tzv. **formátovací řetězec** (*format
string*), který udává, jak má vypadat vstupní text. V tomto řetězci můžeme používat různé zástupné
znaky. Za každý zástupný znak ve formátovacím řetězci `scanf` očekává jeden parametr s adresou, do
které se má uložit načtená hodnota popsaná zástupným znakem ze vstupu. Například tento kód načte
ze vstupu dvě celá čísla:
```c
int x, y;
scanf("%d%d", &x, &y);
```
Pomocí formátovacího řetězce můžeme také vyžadovat, co musí v textu být. Například `scanf("x%d", …)`
načte vstup pouze, pokud v něm nalezne znak `'x'` následovaný číslem.

Seznam všech těchto zástupných znaků naleznete v [dokumentaci](https://devdocs.io/c/io/fscanf).
Načítat můžeme například celá čísla (`%d`), desetinná čísla (`%f`) či znaky (`%c%`).

> Funkce `scanf` načítá data ze standardního vstupu programu (`stdin`). Obsahuje ovšem několik dalších
> variant, pomocí kterých může načítat formátovaná data z libovolného souboru (`fscanf`) nebo třeba i
> z řetězce v paměti (`sscanf`).

Funkce `scanf` je jistě užitečná, zejména u krátkých "toy" programů, nicméně má také určité problémy,
které jsou popsány níže. Pokud to je tedy možné, pro načítání vstupu raději používejte funkci `fgets`.

### Načítání řetězců pomocí `scanf`
Pomocí `scanf` můžeme načítat také celé řetězce pomocí zástupného znaku `%s`. Zde si ovšem musíme
dávat pozor, abychom u něj uvedli i maximální délku řetězce, do kterého chceme text načíst[^3]:
```c
char buf[21];
scanf("%20s", buf);
```

[^3]: Narozdíl od funkce `fgets` se zde musí uvést délka o jedna menší, než je délka cílového řetězce,
do kterého znaky zapisujeme.

Pokud bychom použili zástupný znak `%s` bez uvedené velikosti cílového řetězce, snadno by se mohlo
stát, že nám uživatel zadá moc dat, které by funkce `scanf` začala vesele zapisovat i za paměť předaného
řetězce, což může vést buď k pádu programu (v tom lepším případě) nebo ke vzniku bezpečnostní
zranitelnosti, pomocí které by uživatel našeho programu mohl například získat přístup k počítači,
na kterém program běží (v tom horším případě):
```c
char buf[21];
// pokud uživatel zadá více než 20 znaků, může svým vstupem začít přepisovat paměť
// běžícího programu
scanf("%s", buf);
```

### Zpracování bílých znaků
Funkce `scanf` ignoruje bílé znaky (mezery, odřádkování, tabulátory atd.) mezi jednotlivými
zástupnými znaky ve formátovacím řetězci. Například v následujícím kódu je validním vstupem `x8`,
`x 8` i `x  8`:
```c
int a;
scanf("x%d", &a);
```
I když může toto chování být užitečné, někdy je také celkem neintuitivní. Problém může způsobovat
zejména, pokud se pro načítání vstupu kombinuje formátované načítání (`scanf`) s neformátovaným
načítáním (např. `fgets`). Funkce `scanf` totiž bílé znaky nechá ve vstupu ležet, pokud je
nepotřebuje zpracovat.

Například, následující program načítá číslo pomocí funkce `scanf` a poté se snaží načíst následující
řádek textu pomocí funkce `fgets`:
```c
int cislo;
scanf("%d", &cislo);

char radek[80];
fgets(radek, sizeof(radek), stdin);
```
Pokud tomuto programu předáme text `5\nahoj`, očekávali bychom, že se v řetězci `radek` objeví
`ahoj`. Nicméně funkce `scanf` načte číslo `5` a nechá ve vstupu ležet znak odřádkování, protože
nic dalšího načíst nepotřebuje. Funkce `fgets` poté uvidí znak odřádkování, načte jej a skončí
své provádění (načte prázdný řádek), což zřejmě není chování, které bychom od programu čekali.

### Ošetření chyb
Funkce `scanf` je problematická i co se týče ošetření chyb. Její návratová hodnota sice udává, kolik
zástupných znaků ze vstupu se jí podařilo načíst, problémem však je, že pokud se funkce načte třeba
pouze polovinu vstupu, tak již nemůžeme zavolat znovu se stejným formátovacím řetězcem, jinak by se
snažila načíst data, která již načetla. Například pokud bychom tomuto programu:
```c
int x, y;
scanf("%d%d", &x, &y);
```
předali text `5 asd`, tak funkce vrátí hodnotu `1`, tj. načetla ze vstupu jedno číslo. Nyní ovšem už
funkci nemůžeme zavolat znovu (jakmile bychom např. ve vstupu přeskočili nevalidní text), protože
v této chvíli už bychom chtěli načíst pouze jedno číslo. 

## Parametry příkazového řádku
Další možností, jak předat nějaký vstup vašemu programu, je předat mu parametry při spuštění v
terminálu:
```bash
$ ./program arg1 arg2 arg3
```
K těmto předaným řetězcům poté lze přistoupit ve funkci
[`main`](../../ruzne/funkce_main.md#vstupní-parametry-funkce-main).
