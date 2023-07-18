# Jazyk *C*
Existuje nespočet programovacích jazyků, například Python, Java, C#, PHP, Rust či Javascript. Každý
z nich má své výhody a nevýhody a záleží na konkrétním problému, který je třeba vyřešit, pro
zvolení vhodného programovacího jazyka.

V tomto kurzu se budeme zabývat pouze programovacím jazykem **C**. Tento jazyk vytvořili Dennis
Ritchie a Ken Thompson v laboratořích firmy Bell v roce 1972, tedy před více než 50 lety, a za tu
dobu se nedočkal mnoha výrazných změn.

I když pro něj v dnešní době asi nenaleznete obrovské množství pracovních nabídek a není primární
volbou pro tvorbu webových či mobilních aplikací, vyplatí se mu rozumět a umět ho používat, a to
hned z několika důvodů:

- Jazyk *C* lze použít na téměř všech existujících platformách a je tak velmi univerzálním jazykem.
  Téměř veškerý existující software obsahuje kusy kódu v jazyce *C*. Operační systémy (Linux,
  OS&nbsp;X, Windows, Android, iOS), prohlížeče (Chrome, Firefox, Edge), multimediální programy
  (Photoshop, Powerpoint, Word, BitTorrent), hry (World of Warcraft, Quake, Doom, Call of Duty,
  League of Legends, DOTA 2, Fortnite), vestavěná zařízení (mikročipy, pračky, řídící jednotky
  vesmírných letadel nebo aut). Všechny tyto věci jsou buď částečně anebo zcela poháněny jazykem
  *C*.
- Je to jednoduchý jazyk, který neobsahuje velké množství funkcí, které lze naleznout ve většině
  modernějších jazyků. Díky tomu se dá naučit za jeden semestr.
- Jeho úroveň abstrakce není o mnoho výše než základní počítačové instrukce. Při výuce *C* tak lze
  zároveň pochopit, jak funguje počítač a operační systém. Díky tomu lze také při správném
  zacházení psát velmi efektivní programy (to ale nicméně není obsahem tohoto kurzu).
- **Syntaxe** (způsob zápisu) jazyka *C* ovlivnila velké množství jazyků, které vznikly po něm.
  Jakmile se ji naučíte, tak budete schopni rozumět syntaxi většiny současných nejpoužívanějších
  jazyků (C++, C#, Java, Kotlin, Javascript, PHP, Rust, …).

Jazyk *C* má samozřejmě také řadu nevýhod. Vzhledem k jeho stáří a omezené sadě funkcionalit je
často značně pracnější a zdlouhavější pomocí něj dosáhnout stejného výsledku než u modernějších
programovacích jazyků. Nevede také programátory za ručičku – při psaní programu v jazyce *C* je
velmi jednoduché udělat chybu, která může způsobit (v lepším případě) pád programu nebo
(v horším případě) může běžící program poškodit tak, že začne vydávat chybný výstup nebo se začne
chovat zcela nepředvídatelně.

Tyto chyby se můžou projevit jen někdy, nebo jenom na určité kombinaci hardwaru či operačního
systému, a programátor na ně není často nijak upozorněn a musí je najít ručně zkoumáním zdrojového
kódu. Podobný typ chyb je také nejčastějším zdrojem bezpečnostních děr ve všech možných softwarech,
které (jak už víme) téměř vždy obsahují alespoň část kódu napsaného v "Céčku".

Zde je vybraný seznam populárních programů napsaných v jazyce *C*, které jsou tzv. **open-source**[^2],
takže si jejich zdrojový kód můžete prohlédnout a v případě potřeby i modifikovat:

[^2]: Jejich zdrojový kód je volně sdílen.

- [Linux](https://github.com/torvalds/linux) (operační systém)
- [Quake III](https://github.com/id-Software/Quake-III-Arena) (počítačová hra)
- [git](https://github.com/git/git) (verzovací systém)
- [PHP](https://github.com/php/php-src) (překladač/interpret jazyka PHP)
- [OBS Studio](https://github.com/obsproject/obs-studio) (streamovací software)
