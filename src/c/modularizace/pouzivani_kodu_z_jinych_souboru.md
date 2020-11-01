# Používání kódu z jiných souborů
Nyní už víme, jak přeložit program skládající se z více jednotek překladu (zdrojových souborů) a
následně tyto jednotky spojit dohromady pomocí linkeru. V této sekci si ukážeme, jak můžeme použít
kód, který existuje v jiném zdrojovém souboru.

Pokud chceme zavolat funkci, kterou jsme napsali v jiném souboru, můžeme ji prostě zavolat a linker
se postará o zbytek:
```c
// soubor1.c
int main() {
    moje_funkce();
    return 0;
}

// soubor2.c
void moje_funkce() {}
```
Pokud tyto dva soubory přeložíme a poté slinkujeme, tak se zavolá správná funkce:
```bash
$ gcc -c soubor1.c
$ gcc -c soubor2.c
$ gcc soubor1.o soubor2.o -oprogram
```

Nicméně, pokud bychom používali kód z jiných souborů takto "naslepo", narazili bychom na několik
problémů. Tím, že překladač v souboru `soubor1.c` nemá přístup k popisu funkce `moje_funkce`, tak
nemůže ověřit, jestli jsme jí předali správné počet argumentů se správnými datovými typy, a ani
neví, jaká je návratová hodnota této funkce. Tento přístup navíc nebude vůbec fungovat pro použití
globálních proměnných (při pokusu o použití neexistující proměnné by překladač ohlásil chybu).

## Deklarace vs definice
Ideálně bychom potřebovali překladači říct, jak bude kód, který chceme použít, vypadat -- jaký bude
datový typ a název globální proměnné, popř. jaké budou parametry, návratový typ a název funkce.
Toho můžeme dosáhnout pomocí tzv. **deklarace** (*declaration*).

Deklarace "slibuje", že bude v programu existovat nějaká proměnná či funkce s konkrétním názvem a
typem, ale neříká, kde bude tato proměnná či funkce vytvořena (může to být například v jiném
zdrojovém souboru). Samotné vytvoření funkce či proměnné se nazývá **definice** (*definition*).
Zatím jsme tedy prováděli vždy definice funkcí i proměnných, nyní si ukážeme, jak vytvořit deklaraci.

