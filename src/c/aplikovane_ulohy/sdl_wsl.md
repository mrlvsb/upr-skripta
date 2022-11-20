# SDL + WSL
Pokud chcete použít knihovnu SDL v kombinaci s použitím systému [WSL](../../prostredi/linux/instalace.md),
budete si muset nastavit zobrazování grafických Linux aplikací na Windows.

Pokud máte aktuální verzi Windows 11 a WSL, tak by mělo stačit spustit grafický program (např. C program
využívající SDL). Více detailů se můžete dozvědět [zde](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps).
Pokud nemáte Windows 11 nebo se vám grafický výstup aplikace nezobrazuje, tak budete muset použít přístup
popsaný níže.

## Emulace X serveru
Jedním ze způsobů, který se na Linuxu používá pro vykreslování grafiky, je tzv.
[X server](https://en.wikipedia.org/wiki/X_Window_System). Funguje tak, že aplikace, které chtějí něco
vykreslit, komunikují s X serverem, který poté grafiku vykreslí v nějakém okně.

Aby toto fungovalo pod Windows, tak musíte na Windows spustit X server, ke kterému se poté připojí
klient (vaše C SDL aplikace) spuštěná pod systémem WSL.

Návod, jak tento X server na Windows nainstalovat, naleznete např. [zde](https://techcommunity.microsoft.com/t5/windows-dev-appconsult/running-wsl-gui-apps-on-windows-10/ba-p/1493242).

Zkrácená verze návodu:
1) Stáhněte a nainstalujte si program [VcXsrv](https://sourceforge.net/projects/vcxsrv/).
2) Zapněte na Windows program `XLaunch` a v nastavení zaškrtněte volbu `Disable access control`.

    Tento program musí běžet na pozadí, aby fungovalo spouštění grafických aplikací pod WSL (pokud
    restartujete počítač, budete ho muset spustit znovu).
3) Ve WSL terminálu poté musíte nastavit proměnnou prostředí `DISPLAY` na správnou hodnotu, aby
spuštěný program komunikoval s X serverem spuštěným pod Windows. Dosáhnout toho můžete např. následujícím
příkazem:
    ```console
    $ export DISPLAY="`grep nameserver /etc/resolv.conf | sed 's/nameserver //'`:0"
    ```
    Tento příkaz musíte spustit v terminálu, odkud budete vaši SDL aplikaci spouštět. Pokud spustíte
    nový terminál, musíte příkaz spustit znovu.
4) Dále by mělo stačit spustit SDL aplikaci a její grafický výstup by se měl objevit v novém okně
pod Windows.
