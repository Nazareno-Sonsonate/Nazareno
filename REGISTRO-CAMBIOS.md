# Registro de cambios

Bitácora del trabajo de los agentes sobre este repositorio. **Lo más nuevo va
arriba.** El formato y las reglas están en [`AGENTS.md`](AGENTS.md), sección 7.

---

## 2026-08-20 — Compactación móvil y portada confiable

**Agente:** Codex  **Commit:** `sin commit`  **Rama:** `main`

**Qué cambió:** eliminé la compensación manual superior y convertí la cabecera en sticky para evitar huecos variables en teléfonos. Añadí `viewport-fit=cover` y soporte del área segura para que la barra llegue al borde superior. El resumen de grupo, cargada y avance vuelve a desplazarse con el contenido; solo quedan fijas la identidad superior y la navegación inferior. El selector de días de Nazareno ahora tiene ancho suficiente y Santo Entierro oculta también su contenedor vacío. El aviso de instalación flota sin desplazar el contenido, el resumen de grupo y avance es más compacto, y ambas portadas usan una etiqueta de imagen real; esto garantiza que la foto de Jesús Nazareno no dependa solamente de un fondo CSS.

**Qué NO toqué:** Firebase, rutas, GPS, notificaciones, mapa, datos de cargadas ni administración.

**Cómo lo verifiqué:** `node --check app.js`, `git diff --check`, CSS con 582 llaves de apertura y cierre, y revisión de que ambas portadas conservan sus imágenes y las dos apps mantienen el mismo marcado funcional.

**Pendiente / riesgos:** confirmar visualmente en el teléfono físico después de que GitHub Pages y el service worker entreguen la versión nueva.
## 2026-08-19 — Selector inicial adaptable y accesibilidad táctil

**Agente:** Codex  **Commit:** `sin commit`  **Rama:** `codex/mejoras-ux-movil`

**Qué cambié:** `app.css`, `jesus-nazareno/index.html` y
`santo-entierro/index.html`. Convertí las tarjetas para elegir cargador o
cargadora en botones semánticos, contuve sus imágenes para evitar desbordes y
agregué texto alternativo. Incorporé objetivos táctiles mínimos, foco visible,
ajustes para pantallas angostas y soporte para la preferencia de movimiento
reducido. También diseñé una familia propia de nueve iconos SVG (mapa,
procesión, ubicación, alertas, compartir, seguimiento, menú, instalación y
configuración) y reemplacé los
emojis de la navegación y los accesos públicos principales en ambas apps. Los
iconos van integrados en cada HTML, no dependen de red y heredan el color del
tema. Rediseñé además la tarjeta generada de próxima cargada como una
credencial de turno: estado según cercanía, cambios faltantes, referencia,
hora estimada, ritmo, acceso al mapa y botones con jerarquía clara. El progreso
ahora expone cantidad y porcentaje fuera de la barra. Incorporé una portada
gráfica permanente en “En vivo”, con emblema procesional, ornamento de ruta,
mensaje público y acceso al mapa: morado ceremonial para Jesús Nazareno y una
versión independiente en negro y dorado para Santo Entierro. El estado previo
quedó preservado en
`respaldo/ux-antes-2026-08-19` (commit `09ed89b`).

En una segunda pasada convertí esa portada en una composición fotográfica,
transformé el selector inicial en galería de imágenes, conecté un indicador
“Próxima salida / Procesión en vivo / Temporada finalizada”, añadí una ruta
visual con punto de avance y simplifiqué el mapa: “Mi ubicación” queda visible
y los controles secundarios viven en “Opciones del mapa”. Todos conservan sus
IDs y llamadas existentes. Ajusté finalmente la portada para mostrar la foto
completa centrada, con una segunda capa desenfocada que llena los laterales sin
recortar la imagen principal. La foto y el título cambian según el tipo elegido:
cargador ve Jesús Nazareno o la urna del Santo Entierro; cargadora ve María
Santísima o la Virgen Dolorosa.

Tras revisar una captura real, eliminé la segunda copia desenfocada de la foto
porque producía dos recortes discordantes. La portada usa ahora una única imagen
completa con laterales gráficos. Para evitar repetir a Jesús o la urna entre el
resumen superior y la portada, oculté solamente la miniatura del resumen
principal; conservé la tarjeta secundaria de la Virgen y las estadísticas. El
aviso de temporada queda concentrado en la portada, el aviso de instalación
pasó a una sola línea y el encabezado recibió controles más sobrios.

Rediseñé después toda la franja superior como encabezado editorial: tipografía
sans-serif más limpia, selectores compactos, tarjeta principal con acento
lateral, tarjeta secundaria discreta y estadísticas agrupadas en una sola
superficie con separadores. Añadí variantes específicas de Santo Entierro y
modo de texto grande.

Convertí finalmente la barra fija del día en una cabecera de identidad: emblema
SVG, título claro, subtítulo alineado, días escritos completos y controles
compactos. Ajusté el desplazamiento del contenido, la posición del bloque
pegajoso y la altura del mapa para la nueva barra de 62 px.

Generé además `se-virgen-v2.webp` como variante aprobada para móvil: fondo rojo
extendido, sin franjas blancas, mayor definición y encuadre 720×900. Santo
Entierro ahora la usa en el selector inicial; el original `se-virgen.jpg`
permanece intacto. Generé `se-entierro-v2.webp` a 720×900 como variante vertical
de la urna y el cortejo; se usa para cargadores en portada, selector y banner,
con `se-entierro.jpg` preservado. Subí el caché offline de `v116` a `v118` para
distribuir ambas imágenes.

**Qué NO toqué:** cálculos existentes de cargadas, `routes-data.js`, Firebase,
rutas, GPS, notificaciones push ni lógica de administración. Del service worker
solo cambié `CACHE_NAME` y la imagen precargada para distribuir el nuevo WebP.
En `app.js` solo modifiqué el HTML que compone `renderLiveImpl()` y añadí un
cálculo derivado de presentación; no modifiqué funciones ni datos. Tampoco
cambié el orden o la cantidad de `.vtab` y `.pnl`.

**Cómo lo verifiqué:** servidor local y capturas de ambas apps con Chromium en
ventana de 390×844; revisión visual de los dos temas, `git diff --check`, nueve
símbolos SVG disponibles por app, y conteo de exactamente 2 pestañas y 2 paneles
en cada HTML. `node --check app.js` confirmó sintaxis válida; cada app conserva
una portada, un estado, una bandeja de mapa, 2 pestañas y 2 paneles, y el CSS
terminó con 545 llaves de apertura y cierre. También validé
`firebase-messaging-sw.js` con `node --check`. Firebase y Google Maps no
estuvieron disponibles en el entorno.

**Pendiente / riesgos:** no se probó en un teléfono físico ni con datos en vivo.
Chromium headless aplica un ancho interno mínimo distinto al de la captura, por
lo que la comprobación exacta a 390 px debe repetirse con emulación móvil o en
un dispositivo antes de publicar. La variante `se-virgen-v2.webp` es
generativa y fue aprobada visualmente; pesa unos 174 KB. Conviene vigilar la
fidelidad de sus detalles devocionales en futuras ediciones. La variante
`se-entierro-v2.webp` también es generativa (unos 144 KB) y reconstruye detalles
finos del anda y personas del cortejo; debe revisarse visualmente antes de
publicar.

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
