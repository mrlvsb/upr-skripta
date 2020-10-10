# Pole

## Naplnění pole
Vytvořte funkci `fill_array`, která naplní pole `array` čísly zvětšujícími se po `increment` a
začínajícími od `start`. 
```c
void fill_array(int* array, int len, int start, int increment);
```

<upr-array-fill></upr-array-fill>

## Počítání výskytů čísla
Vytvořte funkci `num_count`, která spočítá a vrátí počet výskytů čísla `num` v poli `array`.
```c
int num_count(int* array, int len, int num);
```

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="4" to="4"></upr-array-interval>


## Počítání čísel v intervalu
Vytvořte funkci `in_interval`, která spočítá počet čísel z uzavřeného intervalu `[from, to]` v poli
 `array`.
```c
int in_interval(int* array, int len, int from, int to);
```

<upr-array-interval array="[10, 2, 4, 3, 4, 8, 9, 4]" from="2" to="5"></upr-array-interval>

## Průměrná hodnota
Vytvořte funkci `average`, která spočítá průměr čísel v poli `array`.
```c
double average(int* array, int len);
```
Při dělení nezapomeňte přetypovat alespoň jeden operand na typ `double`, aby nedošlo k
celočíselnému dělení.

## Minimální hodnota v poli
Vytvořte funkci, která v poli `array` nalezne minimální hodnotu.

```c
int array_min(int *array, int len);
```

<upr-array-min array="[3, 5, 2, 8, 7, 1, 3]"></upr-array-min>

Následně funkci upravte, aby funkce vrátila pomocí ukazatele první index s minimální hodnotou.
```c
int array_min(int *array, int len, int *min_index);
```

## Minimální a maximální hodnota
Předchozí funkci upravte, aby hledala minimum a maximum zároveň.
Nalezené extrémy vraťte pomocí ukazatelů `min` a `max`.

```c
void min_max(int* array, int len, int *min, int *max);
```
Ve funkci si nejprve nastavte index minimální a maximální hodnoty na nultý prvek.
Parametr `min` je ukazatel, a je tedy nutné přistupovat k jeho hodnotě pomoci dereference - `*min`,
protože výraz `min` obsahuje pouze adresu, kde je minimální index uložen. Následně projděte
pole a pokud bude hodnota aktuálního prvku menší než hodnota prvku na dosud nalezeném indexu,
nastavte hodnotu minimálního indexu na aktuální index. Stejný postup aplikujte i pro nalezení
maximálního prvku (stačí udělat jeden průchod polem).

## Obrácení pole
Vytvořte funkci `array_reverse`, která obrátí prvky v poli.
```c
void array_reverse(int* array, int len);
```
Pole projděte pomoci cyklu do jeho půlky a vždy prohazujte prvky z obou konců.

<upr-array-reverse array="[10, 20, 30, 40, 50, 60]"></upr-array-reverse>

Přehození dvou prvků nemůžete udělat najednou. Uložte si například prvek z levého konce do proměnné
a následně do tohoto prvku zapište hodnotu z pravého konce. Poté hodnotu z proměnné uložte do pravého
konce. Alternativně také můžete využít dříve naimplementovanou funkci `void swap(int* a, int* b)`.

