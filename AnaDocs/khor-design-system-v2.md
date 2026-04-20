# Sistema de Diseño Khor v11.0.0 — Edición Lovable
**Fuente única de verdad** para SaaS web responsive en Lovable (React 18 + Vite 5 + Tailwind v3 + shadcn/Radix + TypeScript).
Generado: 20 abril 2026.

---

## 0. Stack obligatorio (Lovable)

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | React 18 + Vite 5 + TypeScript 5 | No Next.js, no Remix |
| Estilos | Tailwind CSS **v3** + CSS variables **HSL** | NO Tailwind v4 |
| Componentes base | **shadcn/ui** + Radix UI | NO Ant Design, NO MUI, NO Chakra |
| Capa propia | Wrappers `K*` en `src/components/khor/*` | Construidos sobre shadcn |
| Routing | `react-router-dom` v6 | NO `react-router` v7 |
| Iconos | `lucide-react` (stroke 2, 16/20/24px) | Único set permitido |
| Forms | `react-hook-form` + `zod` | Validación tipada |
| Data | `@tanstack/react-query` v5 | Cache, mutaciones |
| Tablas | `@tanstack/react-table` v8 | Headless |
| Charts | `recharts` | Tematizado con tokens Khor |
| Notificaciones | `sonner` (ya en shadcn) | Wrapper `kToast` |
| Backend (opcional) | Lovable Cloud (Supabase) | Auth, DB, Storage, Edge Fns |

---

## 1. 🤖 System Prompt para la IA

Reglas inviolables al generar código:

1. **Tokens HSL únicamente.** NUNCA hex en componentes. Usa clases semánticas Tailwind (`bg-primary`, `text-foreground`) o `hsl(var(--token))`.
2. **Capa K* obligatoria.** Importa siempre desde `@/components/khor/*`, nunca shadcn directo en páginas.
3. **Layout = Tailwind utilities.** Usa flex/grid/gap/p-*/m-* de Tailwind. NUNCA CSS inline para colores o tipografía.
4. **A11y first.** Todo `onClick` va en `<KButton>` o elemento semántico (`<a>`, `<button>`). Iconos solos requieren `aria-label`. `<img>` requiere `alt`. Inputs envueltos en `<KFormField>`.
5. **Responsive mobile-first.** Empieza por móvil (`base`), añade breakpoints `sm:`, `md:`, `lg:`, `xl:`. Touch target ≥ 44×44px.
6. **Iconos solo Lucide.** Tamaños: `xs=12`, `sm=14`, `md=16`, `lg=20`, `xl=24`.
7. **Routing:** `import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom"`.
8. **Higiene DOM.** Props personalizadas (`variant`, `tone`, `density`) NO deben llegar al `<button>`/`<input>` nativo.
9. **Patterns.** Para páginas completas usa los Patterns de §11 (KAuthLayout, KAppShell, KDashboardGrid, KCRUDPage, etc.).

---

## 2. 🎨 Tokens — HSL en `index.css`

