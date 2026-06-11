# Khor Design System — Guía Completa para IA

Generado: 11 de junio de 2026

## Átomos

### KButton (`button`)

Boton principal del sistema con 6 variantes semanticas de Khor (Radix UI + custom), incluyendo estados de interaccion (hover +10% brightness, active -10% brightness, disabled greyscale 50%).

- **Archivo:** `KButton/index.tsx`
- **Nota IA:** Al generar interfaces, prioriza variant="primary" para la accion mas importante. Usa variant="navy" para acciones de navegacion. Los botones disabled deben ser ignorados por el flujo de IA.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy'` | Variante visual del botón. |
| `size` | `'sm' | 'md' | 'lg'` | Tamaño del botón. |
| `icon` | `ReactNode` | Icono Lucide. Tamaño recomendado: 16px. |
| `iconPosition` | `'start' | 'end'` | Posición del icono relativa al texto. |
| `loading` | `boolean` | Muestra spinner de carga y deshabilita el botón. |
| `disabled` | `boolean` | Desactiva el botón. |
| `block` | `boolean` | Ancho completo del contenedor. |
| `onClick` | `(e: MouseEvent) => void` | Callback al hacer click. |
| `children` | `ReactNode` | Contenido del botón. |

**Accesibilidad:**
- **Teclado:** Tab: Navega al componente y lanza focus ring. Enter/Space: Dispara evento onClick.
- **ARIA:** role="button" aria-disabled="true" y tabIndex={-1} cuando desactivado. aria-busy="true" global durante loading.
- **Contraste:** AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA de 7:1)
- **Score:** 96/100

**Guías:**
- Usa variant="primary" para la accion principal de una pantalla (maximo 1 por vista).
- Usa variant="danger" solo para acciones destructivas como "Eliminar" o "Despedir".
- Tamano sm para tablas y toolbars, md para formularios, lg para CTAs destacados.
- Siempre incluye un icono Lucide (16px, stroke 2px) para mejorar la escaneabilidad.

### KInput (`input`)

Sistema unificado de entrada de datos. Incluye variantes para texto simple, contraseñas, búsquedas, áreas de texto multilínea y códigos OTP. Paridad 100% con Ant Design v5.

- **Archivo:** `KInput/index.tsx`
- **Nota IA:** KInput es ahora un Compound Component. Prioriza el uso de KInput.Password y KInput.Search sobre tipos de input nativos para mejor accesibilidad y funcionalidad.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `size` | `'sm' | 'md' | 'lg'` | Tamaño del componente. |
| `variant` | `'outlined' | 'borderless' | 'filled'` | Variante visual. |
| `status` | `'error' | 'warning'` | Estado de validación. |
| `prefix / suffix` | `ReactNode` | Elementos al inicio o final. |
| `allowClear` | `boolean | { clearIcon: ReactNode }` | Botón para limpiar el contenido. |
| `showCount` | `boolean | { formatter: Function }` | Muestra contador de caracteres. |
| `visibilityToggle (Password)` | `boolean | object` | Control de visibilidad de contraseña. |
| `enterButton (Search)` | `boolean | ReactNode` | Muestra botón de búsqueda. |
| `loading (Search)` | `boolean` | Estado de carga en búsqueda. |
| `autoSize (TextArea)` | `boolean | object` | Ajuste automático de altura. |

**Accesibilidad:**
- **Teclado:** Tab: Foco nativo al input. Esc: Limpia si allowClear=true. Arrow keys (OTP): Navegación entre slots. Enter (Search): Dispara búsqueda.
- **ARIA:** aria-invalid="true" cuando entra en error. role="textbox" (base/textarea). aria-label automáticamente inferido en OTP slots.
- **Contraste:** AA Mínimo para el texto ingresado (>4.5:1)
- **Score:** 98/100

**Guías:**
- Utiliza KInput como namespace para acceder a todas las variantes (.Password, .Search, etc).
- Prefiere allowClear para mejorar la experiencia de usuario en filtros.
- Usa status="error" para validaciones obligatorias fallidas.
- OTP gestiona el foco automáticamente; no es necesario manejar refs manuales.

### KBadge (`badge`)

Notificador de estados o contadores sobre elementos. Incluye variante Ribbon para cintas en esquinas. Paridad 100% con Ant Design v5.

- **Archivo:** `KBadge/index.tsx`
- **Nota IA:** KBadge soporta modo standalone (dot+text) y modo flotante (count). Usa Ribbon para banners promocionales o de estado en esquinas.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `status` | `'success' | 'error' | 'warning' | 'info' | 'default' | 'processing'` | Estado semántico predefinido. |
| `text` | `ReactNode` | Texto junto al punto (en standalone mode). |
| `count` | `ReactNode` | Valor numérico o nodo a mostrar en el badge. |
| `overflowCount` | `number` | Límite máximo antes de mostrar "+". |
| `dot` | `boolean` | Muestra un punto rojo (o color status) sin número. |
| `offset` | `[x, y]` | Desplazamiento del badge. |
| `color` | `string` | Color de fondo personalizado (hex o preset). |
| `size` | `'default' | 'small'` | Tamaño del badge. |
| `title` | `string` | Texto al pasar el mouse. |
| `KBadge.Ribbon` | `Sub-component` | Cinta decorativa para esquinas. |

**Accesibilidad:**
- **Teclado:** No aplica nativamente.
- **ARIA:** role="status" aplicable al contenedor padre. title para tooltips nativos.
- **Contraste:** AAA sobre elemento indicador, AA sobre texto adjunto.
- **Score:** 100/100

**Guías:**
- Usa status para indicadores de sistema standalone.
- Usa count para notificaciones de usuario sobre iconos o avatares.
- Ribbon es ideal para destacar tarjetas o secciones completas.

### KTag (`tag`)

Etiqueta de categorizacion con colores del sistema. Soporta cierre (closable) para tags removibles.

- **Archivo:** `KTag/index.tsx`
- **Nota IA:** KTag implementa paridad total con AntD v5. Incluye CheckableTag y gestión interna de visibilidad si onClose no se maneja externamente.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `color` | `KTagColor | string` | Presets de AntD (magenta, volcano, gold, etc.) o color CSS. |
| `closable` | `boolean` | Muestra un botón de cierre. |
| `bordered` | `boolean` | Define si tiene borde visible. |
| `icon` | `ReactNode` | Icono al inicio del tag. |
| `onClose` | `(e) => void` | Callback al cerrar. Si no se provee, el componente se oculta automáticamente. |
| `closeIcon` | `ReactNode` | Icono de cierre personalizado. |
| `checked` | `boolean` | Estado en CheckableTag. |
| `KTag.CheckableTag` | `Sub-component` | Variante interactiva tipo toggle. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Cierra el tag si es "closable" y tiene foco.
- **ARIA:** role="status" para tags informativos. aria-label para el botón de cierre.
- **Contraste:** Relación 4.5:1 mantenida en todos los presets de color.
- **Score:** 100/100

**Guías:**
- Usa CheckableTag para filtros persistentes.
- Usa colores semánticos (success, error) para estados del sistema.
- Los colores de preset AntD son ideales para categorización visual variada.

### KAvatar (`avatar`)

Avatar de usuario con soporte para imagen, iniciales autoajustables, icono, estado de presencia y color personalizable. KAvatarGroup soporta max count con indicador +N. Paridad completa con AntD Avatar.

