# Řízení toku
Pokud by počítače program vždy pouze vykonaly od začátku do konce a provedly pokaždé ty stejné
operace, tak by nebyly moc užitečné. Sice by zvládly něco rychle vypočítat, ale už ne se rozhodovat,
jakou operaci mají provést, nebo nějakou operaci provádět opakovaně, což jsou velmi užitečné vlastnosti.

Instrukce programu se běžně vykonávají ("tečou") jedna po druhé ("odshora dolů"). *C* obsahuje příkazy
pro tzv. **řízení toku** (*control flow*), které můžou toto vykonávání instrukcí ovlivnit:
- [Podmínky](podminky.md) umožňují vykonat kus kódu, pouze pokud platí nějaký výraz (Booleovského typu).
  Díky tomu se může program rozhodnout, zda má nějakou operaci provést, nebo ne, v závislosti na vstupu.
- [Cykly](cykly.md) umožňují vykonávat kus kódu opakovaně. Díky tomu můžeme například provést nějakou
operaci pro všechny prvky ze vstupu programu anebo ji provádět, dokud nedojde ke splnění nějaké podmínky.

> Ač se to možná nezdá, tak použití výrazů, proměnných, podmínek a cyklů bohatě stačí k tomu, abyste
byli schopni napsat libovolný počítačový program. Pomocí těchto tří jednoduchých konstrukcí byste
tak teoreticky mohli vytvořit třeba textový editor, hru nebo i celý operační systém. Nicméně, pokud
bychom využívali pouze tyto konstrukce, tak ve větších programech by bylo složité se zorientovat a
byly by také dost neefektivní. V následujících sekcích se tak dozvíte o několika dalších konstrukcích,
které vám můžou programování usnadnit.
