# Preprocesor
Než je váš zdrojový soubor přeložen na strojové instrukce, tak jej
[překladač](../../prostredi/preklad_programu.md) nejprve prožene tzv. **preprocesorem**
(*preprocessor*). Tento program nedělá nic jiného, než že projde váš zdrojový kód a zpracuje příkazy
začínající na `#`. V podstatě jediné, co takovéto příkazy dělají, je kopírování ve vašem zdrojovém
kódu.

Ukážeme si dva typy příkazů, které preprocesor umí zpracovávat:
- [Vkládání souborů](vkladani_souboru.md) do vašeho kódu (`#include`)
- Vytváření [maker](makra.md) (`#define`)

Pokud si chcete ověřit, jak vypadá váš zdrojový soubor poté, co jej zpracuje preprocesor, ale předtím,
než je přeložen na strojové instrukce, můžete k tomu použít tento příkaz:
```bash
$ gcc -E main.c
```