## Skalární součin
Vytvořte funkci `dot`, která spočítá
[skalární součin](https://cs.wikipedia.org/wiki/Skal%C3%A1rn%C3%AD_sou%C4%8Din).
```c
int dot(int* a, int* b, int len);
```

## Načtení dynamického počtu hodnot
Načtěte od uživatele číslo `n`. Poté naalokujte paměť o velikosti `n` `int`ů a 
načtěte ze vstupu `n` čísel, které postupně uložte do vytvořeného pole. Vypište součet načteného
pole.

## Counting sort
Vygenerujte pole 10 000 000 čísel z intervalu \\( \langle 1000, 2000 \rangle \\).
Pomocí algoritmu counting sort seřaďte čísla v poli od nejmenšího po největší.

1. vytvořte pole počítadel pro všechny možné hodnoty v poli
2. vynulujte počitadla na 0
3. sekvenčně projděte pole čísel a inkrementujte odpovídající počítadlo
4. projděte pole počítadel a tiskněte hodnotu tolikrát, kolik je hodnota počítadla

<upr-counting-sort></upr-counting-sort>

## Třízení
Naimplementujte funkci, která setřídí pole. Můžete použít například algoritmus
[bubble sort](https://en.wikipedia.org/wiki/Bubble_sort).

## Střelba na terč
Vytvořte program, který načte souřadnice terčů a střel, a vykreslí je do obrázku ve formátu
vektorové grafiky [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). Po najetí myší
na terč by se mělo ukázat skóre vybraného terče.

<object data="terc/01_basic.svg"></object>

Ze vstupu přečtěte počet terčů a následně si dynamicky alokujte 3 pole typu `float` pro `x` souřadnice terčů, `y` souřadnice terčů a poloměry terčů.

Poté pro každý terč přečtěte jeho `x` souřadnici, `y` souřadnici, poloměr a uložte je do
odpovídajících polí.
Například následující vstup nám popisuje 2 terče.
První terč má střed na souřadnici \\( [50, 70 ] \\) a poloměr \\( 40 \\) a druhý terč leží na středu \\( [160, 90 ] \\) s poloměrem \\( 60 \\).
```
2
50 70 40
160 90 60
```

Tento vstup nezadávejte pořad dokola z klávesnice, ale přesměrujte si jej do programu ze souboru:
```
$ ./main < terce.txt
```


Terče si pomocí `printf` vykreslete do vektorového obrázku ve formátu svg, ve kterém lze pomocí tagů definovat útvary.
Útvary v obrázku obalte tagem `svg`:
```xml
<svg xmlns='http://www.w3.org/2000/svg'>
  <!-- kresleni kruhu -->
</svg>
```

Terč se středem \\( [50, 70] \\) a poloměrem \\( 40 \\) lze vykreslit pomocí: 
```svg
<circle cx='50' cy='70' r='40' stroke='black' fill='red' />
```

Vytvořený SVG obrázek si ze standardního výstupu přesměrujte do souboru a otevřete si jej například v prohlížeči firefox.

```shell
$ ./main < terce.txt > obrazek.svg
$ firefox obrazek.svg
```

Následně si ze vstupu přečtěte počet střel a alokujte pro ně dvě pole - jedno bude reprezentovat `x` souřadnice a druhé `y` souřadnice jednotlivých střel.
Souřadnice si následně přečtěte do těchto polí.
Pole si projděte a vykreslete do obrázku jako kruhy např. s poloměrem \\( 4 \\).

Střela zasáhla terč, pokud leží na kruhu.
Jinými slovy - střela zasáhla terč, pokud je vzdálenost od středu terče menší než poloměr terče.
Vzdálenost vypočítáme jednoduše pomocí Pythagorovy věty, kde `x` odvěsna je rozdíl mezi `x` souřadnici středu terče a `x` souřadnici střely. Odvěsna `y` lze vypočítat obdobně a poté můžeme vypočítat přeponu, která reprezentuje vzdálenost střely od středu terče.

<svg>
   <circle cx="50" cy="50" r="50" fill="rgb(190, 83, 85)" />
   <circle cx="75" cy="20" r="5" fill="black" />
   <line x1=50 y1=50 x2=75 y2=20 stroke='black'/>
   <line x1=50 y1=50 x2=75 y2=50 stroke='black'/>
   <line x1=75 y1=20 x2=75 y2=50 stroke='black'/>
   <text x=60 y=35 text-anchor="end">dist</text>
</svg>

Protože máme více terčů a více střel, tak musíme aplikovat výpočet vzdálenosti mezi každou střelou
a každým terčem pomocí dvou vnořených `for` cyklů.
Vnější cyklus bude procházet střely a vnitřní cyklus bude procházet terče.
Ve vnitřním cyklu vypočítáme vzdálenost mezi střelou a terčem a pokud je menší než poloměr,
tak tento konkrétní terč byl zasažen střelou z vnějšího cyklu.
V případě, že se více kruhů překrývá, tak střela zasáhla terč s menším poloměrem.
Budeme tedy hledat zasáhnutý terč s nejmenším poloměrem.

Skóre při zasažení středu s poloměrem 20 je 10 bodů a body postupně klesají.
Zdrojový kód SVG ukázek si můžete zobrazit.

<details>
<summary>Dva terče</summary>

<object data="terc/01_basic.svg"></object>

```
2
50 70 40
160 90 60

4
25 70
80 90
150 100
55 140
```
</details>

<details>
<summary>Překrývající se terče</summary>

<object data="terc/02_overlayed.svg"></object>

```
2
160 90 60
90 70 40

4
125 70 
80 90
150 100
55 140
```
</details>

<details>
<summary>Překrývající se terče se stejným středem</summary>

<object data="terc/03_same_c.svg"></object>

```
3
50 70 40
160 90 60
160 90 40
7
25 70
80 90
55 140
125 60
140 130
150 100
215 100
```
</details>
