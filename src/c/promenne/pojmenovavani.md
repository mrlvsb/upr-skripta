# Pojmenovávání proměnných
V C existují určitá pravidla pro pojmenování proměnných:
- Proměnné se nesmí jmenovat stejně jako [klíčová slova](../syntaxe.md#klíčová-slova), jinak by
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

### Víceslovné názvy
Existuje několik zaběhlých stylistických způsobů pro zápis názvů v C, které obsahují více slov. Zde
je seznam nejpoužívanějších konvencí:
- `Camel case`: `mujUcet`, `prvniKlikUzivatele`
- `Pascal case`: `MujUcet`, `PrvniKlikUzivatele`
- `Snake case`: `muj_ucet`, `prvni_klik_uzivatele`
- `Screaming snake case`: `MUJ_UCET`, `PRVNI_KLIK_UZIVATELE`

Různé konstrukce C můžou využívat různé styly, například častá konvence je použití `snake_case`
pro názvy proměnných a [funkcí](../funkce/funkce.md) a `PascalCase` pro názvy [struktur](../struktury/struktury.md).
Který styl budete používat záleží na vaší osobní preferenci, nicméně důležité je zejména držet se
jednotného stylu a nekombinovat různé styly (pro jednotlivé typy konstrukcí) v jednom programu.

### Čeština nebo angličtina?
Pokud vám to přijde přehlednější, tak ze začátku můžete používat české názvy[^1] pro názvy proměnných
a dalších prvků. Může tak pro vás být snadnější odlišit, kterou část kódu jste vytvořili vy (ta bude
mít český název), a co je naopak vestavěná součást *C* (např. `int`). 

[^1]: Bez diakritiky.

Nicméně, jak už bylo uvedeno v [úvodu](../../uvod/uvod.md), primárním jazykem programování je
angličtina. Pokud byste se někdy setkali s cizím kódem a museli ho pochopit či upravit, určitě oceníte,
když bude v angličtině, než kdyby byl například ve finštině. Stejně tak pokud budete sdílet svůj
kód online, můžete s ním oslovit mnohem širší skupinu programátorů, když bude v angličtině, než kdyby
byl v češtině.

Jakmile se tedy v programování trochu aklimatizujete, používejte ve všech svých programech raději
anglické názvy.
