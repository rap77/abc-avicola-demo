---
document_id: AT-DEMO-001
title: Contrato atómico — Prototipo funcional frontend-only ABC Avícola
version: 0.1.0
status: APPROVED
authority: CONTRACT
document_owner:
  - ABC Avícola Platform Owner
language: es
created_at: 2026-10-23
last_reviewed_at: 2026-10-23
approved_at: 2026-10-23
approval_scope: "Aprobado como contrato de EJECUCIÓN DEL PROTOTIPO (DEC-005), NO del producto. execution_authorization GRANTED solo este contrato, solo repo abc-avicola-demo, vigencia hasta 2026-10-26. production_access_allowed: false. real_data_allowed: false."
sha256: 88fda2fdd1d21417bc8508c898f6830878a0479b1dfc7560aa5151f7fc4dab72  # SHA-256 FINAL del archivo contracts/AT-DEMO-001.md en estado APPROVED (hash autoconsistente: calculado sobre la versión final aprobada)
supersedes: []
superseded_by: []
source_documents:
  - abc-avicola-platform/DEC-005 (autorización del prototipo)
  - abc-avicola-platform/AGENTS.md@0.2.0 (Ajuste C: 11 secciones del contrato)
  - ./design-system.md@0.1.0
  - ./tailwind.config.js
  - ./AGENTS.md@0.1.0 (adaptador del demo)
related_documents:
  - ./docs/blueprints.md (pendiente: especificación visual de las 5 pantallas)
change_control: DECISION_CONTROLLED
obsidian_compatible: true
---

# AT-DEMO-001 — Prototipo funcional frontend-only (ABC Avícola)

## Esquema del contrato (Sección 18 del Prompt Universal)

