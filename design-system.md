---
document_id: DESIGN-SYSTEM
title: Design System ABC Avícola — Demo
version: 0.1.0
status: PROPOSED
authority: NORMATIVE
document_owner:
  - ABC Avícola Platform Owner
language: es
created_at: 2026-10-23
last_reviewed_at: null
approved_at: null
supersedes: []
superseded_by: []
source_documents:
  - Figma import html.to.design (homepage abcavicola.com)
  - Figma to Code Tailwind dump (2026-10-23)
related_documents: []
change_control: DECISION_CONTROLLED
obsidian_compatible: true
---

# Design System — ABC Avícola Platform

Fuente: import Figma de la homepage + dump Tailwind (Figma to Code).
Los valores marcados ASSUMPTION requieren confirmación visual menor;
no bloquean el demo.

## 1. Color

| Token | Valor | Confianza | Uso |
|---|---|---|---|
| brand.primary | #5F249F | CONFIRMED | Top bar, navbar CTA, bandas, footer, títulos de sección |
| brand.primary-soft | rgba(95,36,159,0.05) | CONFIRMED | Fondo de inputs |
| brand.accent | #F4C542 | CONFIRMED | CTAs, underlines, íconos circulares, números stats |
| brand.accent-hover | #F8C32C | CONFIRMED | Social buttons, hover de acento |
| brand.accent-ring | #EDCB50 | CONFIRMED | Anillo de estado activo (dots) |
| line.border | #DADBDD | CONFIRMED | Bordes de inputs |
| info.link | #1A7EFB | CONFIRMED | Focus states, links informativos |
| ink.dark | #111111 | ASSUMPTION | Fondo hero |
| ink.footer | rgba(255,255,255,0.72) | ASSUMPTION | Texto secundario en footer |
| overlay.event | #064E3B | ASSUMPTION | Overlay gradiente cards de eventos |
| danger | #DC2626 | ASSUMPTION | Campos requeridos |
| white | #FFFFFF | CONFIRMED | Texto sobre primary/dark |

Reglas de contraste: texto sobre brand.primary = white; texto sobre brand.accent = brand.primary.

## 2. Tipografía

- font-heading: "Work Sans" (títulos, nav, botones, stats)
- font-body: "Nunito Sans" (párrafos, meta, formularios)

| Rol | Estilo |
|---|---|
| Section title | heading bold 48px/40px (text-5xl), color primary (o accent sobre primary) |
| Card title | heading bold 24px/32px (text-2xl) white sobre imagen |
| News headline | heading semibold 24px/32px |
| Stat number | heading bold 60px/50px (text-6xl) accent |
| Stat label | heading medium 20px/24px white |
| Nav item | heading medium 18px/20px |
| Button | heading medium 16px/24px, capitalize |
| CTA pill | body bold 16px/28px |
| Body | body normal 16px/24px tracking-tight |
| Meta | body normal 14px/24px capitalize tracking-tight |

## 3. Radios

| Token | Valor | Uso |
|---|---|---|
| pill | 999px | CTA "Leer artículo" |
| pill-nav | 55px | Botón "contáctanos" |
| card | 20px | Cards misión/visión y eventos |
| xl | 16px (rounded-2xl) | Cards de verticales, contenedores top bar |
| logo | 10px | Logos partners |
| md | 6px | Inputs, dots grandes |
| dot | 3px | Dots de carousel |
| circle | 24px (rounded-3xl) | Íconos circulares |

## 4. Sombras

| Token | Valor | Uso |
|---|---|---|
| cta | 0 6px 18px rgba(0,0,0,0.18) | Botones CTA |
| play | 1px 0 6px rgba(0,0,0,0.30) | Botones play |
| input | 0 0 10px rgba(0,0,0,0.50) | Inputs newsletter |
| ring-accent | 0 0 0 1px #EDCB50 | Estado activo |
| ring-primary | 0 0 0 1px #5F249F | Estado inactivo |

## 5. Gradientes

| Token | Valor | Uso |
|---|---|---|
| card-overlay | linear 270deg black 35% → black 5% | Cards de verticales |
| event-overlay | linear 270deg overlay.event 75% → 1% | Cards de eventos |
| mission-overlay | linear 180deg white 20% → white 0%, opacity 80% | Cards misión/visión |
| divider-v | linear 180deg white 16% | Divisor vertical stats |
| edge-fade | linear 90deg/270deg black 50% → 0% | Bordes de carousels |

## 6. Patrones de componente

- TopBar: bg primary, py-4, body sm white; ícono email en círculo accent.
- NavBar: h-28 white; items heading medium lg primary; CTA pill-nav primary con círculo accent y flecha primary.
- ButtonCTA: bg accent, pill, px-6 py-3.5, body bold base, texto primary, shadow-cta.
- SectionTitle: text-5xl heading bold centrado; primary sobre blanco, accent sobre primary.
- CardVertical: rounded-xl(16), imagen + card-overlay, título 2xl bold white abajo-izq (p-6).
- CardNews: meta body sm capitalize; headline 2xl semibold; link "Leer" base medium + underline accent w-8 h-0.5.
- StatsBand: bg primary; número 6xl bold accent; label xl medium white; divider-v entre columnas.
- CardMission: rounded-card, imagen + mission-overlay, título 3xl bold white, body base bold white.
- CardEvent: rounded-card, imagen + event-overlay, título 2xl medium white, underline accent w-14 h-0.5.
- SocialIcon: círculo accent-hover size-12, ícono oscuro centrado.
- InputNewsletter: bg primary-soft, rounded-md, outline line.border, shadow-input, texto white.
- ButtonSubscribe: bg accent, rounded-md, heading medium base capitalize.
- Footer: bg primary; headings 2xl semibold white; body base ink.footer; divisores h-px white-16.

## 7. Assets pendientes (NO incluidos en el dump)

- Logo principal (navbar) y logo footer: exportar desde Figma (SVG/PNG 2x) o descargar del sitio live.
- Favicon.
- Íconos de redes y de contacto (si no se exportan, reemplazar por lucide-react equivalentes).
- Imágenes reales de hero/cards: usar placeholders propios o fotos del sitio live solo para demo (marcar como contenido de muestra).

## 8. Reglas para agentes de implementación

- Reconstruir layout con flex/grid responsive; PROHIBIDO copiar posiciones absolutas del dump.
- PROHIBIDO usar placehold.co en el demo final: usar assets exportados o placeholders locales.
- Tokens ASSUMPTION pueden ajustarse visualmente sin bump de versión; cambios en tokens CONFIRMED requieren aprobación.