# Cykly
Tato sekce je ve výstavbě 🚧.

<!--Nejznámější příkaz pro řízení toku `if`, jsme si již uvedli v kapitole
\@ref(sec:syntax). Schématicky si jej proto pouze připomeneme:

- **if ( \<výraz\> ) { \<vnořený blok\> }**
- 0+ else if ( \<výraz\> ) { \<vnořený blok\> }
- volitelně: else { \<vnořený blok\> }


Pro vytvoření cyklů nám v jazyce C slouží dvě konstrukce: `while` a `for`.

## Cyklus while

Cyklus `while` funguje tak, že na začátku máme dánu podmínku iterace. Je-li
podmínka splněna, je vykonáno tělo cyklu, v opačném případě je cyklus
přeskočen a pokračuje se dále v programu. V těle cyklu můžeme použít
klíčová slova `break` a `continue`. Slovo `break` zapříčiní ukončení cyklu.
Slovo `continue` zapříčiní
přeskočení zbytku těla cyklu s návratem na počáteční podmínku a tím
pádem vykonání dalšího cyklu za předpokladu, že je splněna tato vstupní
podmínka.

```c
int i = 0;

while ( i < 5 ) {
	printf( "%d\n", i );
	i += 1;
}

// 0
// 1
// 2
// 3
// 4
```

## Cyklus for

Cyklus `for` typicky používáme pro průchod nějakého pole ať už statického nebo
dynamického. Funkguje tak, že si vytvoříme řídící proměnnou, která
indexuje procházené pole od nuly (0) do jeho konce (n-1). Důležité je
vědět, že řídící proměnná cyklu nenabývá hodnoty prvku pole, ale je
pouze indexem do procházeneho pole. Hodnotu z pole si již musíme pomocí
tohoto indexu zpřístupnit sami.

Ukažme si jednoduchý příklad na součet prvků v poli intů.

```c
int len = 5;
int seznam[] = { 1, 2, 5, 10, 100 };
int sum = 0;

for ( int i = 0; i < len; i++ ) {
	int prvek = seznam[ i ];
	sum += prvek;
}
printf( "sum: %d\n", sum );  //118
```
-->