- **Archivo:** `KAvatar/index.tsx`
- **Nota IA:** KAvatar para fotos de perfil con iniciales de fallback, indicador online/offline y badge de notificación.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `src` | `string` | URL de imagen del avatar. |
| `alt` | `string` | Texto alternativo para la imagen (accesibilidad). Si se omite, usa name. |
| `srcSet` | `string` | Atributo srcSet para imágenes responsive. |
| `crossOrigin` | `'' | 'anonymous' | 'use-credentials'` | Política CORS para la imagen. |
| `draggable` | `boolean` | Si la imagen es arrastrable. |
| `name` | `string` | Nombre de usuario. Las iniciales se generan automáticamente (primeras 2 palabras). |
| `icon` | `ReactNode` | Icono a mostrar como fallback en lugar de iniciales. |
| `size` | `'sm' | 'md' | 'lg' | 'xl' | number` | Tamaño del avatar. Acepta valor numérico en px. |
| `shape` | `'circle' | 'square'` | Forma del avatar. |
| `status` | `'online' | 'offline' | 'busy' | 'away'` | Indicador de presencia con punto de color. |
| `gap` | `number` | Distancia en px entre el borde y el texto de iniciales. Controla el auto-sizing del texto. |
| `color` | `string` | Color de fondo personalizado. Default: Navy (#051758). |
| `onError` | `() => boolean | void` | Callback cuando la imagen falla. Retornar false previene el fallback automático. |
| `onClick` | `(e: MouseEvent) => void` | Handler de click. Convierte el avatar en elemento interactivo con role="button". |
| `children` | `ReactNode` | Contenido personalizado (texto, icono, etc.). |

**Accesibilidad:**
- **Teclado:** Cuando onClick está definido, el avatar es focuseable con Tab y activable con Enter/Space.
- **ARIA:** alt se aplica automáticamente a la imagen. Si se omite, usa name como fallback. El indicador de estado incluye aria-label descriptivo. onClick convierte el avatar en role="button" con tabIndex=0.
- **Contraste:** AAA entre texto blanco (#FFF) y fondo Navy (#051758). Indicadores de estado cumplen WCAG AA.
- **Score:** 100/100

**Guías:**
- Cuando hay imagen (src), se muestra. Si falla, cae a icon > iniciales > fallback (User icon).
- El fondo de las iniciales usa color.brand.navy por defecto. Usa la prop color para personalizar.
- Tamaño sm para listas densas, md para headers, lg/xl para perfiles.
- gap controla el auto-sizing del texto: valores bajos permiten texto más grande, valores altos más padding.
- KAvatarGroup con max muestra los primeros N avatares y un indicador "+X" con los sobrantes.
- Siempre incluir alt cuando se usa src para cumplir con accesibilidad WCAG.

### KSwitch (`switch`)

Interruptor on/off con etiqueta opcional. Para configuraciones binarias.

- **Archivo:** `KSwitch/index.tsx`
- **Nota IA:** KSwitch para toggle booleano. Usar en lugar de checkbox para cambios que aplican inmediatamente.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `checked` | `boolean` | Estado actual. |
| `onCheckedChange` | `(checked: boolean) => void` | Callback al cambiar. |
| `size` | `'small' | 'default'` | Tamaño del switch. |
| `checkedChildren / unCheckedChildren` | `ReactNode` | Texto o iconos dentro del track. |

**Accesibilidad:**
- **Teclado:** Tab: Navega. Barra Espaciadora: Alterna (toggle).
- **ARIA:** role="switch" (nativamente mapeado por Radix). aria-checked se sincroniza.
- **Contraste:** AAA en el punto blanco sobre track activo
- **Score:** 100/100

**Guías:**
- Siempre incluye una etiqueta descriptiva.
- Usa para preferencias binarias, no para acciones transaccionales.

### KCheckbox (`checkbox`)

Casilla de verificación básica para selección de estados booleanos o grupos de opciones múltiples con KCheckbox.Group.

- **Archivo:** `KCheckbox/index.tsx`
- **Nota IA:** KCheckbox utiliza Radix UI Checkbox bajo el capó. Soporta paridad total con AntD v5 incluyendo Group y Indeterminate.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `checked` | `boolean | 'indeterminate'` | Estado de la casilla. |
| `label` | `ReactNode` | Texto descriptivo adjunto. |
| `status` | `'error' | 'warning' | 'default'` | Variante de validación. |
| `disabled` | `boolean` | Desactiva la interacción. |
| `KCheckbox.Group` | `Sub-component` | Contenedor para múltiples opciones. |
| `options` | `string[] | Option[]` | Opciones dinámicas para el grupo. |
| `styles` | `object` | Estilos semánticos (root, input, label). |

**Accesibilidad:**
- **Teclado:** Tab: Enfocar casilla. Space: Cambiar estado (checked/unchecked).
- **ARIA:** role="checkbox" aplicado automáticamente. aria-checked refleja el estado actual incluyendo indeterminate.
- **Contraste:** Borde y check cumplen con ratio 3:1 mínimo.
- **Score:** 100/100

**Guías:**
- Usa Checkbox para opciones no excluyentes (múltiple selección).
- El estado indeterminate es útil para checkboxes "padre" que controlan una lista.
- Prefiere KCheckbox.Group para manejar estados de formularios complejos.

### KRadio (`radio`)

Grupo de opciones mutuamente excluyentes con soporte para layout vertical/horizontal y variante de boton.

- **Archivo:** `KRadio/index.tsx`
- **Nota IA:** KRadio para selección única. Agrupar con KRadio.Group. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `options` | `{ label: string; value: string | number; disabled?: boolean }[] | string[]` | Array de opciones del grupo de radio. |
| `value` | `string` | Valor actualmente seleccionado (controlado). |
| `onValueChange` | `(value: string) => void` | Callback al cambiar la selección. |
| `direction` | `'horizontal' | 'vertical'` | Orientación del grupo de opciones. |
| `optionType` | `'default' | 'button'` | Estilo visual: radio clásico o grupo de botones. |
| `buttonStyle` | `'solid' | 'outline'` | Aplica solo cuando optionType="button". solid=relleno, outline=solo borde. |
| `size` | `'small' | 'default' | 'large'` | Tamaño del grupo de radio. |
| `disabled` | `boolean` | Deshabilita todas las opciones del grupo. |

**Accesibilidad:**
- **Teclado:** Up/Down/Left/Right: Mueve el foco al siguiente/previo item y lo selecciona. Tab: Entra y sale del contenedor principal.
- **ARIA:** role="radiogroup" asignado al contenedor role="radio" y aria-checked asignados a cada elemento.
- **Contraste:** AAA en anillo indicador
- **Score:** 100/100

**Guías:**
- Máximo 5-6 opciones. Para más opciones, usa KSelectField.
- optionType="button" ideal para filtros y toggles de vista.
- KRadio.Button puede usarse standalone para casos personalizados dentro de un Group.

### KProgress (`progress`)

Barra de progreso para indicar completitud de procesos, cargas o pasos.

- **Archivo:** `KProgress/index.tsx`
- **Nota IA:** KProgress para indicadores de progreso. Soporta barra, círculo y dashboard.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `number` | Porcentaje de progreso (0-100). |
| `max` | `number` | Valor maximo. |
| `status` | `'success' | 'exception' | 'active'` | Estado visual. |
| `showInfo` | `boolean` | Muestra el porcentaje. |
| `strokeColor` | `string` | Color personalizado de la barra. |

**Accesibilidad:**
- **Teclado:** No interactivo. Funciona como indicador pasivo.
- **ARIA:** role="progressbar" aria-valuenow, aria-valuemin, aria-valuemax manejados dinámicamente.
- **Contraste:** AAA entre color de la barra (ej: #2E7D32) y track neutro.
- **Score:** 100/100

**Guías:**
- Usa status="success" cuando llega a 100%.
- strokeColor por defecto es el Rojo Khor primary.

### KTypography (`typography`)

Sistema completo de texto que incluye encabezados (Title), párrafos, enlaces y texto básico con interacciones avanzadas (Edición, Copia, Truncado).

- **Archivo:** `KTypography/index.tsx`
- **Nota IA:** Implementa paridad total con AntD v5. Soporta props legadas (variant, color) en KText para compatibilidad.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `KTypography.Title` | `Sub-component` | Heading con prop level (1-5). |
| `copyable` | `boolean | object` | Permite copiar el texto al portapapeles. |
| `editable` | `boolean | object` | Habilita edición en línea in-place. |
| `ellipsis` | `boolean | object` | Truncado de texto con soporte multi-línea (rows). |
| `type` | `'secondary' | 'success' | 'warning' | 'danger'` | Variante semántica de color. |
| `strong | italic | underline | code | mark | keyboard` | `boolean` | Formatos de estilo rápido. |

**Accesibilidad:**
- **Teclado:** Enfoque automático al entrar en modo edición. Soporte de ESC para cancelar edición.
- **ARIA:** Uso correcto de etiquetas h1-h5. aria-label en botones de copia y edición.
- **Contraste:** Todos los tipos semánticos cumplen con ratio 4.5:1 mín.
- **Score:** 100/100

**Guías:**
- Usa KTypography.Title para jerarquía visual clara (SEO friendly).
- El modo editable es ideal para nombres de archivos o configuraciones rápidas.
- Asegura que el texto copiable sea útil para el usuario (ids, tokens, rutas).

### KAlert (`alert`)

Componente de alerta con 4 tipos semánticos (success, error, warning, info). Incluye icono automático, título, descripción y opción de cerrar.

- **Archivo:** `KAlert/index.tsx`
- **Nota IA:** KAlert para mensajes de feedback que permanecen visibles. La IA debe elegir el tipo correcto según el contexto.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `type` | `'success' | 'error' | 'warning' | 'info'` | Tipo semántico de la alerta. |
| `title` | `string` | Título de la alerta. |
| `description` | `string` | Descripción detallada. |
| `closable` | `boolean` | Permite cerrar la alerta. |
| `showIcon` | `boolean` | Muestra icono semántico. |
| `onClose` | `() => void` | Callback al cerrar. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Descarta alerta si closable tiene foco.
- **ARIA:** role="alert" implementado para live regions (lector la anunciará inmediatamente). aria-label en el icono de cierre.
- **Contraste:** AAA sobre combinaciones fondo tintado / texto oscuro nativo de alerta.
- **Score:** 100/100

**Guías:**
- Usa para mensajes de feedback persistentes (no para notificaciones efímeras, usa KToast para eso).
- El tipo debe coincidir con la semántica del mensaje.

### KSkeleton (`skeleton`)

Placeholder de carga que indica al usuario que el contenido está cargando. Soporta rectángulos, círculos y múltiples líneas de texto.

- **Archivo:** `KSkeleton/index.tsx`
- **Nota IA:** KSkeleton para estados de carga. Combinar con KSpin para carga asíncrona.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `width` | `number | string` | Ancho del skeleton. |
| `height` | `number | string` | Alto del skeleton. |
| `circle` | `boolean` | Forma circular (para avatares). |
| `lines` | `number` | Número de líneas de texto (la última es más corta). |

**Accesibilidad:**
- **Teclado:** No aplicable.
- **ARIA:** role="status" o aria-busy="true" recomendado para el contenedor padre mientras la carga ocurre.
- **Contraste:** Animación pulsante cumple con directrices de destello sutil (sin parpadeos rápidos).
- **Score:** 100/100

**Guías:**
- Usa para indicar carga de contenido, no para carga de página completa (usa KSpin para eso).

### KSlider (`slider`)

Control deslizante para seleccionar un valor numérico dentro de un rango. Basado en Radix UI Slider con tokens Khor.

- **Archivo:** `KSlider/index.tsx`
- **Nota IA:** KSlider para entrada de rango numérico basado en Radix UI Slider. Soporta rangos duales y marcas.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `number[]` | Valor controlado (array de numeros). |
| `defaultValue` | `number[]` | Valor inicial. |
| `min` | `number` | Valor mínimo. |
| `max` | `number` | Valor máximo. |
| `step` | `number` | Incremento. |
| `onValueChange` | `(value: number[]) => void` | Callback al cambiar. |
| `disabled` | `boolean` | Desactiva el slider. |
| `showValue` | `boolean` | Muestra el valor actual. |

**Accesibilidad:**
- **Teclado:** Up/Right: Sube valor. Down/Left: Baja valor. Home/End: Valores extremos.
- **ARIA:** role="slider" aria-valuenow, aria-valuemin, aria-valuemax inyectados. aria-disabled cuando aplica.
- **Contraste:** AAA sobre punto visual, AA track sobre fondo de tarjeta.
- **Score:** 95/100

**Guías:**
- Usa para valores continuos como volumen, brillo, porcentaje.
- Para valores discretos con pocas opciones, usa KRadio variant="button".

### KSpin (`spin`)

Indicador de carga circular con texto opcional. Para estados de carga de página o secciones completas.

- **Archivo:** `KSpin/index.tsx`
- **Nota IA:** KSpin para spinner de carga. Envuelve children para overlay de loading.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `size` | `'sm' | 'md' | 'lg' | 'xl'` | Tamaño del spinner. |
| `color` | `string` | Color del spinner. |

**Accesibilidad:**
- **Teclado:** No aplicable.
- **ARIA:** role="status" aplicable al contenedor padre.
- **Contraste:** AAA asegurada en texto tip.
- **Score:** 100/100

**Guías:**
- Usa para carga de secciones o páginas completas.
- Para carga de contenido específico, usa KSkeleton.

### KDivider (`divider`)

Separador visual horizontal para dividir secciones de contenido. Usa el color neutral.200 del sistema.

- **Archivo:** `KDivider/index.tsx`
- **Nota IA:** KDivider para separación visual. Soporta orientación vertical y texto en línea.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `className` | `string` | Clase CSS adicional. |

**Accesibilidad:**
- **Teclado:** No interactivo.
- **ARIA:** role="separator" detectado nativamente por lectores de pantalla.
- **Contraste:** Decorative (Contraste visual AA).
- **Score:** 100/100

**Guías:**
- Usa para separar secciones dentro de cards o formularios.
- No abuses de dividers — el espaciado y agrupacion son mas efectivos.

### KButtonGroup (`button-group`)

Agrupa botones relacionados en una fila unificada con bordes compartidos o espaciado controlado.

- **Archivo:** `KButtonGroup/index.tsx`
- **Nota IA:** Componente de agrupamiento visual. Asegura que los botones internos tengan el mismo tamaño.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `size` | `'sm' | 'md' | 'lg'` | Espaciado entre botones. |
| `direction` | `'horizontal' | 'vertical'` | Flujo. |

**Accesibilidad:**
- **Teclado:** Tab: Navega entre botones del grupo. Arrows: No implementado (comportamiento de toolbar nativo).
- **ARIA:** role="group" recomendado si se usa fuera de un toolbar. aria-label obligatorio para identificar el propósito del grupo.
- **Contraste:** AAA
- **Score:** 100/100

**Guías:**
- Usa para acciones relacionadas como paginacion o vistas.

### KLabel (`label`)

Etiqueta para campos de formulario con indicador de campo obligatorio y tooltip de informacion.

- **Archivo:** `KLabel/index.tsx`
- **Nota IA:** KLabel para etiquetar inputs. Siempre asociar a un input mediante htmlFor.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `children` | `ReactNode` | Texto. |
| `required` | `boolean` | Muestra asterisco. |
| `info` | `string` | Texto del icono de informacion. |

**Accesibilidad:**
- **Teclado:** Tab: Navega al input asociado.
- **ARIA:** for/id conecta label con input. aria-required se hereda del campo asociado.
- **Contraste:** AAA en texto del label sobre fondo blanco.
- **Score:** 100/100

**Guías:**
- Usa siempre para mejorar la accesibilidad de los inputs.

### KFloatButton (`float-button`)

Botón flotante (FAB) fijo en la esquina de la pantalla. Ideal para acciones principales.

- **Archivo:** `KFloatButton/index.tsx`
- **Nota IA:** KFloatButton para acción flotante FAB. Limitar a 1-2 por página.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `icon` | `ReactNode` | Ícono. |
| `onClick` | `() => void` | Callback. |
| `type` | `'primary'|'default'` | Estilo. |

**Accesibilidad:**
- **Teclado:** Tab: Es alcanzable por orden del DOM.
- **ARIA:** Se provee el aria-label desde tooltip internamente.
- **Contraste:** AAA sobre UI general
- **Score:** 100/100

**Guías:**
- Solo un FAB por pantalla. Usa para la acción más importante.

### KImage (`image`)

Imagen con preview lightbox al hacer clic, fallback para errores de carga y bordes redondeados.

- **Archivo:** `KImage/index.tsx`
- **Nota IA:** KImage para visualización de imágenes con preview y fallback.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `src` | `string` | URL. |
| `preview` | `boolean` | Lightbox. |
| `fallback` | `string` | Fallback. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Si preview=true activa el lightbox.
- **ARIA:** Requiere prop alt explícito nativamente.
- **Contraste:** Decorative
- **Score:** 100/100

**Guías:**
- Usa preview para imágenes que necesitan verse en grande.

### KSpace (`space`)

Componente de layout para espaciar elementos con gap consistente. Soporta dirección, wrap, splitters y tamaños personalizados.

- **Archivo:** `KSpace/index.tsx`
- **Nota IA:** KSpace para layouts con gap consistente. Preferir sobre div con gap manual.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `direction` | `'horizontal' | 'vertical'` | Dirección del flujo. |
| `size` | `number | 'sm' | 'md' | 'lg' | [number, number]` | Espacio entre elementos. |
| `align` | `'start' | 'end' | 'center' | 'baseline'` | Alineación de items. |
| `wrap` | `boolean` | Permite salto de línea. |
| `split` | `ReactNode` | Elemento separador entre items. |

**Accesibilidad:**
- **Teclado:** Navegación determinada por los hijos. KSpace no añade interactividad.
- **ARIA:** No requiere roles ARIA adicionales.
- **Contraste:** N/A — componente de layout puro.
- **Score:** 100/100

**Guías:**
- Usa size="middle" (16px) por defecto para la mayoría de layouts.
- El split con KDivider vertical es ideal para barras de herramientas.

### KQRCode (`qrcode`)

Generador visual de código QR a partir de texto o URL. Usa canvas para renderizado.

- **Archivo:** `KQRCode/index.tsx`
- **Nota IA:** KQRCode para generar QR. Usar solo con value válido.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string` | Texto o URL a codificar. |
| `size` | `number` | Tamaño en px. |
| `color` | `string` | Color de los módulos. |

**Accesibilidad:**
- **Teclado:** No interactivo — es un canvas estático.
- **ARIA:** aria-label recomendado con el valor codificado. role="img" para que lectores de pantalla lo identifiquen.
- **Contraste:** AA minimo entre módulos y fondo.
- **Score:** 90/100

**Guías:**
- Nota: patrón visual representativo. Para QR reales, integra una librería como qrcode.

### KFlex (`flex`)

Contenedor Flex moderno para alinear y distribuir elementos fácilmente.

- **Archivo:** `KFlex/index.tsx`
- **Nota IA:** KFlex para layouts flexbox. Preferir sobre KSpace para layouts complejos con alineación específica.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `vertical` | `boolean` | Dirección vertical (column). |
| `wrap` | `boolean | string` | Propiedad flex-wrap. |
| `justify` | `string` | justify-content. |
| `align` | `string` | align-items. |
| `gap` | `string | number | [number, number]` | Espaciado entre items. |

**Accesibilidad:**
- **Teclado:** Navegación determinada por los hijos. KFlex no añade interactividad.
- **ARIA:** No requiere roles ARIA adicionales.
- **Contraste:** N/A — componente de layout puro.
- **Score:** 100/100

**Guías:**
- Uso preferente sobre KSpace para layouts complejos o distribuciones no estándar.

### KGrid (Row/Col) (`grid`)

Sistema de rejilla responsiva de 24 columnas (Grid System) para crear layouts complejos que se adaptan a cualquier resolución.

- **Archivo:** `KGrid/index.tsx`
- **Nota IA:** KGrid (Row/Col) sistema de rejilla 24 columnas responsiva. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `gutter` | `number | [number, number]` | Espaciado entre columnas (horizontal, vertical). |
| `span` | `number` | Número de columnas a ocupar (1-24) para KCol. |
| `xs, sm, md, lg, xl, xxl` | `number | object` | Ancho responsivo para KCol (Proximamente). |
| `offset` | `number` | Número de columnas a desplazar hacia la derecha. |

**Accesibilidad:**
- **Teclado:** Navegación determinada por el contenido. KGrid no añade interactividad.
- **ARIA:** role="row" y role="gridcell" se aplican automáticamente. aria-colspan para columnas que abarcan múltiples slots.
- **Contraste:** N/A — componente de layout puro.
- **Score:** 100/100

**Guías:**
- Usa gutters múltiplos de 8 (ej. 16, 24).
- Ideal para dashboards y formularios multi-columna.

### KScrollBar (`scrollbar`)

Átomo para estilización premium de barras de desplazamiento. Centraliza la estética de los scrollbars en el sistema para evitar variaciones nativas feas.

- **Archivo:** `KScrollBar/index.tsx`
- **Nota IA:** KScrollBar para scrollbars customizados premium. Usar en contenedores con overflow.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `orientation` | `'vertical' | 'horizontal' | 'both'` | Orientación del scroll. |
| `size` | `'small' | 'middle' | 'large'` | Grosor de la barra. |
| `autoHide` | `boolean` | Esconde la barra si no hay hover. |
| `children` | `ReactNode` | Contenido a scrollear. |

**Accesibilidad:**
- **Teclado:** Flechas arriba/abajo para scroll vertical. PageUp/PageDown para saltos grandes. Home/End para ir al inicio/fin.
- **ARIA:** role="scrollbar" con aria-valuenow, aria-valuemin, aria-valuemax. aria-orientation para indicar dirección.
- **Contraste:** AA — barra visible solo en hover con contraste suficiente.
- **Score:** 95/100

**Guías:**
- Usa para contenedores con contenido que excede su tamaño.
- Evita scrollbars en elementos minúsculos.

### KIcon (`icon`)

Átomo base para iconografía. Wrapper de Lucide React que implementa la escala Elite de tamaños (XS a 2XL) y tokens de color sistémicos.

- **Archivo:** `KIcon/index.tsx`
- **Nota IA:** Componente obligatorio para toda iconografía Lucide. NO importar de lucide-react directamente.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | `string` | Nombre de la propiedad exportada por lucide-react. |
| `size` | `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` | Tamaño basado en tokens Elite. |
| `color` | `string` | Color CSS o Token. |
| `className` | `string` | Clases adicionales. |

**Accesibilidad:**
- **Teclado:** No interactivo por sí mismo. Si se usa como botón, debe tener role="button" y tabIndex.
- **ARIA:** aria-hidden="true" para iconos decorativos. aria-label descriptivo si el icono es informativo o funcional.
- **Contraste:** AA mínimo para iconos informativos contra el fondo.
- **Score:** 95/100

**Guías:**
- Usa iconos para reducir carga cognitiva.
- Mantén el tamaño consistente en la misma fila.
- Acompaña siempre de aria-label si no hay texto.

### KPhoneInput (`phone-input`)

Selector de país avanzado (con banderas emoji para alta compatibilidad) + formateo inteligente de prefijo y máscara de teléfono.

- **Archivo:** `KPhoneInput/index.tsx`
- **Nota IA:** KPhoneInput para entrada de teléfono con selector de país y formateo automático.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string` | Valor del input. |
| `onChange` | `(value: string) => void` | Callback al cambiar el número, retorna el valor con prefijo de marcado. |
| `defaultCountry` | `string` | Código de país inicial de dos letras (ej: MX, US, ES). |
| `size` | `'sm' | 'md' | 'lg'` | Variaciones de altura. |
| `status` | `'error' | 'warning' | 'default'` | Estado de validación. |
| `helperText` | `string` | Mensaje de validación o ayuda debajo del input. |
| `block` | `boolean` | Si el input debe ocupar el 100% del contenedor. |
| `disabled` | `boolean` | Inhabilita la interacción. |

**Accesibilidad:**
- **Teclado:** Tab: Mueve el foco entre el selector de país y el campo de entrada. Search: Permite filtrar los países escribiendo en la barra de búsqueda del selector. Enter/Space: Abre/cierra el menú selector de países.
- **ARIA:** aria-haspopup="dialog" en el selector de país. role="combobox" para la lista de selección de países. aria-expanded para controlar el estado del dropdown.
- **Contraste:** Banderas emoji de alto contraste, textos y bordes cumplen con WCAG AA.
- **Score:** 100/100

**Guías:**
- Siempre define un país por defecto para acelerar la entrada.
- Usa block={true} en formularios móviles.
- Brinda helperText claro en caso de error.
## Moléculas

### KFormField (`form-field`)

Envuelve cualquier input con etiqueta, indicador de requerido, mensaje de error y texto de ayuda. Es el bloque fundamental para construir formularios consistentes.

- **Archivo:** `KFormField/index.tsx`
- **Nota IA:** Al generar formularios, cada campo debe estar envuelto en KFormField. Los campos required deben validarse antes de enviar.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Etiqueta del campo. |
| `required` | `boolean` | Muestra asterisco rojo de campo obligatorio. |
| `error` | `string` | Mensaje de error. Se muestra en rojo debajo del input. |
| `hint` | `string` | Texto de ayuda. Solo se muestra si no hay error. |
| `children` | `ReactNode` | El input o componente de formulario. |

**Accesibilidad:**
- **Teclado:** El campo de entrada envuelto hereda su teclado natural.
- **ARIA:** Enlaza dinámicamente el "id" del input con su "label for". Inyecta aria-invalid y asocia el error con aria-describedby.
- **Contraste:** AAA sobre etiquetas y textos de error.
- **Score:** 100/100

**Guías:**
- Usa siempre KFormField para envolver inputs en formularios.
- Los mensajes de error deben ser descriptivos y actionables.
- El hint se oculta cuando hay un error activo.

### KStatCard (`stat-card`)

Tarjeta de metrica con valor destacado, indicador de cambio (tendencia), sparkline integrada y descripcion contextual.

- **Archivo:** `KStatCard/index.tsx`
- **Nota IA:** Las StatCards son ideales para que la IA resuma KPIs. El cambio porcentual y sparkData dan contexto temporal al agente.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Titulo de la metrica. |
| `value` | `string | number` | Valor principal de la metrica. |
| `change` | `number` | Porcentaje de cambio. Positivo = verde, Negativo = rojo. |
| `changeLabel` | `string` | Contexto del cambio (ej: "vs. mes anterior"). |
| `sparkData` | `number[]` | Array de datos para el mini grafico sparkline. |
| `icon` | `ReactNode` | Icono Lucide representativo. |

**Accesibilidad:**
- **Teclado:** Completamente estático por defecto (no interactivo).
- **ARIA:** El gráfico sparkline interno usa aria-hidden="true" para no estorbar al lector, los datos numéricos explican todo.
- **Contraste:** AAA en valor numérico. AA en el texto de tendencia.
- **Score:** 100/100

**Guías:**
- Usa en dashboards con grid de 3-4 columnas.
- El sparkData debe tener al menos 5 puntos para ser legible.
- change positivo muestra icono TrendingUp en verde, negativo muestra TrendingDown en rojo.

### KNavItem (`nav-item`)

Item de navegacion para el Sidebar con icono, etiqueta, badge numerico y estado activo. Disenado para el fondo Navy.

- **Archivo:** `KNavItem/index.tsx`
- **Nota IA:** KNavItem para items de navegación en menús y barras laterales. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `icon` | `ReactNode` | Icono Lucide (18px recomendado). |
| `label` | `string` | Texto del item. |
| `active` | `boolean` | Estado activo (fondo rojo 20% opacity). |
| `badge` | `number` | Numero de notificacion. |
| `onClick` | `() => void` | Callback al hacer click. |
| `collapsed` | `boolean` | Modo colapsado (solo icono). |

**Accesibilidad:**
- **Teclado:** Tab: Entra al item. Enter/Space: Ejecuta onClick simulado como Link.
- **ARIA:** role="menuitem" o enlace. Atributo aria-current="page" recomendado si active=true.
- **Contraste:** AAA sobre el fondo Navy institucional.
- **Score:** 100/100

**Guías:**
- Solo un item activo a la vez.
- Iconos a 18px con stroke 2px.
- Badge solo para conteos de notificacion relevantes.

### KSelectField (`select-field`)

Campo de seleccion custom con etiqueta, dropdown nativo y validacion, envuelto en KFormField para consistencia.

- **Archivo:** `KSelectField/index.tsx`
- **Nota IA:** KSelectField combina KLabel + KSelect + error. Usar en formularios con validación.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Etiqueta del campo. |
| `placeholder` | `string` | Texto placeholder. |
| `options` | `SelectProps["options"]` | Opciones del select. |
| `value` | `string | number` | Valor seleccionado. |
| `onChange` | `(value) => void` | Callback al seleccionar. |
| `required` | `boolean` | Marca como requerido. |
| `error` | `string` | Mensaje de error. |
| `hint` | `string` | Texto de ayuda. |
| `disabled` | `boolean` | Desactiva el select. |
| `loading` | `boolean` | Estado de carga. |
| `showSearch` | `boolean` | Habilita busqueda. |
| `mode` | `"multiple" | "tags"` | Modo de seleccion. |

**Accesibilidad:**
- **Teclado:** Up/Down: Navega entre opciones. Enter: Confirma selección. Esc: Cierra dropdown.
- **ARIA:** role="combobox", aria-expanded y aria-controls vinculados al listbox.
- **Contraste:** AAA. El borde de foco es del color Primary Khor.
- **Score:** 100/100

**Guías:**
- Para hasta 7 opciones. Si hay mas, considera un select con busqueda.

### KUserCell (`user-cell`)

Celda de usuario con avatar, nombre, rol y estado. Ideal para tablas y listas de empleados.

- **Archivo:** `KUserCell/index.tsx`
- **Nota IA:** KUserCell para visualización de usuario con avatar, nombre y metadata.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | `string` | Nombre del usuario. |
| `email` | `string` | Correo electronico. |
| `role` | `string` | Rol o cargo. |
| `avatar` | `string` | URL de la foto. |
| `size` | `'sm' | 'md' | 'lg'` | Tamano de la celda. |
| `status` | `'online' | 'offline' | 'busy' | 'away'` | Estado de actividad. |
| `onClick` | `() => void` | Callback al hacer click. |

**Accesibilidad:**
- **Teclado:** Tab: Atrapa el foco si tiene onClick (convirtiéndose en botón).
- **ARIA:** Avatar con alt="" si es decorativo o iniciales. Si es clickeable, asume role="button".
- **Contraste:** AAA entre el nombre principal y fondo.
- **Score:** 100/100

**Guías:**
- Usa dentro de tablas en la columna de usuario.
- Si no hay avatar, se generan iniciales automaticamente.

### KEmptyState (`empty-state`)

Estado vacio para tablas, listas o secciones sin datos. Incluye icono, titulo, descripcion y accion principal.

- **Archivo:** `KEmptyState/index.tsx`
- **Nota IA:** KEmptyState para estados vacíos con imagen, mensaje y acciones.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `icon` | `ReactNode` | Icono grande (48px recomendado). |
| `title` | `string` | Titulo del estado vacio. |
| `description` | `string` | Descripcion con contexto. |
| `actionLabel` | `string` | Texto del boton de accion principal. |
| `onAction` | `() => void` | Callback del boton de accion. |
| `actions` | `ReactNode` | Acciones personalizadas (reemplaza actionLabel/onAction). |
| `image` | `string` | URL de imagen alternativa al icono. |
| `variant` | `'default' | 'simple'` | Variante visual. |
| `size` | `'sm' | 'md' | 'lg'` | Tamaño del estado. |

**Accesibilidad:**
- **Teclado:** El botón de acción es 100% interactivo y atrapa el foco por defecto.
- **ARIA:** El icono usa aria-hidden="true" ya que el título explica el estado.
- **Contraste:** AAA en títulos. AA en descripciones corporativas.
- **Score:** 100/100

**Guías:**
- Siempre incluye una accion que resuelva el estado vacio.
- El icono debe ser de 48px con color neutral.300.

### KBreadcrumb (`breadcrumb`)

Sistema de navegacion jerarquica para indicar la posicion actual en la aplicacion.

- **Archivo:** `KBreadcrumb/index.tsx`
- **Nota IA:** KBreadcrumb para migas de pan. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `BreadcrumbItemType[]` | Arreglo de items ({ title, href, icon, menu, onClick }). |
| `separator` | `ReactNode` | Separador custom (default: /). |

**Accesibilidad:**
- **Teclado:** Tab: Navega por cada enlace del breadcrumb.
- **ARIA:** role="navigation" y aria-label="breadcrumb" inyectados nativamente. aria-current="page" en el último elemento (no clickeable).
- **Contraste:** AA sobre fondo blanco/gris.
- **Score:** 100/100

**Guías:**
- El último item es la página actual y no tiene onClick.
- Máximo 4-5 niveles de profundidad.

### KSteps (`steps`)

Componente de pasos para procesos multi-paso como wizards, onboarding o flujos de aprobación. Muestra el progreso y permite navegar entre pasos.

- **Archivo:** `KSteps/index.tsx`
- **Nota IA:** KSteps es clave para que la IA guíe al usuario en flujos multi-paso. El current indica dónde está el usuario.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `KStepItem[]` | Array de pasos con title y description opcional. |
| `current` | `number` | Índice del paso actual (base 0). |
| `onChange` | `(step: number) => void` | Callback al hacer click en un paso. |

**Accesibilidad:**
- **Teclado:** Tab: Foco en pasos individuales si onChange está definido (interactivos).
- **ARIA:** aria-current="step" en el paso activo. aria-label indicando progreso (ej. Paso 2 de 3).
- **Contraste:** AAA sobre anillos azules/primarios de progreso.
- **Score:** 100/100

**Guías:**
- Máximo 5-6 pasos. Para más, usa un flujo diferente.
- La descripción es opcional pero mejora la comprensión.

### KDropdownMenu (`dropdown`)

Menú contextual desplegable con soporte para iconos, items peligrosos, separadores y estados deshabilitados.

- **Archivo:** `KDropdownMenu/index.tsx`
- **Nota IA:** KDropdownMenu para menús desplegables. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `menu` | `MenuProps` | Configuracion del menu ({ items, onClick }). |
| `trigger` | `("click" | "hover" | "contextMenu")[]` | Eventos que activan el menu. |
| `placement` | `string` | Posicion del menu. |
| `arrow` | `boolean | object` | Mostrar flecha indicadora. |
| `disabled` | `boolean` | Desactivar dropdown. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Abre el menú. Up/Down: Navega entre items. Esc: Cierra el menú.
- **ARIA:** role="menu" y role="menuitem" manejados estrictamente por Radix UI. aria-haspopup="menu" y aria-expanded en el trigger.
- **Contraste:** AAA sobre fondo blanco. AAA en texto danger.
- **Score:** 100/100

**Guías:**
- Usa para acciones secundarias agrupadas.
- El disparador suele ser un KButton de tipo ghost o secondary.

### KPopover (`popover`)

Panel emergente con contenido rico. A diferencia del tooltip, puede contener formularios, listas o contenido interactivo.

- **Archivo:** `KPopover/index.tsx`
- **Nota IA:** KPopover para contenido emergente contextual. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `content` | `ReactNode` | Contenido del popover. |
| `title` | `ReactNode` | Título opcional. |
| `placement` | `TooltipPlacement` | Posición. |
| `trigger` | `'click' | 'hover' | 'focus'` | Evento disparador. |
| `arrow` | `boolean | object` | Mostrar flecha. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Si el trigger es click, lo expone. Esc: Cierra el popover abierto y retorna foco.
- **ARIA:** El trigger usa aria-expanded y aria-controls. El panel usa role="dialog" o "tooltip".
- **Contraste:** AAA sobre fondos con elevación (shadow overlay).
- **Score:** 100/100

**Guías:**
- Usa para contenido interactivo. Para texto simple, usa KTooltip.

### KAccordion (`accordion`)

Secciones colapsables para organizar contenido agrupado. Soporta modo single (solo una abierta) y multiple.

- **Archivo:** `KAccordion/index.tsx`
- **Nota IA:** KAccordion para paneles colapsables. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `CollapseProps["items"]` | Array de secciones con key, label y children. |
| `accordion` | `boolean` | Modo acordeón (solo una abierta a la vez). |
| `ghost` | `boolean` | Sin fondo ni bordes. |
| `expandIconPosition` | `'start' | 'end'` | Posición del icono. |
| `onChange` | `(key: string | string[]) => void` | Callback al cambiar. |

**Accesibilidad:**
- **Teclado:** Tab: Navega por los headers. Space/Enter: Expande o colapsa.
- **ARIA:** Headers nativos con aria-expanded. aria-controls id vincula al panel con role="region".
- **Contraste:** AAA entre texto del header y fondo neutral.
- **Score:** 100/100

**Guías:**
- Usa single para FAQs y multiple para configuraciones.
- El título debe ser descriptivo del contenido.

### KInputNumber (`input-number`)

Input numerico con controles +/- integrados, limites min/max, paso configurable y precision decimal.

- **Archivo:** `KInputNumber/index.tsx`
- **Nota IA:** KInputNumber para entrada numérica con controles incrementales. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `number` | Valor controlado. |
| `onChange` | `(v: number) => void` | Callback al cambiar. |
| `min` | `number` | Valor mínimo. |
| `max` | `number` | Valor máximo. |
| `step` | `number` | Incremento. |
| `precision` | `number` | Decimales. |
| `size` | `'sm' | 'md' | 'lg'` | Tamaño del input. |
| `controls` | `boolean` | Mostrar botones +/-. |
| `disabled` | `boolean` | Desactivar. |

**Accesibilidad:**
- **Teclado:** Up/Down: Incrementa o decrementa según paso (step).
- **ARIA:** role="spinbutton", aria-valuenow, aria-valuemin, aria-valuemax vinculados.
- **Contraste:** AAA con bordes claros y texto input.
- **Score:** 100/100

**Guías:**
- Usa precision para valores monetarios.
- Define min/max para evitar valores invalidos.

### KSegmented (`segmented`)

Control segmentado tipo iOS para alternar entre opciones mutuamente excluyentes.

- **Archivo:** `KSegmented/index.tsx`
- **Nota IA:** KSegmented para selector segmentado. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `options` | `(string | KSegmentedOption)[]` | Opciones a mostrar. |
| `value` | `string` | Valor seleccionado. |
| `onChange` | `(v: string) => void` | Callback al cambiar. |
| `block` | `boolean` | Ancho completo. |
| `size` | `'sm' | 'md' | 'lg'` | Tamaño. |
| `disabled` | `boolean` | Desactivar todo el control. |

**Accesibilidad:**
- **Teclado:** Left/Right: Mueve el foco y selección entre segmentos instantáneamente.
- **ARIA:** Actúa como role="radiogroup" y items con role="radio" más aria-checked.
- **Contraste:** AAA fondo de pastilla sobre overlay gris ligero.
- **Score:** 100/100

**Guías:**
- Usa para 2-5 opciones.
- Soporta iconos junto al label.

### KAutocomplete (`autocomplete`)

Input con sugerencias filtradas en tiempo real, opciones con descripción y estado de carga.

- **Archivo:** `KAutocomplete/index.tsx`
- **Nota IA:** KAutocomplete para autocompletado con sugerencias. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `options` | `KAutocompleteOption[]` | Opciones con value, label y description. |
| `onSelect` | `(opt: KAutocompleteOption) => void` | Callback al seleccionar. |
| `onChange` | `(value: string) => void` | Callback al cambiar el texto. |
| `loading` | `boolean` | Muestra un spinner de carga. |
| `allowClear` | `boolean` | Permite limpiar el input. |
| `placeholder` | `string` | Texto de ayuda. |

**Accesibilidad:**
- **Teclado:** Up/Down: Navega sugerencias. Enter: Confirma input. Esc: Cierra listbox.
- **ARIA:** role="combobox", aria-autocomplete="list".
- **Contraste:** AAA
- **Score:** 100/100

**Guías:**
- Usa para listas largas donde el usuario necesita filtrar.
- La descripción ayuda a diferenciar opciones similares.

### KDatePicker (`date-picker`)

Selector de fecha con calendario desplegable, navegación mensual y formato en español.

- **Archivo:** `KDatePicker/index.tsx`
- **Nota IA:** KDatePicker para selección de fecha individual. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `Date` | Fecha seleccionada. |
| `onChange` | `(d: Date) => void` | Callback. |
| `picker` | `'date' | 'week' | 'month' | 'year'` | Tipo de selector. |
| `minDate` | `Date` | Fecha mínima. |
| `maxDate` | `Date` | Fecha máxima. |
| `showTime` | `boolean` | Habilitar selector de hora. |

**Accesibilidad:**
- **Teclado:** Tab: Entra al input. Enter: Abre el calendario. Flechas: Permite navegar días en el panel abierto.
- **ARIA:** El input tiene role="combobox" de forma implícita. El panel del calendario anuncia los días y meses navegados.
- **Contraste:** AAA sobre días hábiles. AA sobre días fuera de mes.
- **Score:** 100/100

**Guías:**
- Formato español configurado por defecto.
- Usa minDate/maxDate para restringir el rango seleccionable.

### KDateRangePicker (`date-range`)

Selector de rango de fechas con presets (Hoy, 7 días, 30 días, Este mes) y calendario dual.

- **Archivo:** `KDatePicker/index.tsx`
- **Nota IA:** KDateRangePicker para rango de fechas. Exportado desde KDatePicker.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `KDateRange` | Rango { from, to }. |
| `onChange` | `(r: KDateRange) => void` | Callback. |
| `presets` | `KDateRangePreset[]` | Rangos predefinidos. |
| `placeholder` | `[string, string]` | Textos de ayuda. |

**Accesibilidad:**
- **Teclado:** Tab: Navega entre input de inicio y fin. Flechas: Permiten seleccionar los rangos.
- **ARIA:** Ambos inputs están emparejados bajo aria-labels descriptivos de rango.
- **Contraste:** AAA entre inputs. AAA panel.
- **Score:** 100/100

**Guías:**
- Incluye presets para rangos comunes (Hoy, Últimos 7 días, etc).
- Ideal para filtros de fechas en tablas y dashboards.

### KSelectAdvanced (`select-advanced`)

Selector múltiple avanzado con soporte para etiquetas (tags), búsqueda integrada y límite de visualización.

- **Archivo:** `KSelectAdvanced/index.tsx`
- **Nota IA:** KSelectAdvanced para selección con búsqueda y múltiples opciones.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `options` | `KSelectAdvancedOption[]` | Opciones a mostrar. |
| `mode` | `'single' | 'multiple' | 'tags'` | Modo de selección. |
| `maxTagCount` | `number | 'responsive'` | Número máximo de tags visibles. |
| `allowClear` | `boolean` | Permite limpiar la selección. |
| `loading` | `boolean` | Estado de carga. |
| `status` | `'error' | 'warning'` | Estado de validación. |

**Accesibilidad:**
- **Teclado:** Backspace: Elimina el último tag seleccionado si el input está vacío. Enter: Añade el tag escrito en mode="tags".
- **ARIA:** Cada chip (tag) seleccionado actúa como un elemento individual aria-label.
- **Contraste:** AAA en los tags. AAA en input libre.
- **Score:** 100/100

**Guías:**
- Usa "multiple" para selección de una lista fija.
- Usa "tags" para permitir al usuario ingresar nuevos valores.

### KDescriptions (`descriptions`)

Lista de información en formato clave-valor, ideal para mostrar detalles de perfiles o registros técnicos.

- **Archivo:** `KDescriptions/index.tsx`
- **Nota IA:** KDescriptions para mostrar pares clave-valor en formato tabla. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `KDescriptionItem[]` | Lista de elementos (label, children, span). |
| `title` | `ReactNode` | Título de la sección. |
| `bordered` | `boolean` | Muestra bordes alrededor de las celdas. |
| `column` | `number` | Número de columnas por fila. |
| `size` | `'default' | 'middle' | 'small'` | Tamaño de la lista. |

**Accesibilidad:**
- **Teclado:** Contenido puramente estático/de lectura.
- **ARIA:** Se convierte a estructura semántica de tabla (table/tr/th/td) garantizando lectura tabular perfecta en screen readers.
- **Contraste:** AAA en los labels (color navy text).
- **Score:** 100/100

**Guías:**
- Usa "span" en los items para que ocupen múltiples columnas.
- El modo "bordered" es ideal para vistas de tipo formulario o ficha técnica.

### KPopconfirm (`popconfirm`)

Caja de confirmación compacta que aparece junto al elemento de activación para acciones rápidas.

- **Archivo:** `KPopconfirm/index.tsx`
- **Nota IA:** KPopconfirm para confirmación contextual antes de acción destructiva. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `ReactNode` | Título de la confirmación. |
| `description` | `ReactNode` | Información adicional sobre la acción. |
| `onConfirm` | `() => void` | Callback al confirmar. |
| `onCancel` | `() => void` | Callback al cancelar. |
| `okText` | `string` | Texto del botón principal. |
| `cancelText` | `string` | Texto del botón secundario. |
| `placement` | `string` | Ubicación del popover. |

**Accesibilidad:**
- **Teclado:** Space/Enter: Abre el dialog. Tab: Atrapa el foco de inmediato en los botones de Ok/Cancel.
- **ARIA:** Abre una estructura role="dialog" o role="alertdialog" que exige acción.
- **Contraste:** AAA para la pregunta prioritaria.
- **Score:** 100/100

**Guías:**
- Usa para acciones destructivas que no requieren un Modal completo.
- Mantén los mensajes cortos y directos.

### KResult (`result`)

Página de resultado para estados de éxito, error, advertencia o páginas de error (404, 500).

- **Archivo:** `KResult/index.tsx`
- **Nota IA:** KResult para páginas de resultado (éxito, error, 404, etc.). Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `status` | `'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'` | Estado del resultado. |
| `title` | `ReactNode` | Título principal. |
| `subTitle` | `ReactNode` | Texto explicativo secundario. |
| `extra` | `ReactNode` | Área para botones de acción. |
| `icon` | `ReactNode` | Icono personalizado. |

**Accesibilidad:**
- **Teclado:** Solo elementos interactivos (extra buttons) reciben foco.
- **ARIA:** Icono puramente decorativo aria-hidden="true". El título es un role="heading".
- **Contraste:** AAA. El ícono asume colores semánticos AA (Verde, Rojo, Amarillo, Azul).
- **Score:** 100/100

**Guías:**
- Usa para feedbacks de página completa.
- Define acciones claras en la propiedad "extra" para guiar al usuario.

### KTimeline (`timeline`)

Visualización de eventos cronológicos o hitos de un proceso de forma vertical.

- **Archivo:** `KTimeline/index.tsx`
- **Nota IA:** KTimeline para líneas de tiempo verticales. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `TimelineItemProps[]` | Lista de eventos con children, label, color. |
| `mode` | `'left' | 'right' | 'alternate'` | Alineación de los elementos. |
| `pending` | `boolean | ReactNode` | Muestra un estado pendiente al final. |
| `reverse` | `boolean` | Invierte el orden cronológico. |

**Accesibilidad:**
- **Teclado:** Estático (no interactivo), a menos que el contenido inyectado tenga enlaces.
- **ARIA:** Es renderizado como una lista nativa (ul/li). Excelente para lectura secuencial.
- **Contraste:** AAA. Los círculos de estado actúan de apoyo visual.
- **Score:** 100/100

**Guías:**
- Usa "label" para mostrar fechas u horas junto a los hitos.
- El modo "alternate" es ideal para narrativas o logs de actividad.

### KCascader (`cascader`)

Selector multinivel para navegar por estructuras jerárquicas complejas (ej: Ubicación, Categorías).

- **Archivo:** `KCascader/index.tsx`
- **Nota IA:** KCascader para selección jerárquica anidada. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `options` | `KCascaderOption[]` | Estructura jerárquica de opciones. |
| `value` | `string[]` | Valores seleccionados en orden. |
| `onChange` | `(value, options) => void` | Callback al cambiar la selección. |
| `multiple` | `boolean` | Permite selección múltiple. |
| `placeholder` | `string` | Texto de ayuda. |

**Accesibilidad:**
- **Teclado:** Up/Down: Recorre opciones verticales. Left/Right: Expande/Contrae el nivel jerárquico.
- **ARIA:** Sigue el patrón de combobox con sub-menús expandibles (aria-expanded).
- **Contraste:** AAA sobre paneles desplegables.
- **Score:** 100/100

**Guías:**
- Ideal para estructuras de más de 2 niveles jerárquicos.
- Usa "allowClear" si la selección no es obligatoria.

### KStatistic (`statistic`)

Valor estadístico grande con título, prefijo/sufijo y tendencia de cambio.

- **Archivo:** `KStatistic/index.tsx`
- **Nota IA:** KStatistic para mostrar métricas y cifras destacadas. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `ReactNode` | Etiqueta del dato. |
| `value` | `string | number` | Valor a mostrar. |
| `precision` | `number` | Decimales a mostrar. |
| `prefix` | `ReactNode` | Contenido antes del valor. |
| `suffix` | `ReactNode` | Contenido después del valor. |
| `trend` | `'up' | 'down'` | Dirección de la tendencia. |
| `trendValue` | `string | number` | Porcentaje o valor de cambio. |

**Accesibilidad:**
- **Teclado:** Lectura pasiva.
- **ARIA:** Los iconos ArrowUp/ArrowDown son decorativos, el string de texto expone la tendencia a screen readers.
- **Contraste:** AAA para el valor principal en tamaño grande.
- **Score:** 100/100

**Guías:**
- Usa para dashboards o KPIs importantes.
- Combina con prefijos como "$" o "MXN" para contextos financieros.

### KTimePicker (`time-picker`)

Selector de hora con formato personalizable (12h/24h) y selección de intervalos.

- **Archivo:** `KTimePicker/index.tsx`
- **Nota IA:** KTimePicker para selección de hora. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string | Dayjs` | Valor seleccionado. |
| `onChange` | `(timeString) => void` | Callback al cambiar la hora. |
| `format` | `string` | Formato de visualización. |
| `use12Hours` | `boolean` | Usa formato de 12 horas. |
| `allowClear` | `boolean` | Permite limpiar la selección. |

**Accesibilidad:**
- **Teclado:** Up/Down: Recorre horas/minutos. Enter: Confirma la selección.
- **ARIA:** Popup interactivo recibe role="dialog", columns rol="listbox".
- **Contraste:** AAA entre texto del campo y fondo neutro.
- **Score:** 100/100

**Guías:**
- Ideal para agendar citas o definir horarios operativos.
- Usa "use12Hours" si el contexto cultural lo requiere.

### KTooltip (`tooltip`)

Componente de texto informativo que aparece al pasar el cursor sobre un elemento. Ideal para dar contexto adicional sin sobrecargar la interfaz.

- **Archivo:** `KTooltip/index.tsx`
- **Nota IA:** KTooltip para información contextual al hacer hover. NOTA: es molécula, no átomo.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `ReactNode` | Contenido del tooltip. |
| `placement` | `'top' | 'bottom' | 'left' | 'right' ...` | Posición relativa al elemento. |
| `trigger` | `'hover' | 'focus' | 'click'` | Acción que dispara el tooltip. |
| `color` | `string` | Color de fondo personalizado. |

**Accesibilidad:**
- **Teclado:** Focus: El tooltip aparece al recibir :focus-visible en el botón/hijo.
- **ARIA:** Usa aria-describedby apuntando al ID dinámico del popup. role="tooltip" asignado al popup.
- **Contraste:** AAA sobre paneles oscuros predeterminados.
- **Score:** 100/100

**Guías:**
- Útil para explicar iconos o abreviaturas.
- Evita tooltips con demasiado texto; mantén el mensaje corto.

### KColorPicker (`color-picker`)

Selector de color con soporte para formatos HEX, RGB, HSB y paleta de presets.

- **Archivo:** `KColorPicker/index.tsx`
- **Nota IA:** KColorPicker para selección de color. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string | Color` | Color seleccionado. |
| `onChange` | `(color) => void` | Callback al cambiar el color. |
| `showText` | `boolean` | Muestra el código de color junto al picker. |
| `presets` | `Presets[]` | Paleta de colores sugeridos. |

**Accesibilidad:**
- **Teclado:** Tab: Accede al swatch principal. Espacio: Lanza el panel de selección.
- **ARIA:** El panel asume role="dialog" o "application" para capturar atajos de espectro.
- **Contraste:** Decorativo en el panel de espectro. AAA en el texto HEX/RGB.
- **Score:** 100/100

**Guías:**
- Usa para configuraciones de marca o personalización de UI.
- Prefiere formatos HEX para mayor compatibilidad.

### KAnchor (`anchor`)

Sistema de navegación por anclas para desplazarse rápidamente por diferentes secciones de una página.

- **Archivo:** `KAnchor/index.tsx`
- **Nota IA:** KAnchor para navegación por anclas en página. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `AnchorLink[]` | Lista de enlaces de navegación. |
| `offsetTop` | `number` | Distancia al borde superior antes de activar. |
| `affix` | `boolean` | Fija el menú en pantalla. |

**Accesibilidad:**
- **Teclado:** Tab: Navega por los enlaces naturales del anchor (etiquetas `<a>` reales). Enter: Scrollea suavemente.
- **ARIA:** Se convierte en un bloque semántico bajo role="navigation".
- **Contraste:** AAA. El link activo se resalta en primary Khor.
- **Score:** 100/100

**Guías:**
- Ideal para páginas largas de documentación o reportes.
- Asegura que los IDs de destino existan en el DOM.

### KList (`list`)

Lista genérica para mostrar colecciones de datos con soporte para avatares, metadatos y acciones.

- **Archivo:** `KList/index.tsx`
- **Nota IA:** KList para listas con metadatos, avatar y acciones. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `KListItem[]` | Colección de elementos a listar. |
| `bordered` | `boolean` | Muestra bordes exteriores. |
| `size` | `'small' | 'middle' | 'large'` | Tamaño del espaciado. |
| `header` | `ReactNode` | Cabecera de la lista. |
| `footer` | `ReactNode` | Pie de la lista. |

**Accesibilidad:**
- **Teclado:** Lectura pasiva iterada sobre elementos internos.
- **ARIA:** Genera structure_role="list" y los ítems con role="listitem". Si los ítems cambian, soporte en aria-live.
- **Contraste:** AAA sobre líneas divisorias grises.
- **Score:** 100/100

**Guías:**
- Usa para mostrar información estructurada repetitiva.
- Combina con avatares para facilitar el reconocimiento visual.

### KDividerExtended (`divider-extended`)

Divisor con soporte para texto central y estilo dashed.

- **Archivo:** `KDividerExtended/index.tsx`
- **Nota IA:** KDividerExtended con funcionalidad expandida respecto a KDivider átomo.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `children` | `ReactNode` | Texto central. |
| `dashed` | `boolean` | Estilo dashed. |

**Accesibilidad:**
- **Teclado:** Separador visual pasivo (no atrapa foco).
- **ARIA:** Role nativo "separator". El texto inyectado respeta el DOM normal.
- **Contraste:** Línea visual AA.
- **Score:** 100/100

**Guías:**
- Usa con texto para separar secciones semánticas.

### KContextMenu (`context-menu`)

Menú contextual de click derecho premium basado en Radix UI que soporta submenús, shortcuts de teclado, separadores semánticos y estados de peligro.

- **Archivo:** `KContextMenu/index.tsx`
- **Nota IA:** KContextMenu para menú contextual al hacer clic derecho. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `KContextMenuItemDef[]` | Estructura jerárquica del menú de opciones. |
| `onClick` | `(key: string) => void` | Callback gatillado al seleccionar una opción no deshabilitada. |
| `children` | `ReactElement` | Elemento que disparará el click derecho. |

**Accesibilidad:**
- **Teclado:** Shift+F10 / Click derecho: Abre el menú contextual en el elemento gatillo. Arrows Up/Down: Navegan entre las opciones del menú. Arrow Right: Abre el submenú de la opción activa. Arrow Left / Escape: Cierra el submenú o el menú completo. Enter / Space: Activa la opción seleccionada.
- **ARIA:** role="menu" y role="menuitem" gestionados nativamente por Radix UI. aria-haspopup="true" en el disparador. aria-expanded refleja de manera sincrónica el estado de visibilidad del menú.
- **Contraste:** Fondos con blur y bordes contrastantes que cumplen las normas WCAG de legibilidad.
- **Score:** 100/100

**Guías:**
- Usa atajos estándar de teclado (shortcuts) en aplicaciones web de escritorio.
- Diferencia visualmente las acciones peligrosas (como eliminar) usando la propiedad danger.
- No anides submenús con más de 2 niveles de profundidad para evitar frustración.

### KHoverCard (`hover-card`)

Tarjeta flotante interactiva de vista previa rápida basada en Radix UI. Ideal para perfiles de usuario, vistas rápidas de productos o información enriquecida.

- **Archivo:** `KHoverCard/index.tsx`
- **Nota IA:** KHoverCard para tarjeta informativa al hacer hover. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `children` | `ReactNode` | Gatillo visual que activa la tarjeta al pasar el cursor. |
| `content` | `ReactNode` | Contenido que se mostrará dentro de la tarjeta flotante. |
| `align` | `'start' | 'center' | 'end'` | Alineación de la tarjeta con respecto al gatillo. |
| `side` | `'top' | 'right' | 'bottom' | 'left'` | Lado donde aparecerá la tarjeta. |
| `sideOffset` | `number` | Distancia de separación en píxeles. |
| `arrow` | `boolean` | Muestra una flecha indicadora que apunta al gatillo. |
| `openDelay` | `number` | Tiempo de espera en ms para abrir. |
| `closeDelay` | `number` | Tiempo de espera en ms para cerrar. |

**Accesibilidad:**
- **Teclado:** Hover / Foco: Activa la visualización de la tarjeta. Escape: Cierra de forma inmediata la tarjeta abierta sin perder el foco en el elemento principal.
- **ARIA:** role="tooltip" o descriptores semánticos acordes al contenido inyectado. Soporte completo para lectores de pantalla mediante descriptores dinámicos en el trigger.
- **Contraste:** Bordes nítidos y sombras definidas que aíslan el contenido del fondo.
- **Score:** 100/100

**Guías:**
- Configura un openDelay prudente (300-500ms) para evitar aperturas no deseadas al mover el puntero.
- Asegúrate de que la tarjeta contenga información complementaria y no crítica para completar la tarea del usuario.
- Habilita la propiedad arrow para mejorar la dirección visual y la conexión con el elemento disparador.
## Organismos

### KFormWizard (`form-wizard`)

Orquestador de formularios multi-paso. Ideal para procesos de onboarding, configuraciones complejas o checkouts.

- **Archivo:** `KFormWizard/index.tsx`
- **Nota IA:** KFormWizard para formularios multi-paso con navegación entre pasos.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `steps` | `WizardStep[]` | Colección de pasos del flujo. |
| `onComplete` | `function` | Callback al finalizar el último paso. |
| `onCancel` | `function` | Callback al cancelar el flujo. |

**Accesibilidad:**
- **Teclado:** Tab: Navega entre los controles del wizard. Enter/Space: Activa los botones de navegación.
- **ARIA:** Uso de KSteps con estados de progreso ARIA. Regiones de contenido con anuncios de carga.
- **Contraste:** AAA certificado.
- **Score:** 100/100

**Guías:**
- Usa para flujos de 3-5 pasos.
- Cada paso debe tener título descriptivo.
- Habilita onCancel si el flujo es cancelable.

### KResizable (`resizable`)

Componente contenedor de paneles redimensionables. Permite crear layouts flexibles para dashboards e interfaces divididas.

- **Archivo:** `KResizable/index.tsx`
- **Nota IA:** KResizable para paneles redimensionables. Paridad total react-resizable.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `direction` | `'horizontal' | 'vertical'` | Dirección del redimensionamiento. |
| `withHandle` | `boolean` | Muestra un tirador visual (grip) en el handle. |

**Accesibilidad:**
- **Teclado:** Flechas: Permiten mover el handle de redimensionamiento. Tab: Enfoca los handles disponibles.
- **ARIA:** Uso de roles y atributos estándar de resizable-panels.
- **Contraste:** AAA certificado.
- **Score:** 100/100

**Guías:**
- Usa direction="horizontal" para layouts de sidebar + contenido.
- withHandle mejora la experiencia de usuario al mostrar el tirador visual.

### KDataTable (`data-table`)

Tabla de datos con busqueda integrada, ordenamiento, paginacion y soporte para celdas con sparklines. Diseñada para manejar listas de empleados, transacciones y registros operativos.

- **Archivo:** `KDataTable/index.tsx`
- **Nota IA:** KDataTable es el organismo central para listar datos. La IA puede extraer datos de las filas, filtrar por busqueda, y analizar sparklines para detectar tendencias.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `data` | `T[]` | Array de datos. |
| `columns` | `ColumnDef[]` | Definición de columnas. |
| `virtual` | `boolean` | Habilita virtualización para alto volumen. |
| `size` | `'small' | 'middle' | 'large'` | Tamaño de la tabla. |
| `rowExpansion` | `object` | Configuración para filas expandibles. |

**Accesibilidad:**
- **Teclado:** Tab: Navega por botones de acciones, cabeceras y paginación. Enter: Permite ordenar columnas.
- **ARIA:** Usa etiqueta <table> con <thead> y <tbody>, ofreciendo lectura estructural a lectores de pantalla.
- **Contraste:** AAA entre datos y el fondo de las filas alternas.
- **Score:** 100/100

**Guías:**
- Usa KSparklineCell para mostrar tendencias en columnas numericas.
- Siempre incluye al menos un boton de accion principal (Nuevo, Exportar, etc).
- Las columnas con sortable: true permiten ordenamiento automatico.

### KSparklineCell (`sparkline`)

Mini grafico de linea disenado para celdas de tabla. Muestra tendencias en un espacio minimo usando recharts.

- **Archivo:** `KSparklineCell/index.tsx`
- **Nota IA:** KSparklineCell para gráficos sparkline en tablas y tarjetas.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `data` | `number[]` | Array de valores numericos para el grafico. |
| `color` | `string` | Color de la linea. |
| `width` | `number` | Ancho en pixeles. |
| `height` | `number` | Alto en pixeles. |

**Accesibilidad:**
- **Teclado:** Visualización no interactiva pasiva.
- **ARIA:** aria-hidden="true" oculto a lectores (el valor real numérico debe ir a su lado en texto puro para blind-support).
- **Contraste:** AA para el trazado visual del vector.
- **Score:** 100/100

**Guías:**
- Minimo 5 puntos de datos para una linea legible.
- Usa colores de feedback: verde para crecimiento, rojo para decrecimiento.
- Mantel el tamano pequeno (80-100px) para no dominar la tabla.

### KModal (`modal`)

Dialogo modal centrado con titulo, contenido y footer personalizable. Usa la sombra alta (shadow lg) del sistema.

- **Archivo:** `KModal/index.tsx`
- **Nota IA:** KModal para diálogos modales. Paridad total AntD v5. Usar onOpenChange no onClose.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `open` | `boolean` | Controla la visibilidad. |
| `onOpenChange` | `(open: boolean) => void` | Callback al cambiar visibilidad. |
| `title` | `string` | Titulo del modal. |
| `children` | `ReactNode` | Contenido del modal. |
| `footer` | `ReactNode` | Botones de accion del footer. |
| `width` | `number` | Ancho en pixeles. |

**Accesibilidad:**
- **Teclado:** Tab: Queda atrapado en los elementos interactivos del Modal (Focus Trap). Esc: Se define como única anulación rápida para cierre (Abort).
- **ARIA:** Role nativo "dialog" provisto explícitamente y complementado con aria-modal="true".
- **Contraste:** AAA del modal flotante contra la cortina negra 50% transparente.
- **Score:** 100/100

**Guías:**
- Usa para confirmaciones y formularios cortos.
- Footer siempre con Cancelar (secondary) + Accion (primary).

### KSheet (`sheet`)

Panel lateral deslizable para detalles, formularios o inspectores. Aparece desde el lado derecho por defecto.

- **Archivo:** `KSheet/index.tsx`
- **Nota IA:** KSheet para panel lateral deslizable. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `open` | `boolean` | Controla la visibilidad. |
| `onOpenChange` | `(open: boolean) => void` | Callback al cambiar visibilidad. |
| `title` | `string` | Titulo del drawer. |
| `children` | `ReactNode` | Contenido. |
| `width` | `number` | Ancho. |
| `placement` | `'left' | 'right'` | Lado de aparicion. |
| `footer` | `ReactNode` | Footer con acciones. |

**Accesibilidad:**
- **Teclado:** Tab: Ciclo de enfoque atrapado lateralmente. Esc: Cierre con atajo rápido.
- **ARIA:** Implementa role="dialog" al igual que Modal. El DOM inyecta el cajón en el primer nivel (Portal) de document.body para evitar quiebres de z-index.
- **Contraste:** AAA sobre el panel lateral descolorando el contenido principal.
- **Score:** 100/100

**Guías:**
- Usa para formularios largos o detalle de registros.
- Width de 400-600px dependiendo del contenido.

### KCardSection (`card-section`)

Tarjeta contenedora para agrupar contenido relacionado con titulo, subtitulo y acciones extra.

- **Archivo:** `KCardSection/index.tsx`
- **Nota IA:** KCardSection para secciones agrupadas con encabezado y acciones.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `title` | `string` | Titulo de la seccion. |
| `subtitle` | `string` | Subtitulo. |
| `extra` | `ReactNode` | Contenido extra en el header (botones, etc). |
| `children` | `ReactNode` | Contenido de la tarjeta. |
| `noPadding` | `boolean` | Remueve el padding del body. |

**Accesibilidad:**
- **Teclado:** Atrapa navegación en acciones extra del título.
- **ARIA:** Organiza en landmarks lógicos si es parte principal de una página.
- **Contraste:** AAA sobre la plataforma blanca primaria de Khor.
- **Score:** 100/100

**Guías:**
- Usa para agrupar campos relacionados en formularios o vistas de detalle.

### KTabs (`tabs`)

Navegacion por pestanas con soporte para iconos y contenido por tab.

- **Archivo:** `KTabs/index.tsx`
- **Nota IA:** KTabs para navegación por pestañas. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `defaultValue` | `string` | Tab activo por defecto. |
| `onValueChange` | `(key: string) => void` | Callback al cambiar de tab. |
| `children` | `ReactNode` | Sub-componentes KTabsList, KTabsTrigger y KTabsContent. |

**Accesibilidad:**
- **Teclado:** Left/Right: Mueve el foco entre las tablist activas. Enter/Space: Selecciona el tab focalizado.
- **ARIA:** Contenedor usa role="tablist". Cada pestaña es role="tab". Contenido asume role="tabpanel".
- **Contraste:** AAA sobre el tab activo con barra de indicación inferior.
- **Score:** 100/100

**Guías:**
- Maximo 5-6 tabs. Para mas, usa navegacion por menu.
- Incluye icono Lucide para mejorar legibilidad.

### KToastManager (`toast-manager`)

Sistema de notificaciones tipo toast con 4 variantes semanticas (success, error, warning, info). Usa la libreria Sonner con estilos Khor.

- **Archivo:** `KToastManager/index.tsx`
- **Nota IA:** kToast es la forma estandar de comunicar resultados de acciones al usuario. La IA debe usar success para confirmaciones y error para fallos.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `type` | `'success' | 'error' | 'warning' | 'info'` | Tipo semantico de la notificacion. |
| `title` | `string` | Titulo del toast. |
| `description` | `string` | Descripcion adicional. |
| `duration` | `number` | Duracion en milisegundos. |

**Accesibilidad:**
- **Teclado:** Enfoque general usando sistemas nativos del layout.
- **ARIA:** Portal en viewport con aria-live="polite" o "assertive".
- **Contraste:** AAA texto y fondos de alerta semánticos.
- **Score:** 100/100

**Guías:**
- Agrega <KToastProvider /> una sola vez en el layout raiz.
- Usa kToast() como funcion imperativa — no necesita hooks ni estado.
- success para acciones completadas, error para fallos, warning para advertencias, info para notificaciones generales.

### KCommandBar (`command-bar`)

Barra de búsqueda global activada con Ctrl+K (o Cmd+K en Mac). Permite buscar componentes, tokens, templates y navegar rápidamente por todo el Design System. Incluye historial de recientes y navegación por teclado.

- **Archivo:** `KCommandBar/index.tsx`
- **Nota IA:** El Command Bar es la interfaz principal de búsqueda. Contiene un registro de todos los componentes con keywords en español e inglés para máxima encontrabilidad.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `open` | `boolean` | Controla la visibilidad del Command Bar. |
| `onClose` | `() => void` | Callback al cerrar. |

**Accesibilidad:**
- **Teclado:** Cmd/Ctrl + K: Activa modal. Up/Down: Navega entre filas de resultados al instante. Enter: Acción selectora.
- **ARIA:** Role "combobox" y aria-autocomplete.
- **Contraste:** AAA en resultados, inputs base y atajos visuales.
- **Score:** 100/100

**Guías:**
- Usa useCommandBar() en el layout raíz para registrar el shortcut global.
- El Command Bar busca en todos los componentes del Design System.
- Los recientes se guardan en localStorage automáticamente.
- Navega con ↑↓ y selecciona con Enter.

### KUpload (`upload`)

Componente de subida de archivos con zona de drag & drop, lista de archivos con estado (subiendo, completado, error), progreso y previews de imagen.

- **Archivo:** `KUpload/index.tsx`
- **Nota IA:** KUpload para arrastrar y soltar archivos. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `multiple` | `boolean` | Permitir multiples archivos. |
| `accept` | `string` | Tipos de archivo aceptados. |
| `maxSize` | `number` | Tamano maximo en bytes. |
| `maxFiles` | `number` | Limite de archivos. |
| `value` | `KUploadFile[]` | Lista de archivos. |
| `onChange` | `(files) => void` | Callback al cambiar. |
| `onUpload` | `(file: File) => Promise<KUploadFile>` | Funcion de subida custom. |
| `listType` | `'text' | 'picture'` | Tipo de lista. |

**Accesibilidad:**
- **Teclado:** Space/Enter sobre el área abre el file explorer nativo.
- **ARIA:** Input type="file" real y envuelto en label clickable por diseño de forma que se mantiene accesible.
- **Contraste:** AAA base para textos principales.
- **Score:** 100/100

**Guías:**
- Define maxSize para evitar uploads excesivos.
- Usa onUpload para integracion con API.

### KTree (`tree`)

Vista de arbol expandible/colapsable con soporte para seleccion, checkboxes, iconos y lineas de conexion. Ideal para jerarquias de carpetas o categorias.

- **Archivo:** `KTree/index.tsx`
- **Nota IA:** KTree para visualización jerárquica. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `data` | `KTreeNode[]` | Nodos con key, title y children. |
| `checkable` | `boolean` | Mostrar checkboxes. |
| `showLine` | `boolean` | Lineas de conexion. |
| `showIcon` | `boolean` | Iconos de carpeta/archivo. |
| `onSelect` | `(keys, info) => void` | Al seleccionar nodo. |
| `onCheck` | `(keys) => void` | Al checkear nodo. |

**Accesibilidad:**
- **Teclado:** Flechas de dirección: Navegación multinivel y apertura (ArrowRight)/Cierre (ArrowLeft) del árbol.
- **ARIA:** role="tree" para nodo base. role="treeitem" nativo en hijos.
- **Contraste:** AA sobre guías o líneas de conexión estructuradas.
- **Score:** 100/100

**Guías:**
- Usa showLine para jerarquias profundas.
- V4 maneja expansion de forma interna por defecto.

### KTour (`tour`)

Tour guiado paso a paso para onboarding. Resalta elementos de la UI con mascara, muestra cards con titulo, descripcion y navegacion entre pasos.

- **Archivo:** `KTour/index.tsx`
- **Nota IA:** KTour para recorridos guiados paso a paso. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `steps` | `KTourStep[]` | Pasos con title, description, target y placement. |
| `open` | `boolean` | Activar el tour. |
| `onClose` | `() => void` | Al cerrar. |
| `onFinish` | `() => void` | Al completar todos los pasos. |

**Accesibilidad:**
- **Teclado:** Escape: Cierra el tour. Navegación en footer popover por flechas/tab.
- **ARIA:** Actúa como Alert Dialog (interrumpe flujo temporalmente). Mismo focus trap que los Modales.
- **Contraste:** AAA sobre capas altas oscurecedoras.
- **Score:** 100/100

**Guías:**
- Usa targets con selectores CSS únicos.
- Máximo 5-7 pasos por tour para evitar fatiga.

### KModalConfirm (`modal-confirm`)

Diálogo de confirmación declarativo para acciones críticas. Soporta tipos semánticos (confirm, success, error) y estados asíncronos.

- **Archivo:** `KModalConfirm/index.tsx`
- **Nota IA:** KModalConfirm para confirmaciones modales destructivas o importantes.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `open` | `boolean` | Visibilidad. |
| `type` | `'confirm'|'success'|'error'` | Tipo semántico. |
| `onOk` | `() => void | Promise` | Callback al aceptar. |

**Accesibilidad:**
- **Teclado:** Escape: Cierra el diálogo. Focus trap mientras está abierto.
- **ARIA:** role="alertdialog" para notificar severidad.
- **Contraste:** AAA sobre la superficie del sistema.
- **Score:** 100/100

**Guías:**
- Usa para acciones que requieren validación explícita del usuario.

### KFormList (`form-list`)

Lista dinámica de campos de formulario. Permite agregar, eliminar y reordenar filas. Ideal para formularios con ítems repetibles.

- **Archivo:** `KFormList/index.tsx`
- **Nota IA:** KFormList para formularios con campos dinámicos repetibles.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `name` | `string` | Nombre del campo array. |
| `renderItem` | `(field, index, ops) => ReactNode` | Render de cada fila. |
| `addText` | `string` | Texto del botón agregar. |

**Accesibilidad:**
- **Teclado:** Teclado opera el adicinamiento nativamente a través de Tab desde el botón de sumar.
- **ARIA:** Cada sub-objeto actúa de forma pasiva, pero se alerta su entrada mediante focus automático.
- **Contraste:** AA sobre listados anidados.
- **Score:** 100/100

**Guías:**
- Usa maxItems para evitar formularios demasiado largos.
- renderItem recibe operaciones add/remove.

### KCarousel (`carousel`)

Carrusel de contenido con soporte para autoplay, efectos y navegación. Diseñado para integrarse con el diseño minimalista de Khor DS.

- **Archivo:** `KCarousel/index.tsx`
- **Nota IA:** KCarousel para presentaciones de contenido deslizante. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `autoplay` | `boolean` | Auto-reproducción. |
| `dots` | `boolean` | Indicadores de posición. |
| `effect` | `'scroll' | 'fade'` | Efecto de transición. |

**Accesibilidad:**
- **Teclado:** Flechas: Navega entre slides. Space/Enter sobre dots: Salta a slide.
- **ARIA:** Role="region" con aria-roledescription="carousel".
- **Contraste:** AAA sobre el fondo del slide.
- **Score:** 100/100

**Guías:**
- Usa autoplay solo cuando sea necesario para no distraer.
- Max 5 slides recomendados.

### KCalendar (`calendar`)

Calendario completo interactivo diseñado para Khor DS. Soporta vistas de mes y año, selección de fechas, y eventos personalizados mediante renderCell.

- **Archivo:** `KCalendar/index.tsx`
- **Nota IA:** KCalendar para calendario completo con selección de fecha. Paridad AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `Date` | Fecha seleccionada controlada. |
| `onChange` | `(date: Date) => void` | Callback al seleccionar una fecha. |
| `onPanelChange` | `(date, mode) => void` | Al cambiar de mes/año. |
| `dateCellRender` | `(date) => ReactNode` | Renderizado custom de celda de día. |
| `monthCellRender` | `(date) => ReactNode` | Renderizado custom de celda de mes. |

**Accesibilidad:**
- **Teclado:** ArrowKeys: Navega entre días de la cuadrícula. PageUp/Down: Salta entre meses. Enter: Selecciona fecha.
- **ARIA:** Grid-based accessibility with ARIA roles for days and navigation. Announcements for month changes via live region.
- **Contraste:** AAA entre número de día y fondo de grilla.
- **Score:** 100/100

**Guías:**
- Ideal para agendar citas, eventos y calendarios editoriales.

### KForm (`form`)

Sistema de formularios avanzado con validación integrada, manejo de estado y layout flexible. Basado en react-hook-form para máxima eficiencia.

- **Archivo:** `KForm/index.tsx`
- **Nota IA:** KForm para formularios con validación. Paridad total AntD v5. Usar KFormField para campos.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `layout` | `'horizontal'|'vertical'|'inline'` | Disposición de etiquetas y campos. |
| `onSubmit` | `(values) => void` | Callback al enviar con éxito. |
| `methods` | `UseFormReturn` | Instancia de react-hook-form (KForm.useForm). |

**Accesibilidad:**
- **Teclado:** Operaciones nativas en todos los inputs de children. Enter sobre un input dispara el submit general automáticamente.
- **ARIA:** Los label (KForm.Item) están vinculados por id a los inputs internos usando for (HTMLFor), crucial para VoiceOver.
- **Contraste:** N/A: Estructura contenedora pasiva.
- **Score:** 100/100

**Guías:**
- Usa KForm.Item para envolver cada campo.
- Define rules en KForm.Field para validación automática.

### KPagination (`pagination`)

Control de navegación para grandes conjuntos de datos. Soporta cambio de página, tamaño de página y salto rápido.

- **Archivo:** `KPagination/index.tsx`
- **Nota IA:** KPagination para navegación entre páginas. Paridad total AntD v5.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `total` | `number` | Número total de registros. |
| `pageSize` | `number` | Registros por página. |
| `onChange` | `(page, size) => void` | Callback al cambiar. |

**Accesibilidad:**
- **Teclado:** Arrow Keys mueven entre páginas. Tabulador permite entrar a controles Quick-Jump.
- **ARIA:** Navegación listitem con etiqueta aria-current="page".
- **Contraste:** AAA controlando número activo en fondo navy.
- **Score:** 100/100

**Guías:**
- Usa debajo de listas o grillas de cards que no usen KDataTable.

### KLoginForm (`login-form`)

Formulario de inicio de sesión estándar con campos de email y contraseña, validación integrada y estado de carga.

- **Archivo:** `KLoginForm/index.tsx`
- **Nota IA:** KLoginForm para formulario de inicio de sesión completo con validación.

**Props:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `onFinish` | `(values) => void` | Callback al enviar el formulario con éxito. |
| `loading` | `boolean` | Muestra estado de carga en el botón. |

**Accesibilidad:**
- **Teclado:** Tabulación rígida orientada a User->Password->Button. Enter realiza Submit.
- **ARIA:** Type="email" y "password" nativos con autocompletado habilitado.
- **Contraste:** AAA según reglas universales de formulario.
- **Score:** 100/100

**Guías:**
- Centra el formulario en un contenedor de ancho máximo (ej. 400px).
