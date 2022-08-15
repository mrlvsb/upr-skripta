# Konstanty
V určitých případech můžeme chtít mít proměnné s konstantní hodnotou, které by se neměly v průběhu
programu měnit. Takové proměnné se nazývají **konstanty** (*constants*).

Abychom zamezili nechtěné změně hodnoty konstanty, můžeme datový typ proměnné označit
[klíčovým slovem](../syntaxe.md#klíčová-slova) `const`, který umístíme před[^1] název datového typu.
Pokud bychom se snažili o změnu proměnné s takovýmto datovým typem, překladač nám to nedovolí.

```c,editable,mainbody
int main() {
    const int a = 5;
    a = a + 1; // chyba, nelze přeložit

    return 0;
}
```

[^1]: Modifikátor `const` lze umístit i za datový typ. Někteří programátoři o umístění tohoto
modifikátoru vedou
[vášnivé diskuze](https://mariusbancila.ro/blog/2018/11/23/join-the-east-const-revolution). Důležité
hlavně je, abyste ve volbě umístění modifikátorů byli konzistentní a používali je na všech místech
stejně.

Použití konstant může mít několik důvodů:
- V programech někdy opakovaně používáme konstantní hodnoty, které mají pevně danou hodnotu. Při
čtení zdrojového kódu nemusí být jasné, co takového hodnoty znamenají (v takovém případě se hanlivě
označují jako "magické konstanty"). Abychom takového hodnoty pojmenovali, můžeme je uložit do
konstantní proměnné. Při čtení programu pak bude zřejmé, co reprezentují. Porovnejte variantu
s nepopsanými číselnými hodnotami:
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
    s variantou využívající pojmenované konstanty:
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
    Druhá varianta kódu je jistě čitelnější.

- V určitých případech, například u konstantních [řetězců](../text/retezce.md), jsou data uložena v oblasti
paměti, kterou nelze měnit. Pomocí `const` si můžeme pohlídat, že se takováto paměť opravdu nezmění.
