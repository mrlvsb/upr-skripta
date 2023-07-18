# Paměť
Počítače si potřebují ukládat výsledky výpočtů do paměti, aby je později mohly opět načíst a
pracovat s nimi. Je mnoho typů paměti, s kterými lze pracovat, nejběžněji se setkáme s tzv.
operační pamětí (**RAM**). RAM znamená Random-Access Memory, tedy paměť s náhodným přístupem. To
znamená, že počítač může do paměti šahat v libovolném pořadí a na libovolném místě, kde je to
potřeba.

### Reprezentace hodnot v paměti
Počítačová paměť uchovává informace v buňkách, které obsahují jedno číslo, které může obsahovat 256
různých hodnot. To vychází z toho, že informace je reprezentována **bity**, jednotkou informací,
která může nabývat pouze dvě hodnoty - pravda (*true*) nebo nepravda (*false*). Každá buňka paměti
obsahuje jeden **byte**, neboli 8 bitů.

Pracuje se zde s dvojkovou (binární) soustavou, pokud tedy máme k dispozici *n* bitů, tak pomocí
nich můžeme reprezentovat \\( 2^n \\) hodnot. Např. s dvěma bity můžeme reprezentovat 4 různé
hodnoty (00, 01, 10, 11), a s 8 bity (jedním bytem) můžeme reprezentovat právě 256 hodnot. Více o binární
soustavě a bytech se dozvíte v předmětu
[Základy digitálních systémů (ZDS)](https://edison.sso.vsb.cz/cz.vsb.edison.edu.study.prepare.web/SubjectVersion.faces?version=440-2104/01&subjectBlockAssignmentId=375761&studyFormId=2&studyPlanId=22001&locale=cs&back=true).

I když paměť vždy obsahuje hodnoty (čísla) v dvojkové soustavě, je důležité si uvědomit, že význam
těmto hodnotám přiřazujeme my, tedy programátoři a uživatelé počítače. Pokud je v paměti hodnota **65**,
tak může reprezentovat například:

- počet získaných bodů studenta (interpretujeme ji jako číslo)
- písmeno `A` v nějakém dokumentu (interpretujeme ji jako znak v
  kódování [ASCII](https://www.asciitable.com/))
- tmavě šedý pixel (interpretujeme ji jako barvu)

I v případě, že hodnoty v paměti interpretujeme přímo jako čísla, tak reprezentované číslo nemusí
přímo odpovídat číselné hodnotě v paměti. Například hodnotu **255** uloženou v *bytu* paměti můžeme
vnímat jako celé nezáporné číslo (*unsigned integer*) **255**, anebo také jako celé číslo se
znaménkem (*signed integer*) **-1**
v [dvojkovém doplňku](https://cs.wikipedia.org/wiki/Dvojkov%C3%BD_dopln%C4%9Bk).[^1]

[^1]: Můžeme si ale klidně vymyslet i reprezentaci, kde hodnota `255` v paměti bude reprezentovat
číslo `42`. Nebo třeba emoji 😈. Záleží jen na nás.

**Čísla v paměti tak sama o sobě nemají žádný význam, záleží pouze na tom, jak je my, a obzvláště naše
programy, interpretují a jaké operace nad nimi provádějí.**

### Adresování paměti
Abychom se mohli odkazovat na hodnoty v paměti, tak musíme mít možnost rozlišit jednotlivé buňky od
sebe. Toho dosáhneme pomocí **adresy**. Paměť je adresována tak, že každá paměťová buňka (každý *byte*)
má číselnou adresu od 0 do velikosti paměti (nevčetně). Velmi zjednodušeně řečeno, pokud máte RAM
paměť o velikosti 8 GiB (8 589 934 592 "bajtů"), tak můžete adresovat buňky od 0 do 8589934591[^2].

[^2]: Programy běžně nemají přístup k celé paměti počítače (mimo jiné z bezpečnostních důvodů). Váš
operační systém používá tzv. **virtuální paměť**, která každému běžícímu programu přiděluje určité
rozsahy paměti, s kterými může pracovat. Více se dozvíte v předmětu
[Operační systémy](http://poli.cs.vsb.cz/edu/osy/).

Pokud byste programovali počítač přímo pomocí instrukcí, tak mu můžete dát například instrukci
`Nastav byte na adrese 58 na hodnotu 5` nebo `Přečti 4 byty začínající na adrese 1028`. Při
programování v *C* ovšem často budou adresy skryté na pozadí a bude se o ně starat překladač, my se
budeme na konkrétní úsek paměti obvykle odkazovat jménem, které mu přiřadíme.
