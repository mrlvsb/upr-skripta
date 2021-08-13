# Rozklad problému
Často se setkáte s tím, že dostanete k naprogramování úlohu, se kterou si nevíte rady a netušíte ani
jak začít. Například:

`Načti obrázek z disku, změň jeho velikost, ulož ho do jiného souboru a vykresli jej na obrazovku.`

Tato úloha vypadá velmi jednoduše, když je zadaná větou (v češtině), ale obzvláště pro začínající
programátory je obtížné převést takovouto úlohu do programovacího jazyka. Obecným pravidlem k usnadnění
řešení složitých úloh je rozdělovat je na menší a jednodušší podúlohy tak dlouho, dokud se nedostaneme
k podúloze, kterou již umíme vyřešit. Poté z těchto malých kousků, které máme vyřešené, zpětně poskládáme
celý program, který vyřeší původní úlohu.

Například zmíněnou úlohu můžeme rozdělit na následující podúlohy: 
- Načti obrázek z disku
    - Otevři soubor se vstupním obrázkem
    - Načti hlavičku obrázku
    - Vytvoř paměť pro pixely obrázku
        - Naalokuj dostatek paměti dle hlavičky (šířka x výška)
- Změň velikost obrázku
    - Vytvoř obrázek s novým rozměrem
    - Překopíruj původní obrázek do nového obrázku
        - Projdi všechny pixely nového obrázku
            - Projdi každý řádek
            - Pro každý řádek projdi každý sloupec
        - Pro každý pixel spočítej původní pozici pixelu
            - Pro výpočet použij poměr šířky/výšky nového/starého obrázku
        - Překopíruj pixel ze starého obrázku do nového
    - Vrať nový obrázek
- Zapiš upravený obrázek
    - Otevři soubor k zápisu
    - Zapiš hlavičku obrázku do souboru
    - Zapiš pixely obrázku do souboru
- Vykresli upravený obrázek
    - Vytvoř okno pro vykreslení obrázku
    - Překopíruj pixely obrázku do otevřeného okna
    - Zobraz okno s obrázkem

Pomocí tohoto univerzálního postupu se dříve či později dostanete k (pod)úloze, kterou byste již měli umět
vyřešit (např. otevření souboru). Jakmile danou podúlohu vyřešíte, tak budete o krok blíže k řešení
původní složité úlohy.

Tímto způsobem můžeme programy rovnou od začátku začít psát. Například při řešení výše zmíněné úlohy
můžeme začít nadefinováním hlavní logiky programu pomocí volání funkcí, kde každá funkce bude reprezentovat
jednu podúlohu. I když funkce zatím nebudou naprogramované a později se třeba jejich název nebo rozhraní
trochu změní, tak nám toto rozdělení může pomoct přemýšlet nad problémem abstraktněji, zorientovat s
v něm a také získat naději, že se nám úlohu vůbec podaří vyřešit. Stejný princip opět můžeme použít
při implementaci jednotlivých funkcí. Program (či funkci) pak lze přečíst jako větu a je tak jednodušší
pochopit, co má vlastně dělat.

```c
int main() {
    // Načti obrázek
    FILE* vstupni_soubor = otevri_soubor(...);
    Img obrazek = nacti_obrazek(vstupni_soubor);

    // Uprav jeho velikost
    Img upraveny_obrazek = uprav_velikost_obrazku(&obrazek);

    // Zapiš obrázek
    FILE* vystupni_soubor = otevri_soubor(...);
    zapis_obrazek(vystupni_soubor, &upraveny_obrazek);

    // Vykresli obrázek
    vykresli_obrazek(&upraveny_obrazek);

    return 0;
}
```
