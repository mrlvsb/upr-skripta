# Ladění programů
Tato sekce slouží k řešení často se vyskytujících problémů při programování v C. Pokud váš program
padá při běhu nebo se nechová tak, jak má, tak v něm nejspíše máte nějakou chybu (tzv. **bug**).
Proces hledání chyby, která způsobuje pád nebo špatné chování programu se pak nazývá **ladění** (*debugging*).

### Chyby při překladu programu
Pokud váš program nelze přeložit a překladač vypisuje nějakou chybovou hlášku, tak máte v zápisu programu
nějakou chybu, obvykle v syntaxi, tedy zápisu kódu. Je dobré si danou chybovou hlášku pořádně přečíst,
obvykle se odkazuje na relativně přesné místo, kde máte kód špatně, a někdy dokonce i nabízí řešení,
jak problém vyřešit.

Při překladu můžete dostat například následující chybovou hlášku:
```bash
main.c: In function ‘main’:
main.c:2:2: error: ‘a’ undeclared (first use in this function)
    2 |  a = 0;
```
Tato konkrétní chyba byla způsobena tím, že byla použitá proměnná bez její předchozí deklarace. Pokud
chybě nerozumíte, zkuste ji nejprve vygooglit, ideálně pouze část, která není konkrétně závislá na
podobě vašeho projektu. Nemá cenu googlit `main.c:2:2`, protože tento text je závislý na tom, jak jste
si pojmenovali své soubory, ostatní programátoři nejspíše mají jiné názvy souborů. V případě této chyby
by tedy bylo lepší googlit text `error: undeclared (first use in this function)`.

Může se stát, že překladač vypíše více chybových hlášek zároveň, i když chyba
v programu je pouze jedna. Zkuste scrollovat výstupem hlášek nahoru, abyste zjistili, která chyba
byla vypsána jako první, zbytek výpisu může být "planý poplach".

Pokud se vám nedaří chybu vygooglit, tak kontaktujte svého cvičícího.

Při překladu můžete použít dodatečné přepínače, při jejichž použití vydá překladač více varování o
možných problémových místech ve vašem kódu:

```bash
$ gcc -Wall -Wextra -pedantic main.c -o program
``` 

### Chyby při běhu programu
Pokud váš program padá při běhu, můžete zkusit následující způsoby ladění:

#### Address sanitizer
Tento nástroj modifikuje váš program tak, aby dokázal detekovat značné množství chyb při jeho běhu,
a pokud nějakou chybu najde, tak váš program okamžitě ukončí a popíše, k jakému problému došlo. 
```bash
$ gcc -fsanitize=address main.c -o program
```
Jakmile takto přeložený program spustíte a dojde k nějaké chybě, tak bude její popis vypsán na výstup.

Pokud se chyba opraví těsně po svém vzniku, je to mnohem jednodušší, než když se chyba projeví až
později v úplně jiné části kódu. **Doporučujeme tak vždy používat Address Sanitizer při vývoji programů v C**.
Ušetříte si tak spoustu času a námahy při ladění chyb.

#### Logování
Jedním z nejjednodušších způsobů, jak se dozvědět, co se v programu děje, je jednoduše tisknout
hodnoty zajímavých proměnných na výstup programu. Pokud přidáte takovýto výstup na různá místa v kódu,
můžete pak podle výstupu zpětně rekonstruovat, co se při běhu programu dělo.

#### Krokování
Pro interaktivnější zkoumání chování programů je možné je tzv. **krokovat**. K tomu je potřeba nástroj,
který umí program pozastavit při jeho běhu a zobrazit uživateli, co se v něm děje. Takovéto nástroje se nazývají
**debuggery**. Při krokování se program zastaví na určitém místě (řádku) v kódu, a programátor pak může
zkoumat hodnoty proměnných a spouštět program řádek po řádku.

Pro vás je nejjednodušší použít krokování integrované ve VSCode:
- Klikněte na sloupeček vlevo od čísla řádku, na kterém chcete, aby se program zastavil.
Objeví se tam červené kolečko (tzv. **breakpoint**).
- Spusťte program s laděním (`F5`). Program by se na řádku s breakpointem měl zastavit.
- Ve sloupci `Variables` v levé části VSCode můžete prozkoumat hodnoty proměnných.
- Pomocí příkazu `Step Over` (`F10`) program vykoná následující řádek a poté se opět zastaví. Pokud
nechcete přeskakovat volání funkcí, použijte `Step Into` (`F11`).

<video src="../static/video/debugging.webm" controls></video>

> VSCode používá pro ladění vašeho programu debugger `gdb`. Pokud ho chcete použít manuálně, návod
> můžete najít například [zde](https://www.root.cz/clanky/trasovani-a-ladeni-nativnich-aplikaci-v-linuxu-pouziti-gdb-a-jeho-nadstaveb/).
