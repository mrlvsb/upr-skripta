# Funkce `main`
Funkce `main` je speciální funkce, která se začne vykonávat při spuštění programu. Může vypadat
například takto:
```c
int main() {
    return 0;
}
```
Proč tato funkce vrací číslo (`int`) a proč jsme v dosavadních programech z ní vždy vraceli hodnotu
`0`? Operační systémy mají zavedenou konvenci, že každý spuštěný program by měl po svém vykonání
vrátit číselnou hodnotu, která systému napoví, jestli program proběhl úspěšně nebo ne. Díky tomu
pak lze relativně jednoduše detekovat, jestli v programu nastala chyba, a případně na ni nějak
zareagovat (na Windows možná znáte dialog "Program neproběhl správně...").

Číslo, které vrátíte z funkce `main`, se použije právě jako návratová hodnota programu pro operační
systém. Význam navrácených čísel není nijak standardizován, jediné, co platí obecně, je, že hodnota
`0` značí úspěch a jakákoliv jiná hodnota značí neúspěch. Proto tedy za normálních okolností z
`main`u vracíme `0`, abychom dali systému najevo, že program proběhl úspěšně.

### Vstupní parametry funkce `main`
Funkce `main` je speciální ve více ohledech. Kromě formy bez parametrů, kterou jste viděli výše,
můžete `main` použít také takto, s dvěma parametry:
```c
int main(int argc, char** argv) {
    return 0;
}
```
První parametr je typu `int` a druhý parametr typu [ukazatel](../c/ukazatele.md) na
[řetězec](../c/retezce.md). Do těchto parametrů se uloží hodnoty zadané při spuštění programu v
terminálu, tzv. **argumenty příkazového řádku** (*command line arguments*). Parametr `argc`
(*argument count*) bude obsahovat počet předaných argumentů a parametr `argv` obsahuje ukazatel na
první prvek [pole](../c/pole.md) *C* [řetězců](../c/retezce.md), kde každý řetězec bude obsahovat
jeden argument. Prvním argumentem je dle konvence vždy cesta k spustitelnému souboru programu,
který je právě spouštěn, další argumenty se nastaví podle zadaného textu v terminálu (argumenty
jsou oddělené mezerou).

Například, pokud program spustíte takto: `./program hello world`, tak parametry funkce `main` budou
mít následující hodnoty:
- `argc` bude obsahovat celé číslo `3` 
- `argv[0]` bude obsahovat řetězec `"./program"`
- `argv[1]` bude obsahovat řetězec `"hello"`
- `argv[2]` bude obsahovat řetězec `"world"`
