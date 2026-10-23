---
document_id: AGENTS-DEMO
title: Reglas de Operación — Prototipo Demo ABC Avícola
version: 0.1.0
status: APPROVED
authority: ADAPTER
document_owner:
  - ABC Avícola Platform Owner
language: es
created_at: 2026-10-23
last_reviewed_at: 2026-10-23
approved_at: 2026-10-23
supersedes: []
superseded_by: []
source_documents:
  - "abc-avicola-platform/AGENTS.md@0.2.0 (canónico, trazabilidad)"
  - "abc-avicola-platform DEC-005 (autorización del prototipo)"
  - "design-system.md@0.1.0"
  - "contracts/AT-DEMO-001.md"
related_documents: []
change_control: DECISION_CONTROLLED
obsidian_compatible: true
---

# Adaptador de Operación — abc-avicola-demo

## 1. Misión
Construir el PROTOTIPO funcional frontend-only autorizado por DEC-005 del
repo canónico `abc-avicola-platform`. Esto NO es el producto. Es un artefacto
comercial de validación con vigencia hasta la sesión de demo con el cliente.

## 2. Límites operativos (autocontenidos; Coder debe respetarlos aunque no
##    pueda leer el repo canónico)
- Sin backend, sin base de datos real, sin autenticación real (auth simulada
  con localStorage/Context).
- Sin pagos reales: checkout simulado, sin llamadas a pasarelas.
- Sin datos reales de usuarios ni de mercado: 100% mock en /data.
- Sin Mux/DRM reales: el player usa video de muestra + overlay de marca de
  agua simulada (email ficticio).
- Sin migraciones, sin infraestructura, sin despliegue a producción.
- Banner permanente visible en todas las vistas:
  "PROTOTIPO FUNCIONAL — DATOS DE MUESTRA".
- PROHIBIDO tocar el repo canónico `abc-avicola-platform` desde aquí.
- El código del prototipo NO es base del producto; su reutilización futura
  requiere un ADR específico en el canónico.

## 3. Fuentes de verdad del demo (orden de precedencia)
1. contracts/AT-DEMO-001.md  → qué se construye y cuándo se detiene.
2. design-system.md@0.1.0    → tokens de marca (CONFIRMED vs ASSUMPTION).
3. tailwind.config.js        → implementación de esos tokens.
4. docs/blueprints.md        → especificación de las 5 pantallas.
No inventes pantallas, flujos ni tokens fuera de estas fuentes.

## 4. Trazabilidad
Este repo es espejo operativo de DEC-005 del canónico. La autoridad de por qué
existe este demo vive en `abc-avicola-platform` (DEC-005), no aquí. Aquí solo
vive el CÓMO acotado. Si DEC-005 se revoca o expira, este repo se congela.

## 5. Ciclo de aprobación (igual que el canónico, acotado al demo)
- No autoaprobar documentos ni estados.
- Toda aprobación humana explícita, con hash cuando haya filesystem.
- Cambios de estado: DRAFT → PROPOSED → IN_REVIEW → APPROVED (documental) y
  NOT_STARTED → IN_PROGRESS → IMPLEMENTED → VERIFIED (entrega), separados.
- Al cerrar cada sesión: git push al remoto y confirmar hash remoto; si no hay
  credenciales, advertir ANTES de dar por terminado y ofrecer exportar bundle.
  Un commit local NO equivale a trabajo guardado.

## 6. Prohibición absoluta
No iniciar implementación del producto (CUT-1 real). Eso requiere autorización
separada en el canónico tras COMPLETE_AND_FROZEN. Aquí solo se construye el
prototipo de DEC-005.