```yaml
contract_id: AT-DEMO-001
version: 0.1.0
status: APPROVED   # Aprobado por ABC Avícola Platform Owner (humano) el 2026-10-23 como contrato de EJECUCIÓN DEL PROTOTIPO (DEC-005), no del producto
type: IMPLEMENTATION
artifact_class: PROTOTYPE_COMMERCIAL   # NO es implementación del producto (CUT-1)
title: Demo navegable de 5 flujos con datos mock para validación comercial
objective: >
  Producir un prototipo frontend-only, desplegado en preview, que demuestre
  end-to-end el flujo de valor del CUT-1 propuesto (registro → pago simulado →
  acceso a video protegido → consumo → progreso) más landing, catálogo, panel
  de mercado y feed, usando 100% datos mock y la identidad visual de ABC Avícola.
normative_sources:
  - DEC-005 (canónico)
  - design-system.md@0.1.0
  - AGENTS.md@0.1.0 (adaptador del demo)
decisions_applied:
  - DEC-001 (carga manual de mercado → en el demo se mockea como "carga editorial")
  - DEC-003 (VOD primero, sin live → el player es VOD simulado)
  - DEC-005 (prototipo frontend-only, repo separado, vigencia hasta 26/10/2026)
preconditions:
  - Repo abc-avicola-demo conectado a Coder y NO el canónico.
  - design-system.md y tailwind.config.js presentes en raíz del demo.
  - AGENTS.md (adaptador) presente en raíz del demo.
  - Logos e íconos de marca movidos de raíz a public/assets/brand/ (ver §5).
  - docs/blueprints.md disponible (o los criterios de aceptación por pantalla de §7).
depends_on: []
scope:
  - 5 flujos navegables (ver §3).
  - Banner permanente "PROTOTIPO FUNCIONAL — DATOS DE MUESTRA" en todas las vistas.
  - Deploy en preview (Vercel) con URL pública para el cliente.
  - Responsive móvil-first (el benchmark 3tres3 y el sitio actual son mobile-heavy).
out_of_scope:
  - Backend, base de datos real, API real, autenticación real.
  - Pagos reales / llamadas a pasarelas (Stripe/MercadoPago en modo test NO; se simula).
  - Mux / DRM / signed URLs reales (se simula con video local + overlay).
  - Migración WordPress, datos reales de usuarios o de mercado.
  - Infraestructura, despliegue a producción, piloto.
  - App móvil nativa, multiidioma, calculadoras, e-diagnóstico.
allowed_paths:
  - ./src/**  ./app/**  ./components/**  ./public/assets/**  ./data/**  ./docs/**
forbidden_paths:
  - ../abc-avicola-platform/**   # repo canónico: PROHIBIDO tocar desde aquí
  - .env*  ./secrets/**          # sin secretos en el repo
expected_outputs:
  - App Next.js (App Router) + Tailwind que compila sin errores.
  - 5 flujos navegables end-to-end en preview.
  - URL de Vercel preview + video walkthrough 2-3 min.
  - docs/blueprints.md (si aún no existe, se genera ANTES de construir).
acceptance_criteria: ver §7
quality_gates:
  - QG-CODE: build pasa (npm run build) sin errores ni warnings bloqueantes.
  - QG-TEST: smoke manual de los 5 flujos registrado en evidencia.
  - QG-SEC: sin secretos, sin datos reales, sin llamadas a pasarelas/Mux reales.
  - QG-DATA: 100% mock; ninguna cifra de mercado sin etiqueta "DE MUESTRA".
  - QG-OBS: banner de prototipo visible en todas las vistas.
  - QG-AI: sin autoaprobación; evidencia de cada gate adjunta al cierre.
invariants:
  - "Cruces de tenant aceptados = 0 (no hay tenant real; se simula aislamiento)."
  - "Secretos en repositorio = 0."
  - "Pagos reales ejecutados = 0."
  - "Datos personales reales procesados = 0."
required_tests:
  - Build de producción exitoso.
  - Navegación sin errores de consola en los 5 flujos (desktop + móvil).
  - Checkout simulado no dispara red externa real (verificar Network tab).
required_evidence:
  - URL de preview accesible.
  - Video walkthrough 2-3 min.
  - Capturas de las 5 pantallas (desktop + móvil).
  - Log de npm run build (sin errores).
  - Checklist de §7 marcada con responsable y fecha.
security_constraints:
  - Sin autenticación real; auth simulada con Context + localStorage.
  - Sin almacenamiento de credenciales reales; el "login" usa un email ficticio.
  - El overlay de marca de agua usa un email de muestra (ej. demo@abcavicola.com), NO real.
data_constraints:
  - Todo dato en ./data/*.json, etiquetado como muestra.
  - Cifras de mercado ficticias coherentes (no inventar "precios reales").
external_service_constraints:
  - Ningún servicio externo real. Video de muestra local o placeholder.
  - Fuentes tipográficas (Work Sans, Nunito Sans) vía next/font o CDN público, sin keys.
execution_authorization: GRANTED          # solo este contrato, solo repo demo
implementation_authorization: NOT_GRANTED # del PRODUCTO (CUT-1) sigue bloqueada
migration_execution_authorization: NOT_GRANTED
production_access_allowed: false
real_data_allowed: false
validity: hasta 2026-10-26 (sesión de demo con el cliente); luego se congela.
rollback_or_recovery: ver §10
verifier: ABC Avícola Platform Owner (humano) — no se auto-verifica.
```

## 1. Objetivo
Construir el prototipo comercial que DEC-005 autoriza: una demo frontend-only,
navegable y desplegada, que valide visualmente el flujo de valor del CUT-1 ante
el cliente en 3 días. **No es el producto.** Su código no es base del CUT-1
salvo ADR futuro de reutilización (AGENTS.md@0.2.0 §2.5 del canónico).

