# Proměnné
Aby programy mohly řešit nějaký úkol, tak si téměř vždy musí umět něco zapamatovat. K tomu
slouží tzv. **proměnné** (*variables*). Proměnné nám umožňují pracovat s pamětí počítače (RAM)
intuitivním způsobem - část paměti si pojmenujeme nějakým jménem a dále se na ni tímto jménem
odkazujeme. Do proměnné poté můžeme uložit nějakou hodnotu, čímž si ji počítač "zapamatuje". Tuto
hodnotu můžeme později v programu přečíst anebo ji změnit.

Příklady použití proměnných:
- Ve webové aplikaci si číselná proměnná pamatuje počet návštěvníků. Při zobrazení stránky
se hodnota proměnné zvýší o 1.
- Ve hře si číselná proměnná pamatuje počet životů hráčovy postavy. Pokud dojde k zásahu postavy
nepřítelem, tak se počet životů sníží o zranění (*damage*) nepřítelovy zbraně. Pokud hráč sebere lékárníčku,
tak se počet jeho životů opět zvýší.
- V terminálu si proměnná reprezentující znaky pamatuje text, který byl zadán na klávesnici.

### Definice
Proměnné jsou jedním z nejzákladnějších a nejčastěji používaných stavebních kamenů většiny programů, během
semestru se s nimi budeme setkávat neustále. Není tak náhodou, že jedním z nejzákladnějších příkazů
v *C* je právě vytvoření proměnné. Tím řekneme počítači, aby vyčlenil (tzv. **naalokoval**) místo v paměti,
které si v programu nějak pojmenujeme a dále se na něho pomocí jeho jména můžeme odkazovat[^1].

[^1]: O tom, jak přesně tato alokace paměti probíhá, se dozvíte později v sekci o
[práci s pamětí](../prace_s_pameti/automaticka_pamet.md).

Takto vypadá příkaz **definice** (vytvoření) proměnné s názvem `vek` s datovým typem `int`:
```c
int vek;
```
Jakmile proměnnou nadefinujeme, tak z ní můžeme buď číst anebo zapisovat paměť, kterou tato proměnná
reprezentuje, pomocí jejího názvu (zde `vek`).

### Platnost
Proměnná je platná (lze ji používat) vždy od místa (řádku) definice do konce **bloku**, ve kterém byla
nadefinována. Bloky jsou kusy kódu ohraničené složenými závorkami (`{` a `}`):
```c
int main() {
    // zde není platné ani `a`, ani `b`
    int a;
    // zde je platné pouze `a`

    {
        // zde je platné pouze `a`
        int b;
        // zde je platné `a` i `b`
    } // zde končí platnost proměnné `b`

    // zde je platné pouze `a`

    return 0;
} // zde končí platnost proměnné `a`
```
Všimněte si, že bloky lze vnořovat (lze vytvořit blok v bloku), a proměnné jsou platné i ve vnořených
blocích. Oblast kódu, ve které je proměnná validní, se nazývá *(variable) scope*.

### Datový typ
`int` před názvem proměnné udává její datový typ, o kterém pojednává [následující kapitola](../datove_typy/datove_typy.md).
Prozatím si řekněme, že `int` je zkratka pro `integer`, tedy celé číslo. Tím říkáme programu, že má
tuto proměnnou (resp. paměť, kterou proměnná reprezentuje) interpretovat jako celé číslo se znaménkem.

### Inicializace
Do proměnné bychom měli při jejím vytvoření rovnou uložit nějaký *výraz*, který musí být stejného
datového typu jako je typ proměnné:
```c
int a = 10;
int b = 10 + 15;
```
Obecná syntaxe pro definici proměnné je

`<datový typ> <název>;`

popřípadě

`<datový typ> <název> = <výraz>;`

pokud použijeme inicializaci.

> Všimněte si, že na konci definice proměnné vždy musí následovat středník (**;**).
> Opomenutí středníku na konci příkazu je velmi častá chyba, která často končí těžko srozumitelnými chybovými
> hláškami při překladu. Dávejte si tak na středníky pozor, obzvláště ze začátku.

#### Vždy inicializujte proměnné!
Je opravdu důležité do proměnné vždy při její definici přiřadit nějakou úvodní hodnotu. Pokud to
neuděláme, tak její hodnota bude **nedefinovaná** (*undefined*). Čtení hodnoty takovéto nedefinované proměnné
způsobuje **nedefinované chování** (*undefined behaviour*)[^2] programu. Pokud k tomu dojde, tak si překladač
s vaším programem může udělat, co se mu zachce, a váš program se poté může chovat nepředvídatelně.

