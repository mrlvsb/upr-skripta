# Podmínky
V programech se často potřebujeme rozhodnout, co by se mělo stát v závislosti na hodnotě nějakého
výrazu:
- Pokud uživatel nakoupil zboží v posledním týdnu, odešli mu e-mail.
- Zadal uživatel správné heslo? Pokud ano, tak ho přesměruj na jeho profil. Pokud ne, tak zobraz chybovou hlášku.
- Jaké má uživatel konto? Pokud kladné, tak ho vykresli zelenou barvou, pokud záporné, tak červenou a
pokud nulové, tak černou.

V *C* můžeme provádět takováto rozhodnutí pomocí **podmíněných příkazů** (*conditional statements*)
[`if`](if.md) a [`switch`](switch.md), případně pomocí [ternárního operátoru](ternarni_operator.md).
