# Řetězce
Nyní už víme, jak můžeme v *C* pracovat s jednotlivými (ASCII) znaky. Obvykle však chceme pracovat
s delšími sekvencemi textu - řádky, větami, odstavci atd. Sekvence textu se v programovacích jazycích
obvykle označují jako **řetězce** (*strings*).

Dobrá zpráva je, že pro použití řetězců v *C* už
známe vše potřebné – řetězce nejsou nic jiného než [pole](../pole/pole.md) [znaků](znaky.md)!

## Řetězce v *C*
Teoreticky bychom si mohli navrhnout vlastní způsob, jak řetězce v paměti reprezentovat a jak s nimi
pracovat. Nicméně zaběhlým způsobem, jak s ASCII textem v *C* pracovat, a pro který *C* nabízí různé
funkce a základní syntaktickou podporu, je použití takzvaných **řetězců zakončených nulou**
(*null-terminated strings*). Takto reprezentovaný řetězec není nic jiného než [pole](../pole/pole.md)
[znaků](znaky.md), které obsahuje na svém posledním indexu znak `'\0'` (s číselnou hodnotou `0`),
který značí konec řetězce. Například řetězec `UPR` by tedy v paměti počítače byl reprezentovaný takto:
<upr-array array='["U", "P", "R", "\\0"]'></upr-array>

### Vytvoření řetězce
Pokud bychom chtěli vytvořit řetězec na zásobníku, můžeme vytvořit statické pole, umístit do něj
jednotlivé znaky řetězce a za ně přidat znak `'\0`[^1]:
```c,editable,mainbody
#include <stdio.h>

int main() {
    char text[4] = {'U', 'P', 'R', '\0'};
    printf("%s\n", text);
    return 0;
}
```

[^1]: Pro [výpis](vystup.md) řetězce pomocí funkce `printf` můžeme použít zástupný znak `%s`.

Pokud bychom potřebovali řetězec s dynamickou nebo velkou délkou, můžeme pro vytvoření řetězce
samozřejmě použít také [dynamickou paměť](../pole/dynamicka_pole.md).

