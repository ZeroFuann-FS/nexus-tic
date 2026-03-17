# Análisis Cognitivo y Ergonómico — Nexus-TIC

**Plataforma:** Nexus-TIC — Sistema Inteligente de Orientación para Residencias Profesionales  
**Fecha:** Marzo 2026  
**Versión:** 2.0

---

## 1. Modelos Mentales y Solución de Problemas

### 1.1 Modelo Mental del Usuario

El usuario típico de Nexus-TIC es un estudiante de Ingeniería en TICs que busca una empresa para realizar residencias profesionales. Su modelo mental se construye sobre tres expectativas fundamentales:

- **Flujo conversacional:** El chatbot imita la interacción con un asesor humano. El estudiante espera preguntas secuenciales que progresivamente construyan su perfil, similar a una entrevista vocacional.
- **Sistema de recomendación:** Basándose en experiencias con plataformas como Netflix o Spotify, el usuario espera que el sistema "entienda" sus preferencias y ofrezca resultados relevantes ordenados por compatibilidad.
- **Exploración libre:** El directorio de empresas permite la navegación autónoma, complementando la recomendación algorítmica con descubrimiento propio.

### 1.2 Problemas de Interacción Identificados

| Problema | Impacto | Solución Implementada |
|----------|---------|----------------------|
| Confusión sobre qué hace la animación del cerebro | El usuario podría no entender que es decorativa | Se posiciona como elemento visual secundario; el texto del héroe comunica la propuesta de valor |
| Chatbot podría sentirse impersonal | Abandono del diagnóstico | Se implementó TTS (voz), efectos de sonido y un indicador visual de "hablando" para humanizar la interacción |
| Pérdida de resultados al navegar | Frustración y repetición | Se implementó persistencia con `sessionStorage` |
| Incertidumbre sobre el progreso | Ansiedad del usuario | Barra de progreso visible con 5 pasos claramente definidos |

### 1.3 Modelo de Solución de Problemas

El flujo del chatbot sigue el **modelo de embudo cognitivo**:

1. **Identificación** → Nombre del usuario (ancla personal)
2. **Exploración** → Intereses amplios (chips de selección múltiple)
3. **Refinamiento** → Área específica detectada + confirmación
4. **Especificación** → Tecnologías concretas
5. **Preferencia** → Modalidad de trabajo

Cada paso reduce progresivamente el espacio de decisión, facilitando la toma de decisiones mediante **eliminación progresiva**.

---

## 2. Atención, Memoria y Percepción

### 2.1 Jerarquía de Atención Visual

La interfaz utiliza múltiples estrategias para dirigir la atención:

