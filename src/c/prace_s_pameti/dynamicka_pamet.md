# Dynamická paměť
Už víme, že pomocí [automatické paměti](automaticka_pamet.md) na zásobníku nemůžeme alokovat
velké množství paměti a nemůžeme ani alokovat paměť s dynamickou velikostí (závislou na velikosti
vstupu programu). Abychom tohoto dosáhli, tak musíme použít jiný mechanismus alokace paměti, ve
kterém paměť alokujeme i uvolňujeme manuálně.

Tento mechanismus se nazývá **dynamická alokace paměti** (*dynamic memory allocation*). Pomocí několika
funkcí standardní knihovny *C* můžeme naalokovat paměť s libovolnou velikosti. Tato paměť je
alokována v oblasti paměti zvané **halda** (*heap*). Narozdíl od zásobníku, prvky na haldě neleží
striktně za sebou, a lze je tak uvolňovat v libovolném pořadí. Můžeme tak naalokovat paměť libovolné
velikosti, která přežije i ukončení vykonávání funkce, díky čemuž tak můžeme sdílet (potenciálně velká)
data mezi funkcemi. Nicméně musíme také tuto paměť ručně uvolňovat, protože (narozdíl od zásobníku)
to za nás nikdo neudělá.

## Alokace paměti
K naalokování paměti můžeme použít funkci [`malloc`](https://devdocs.io/c/memory/malloc) (*memory
alloc*), která je dostupná v souboru `stdlib.h` ze [standardní knihovny *C*](../funkce/stdlib.md).
Tato funkce má následující signaturu[^1]:
```c
void* malloc(size_t size);
```

