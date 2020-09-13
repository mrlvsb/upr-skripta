# Cykly
Moderní procesory počítačů mají běžně frekvence od 1 do 4 GHz, což znamená, že za vteřinu v nich
proběhne několik miliard [taktů](https://cs.wikipedia.org/wiki/Hodinov%C3%BD_sign%C3%A1l), během kterých
procesor může provést nějakou operaci. V každém taktu zároveň dnešní počítače zvládnou provést až
[desítky](https://cs.wikipedia.org/wiki/Superskal%C3%A1rn%C3%AD_architektura) různých operací.

Jistě si dovedete představit, že s pouze sekvenčním zápisem kódu bychom tento potenciál nemohli
naplno využít. I když jeden řádek *C* kódu může být přeložen až na desítky procesorových instrukcí,
tak i kdybychom zvládli napsat program se stovkami milionů řádků (což je v podstatě nereálné), pořád
bychom "zabavili" procesor na pouze jedinou vteřinu.

Proto programovací jazyky nabízí tzv. **cykly** (*loops*), pomocí kterých můžeme říct procesoru, aby
určitý blok kódu mnohokrát opakoval, díky čehož můžeme provést spousty instrukcí pomocí
několika málo řádků kódu.

Jazyk *C* nabízí dva základní typy cyklů: [while](while.md) a [for](for.md).
