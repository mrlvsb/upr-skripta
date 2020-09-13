# Funkce
Tato sekce je ve výstavbě 🚧.

<!--Funkce a procedury
==================

Asi bychom byli schopni naše programy psát tak, abychom nepotřebovali
použít funkce. Toto by nám však vystačilo na velmi krátké programy,
poněvadž bychom jinak museli všechen kód psát znovu a znovu. Základní
vlastností funkcí je jejich znovupoužitelnost. Pokud tedy máme úlohu,
kterou víme, že budeme požívat více než jednou, je vhodné ji umístit do
funkce. Takovýto blok kódu by též měl fungovat pokud možno co nejvíce
samostatně.

Funkce
------

V jazyce *C* je definice funkce do značné míry podobná definici funkce v
jiných jazycích. Uvádíme návratový datový typ a uvádíme datové typy
argumentů funkce. Toto je dáno statickou typovostí jazyka. Uveďme si
jednoduchý příklad pro výpočet mocniny čísla.

```c
int sqr( int number ) {
    return number * number;
}
int number = 3;
printf( "sqr( number ): %d\n", sqr( number ) ); // 9
```

Funkce je tedy deklarována tak, že jako první je uveden její návratový
typ. V našem případě tedy `int` pro celá čísla. Pak je uvedeno jméno funkce. V
tomto případě `sqr`. Pak je v kulatých závorkách uveden seznam parametrů
(nebo též argumentů), které funkce přijímá, tedy `number`. Tělo naší funkce `sqr`
obsahuje pouze jeden řádek, který vypočte druhou mocninu zadaného čísla
a takto spočítanou hodnotu vrátí z funkce ven pomocí klíčového slova `return`.
Volání funkce je pak provedeno jménem funkce s parametry uvedenými v
kulatých závorkách tak, jak je to uvedeno v příkladu.

Funkce nám také dovolují provádět generalizaci, což je zobecnění
zadaného problému. Vezměme si výpočet mocniny čísla jako jednoduchý
příklad. První ukázka funkce `sqr` umí vypočítat pouze druhou mocninu zadaného
čísla `number`. My bychom však chtěli vytvořit obecnou funkci na výpočet
jakékoli mocniny čísla. Taková funkce je v ukázce níže.

```c
int pow( int number, int exponent ) {
    int result = number;
    int i = 1;
    while ( i < exponent ) {
        result *= number;
        i++;
    }
    return result;
}

int a = 2, b = 3;
printf( "pow( %d, %d ): %d\n", pow( a, b ) );  // pow( 2, 3 ): 8
b = 5;
printf( "pow( %d, %d ): %d\n", pow( a, b ) );  // pow( 2, 5 ): 32
```

Funkce `pow` má nyní 2 parametry s mocněncem `number` a mocnitelem `exponent`. Místo natvrdo
nastavené hodnoty `2` pro výpočet druhé mocniny z předcházejícího příkladu
(realizovaného násobením) je mocnitel zadán parametrem funkce. Máme tak
zobecněný (generalizovaný) kód pro výpočet mocniny.

Procedury (funkce bez návratového typu)
---------------------------------------

V jazyce *C* máme jeden datový typ, který nemá přesné určení. Je to typ a
může prakticky znamenat cokoli. Nejčastěji jej používáme jako pointer na
nějakou struktury, kterou pak budeme dále přetypovávat. Velmi často je
však používán jako návratový typ funkce. V takovém případě funkce
nevrací žádnou hodnotu. Funkce pouze zpracuje vstupní data a tím její
úloha končí. Takové funkci říkáme procedura.

Parametry funkcí
----------------

V prvním příkladu pro výpočet druhé mocniny jsme použili parametr tak,
že byl volán tzv. hodnotou. To prakticky znamená, že hodnota uložená v
proměnné `number` na řádku 5 se nakopíruje do parametru `number` funkce `sqr` na řádku 1. Snadno si
lze představit, že pokud bychom chtěli ve funkci pracovat s větším
objemem dat, vyžadovalo by to velké kopírování dat, což by náš program
zpomalovalo. Další problém pak může nastat, když by kopírovaná data byla
větší než velikost stacku, kterou máme přidělenu.

Vyřešit můžeme tyto problémy jednoduše tak, že budeme argument funkce
předávat odkazem. Odkaz bude v kontextu našeho jazyka jednoduše pointer.
Ukažme si, jak upravit funkci pro výpočet druhé mocniny, aby akceptovala
argument předávaný odkazem.

TODO: Co tohle je za kravina... Predelat!!!

```c
int sqr( int *number ) {
    return *number * *number;
}
int number = 3;
printf( "sqr( &number ): %d\n", sqr( &number ) );  // sqr( &number ): 9
```

Jak již víme, pointer nám ukazuje na nějaké místo v paměti. Upravili
jsme definici funkce `sqr` tak, že argument number je nyní pointrem. Každá
proměnná je někde v paměti uložena a stejné je to i pro proměnnou `number`
dekladovanou na řádku 5. Abychom mohli do argumentu funkce `number`, který někam
ukazuje předat adresu paměti, musíme ji získat pomocí znaku `&` (řádek 7).
Tím pádem budeme ve funkci `sqr` pracovat s úplně stejnou pamětí jako při
definici proměnné `number` na řádku 5.

Ukažme si ještě, jak pracovat ve funkci s polem. Chtějme naprogramovat
funkci `sum`, která spočítá součet čísel v poli o zadané délce.

```c
int sum( int *array, int len ) {
    int result = 0;
    for ( int i = 0; i < len; i++ ) {
        result += array[ i ];
    }
    return result;
}
int array_len = 5;
int array_of_its[ array_len ] = { 1, 2, 3, 4, 5 };
printf( "sum( array_of_ints, array_len ): %d\n", sum( array_of_ints, array_len ) );  // 15
```

V jazyce *C* musíme funkcím, které pracují s polem předat samostatně délku
pole, poněvadž z pointeru samotného ji zjístit nemůžeme. Pole samotné
předáváme přes pointer `array` a jeho délku přes parametr `len`. Do funkce `sum` pole
předáme pomocí jeho názvu, protože ten je již adresou prvního prvku
pole. Ve funkci pak k prvkům pole přistupujeme tak, jak jsme zvyklí.

Pokud předáváme do funkce argument odkazem, můžeme obsah takové proměnné
změnit a tato změna se projeví i na datech, která jsme do funkce
poslali. To nám otvírá mnoho možností, jak efektivně manipulovat s daty
v procedurách. Mějme však na paměti, že pak můžeme snadno přijít k
úhoně, nebudeme-li bedlivě sledovat, co a kde měníme.

**Cvičení:** Vytvořte proceduru, která nastaví všechny
prvky předaného pole na zadanou hodnotu.

**Cvičení:** Vytvořte funkci, která zjistí počet sudých a
lichých čísel předaného pole. Tyto 2 čísla se vrátí pomocí dvou
proměnných, které budou pointery na inty.
-->
