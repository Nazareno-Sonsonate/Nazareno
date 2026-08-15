# Orientación para agentes (Codex / ChatGPT / Claude)

Este archivo es la guía de trabajo del repositorio. Leelo antes de tocar código.
Codex lo carga automáticamente; si trabajás desde otra herramienta, leelo igual.

---

## 1. Qué es esta app

Rastreo en vivo de las procesiones de Semana Santa en Sonsonate, El Salvador.
La usan cargadores (para saber cuándo les toca su cargada) y público general
(para seguir dónde va el anda). El pico de uso es en la calle, de noche, en
celular, con datos móviles flojos. **Ese es el usuario que manda en cada decisión.**

Son **dos PWA instalables** que comparten todo el código:

| App | Carpeta | Tema |
|---|---|---|
| Jesús Nazareno | `jesus-nazareno/` | morado sobre fondo oscuro |
| Santo Entierro | `santo-entierro/` | luto: negro, gris, blanco y dorado sobrio |

Producción: https://nazareno-sonsonate.github.io/Nazareno/

---

## 2. Arquitectura

Sitio **estático puro**: sin build, sin bundler, sin `package.json`, sin
dependencias npm. Se abre el HTML y funciona.

```
/app.js            (~5800 líneas)  toda la lógica: Firebase, mapa, cargadas, GPS, push, admin
/app.css           (~290 líneas)   todos los estilos de ambas apps
/routes-data.js    (~430 líneas)   recorridos y puntos de referencia
/firebase-messaging-sw.js          service worker: push + caché offline
/jesus-nazareno/index.html         marcado de la app de Jesús Nazareno
/santo-entierro/index.html         marcado de la app de Santo Entierro
/index.html                        landing de entrada
```

Las dos páginas cargan los mismos `../app.js`, `../app.css` y `../routes-data.js`.
**Un cambio en cualquiera de esos tres afecta a las dos apps.** Siempre verificá
las dos.

- `santo-entierro/index.html` declara `window._forceSE = true` antes de cargar
  `app.js`; eso fija el día 4 y agrega `body.se-mode`.
- Datos en vivo: Firebase Realtime Database (`procesion-sonsonate-default-rtdb`).
- Mapa: Google Maps JS API, se inicializa con el callback global `initMap`.

---

## 3. Reglas duras

1. **No toques Firebase, rutas, GPS, notificaciones push ni la lógica de
   administración** salvo que el pedido sea explícitamente sobre eso. Es la
   parte que se rompe en la calle y no se puede depurar en vivo.
2. **No renombres ni elimines funciones existentes.** El HTML las llama por
   nombre desde atributos `onclick=` — un rename silencioso rompe botones sin
   error visible en consola hasta que alguien los toca.
3. **No hay paso de build.** No agregues frameworks, npm, TypeScript ni
   preprocesadores. Si algo necesita compilarse, no va.
4. **Mantené las dos apps a la par.** Todo cambio de UI se aplica a
   `jesus-nazareno/index.html` y `santo-entierro/index.html`, y respeta el tema
   de cada una.
5. **Santo Entierro no lleva morado.** Es una procesión de luto: negro, gris,
   blanco y dorado sobrio (`#b49963`). Sin verde y sin morado, nunca.
6. **Móvil primero.** Objetivos táctiles de 44 px o más, sin scroll horizontal,
   texto legible de noche.

---

## 4. Trampas conocidas (leé esto antes de tocar la UI)

- **`showView(n)` acopla por índice** (`app.js:3107`):
  ```js
  document.querySelectorAll('.vtab').forEach((t,i)=>t.classList.toggle('a',i===n));
  document.querySelectorAll('.pnl').forEach((p,i)=>p.classList.toggle('a',i===n));
  ```
  Hay exactamente 2 `.vtab` (0 = Mapa, 1 = En vivo) y 2 `.pnl` (`#v0`, `#v1`).
  Si agregás un elemento con esas clases, o cambiás el orden, la navegación se
  rompe. Para agregar una pestaña hay que cambiar también la función.

- **`body.se-mode` usa `!important` en casi todas sus reglas.** Cualquier estilo
  nuevo que quieras que se vea distinto en Santo Entierro necesita su
  contraparte `body.se-mode ... !important`, y tiene que ir **después** en
  `app.css`.

- **`body.big-text`** es el modo de lectura grande para fieles mayores
  (`applyBigText()`, `app.js:1018`). Si agregás texto nuevo, agregale su regla
  en el bloque `body.big-text`.

- **`.adminOnly` y `.superAdminOnly`** los muestra/oculta `app.js` (líneas
  3612-3623) escribiendo `style.display` directo. No les pongas `display` en CSS
  ni los envuelvas en contenedores con `display:none`.

- **Estilos inline generados desde `app.js`.** `renderLive()` arma HTML con
  estilos en línea (por ejemplo el conteo `13/28` dentro de la barra de
  progreso, `app.js:2762` y `2890`). Si querés cambiar eso desde CSS, mirá
  primero qué escribe el JS: puede que necesites tocar `app.js`.

- **Service worker (`firebase-messaging-sw.js`).** `index.html`, `app.js`,
  `app.css` y `routes-data.js` son **network-first**: los deploys llegan solos,
  no hace falta hacer nada. El resto (imágenes, iconos) es **cache-first**: si
  reemplazás una imagen, **subí `CACHE_NAME`** (`semana-santa-v116` → `v117`) o
  los usuarios instalados van a seguir viendo la vieja.

---

## 5. Cómo verificar antes de subir

No hay tests automáticos. El mínimo aceptable:

```bash
# servidor local
python3 -m http.server 8899
# abrir http://127.0.0.1:8899/jesus-nazareno/ y .../santo-entierro/
```

Revisá en un viewport de celular (390×844 sirve):

- [ ] Las dos apps cargan sin errores de JS en consola.
- [ ] Las dos pestañas de abajo alternan Mapa / En vivo.
- [ ] Los accesos rápidos (Ver mapa, Alertas, Compartir) responden.
- [ ] No hay scroll horizontal.
- [ ] Santo Entierro sigue sin morado ni verde.
- [ ] El modo lectura grande no desborda nada.
- [ ] El HTML sigue bien anidado.

Si tenés Chromium disponible, una captura de cada app a 390 px de ancho vale
más que cualquier descripción.

---

## 6. Git

- Rama por trabajo: `claude/...` o `codex/...`, descriptiva.
- Producción es **`main`**: GitHub Pages publica desde ahí, sin workflow de por
  medio. Un merge a `main` **es** un deploy en vivo. No mergees sin que te lo
  pidan.
- Mensajes de commit en español, en imperativo, explicando el *por qué*.

---

## 7. Dejá registro de tu trabajo

Al terminar, agregá una entrada en **`REGISTRO-CAMBIOS.md`** (arriba de todo, lo
más nuevo primero). Es lo que lee el siguiente agente para no repetir ni
contradecir lo hecho. Formato:

```markdown
## AAAA-MM-DD — Título corto
**Agente:** Codex / Claude / etc.  **Commit:** `abc1234`  **Rama:** nombre

**Qué cambié:** archivos tocados y por qué.
**Qué NO toqué:** lo que quedó fuera a propósito.
**Cómo lo verifiqué:** qué probaste y en qué navegador.
**Pendiente / riesgos:** lo que quedó a medias o hay que vigilar.
```

Sé honesto en "Pendiente / riesgos": el que sigue va a confiar en eso.
