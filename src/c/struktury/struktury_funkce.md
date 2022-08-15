# Struktury a funkce
Pomocí struktur si můžeme vytvořit nový datový typ, což pomáhá přehlednosti programů, protože se
díky tomu můžeme v programech vyjadřovat pomocí pojmů z oblasti (tzv. domény), kterou se náš program
zabývá (`Student`, `Příšera`, `Munice`, `Letadlo`, `Volant` atd.) a ne pouze pomocí pojmů, kterým
rozumí počítač (číslo, znak, pravdivostní hodnota).

Abychom pracovali s ještě vyšší úrovní abstrakce, bylo by užitečné, pokud bychom mohli k
vlastním datovým typům nadefinovat také vlastní operace, které by s nimi uměly pracovat. Některé
programovací jazyky umožňují provádět tzv.
[**přetěžování operátorů**](https://en.wikipedia.org/wiki/Operator_overloading) (*operator overloading*),
pomocí kterého můžeme například umožnit používání operátorů jako je `+` s vlastními datovými typy.
*C* toto sice neumožňuje, nicméně chování můžeme k námi vytvořeným strukturám přidat pomocí funkcí.

Často tak k naší struktuře chceme vytvořit sadu funkcí, které s ní budou pracovat. V *C* pro tento
koncept neexistuje žádná syntaktická podpora. Obvykle se tak prostě takovéto funkce pojmenují tak,
aby začínaly názvem struktury, ke které jsou přidružené, a přebírají ukazatel na tuto strukturu jako
svůj první parametr[^1]:
```c,editable
#include <stdbool.h>
#include <stdio.h>

typedef struct {
    float x;
    float y;
} Poloha;

typedef struct {
    const char* jmeno;
    int skore;
    Poloha poloha;
} Hrac;

void hrac_posun(Hrac* hrac, int x, int y) {
    hrac->poloha.x += x;
    hrac->poloha.y += y;
}
void hrac_pridej_skore(Hrac* hrac, int skore) {
    hrac->skore += skore;
    if (hrac->skore > 100) {
        hrac->skore = 100;
    }
}
bool hrac_vyhral(Hrac* hrac) {
    return hrac->skore == 100;
}

int main() {
    Hrac hrac = { .jmeno = "Jindrich", .skore = 40, .poloha = { .x = 10, .y = 20 } };
    hrac_posun(&hrac, 5, -8);
    hrac_pridej_skore(&hrac, 70);

    printf("Hrac vyhral: %d\n", hrac_vyhral(&hrac));

    return 0;
}
```

[^1]: Ukazatel se používá, abychom nemuseli struktury při předávání do funkcí kopírovat (mohou být
relativně velké) a abychom je mohli případně zevnitř funkcí modifikovat.

Pokud vytvoříme vhodné datové typy (struktury) a budeme s nimi pracovat pomocí funkcí, tak by se naše
programy měly přibližovat k tomu, aby je šlo číst jako plynulý a přehledný text. 

> Vytváření vlastních datových typů, které mají přidružené chování, je základem tzv.
> [Objektově orientovaného programování](https://edison.sso.vsb.cz/cz.vsb.edison.edu.study.prepare.web/SubjectVersion.faces?version=460-2055/01&subjectBlockAssignmentId=375759&studyFormId=2&studyPlanId=22001&locale=cs&back=true).

## Struktury jako návratový typ funkce
Jelikož struktury mohou obsahovat více datových typů, můžete pomocí nich také obejít fakt, že
funkce mohou vracet pouze jednu hodnotu:
```c
typedef struct {
    float x;
    float y;
} Poloha;

Poloha vrat_pocatecni_polohu() { ... }
```

<hr />

**Cvičení** 🏋

Vyzkoušejte si práci se strukturami a funkcemi [zde](../../ulohy/struktury.md).

<hr />
