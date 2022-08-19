# Práce s pamětí
V sekci o [paměti](../../uvod/pamet.md) jsme se dozvěděli, že operační paměť počítače lze adresovat
pomocí číselných adres. Prozatím jsme nicméně v našich programech s žádnými adresami explicitně
nepracovali, pouze jsme vytvářeli proměnné, jejichž paměť byla spravována automaticky. V této sekci
se dozvíte základy toho, jak tzv. **správa paměti** (*memory management*) funguje.

> Práce s pamětí je asi nejklíčovější částí jazyka *C*. Je potřeba ji správně pochopit, jinak
> vaše programy nebudou správně fungovat a nebudete schopni odhalit, proč tomu tak je. Věnujte tedy
> této kapitole zvláštní pozornost.

## Adresní prostor programu
Když spustíte svůj program, tak pro něj operační systém vytvoří tzv. **adresní prostor**
(*address space*), což je oblast paměti, se kterou program může pracovat.[^1] Tato oblast je typicky
rozdělena na několik částí, z nichž každá slouží pro různé typy dat:

<div style="display: flex; justify-content: center;">
    <img src="../../static/img/address_space.png" alt="Adresní prostor běžícího programu" width="300px" />
</div>

[^1]: Díky mechanismu
[virtuální paměti](https://cs.wikipedia.org/wiki/Virtu%C3%A1ln%C3%AD_pam%C4%9B%C5%A5) je tento
prostor soukromý pro váš běžící program - ostatní běžící programy do něj nemají přístup, pokud jim
to explicitně nepovolíte.<br /><br />
Obrázek adresního prostoru je pouze ilustrativní, různé operační systémy či běhová prostředí mohou
umísťovat jednotlivé oblasti v adresním prostoru různě.

- **Zásobník** Tato část uchovává automaticky spravovaná data, zejména lokální proměnné a parametry
funkcí. Tuto oblast popisuje sekce o [automatické paměti](automaticka_pamet.md).
- **Halda** Tuto část můžete využít k dynamické alokaci paměti. To nám umožňují
[ukazatele](ukazatele.md), díky kterým můžeme explicitně pracovat s adresami v paměti. Tuto oblast
adresního prostoru popisuje sekce o [dynamické paměti](dynamicka_pamet.md).
- **Globální data** Tato část obsahuje [globální proměnné](../promenne/globalni_promenne.md),
které žijí po celou dobu běhu programu.
- **Instrukce programu** Do této části paměti se při spuštění programu zkopírují jeho instrukce
ze spustitelného souboru na disku. Nachází se tak v ní přeložený kód
[funkcí](../funkce/funkce.md) vašeho programu. Procesor poté čte instrukce, které má vykonat, právě
z této části paměti. Tato paměť je obvykle chráněna proti zápisu a slouží pouze pro čtení.
