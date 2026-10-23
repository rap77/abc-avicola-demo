---
document_id: BLUEPRINTS-DEMO
title: Blueprints de pantallas — Prototipo Demo ABC Avícola
version: 0.1.0
status: APPROVED
authority: NORMATIVE
document_owner:
  - ABC Avícola Platform Owner
language: es
created_at: 2026-10-23
last_reviewed_at: 2026-10-23
approved_at: 2026-10-23
supersedes: []
superseded_by: []
source_documents:
  - design-system.md@0.1.0
  - tailwind.config.js
  - contracts/AT-DEMO-001.md
related_documents: []
change_control: DECISION_CONTROLLED
obsidian_compatible: true
---

# Blueprints — 5 flujos del prototipo (AT-DEMO-001)

Reglas transversales (aplican a TODAS las pantallas):
- Banner permanente `<PrototypeBanner />` fijo arriba o abajo en todas las
  vistas, texto "PROTOTIPO FUNCIONAL — DATOS DE MUESTRA", bg brand.accent,
  texto brand.primary, font-heading bold text-sm, py-1.5, z-50, no tapa
  contenido crítico (CA-5).
- Auth simulada: Context + localStorage; el "login" usa demo@abcavicola.com.
- Responsive móvil-first: breakpoint md:768px, lg:1024px, xl:1440px.
- Tipografías: font-heading (Work Sans) para títulos/nav/botones/stats;
  font-body (Nunito Sans) para párrafos/meta/forms.
- Tokens: usar SOLO clases de tailwind.config.js (brand.primary, brand.accent,
  ink.dark, overlay.event, shadow-cta, rounded-pill, rounded-card, etc.).
  PROHIBIDO hex literal fuera del config.
- Imágenes: placeholders locales en public/assets/brand/ o /public/img/;
  NUNCA placehold.co (CA-7).
