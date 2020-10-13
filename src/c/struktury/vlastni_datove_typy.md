# Vlastní datové typy
Nyní už umíme pracovat se základními datovými typy v *C*
([celá čísla](../datove_typy/celociselne_typy.md), [desetinná čísla](../datove_typy/desetinne_typy.md),
[pravdivostní hodnoty](../datove_typy/pravdivostni_typy.md), [znaky](../text/znaky.md)) a také
umíme pracovat s jejich [adresami](../prace_s_pameti/ukazatele.md) a vytvářet jich
[více najednou](../pole/pole.md). Doposud jsme však vždy pracovali s každým datovým typem zvlášť.

Představte si, že byste chtěli naprogramovat hru, ve které budete mít nějaké počítačem ovládané
příšery[^1]. Každá příšera může mít spoustu vlastností – jméno, počet životů, zranění, které uděluje,
umístění na mapě, kořist atd. Zároveň bude takových příšer v naší hře určitě více. Mohli bychom tak
příšery reprezentovat pomocí pole pro každou jeho vlastnost:
```c
const char* prisera_jmeno[100];
int prisera_zivot[100];
int prisera_zraneni[100];
float prisera_poloha_x[100];
float prisera_poloha_y[100];
...
```

[^1]: *Non-player character* (NPC)

I když by jistě šlo programy tvořit tímto způsobem, asi sami uznáte, že to není ideální, protože to
má spoustu nevýhod:
- Pokud bychom například změnili (maximální) počet příšer, museli bychom synchronizovat tuto velikost
mezi všemi poli, které reprezentují jednotlivé vlastnosti příšer.
- K názvům proměnných musíme přidávat nějakou předponu (např. `prisera`), abychom dali najevo, že
tyto proměnné vlastně patří k jednomu logickému prvku (příšeře).
- Pokud bychom chtěli jednu takovou příšeru poslat do funkce, tak by to vyžadovalo spoustu parametrů:
    ```c
    int vypocti_pocet_zkusenosti(
        const char* prisera_jmeno,
        int prisera_zivot,
        int prisera_zraneni,
        float prisera_poloha_x,
        float prisera_poloha_y,
        ...
    ) { }
    ```
    Celou příšeru bychom ani nemohli z funkce přímočaře vrátit, protože funkce můžou vracet pouze
    jednu hodnotu.
- Pokud bychom chtěli příšeře přidat novou vlastnost, museli bychom přidat novou proměnnou nebo pole
na všechna místa, kde s příšerami pracujeme. Například by se musely změnit parametry každé funkce,
která by přijímala příšeru.

Co bychom ve skutečnosti chtěli překladači říct, je něco ve smyslu `Příšera je něco, co má jméno,
počet životů, zranění, pozici a kořist`, a poté bychom chtěli ve funkci například říct `Vytvoř pole
100 příšer`:
```c
Prisera prisery[100];
```

Takto bychom zlepšili úroveň abstrakce našeho kódu – v tomto konkrétním případě bychom se mohli začít
v kódu bavit o `příšere` místo o `jménu, počtu životů, zranění, ...`, které spolu nějak souvisí.

Jinak řečeno, chtěli bychom si vytvořit náš vlastní datový typ. A právě to můžeme v *C* udělat pomocí
[struktur](struktury.md).

> Struktury jsou posledním syntaktickým prvkem *C*, o kterém se budeme v předmětu UPR bavit. Jazyk
> *C* sice obsahuje i několik dalších [syntaktických prvků](../co_dal.md), které jsme si neukázali,
> ty však nejsou nutné pro tvorbu jednoduchých programů. Dále se už pouze budeme bavit o konkrétních
> aplikacích toho, co jsme se naučili, pro tvorbu různých typů programů.
