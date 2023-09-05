# Střelba na terč
Vytvořte program, který načte souřadnice terčů a střel, a vykreslí je do obrázku ve formátu
vektorové grafiky [SVG](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). Pokud si vygenerovaný SVG obrázek otevřete v internetovém prohlížeči, tak by se po najetí
myši na terč mělo ukázat skóre vybraného terče.

<object data="terc/01_basic.svg"></object>

Ze vstupu přečtěte počet terčů a následně si dynamicky alokujte 3 pole typu `float` pro `x` souřadnice terčů, `y` souřadnice terčů a poloměry terčů.

Poté pro každý terč přečtěte jeho `x` souřadnici, `y` souřadnici, poloměr a uložte je do
odpovídajících polí.
Například následující vstup nám popisuje 2 terče.
První terč má střed na souřadnici \\( \[50, 70 \] \\) a poloměr \\( 40 \\) a druhý terč leží na středu \\( \[160, 90 \] \\) s poloměrem \\( 60 \\).
```
2
50 70 40
160 90 60
```

Tento vstup nezadávejte pořad dokola z klávesnice, ale [přesměrujte](../c/text/vstupavystup.md#standardní-souborové-deskriptory)
si jej do programu ze souboru:
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

Terč se středem \\( \[50, 70\] \\) a poloměrem \\( 40 \\) lze vykreslit pomocí:
```svg
<circle cx='50' cy='70' r='40' stroke='black' fill='red' />
```

Vytvořený SVG obrázek si ze standardního výstupu [přesměrujte](../c/text/vstupavystup.md#standardní-souborové-deskriptory)
do souboru a otevřete si jej například v prohlížeči firefox.

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
