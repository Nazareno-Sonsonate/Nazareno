# Registro de cambios

Bitácora del trabajo de los agentes sobre este repositorio. **Lo más nuevo va
arriba.** El formato y las reglas están en [`AGENTS.md`](AGENTS.md), sección 7.

---

## 2026-08-15 — Fase 1 UX: vista en vivo y navegación pública

**Agente:** Claude (Claude Code, terminal) · **Commit:** `feaa8d2` · **Rama:** `claude/nazareno-live-view-ux-xz6s8b` → `main`

**Qué cambié:**

- `app.css` — bloque nuevo al final del archivo, solo presentación:
  - `.hdr` semitransparente con `backdrop-filter: blur(12px)` (y su contraparte
    en `se-mode`).
  - `.vtabs` de 68 px; `.vtab` pasa a columna con icono arriba (`.vt-ic`) y
    texto abajo (`.vt-tx`); `.vtab.a` deja la línea superior y se ve como
    tarjeta redondeada con anillo interno del color del tema.
  - `.pnl` con `padding-bottom: calc(76px + safe-area)` y `#map` a
    `calc(100vh - 128px)` para compensar la barra más alta.
  - `.live-quick-actions` / `.lqa-btn`: grid de 3 columnas, 64 px de alto mínimo.
  - `.live-next` con sombra suave y número a 54 px (62 px en lectura grande).
  - `.live-progress` a 8 px de alto; `.live-progress-bar` con `font-size:0`.
  - `.live-carry` a 12 px de radio; `.current` con borde de 1 px y anillo tenue
    en vez del borde de 2 px.
  - `.mapbtn` más amplio, con sombra y blur.
  - Contrapartes `body.se-mode` con `!important` y reglas `body.big-text` para
    todo el texto nuevo.
- `jesus-nazareno/index.html` y `santo-entierro/index.html`:
  - Las dos `.vtab` ahora son `🗺️ Mapa` y `✝️ / ⚱️ En vivo`, con spans e
    `aria-label`.
  - Fila `.live-quick-actions` justo antes de `#livePanel` con tres botones:
    Ver mapa → `showView(0)`, Alertas → `openAlerts()`, Compartir →
    `shareWhatsApp()`.
  - `#editorStatus` movido de `bottom:50px` a `76px` para que la barra nueva no
    lo tape (solo posición; el modo editor no cambió).

**Qué NO toqué:** `app.js`, `routes-data.js`, Firebase, rutas, GPS,
notificaciones push ni la lógica de administración. Todo el cambio es CSS y
marcado.

**Cómo lo verifiqué:** anidamiento HTML validado en las dos páginas, llaves de
CSS balanceadas, y render en Chromium a 390×844 con servidor local. Confirmado:
barra de 68 px, `showView(n)` sigue viendo exactamente 2 `.vtab` y 2 `.pnl` en
el mismo orden, sin scroll horizontal, Santo Entierro sin morado. El panel en
vivo se probó inyectando el marcado que produce `renderLive()`, porque en el
entorno de prueba Firebase y Google Maps están bloqueados.

**Pendiente / riesgos:**

- El conteo `13/28` que `app.js` escribe **dentro** de la barra de progreso
  (`app.js:2762` y `2890`) quedó oculto con `font-size:0` para no tocar el JS en
  esta fase. Si se quiere ese dato visible, hay que moverlo fuera de la barra
  editando `app.js`.
- `#map` pasó a `calc(100vh - 128px)`. Si el aviso `.notice` se muestra, empuja
  el mapa y aparece un scroll corto en la vista de mapa. Ya pasaba antes; ahora
  el margen es más chico.
- No se probó en un dispositivo real ni con datos de Firebase en vivo.
