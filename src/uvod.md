# Úvod
Tento text vznikl pro potřeby výuky předmětu [Úvod do programování](https://github.com/geordi/upr-course) na FEI VŠB-TUO.
Slouží k získání přehledu o základních konceptech programovacího jazyka C.
Není však plnohodnotnou náhradou za poslechy přednášek a návštěvy cvičení a programovat vás (stejně
jako žádný jiný text) nenaučí, toho lze dosáhnout pouze opakovaným zkoušením a řešením různých úloh.
Studentům tedy silně doporučujeme, aby přednášky a cvičení navštěvovali a hlavně aby se věnovali programování
doma, alespoň několik hodin týdne.

V tomto textu naleznete krátký popis programování a jazyka C, úvod do nastavení prostředí k editaci zdrojového kódu
a zejména popis základních konstrukcí jazyka C (proměnné, funkce, podmínky, cykly, struktury, pole, ukazatele atd.)
spolu se sadou úloh k procvičení jednotlivých témat. Pomocí lupy vlevo nahoře můžete v textu rychle vyhledávat,
pokud potřebujete najít informace o konkrétním tématu.

Tento text však není kompletním průvodcem jazykem C. Pro takovýto účel lze doporučit některý
knižní titul, např. Učebnice jazyka C od Pavla Herouta nebo přímo standard jazyka [C99](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf).

Jelikož je předmět UPR zaměřen na vývoj v operačním systému Linux, tak ukázky kódu a příkazů terminálu
v tomto textu předpokládají použití tohoto operačního systému, konkrétně prostředí `Ubuntu`.

> Tento text je psán česky, nicméně hlavním jazykem programování je angličtina. Přeložené pojmy,
> které mají zavedené anglické názvy, budou v tomto textu uvedeny v závorce *kurzívou*.  

### Programování
Počítačový program je sekvence příkazů (nazývaných **instrukce**), které může počítač vykonat k vyřešení nějakého problému.
Abychom mohli počítači říct, co má vykonávat, potřebujeme mu příkazy zadat ve formě, které bude rozumět.
Ač se to možná nezdá, tak počítače umí vykonávat pouze velmi jednoduché příkazy. V podstatě umí pouze
provádět aritmetické a logické operace (sečti/odečti/vynásob/vyděl) s čísly a manipulovat
(ukládat, kopírovat, přesouvat) tato čísla v paměti. Veškeré složitější úkoly, jako třeba vykreslení
obrázku na obrazovku, zapsání textu do dokumentu nebo simulace světa v počítačové hře je výsledkem
kombinací tisíců či milionů takovýchto jednoduchých instrukcí.

Zde je ukázka jednoduchého programu, který zdvojnásobí číslo pomocí příkazů `MOV` a `ADD`: 
```x86asm
MOV EAX, 8
ADD EAX, EAX
```

Pokud bychom programy psali pomocí těchto jednoduchých příkazů, tak by bylo složité se v nich vyznat,
obzvláště, pokud by obsahovaly stovky, tisíce, miliony nebo dokonce miliardy takovýchto příkazů.
Ideálně bychom chtěli programy zapisovat v přirozeném jazyce (`Vykresli čtverec na obrazovku`,
`Zapiš text do dokumentu`), nicméně tomu počítače nerozumí a je velmi náročné
jej převést na správnou sekvenci příkazů pro počítač, protože jazyky, které používáme,
jsou často nejednoznačné a nemají jednotnou strukturu.

Jako kompromis tak vznikly **programovací jazyky**, které umožňují zápis programů ve formě, která je
lidem srozumitelná, ale zároveň ji lze relativně jednoduše převést na příkazy, které je schopen počítač
provést. Převodu programu zapsaného v programovacím jazyce na počítačové instrukce se říká **překlad**
(*compilation*) a programy, které tento překlad provádějí, se nazývají **překladače** (*compilers*).
Později si ukážeme, jak takovýto překladač použít k překladu kódu.

Zde je ukázka programu v jazyce C:
```c
while (is_key_pressed(SPACE)) {
    move_up(character);
}
```

I někdo, kdo se s jazykem C nikdy nesetkal, může z tohoto programu zhruba odvodit, co asi dělá,
pokud ho přečte jako větu v angličtině. Tento program však může být převeden na stovky až tisíce
počítačových instrukcí a z takového množství příkazů už by bylo složité odvodit, k čemu je program
určen.

### Jazyk C
Existuje nespočet programovacích jazyků, například Python, Java, C#, PHP či Javascript. Každý z nich
má své výhody a nevýhody a záleží na konkrétním problému, který je třeba vyřešit, pro zvolení
vhodného programovacího jazyka.

V tomto kurzu se budeme zabývat pouze programovacím jazykem **C**. Tento jazyk vytvořili
Dennis Ritchie a Ken Thompson v laboratořích firmy Bell v roce 1972, tedy již před
téměř 50 lety, a za tu dobu nedočkal mnoha výrazných změn.

I když pro něj v dnešní době asi nenaleznete mnoho pracovních nabídek a není primární
volbou pro tvorbu webových či mobilních aplikací, vyplatí se mu rozumět a umět ho používat, a to
hned z několika důvodů:

- Jazyk C lze použít na téměř všech existujících platformách a je tak
velmi univerzálním jazykem. Téměř veškerý existující software obsahuje kusy kódu v jazyce C. Operační systémy (Linux,
OS X, Windows, Android, iOS), prohlížeče (Chrome, Firefox, Edge), multimediální programy (Photoshop,
Powerpoint, Word, BitTorrent), hry (World of Warcraft, Quake, Doom, Call of Duty, League of Legends,
DOTA 2, Fortnite), vestavěná zařízení (mikročipy, pračky, řídící jednotky vesmírných letadel nebo aut).
Všechny tyto věci jsou buď z části anebo zcela poháněné jazykem C.
- Je to jednoduchý jazyk, který neobsahuje velké množství funkcionalit, které lze naleznout ve většině
modernějších jazyků. Díky tomu se dá naučit za jeden semestr.
- Jeho úroveň abstrakce není o mnoho výše než základní počítačové instrukce. Při výuce C tak lze zároveň
pochopit, jak funguje počítač a operační systém. Díky tomu lze také při správném zacházení psát velmi
efektivní programy (to ale nicméně není obsahem tohoto kurzu). 
- **Syntaxe** (způsob zápisu) jazyka C ovlivnila velké množství jazyků, které vznilky po něm. Jakmile se
ji naučíte, tak budete schopni rozumět syntaxi většiny současných nejpoužívanějších jazyků (C++, C#,
Java, Kotlin, Javascript, PHP, Rust, ...). 

Jazyk C má samozřejmě také řadu nevýhod. Vzhledem k jeho stáří a omezené sadě funkcionalit je často
značně pracnější a zdlouhavější pomocí něho dosáhnout stejného výsledku než u modernějších programovacích
jazyků. Nevede také programátory za ručičku – při psaní programu v jazyce C je velmi jednoduché udělat
chybu, která může způsobit v lepším případě pád programu, v horším případě může běžící program poškodit
tak, že začne vydávat chybný výstup nebo se začně chovat nepředvídatelně.

Tyto chyby se můžou projevit jen někdy, nebo jenom na určité kombinaci hardwaru či operačního systému,
a programátor na ně není často nijak upozorněn a musí je najít ručně zkoumáním
zdrojového kódu. Podobný typ chyb je také nejčastějším zdrojem bezpečnostních děr ve všech možných softwarech,
které (jak už víme) téměř vždy obsahují alespoň část kódu napsaného v "Céčku".
