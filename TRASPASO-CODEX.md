# Traspaso a Codex — proyecto Nazareno

Preparado el 1-nov-2026 a partir del repositorio local (`C:\Users\confe\Documents\Nazareno`),
`AGENTS.md`, `REGISTRO-CAMBIOS.md` y el historial de git. Leé también `AGENTS.md` antes de
tocar código: ahí están las reglas duras y las trampas de la interfaz.

> Este archivo no contiene contraseñas, tokens ni claves. La configuración de Firebase y de
> Google Maps vive en `app.js`; no la copies a documentos ni mensajes.

---

## 1. Estado actual

- **Qué es:** rastreo en vivo de las procesiones de Semana Santa en Sonsonate. Dos PWA que
  comparten código: **Jesús Nazareno** (`jesus-nazareno/`, morado) y **Santo Entierro**
  (`santo-entierro/`, luto negro/gris/blanco/dorado).
- **Repositorio:** `Nazareno-Sonsonate/Nazareno` en GitHub (público). La cuenta local es
  colaboradora, no dueña.
- **Producción:** https://nazareno-sonsonate.github.io/Nazareno/ (GitHub Pages publica `main`
  directo, sin workflow).
- **Base de esta retoma:** `main` y la referencia local `origin/main` coinciden. Último commit `fccb715` del 20-ago-2026,
  «Consolida la experiencia móvil fuera de temporada».
- **Rama de trabajo actual:** `codex/retoma-documentacion`, creada el 1-nov-2026 para corregir
  documentación y excluir perfiles de Chrome. No se consultó el remoto ni el despliegue actual.
- **Sin cambios de código desde el 20-ago-2026.** Estamos fuera de temporada: la próxima Semana Santa es
  la que manda las pruebas reales.
- **Versión de caché del service worker:** `semana-santa-v118`.

## 2. Decisiones que tomamos

1. **Sitio estático puro:** sin build, sin npm, sin frameworks. Se abre el HTML y funciona.
2. **El usuario que manda** es el cargador o fiel en la calle, de noche, con celular y datos
   flojos: móvil primero, botones de 44 px o más, sin scroll horizontal, texto legible.
3. **No tocar Firebase, rutas, GPS, notificaciones push ni administración** salvo pedido
   explícito. Todo el trabajo de agosto fue de presentación (CSS, marcado y el HTML que arma
   `renderLiveImpl()`).
4. **No renombrar ni borrar funciones:** el HTML las llama por `onclick=`.
5. **Las dos apps siempre a la par.** Santo Entierro **nunca** lleva morado ni verde
   (dorado sobrio `#b49963`).
6. **Navegación de 2 pestañas** (Mapa / En vivo). `showView(n)` empareja `.vtab` y `.pnl`
   por índice: no agregar elementos con esas clases sin cambiar la función.
7. **Iconos SVG propios** (nueve, integrados en cada HTML, sin red) en lugar de emojis.
8. **Portada con UNA sola foto completa** con laterales gráficos. La doble capa desenfocada se
   descartó tras ver una captura real porque daba dos recortes discordantes.
9. **La foto cambia según el tipo elegido:** cargador ve Jesús Nazareno o la urna; cargadora ve
   María Santísima o la Virgen Dolorosa.
10. **Fuera de temporada** se muestra solo el resultado principal antes de la portada; en vivo,
    el detalle completo.
11. **Cabecera sticky** con área segura (`viewport-fit=cover`), sin compensación manual de
    altura.
12. **Imágenes nuevas generadas con IA** (`se-virgen-v2.webp`, `se-entierro-v2.webp`, 720×900)
    aprobadas visualmente. Los originales `.jpg` se conservan.
13. **Ramas de trabajo** `codex/...` o `claude/...`; un merge a `main` es un deploy en vivo y no
    se hace sin que lo pidan.

## 3. Funciones terminadas (ya en `main` y en producción)

- Vista **En vivo**: próxima cargada como «credencial de turno» (estado por cercanía, cambios
  faltantes, referencia, hora estimada, ritmo, acceso al mapa), progreso con cantidad y
  porcentaje fuera de la barra.
- **Accesos rápidos:** Ver mapa, Alertas y Compartir por WhatsApp.
- **Indicador de temporada:** «Próxima salida / Procesión en vivo / Temporada finalizada».
- **Ruta visual** con punto de avance.
- **Mapa simplificado:** «Mi ubicación» visible; lo demás en «Opciones del mapa».
- **Selector inicial** cargador/cargadora como galería de imágenes con botones semánticos y
  texto alternativo.
- **Cabecera de identidad** con emblema SVG, días escritos completos y controles compactos.
- **Encabezado editorial:** tarjeta principal con acento lateral, tarjeta secundaria discreta y
  estadísticas agrupadas.
- **Accesibilidad:** foco visible, objetivos táctiles mínimos, movimiento reducido y modo de
  **lectura grande** (`body.big-text`) para todo el texto nuevo.
- **CSS consolidado:** `app.css` bajó de 612 a 560 líneas.
- **Ensayo / Procesión:** un solo interruptor «Ensayo» escondido en «Avanzado», con Firebase
  aislado por modo. La procesión avanza sola: el cambio se deriva en el cliente, sin admin.

## 4. Problemas pendientes

1. **Nada se probó en un teléfono físico ni con datos de Firebase en vivo.** Las pruebas fueron
   en Chromium con Firebase y Google Maps bloqueados. Es el riesgo principal.
2. **Registro conciliado el 1-nov-2026:** las entradas del 19 y 20 de agosto ya identifican
   los commits reales (`f7b725c`, `5d68ad3`, `dc16e46`, `c41900d`, `fccb715`) integrados en
   `main`. Sigue pendiente la confirmación visual del usuario en su teléfono.