Deklaraci funkce provedeme tak, že zadáme její [signaturu](../funkce/funkce.md#syntaxe), ale ne její
tělo:
```c
int funkce(int a, int b);           // deklarace funkce
int funkce(int a, int b) { ... }    // definice funkce
```

Deklaraci globální proměnné lze provést tak, že před ní dáme klíčové slovo `extern`[^1]:
```c
extern int promenna;    // deklarace proměnné
int promenna;           // definice proměnné
```

[^1]: Toto klíčové slovo můžeme použít i před deklarací funkce, nicméně není to potřeba, `extern` je
na tomto místě předpokládáno implicitně.

> Při sdílení kódu napříč soubory má smysl se bavit pouze o
> [globálních proměnných](../promenne/globalni_promenne.md). Lokální proměnné lze totiž používat vždy
> pouze v jejich funkci.

Díky deklaracím tak můžeme v jednom zdrojovém souboru určit, jak mají vypadat funkce/proměnné, které
chceme používat, aby překladač mohl provádět kontrolu datových typů. Linker pak během linkování použije
správné proměnné/funkce z odpovídajících zdrojových souborů. Více o tom, kde a jak deklarace vytvářet,
se dozvíme v příští sekci o [hlavičkových souborech](hlavickove_soubory.md).

## Jednoprůchodový překlad
Z historických důvodů překladače *C* fungují v tzv. jednoprůchodovém režimu (*one-pass compilation*).
Znamená to, že překladač "čte" náš zdrojový kód shora dolů, a v momentě, kdy chceme například použít
nějakou funkci nebo proměnnou, tak již překladač dříve musel vidět (alespoň) její deklaraci, popř.
rovnou i definici.

Například v následujícím programu:
```c
void funkce1() {
    funkce2();
}
void funkce2() {}
```
si překladač bude stěžovat na to, že na řádku 2 nezná funkci `funkce2`, protože tato funkce je v
souboru nadefinovaná až po funkci `funkce1`, která ji používá:
```
test.c: In function ‘funkce’:
test.c:2:5: warning: implicit declaration of function ‘funkce2’;
    2 |     funkce2();
```
Pokud tedy potřebujeme nadefinovat funkci na pozdějším místě, než je její první použití, můžeme
nejprve vytvořit její deklaraci a až později (popř. v úplně jiném souboru) vytvořit její definici:
```c
void funkce2();     // deklarace

void funkce1() {
    funkce2();
}
void funkce2() {}   // definice
```
Takovýto program už se přeloží bez varování. Koncept deklarování funkcí či proměnných v
jednoprůchodových překladačích se nazývá **dopředná deklarace** (*forward declaration*).

## Pravidlo jedné definice
V *C* platí tzv. **pravidlo jedné definice** (*one definition rule*). Každá proměnná i funkce musí
být v programu *nadefinována* právě jednou (deklarována může být vícekrát). To platí jak v rámci
jednoho souboru, tak v rámci celého programu (tj. napříč všemi zdrojovými soubory).
- Pokud bychom proměnnou či funkci pouze nadeklarovali a/nebo použili bez definice:
    ```c
    // soubor.c
    void funkce();
    
    int main() {
        funkce();
        return 0;
    }
    ```
    Tak by kompilace selhala v době linkování, protože by nenašel žádnou funkci/proměnnou, kterou
    by mohl použít:
    ```bash
    $ gcc -c soubor.c
    $ gcc soubor.o
    /usr/bin/ld: test.o: in function `main':
    test.c:(.text+0xe): undefined reference to `funkce'
    collect2: error: ld returned 1 exit status
    ```
- Pokud bychom naopak nadefinovali proměnnou či funkci více než jednou:
    ```c
    // soubor1.c
    void funkce() {}

    int main() {
        funkce();
        return 0;
    }
    // soubor2.c
    void funkce() {}
    ```
    Tak by linkování opět selhalo, protože by linker nevěděl, kterou definici použít:
    ```bash
    $ gcc -c soubor1.c
    $ gcc -c soubor2.c
    $ gcc soubor1.o soubor2.o
    /usr/bin/ld: soubor2.o: in function `funkce':
    soubor2.c:(.text+0x0): multiple definition of `funkce'; test.o:test.c:(.text+0x0): first defined here
    collect2: error: ld returned 1 exit status
    ```

## Viditelnost funkcí a proměnných
Z jiných souborů lze používat pouze funkce a proměnné, které jsou *veřejné*. Implicitně jsou
všechny funkce i všechny globální proměnné veřejné. Pokud byste chtěli zamezit tomu, aby mohly
ostatní soubory používat nějakou funkci nebo globální proměnnou, můžete ji označit klíčovým slovem
`static`, abyste z nich udělali *soukromé* funkce či proměnné:
```c
static void soukroma_funkce() {}
static int soukroma_promenna;
```
Takovéto funkce a proměnné půjde používat pouze v souboru, ve kterém byly nadefinovány. Doporučujeme
`static` používat pro označení proměnných a funkcí, které nechcete sdílet se zbytkem programu. Půjde
tak na první pohled poznat, které funkce jsou určeny k použití z jiných souborů a které ne[^2].

[^2]: Použití `static` také může v určitých případech vést k vygenerování efektivnějšího kódu a
menší velikosti výsledného spustitelného souboru.

> Klíčové slovo `static` lze také použít u lokálních proměnných, zde má ovšem úplně jiný význam než
> u globálních proměnných! Použití `static` u lokální proměnné z ní udělá globální proměnnou, kterou
> ovšem půjde použít pouze ve funkci, ve které je vytvořena. Takováto proměnná se nainicializuje, když
> se program poprvé dostane k řádku s její definicí. Proměnná bude existovat po celou dobu běhu
> programu a udrží si svou hodnotu i po skončení volání funkce:
> ```c,editable
> #include <stdio.h>
> 
> void test() {
>   static int x = 0;
>   x += 1;
>   printf("%d\n", x);
> }
> 
> int main() {
>   test();
>   test();
>   return 0;
> }
> ```
