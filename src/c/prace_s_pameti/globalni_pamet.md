# Globální paměť
Posledním základním typem paměti je tzv. globální (nazývaná také statická) paměť. Tato paměť je
specifická tím, že vzniká při spuštění programu a zaniká při jeho ukončení, lze ji tak používat
během celé délky běhu programu.

[Globální proměnné](../promenne/globalni_promenne.md) jsou umístěny v globální paměti. Je dobré si
uvědomit, že tyto proměnné zároveň zabírají místo ve spustitelném souboru na disku, protože v něm
musí být uložena jejich iniciální hodnota[^1].
 
[^1]: Pokud tedy nejsou
[inicializované na nulu](../promenne/globalni_promenne.md#iniciální-hodnota)).

V globální paměti také leží samotné instrukce programu, který právě běží. Jsou tam umístěné funkce,
které jste napsali a které poté byly přeloženy na strojové instrukce a uloženy ve spustitelném souboru.
