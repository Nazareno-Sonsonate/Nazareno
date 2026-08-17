# Codex remote — qué falta después de reiniciar

Objetivo: manejar Codex de esta PC **desde el celular**, con acceso real a los
archivos locales. El demonio `codex remote-control` **solo corre en Unix**, por
eso hace falta WSL.

## Ya está hecho (15-ago-2026)

- Codex CLI instalado (`codex-cli 0.147.0`) y **logueado** con la cuenta de
  ChatGPT ligada al Gmail.
- Repo clonado en `C:\Users\confe\Documents\Nazareno` (rama `main`).
- `VirtualMachinePlatform`: ya estaba activo.
- `Microsoft-Windows-Subsystem-Linux`: **activado**, esperando reinicio.
- Virtualización del firmware: soportada.

## Paso 1 — Reiniciar la PC

Sin esto nada de lo de abajo funciona.

## Paso 2 — Instalar Ubuntu (PowerShell normal, no hace falta admin)

```powershell
wsl --install -d Ubuntu
```

Te va a pedir crear un **usuario y contraseña de Linux**. Son nuevos, no tienen
nada que ver con los de Windows. Anotalos.

## Paso 3 — Instalar Codex dentro de WSL

Ojo: el Codex de Windows **no sirve** adentro de WSL, es otro sistema. Hay que
instalarlo de nuevo ahí.

```bash
sudo apt update && sudo apt install -y nodejs npm
sudo npm install -g @openai/codex
codex login
```

El `codex login` abre el navegador de Windows solo. Se usa la misma cuenta.

## Paso 4 — Levantar el remote-control

```bash
codex remote-control start
codex remote-control pair
```

El `pair` imprime un **código corto de emparejamiento** que se mete en el
celular. Es de vida corta: si vence, se pide otro con el mismo comando.

## Cómo llegar a los archivos de Windows desde WSL

El disco de Windows se monta en `/mnt/c`. El repo queda en:

```bash
cd /mnt/c/Users/confe/Documents/Nazareno
```

⚠ Trabajar sobre `/mnt/c` es más lento que sobre el disco de Linux, pero es lo
que permite tocar los archivos reales de la PC — que es justamente el punto.

## Advertencia de seguridad

La ventana de Codex que quedó abierta hoy es **de administrador**. Para el
demonio remoto conviene una terminal **normal**: lo que se ejecute desde el
teléfono corre con los permisos de quien levantó el demonio, y no hace falta
darle permisos totales sobre la PC.