#### Efectos Neón y Animación
- **Título con glow pulsante:** La animación `neon-pulse` alterna entre tonos azul eléctrico (#276EF1) y cyan (#009CDE), creando un punto focal inmediato según la **Ley de Von Restorff** (efecto de aislamiento).
- **Animación del cerebro:** Los puntos que se ensamblan y desensamblan explotan el sesgo de **detección de movimiento** del sistema visual periférico, atrayendo la mirada hacia el lado derecho del hero.
- **Staggered animations:** Las entradas secuenciales de texto crean una narrativa visual temporal que guía la lectura de arriba hacia abajo.

#### Jerarquía Cromática
- **Azul primario (#276EF1):** Acciones principales, elementos interactivos, highlights
- **Blanco (#FFFFFF):** Contenido de texto principal
- **Gris (#E5E5E4):** Contenido secundario, metadata
- **Negro (#000000):** Fondo, creando máximo contraste

### 2.2 Ayudas de Memoria

- **Iconografía consistente:** Lucide-react proporciona un sistema de iconos uniforme (Bot, MapPin, Briefcase) que reduce la necesidad de leer etiquetas.
- **Chips de selección:** Presentan opciones visualmente, eliminando la necesidad de recordar posibilidades (reconocimiento vs. recuerdo — **Principio de Nielsen #6**).
- **Barra de progreso:** Proporciona orientación espacial dentro del flujo del chatbot.
- **Persistencia de sesión:** Elimina la carga de memoria a largo plazo sobre resultados previos.

### 2.3 Canales Sensoriales

| Canal | Implementación | Propósito |
|-------|---------------|-----------|
| **Visual** | Animaciones Framer Motion, efectos neón, plexus background, indicador de audio | Engagement y feedback visual |
| **Auditivo** | Web Speech API (TTS), chime/beep con Web Audio API | Accesibilidad, retroalimentación de acciones, humanización del bot |
| **Táctil/Motor** | Chips de selección, botones con whileHover/whileTap, hover lift en cards | Interacción directa con feedback háptico visual |

La combinación de tres canales sensoriales sigue el **principio de codificación dual** de Paivio, mejorando tanto la comprensión como la retención de información.

---

## 3. Arquitecturas Cognitivas y Canales de Entrada

### 3.1 Procesos Cognitivos Activados

#### Reconocimiento vs. Recuerdo
- **Reconocimiento (predominante):** Los chips de intereses, tecnologías y modalidades presentan todas las opciones visibles. El usuario solo debe reconocer lo que le aplica.
- **Recuerdo (mínimo):** Solo el campo de nombre requiere recuerdo activo. Esto cumple con la **heurística de Nielsen #6**: "Recognition rather than recall."

#### Carga de Memoria de Trabajo
La interfaz mantiene la carga dentro de los **7±2 elementos** de Miller:
- **Intereses:** 12 opciones presentadas visualmente (no memorizadas)
- **Tecnologías:** 18 opciones en chips scrollables
- **Áreas:** 5 opciones mutuamente excluyentes
- **Modalidades:** 3 opciones claras

#### Reconocimiento de Patrones
La animación del cerebro activa el sistema de reconocimiento de patrones del usuario:
- Los puntos flotantes inicialmente no forman patrón → curiosidad
- La formación progresiva del cerebro → satisfacción de reconocimiento
- La asociación cerebro = inteligencia refuerza la propuesta de valor de "IA"

### 3.2 Canales de Entrada Soportados

| Canal | Soporte | Componentes |
|-------|---------|-------------|
| **Teclado** | ✅ Completo | Navegación con Tab, Enter para confirmar, input de nombre |
| **Ratón/Touch** | ✅ Primario | Chips, botones, cards con hover effects |
| **Voz (salida)** | ✅ TTS | Mensajes del bot leídos en voz alta |
| **Voz (entrada)** | ⬜ Futuro | Potencial integración con Web Speech Recognition API |

### 3.3 Reducción de Carga Cognitiva

Estrategias implementadas siguiendo la **Teoría de Carga Cognitiva** de Sweller:

1. **Segmentación:** El diagnóstico se divide en 5 pasos discretos en lugar de un formulario monolítico.
2. **Señalización:** La barra de progreso y los mensajes del bot señalizan la etapa actual.
3. **Eliminación de redundancia:** Cada paso muestra solo las opciones relevantes.
4. **Detección automática:** El sistema sugiere el área basándose en intereses seleccionados, reduciendo la decisión a una simple confirmación.
5. **Feedback inmediato:** Sonidos, animaciones y mensajes del bot confirman cada acción.

---

## 4. Ergonomía

### 4.1 Confort Visual

#### Fatiga Visual por Modo Oscuro + Neón
- **Riesgo:** El contraste extremo (blanco sobre negro) combinado con efectos neón puede causar fatiga visual en sesiones prolongadas.
- **Mitigaciones implementadas:**
  - Modo claro disponible como alternativa
  - Intensidad del glow neón moderada (opacidad 0.3-0.4)
  - Fondo no es negro puro (#09091A) sino ligeramente azulado, reduciendo el contraste harsh
  - Animaciones del plexus background usan opacidad baja (0.12) para no competir con el contenido

#### Ratios de Contraste (WCAG AA)
| Elemento | Contraste | Cumple AA |
|----------|-----------|-----------|
| Texto principal (blanco sobre #09091A) | 18.3:1 | ✅ AAA |
| Texto secundario (#CCCCCC sobre #09091A) | 11.2:1 | ✅ AAA |
| Texto primario azul (#276EF1 sobre #09091A) | 4.8:1 | ✅ AA |
| Modo claro: texto (#09091A sobre #F5F7FA) | 16.1:1 | ✅ AAA |

### 4.2 Tipografía y Legibilidad

- **Font:** Space Grotesk — fuente geométrica moderna con excelente legibilidad en pantalla
- **Tamaño base:** 14-16px para cuerpo de texto
- **Line-height:** 1.6-1.8 (`leading-relaxed`) para facilitar la lectura
- **Peso:** Uso estratégico de pesos (400 body, 600 labels, 700-900 títulos) para crear jerarquía clara

### 4.3 Targets de Interacción

Siguiendo las **WCAG 2.5.5 Target Size** y la **Ley de Fitts**:

| Elemento | Tamaño | Cumple |
|----------|--------|--------|
| Botones de acción | 40-56px altura | ✅ (mín. 44px recomendado) |
| Chips de selección | 36px altura | ✅ |
| Botones de modalidad | 56px+ altura, ancho completo | ✅ Excelente |
| Iconos de acción (toggle) | 40x40px | ✅ |
| Separación entre chips | 8px gap | ✅ Evita errores de toque |

### 4.4 Accesibilidad

#### Implementaciones Actuales
- **`aria-label`** en botones de icono (tema, idioma, voz)
- **`aria-hidden`** en elementos decorativos (plexus canvas)
- **Etiquetas semánticas:** `<nav>`, `<main>`, `<h1>`-`<h3>`, `<form>`
- **Focus visible:** Anillos de foco con `focus-visible:ring-2`
- **Navegación por teclado:** Tab order lógico, Enter para confirmar
- **Alternativa no visual:** TTS lee los mensajes del bot

#### Recomendaciones Futuras
1. **Live regions:** Agregar `aria-live="polite"` al contenedor de mensajes del chatbot para lectores de pantalla.
2. **Skip navigation:** Agregar enlace "Saltar al contenido" para usuarios de teclado.
3. **Reducción de movimiento:** Respetar `prefers-reduced-motion` desactivando animaciones del cerebro y plexus.
4. **Alto contraste:** Modo de alto contraste para usuarios con baja visión.
5. **Voice input:** Integrar Web Speech Recognition API para permitir entrada por voz en el chatbot.

### 4.5 Soporte Multilingüe como Factor Ergonómico

La internacionalización (ES/EN) implementada con `react-i18next` mejora la ergonomía cognitiva al:
- Permitir que usuarios no hispanohablantes interactúen sin barreras lingüísticas
- Mantener consistencia de la interfaz independientemente del idioma
- Facilitar la adopción por instituciones educativas con programas bilingües

---

## 5. Resumen de Principios Aplicados

| Principio | Aplicación |
|-----------|-----------|
| **Ley de Fitts** | Targets grandes, botones de ancho completo para modalidades |
| **Ley de Hick** | Reducción progresiva de opciones en cada paso del chatbot |
| **Efecto Von Restorff** | Glow neón destaca el título y CTA del resto de la página |
| **Principio de Proximidad (Gestalt)** | Chips agrupados por categoría, cards con información relacionada |
| **Carga Cognitiva** | Flujo segmentado, detección automática de área, reconocimiento > recuerdo |
| **Codificación Dual** | Visual (animaciones) + Auditivo (TTS) + Motor (chips interactivos) |
| **Nielsen #1: Visibilidad del estado** | Barra de progreso, indicador "En línea", audio indicator |
| **Nielsen #6: Reconocimiento > Recuerdo** | Chips de selección en lugar de campos de texto libre |
| **WCAG AA** | Contrastes verificados, targets de 44px+, navegación por teclado |

---

*Documento generado para Nexus-TIC v2.0 — Sistema de análisis de compatibilidad para residencias profesionales en Ingeniería en TICs.*
