# Proměnné
Aby programy mohly řešit nějaký úkol, tak si téměř vždy musí umět něco zapamatovat. K tomu
slouží tzv. **proměnné** (*variables*). Proměnné nám umožňují pracovat s pamětí intuitivním způsobem -
část paměti si pojmenujeme nějakým jménem a dále se na ni tímto jménem odkazujeme. Proměnné můžou
uchovávat libovolnou hodnotu a také ji v průběhu programu měnit. Příklady použití
proměnných:
- Ve webové aplikaci si číselná proměnná pamatuje počet návštěvníků. Při zobrazení stránky
se hodnota proměnná zvýší o 1.
- Ve hře si číselná proměnná pamatuje počet životů hráčovy postavy. Pokud dojde k zásahu postavy
nepřítelem, tak se počet životů sníží o zranění (*damage*) nepřítelovy zbraně. Pokud hráč sebere lékárníčku,
tak se počet jeho životů opět zvýší.
- V terminálu si proměnná reprezentující znaky pamatuje text, který byl zadán na klávesnici.

Proměnné jsou jedním z nejzákladnějších a nejčastějších stavebních kamenů většiny programů, během
semestru se s nimi budeme setkávat neustále. Není tak náhodou, že jedním z nejzákladnějších příkazů
v *C* je právě vytvoření proměnné. Tím řekneme počítači, aby vyčlenil (tzv. **naalokoval**) místo v paměti,
které si v programu nějak pojmenujeme a dále se na něho pomocí jeho jména můžeme odkazovat[^1].

[^1]: O tom, jak přesně tato alokace paměti probíhá, se dozvíte později v sekci o
[ukazatelích](ukazatele.md).

### Deklarace a platnost
Takto vypadá **deklarace** (vytvoření) jednoduché proměnné s názvem `age`:
```c
int age;
```
Jakmile proměnnou nadeklarujeme, tak z ní můžeme buď číst anebo zapisovat paměť, kterou tato proměnná
reprezentuje, pomocí jejího názvu (zde `age`).

Proměnná je platná (lze ji používat) vždy od místa
deklarace do konce **bloku**, ve kterém byla nadeklarována. Bloky jsou kusy kódu ohraničené složenými
závorkami (`{` a `}`):
```c
int main() {
    int a;

    {
        // zde je platné pouze `a`
        int b;
        // zde je platné `a` i `b`
    } // zde končí platnost proměnné `b`

    // zde je platné pouze `a`

    return 0;
} // zde končí platnost proměnné `a`
```

### Datový typ
`int` před názvem proměnné udává její datový typ, o kterém pojednává [následující sekce](datove_typy.md).
Prozatím si řekněme, že `int` je zkratka pro `integer`, tedy celé číslo. Tím říkáme programu, že má
tuto proměnnou (resp. paměť, kterou proměnná reprezentuje) interpretovat jako celé číslo se znaménkem.

### Inicializace
Do proměnné bychom měli při jejím vytvoření rovnou uložit nějaký *výraz*, který musí být stejného
datového typu jako je typ proměnné:
```c
int points_a = 10;
int points_b = 10 + 15;
```
Obecná syntaxe pro deklaraci proměnné je

`<datový typ> <název>;`

popřípadě

`<datový typ> <název> = <výraz>;`

pokud použijeme inicializaci.

> Všimněte si, že na konci deklarace proměnné vždy musí následovat středník (**;**).
> Opomenutí středníku na konci příkazu je velmi častá chyba, která často končí těžko srozumitelnými chybovými
> hláškami při překladu. Dávejte si tak na středníky pozor, obzvláště ze začátku.

#### Vždy inicializujte proměnné!
Je opravdu důležité do proměnné vždy při její deklaraci přiřadit nějakou úvodní hodnotu. Pokud to
neuděláme, tak její hodnota bude **nedefinovaná** (*undefined*), což v praxi znamená, že může být
jakákoliv a při každém spuštění programu se může lišit. Čtení hodnoty takovéto nedefinované proměnné
způsobuje **nedefinované chování** (*undefined behaviour*) programu. Pokud k tomu dojde, tak si překladač
s vaším programem může udělat, co se mu zachce, a váš program se poté může chovat nepředvídatelně.

**Proto vždy dávejte proměnným iniciální hodnotu!**

### Čtení
Pokud v programu použijeme název platné proměnné, tak dojde k načtení její hodnoty.
Pokud použijeme název proměnné v programu na místě, kde je očekáván výraz, tak se vyhodnotí jako
současná hodnota proměnné:
```c
int main() {
    int a = 5;
    int b = a;  // hodnota `b` je 5
    int c = b + a + 1;  // hodnota `c` je 11
}
```