[^2]: Situace, které můžou způsobit nedefinované chování, budou dále v textu označené pomocí ikony
💣.

**Proto vždy dávejte proměnným iniciální hodnotu!**

### Čtení
Pokud v programu použijeme název platné proměnné, tak vytvoříme výraz, který se vyhodnotí jako její
současná hodnota:
```c,editable
#include <stdio.h>

int main() {
    int a = 5;
    int b = a;  // hodnota `b` je 5
    int c = b + a + 1;  // hodnota `c` je 11

    printf("a = %d, b krat 2 = %d, c = %d", a, b * 2, c);

    return 0;
}
```

Proměnnou (resp. její název) tak lze použít kdekoliv, kde je očekáván výraz (pokud sedí datové typy).
Pro výpis hodnot proměnných na výstup programu můžete použít `printf`.
Hodnoty proměnných můžete zkoumat také krokováním pomocí [debuggeru](../../prostredi/ladeni.md#krokování).

### Zápis
Pokud by proměnná měla pouze svou původní hodnotu, tak by nebyla moc užitečná. Hodnoty proměnných
naštěstí jde měnit. Můžeme k tomu použít výraz **přiřazení** (*assignment*):
```c,editable
#include <stdio.h>

int main() {
    int a = 5;  // hodnota `a` je 5
    printf("%d\n", a);

    a = 8;      // hodnota `a` je nyní 8
    printf("%d\n", a);

    return 0;
}
```
Obecná syntaxe pro přiřazení do proměnné je

`<název proměnné> = <výraz>`

Opět musí platit, že výraz musí být stejného typu[^3], jako je proměnná, do které přiřazujeme. Na konci
řádku také nesmí chybět středník. Přiřazení je příklad výrazu, který má [vedlejší efekt](../prikazy_vyrazy.md#vedlejší-efekty).
Abychom z něj udělali příkaz, musíme za něj dát středník `;`.

[^3]: *C* umožňuje automatické (tzv. **implicitní**) konverze mezi některými datovými typy, takže typ výrazu
nemusí být nutně vždy stejný. Tyto konverze se nicméně často chovají neintuitivně a překladač vás před nimi
obvykle nijak nevaruje, i když vrátí výsledek, který nedává smysl. Snažte se tak ze začátku opravdu vždy
používat odpovídající typy. Více se dozvíte v sekci o [datových typech](../datove_typy/datove_typy.md). 

> **Jak přiřazení funguje?** Počítač se podívá, na jaké adrese v paměti daná proměnná leží, a zapíše do
paměti hodnotu výrazu, který do proměnné zapisujeme, čímž změní její hodnotu v paměti. Z toho vyplývá,
že dává smysl zapisovat hodnoty pouze do něčeho, co má adresu v paměti[^4]. Například příkaz `5 = 8;` nedává smysl. `5`
je výraz, číselná hodnota, která nemá žádnou adresu v paměti, nemůžeme tak do ní nic zapsat. Stejně tak
jako nedává smysl říct `Číslo 5 odteď bude mít hodnotu 8`.

[^4]: Zatím známe pouze proměnné, později si však ukážeme [další možnosti](../prace_s_pameti/ukazatele.md), jak vytvořit
"něco, co má adresu v paměti", a co tak půjde použít na levé straně výrazu přiřazení `=`.

### Definice více proměnných najednou
Pokud potřebujete vytvořit více proměnných stejného datového typu, můžete použít více názvů
oddělených čárkou za datovým typem proměnné. Takto například lze vytvořit tři celočíselné proměnné
s názvy `x`, `y` a `z`:
```c
int x = 1, y = 2, z = 3;
```

> Doporučujeme však tento způsob tvorby více proměnných spíše nepoužívat, aby byl kód přehlednější.

<hr />

**Cvičení** 🏋

1) Zkuste napsat program, který vytvoří několik proměnných, přečte a změní jejich hodnoty
a pak je vypíše na výstup programu (k výpisu využijte `printf`, který jsme si již ukázali [dříve](../prikazy_vyrazy.md#výpis-výrazů)).
2) Použijte [debugger](../../prostredi/ladeni.md#krokování), abyste se interaktivně za běhu programu
podívali, jaké jsou hodnoty jednotlivých proměnných a jak se měni v čase po provedení přiřazení.

Více úloh naleznete [zde](../../ulohy/zaklady.md).

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>
    
    int main() {
        int a = 5;
        printf("a\n");

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše znak `a`, jelikož vše uvnitř uvozovek se bere jako text. Aby program vypsal
    hodnotu proměnné `a`, museli bychom použít např. příkaz `printf("a=%d\n", a);`.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 5;
        printf("%d\n", a);
        a = 8;

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše znak `5`, protože v době, kdy proměnnou vypisujeme, tak je její hodnota `5`.
    Po vypsání proměnné sice její hodnotu změníme na `8`, ale poté už ji nevypíšeme a program skončí.
    </details>
3) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 5;
        a + 1;
        printf("%d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše znak `5`. Provedeme sice výraz `a + 1`, který se vyhodnotí jako `6`, ale výsledek
    tohoto výrazu se "zahodí", nijak tedy neovlivní další chování programu. Abychom změnili hodnotu
    proměnné `a`, museli bychom výsledek tohoto výrazu zpět do proměnné uložit: `a = a + 1;`.
    Vyzkoušejte si to.
    </details>
4) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 5;
        int b = a;
        a = 8;

        printf("%d\n", a);
        printf("%d\n", b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    8
    5
    ```
    Při definici proměnné `b` jsme ji inicializovali hodnotou proměnné `a`. Výraz `a` se tedy
    vyhodnotil jako hodnota `5`, která byla uložena do proměnné `b`. Dále však už spolu proměnné
    nesouvisí, změna hodnoty proměnné `a` tedy nijak neovlivní hodnotu uloženou v proměnné `b`.
    </details>
5) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        printf("%d\n", a);
        int a = 5;

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Překlad programu skončí s chybou (`use of undeclared identifier 'a'`), protože se snažíme číst
    hodnotu proměnné, která na daném řádku zatím nebyla nadefinována. Proměnnou `a` můžeme začít
    používat až poté, co ji nadefinujeme, tj. za řádkem `int a = 5;`.
    </details>
6) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        a = 5;
        printf("%d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Překlad programu skončí s chybou (`use of undeclared identifier 'a'`), protože se snažíme zapsat
    výraz `5` do proměnné, která neexistuje. Před prvním použitím proměnné ji vždy nejprve musíme
    nadefinovat: `int a = 5;`.
    </details>
7) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 1;
        int b = a = 5;
        printf("%d\n", a);
        printf("%d\n", b);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    5
    5
    ```
    Výraz přiřazení (`<promenna> = <vyraz>`) se vyhodnotí jako přiřazená hodnota (`<vyraz>`), a takto
    vyhodnocený výraz lze dále v programu použít a např. přiřadit do jiné proměnné. Přiřazení se
    vyhodnotí následovně:
    ```c
    int b = a = 5;
    // int b = 5;
    ```
    Nicméně jak asi sami uznáte, takovýto zápis je dosti zmatečný a nemusí být na první pohled jasné,
    jak se takovýto výraz vyhodnotí. Proto výsledek výrazu přiřazení raději dále nepoužívejte a
    přiřazení vždy používejte na samostatném řádku se středníkem.
    </details>
8) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = 1;
        5 = a + 1;
        printf("%d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Překlad programu skončí s chybou `expression is not assignable`. Snažíme se zde uložit hodnotu
    výrazu `a + 1` na nějaké místo v paměti, ale `5` žádné takové místo neoznačuje, `5` je prostě
    číselný literál s hodnotou `5`, který nemůžeme přepsat či změnit.
    </details>
9) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a;
        printf("%d\n", a + 1);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣, protože čteme hodnotu proměnné, která nebyla
    inicializována, a její hodnota je tedy nedefinovaná. Nelze tak určit, co tento program provede,
    překladač jej může přeložit na totální nesmysl. Takovýto program je špatně a nemá smysl zkoumat,
    co provede, je potřeba jej nejprve opravit tak, že proměnnou `a` nainicializujeme.
    </details>
10) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        int a = a + 1;
        printf("%d\n", a);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣, stejně jako předchozí ukázka. Při inicializaci
    proměnné `a` používáme její hodnotu, která ale v té době není definovaná. Je to jako kdybychom napsali
    ```c
    int a;
    a = a + 1;
    ```
    </details>
11) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        printf("cislo: %d\n");

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Tento program obsahuje **nedefinované chování** 💣. Pokud při použití příkazu `printf` v textu
    mezi uvozovkami použijeme zástupný znak (`%d`), musíme za každý takovýto použitý znak předat
    této *funkci* také nějaký celočíselný výraz. V opačném případě bude chování programu nedefinované.
    </details>