## 2. Precondiciones (bloqueantes; si falta una, DETENERSE y reportar)
1. Coder conectado a `abc-avicola-demo`, NO al canónico.
2. `design-system.md@0.1.0` y `tailwind.config.js` en raíz del demo.
3. `AGENTS.md` (adaptador) en raíz del demo.
4. **Mover logos/íconos de raíz a `public/assets/brand/`** (`.svg` para UI,
   `.webp`/`.png` para fotos). En Next.js los estáticos se sirven desde `/public`;
   en raíz el build/paths rompen. Verificar con `ls public/assets/brand/`.
5. `docs/blueprints.md` disponible. Si no, generarlo ANTES de escribir pantallas
   (es el "cómo visual"; este contrato es el "qué verificable").
6. Tokens `ASSUMPTION` del design system revisados visualmente por el humano
   (hex deducidos, no confirmados). Los `CONFIRMED` no se tocan.

## 3. Incluye (los 5 flujos + extras mínimos)
- **F1 Landing pública:** hero con propuesta de valor, 3 cards de verticales
  (Avian Business / Agro&Talento / Academia), últimas noticias mock, CTA.
- **F2 Academia:** catálogo de cursos → detalle → player VOD simulado con
  **overlay de marca de agua** (email de muestra, rotado, opacidad baja) →
  lista de módulos → marcar lección completada.
- **F3 Checkout simulado:** elegir curso individual o suscripción → formulario
  tipo pasarela (mock, sin red) → éxito → desbloqueo de acceso en F2/F4.
- **F4 Área de miembro:** mis cursos, progreso (barra/circular), certificado
  "próximamente" (no emitir PDF real aún).
- **F5 Extras mock:** panel de datos de mercado (tabla con cifras de muestra,
  etiqueta "DE MUESTRA", carga editorial simulada) + feed social B2B básico
  (posts de marcas, like/comentario simulados).
- **Transversal:** banner permanente "PROTOTIPO FUNCIONAL — DATOS DE MUESTRA";
  auth simulada; responsive móvil-first; deploy preview.

## 4. Excluye (límites ABSOLUTOS — violarlos = bloquear el contrato)
Backend · BD real · API real · auth real · pagos reales · pasarelas (ni test) ·
Mux/DRM/signed URLs reales · migración WordPress · datos reales de usuarios o
mercado · infraestructura · producción · piloto · app nativa · multiidioma ·
calculadoras · e-diagnóstico · **tocar el repo canónico**.

## 5. Archivos / componentes afectados
- Crear: `app/` (layout, páginas de los 5 flujos), `components/` (TopBar, NavBar,
  ButtonCTA, CardVertical, CardNews, PlayerMock con overlay, CheckoutMock,
  MemberArea, MarketPanel, FeedMock, PrototypeBanner), `data/` (courses.json,
  market.json, posts.json, news.json — todo mock), `public/assets/brand/`.
