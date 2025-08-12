# Preprocesor
Než je váš zdrojový soubor přeložen na strojové instrukce, tak jej
[překladač](../../prostredi/preklad_programu.md) nejprve prožene tzv. **preprocesorem**
(*preprocessor*). Tento program nedělá nic jiného, než že projde váš zdrojový kód a zpracuje řádky
se speciálními příkazy začínajícími na `#`.

Ukážeme si dva typy příkazů, které preprocesor umí zpracovávat:
- [Vkládání souborů](vkladani_souboru.md) do vašeho kódu (`#include`)
- Vytváření [maker](makra.md) (`#define`)

Pokud si chcete ověřit, jak vypadá váš zdrojový soubor poté, co jej zpracuje preprocesor, ale předtím,
než je přeložen na strojové instrukce, můžete k tomu použít tento příkaz[^1]:

```bash
$ gcc -P -E main.c
```

[^1]: Místo `main.c` doplňte název zdrojového souboru, který chcete zpracovat preprocesorem.