```css
@layer base {
  :root {
    /* === Marca === */
    --primary: 9 73% 54%;              /* #E04D36 brand-primary */
    --primary-foreground: 0 0% 100%;
    --primary-hover: 9 73% 48%;
    --primary-active: 9 73% 42%;

    --secondary: 227 89% 18%;          /* #051758 navy */
    --secondary-foreground: 0 0% 100%;

    --accent: 35 100% 50%;             /* #FF9500 */
    --accent-foreground: 227 89% 18%;

    /* === Superficies === */
    --background: 198 14% 95%;         /* #EDF0F1 canvas */
    --foreground: 227 89% 18%;
    --card: 0 0% 100%;
    --card-foreground: 227 89% 18%;
    --popover: 0 0% 100%;
    --popover-foreground: 227 89% 18%;
    --muted: 198 14% 95%;
    --muted-foreground: 215 14% 47%;   /* #718096 */

    /* === Estados === */
    --success: 123 46% 34%;            /* #2E7D32 */
    --success-foreground: 0 0% 100%;
    --success-soft: 124 39% 94%;       /* #E8F5E9 */

    --destructive: 0 65% 51%;          /* #D32F2F */
    --destructive-foreground: 0 0% 100%;
    --destructive-soft: 351 100% 96%;  /* #FFEBEE */

    --warning: 35 100% 50%;            /* #FF9500 */
    --warning-foreground: 227 89% 18%;
    --warning-soft: 36 100% 94%;       /* #FFF3E0 */

    --info: 207 90% 54%;               /* #2196F3 */
    --info-foreground: 0 0% 100%;
    --info-soft: 207 89% 94%;          /* #E3F2FD */

    /* === Premium === */
    --processing: 199 89% 48%;
    --volcano: 17 88% 49%;
    --gold: 45 93% 47%;
    --lime: 84 81% 44%;
    --purple: 271 91% 65%;
    --teal: 180 100% 25%;

    /* === Estructura === */
    --border: 210 14% 86%;             /* #D5DBE0 */
    --input: 210 14% 86%;
    --ring: 9 73% 54%;                 /* focus = primary */
    --radius: 0.5rem;                  /* 8px md */

    /* Radios extra */
    --radius-sm: 0.375rem;             /* 6px */
    --radius-md: 0.5rem;               /* 8px */
    --radius-lg: 0.625rem;             /* 10px */
    --radius-xl: 0.875rem;             /* 14px */
    --radius-2xl: 1.25rem;
    --radius-full: 9999px;

    /* Sombras (multi-capa, tinte navy) */
    --shadow-sm: 0 1px 2px hsl(227 89% 18% / 0.04), 0 1px 1px hsl(0 0% 0% / 0.02);
    --shadow-md: 0 4px 6px -1px hsl(227 89% 18% / 0.08), 0 2px 4px -1px hsl(0 0% 0% / 0.04);
    --shadow-lg: 0 10px 15px -3px hsl(227 89% 18% / 0.10), 0 4px 6px -2px hsl(0 0% 0% / 0.05);
    --shadow-xl: 0 20px 25px -5px hsl(227 89% 18% / 0.12), 0 10px 10px -5px hsl(0 0% 0% / 0.04);
    --shadow-2xl: 0 25px 50px -12px hsl(227 89% 18% / 0.25);
    --shadow-inner: inset 0 2px 4px hsl(0 0% 0% / 0.06);
    --shadow-focus: 0 0 0 3px hsl(var(--ring) / 0.35);

    /* Motion */
    --duration-fast: 100ms;
    --duration-normal: 200ms;
    --duration-slow: 400ms;
    --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);

    /* Z-index scale */
    --z-base: 0;
    --z-dropdown: 1000;
    --z-sticky: 1100;
    --z-overlay: 1200;
    --z-drawer: 1300;
    --z-modal: 1400;
    --z-popover: 1500;
    --z-tooltip: 1600;
    --z-toast: 1700;

    /* Layout */
    --header-h: 64px;
    --sidebar-w: 260px;
    --sidebar-w-collapsed: 64px;
    --bottomnav-h: 64px;       /* móvil */
    --container-max: 1280px;
    --content-max: 1100px;

    /* Sidebar (shadcn convención) */
    --sidebar-background: 227 89% 18%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 9 73% 54%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 227 60% 25%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 227 50% 30%;
    --sidebar-ring: 9 73% 54%;
  }

  .dark {
    --background: 230 25% 10%;         /* #1A1B2E */
    --foreground: 220 25% 92%;
    --card: 230 24% 14%;
    --card-foreground: 220 25% 92%;
    --popover: 230 24% 14%;
    --popover-foreground: 220 25% 92%;
    --primary: 9 73% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 35% 70%;
    --secondary-foreground: 230 25% 10%;
    --muted: 230 20% 18%;
    --muted-foreground: 220 15% 70%;
    --accent: 35 100% 62%;
    --accent-foreground: 230 25% 10%;
    --success: 123 38% 49%;
    --destructive: 0 73% 60%;
    --warning: 35 100% 62%;
    --info: 207 80% 60%;
    --border: 230 18% 22%;
    --input: 230 18% 22%;
    --ring: 9 73% 60%;
    --sidebar-background: 230 30% 8%;
    --sidebar-foreground: 220 25% 92%;
    --sidebar-accent: 230 25% 16%;
    --sidebar-border: 230 25% 18%;
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans antialiased; }
  html { scroll-behavior: smooth; }
  :focus-visible { outline: none; box-shadow: var(--shadow-focus); }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
}
```

