# Časté chyby
V této sekci najdete často se vyskytující chyby, na které můžete narazit, spolu s návodem, jak je
vyřešit.

### Záměna `=` a `==`
- Operátor `=` [přiřazuje](../c/promenne.md#zápis) hodnotu do svého levého operandu a vyhodnotí se s
hodnotou pravého operandu.
- Operátor `==` [porovnává](../c/pravdivostni_typy.md#porovnávání-hodnot) dvě hodnoty a vyhodnotí
se jako pravdivostní hodnota `bool`.

Je důležité tyto operátory nezaměňovat! Oba dva operátory jsou výrazy, takže se v něco vyhodnotí a
i když je použijete špatně, tak často nedostanete chybovou hlášku, což jejich záměnu dělá ještě
nebezpečnější.

```c
int a = 0;
a = 5; // nastaví hodnotu `5` do proměnné `a`
a == 5; // porovná `a` s hodnotou `5`, vrátí hodnotu `true`, ale nic se neprovede

// podmínka se provede, pokud se `a` rovná `5`
if (a == 5) {}

// podmínka se provede vždy, výraz `a = 5` se vyhodnotí na `5` (`true`)
// zároveň při provedení podmínky se přepíše hodnota proměnné `a` na `5`
if (a = 5) {}
```

### Záměna `&` s `&&` nebo `|` s `||`
- Operátor `&` provádí [bitový součin](../c/celociselne_typy.md#tabulka-aritmetických-operátorů),
očekává jako operandy celá čísla (např. `int`) a vrací celé číslo.
- Operátor `&&` provádí [logický součin](../c/pravdivostni_typy.md#tabulka-logických-operátorů),
očekává jako operandy pravdivostní hodnoty (`bool`) a vrací pravdivostní hodnotu.

Je důležité tyto operátory nezaměňovat. Jelikož `bool` lze implicitně převést na celé číslo a naopak,
záměna těchto operátorů opět typicky nepovede k chybě při překladu, nicméně program nejspíše při
jejich záměně nebude fungovat tak, jak má. Operátor `&` má zároveň větší
[přednost](https://en.cppreference.com/w/c/language/operator_precedence) než `&&`, takže se výraz
s tímto operátorem může vyhodnotit jinak, než očekáváte. Obdobná situace platí i u dvojice
operátorů `|` (bitový součet) a `||` (logický součet).

```c
int a = 3;
a & 4; // `0` 
a && 4; // `true`

// stejné jako a > (5 & a) < 6
if (a > 5 & a < 6) {}
```

### Záměna `'` s `"`
- Apostrof (`'`) slouží k zapsání (jednoho) [znaku](../c/znaky.md). Neukládejte do něj více znaků či celý text.
- Uvozovky (`"`) slouží k zapsání [řetězce](../c/text.md), tj. pole znaků ukončeného hodnotou `0`.

```c
char a = 'asd'; // špatně, více znaků v ''
char a = "asd"; // špatně, ukládáme řetězec do typu `char` (mělo by být `const char*`)

char a = 'x';               // správně
const char* str = "hello";  // správně
```

### Špatná práce s ukazatelem
[Ukazatele](../c/ukazatele.md) jsou čísla, která interpretujeme jako
[adresy v paměti](../uvod/pamet.md). Můžete s nimi sice provádět některé aritmetické operace
(například sčítání či odčítání), nicméně v takovém případě provádíte výpočet s adresou, ne s
hodnotou, která je na dané adrese uložena.

Například v této funkci, která by měla přičíst hodnotu `x` k paměti na adrese `ptr`, musíte
nejprve přistoupit k hodnotě na dané adrese (`*ptr`), a až k této hodnotě pak přičíst `x`:
```c
void pricti_hodnotu(int* ptr, int x) {
    ptr += x;   // špatně, přičteme `x` k adrese `ptr`
    *ptr += x;  // správně, přičteme `x` k hodnotě na adrese `ptr` 
}
``` 