3. **Chromium headless** usa un ancho mínimo distinto: la verificación exacta a 390 px hay que
   repetirla con emulación móvil o en un dispositivo.
4. **Mapa con aviso:** la última regla de `#map` en `app.css` establece
   `calc(100vh - 158px)` y reemplaza la antigua de `128px`. El scroll corto con `.notice`
   fue reportado previamente; falta repetir la comprobación visual con el CSS actual.
5. **Conteo de avance resuelto:** el texto dentro de la barra sigue oculto, pero desde
   `f7b725c` `.live-progress-meta` muestra cantidad y porcentaje fuera de ella, tanto para
   «Avance de la procesión» como para «Mis cargadas». No requiere otra corrección de JS.
6. **Imágenes generativas:** `se-virgen-v2.webp` y `se-entierro-v2.webp` reconstruyen detalles
   del anda, las imágenes devocionales y personas del cortejo. Revisar su fidelidad antes de la
   temporada.
7. **Rama remota vieja `origin/claude/fix-google-maps-bE0tc`:** su único commit (`bc4aaad`) es
   idéntico en contenido a `2987e0f`, que ya está en `main`. Se puede borrar sin perder nada,
   con permiso del dueño del repo.
8. **Codex remoto desde el celular:** la guía `SEGUIR-DESPUES-DEL-REINICIO.md` (instalar WSL,
   Codex dentro de WSL y `codex remote-control`) no tiene registro de haberse completado.

## 5. Archivos importantes

| Archivo | Para qué |
|---|---|
| `AGENTS.md` | Reglas de trabajo, trampas y verificación. Leer primero. |
| `REGISTRO-CAMBIOS.md` | Bitácora de agentes, lo más nuevo arriba. Agregar entrada al terminar. |
| `app.js` (~5,800 líneas) | Toda la lógica: Firebase, mapa, cargadas, GPS, push, admin y render en vivo. |
| `app.css` (560 líneas) | Estilos de las dos apps; `body.se-mode` con `!important` va después. |
| `routes-data.js` | Recorridos y puntos de referencia. No tocar sin pedido. |
| `firebase-messaging-sw.js` | Push y caché offline. Código network-first; imágenes cache-first. |
| `jesus-nazareno/index.html` | Marcado de la app de Jesús Nazareno. |
| `santo-entierro/index.html` | Marcado de Santo Entierro; fija `window._forceSE = true`. |
| `index.html` | Landing de entrada. |
| `se-virgen-v2.webp`, `se-entierro-v2.webp` | Imágenes nuevas de Santo Entierro (originales `.jpg` intactos). |
| `SEGUIR-DESPUES-DEL-REINICIO.md` | Pasos pendientes para Codex remoto. |

Trampas puntuales (detalle en `AGENTS.md`, sección 4): `showView(n)` por índice,
`.adminOnly`/`.superAdminOnly` sin `display` en CSS, estilos en línea que genera
`renderLive()`, y subir `CACHE_NAME` cuando se reemplace una imagen.

## 6. Cómo probarlo

```bash
cd C:\Users\confe\Documents\Nazareno
python -m http.server 8899
# abrir http://127.0.0.1:8899/jesus-nazareno/ y http://127.0.0.1:8899/santo-entierro/
```

Revisiones rápidas:

```bash
node --check app.js
node --check firebase-messaging-sw.js
git diff --check
```

En un viewport de celular (390×844) comprobar en **las dos apps**:

- [ ] Cargan sin errores de JS en consola.
- [ ] Las dos pestañas alternan Mapa / En vivo.
- [ ] Ver mapa, Alertas y Compartir responden.
- [ ] No hay scroll horizontal.
- [ ] Santo Entierro sigue sin morado ni verde.
- [ ] El modo de lectura grande no desborda nada.
- [ ] El HTML sigue bien anidado (2 `.vtab` y 2 `.pnl` por app).

Si se reemplaza una imagen: subir `CACHE_NAME` (hoy `semana-santa-v118` → `v119`).
La prueba que falta de verdad es en un **teléfono físico** contra la versión publicada.

## 7. Cambios locales que todavía no están en GitHub

- **Commits nuevos de esta retoma:** ninguno. `main` local = referencia local `origin/main`
  (`fccb715`); la rama de trabajo es `codex/retoma-documentacion`. Las ramas locales
  `codex/consolidacion-css-movil`, `codex/mejoras-ux-movil` y `respaldo/ux-antes-2026-08-19`
  constaban como no publicadas en el traspaso inicial, pero todos sus commits ya están dentro
  de `main`. No hay `stash`. Esta retoma deja cambios documentales sin commit en
  `REGISTRO-CAMBIOS.md`, `TRASPASO-CODEX.md` y el nuevo `.gitignore`.
- **Sin seguimiento:** cinco carpetas de perfiles de Chrome que se usaron para las capturas
  móviles, unos 845 MB en total: `.chrome-mobile-preview/`, `.chrome-mobile-preview-2/`,
  `.chrome-mobile-review/`, `.chrome-mobile-review-2/` y `.chrome-mobile-review-3/`.
  **No subirlas:** son perfiles de navegador y pueden guardar cookies o sesiones. El nuevo
  `.gitignore` excluye explícitamente las cinco carpetas. Se conservaron en disco; no se
  revisó su contenido ni se volvió a medir su tamaño durante esta retoma.
- **Este archivo** (`TRASPASO-CODEX.md`) es nuevo y tampoco está en GitHub.
