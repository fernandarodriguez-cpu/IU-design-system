
const structure = {"foundations":["Colors","Typography","Radius","Spacing","Shadows"],"atoms":["KAffix","KAlert","KAvatar","KBadge","KButton","KButtonGroup","KCheckbox","KDivider","KFlex","KFloatButton","KGrid","KIcon","KImage","KInput","KLabel","KLink","KParagraph","KProgress","KQRCode","KRadio","KRate","KScrollArea","KScrollBar","KSearchInput","KSkeleton","KSlider","KSpace","KSpin","KSwitch","KTag","KText","KTextArea","KWatermark"],"molecules":["KAccordion","KAnchor","KAutocomplete","KBreadcrumb","KCascader","KColorPicker","KDatePicker","KDateRangePicker","KDescriptions","KDividerExtended","KDropdownMenu","KEmptyState","KFormField","KInputNumber","KList","KMentions","KNavItem","KNotification","KPopconfirm","KPopover","KResult","KSegmented","KSelectAdvanced","KSelectField","KStatCard","KStatistic","KSteps","KTimePicker","KTimeline","KTooltip","KTransfer","KTreeSelect","KUserCell"],"organisms":["KAppLayout","KCalendar","KCardSection","KCarousel","KCommandBar","KDataGrid","KDataTable","KDrawer","KForm","KFormList","KFormWizard","KLoginForm","KMessage","KModal","KModalConfirm","KNotification","KPagination","KSparklineCell","KTabs","KToast","KTour","KTree","KUpload"]};
const lightTokens = {"khor-primary":"#E04D36","khor-secondary":"#051758","khor-accent":"#FF9500","khor-navy":"var(--khor-secondary)","khor-navy-hover":"#0a2270","khor-navy-active":"#030f40","khor-primary-hover":"#e8644f","khor-primary-active":"#c9442f","khor-primary-light":"#FDECEA","khor-accent-hover":"#ffaa33","khor-accent-active":"#e68600","khor-neutral-secondary-50":"#FFFFFF","khor-neutral-secondary-100":"#EDF0F1","khor-neutral-secondary-200":"#D5DBE0","khor-neutral-secondary-300":"#A0AEC0","khor-neutral-secondary-400":"#718096","khor-neutral-secondary-500":"#4A5568","khor-neutral-secondary-600":"#2D3748","khor-neutral-secondary-700":"#1A202C","khor-neutral-secondary-800":"#11141C","khor-neutral-secondary-900":"#051758","khor-neutral-50":"var(--khor-slate-50)","khor-neutral-100":"var(--khor-slate-100)","khor-neutral-200":"var(--khor-slate-200)","khor-neutral-300":"var(--khor-slate-300)","khor-neutral-400":"var(--khor-slate-400)","khor-neutral-500":"var(--khor-slate-500)","khor-neutral-600":"var(--khor-slate-600)","khor-neutral-700":"var(--khor-slate-700)","khor-neutral-800":"var(--khor-slate-800)","khor-neutral-900":"var(--khor-slate-900)","khor-success-50":"#E8F5E9","khor-success-100":"#C8E6C9","khor-success-200":"#A5D6A7","khor-success-300":"#81C784","khor-success-400":"#66BB6A","khor-success-500":"#4CAF50","khor-success-600":"#43A047","khor-success-700":"#2E7D32","khor-success-800":"#1B5E20","khor-success-900":"#0D3E12","khor-error-50":"#FFEBEE","khor-error-100":"#FFCDD2","khor-error-200":"#EF9A9A","khor-error-300":"#E57373","khor-error-400":"#EF5350","khor-error-500":"#F44336","khor-error-600":"#E53935","khor-error-700":"#B71C1C","khor-error-800":"#C62828","khor-error-900":"#B71C1C","khor-warning-50":"#FFF4E5","khor-warning-100":"#FFECB3","khor-warning-200":"#FFE082","khor-warning-300":"#FFD54F","khor-warning-400":"#FFCA28","khor-warning-500":"#FFC107","khor-warning-600":"#FFB300","khor-warning-700":"#E07800","khor-warning-800":"#FFA000","khor-warning-900":"#FF8F00","khor-info-50":"#E3F2FD","khor-info-100":"#BBDEFB","khor-info-200":"#90CAF9","khor-info-300":"#64B5F6","khor-info-400":"#42A5F5","khor-info-500":"#2196F3","khor-info-600":"#1E88E5","khor-info-700":"#1565C0","khor-info-800":"#1565C0","khor-info-900":"#0D47A1","khor-success":"var(--khor-success-700)","khor-error":"var(--khor-error-700)","khor-warning":"var(--khor-warning-700)","khor-info":"var(--khor-info-700)","khor-teal":"#0D7D7D","khor-teal-50":"#E0F2F2","khor-teal-100":"#B2DFDF","khor-teal-200":"#80CBCB","khor-teal-300":"#4DB6B6","khor-teal-400":"#26A6A6","khor-teal-500":"#009696","khor-teal-600":"#008989","khor-teal-700":"#0D7D7D","khor-teal-800":"#006969","khor-teal-900":"#004D4D","khor-feedback-processing":"#0ea5e9","khor-feedback-volcano":"#ea580c","khor-feedback-gold":"#eab308","khor-feedback-lime":"#84cc16","khor-feedback-purple":"#a855f7","khor-border-muted":"var(--khor-neutral-100)","khor-border-default":"var(--khor-neutral-200)","khor-border-strong":"var(--khor-neutral-300)","khor-border-error":"var(--khor-error)","khor-border-warning":"var(--khor-warning)","khor-border-focus":"var(--khor-primary)","khor-feedback-error":"var(--khor-error)","khor-feedback-warning":"var(--khor-warning)","khor-shadow-sm":"0 1px 2px rgba(5,23,88,0.04), 0 1px 1px rgba(0,0,0,0.02)","khor-shadow-md":"0 4px 6px -1px rgba(5,23,88,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)","khor-shadow-lg":"0 10px 15px -3px rgba(5,23,88,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)","khor-shadow-xl":"0 20px 25px -5px rgba(5,23,88,0.12), 0 10px 10px -5px rgba(0,0,0,0.04)","khor-shadow-2xl":"0 25px 50px -12px rgba(5,23,88,0.25)","khor-shadow-inner":"inset 0 2px 4px 0 rgba(0,0,0,0.06)","khor-breakpoint-2xl":"1536px","khor-focus-ring-width":"2px","khor-focus-ring-offset":"2px","khor-focus-ring-color":"var(--khor-primary)","khor-layout-grid-margin-sm":"16px","khor-layout-grid-gutter-sm":"16px","khor-layout-grid-margin-md":"24px","khor-layout-grid-gutter-md":"24px","khor-layout-grid-margin-lg":"32px","khor-layout-grid-gutter-lg":"32px","khor-layout-grid-margin-xl":"40px","khor-layout-grid-gutter-xl":"32px","khor-container-sm":"640px","khor-container-md":"768px","khor-container-lg":"1024px","khor-container-xl":"1280px","khor-space-0":"0px","khor-space-1":"4px","khor-space-2":"8px","khor-space-3":"12px","khor-space-4":"16px","khor-space-5":"20px","khor-space-6":"24px","khor-space-8":"32px","khor-space-10":"40px","khor-space-12":"48px","khor-space-16":"64px","khor-space-20":"80px","khor-space-24":"96px","khor-radius-none":"0px","khor-radius-xs":"2px","khor-radius-sm":"4px","khor-radius-md":"6px","khor-radius-lg":"8px","khor-radius-xl":"10px","khor-radius-2xl":"12px","khor-radius-full":"9999px","khor-blur-none":"0px","khor-blur-xs":"4px","khor-blur-sm":"8px","khor-blur-md":"12px","khor-blur-lg":"16px","khor-blur-xl":"24px","khor-blur-2xl":"40px","khor-blur-3xl":"64px","khor-backdrop-blur-none":"var(--khor-blur-none)","khor-backdrop-blur-xs":"var(--khor-blur-xs)","khor-backdrop-blur-sm":"var(--khor-blur-sm)","khor-backdrop-blur-md":"var(--khor-blur-md)","khor-backdrop-blur-lg":"var(--khor-blur-lg)","khor-backdrop-blur-xl":"var(--khor-blur-xl)","khor-backdrop-blur-2xl":"var(--khor-blur-2xl)","khor-backdrop-blur-3xl":"var(--khor-blur-3xl)","khor-opacity-0":"0","khor-opacity-10":"0.1","khor-opacity-20":"0.2","khor-opacity-30":"0.3","khor-opacity-40":"0.4","khor-opacity-50":"0.5","khor-opacity-60":"0.6","khor-opacity-70":"0.7","khor-opacity-80":"0.8","khor-opacity-90":"0.9","khor-opacity-100":"1","khor-state-layer-hover":"0.08","khor-state-layer-pressed":"0.12","khor-state-layer-dragged":"0.16","khor-state-layer-focus":"0.12","khor-color-action-primary-default":"var(--khor-primary)","khor-color-action-secondary-default":"var(--khor-secondary)","khor-color-action-accent-default":"var(--khor-accent)","khor-size-radius-md":"var(--khor-radius-md)","khor-size-radius-lg":"var(--khor-radius-lg)","khor-size-radius-full":"var(--khor-radius-full)","khor-duration-motion-standard":"var(--khor-duration-normal)","khor-easing-motion-standard":"var(--khor-easing-standard)","khor-rotate-0":"0deg","khor-rotate-45":"45deg","khor-rotate-90":"90deg","khor-rotate-180":"180deg","khor-rotate-270":"270deg","khor-duration-instant":"80ms","khor-duration-fast":"100ms","khor-duration-normal":"200ms","khor-duration-slow":"400ms","khor-duration-slower":"500ms","khor-duration-entrance":"250ms","khor-duration-exit":"200ms","khor-easing-standard":"cubic-bezier(0.4, 0, 0.2, 1)","khor-easing-decelerate":"cubic-bezier(0, 0, 0.2, 1)","khor-easing-accelerate":"cubic-bezier(0.4, 0, 1, 1)","khor-easing-spring":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","khor-easing-bounce":"cubic-bezier(0.34, 1.56, 0.64, 1)","khor-easing-smooth":"cubic-bezier(0.45, 0, 0.55, 1)","khor-easing-emphasized":"cubic-bezier(0.2, 0, 0, 1)","khor-transition-fade":"opacity var(--khor-duration-entrance) var(--khor-easing-decelerate)","khor-transition-color":"color var(--khor-duration-fast) var(--khor-easing-standard), background-color var(--khor-duration-fast) var(--khor-easing-standard), border-color var(--khor-duration-fast) var(--khor-easing-standard)","khor-transition-scale":"transform var(--khor-duration-fast) var(--khor-easing-spring)","khor-transition-slide":"transform var(--khor-duration-entrance) var(--khor-easing-decelerate), opacity var(--khor-duration-entrance) var(--khor-easing-decelerate)","khor-transition-all":"all var(--khor-duration-normal) var(--khor-easing-standard)","khor-line-height-dynamic":"1.5","khor-icon-xs":"12px","khor-icon-sm":"16px","khor-icon-md":"20px","khor-icon-lg":"24px","khor-icon-xl":"32px","khor-icon-2xl":"48px","khor-form-error-bg":"var(--khor-error-50)","khor-form-error-border":"var(--khor-error-500)","khor-form-error-text":"var(--khor-error-700)","khor-form-success-bg":"var(--khor-success-50)","khor-form-success-border":"var(--khor-success-500)","khor-form-success-text":"var(--khor-success-700)","khor-form-warning-bg":"var(--khor-warning-50)","khor-form-warning-border":"var(--khor-warning-500)","khor-form-warning-text":"var(--khor-warning-700)","khor-form-focus-ring":"var(--khor-primary)","khor-chart-primary":"#E04D36","khor-chart-secondary":"#051758","khor-chart-accent":"#FF9500","khor-chart-success":"#2E7D32","khor-chart-error":"#D32F2F","khor-chart-info":"#1976D2","khor-chart-teal":"#008080","khor-chart-purple":"#9C27B0","khor-chart-pink":"#E91E63","khor-chart-cyan":"#00BCD4","khor-chart-amber":"#FFC107","khor-chart-gray":"#9E9E9E","khor-z-base":"0","khor-z-dropdown":"1000","khor-z-sticky":"1100","khor-z-overlay":"1200","khor-z-drawer":"1300","khor-z-modal":"1400","khor-z-popover":"1500","khor-z-tooltip":"1600","khor-z-toast":"1700","khor-safe-area-top":"env(safe-area-inset-top, 0px)","khor-safe-area-bottom":"env(safe-area-inset-bottom, 0px)","khor-touch-target-min":"44px","khor-touch-target-comfortable":"48px","khor-bottom-nav-h":"64px","khor-chart-1":"var(--khor-primary)","khor-chart-2":"var(--khor-secondary)","khor-chart-3":"var(--khor-accent)","khor-chart-4":"var(--khor-success)","khor-chart-5":"var(--khor-error)","khor-chart-6":"var(--khor-info)","khor-chart-7":"var(--khor-teal)","khor-chart-8":"var(--khor-feedback-purple)","khor-chart-9":"var(--khor-feedback-volcano)","khor-chart-10":"var(--khor-feedback-gold)","khor-chart-11":"var(--khor-feedback-lime)","khor-chart-12":"var(--khor-neutral-500)","khor-stroke-0":"0px","khor-stroke-1":"1px","khor-stroke-2":"2px","khor-stroke-3":"3px","khor-stroke-4":"4px","khor-stroke-5":"5px","khor-stroke-6":"6px","khor-stroke-8":"8px","khor-text-case-none":"none","khor-text-case-upper":"uppercase","khor-text-case-lower":"lowercase","khor-text-case-cap":"capitalize","khor-text-decoration-none":"none","khor-text-decoration-underline":"underline","khor-text-decoration-line-through":"line-through","khor-font-weight-light":"300","khor-font-weight-regular":"400","khor-font-weight-medium":"500","khor-font-weight-semibold":"600","khor-font-weight-bold":"700","khor-font-weight-extrabold":"800","khor-letter-spacing-tighter":"-0.05em","khor-letter-spacing-tight":"-0.02em","khor-letter-spacing-normal":"0em","khor-letter-spacing-wide":"0.025em","khor-letter-spacing-wider":"0.05em","khor-number-0":"0","khor-number-1":"1","khor-number-2":"2","khor-number-3":"3","khor-number-4":"4","khor-number-5":"5","khor-number-10":"10","khor-number-100":"100","khor-size-0":"0px","khor-size-1":"4px","khor-size-2":"8px","khor-size-3":"12px","khor-size-4":"16px","khor-size-5":"20px","khor-size-6":"24px","khor-size-8":"var(--khor-space-8)","khor-size-10":"var(--khor-space-10)","khor-size-12":"var(--khor-space-12)","khor-size-16":"var(--khor-space-16)","khor-size-20":"80px","khor-size-24":"96px","khor-size-32":"128px","khor-size-40":"160px","khor-size-48":"192px","khor-size-56":"224px","khor-size-64":"256px","khor-size-full":"100%","khor-size-screen-w":"100vw","khor-size-screen-h":"100vh","khor-font-size-display-2xl":"clamp(4rem, 5vw + 1rem, 4.5rem)","khor-font-size-display-xl":"clamp(3rem, 4vw + 1rem, 3.5rem)","khor-font-size-heading-lg":"clamp(2rem, 3vw + 1rem, 2.5rem)","khor-font-size-heading-md":"clamp(1.5rem, 2vw + 1rem, 2rem)","khor-font-size-heading-sm":"clamp(1.25rem, 1.5vw + 1rem, 1.5rem)","khor-font-size-heading-xs":"1.125rem","khor-font-size-body-xl":"1.125rem","khor-font-size-body-lg":"1rem","khor-font-size-body-md":"0.875rem","khor-font-size-body-sm":"0.75rem","khor-font-size-caption":"0.625rem","khor-font-size-code":"0.875rem","khor-font-size-label":"0.75rem","khor-font-size-display-1":"var(--khor-font-size-display-2xl)","khor-font-size-display-2":"var(--khor-font-size-display-xl)","khor-font-size-h1":"var(--khor-font-size-heading-lg)","khor-font-size-h2":"var(--khor-font-size-heading-md)","khor-font-size-h3":"var(--khor-font-size-heading-sm)","khor-font-size-h4":"var(--khor-font-size-heading-xs)","khor-font-size-h5":"var(--khor-font-size-body-lg)","khor-font-size-h6":"var(--khor-font-size-body-md)","khor-font-size-body-xs":"var(--khor-font-size-caption)","khor-line-height-display":"1.1","khor-line-height-heading":"1.25","khor-line-height-body":"1.5","khor-density-spacing-xs":"4px","khor-density-spacing-sm":"8px","khor-density-spacing-md":"12px","khor-density-spacing-lg":"16px","khor-density-height-sm":"32px","khor-density-height-md":"40px","khor-density-height-lg":"48px","khor-density-min-width-button":"80px","khor-density-min-width-input":"120px","khor-density-height-tag":"24px","khor-density-height-badge":"20px","khor-density-height-input":"var(--khor-density-height-md)","khor-density-height-row":"44px","khor-density-font-body":"var(--khor-font-size-body-md)","khor-density-font-label":"var(--khor-font-size-body-sm)","khor-tooltip-bg":"var(--khor-navy)","khor-tooltip-fg":"#FFFFFF","khor-avatar-bg":"#051758","khor-avatar-fg":"#FFFFFF","khor-slate-50":"#f8faff","khor-slate-100":"#f1f4ff","khor-slate-200":"#e2eafc","khor-slate-300":"#cbd8f1","khor-slate-400":"#94a9d8","khor-slate-500":"#647bb1","khor-slate-600":"#475a8f","khor-slate-700":"#33446b","khor-slate-800":"#1e2a4a","khor-slate-900":"#0f1a35","khor-action-primary-default":"var(--khor-primary)","khor-action-primary-hover":"var(--khor-primary-hover)","khor-action-primary-active":"var(--khor-primary-active)","khor-action-secondary-default":"var(--khor-secondary)","khor-action-secondary-hover":"var(--khor-secondary-hover)","khor-action-secondary-active":"var(--khor-secondary-active)","khor-action-danger-default":"var(--khor-error)","khor-action-danger-hover":"var(--khor-error-hover)","khor-action-danger-active":"var(--khor-error-active)","khor-action-ghost-hover":"rgba(5, 23, 88, 0.05)","khor-action-disabled-bg":"var(--khor-neutral-100)","khor-action-disabled-text":"var(--khor-neutral-400)","khor-surface-page":"var(--khor-neutral-50)","khor-surface-card":"#ffffff","khor-surface-raised":"#ffffff","khor-surface-overlay":"#ffffff","khor-overlay-bg":"rgba(255, 255, 255, 0.95)","khor-overlay-backdrop":"rgba(5, 23, 88, 0.4)","khor-context-sidebar-bg":"var(--khor-navy)","khor-context-sidebar-text":"var(--khor-neutral-50)","khor-context-sidebar-text-muted":"rgba(255, 255, 255, 0.55)","khor-context-sidebar-border":"rgba(255, 255, 255, 0.08)","khor-context-sidebar-hover":"rgba(255, 255, 255, 0.10)","khor-context-sidebar-active":"rgba(255, 255, 255, 0.15)","khor-context-header-bg":"var(--khor-surface-card)","khor-context-header-border":"var(--khor-border-default)","khor-surface-hover":"rgba(5, 23, 88, 0.04)","khor-surface-pressed":"rgba(5, 23, 88, 0.08)","khor-surface-selected":"rgba(224, 77, 54, 0.08)","khor-surface-dragging":"rgba(224, 77, 54, 0.04)","khor-surface-subtle":"#F4F6F8","khor-border-hover":"var(--khor-neutral-400)","khor-border-disabled":"var(--khor-neutral-100)","khor-focus-ring-style":"solid","khor-grid-header-bg":"var(--khor-neutral-100)","khor-grid-header-text":"var(--khor-text-secondary)","khor-grid-cell-border":"var(--khor-border-default)","khor-grid-row-hover":"var(--khor-surface-hover)","khor-grid-row-selected":"var(--khor-surface-selected)","khor-grid-resizer-color":"var(--khor-primary)","khor-text-primary":"var(--khor-secondary)","khor-text-secondary":"var(--khor-slate-600)","khor-text-muted":"var(--khor-slate-400)","khor-text-disabled":"var(--khor-slate-300)","khor-text-on-action":"#ffffff","khor-text-link":"var(--khor-primary)","khor-text-link-hover":"var(--khor-primary-hover)","khor-easing-enter":"cubic-bezier(0, 0, 0.2, 1)","khor-easing-exit":"cubic-bezier(0.4, 0, 1, 1)","khor-elevation-0":"none","khor-elevation-1":"0 1px 3px rgba(5, 23, 88, 0.06), 0 1px 2px rgba(5, 23, 88, 0.04)","khor-elevation-2":"0 4px 12px rgba(5, 23, 88, 0.08), 0 2px 4px rgba(5, 23, 88, 0.05)","khor-elevation-3":"0 8px 24px rgba(5, 23, 88, 0.10), 0 4px 8px rgba(5, 23, 88, 0.06)","khor-elevation-4":"0 16px 48px rgba(5, 23, 88, 0.14), 0 8px 16px rgba(5, 23, 88, 0.08)","khor-elevation-5":"0 24px 64px rgba(5, 23, 88, 0.18), 0 12px 24px rgba(5, 23, 88, 0.10)","khor-space-component-xs":"var(--khor-space-1)","khor-space-component-sm":"var(--khor-space-2)","khor-space-component-md":"var(--khor-space-3)","khor-space-component-lg":"var(--khor-space-4)","khor-space-layout-xs":"var(--khor-space-4)","khor-space-layout-sm":"var(--khor-space-6)","khor-space-layout-md":"var(--khor-space-8)","khor-space-layout-lg":"var(--khor-space-12)","khor-space-layout-xl":"var(--khor-space-16)","khor-button-primary-bg":"var(--khor-action-primary-default)","khor-button-primary-text":"var(--khor-text-on-action)","khor-button-primary-border":"transparent","khor-button-primary-shadow":"var(--khor-shadow-sm)","khor-button-secondary-bg":"var(--khor-action-secondary-default)","khor-button-secondary-text":"var(--khor-text-on-action)","khor-button-ghost-hover":"var(--khor-action-ghost-hover)","khor-button-radius":"var(--khor-radius-md)","khor-input-bg":"var(--khor-surface-card)","khor-input-text":"var(--khor-text-primary)","khor-input-border":"var(--khor-border-default)","khor-input-placeholder":"var(--khor-text-muted)","khor-input-focus-border":"var(--khor-border-focus)","khor-input-focus-ring":"var(--khor-primary)","khor-input-radius":"var(--khor-radius-md)","khor-card-bg":"var(--khor-surface-card)","khor-card-border":"var(--khor-border-default)","khor-card-shadow":"var(--khor-elevation-2)","khor-card-radius":"var(--khor-radius-lg)","khor-type-display-2xl":"clamp(3rem, 5vw + 1rem, 4.5rem)","khor-type-display-xl":"clamp(2.5rem, 4vw + 0.8rem, 3.75rem)","khor-type-heading-lg":"clamp(1.5rem, 2.5vw + 0.5rem, 3rem)","khor-type-heading-md":"clamp(1.25rem, 2vw + 0.4rem, 2rem)","khor-type-heading-sm":"clamp(1.125rem, 1.5vw + 0.3rem, 1.5rem)","khor-type-heading-xs":"clamp(1rem, 1.2vw + 0.25rem, 1.25rem)","khor-type-body-xl":"clamp(1.125rem, 1.2vw + 0.2rem, 1.375rem)","khor-type-body-lg":"clamp(1rem, 0.8vw + 0.15rem, 1.125rem)","khor-type-body-md":"1rem","khor-type-body-sm":"0.875rem"};
const darkTokens = {"khor-navy":"#8BA3D9","khor-neutral-50":"#1A1B2E","khor-info-light":"#0D1F3C","khor-neutral-100":"#22243A","khor-neutral-200":"#2E3148","khor-neutral-300":"#4A4E6A","khor-neutral-400":"#8B90A8","khor-neutral-500":"#B0B4C8","khor-neutral-600":"#9BA3B5","khor-neutral-700":"#B8BDC8","khor-neutral-800":"#D0D3DA","khor-neutral-900":"#E8EAF0","khor-surface-page":"var(--khor-neutral-50)","khor-surface-card":"var(--khor-neutral-100)","khor-surface-raised":"var(--khor-neutral-200)","khor-surface-overlay":"var(--khor-neutral-900)","khor-overlay-bg":"rgba(15, 26, 53, 0.95)","khor-overlay-backdrop":"rgba(0, 0, 0, 0.6)","khor-surface-hover":"rgba(255, 255, 255, 0.06)","khor-surface-pressed":"rgba(255, 255, 255, 0.10)","khor-surface-selected":"rgba(224, 77, 54, 0.15)","khor-surface-dragging":"rgba(224, 77, 54, 0.08)","khor-surface-subtle":"rgba(255, 255, 255, 0.04)","khor-text-primary":"var(--khor-neutral-900)","khor-text-secondary":"var(--khor-neutral-700)","khor-text-muted":"var(--khor-neutral-500)","khor-text-disabled":"var(--khor-neutral-400)","khor-text-on-action":"var(--khor-neutral-50)","khor-border-default":"var(--khor-neutral-300)","khor-border-hover":"var(--khor-neutral-500)","khor-border-disabled":"var(--khor-neutral-200)","khor-border-strong":"var(--khor-neutral-600)","khor-grid-header-bg":"var(--khor-neutral-200)","khor-grid-header-text":"var(--khor-neutral-900)","khor-grid-cell-border":"var(--khor-neutral-300)","khor-grid-row-hover":"rgba(255, 255, 255, 0.04)","khor-grid-row-selected":"rgba(224, 77, 54, 0.2)","khor-button-primary-bg":"var(--khor-primary)","khor-button-primary-text":"#FFFFFF","khor-input-bg":"var(--khor-neutral-200)","khor-input-border":"var(--khor-neutral-300)","khor-card-bg":"var(--khor-neutral-100)","khor-card-border":"var(--khor-neutral-200)","khor-avatar-bg":"#0A2270","khor-avatar-fg":"#FFFFFF"};

figma.showUI(__html__, { width: 340, height: 420 });

figma.ui.onmessage = function(msg) {
  if (msg.type === 'Sync') syncVariables();
  if (msg.type === 'Hierarchy') buildStructure();
  if (msg.type === 'Foundations') populateFoundations();
  if (msg.type === 'KButton') generateKButton();
};

async function syncVariables() {
  figma.notify('Iniciando Sincronizacion...');
  try {
    var col = figma.variables.getLocalVariableCollections().find(function(c) { return c.name === 'Khor v6.0 Core'; });
    if (!col) col = figma.variables.createVariableCollection('Khor v6.0 Core');
    
    var lMode = col.modes[0].modeId;
    var dModeObj = col.modes.find(function(m) { return m.name === 'Dark'; });
    var dMode = dModeObj ? dModeObj.modeId : col.addMode('Dark');

    var hexToRgb = function(hex) {
      hex = hex.trim();
      if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      return { r: parseInt(hex.slice(1,3),16)/255, g: parseInt(hex.slice(3,5),16)/255, b: parseInt(hex.slice(5,7),16)/255 };
    };

    var parseVal = function(v) {
      v = v.trim();
      if (v.indexOf('#') === 0) return { t: 'COLOR', v: hexToRgb(v) };
      var n = parseFloat(v);
      if (!isNaN(n)) {
        if (v.indexOf('rem') !== -1 || v.indexOf('em') !== -1) n = n * 16;
        return { t: 'FLOAT', v: n };
      }
      return { t: 'STRING', v: v };
    };

    var count = 0;
    var keys = Object.keys(lightTokens);
    for (var i = 0; i < keys.length; i++) {
      try {
        var name = keys[i];
        var pL = parseVal(lightTokens[name]);
        var vName = name.replace('khor-', '').split('-').map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join('/');
        
        var v = figma.variables.getLocalVariables().find(function(vn) { 
          return vn.name === vName && vn.variableCollectionId === col.id; 
        });
        
        if (!v) v = figma.variables.createVariable(vName, col, pL.t);
        v.setValueForMode(lMode, pL.v);
        
        if (darkTokens[name]) {
          var pD = parseVal(darkTokens[name]);
          v.setValueForMode(dMode, pD.v);
        }
        count++;
      } catch (e) {}
    }
    figma.notify('Completado: ' + count + ' tokens');
    figma.ui.postMessage('Sync OK: ' + count);
  } catch (err) { figma.notify('Error: ' + err.message); }
}

async function buildStructure() {
  figma.notify('Creando jerarquia de paginas...');
  var cats = ['Foundations', 'Atoms', 'Molecules', 'Organisms'];
  for (var i = 0; i < cats.length; i++) {
    var name = cats[i];
    var p = figma.root.children.find(function(pg) { return pg.name === name; });
    if (!p) {
      p = figma.createPage();
      p.name = name;
    }
  }
  figma.notify('Jerarquia creada');
}

async function populateFoundations() {
  var col = figma.variables.getLocalVariableCollections().find(function(c) { return c.name === 'Khor v6.0 Core'; });
  if (!col) return figma.notify('Sync primero');
  
  var vars = figma.variables.getLocalVariables().filter(function(v) { return v.variableCollectionId === col.id; });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  var cats = [
    { n: 'Colors', f: 'COLOR' },
    { n: 'Typography', f: 'FLOAT' },
    { n: 'Radius', f: 'FLOAT' },
    { n: 'Spacing', f: 'FLOAT' },
    { n: 'Shadows', f: 'STRING' }
  ];

  for (var i = 0; i < cats.length; i++) {
    var cat = cats[i];
    var pName = 'Foundations / ' + cat.n;
    var p = figma.root.children.find(function(pg) { return pg.name === pName; });
    if (!p) {
      p = figma.createPage();
      p.name = pName;
    }
    figma.currentPage = p;
    var children = p.children;
    for (var j = 0; j < children.length; j++) children[j].remove();

    var filtered = vars.filter(function(v) {
      if (cat.f === 'COLOR') return v.resolvedType === 'COLOR';
      var n = v.name.toLowerCase();
      if (cat.n === 'Shadows') return n.indexOf('shadow') !== -1 || n.indexOf('elevation') !== -1;
      return n.indexOf(cat.n.toLowerCase().substring(0, cat.n.length - 1)) !== -1;
    });

    if (filtered.length === 0) continue;
    var container = figma.createFrame();
    container.name = "Specs";
    container.layoutMode = "VERTICAL";
    container.paddingTop = 100;
    container.paddingLeft = 100;
    container.itemSpacing = 24;
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";
    p.appendChild(container);

    for (var k = 0; k < filtered.length; k++) {
      var v = filtered[k];
      var row = figma.createFrame();
      row.layoutMode = "HORIZONTAL";
      row.counterAxisAlignItems = "CENTER";
      row.itemSpacing = 20;
      row.fills = [];
      
      if (v.resolvedType === 'COLOR') {
        var sw = figma.createRectangle();
        sw.resize(60,60);
        sw.cornerRadius = 8;
        sw.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v)];
        row.appendChild(sw);
      }
      
      var txt = figma.createText();
      var val = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
      txt.characters = v.name + ": " + JSON.stringify(val);
      row.appendChild(txt);
      container.appendChild(row);
    }
  }
  figma.notify('Foundations pobladas');
}

async function generateKButton() {
  figma.notify('Generando KButton (Beta)...');
}