### Fuentes
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```
- Headings (h1-h3, display): **Montserrat** 600/700.
- Body / UI: **Plus Jakarta Sans** 400/500/600.

---

## 3. Tipografía

| Token | Mobile | Desktop | Peso | Line height | Uso |
|-------|--------|---------|------|-------------|-----|
| display1 | 40px | 64px | 700 | 1.1 | Hero |
| display2 | 32px | 48px | 700 | 1.1 | Section hero |
| h1 | 28px | 38px | 700 | 1.2 | Page title |
| h2 | 24px | 30px | 700 | 1.2 | Section |
| h3 | 20px | 24px | 600 | 1.3 | Card title |
| h4 | 18px | 20px | 600 | 1.3 | Sub |
| body-lg | 16px | 16px | 400 | 1.5 | Lead |
| body-md | 14px | 14px | 400 | 1.5 | Default |
| small | 12px | 12px | 500 | 1.5 | Meta |
| caption | 11px | 11px | 400 | 1.4 | Hints |
| overline | 10px | 10px | 600 | 1.2 | Labels |

Regla: usa siempre `<KText variant="...">` o clases utilitarias `text-h1 font-display`.

---

## 4. Espaciado & Geometría

**Spacing scale (4px base):** `0, 1=4, 2=8, 3=12, 4=16, 5=20, 6=24, 8=32, 10=40, 12=48, 16=64, 20=80, 24=96`.

| Alias | px | Uso |
|-------|----|-----|
| xs | 4 | Gap interno icon-text |
| sm | 8 | Gap pequeño |
| md | 16 | Padding default |
| lg | 24 | Padding sección |
| xl | 40 | Padding página |
| 2xl | 64 | Separación grande |

**Touch target mínimo:** 44×44px en móvil (`min-h-11 min-w-11`).

---

## 5. Breakpoints (mobile-first)

| Token | Min width | Uso |
|-------|-----------|-----|
| `base` | 0 | Móvil |
| `sm:` | 640 | Móvil grande |
| `md:` | 768 | Tablet |
| `lg:` | 1024 | Desktop |
| `xl:` | 1280 | Desktop wide |
| `2xl:` | 1536 | Ultra |

**Containers:** `max-w-screen-sm/md/lg/xl/2xl`. Contenido lectura: `max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8`.

---

## 6. `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
        },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))", soft: "hsl(var(--destructive-soft))" },
        success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))", soft: "hsl(var(--success-soft))" },
        warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))", soft: "hsl(var(--warning-soft))" },
        info: { DEFAULT: "hsl(var(--info))", foreground: "hsl(var(--info-foreground))", soft: "hsl(var(--info-soft))" },
        processing: "hsl(var(--processing))",
        volcano: "hsl(var(--volcano))",
        gold: "hsl(var(--gold))",
        lime: "hsl(var(--lime))",
        purple: "hsl(var(--purple))",
        teal: "hsl(var(--teal))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)", md: "var(--radius-md)", lg: "var(--radius-lg)",
        xl: "var(--radius-xl)", "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)", "2xl": "var(--shadow-2xl)", inner: "var(--shadow-inner)",
        focus: "var(--shadow-focus)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['Montserrat', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display1": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "display2": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", fontWeight: "700" }],
        "h1": ["clamp(1.75rem, 3vw, 2.375rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "h2": ["clamp(1.5rem, 2.5vw, 1.875rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "h3": ["clamp(1.25rem, 2vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "shake": { "0%,100%": { transform: "translateX(0)" }, "25%": { transform: "translateX(-6px)" }, "75%": { transform: "translateX(6px)" } },
        "shimmer": { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s var(--ease-standard)",
        "accordion-up": "accordion-up 0.2s var(--ease-standard)",
        "fade-in": "fade-in 200ms var(--ease-standard)",
        "shake": "shake 400ms var(--ease-standard)",
        "shimmer": "shimmer 1.5s infinite",
      },
      zIndex: {
        dropdown: "1000", sticky: "1100", overlay: "1200", drawer: "1300",
        modal: "1400", popover: "1500", tooltip: "1600", toast: "1700",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## 7. Capa K* — convención

Toda página importa **solo** desde `@/components/khor`:
```tsx
import { KButton, KInput, KFormField, KCard, KDataTable } from "@/components/khor";
```

Cada `K*` es un wrapper sobre shadcn que:
1. Aplica variantes Khor.
2. Garantiza A11y (aria-label, focus ring, roles).
3. Filtra props personalizadas para no contaminar el DOM.
4. Acepta prop `density: "compact" | "comfortable"`.

---

## 8. Catálogo de componentes K*

### Átomos (shadcn → K*)
KButton, KIconButton, KInput, KTextarea, KInputPassword, KInputSearch, KInputOTP, KInputNumber, KCheckbox, KRadio, KSwitch, KSlider, KLabel, KBadge, KTag, KChip, KAvatar, KAvatarGroup, KSpinner, KSkeleton, KProgress, KProgressCircle, KDivider, KKbd, KTooltip, KText, KLink, KIcon (lucide wrapper), KImage (con loading lazy + alt obligatorio), KCode.

### Moléculas
KFormField, KSelect, KMultiSelect, KCombobox, KAutocomplete, KDatePicker, KDateRangePicker, KTimePicker, KColorPicker, KFileInput, KStatCard, KMetricCard, KNavItem, KBreadcrumb, KSteps, KStepper, KAccordion, KPopover, KDropdown, KContextMenu, KCommandMenu (Cmd+K), KEmptyState, KErrorState, KLoadingState, KPageHeader, KSectionHeader, KFilterBar, KSearchBar, KPagination, KTabs, KSegmented, KToggleGroup, KAlert, KCallout, KBanner, KUserCell.

### Organismos
KCard, KModal, KDrawer, KSheet (bottom sheet móvil), KDataTable, KCRUDTable, KForm, KFormBuilder, KAuthForm (login/signup/reset/MFA), KCheckoutForm, KFileUploader (dropzone), KKanban, KCalendar, KTimeline, KNotificationCenter, KCommentThread, KChat, KCarousel, KGallery, KOnboardingWizard.

### Patterns (páginas completas)
KAppShell (sidebar + header + outlet), KPublicLayout (marketing), KAuthLayout (split image/form), KDashboardGrid, KCRUDPage, KSettingsPage, KBillingPage, KProfilePage, KSearchResultsPage, K404, K500, KMaintenance.

### Charts (recharts tematizado)
KChartArea, KChartLine, KChartBar, KChartPie, KChartDonut, KChartGauge, KSparkline. Paleta default: `[primary, secondary, accent, info, success, warning, purple, teal]`.

---

## 9. AppShell responsive

```
Desktop (≥lg):                Mobile (<md):
┌────────┬───────────────┐    ┌──────────────────┐
│Sidebar │ Header  64px  │    │ Header  64px     │
│ 260px  ├───────────────┤    ├──────────────────┤
│ navy   │ Content       │    │ Content          │
│        │ max-w-1100    │    │ p-4              │
│        │               │    ├──────────────────┤
└────────┴───────────────┘    │ Bottom Nav 64px  │
                              └──────────────────┘
```
- Sidebar: oculto `<lg`; reemplazado por `KSheet` con `<KDrawer side="left">` activado por `<KIconButton aria-label="Menú">`.
- Bottom nav móvil: 4-5 items principales con `<KNavItem variant="bottom">`.
- Safe area: usar `pb-[env(safe-area-inset-bottom)]` en bottom nav.

---

## 10. Patrones de validación, loading y errores

- **Forms:** validación con zod, mostrar error en `blur` después del primer submit. Mensaje rojo `text-destructive text-small` con `aria-describedby`.
- **Loading:** preferir Skeletons sobre spinners; spinners solo para acciones < 2s.
- **Empty states:** siempre con ilustración o icono `lucide` 48px + título h3 + descripción + CTA.
- **Error states:** título "Algo salió mal", botón "Reintentar", logging a consola.
- **Toasts:** `success` 4s, `info` 4s, `warning` 6s, `error` 8s + botón cerrar.
- **Posición toasts:** `bottom-right` desktop, `top-center` móvil.

---

## 11. Patterns con código completo

### 11.1 KAppShell
```tsx
export function KAppShell() {
  return (
    <div className="min-h-screen bg-background flex">
      <KSidebar className="hidden lg:flex" />
      <div className="flex-1 flex flex-col min-w-0">
        <KHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto w-full max-w-[1100px]">
            <Outlet />
          </div>
        </main>
        <KBottomNav className="lg:hidden" />
      </div>
    </div>
  );
}
```

### 11.2 KAuthLayout (login)
```tsx
<div className="min-h-screen grid lg:grid-cols-2">
  <aside className="hidden lg:flex bg-secondary text-secondary-foreground p-12 flex-col justify-between">
    <KLogo />
    <blockquote className="text-h2 font-display">"La mejor herramienta para equipos modernos."</blockquote>
  </aside>
  <main className="flex items-center justify-center p-6">
    <KCard className="w-full max-w-md p-8 shadow-xl animate-fade-in">
      <h1 className="text-h2 mb-2">Bienvenido</h1>
      <p className="text-muted-foreground mb-6">Inicia sesión en tu cuenta</p>
      <KAuthForm mode="login" onSubmit={handleLogin} />
    </KCard>
  </main>
</div>
```

### 11.3 KDashboardGrid
```tsx
<div className="space-y-6">
  <KPageHeader title="Dashboard" description="Resumen de la actividad" actions={<KButton icon={<Plus/>}>Nuevo</KButton>} />
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <KStatCard title="MRR" value="$45,200" change={12.5} sparkData={data} />
    <KStatCard title="Usuarios" value="1,284" change={-3.1} />
    <KStatCard title="Churn" value="2.4%" change={-0.6} tone="success" />
    <KStatCard title="NPS" value="72" change={4} tone="info" />
  </div>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <KCard className="lg:col-span-2 p-6"><KChartArea data={data} /></KCard>
    <KCard className="p-6"><KChartDonut data={data2} /></KCard>
  </div>
</div>
```

### 11.4 KCRUDPage
```tsx
<div className="space-y-4">
  <KPageHeader title="Clientes" actions={<KButton icon={<Plus/>}>Crear</KButton>} />
  <KFilterBar>
    <KSearchInput placeholder="Buscar..." />
    <KSelect placeholder="Estado" options={statusOptions} />
    <KDateRangePicker />
  </KFilterBar>
  <KCard>
    <KDataTable columns={columns} data={data} pagination selection onRowClick={openDrawer} />
  </KCard>
  <KDrawer open={open} onClose={close} side="right" size="lg">
    <KForm schema={schema} onSubmit={save} />
  </KDrawer>
</div>
```

### 11.5 KSettingsPage / KBillingPage / KOnboardingWizard
Estructura: `KPageHeader` + `KTabs` (vertical en desktop, horizontal en móvil) + secciones `KCard` con `KFormField`s. Billing usa `KStatCard` de uso + `KDataTable` de facturas + `KModal` para cambio de plan.

---

## 12. Charts — paleta oficial

```ts
export const chartPalette = [
  "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))",
  "hsl(var(--info))", "hsl(var(--success))", "hsl(var(--warning))",
  "hsl(var(--purple))", "hsl(var(--teal))",
];
```
- Grid: `hsl(var(--border))`. Texto: `hsl(var(--muted-foreground))`. Tooltip: `bg-popover text-popover-foreground shadow-lg rounded-lg`.

---

## 13. Auth flows estándar

Pantallas: Login, Signup, Forgot password, Reset password, Verify email, MFA setup, MFA challenge, SSO callback. Todos con `KAuthLayout`. Siempre `aria-live="polite"` para mensajes de error. Password mínimo 8 chars, 1 mayúscula, 1 número (validación zod).

---

## 14. SEO base (todas las páginas públicas)

```tsx
<Helmet>
  <title>{title} | Khor</title>             {/* < 60 chars */}
  <meta name="description" content={desc} /> {/* < 160 chars */}
  <link rel="canonical" href={url} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={img} />
</Helmet>
```
Single H1 por página, jerarquía estricta H1→H2→H3, alt en imágenes, JSON-LD cuando aplique.

---

## 15. Accesibilidad — checklist obligatorio

- [ ] Contraste AA (4.5:1 texto, 3:1 UI).
- [ ] `focus-visible` con `box-shadow: var(--shadow-focus)`.
- [ ] Touch target ≥ 44×44.
- [ ] `prefers-reduced-motion` respetado.
- [ ] `aria-label` en botones de solo icono.
- [ ] `<label>` o `aria-labelledby` en cada input.
- [ ] `aria-live="polite"` para feedback dinámico.
- [ ] Navegación completa por teclado (Tab, Shift+Tab, Enter, Esc, flechas).
- [ ] Skip link `<a href="#main">` al inicio del body.
- [ ] Modales atrapan foco; Esc cierra.

---

## 16. Cosas a EVITAR (rojo absoluto)

- ❌ Colores hex en componentes.
- ❌ `style={{ color: '#fff' }}` o `text-white`, `bg-black`.
- ❌ Importar shadcn directo en páginas (saltarse capa K*).
- ❌ Tailwind v4 syntax (`@theme`, `@utility`).
- ❌ `react-router` v7 (usar `react-router-dom`).
- ❌ antd, MUI, Chakra, Bootstrap.
- ❌ `<div onClick>` para acciones (usar KButton).
- ❌ Iconos fuera de Lucide.
- ❌ Anidar `<button>` dentro de `<button>` o `<a>`.
- ❌ z-index arbitrarios (usar escala §2).
- ❌ Spinners para cargas > 2s (usar Skeleton).

---

## 17. Estructura de carpetas recomendada

```
src/
├── components/
│   ├── ui/                  # shadcn primitivos (no tocar en páginas)
│   └── khor/                # Capa K* — única importación pública
│       ├── atoms/
│       ├── molecules/
│       ├── organisms/
│       ├── patterns/
│       └── index.ts         # barrel export
├── pages/
├── hooks/
├── lib/
│   ├── utils.ts
│   ├── validators.ts        # schemas zod
│   └── api.ts
├── theme/
│   └── khor-tokens.ts       # mirror JS de los tokens CSS
└── index.css
```

---

## 18. Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v11.0.0** | 20 abr 2026 | Edición Lovable. HSL, Tailwind v3, react-router-dom, shadcn base, breakpoints, z-index, charts, auth, SEO, A11y check-list, patterns con código completo, mobile bottom nav. |
| v10.6.0 | — | Versión original (web/desktop, Tailwind v4). |