Kdekoliv tak můžete použít výraz, můžete použít i proměnnou (pokud sedí datové typy). Pro výpis hodnot
proměnných na výstup programu můžete `printf`. Hodnoty proměnných můžete zkoumat také krokováním
pomocí [debuggeru](../prostredi/ladeni.md#krokování).

### Zápis
Pokud by proměnná měla pouze svou původní hodnotu, tak by nebyla moc užitečná. Hodnoty proměnných
naštěstí jde měnit. Můžeme k tomu použít další typ *C* příkazu, tzv. přiřazení (**assignment**):
```c
int main() {
    int a = 5;  // hodnota `a` je 5
    a = 8;      // hodnota `a` je 8
}
```
Obecná syntaxe pro přiřazení do proměnné je

`<název proměnné> = <výraz>;`

Opět musí platit, že výraz musí být stejného typu[^2], jako je proměnná, do které přiřazujeme. Na konci
řádku také nesmí chybět středník.

[^2]: *C* umožňuje automatické (tzv. **implicitní**) konverze mezi některými datovými typy, takže typ výrazu
nemusí být nutně vždy stejný. Tyto konverze se nicméně často chovají neintuitivně a překladač vás před nimi
obvykle nijak nevaruje, i když vrátí výsledek, který nedává smysl. Snažte se tak ze začátku opravdu vždy
používat odpovídající typy. Více se dozvíte v sekci o [datových typech](datove_typy.md). 

Jak přiřazení funguje? Počítač se podívá, na jaké adrese v paměti daná proměnná leží, a zapíše do
paměti hodnotu výrazu, který do proměnné zapisujeme, čímž změní její hodnotu v paměti. Z toho vyplývá,
že dává smysl zapisovat hodnoty pouze do něčeho, co má adresu v paměti (prozatím známe pouze proměnné,
později si ukážeme další věci, do kterých lze zapisovat). Například příkaz `5 = 8;` nedává smysl. `5`
je výraz, číselná hodnota, která nemá žádnou adresu v paměti, nemůžeme tak do ní nic zapsat. Stejně tak
nedává moc smysl říct `Číslo 5 odteď bude mít hodnotu 8`.

**Cvičení**: Zkuste napsat program, který vytvoří několik proměnných, přečte a změní jejich hodnoty
a pak je vypíše na výstup programu (k výpisu využijte `printf`, který jsme si již ukázali [dříve](prikazy_vyrazy.md#výpis-výrazů)).

### Pojmenovávání proměnných
V C existují určitá pravidla pro pojmenování proměnných:
- Proměnné se nesmí jmenovat stejně jako [klíčová slova](syntaxe.md#klíčová-slova), jinak by
překladač neuměl rozlišit, co je název proměnné a co klíčové slovo (například u `int int;`).
- Název proměnné může obsahovat pouze malá (`a-z`) a velká (`A-Z`) písmena anglické abecedy, číslice
(`0-9`) a podtržítko (`_`).
- Název proměnné nesmí začínat číslicí, tj. `5x` není validní název proměnné.

V programech je nutné neustálě přiřazovat něčemu název, což zdaleka není tak jednoduché, jak se
může na první pohled zdát. Kromě výše zmíněných pravidel je zároveň vhodné volit názvy tak, aby byly
přehledné pro vás (a ostatní programátory, kteří váš zdrojový kód budou číst). Názvy proměnných jako
`a` nebo `x` jsou nicneříkající a kód s podobnými názvy je pak složitější pochopit. Porovnejte
následující dva úseky kódu, které se liší pouze v použitých názvech proměnných:
```c
int c = 1337;
int x = c - y;
int d = x * z;

// nebo

int zakladni_cena = 1337;
int zlevnena_cena = zakladni_cena - sleva;
int finalni_cena = zlevnena_cena * dph;
``` 
I když je druhá varianta delší, tak jde okamžitě poznat, co program počítá, narozdíl od první varianty.

#### Víceslovné názvy
Existuje několik zaběhlých stylistických způsobů pro zápis názvů v C, které obsahují více slov. Zde
je seznam nejpoužívanějších konvencí:
- `Camel case`: `mujUcet`, `prvniKlikUzivatele`
- `Pascal case`: `MujUcet`, `PrvniKlikUzivatele`
- `Snake case`: `muj_ucet`, `prvni_klik_uzivatele`
- `Screaming snake case`: `MUJ_UCET`, `PRVNI_KLIK_UZIVATELE`

Různé konstrukce C můžou využívat různé styly, například častá konvence je použití `snake_case`
pro názvy proměnných a [funkcí](funkce.md) a `PascalCase` pro názvy [struktur](struktury.md).
Který styl budete používat záleží na vaší osobní preferenci, nicméně důležité je zejména držet se
jednotného stylu a nekombinovat různé styly (pro jednotlivé typy konstrukcí) v jednom programu.