- Reutilizar tokens de `tailwind.config.js` (brand.primary #5F249F,
  brand.accent #F4C542, etc.); **no hardcodear hex** fuera del config.
- PROHIBIDO escribir fuera de `allowed_paths`; PROHIBIDO `../abc-avicola-platform`.

## 6. Reglas y permisos
- Filesystem: solo el repo demo. Sin secretos, sin `.env` con credenciales.
- Red: ninguna llamada externa real en runtime (checkout y player son mock).
  Única red permitida: fetch de fuentes tipográficas públicas / next/font.
- Sin `npm install` de paquetes de pago/DRM/streaming real. Solo deps de UI
  (Next, Tailwind, shadcn/ui, lucide-react). Registrar versión en lockfile.
- Commits atómicos por pantalla/flujo; mensaje `feat(demo): ...`.
- Al cerrar sesión: `git push` al remoto del demo y confirmar hash remoto; si no
  hay credenciales, advertir ANTES de dar por terminado y ofrecer bundle
  (AGENTS.md@0.2.0 §5 del canónico, replicado en el adaptador).

## 7. Criterios de aceptación (el "funcional" verificable)
- **CA-1:** `npm run build` pasa sin errores.
- **CA-2:** Los 5 flujos navegables end-to-end sin errores de consola, en
  desktop (1440) y móvil (390).
- **CA-3:** Flujo F2→F3→F4: un usuario "simulado" compra → ve el video con
  overlay de marca de agua → marca progreso → aparece en área de miembro.
- **CA-4:** El checkout NO dispara red externa real (verificable en Network).
- **CA-5:** Banner "PROTOTIPO FUNCIONAL — DATOS DE MUESTRA" visible en TODAS
  las vistas, incluida móvil, sin tapar contenido crítico.
- **CA-6:** Ninguna cifra de mercado sin etiqueta "DE MUESTRA".
- **CA-7:** Identidad visual bate con `design-system.md` (primary/accent,
  Work Sans/Nunito Sans, radios pill/card, sombras cta). Los `ASSUMPTION`
  ajustados en precondición 6 se respetan.
- **CA-8:** Deploy preview accesible por URL pública (el cliente lo abre sin login).
- **CA-9:** Walkthrough 2-3 min grabado que recorre los 5 flujos.

## 8. Pruebas y evidencia
- Log de build (CA-1).
- Capturas desktop+móvil de las 5 pantallas (CA-2, CA-7).
- Grabación de Network durante checkout mostrando 0 llamadas reales (CA-4).
- Video walkthrough (CA-9) + URL de preview (CA-8).
- Checklist §7 marcada con fecha y responsable (tú).
- Evidencia de precondición 4: `ls public/assets/brand/` con los logos.

## 9. Riesgos (y mitigación)
- **R1 Deadline 3 días:** mitigado limitando a 5 flujos y mock; si algo se cae,
  se recorta F5 (mercado/feed), NUNCA F2/F3 (el flujo de valor).
- **R2 Mock que "parece real":** el banner (CA-5) y las etiquetas "DE MUESTRA"
  (CA-6) son obligatorios; sin ellos, riesgo comercial de prometer de más.
- **R3 Scope creep del cliente:** el contrato cierra §4; cualquier "y además…"
  se registra como DEFERRED, no se construye en el demo.
- **R4 Tokens ASSUMPTION:** revisados en precondición 6 antes de construir;
  si el cliente objeta un hex, se corrige en design-system + config, no a mano.
- **R5 Reutilización futura del código:** declarado en §1; el demo NO es base
  del CUT-1 salvo ADR. Evita que el cliente asuma "ya casi lo tenían hecho".

## 10. Reversión / recuperación
- El demo es aislado: eliminar el repo `abc-avicola-demo` o su preview de Vercel
  **no afecta** al canónico ni a ningún sistema real (rollback trivial).
- A nivel de commits: `git revert` de los `feat(demo): ...` si una pantalla
  introduce deuda; no se fuerza push.
- Si Coder rompe el build: `git stash`/`git checkout -- .` sobre el último
  commit verde; NUNCA `reset --hard` sin orden humana (Sección 21).

## 11. Autorización requerida
- `execution_authorization: GRANTED` **solo** para este contrato, **solo** en el
  repo demo, vigencia hasta **2026-10-26**.
- `implementation_authorization` del **producto** (CUT-1): **NOT_GRANTED** —
  requiere `COMPLETE_AND_FROZEN` + autorización separada en el canónico.
- `production_access_allowed: false` · `real_data_allowed: false`.
- Verificador: humano (tú). El agente NO se auto-verifica ni autoaprueba.

---

## Formato de cierre de sesión (Sección 26)
Al terminar, entrega: Resultado (PASS / CORRECTIONS_REQUIRED / …) · Fase ·
Documento (AT-DEMO-001@0.1.0) · Estado de entrega (NOT_STARTED→…→VERIFIED) ·
Sha256 de evidencias · Gates superados con evidencia · Siguiente acción ·
Aprobación humana requerida: SÍ.