- Datos: import desde /data/*.json (courses.json, market.json, posts.json,
  news.json). Cifras de mercado con etiqueta "DE MUESTRA" (CA-6).

---

## F1 — LANDING PÚBLICA (`app/page.tsx`)

Layout (stack vertical, max-w-[1320px] mx-auto):
1. TopBar (bg brand.primary, py-4): izq "Avicultura en Latinoamérica" +
   "Somos ABC avícola" (font-body text-sm text-white, separador dot brand.accent);
   der email info@abcavicola.com con ícono círculo brand.accent + redes
   (círculos brand.accent-hover, íconos oscuros). [design-system §6 TopBar]
2. NavBar (h-28 bg-white): logo public/assets/brand/logo.svg (w-24 h-20);
   links font-heading text-lg font-medium text-brand.primary: Avian Business /
   Academia Avícola / Agro&Talento / Blog; der Login/Registro (mismo estilo) +
   botón "contáctanos" rounded-pill-nav bg-brand.primary text-white con
   círculo brand.accent y flecha brand.primary. [§6 NavBar]
3. Hero (h-[600px] bg-ink.dark, overflow-hidden): imagen de fondo (gallinas/
   avícola, placeholder local), overlay gradiente; título font-heading text-5xl
   font-bold text-white; subtítulo font-body text-base text-white; CTA
   ButtonCTA "Ver Academia" (bg-brand.accent rounded-pill text-brand.primary
   font-body bold shadow-cta). Dots de carousel (3): inactivos bg-white/55
   rounded-dot, activo bg-brand.accent-hover. [§6 ButtonCTA, §5 dot]
4. 3 cards verticales (grid md:grid-cols-3 gap-7 px-14 py-14): Avian Business /
   Agro&Talento / Academia Avícola. Cada una: rounded-2xl overflow-hidden,
   img h-80, overlay bg-card-overlay (linear 270deg black35→5), título
   font-heading text-2xl font-bold text-white absolute bottom-6 left-6. [§6 CardVertical]
5. "ÚLTIMAS NOTICIAS" (título font-heading text-5xl font-bold text-brand.primary
   centrado) + grid 3 cards news (CardNews: meta font-body text-sm capitalize
   text-ink.footer con íconos link-color-active; headline font-heading text-2xl
   font-semibold text-ink.dark; link "Leer" font-heading text-base font-medium
   + underline brand.accent w-8 h-0.5). Dots carousel debajo. [§6 CardNews]
6. Banda stats (bg-brand.primary, py-12): 4 columnas, número font-heading
   text-6xl font-bold text-brand.accent, label font-heading text-xl font-medium
   text-white, divisor vertical bg-divider-v entre cols. Valores mock: +0190
   Proyectos / +89 Asesores / +2390 Años / +1290 Clientes (etiqueta DE MUESTRA). [§6 StatsBand]
7. "¿Quiénes Somos?" + 3 cards Propósito/Misión/Visión (rounded-card, img +
   bg-mission-overlay, título font-heading text-3xl font-bold text-white,
   body font-body text-base font-bold text-white). [§6 CardMission]
8. "EVENTOS DESTACADOS" (bg-brand.primary, título text-5xl font-bold
   text-brand.accent) + carousel cards eventos (rounded-card, img +
   bg-event-overlay, título font-heading text-2xl font-medium text-white,
   underline brand.accent w-14 h-0.5). [§6 CardEvent]
9. Footer (bg-brand.primary, pt-24): 4 cols (Contáctanos / Noticias / Enlaces /
   Únete) headings font-heading text-2xl font-semibold text-white, body
   font-body text-base text-ink.footer; input newsletter bg-brand.primary-soft
   rounded-md outline-line.border shadow-input texto white; botón Subscribir
   bg-brand.accent rounded-md font-heading text-base; divisor h-px white-16;
   copyright font-body text-base text-ink.footer. [§6 Footer, InputNewsletter]

Interacciones: nav links scroll/anchor; CTA hero → /academia; cards news →
/articulo/:id (mock); newsletter submit → toast "DE MUESTRA" (sin red).
Responsive: nav colapsa a hamburguesa <md; grids 1 col <md, 2 <lg, 3 <xl;
hero h-[420px] móvil; stats 2x2 móvil.
CA específicos: banner visible; 0 errores consola; imágenes locales cargan;
newsletter no dispara fetch real.

---

## F2 — ACADEMIA: CATÁLOGO + DETALLE + PLAYER (`app/academia/page.tsx`, `app/academia/[id]/page.tsx`)

Catálogo (`/academia`):
- Header sticky (NavBar simplificado + breadcrumb "Academia").
- Grid cursos (md:grid-cols-2 lg:grid-cols-3 gap-6): CardCurso = rounded-card
  overflow-hidden, img h-48, badge categoría (bg-brand.accent text-brand.primary
  font-body text-xs bold rounded-pill px-3 py-1), título font-heading text-xl
  font-bold text-ink.dark, instructor font-body text-sm text-ink.footer,
  precio/estado (Gratis | Premium brand.primary | Suscripción brand.accent),
  botón "Ver curso" ButtonCTA. Datos courses.json.
- Filtros mock (chips): categoría, nivel, modalidad. Sin backend: filtrado
  client-side sobre el json.

Detalle (`/academia/[id]`):
- Hero curso (h-[360px] bg-ink.dark + overlay): título text-4xl font-bold
  text-white, subtítulo, instructor con avatar, badge premium, CTA
  "Inscribirme" (ButtonCTA) o "Continuar" si ya comprado (localStorage).
- 2 cols (lg:grid-cols-[1fr_360px] gap-8):
  - Izq: reproductor PlayerMock (aspect-video rounded-card overflow-hidden
    bg-ink.dark): video de muestra local (public/video/demo.mp4 o poster),
    controles custom (play/pause, volumen, fullscreen, progress bar
    brand.accent), OVERLAY marca de agua: texto demo@abcavicola.com rotado
    -45deg, opacity-20, font-heading text-2xl, pointer-events-none,
    repeat-grid. [§2 AT-DEMO-001: overlay simulado, NO DRM real]
    Debajo: acordeón de módulos (Módulo 1..n): header font-heading text-lg
    font-medium, chevron; cuerpo lista lecciones con checkbox "completada"
    (estado localStorage), duración font-body text-sm text-ink.footer.
  - Der sidebar (sticky top-24): CardProgreso (progress circular SVG, stroke
    brand.accent, track brand.primary-soft, texto "X/Y lecciones");
    CardInstructor (avatar circular size-24, nombre font-heading bold, bio
    3 líneas); CardPrecio (precio font-heading text-3xl font-bold
    text-brand.primary, botón comprar).
- Retirar/ocultar: lecciones no desbloqueadas muestran lock + CTA comprar.

Interacciones: click módulo expande; click lección reproduce (set video src +
overlay email); marcar completada persiste localStorage; progreso recalcula.
Responsive: 1 col <lg (sidebar abajo); player aspect-video siempre; overlay
marca de agua visible en móvil.
CA específicos: F2→F3→F4 end-to-end (CA-3); overlay con email de muestra
(NUNCA real); 0 llamadas red en player (video local/poster).

---

## F3 — CHECKOUT SIMULADO (`app/checkout/page.tsx`)

Layout (max-w-2xl mx-auto py-12):
- Stepper (3 pasos): Resumen → Pago → Confirmación. Indicador brand.accent
  activo, brand.primary-soft inactivo, font-body text-sm.
- Paso 1 Resumen: card con curso/seminario elegido (img thumb, título,
  instructor), selector tipo (Curso individual $X | Suscripción premium $Y/mes),
  total font-heading text-2xl font-bold text-brand.primary, botón "Continuar".
- Paso 2 Pago (MOCK, sin red): formulario card rounded-card shadow-input:
  email (prefill demo@abcavicola.com), nombre tarjeta (placeholder 4242...),
  vencimiento, cvv, botón "Pagar (simulado)" ButtonCTA. NOTA visible:
  "Checkout simulado — no se procesa pago real" bg-brand.accent text-brand.primary
  font-body text-xs rounded-pill. PROHIBIDO fetch a pasarela (CA-4).
- Paso 3 Confirmación: check brand.accent, "Acceso desbloqueado", botón
  "Ir a mi curso" → /academia/[id] (marca comprado en localStorage).

Interacciones: stepper avanza con validación client-side ligera (formato, no
real); submit paso 2 → setTimeout 1.2s → paso 3 (simula latencia, sin red);
localStorage set purchased:[id].
Responsive: 1 col; stepper horizontal <sm → vertical.
CA específicos: Network tab muestra 0 requests a stripe/mercadopago/mux
(CA-4); desbloqueo persiste y alimenta F4.

---

## F4 — ÁREA DE MIEMBRO (`app/mi-cuenta/page.tsx`)

Layout (max-w-[1320px] mx-auto py-10):
- Header: saludo "Hola, demo@abcavicola.com" font-heading text-3xl font-bold
  text-brand.primary + botón logout (limpia localStorage).
- Grid "Mis cursos" (md:grid-cols-2 lg:grid-cols-3 gap-6): CardCursoMio =
  img h-40, título, barra progreso lineal (track brand.primary-soft, fill
  brand.accent, rounded-pill), % font-body text-sm, botón "Continuar" →
  /academia/[id]. Solo los comprados en localStorage.
- "Certificados" (sección): cards con estado "Próximamente" (badge gris
  line.border, no emitir PDF real — AT-DEMO-001 §3 F4).
- Sidebar/links: Perfil (mock), Suscripción (estado mock), Soporte (mail mock).

Interacciones: logout limpia storage y redirige landing; continuar lleva al
player con progreso previo.
Responsive: grid 1 col <md.
CA específicos: refleja compras de F3; 0 datos reales; banner visible.

---

## F5 — PANEL MERCADO + FEED MOCK (`app/mercado/page.tsx`, `app/comunidad/page.tsx`)

Mercado (`/mercado`):
- Header "Cotizaciones de mercado" + etiqueta global "DE MUESTRA" bg-brand.accent.
- Tabs (Pollo / Huevo / Maíz / Soya) chips brand.primary activo.
- Tabla (data/market.json): columnas Producto | Presentación | Unidad | Moneda |
  Ubicación | Fecha | Responsable (carga editorial simulada, DEC-001). Filas
  striped, header font-heading text-sm font-bold text-white bg-brand.primary,
  celdas font-body text-sm. Botón "Exportar (mock)" toast "DE MUESTRA".
- Gráfico simple (línea/barras SVG, stroke brand.accent, grid line.border) —
  opcional si tiempo; si no, solo tabla.

Comunidad/Feed (`/comunidad`):
- Header "Comunidad B2B" + botón "Publicar" (modal mock).
- Feed (max-w-2xl mx-auto): CardPost = avatar empresa, nombre font-heading
  font-medium, timestamp font-body text-xs text-ink.footer, cuerpo font-body
  text-base, acciones like/compartir (íconos brand.primary, contador mock),
  badge "Patrocinado" bg-brand.accent text-brand.primary para posts de marcas.
  Datos posts.json.
- Modal publicar: textarea + botón "Publicar (mock)" → prepend al feed
  (estado local, sin backend).

Interacciones: tabs filtran tabla client-side; like toggle local; publicar
añade post local.
Responsive: tabla scroll-x <md; feed 1 col.
CA específicos: ninguna cifra sin etiqueta DE MUESTRA (CA-6); 0 red.

---

## Orden de construcción sugerido (para commits feat(demo): …)
1. scaffold Next.js + Tailwind + config + PrototypeBanner + layout base.
2. F1 landing (TopBar/NavBar/Hero/cards/stats/footer).
3. F2 catálogo + detalle + PlayerMock + overlay.
4. F3 checkout mock + localStorage purchase.
5. F4 área miembro (consume F3).
6. F5 mercado + feed mock.
7. deploy preview + walkthrough.
Si el tiempo aprieta, recortar F5 ANTES que F2/F3 (R1 del contrato).

## Evidencia requerida por pantalla (cierra CA-1..CA-9)
- Capturas desktop(1440)+móvil(390) de cada flujo.
- Log npm run build.
- Network tab vacío en checkout (CA-4).
- URL preview + walkthrough 2-3 min.