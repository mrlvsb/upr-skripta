# Soubory
K vyřešení těchto úloh by vám mělo stačit znát [soubory](../c/soubory/soubory.md) a [TGA](../c/aplikovane_ulohy/tga.md)
(a samozřejmě veškeré předchozí učivo).

## Spočítání řádků
Naimplementujte funkci, která načte soubor na zadané cestě a vrátí počet řádků, které se v něm
vyskytují.
```c
int count_lines(const char* path);
```

## Kopírování souboru
Naimplementujte funkci, která přijme cestu ke vstupnímu a výstupnímu souboru a zkopíruje obsah
vstupního souboru do výstupního souboru.

```c
void copy_file(const char* src, const char* destination);
```

## Šifrování souboru
Naimplementujte funkci, která přičte číslo `key` ke všem znakům v souboru na zadané cestě.
```c
void encrypt_file(const char* path, int key);
```

Dále udělejte druhou funkci, která od znaků v souboru na zadané cestě naopak číslo `key` odečte.
Otestujte, že soubor po zašifrování a odšifrování obsahuje stejný obsah. Pro testování používejte
soubory s ASCII textem.
```c
void decrypt_file(const char* path, int key);
```
