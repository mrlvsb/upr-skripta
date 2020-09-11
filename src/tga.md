# TGA
Tato sekce je ve výstavbě 🚧.

<!--## Zápis struktur do souboru

Struktury jsou i dobrým komunikačním nástrojem.
Můžeme je uložit v podobě souboru na disk a přečíst je pak jiným programem, který je může dále zpracovat.
Modelovou situací může být program pro zpracování fotografií.

V první řadě budeme simulovat fotoaparát, který uloží obrázek do souboru.
Existuje mnoho způsobů, jak uložit obraz. Tyto způsoby jsou definovýny různými formáty
(např. `JPG`, `PNG`, `BMP`, `TGA`, apod.).
Asi nejjednodušeji uchopitelným formátem je `TGA`, jehož hlavička vypadá následovně [^1]:

<table>
    <thead>
        <tr>
            <th>Č. položky</th>
            <th>Délka</th>
            <th>Jméno položky</th>
            <th>Popis</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>1</td><td>1 byte	</td><td>ID length</td>                 <td>Length of the image ID field</td>   </tr>
        <tr><td>2</td><td>1 byte	</td><td>Color map type</td>            <td>Whether a color map is included</td></tr>
        <tr><td>3</td><td>1 byte	</td><td>Image type</td>                <td>Compression and color types</td>    </tr>
        <tr><td>4</td><td>5 bytes	</td><td>Color map specification</td>   <td>Describes the color map</td>        </tr>
        <tr><td>5</td><td>10 bytes	</td><td>Image specification</td>       <td>Image dimensions and format</td>    </tr>
    <tbody>
</table>

[^1]: https://en.wikipedia.org/wiki/Truevision_TGA
-->