### Řetězcový literál
Vytváření řetězců tímto způsobem je nicméně celkem zdlouhavé a nepřehledné. Často chceme v programu
jednoduše a rychle zapsat krátký textový řetězec tak, aby šel přehledně přečíst. K tomu můžeme využít
tzv. **řetězcový literál** (*string literal*), který lze vytvořit tak, že napíšeme text do dvojitých
uvozovek (`"`). Pokud tedy v našem programu vytvoříme například literál `"UPR"`, tak se stane následující:
1) Překladač při překladu uloží do výsledného spustitelného souboru pole reprezentující daný řetězec.
V tomto případě půjde o pole velikosti 4 s hodnotami `'U'`, `'P'`, `'R'` a `'\0'`. Při spuštění
programu se toto pole načte do [globální paměti](../prace_s_pameti/globalni_pamet.md) v sekci
adresního prostoru, která je určena pouze pro čtení. Do takto vytvořeného řetězce tak nelze
zapisovat, lze jej pouze číst[^2].
2) Samotný výraz literálu se při běhu programu vyhodnotí jako adresa prvního znaku řetězce
uloženého v globální paměti.
3) Datový typ literálu bude
[ukazatel na konstantní znak](../prace_s_pameti/ukazatele.md#konstantní-ukazatele), tedy
`const char*`. Tento datový typ říká, že hodnotu znaku na dané adrese nelze měnit.

[^2]: Tyto řetězce jsou pouze pro čtení zejména z toho důvodu, aby je šlo sdílet. Pokud například
v programu použijete třikrát stejný řetězcový literál, překladač může v paměti pole pro tento
literál vytvořit pouze jednou, aby ušetřil paměť. Kvůli toho ale musí být řetězce pouze pro čtení,
pokud bychom totiž takto sdílený řetězec změnili, změnilo by to i hodnotu všech ostatních literálů,
které se vyhodnotí na jeho adresu, což by bylo dost neintuitivní.

Pomocí řetězcového literálu si tak můžeme značne usnadnit zápis řetězců v programech, jelikož
nemusíme přemýšlet nad délkou pole, nemusíme pamatovat na umístění znaku `'\0'` na konec řetězce
a ani nemusíme obalovat jednotlivé znaky do apostrofů:
```c,editable,mainbody
#include <stdio.h>

int main() {
    const char* text = "UPR";
    printf("%s\n", text);
    return 0;
}
```
Je však třeba pamatovat na to, že takto vytvořené řetězce jsou opravdu pouze pro čtení, a nesmíme
tak do nich zapisovat. Pokud je budete ukládat do proměnné, tak použijte datový typ `const char*`,
díky kterému vás překladač bude hlídat, abyste se do takovéhoto řetězce omylem nesnažili něco zapsat.

Pokud byste chtěli použít řetězcový literál pro vytvoření řetězce, který lze měnit, můžete ho uložit
do proměnné typu `char[]` (tj. pole znaků):
```c,editable,mainbody
#include <stdio.h>

int main() {
    char text[] = "UPR";
    text[0] = 'A';
    printf("%s\n", text);
    return 0;
}
```
V takovémto případě se hodnota z literálu překopíruje do proměnné pole znaků na zásobníku, který již
lze měnit.

> Pokud jsou vám řetězcové literály povědomé, je to kvůli toho, že jsme je již mnohokrát
> využili při volání funkce `printf`.

#### Víceřádkové řetězcové literály
Pokud budete chtít zapsat řetězcový literál na více řádků kódu, můžete buď na konci každého
neukončeného řádku použít znak `\`:
```c
const char* veta = "Ahoj \
jmenuji \
se \
Karel";
```
nebo každý řádek samostatně obalit uvozovkami:
```c
const char* veta = "Ahoj"
"jmenuji"
"se"
"Karel";
```

Pozor však na to, že v ani jednom ze zmíněných případů nebude součástí řetězce znak odřádkování.
Ten musíte vždy přidat explicitně:
```c
const char* radky = "radek1\n\
radek2\n\
radek3\n";

// nebo
const char* radky = "radek1\n"
"radek2\n"
"radek3\n";
```

### K čemu slouží nulový znak na konci?
U polí je trochu nepraktické to, že pokud je chceme poslat do nějaké funkce, musíme spolu s
ukazatelem na první prvek pole předat také jeho
[velikost](../pole/staticka_pole.md#předávání-velikosti-pole), aby funkce věděla, ke kolika prvkům
si může dovolit přistoupit. Jiným způsobem, jak určit velikost pole, je zvolit si speciální hodnotu,
která bude značit konec pole. Když kód, který s takovýmto polem bude pracovat, na tuto speciální
hodnotu narazí, tak bude vědět, že dále v paměti již pole nepokračuje.

Tento mechanismus je využit právě u řetězců zakončených nulou, kde onou speciální hodnotou je právě
tzv. `NUL` znak, který má číselnou hodnotu `0`. Například při procházení řetězce v cyklu tak nemusíme
dopředu znát jeho délku, stačí cyklus ukončit, jakmile narazíme na znak `'\0'`. Například funkce
pro spočtení délky řetězce by mohla vypadat takto[^3]:
```c
int delka_retezce(const char* retezec) {
    int delka = 0;

    // dokud není znak na adrese v ukazateli roven znaku NUL
    while (*retezec != '\0') {
        delka = delka + 1;
        retezec = retezec + 1;  // posuň ukazatel o jeden znak dále
    }
    return delka;
}
```
Tato funkce postupně projde všechny znaky řetězce a počítá, kolik jich je, dokud nenarazí na
znak `'\0`. Pro procházení řetězce je zde použita
[aritmetika s ukazateli](../prace_s_pameti/ukazatele.md#aritmetika-s-ukazateli).

[^3]: Všimněte si, že tato funkce bere ukazatel na konstantní pole znaků.
Pokud ve funkci nepotřebujete měnit hodnoty pole, je obvykle dobrý nápad použít klíčové slovo
`const` před datovým typem obsaženým v poli, aby vás překladač ohlídal, že se pole nesnažíte měnit.
Do takovéto funkce pak klidně můžete poslat i pole, které ve skutečnosti měnit lze, jinak řečeno
např. `char*` lze bez problému převést na `const char*`. V opačném směru konverze není korektní.

Z toho vyplývá mimo jiné to, že znak `NUL` nemůže být použit "uprostřed" řetězce. Pokud by tomu tak
bylo, tak funkce, které by s takovýmto řetězcem pracovaly, by při nalezení tohoto znaku přestaly
řetězec zpracovávat, a jakékoliv další znaky za `NUL` by byly ignorovány. Uhodnete tak, co vypíše
následující program?
```c,editable,mainbody
#include <stdio.h>

int main() {
    char text[] = {'U', '\0', 'P', 'R', '\0'};
    printf("%s\n", text);
    return 0;
}
```

### Řetězce jako pole
S řetězci pracujeme jako s klasickými poli znaků. Například pro získání prvního znaku řetězce můžeme
použít operátor hranatých závorek:
```c
char vrat_prvni_znak(const char* retezec) {
    return retezec[0];
}
```

## Funkce pro práci s řetězci
Standardní knihovna *C* obsahuje [řadu funkcí](https://devdocs.io/c/string/byte), které umí s
řetězci zakončenými nulou pracovat. Zde je seznam několika vybraných funkcí, které pro vás můžou
být užitečné:

### Zjištění délky řetězce
Funkce [`strlen`](https://devdocs.io/c/string/byte/strlen) bere jako parametr řetězec a vrací jeho délku. Jedná se o jednu z nejčastěji používaných funkcí při práci s řetězci a vyplatí se ji tak znát.

Při jejím použití je ovšem nutné si dát pozor na to, že délka provádění této funkce závisí na tom, jak je
řetězec dlouhý. Pokud bude mít řetězec milion znaků, tak bude tato funkce muset projít všech milion
znaků, dokud nenarazí na znak `NUL`. Dávejte si tak pozor, abyste tuto funkci nevolali zbytečně často.
Například pokud použijete funkci `strlen` v podmínce cyklu `for`:
```c
for (int i = 0; i < strlen(retezec); i++) {
    ...
}
```
Tak se délka řetězce vypočte při každé iteraci cyklu. Pokud by tak řetězec měl milion znaků,
musel by program provést bilion[^4] (!) operací pouze pro zjištění délky řetězce.
Lepší volbou (pokud se tedy délka řetězce nemění) je tak předpočítat si jeho délku dopředu a
uložit si ji do proměnné:
```c
int delka = strlen(retezec);
for (int i = 0; i < delka; i++) {
    ...
}
```

[^4]: 1 000 000 000 000

### Porovnání dvou řetězců
Běžnou operací, kterou bychom s řetězci chtěli udělat, je porovnat,
zdali jsou dva řetězce stejné, popřípadě který z nich je menší[^5]. Funkce
[`strcmp`](https://devdocs.io/c/string/byte/strcmp) bere dva řetězce a vrací nulu, pokud se řetězce
rovnají, zápornou hodnotu, pokud je první řetězec menší než ten druhý, a kladnou hodnotu, pokud je
druhý řetězec menší než první.

> Pro porovnávání dvou řetězců nikdy nepoužívejte operátor `==`! Nebude to
> [fungovat](../../caste_chyby/caste_chyby.md#porovnávání-řetězců-pomocí-).

[^5]: Pro porovnávání řetězců se používá [lexikografické uspořádání](https://cs.wikipedia.org/wiki/Lexikografick%C3%A9_uspo%C5%99%C3%A1d%C3%A1n%C3%AD).
Nalezne se první dvojice znaků (zleva), ve kterém se řetězce liší, a tyto dva znaky se porovnají
pomocí jejich číselné (ASCII) hodnoty.

### Vyhledání řetězce v řetězci
Pokud chcete zjistit, jestli se v nějakém řetězci vyskytuje jiný řetězec, můžete použít funkci [`strstr`](https://devdocs.io/c/string/byte/strstr).

### Převod textu na číslo
Často můžete potřebovat převést textový zápis čísla na jeho číselnou hodnotu. K tomu můžete použít například
funkci [`strtol`](https://devdocs.io/c/string/byte/strtol) (*string to long*). První parametr funkce je řetězec, který chcete převést, do druhého parametru
můžete předat ukazatel na ukazatel na znak, do kterého se uloží pozice ve vstupním řetězci těsně za
načteným číslem. Posledním parametrem je soustava, ve které se má číslo načíst (obvykle to bude
desítková soustava, tedy hodnota `10`). Návratovou hodnotou funkce je pak načtené číslo.

Můžete použít také funkci [`atoi`](https://devdocs.io/c/string/byte/atoi), která je trochu
jednodušší na použití, ale při jejím použití nelze zjistit, zdali při konverzi nedošlo k chybě
(například pokud vstupní řetězec nereprezentoval číslo).

### Rozsekání textu dle rozdělovače
Častou úlohou při práci s textem je rozdělení (neboli "rozsekání") jednoho řetězce na několik podřetězců na základě nějakého rozdělovacího znaku, např. mezery, čárky či středníku. Tuto úlohu můžeme naprogramovat "ručně" s pomocí cyklů a operací s ukazateli, nebo můžeme využít funkci [`strtok`](https://devdocs.io/c/string/byte/strtok).

Tato funkce bere dva parametry. Prvním je ukazatel na řetězec, který chceme rozsekat, a druhý je řetězec s rozdělovacími znaky, podle kterých budeme první parametr rozsekávat. Když funkci zavoláme, tak projde vstupní řetězec dokud nenarazí na rozdělovač (nebo na konec řetězce), tento rozdělovač ve vstupním řetězci nahradí znakem `0` (`NUL`), a poté nám vrátí ukazatel na první znak podřetězce před rozdělovačem:

```c
char radek[50] = "ahoj karle jak se mas?";
char* slovo = strtok(radek, " "); // rozděluj podle mezer
// slovo je nyní ukazatel na "ahoj"
```

Pokud poté chceme přistoupit na další kus řetězce za rozdělovačem, musíme zavolat funkci znovu. Abychom však funkci řekli, že má pokračovat v rozsekávání předchozího řetězce, a ne začít pracovat nad novým řetězcem, musíme ji při opakovaném volání předat jako první parametr hodnotu `NULL`! [^strtok]

[^strtok]: Funkce `strtok` si v [globální proměnné](../promenne/globalni_promenne.md) pamatuje, který řetězec zpracovávala naposledy, proto to takto funguje.

```c
char* slovo = strtok(NULL, " ");
// slovo je nyní ukazatel na "karle"
```

V tomto je tato funkce trochu zvláštní, protože při následujících voláních jí musíme předat první parametr `NULL`. 

Jakmile funkce `strtok` *vrátí* hodnotu `NULL`, tak již došla na konec vstupního řetězce, a dál už tedy není co rozsekávat. 

Kompletní ukázka použití funkce `strtok`:

```c,editable,mainbody
#include <stdio.h>
#include <string.h>

int main() {
    char radek[50] = "ahoj karle jak se mas?";
    char* slovo = strtok(radek, " ");
    while (slovo != NULL) {
        printf("Slovo: %s\n", slovo);
        slovo = strtok(NULL, " "); 
    }

    return 0;
}
```

> Tím, že funkce `strtok` upravuje vstupní řetězec, tak jí musíme předávat řetězce, které lze měnit. Nesmíte tak např. volat `strtok` na řetězcovým literálem. Např. tohle je špatně:
> ```c
> const char* text = "ahoj karle";
> strtok(text, " ");
> ```


<hr />

**Cvičení** 🏋

Pro procvičení práce s řetězci si můžete zkusit některé z těchto funkcí sami
naprogramovat. Další úlohy pro práci s řetězci můžete nalézt [zde](../../ulohy/text.md).

<hr />

**Kvíz** 🤔

1) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        const char* str = "hello";

        printf("%c\n", str[3]);
        printf("%c\n", str[2]);
        printf("%c\n", str[1]);

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše:
    ```
    l
    l
    e
    ```
    Jelikož jsou řetězce poli znaků, tak při přistoupení na nějaký index řetězce získáme hodnotu
    datového typu znak.
    </details>
2) Co vypíše následující program?
    ```c,editable,mainbody
    #include <stdio.h>

    int main() {
        const char* str = "hello";
        
        for (int i = 0; i < 5; i++) {
            printf("%c", str[i] - 32);
        }
        printf("\n");

        return 0;
    }
    ```
    <details>
    <summary>Odpověď</summary>

    Program vypíše `HELLO`. Když se podíváte na [ASCII tabulku](https://www.asciitable.com/), tak
    zjistíte, že rozdíl mezi čísly reprezentujícími jednotlivé znaky malé a velké anglické abecedy
    je `32`, a že znaky malé abecedy jsou reprezentovány vyššími čísly. Když tak např. od `'h'`
    odečteme hodnotu `32`, získáme znak `'H'`. Přehlednější by bylo napsat tuto konverzi jako
    `str[i] - ('a' - 'A')` nebo použít funkci [`tolower`](https://devdocs.io/c/string/byte/tolower)
    ze standardní knihovny jazyka *C*.
    </details>
