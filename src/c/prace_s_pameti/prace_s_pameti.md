# Práce s pamětí
V sekci o [paměti](../../uvod/pamet.md) jsme se dozvěděli, že operační paměť počítače lze adresovat
pomocí číselných adres. Prozatím jsme nicméně v našich programech s žádnými adresami explicitně
nepracovali, pouze jsme vytvářeli proměnné, jejichž paměť byla spravována automaticky. V této sekci
se dozvíte základy toho, jak tzv. **správa paměti** (*memory management*) funguje.

## Adresní prostor programu
Když spustíte svůj program, tak pro něj operační systém vytvoří tzv. **adresní prostor**
(*address space*), což je oblast paměti, se kterou program může pracovat.[^1] Tato oblast je typicky
rozdělena na několik částí, z nichž každá slouží pro různé typy dat:

<img src="../../static/img/address_space.svg" alt="Adresní prostor běžícího programu" width="90%"
style="max-height: 300px" />

[^1]: Díky mechanismu
[virtuální paměti](https://cs.wikipedia.org/wiki/Virtu%C3%A1ln%C3%AD_pam%C4%9B%C5%A5) je tento
prostor soukromý pro váš běžící program - ostatní běžící programy do něj nemají přístup, pokud jim
to explicitně nepovolíte.

- **Instrukce programu**: do této části paměti se při spuštění programu zkopírují jeho instrukce
ze spustitelného souboru na disku. Procesor poté čte instrukce, které má vykonat, právě z této části
paměti. Tato paměť je obvykle chráněna proti zápisu a slouží pouze pro čtení.
- **Zásobník**: tato část uchovává automaticky spravovaná data, zejména lokální proměnné a parametry
funkcí. Tuto oblast popisuje sekce o [automatické paměti](automaticka_pamet.md).
- **Halda**: tato část můžete využít k manuální alokaci paměti. To nám umožňují
[ukazatele](ukazatele.md), díky kterým můžeme explicitně pracovat s adresami v paměti. Tuto oblast
adresního prostoru popisuje sekce o [dynamické paměti](dynamicka_pamet.md).
- **Globální data**: tato část obsahuje [globální proměnné](../promenne/globalni_promenne.md),
které žijí po celou dobu trvání programu.
