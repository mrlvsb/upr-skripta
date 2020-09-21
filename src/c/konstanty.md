# Konstanty
V určitých případech můžeme chtít mít proměnné s konstantní hodnotou, které by se neměly v průběhu
programu měnit. Takové proměnné se nazývají **konstanty** (*constants*).

Abychom zamezili nechtěné změně hodnoty konstanty, můžeme datový typ proměnné označit modifikátorem
`const`. Pokud bychom se snažili o změnu proměnné s takovýmto datovým typem, překladač nám to
nedovolí.

```c,editable,mainbody
int main() {
    const int a = 5;
    a += 1; // chyba

    return 0;
}
```

Použití konstant může mít několik důvodů:
- V programech někdy opakovaně použiváme konstantní hodnoty, které mají pevně danou hodnotu. Při
čtení zdrojového kódu nemusí být jasné, co takového hodnoty znamenají (v takovém případě se hanlivě
označují jako "magické konstanty"). Abychom takového hodnoty pojmenovali, můžeme je uložit do
konstantní proměnné. Při čtení programu pak bude zřejmé, co reprezentují. Porovnejte:
```c
float vypocti_cenu(float cena) {
    return cena * (1 + 0.21);
}
float vypocti_odvod(float celkova_cena, bool dph) {
    if (dph) {
        return celkova_cena * 0.21;
    } else {
        return 0;
    }
}
```
vs
```c
const float DPH = 0.21f;

float vypocti_cenu(float cena) {
    return cena * (1 + DPH);
}
float vypocti_odvod(float celkova_cena, bool dph) {
    if (dph) {
        return celkova_cena * DPH;
    } else {
        return 0;
    }
}
```

- V určitých případech, například u konstantních [řetězců](retezce.md), jsou data uložena v oblasti
paměti, která nelze měnit. Pomocí `const` si můžeme pohlídat, že se takováto paměť opravdu nezmění.
 