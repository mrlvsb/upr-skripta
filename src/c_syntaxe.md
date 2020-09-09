# Základy syntaxe
C je (programovací) jazyk a jako každý jazyk má svá pravidla, které je nutno dodržovat.
Například v češtině musíme dodržovat určitá pravidla a zvyklosti, abychom byli schopni výsledný
text pochopit. Věty `jsme, M y máma, táta a` nebo `.o dku  d! ty z, jsi` nedávají smysl,
protože obsahují interpunkční znaménka na špatných místech, větné členy jsou ve špatném pořadí
a některá slova obsahují mezery na místech, kam nepatří. Stejně tak v jazyce C můžete velmi jednoduše
napsat program, kterému [překladač](preklad_programu.md) nebude rozumět a překlad poté skončí se
syntaktickou chybou (*syntax error*). Na syntax C si musíte postupně zvyknout, poté už podobné chyby
budete schopni snadno vyřešit.

Zde je asi nejkratší možný program v jazyce C:
```c
int main() {
    return 0;
}
```

V programu výše je pouze [funkce](funkce.md) s názvem `main`. Funkce si popíšeme později, prozatím
budeme psát kód vždy do funkce `main` (před `return 0;`). Jednotlivé prvky programu si postupně vysvětlíme
v následujících sekcích, prozatím si však všimněte, že **bílé znaky** (*whitespace*)[^1] jsou obvykle
překladačem ignorovány. Například
```c
int 


main()                 {
    
    
    return         0;
}

```
reprezentuje úplně stejný program. Nicméně asi sami uznáte, že pokud bychom s bílými znaky nakládali
takto nerozvážně, tak by zdrojový kód byl pro lidi špatně čitelný. Proto doporučujeme formátování provádět
automaticky ve [VSCode](editor.md) pomocí zkratky `Ctrl + Shift + I`, ať nad ním nemusíte přemýšlet.

Bílé znaky nicméně nejsou ignorovány úplně na všech místech. Například v [řetězcích](c_retezce.md)
jsou bílé znaky brány jako součást textu. Nemůžete také rozdělovat mezerami názvy (např. `in t` nebo
`ma in` z programu výše by způsobily chybu při překladu).

### Komentáře
Abychom mohli v následujících sekcích popisovat kusy kódu, ukážeme si teď **komentáře**. Jedná se
o text ve zdrojovém kódu, který je určen pro programátory, ne pro překladač, který je zcela ignoruje.
Bez komentářů bychom nemohli do zdrojového kódu dodávat poznámky, protože překladač by jinak měl snahu
je interpretovat jako C kód. Komentáře v kódu obvykle poznáte snadno, protože je váš editor bude vykreslovat
jinou barvou než zbytek kódu.

V C existují dva typy komentářů:
- Řádkové komentáře - pokud do kódu napíšete `//`, tak vše za těmito lomítky až do konce řádku se 
bude brát jako komentář.
    ```c
    // komentář 1
    int main() {
        // komentář 2
        return 0; // komentář 3
    }
    ```
- Blokové komenáře - pokud do kódu napíšete `/*`, tak bude jako komentář označen všechen následující
text, dokud nedojde k ukončení komentáře pomocí `*/`.
    ```c
    int main() {
        /* zde je komentář
  zde taky
  a tady taky */
        return 0;
    }
    ```

Ze začátku je asi jednodušší používat řádkové komentáře, ve VSCode můžete použít klávesovou zkratku
`Ctrl + /` pro zakomentování/odkomentování řádku kódu. Pokud vám přijde nějaký kus kódu komplikovaný,
tak si k němu zkuste dopsat komentář, který vysvětlí, co má daný kód dělat. Porozumíte tak kódu snáž,
až se k němu např. za měsíc vrátíte.

### Speciální znaky
Při programování (jak už v C, tak i v jiných jazycích) budete používat spousty symbolů, které běžně
asi často nevyužíváte (například `[`, `]`, `{`, `}`, `<`, `>`, `=`, `%`, `#`, `&`, `*`, `;`, `\`,
`"`, `'`). Obzvláště pokud pro programování budete používat českou klávesnici, je dobré si ze začátku
najít nějaký tahák (např. [tento](https://github.com/geordi/upr-course/blob/master/assets/cheatsheets/keyboard-cs.pdf)),
abyste nemuseli pokaždé zdlouhavě vzpomínat, na které klávese se daný znak nachází. 

[^1]: [Bílé znaky](https://cs.wikipedia.org/wiki/B%C3%ADl%C3%BD_znak) jsou (neviditelné) znaky,
které reprezentují mezery v textu, tj. odřádkování, mezerník, tabulátor atd.