[^1]: Datový typ [`size_t`](https://devdocs.io/c/types/size_t) reprezentuje bezznaménkové
celé číslo, do kterého by měla jít uložit velikost největší možné hodnoty libovolného typu. Často
se používá pro indexaci [polí](../pole/pole.md) nebo právě určování velikosti (např. alokací).

### Velikost alokované paměti
Parametr `size` udává, kolik bytů paměti se má naalokovat. Tuto velikost můžeme "tipnout"
manuálně, nicméně to není moc dobrý nápad, protože bychom si museli pamatovat velikosti datových
typů (přičemž jejich velikost se může lišit v závislosti na použitém operačním systému či
překladači!). Abychom tomu předešli, tak můžeme použít operátor `sizeof`, kterému můžeme předat datový
typ[^2]. Tento výraz se poté vyhodnotí jako velikost daného datového typu:
```c,editable,mainbody
#include <stdio.h>
int main() {
    printf("Velikost int je: %lu\n", sizeof(int));
    printf("Velikost int* je: %lu\n", sizeof(int*));
    return 0;
}
```

[^2]: Případně výraz, v tom případě si `sizeof` vezme jeho datový typ.

Návratový typ `void*` reprezentuje ukazatel na libovolná data. Funkce `malloc` musí fungovat pro
alokaci libovolného datového typu, proto musí mít jako návratový typ právě univerzální ukazatel
`void*`. Při zavolání funkce `malloc` bychom měli tento návratový typ
[přetypovat](../datove_typy/konverze.md) na ukazatel na datový typ, který alokujeme.

Při zavolání `malloc`u dojde k naalokování `size` bytů na haldě. Adresa prvního bytu této
naalokované paměti se poté vrátí jako návratová hodnota `malloc`u. Zde je ukázka programu, který
naalokuje paměť pro jeden `int` ve funkci, adresu naalokované paměti poté vrátí jako návratovou
hodnotu a naalokovaná paměť je poté přečtena ve funkci `main`:
```c,editable
#include <stdlib.h>
#include <stdio.h>

int* naalokuj_pamet() {
    int* pamet = (int*) malloc(sizeof(int));
    *pamet = 5;
    return pamet; 
}
int main() {
    int* pamet = naalokuj_pamet();
    printf("%d\n", *pamet);

    free(pamet); // uvolnění paměti, vysvětleno níže

    return 0;
}
```

<details>
  <summary>Interaktivní vizualizace kódu</summary>

  <iframe width="750" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=%23include%20%3Cstdlib.h%3E%0A%0Aint*%20naalokuj_pamet%28%29%20%7B%0A%20%20%20%20int*%20pamet%20%3D%20%28int*%29%20malloc%28sizeof%28int%29%29%3B%0A%20%20%20%20*pamet%20%3D%205%3B%0A%20%20%20%20return%20pamet%3B%20%0A%7D%0Aint%20main%28%29%20%7B%0A%20%20%20%20int*%20pamet%20%3D%20naalokuj_pamet%28%29%3B%0A%20%20%20%20printf%28%22%25d%5Cn%22,%20*pamet%29%3B%0A%20%20%20%20return%200%3B%0A%7D%0A&codeDivHeight=400&codeDivWidth=350&curInstr=8&origin=opt-frontend.js&py=c_gcc9.3.0&rawInputLstJSON=%5B%5D"> </iframe>
</details>

### Iniciální hodnota paměti
Stejně jako u [lokálních proměnných](../promenne/promenne.md#vždy-inicializujte-proměnné), i u
dynamicky naalokované paměti platí, že její hodnota je zpočátku nedefinovaná. Než se tedy hodnotu
dané paměti pokusíte přečíst, musíte jí nainicializovat zápisem nějaké hodnoty! Jinak bude program
obsahovat [nedefinované chování](../../ruzne/nedefinovane_chovani.md) 💣.

Pokud byste chtěli, aby naalokovaná paměť byla rovnou při alokaci vynulována (všechny byty
nastavené na hodnotu `0`), můžete místo funkce `malloc` použít funkci
[`calloc`](https://devdocs.io/c/memory/calloc)[^3]. Případně můžete použít užitečnou funkci
[`memset`](https://devdocs.io/c/string/byte/memset), která vám vyplní blok paměti zadaným bytem.

[^3]: Pozor však na to, že tato funkce má jiné parametry než `malloc`. Očekává počet hodnot, které
se mají naalokovat, a velikost každé hodnoty.

## Uvolnění paměti
S velkou mocí přichází i velká [zodpovědnost](https://citaty.net/citaty/1957976-stan-lee-s-velkou-moci-prichazi-velka-odpovednost/),
takže při použití dynamické paměti sice máme více možností, než při použití automatické paměti
(resp. zásobníku), ale zároveň **MUSÍME** tuto paměť korektně uvolňovat (což se u automatické paměti
provádělo automaticky). Pokud bychom totiž paměť neustále pouze alokovali a neuvolňovali, tak by nám
[brzy došla](../../caste_chyby/pametove_chyby.md#memory-leak).

Abychom paměť naalokovanou pomocí funkcí `malloc` či `calloc` uvolnili, tak musíme použít funkci
[`free`](https://devdocs.io/c/memory/free):
```c,editable
#include <stdlib.h>

int main() {
    int* p = (int*) malloc(sizeof(int)); // alokace paměti
    *p = 0;                              // použití paměti
    free(p);                             // uvolnění paměti

    return 0;
}
```

Jako argument této funkci musíme předat ukazatel navrácený z volání `malloc`/`calloc`. Nic jiného
do této funkce nedávejte, uvolňovat můžeme pouze dynamicky alokovanou paměť! Nevolejte `free` s
adresami např. lokálních proměnných[^4].

[^4]: Je však bezpečné uvolnit "nulový ukazatel", tj. `free(NULL)` je validní (v tomto případě funkce nic neudělá).

Jakmile se paměť uvolní, tak už k této paměti nesmíte přistupovat! Pokud byste se pokusili přečíst
nebo zapsat uvolněnou paměť, tak dojde k [nedefinovanému chování](../../ruzne/nedefinovane_chovani.md) 💣.
Nesmíte ani paměť uvolnit více než jednou.

Při práci s dynamicky alokovanou pamětí tak dbejte zvýšené opatrnosti a ideálně používejte při
vývoji [Address sanitizer](../../prostredi/ladeni.md#address-sanitizer). (Neúplný) seznam věcí,
které se můžou pokazit, pokud kombinaci dynamické alokace a uvolňování paměti pokazíte, naleznete
[zde](../../caste_chyby/pametove_chyby.md).

## Alokace více hodnot zároveň
Jak jste si mohli všimnout ze signatury funkce `malloc`, můžete jí dát libovolný počet bytů.
Nemusíte se tak omezovat velikostí základních datových typů, můžete například naalokovat paměť pro
5 `int`ů zároveň, které poté budou ležet za sebou v paměti a bude tak jednoduché k nim přistupovat
v cyklu. Jak tento koncept funguje se dozvíte v sekci o
[dynamických polích](../pole/dynamicka_pole.md).

## Kdy použít dynamicky alokovanou paměť?
Řiďte se pravidlem, že pokud lze použít [automatickou paměť](automaticka_pamet.md) na zásobníku,
tak ji využijte a `malloc` nepoužívejte. Až v momentě, kdy z nějakého důvodu nebude stačit naalokovat
paměť na zásobníku, tak se obraťe na `malloc`.

Seznam situací, ve kterých se může dynamická paměť hodit, se
[nachází](automaticka_pamet.md#nevýhody-automatické-paměti) v sekci o automatické paměti.

<hr />

**Kvíz** 🤔

Podívejte se na sekci o [paměťových chybách](../../caste_chyby/pametove_chyby.md) pro příklad toho,
co všechno se může při práci s dynamickou pamětí a ukazateli pokazit.
