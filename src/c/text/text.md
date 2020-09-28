# Text
Tato sekce je ve výstavbě 🚧.

<!--## Práce s dynamicky alokovanou pamětí a řetězci znaků (string)

Typická literatura se zabývá prací s dynamicky alokovanou pamětí až v
pozdějších kapitolách. Dovolme si lehký komentář, když vyslovíme
tvrzení, že ,,pak jsou z toho všichni ztraceni”. Zkusme se tedy podívat
na práci s dynamicky alokovanou pamětí hned na začátku, aby nás pak
práce s ní zbytečně nepřekvapovala.

Doposud jsme viděli vytváření celočíselných proměnných, které
reprezentují jedno číslo. Co když ale potřebujeme, aby bylo těchto čísel
více? Odpověď je snadná. Použijeme dynamicky alokované pole čísel. (Ano,
i staticky alokované pole je možnost, ale nesmí být příliš veliké
(dlouhé)). Na druhou stranu, dynamicky alokované pole by zase nemělo být
příliš krátké.

Při programování v jazyce *C* máme k dispozici dva druhy paměti. Jsou to:
**stack** (česky **zásobník**) a **heap** (česky **halda**). Když jsme
definovali celočíselné promenné v předchozí části, jejich obsah
(hodnoty) se ukládal na stacku. Programům je však k dispizici jen
omezený stack (např. 32 MB). Když chceme využívat v našich programech
více paměti, musíme použít heap.

Pro to, abychom si od operačního systému (OS) vyžádali nějakou paměť na
heapu, používáme funkci `malloc`, která nám vrátí pointer (ukazatel) na začátek
takovéto paměti. Zajisté znáte anglické tvrzení: ,,There’s nothing like
a free lunch”. I za takto poskytnutou paměť se nějakým způsobem platí.
Jazyk *C* nemá automatickou správu paměti, a proto ji musíme vlastnoručně
OS vrátit, když ji již nepotřebujeme. K tomu nám slouží funkce `free`
(jak příznačný název).

Pojďme se podívat na příklady použití. Stringy (řetězce znaků) jsou
typickým příkladem, kdy potřebujeme nějaké pole pro reprezentaci více
hodnot (třeba nějakých vět, ale také často textových dat).

```c
char c = 'A';  // umoznuje reprezentaci pouze jednoho znaku
char * str = NULL;
str = (char *)malloc( 20 * sizeof( str[ 0 ] ) );

sprintf( str, "Hello, World!" );

printf( "str: '%s'\n", str ); // str: 'Hello, World!'
printf( "str length: %d\n", strlen( str ) ); // 13

free( str ); // pointer na str jiz nepotrebuji, vracim pamet

str = NULL;  // jsem slusny a pointer nastavim na NULL,
             // aby bylo jasne, ze nikam neukazuje
```

To, že budeme chtít pracovat s dynamicky alokovanou pamětí, musíme
jazyku *C* řící tak, že deklarace proměnné bude pointerem, který bude
ukazovat na takovou paměť. To zajistíme jednoduše tak, že před název
proměnné napíšeme znak `*`. Funkce `malloc` nám vrací tzv. pointer na úsek paměti o
velikosti, kterou jsme chtěli. Pokud nám OS paměť nepřidělí, vrátí
funkce pointer na tzv. `NULL`. Toto bychom měli řádně zkontrolovat, ale pro
přehlednost příkladu to není uvedeno. Velikost paměti, kterou od OS
požadujeme se uvádí v bytech (česky bajtech). Každý datový typ vyžaduje
pro uložení informace nějaký počet bytů. Nejměnší datový typ `char` požaduje 4
byty. Typ `int`, pro uložení celých čísel, vyžaduje typicky 4 byty. Reálná
čísla uložená v typu `float` vyžadují 4 byty a reálná čísla uložená v typu `double`
vyžadují 8 bytů. Každá platfroma, na které bude náš program přeložen
však může datovým typům přiřadit jiný počet bytů. Abychom si nemuseli
pamatovat, kolik bytů jaký typ zabírá, existuje v jazyce *C* operátor `sizeof`,
který nám vrátí, kolik bytů zadaný typ vyžaduje. Potom již jen toto
číslo stačí přenásobit požadovanou délkou pole. V našem příkladu
požadujeme délku řetězce 20 znaků. Jazyk *C* nebyl zcela jistě konstruován
pro práci se stringy... Pro to, abychom naše pole znaků naplnili nějakým
obsahem, musíme použít funkci `sprintf`. Ta bere jako první parametr ukazatel na
paměť, kde má řetězec uložit, druhým parametrem je pak jaký řetězec se
má vložit. Případný třetí parametr pak může obsahovat proměnné, jejichž
obsah chceme vložit do formátovacího řetězce. Obsah proměnné `str` je pak
tištěn ve funkci `printf`. Délku řetězce je možno zjistit funkcí `strlen`, která vrací
délku řetězce jako celé číslo. Po ukončení práce s dynamicky alokovanou
pamětí je třeba jí vrátit zpět OS. To se provede voláním funkce `free`, která
bere jako argument pointer na dynamicky alokovanou paměť. V našem
případě je to `str`. Bývá ještě dobrým zvykem, abychom takto uvolněný pointer
nastavili na `NULL`. Takto nastavený pointer jasně říká, že neukazuje na
žádnou paměť.
-->
