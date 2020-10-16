# Vstup a výstup
Už víme, jak v paměti počítače pracovat s (ASCII) znaky a řetězci. Nyní si ukážeme, jak můžou naše
programy komunikovat s okolním světem – se [soubory](../soubory/soubory.md) na disku, s terminálem, s
ostatními programy běžícími na vašem počítači či s úplně jiným počítačem přes síť. Komunikace programů
se obecně označuje jako **I/O** (*input/output*).

Komunikace s terminálem, souborem, tiskárnou či přes síť má samozřejmě rozlišná pravidla. Abychom v
každém programu nemuseli programovat podporu pro každý vstupní/výstupní kanál od nuly, z velké části
se o toto stará operační systém. Ten nám umožňuje komunikovat s okolním světem pomocí tzv.
**souborových deskriptorů** (*file descriptors*). Při vytvoření nového komunikačního kanálu
(například při otevření souboru) našemu programu operační systém předá nový souborový deskriptor
identifikovaný číslem. Když poté náš program chce vypsat nebo načíst data, tak musí předat operačnímu
systému číslo deskriptoru, se kterým chceme komunikovat. Můžeme například říct `Vypiš text "ahoj" do
souborového deskriptoru s číslem 5`. Ať už je na tento deskriptor připojen soubor, terminál či něco
jiného, operační systém se postará o to, aby k němu data z našeho programu korektně dorazila.

## Standardní souborové deskriptory
Každému programu při spuštění přiřadí operační systém tři základní souborové deskriptory:
- **Standardní vstup** (`stdin`): tento deskriptor má číslo `0` a používá se pro čtení vstupu.
Pokud váš program spustíte z terminálu, tak do `stdin`u bude přesměrován text, který napíšete v
terminálu. Nemusí tomu tak však být vždy. Váš program můžete například spustit z jiného programu, a
předat mu vstup přímo z paměti. Nebo můžete například na vstup vašeho programu přesměrovat soubor z
disku:
    ```bash
    $ ./program < soubor.txt
    ```
- **Standardní výstup** (`stdout`): tento deskriptor má číslo `1` a používá se pro výpis dat. Pokud
váš program spustíte z terminálu, tak data odeslaná do `stdout`u se objeví na obrazovce terminálu.
Opět to ale není jediná možnost, `stdout` může být například přesměrovaný do souboru na disku:
    ```bash
    $ ./program > soubor.txt
    ```
    Pokud použijete například funkci `printf`, tak ta pošle svůj výstup právě do deskriptoru `stdout`.
    
    Pokud toto nastavení [nezměníte](https://devdocs.io/c/io/setvbuf), tak `stdout` implicitně používá 
    tzv. **bufferování po řádcích** (*line buffering*). To znamená, že pokud zapíšete do `stdout`
    pomocí některé z funkcí standardní knihovny *C* nějaký text, tak tento text se nejprve zapíše
    do dočasného pole (*bufferu*) v paměti. Až jakmile na výstup zapíšete znak odřádkování `'\n'`[^1],
    tak dojde k vyprázdnění (*flush*) bufferu, kdy je jeho obsah odeslán na výstup. Jinak řečeno,
    dokud nevypíšete znak odřádkování, váš výstup se neobjeví např. v terminálu. Bufferování po
    řádcích se provádí jako optimalizace, výstup (i vstup) programu totiž může být velmi pomalý.
- **Standardní chybový výstup** (`stderr`): tento deskriptor má číslo `2` a používá se pro výpis
chyb a logovacích záznamů. Narozdíl od `stdout` nepoužívá `stderr` implicitně line buffering, takže
cokoliv, co do něj zapíšete, se okamžite odešle na výstup deskriptoru.

[^1]: Nebo jakmile v bufferu dojde paměť.

Mimo těchto standardních deskriptorů můžete ve svých programech vytvářet i další deskriptory,
například pomocí otevírání [souborů](../soubory/soubory.md). Více o tom, jak fungují souborové deskriptory
a vstup a výstup programu se dozvíte v předmětu
[Operační systémy](http://poli.cs.vsb.cz/edu/osy/osnova.html).

### Interpretace vstupních a výstupních dat
Je dobré si uvědomit, že stejně jako v [operační paměti](../../uvod/pamet.md), i při komunikaci vždy
pracujeme pouze s čísly (byty), jejichž význam je dán čistě tím, jak je jejich příjemce bude interpretovat.
Pokud náš program do souboru zapíše byty `85`, `80`, `82`, a my tento soubor otevřeme v textovém
editoru, který jej bude pokládat za ASCII soubor, zobrazí se nám text `UPR`. Pokud jej však otevřeme
v binárním editoru, budou to pro něj pouze tři celá čísla. Pro prohlížeč obrázků by tato čísla zase
mohla reprezentovat barevné složky RGB pixelu.

Aby tak komunikace dvou stran dávala smysl, musí se obě strany dohodnout na tom, jak budou
interpretovat přenášená data. 

## Ošetření chyb
Zatím jsme předpokládali, že operace, které provádíme v programu, vždy uspějí. Například při zápisu
hodnoty do proměnné jsme předpokládali, že se hodnota v paměti na adrese dané proměnné opravdu objeví
a když ji pak zpátky načteme, tak se při přenosu nijak neznehodnotí.

Při načítání vstupu či výpisu dat ovšem může velmi často dojít k různým chybovým situacím.
Během zápisu souboru na USB "flashku" ji můžeme omylem vytáhnout, při posílání dat přes síť nám může
vypadnout připojení k internetu nebo při načítání čísla z terminálu nám může zákeřný uživatel zadat
něco, co číslo ani zdaleka nepřipomíná.

Pokud tedy chceme psát robustní programy, které zvládnou korektně reagovat i na nevalidní vstup a
na různé chybové situace, které mohou nastat, musíme do našich programů přidat tzv.
**ošetření chyb** (*error handling*). Jedná se o obslužný kód, který reaguje na možné problémové
situace a snaží se je vyřešit. Jak ošetřovat chyby při komunikaci si ukážeme v jednotlivých sekcích
o [vstupu](vstup.md) a [výstupu](vystup.md).
