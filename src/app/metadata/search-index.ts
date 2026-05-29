/**
 * Khor Search Index v4.1.1
 * Central registry for Cmd+K search.
 */

export interface SearchItem {
  id: string;
  title: string;
  category: 'Atomo' | 'Molecula' | 'Organismo' | 'Pattern' | 'Tool' | 'Action';
  description: string;
  url: string;
  keywords: string[];
}

export const searchIndex: SearchItem[] = [
  // --- Atoms ---
  { id: 'btn', title: 'KButton', category: 'Atomo', description: 'Botón con variantes y estados.', url: '/atoms/button', keywords: ['boton', 'button', 'click'] },
  { id: 'inp', title: 'KInput', category: 'Atomo', description: 'Campo de texto básico.', url: '/atoms/input', keywords: ['input', 'texto', 'form'] },
  { id: 'icon', title: 'KIcon', category: 'Atomo', description: 'Wrapper de iconografía Lucide con escala Elite.', url: '/atoms/icon', keywords: ['icon', 'lucide', 'svg', 'zap', 'sparkles'] },
  { id: 'badge', title: 'KBadge', category: 'Atomo', description: 'Indicador numérico o de estado.', url: '/atoms/badge', keywords: ['badge', 'notificacion', 'numero'] },
  { id: 'tag', title: 'KTag', category: 'Atomo', description: 'Etiqueta para categorización.', url: '/atoms/tag', keywords: ['tag', 'etiqueta', 'label'] },
  { id: 'avatar', title: 'KAvatar', category: 'Atomo', description: 'Imagen de perfil de usuario.', url: '/atoms/avatar', keywords: ['avatar', 'user', 'imagen'] },
  { id: 'switch', title: 'KSwitch', category: 'Atomo', description: 'Interruptor de estado binario.', url: '/atoms/switch', keywords: ['switch', 'toggle', 'on', 'off'] },
  { id: 'checkbox', title: 'KCheckbox', category: 'Atomo', description: 'Selector de opción múltiple.', url: '/atoms/checkbox', keywords: ['checkbox', 'check', 'box'] },
  { id: 'radio', title: 'KRadio', category: 'Atomo', description: 'Selector de opción única.', url: '/atoms/radio', keywords: ['radio', 'select'] },
  { id: 'progress', title: 'KProgress', category: 'Atomo', description: 'Barra de progreso lineal o circular.', url: '/atoms/progress', keywords: ['progress', 'barra', 'carga'] },
  { id: 'typo', title: 'KTypography', category: 'Atomo', description: 'Sistema de tipografía y textos.', url: '/atoms/text', keywords: ['text', 'font', 'tipo'] },
  { id: 'skeleton', title: 'KSkeleton', category: 'Atomo', description: 'Marcador de carga para contenido.', url: '/atoms/skeleton', keywords: ['skeleton', 'loading', 'carga'] },
  { id: 'flex', title: 'KFlex', category: 'Atomo', description: 'Contenedor flexbox responsivo.', url: '/atoms/flex', keywords: ['flex', 'layout', 'gap'] },
  { id: 'grid', title: 'KGrid', category: 'Atomo', description: 'Sistema de grilla (Row/Col).', url: '/atoms/grid', keywords: ['grid', 'row', 'col', 'layout'] },

  // --- Molecules ---
  { id: 'form-field', title: 'KFormField', category: 'Molecula', description: 'Agrupador de campo con label y error.', url: '/molecules/form-field', keywords: ['form', 'field', 'label'] },
  { id: 'stat-card', title: 'KStatCard', category: 'Molecula', description: 'Tarjeta de métricas con tendencia.', url: '/molecules/stat-card', keywords: ['stat', 'metric', 'card', 'kpi'] },
  { id: 'nav-item', title: 'KNavItem', category: 'Molecula', description: 'Elemento de menú con icono y badge.', url: '/molecules/nav-item', keywords: ['nav', 'menu', 'item'] },
  { id: 'empty', title: 'KEmptyState', category: 'Molecula', description: 'Vista para estados vacíos o sin resultados.', url: '/molecules/empty-state', keywords: ['empty', 'vacio', 'search'] },
  { id: 'bread', title: 'KBreadcrumb', category: 'Molecula', description: 'Navegación por migas de pan.', url: '/molecules/breadcrumb', keywords: ['bread', 'nav', 'path'] },
  { id: 'steps', title: 'KSteps', category: 'Molecula', description: 'Navegación por pasos coordinados.', url: '/molecules/steps', keywords: ['steps', 'wizard', 'progreso'] },
  { id: 'dropdown', title: 'KDropdownMenu', category: 'Molecula', description: 'Menú desplegable de acciones.', url: '/molecules/dropdown-menu', keywords: ['dropdown', 'menu', 'select'] },

  // --- Organisms ---
  { id: 'data-table', title: 'KDataTable', category: 'Organismo', description: 'Tabla de datos maestra con filtros y orden.', url: '/organisms/data-table', keywords: ['table', 'data', 'grid', 'filtro'] },
  { id: 'login-form', title: 'KLoginForm', category: 'Organismo', description: 'Formulario de acceso estándar.', url: '/organisms/login-form', keywords: ['login', 'auth', 'form'] },
  { id: 'command-bar', title: 'KCommandBar', category: 'Organismo', description: 'Este buscador global (Cmd+K).', url: '/organisms/command-bar', keywords: ['search', 'command', 'cmd', 'k'] },
  { id: 'pagination', title: 'KPagination', category: 'Organismo', description: 'Control de páginas para colecciones.', url: '/organisms/pagination', keywords: ['page', 'pago', 'nav'] },

  // --- Patterns ---
  { id: 'p-dash', title: 'Dashboard Stats', category: 'Pattern', description: 'Grilla de métricas para paneles.', url: '/patterns/dashboard-stats', keywords: ['pattern', 'dashboard', 'stats'] },
  { id: 'p-wizard', title: 'SaaS Wizard', category: 'Pattern', description: 'Flujo multi-paso para procesos complejos.', url: '/patterns/saas-wizard', keywords: ['pattern', 'wizard', 'onboarding'] },
  { id: 'p-login', title: 'SaaS Login', category: 'Pattern', description: 'Página de entrada premium.', url: '/patterns/saas-login', keywords: ['pattern', 'login', 'auth'] },
  { id: 'p-crud', title: 'SaaS CRUD Table', category: 'Pattern', description: 'Gestión completa de entidades.', url: '/patterns/saas-crud-table', keywords: ['pattern', 'crud', 'table'] },

  // --- Tools ---
  { id: 't-icons', title: 'Explorador de Iconos', category: 'Tool', description: 'Galería de +1500 iconos Lucide.', url: '/icons', keywords: ['tool', 'icon', 'search', 'lucide'] },
  { id: 't-ai', title: 'Guía para IA', category: 'Tool', description: 'Prompt generator para agentes autónomos.', url: '/ai-export', keywords: ['tool', 'ai', 'export', 'prompts'] },
  { id: 't-theming', title: 'Live Theming', category: 'Tool', description: 'Editor visual de tokens en tiempo real.', url: '/theming', keywords: ['tool', 'theme', 'tokens', 'colors'] },
  { id: 't-changelog', title: 'Changelog', category: 'Tool', description: 'Historial de versiones y cambios.', url: '/changelog', keywords: ['version', 'history', 'updates'] },
  
  // --- Actions ---
  { id: 'a-dark', title: 'Cambiar a Modo Oscuro', category: 'Action', description: 'Alternar tema de la interfaz.', url: '#action:toggle-dark', keywords: ['dark', 'light', 'tema', 'modo'] },
  { id: 'a-export', title: 'Exportar Guía de IA', category: 'Action', description: 'Descargar prompt de arquitectura v5.0.', url: '#action:export-ai', keywords: ['ai', 'export', 'download', 'markdown'] },
  { id: 'a-history', title: 'Limpiar Historial', category: 'Action', description: 'Borrar búsquedas recientes.', url: '#action:clear-history', keywords: ['borrar', 'limpiar', 'historial'] },
];
