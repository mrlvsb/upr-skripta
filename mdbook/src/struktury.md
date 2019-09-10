# Struktury

Již umíme pracovat s jednoduchými datovými typy, které nám mohou
reprezentovat celá nebo reálná čísla, či řetězce znaků. Práce se
strukturovanými datovými typy můžeme do jisté míry považovat za
předstupeň k objektově orientovanému programování.

## Co jsou struktury

Představme si, že bychom chtěli pomocí jednoduchých datových typů řešit
komplexnější problém. Tento problém by ke svému popisu potřeboval více
proměnných. Jako jednoduchý přiklad můžeme použít reprezentaci obrazu. V
takovém případě potřebujeme reprezentovat alespoň hodnoty v jednotlivých
pixelech a počet řádků (výšku) a počet sloupců (šířku) obrazu. Pro
jednoduchost předpokládejme obrázek ve stupních šedi. Ukažme si, jak by
taková reprezentace v jazyce C vypadala.

```c
unsigned char * img_data;
int img_rows;
int img_cols;
```

(**TODO: Pripravit to na TGA header**)

Pointer `unsigned char` na s názvem `img_data` nám bez problému může reprezentovat 8 bitové obrazy
ve stupních šedi, neboť do něj můžeme ukládat hodnoty 0 - 255 (2<sup>8</sup> = 256 různých hodnot).
Představme si dále, že bychom chtěli takovýto obrázek o nějaké velikosti
nastavit na černou barvu (hodnota `0`).

```c
void set_image_to_black( unsigned char * img_data,
                         const int img_rows, const int img_cols )
{
    for ( int y = 0; y < img_rows; y++ ) {
        for ( int x = 0; x < img_cols; x++ ) {
            img_data[ x + y * img_cols ] = 0;
        }
    }
}
```

Jak můžete vidět, do funkce `set_image_to_black` posíláme všechny parametry obrázku, abychom
s ním mohli pracovat. Snadno si lze představit, že se složitějšími
problémy by snadno mohl počet parametrů funkcí značně narůstat.

Pro zefektivnění takové práce nám slouží strukturované datové typy,
jednodušeji struktury (anglicky *structures*). V jazyce C je pro definici
datových struktur vyhrazeno klíčové slovo `struct`. Pojďme se podívat, jak by
definice takového obrázku mohla vypadat.

```c
struct ImageStruct {
    unsigned char * data;
    int rows;
    int cols;
};
```

Jak můžete vidět, definice začíná požitím klíčového slova `struct`, které je
následovano jménem struktury. V následném bloku jsou pak definovani
členové struktury, které nazýváme `atributy`, s jejich příslušnými
datovými typy. Na první pohled již není nutné ke jménům členů struktury
obrázku přidávat předponu `img_`, neboť jejich členství v této datové
struktuře je jasně dáno.

Struktura ovšem není datovým typem, proto ji nelze použít přímo jako
definici typu (pokud ovšem nepoužijete C++ překladač). Proto se často
používá definice aliasu na datovou strukturu. K definici takového aliasu
se používá klíčové slovo `typedef`. Toto slovo má následující syntaxi:

```c
typedef struct tag_name struct_alias;
```

Za `tag_name` dosazujeme jméno naší struktury, za `struct_alias` nové jméno, pod kterým chceme
naši strukturu používat jako datový typ. Příklad pro naši strukturu s
obrázkem tedy bude vypadat následovně:

```c
struct ImageStruct {
    unsigned char * data;
    int rows;
    int cols;
};

typedef struct ImageStruct Image;

Image * image;
```


Dále můžeme s pointrem `* image` pracovat tak, že mu naalokujeme dynamickou paměť
tak, jak jsme si již ukázali.

**Cvičení:** Vytvořte si vlastní strukturu pro reprezentaci
osoby (`Person`) s několika atributy.

K jednotlivým atributům struktury přistupujeme pomocí tečkové (`.`) nebo
šipkové (`->`) notace. Tečku používáme, když je struktura vytvořena na
stacku. Šipku pak používáme pro přístup k atributům struktury, která je
alokována na heapu.

Ukažme si tedy příklad, kdy budeme chtít nastavit počet řádků nějakého
obrázku:

```c
struct ImageStruct {
    unsigned char * data;
    int rows;
    int cols;
};

typedef struct ImageStruct Image;

Image * heap_image;
Image   stack_image;

// alokace...

// teckova notace
stack_image.rows = 480;

// sipkova notace
heap_image->rows = 480;
```

Můžeme vidět, že rozdíl je nepatrný, je však nutné na něj dávat pozor,
jinak náš program nepůjde přeložit.
