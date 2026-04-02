import React, { ComponentProps } from 'react';
import { 
  FormProvider, 
  useFormContext, 
  Controller, 
  ControllerProps, 
  FieldPath, 
  FieldValues, 
  FormProviderProps,
  useForm,
  useWatch
} from 'react-hook-form';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KForm — Sistema de Formulario basado en React Hook Form
   ═══════════════════════════════════════════════ */

export interface KFormProps<TFieldValues extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  methods: ReturnType<typeof useForm<TFieldValues>>;
  onSubmit?: (data: TFieldValues) => void;
  layout?: 'horizontal' | 'vertical' | 'inline';
}

/**
 * KForm encapsula el FormProvider de React Hook Form
 * y la etiqueta <form> HTML estándar, aplicando la fuente correcta.
 */
export function KForm<TFieldValues extends FieldValues>({
  methods,
  onSubmit,
  children,
  layout = 'vertical',
  style,
  className,
  ...rest
}: KFormProps<TFieldValues>) {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}
        style={{ fontFamily: font, ...style }}
        className={`flex ${layout === 'vertical' ? 'flex-col' : layout === 'horizontal' ? 'flex-wrap' : 'flex-row items-end gap-4'} gap-4 ${className || ''}`}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}

// ────────────────────────────────────────────────────────────────
// Form Contexts & Field Wrappers
// ────────────────────────────────────────────────────────────────
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

export const useFormField = () => {
  const fieldContext = useFormContext();
  const itemContext = React.useContext(FormItemContext);
  
  // We need to fetch fieldState through somehow, but RHF Controller already injects fieldState.
  // Instead of a global hook, we typically rely on Controller's render props.
  // This hook is kept for future expansion if deeply nested components need to know their ID context.
  
  if (!itemContext) {
    throw new Error('useFormField must be used within a KFormItem (or KForm.Field)');
  }
  return { id: itemContext.id, form: fieldContext };
};

// ────────────────────────────────────────────────────────────────
// KFormField (Actúa como Wrapper de Controller)
// ────────────────────────────────────────────────────────────────

export interface KFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control?: ControllerProps<TFieldValues, TName>['control'];
  render: ControllerProps<TFieldValues, TName>['render'];
  defaultValue?: any;
  rules?: ControllerProps<TFieldValues, TName>['rules'];
}

/**
 * KForm.Field (KFormField) es un Wrapper seguro sobre Controller de RHF.
 */
function KFormFieldController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: KFormFieldProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// ────────────────────────────────────────────────────────────────
// KFormItem (Wrapper Visual)
// ────────────────────────────────────────────────────────────────
export interface KFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  required?: boolean;
  help?: React.ReactNode;
  error?: string; // Manually pass if not using internal hook magic
}

/**
 * KForm.Item encapsula visualmente un Label, el componente Input, 
 * y un bloque de error o ayuda.
 */
function KFormItemWrapper({
  className,
  label,
  required,
  help,
  error,
  children,
  ...props
}: KFormItemProps) {
  const id = React.useId();
  
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={`flex flex-col gap-1.5 ${className || ''}`} {...props}>
        {label && (
          <label htmlFor={id} className={`text-sm font-medium text-khor-neutral-900 font-primary ${error ? 'text-khor-feedback-error' : ''}`}>
            {label}
            {required && <span className="text-khor-feedback-error ml-0.5">*</span>}
          </label>
        )}
        
        {children}
        
        {error && (
          <p className="text-xs font-medium text-khor-feedback-error font-primary animate-in fade-in-0">
            {error}
          </p>
        )}
        
        {!error && help && (
          <p className="text-xs text-khor-neutral-500 font-primary">
            {help}
          </p>
        )}
      </div>
    </FormItemContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────────
// Attachments
// ────────────────────────────────────────────────────────────────
KForm.Item = KFormItemWrapper;
KForm.Field = KFormFieldController;
KForm.useForm = useForm;
KForm.useWatch = useWatch;
KForm.useFormContext = useFormContext;

export const KFormItem = KFormItemWrapper;
export const useKForm = useForm;
export const useKFormWatch = useWatch;
export const useKFormContext = useFormContext;

export default KForm;
