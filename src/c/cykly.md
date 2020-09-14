# Cykly
V programech chceme často provádět nějakou operaci opakovaně, například:
- Pro každý záznam v databázi vypiš řádek do souboru.
- Pošli zprávu každému účastníkovi chatu.
- Načítej řádky ze souboru, dokud nedojdeš na konec souboru.

Pokud bychom používali pouze sekvenční zápis příkazů, tak bychom museli neustále kopírovat
("copy-pastovat") kód:
```c
printf("0\n");
printf("1\n");
printf("2\n");
...
```
což by vedlo k nepřehledným programům[^1]. Pokud bychom navíc našli v programu chybu, museli bychom ji
opravit na všech místech, kam jsme kód zkopírovali.

[^1]: Představte si, že chcete na výstup programu nebo do souboru vypsat třeba tisíc různých řádků textu.

Ani s kopírováním kódu bychom si však nevystačili, pokud bychom potřebovali provádět kód opakovaně
v závislosti na vstupu programu. Představte si situaci, kdy nám uživatel na vstup programu zadá číslo,
kolikrát má náš program vypsat nějaký řádek textu na výstup. Uživatel se při každém spuštění programu
může rozhodnout pro jiné číslo, `0`, `1`, `42`, `1000`. Program však zůstává stále stejný - při jeho
psaní se musíme rozhodnout, kolik příkazů pro výpis v něm použijeme, a už poté nemůžeme jednoduše
tuto volbu změnit, když program běží. Takovýto program bychom tedy zatím (pouze pomocí proměnných a
podmínek) neměli jak naprogramovat. 

Proto programovací jazyky nabízí tzv. **cykly** (*loops*), pomocí kterých můžeme jednoduše říct
počítači, aby určitý blok kódu opakoval, kolikrát budeme chtít. Díky tomu může program i s pouze
několika málo řádky kódu říct počítači, aby provedl spoustu instrukcí. Jazyk *C* nabízí dva základní
typy cyklů, [while](while.md) a [for](for.md).

> Další motivací pro využití cyklů je to, že moderní procesory počítačů mají běžně frekvence od
> 1 do 4 GHz, takže za vteřinu zvládnou provést několik několik miliard
> [taktů](https://cs.wikipedia.org/wiki/Hodinov%C3%BD_sign%C3%A1l) a během každého taktu navíc až
> [desítky](https://cs.wikipedia.org/wiki/Superskal%C3%A1rn%C3%AD_architektura) různých operací.
> Jistě si dovedete představit, že s pouze sekvenčním zápisem kódu bychom tento potenciál nemohli
> naplno využít. I když jeden řádek *C* kódu může být přeložen až na desítky procesorových instrukcí,
> tak i kdybychom zvládli napsat program se stovkami milionů řádek, pořád bychom takovýmto programem
> "zabavili" procesor na pouhou vteřinu. Běžící programy tak obvykle tráví většinu času prováděním
> nějakého cyklu.
