import React, { ComponentProps } from 'react';
import { 
  FormProvider, 
  useFormContext, 
  Controller, 
  ControllerProps, 
  FieldPath, 
  FieldValues, 
  useForm,
  useWatch,
  get
} from 'react-hook-form';
import { cn } from '../../../../../imports/utils';

/* ────────────────────────────────────────────────────────────────
   KForm — Sistema de Formulario basado en React Hook Form
   ──────────────────────────────────────────────────────────────── */

export interface KFormProps<TFieldValues extends FieldValues> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  methods: ReturnType<typeof useForm<TFieldValues>>;
  onSubmit?: (data: TFieldValues) => void;
  layout?: 'horizontal' | 'vertical' | 'inline';
}

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
        className={cn(
          "flex gap-6 font-primary",
          layout === 'vertical' ? "flex-col" : layout === 'horizontal' ? "flex-col" : "flex-row items-end flex-wrap",
          className
        )}
        style={style}
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
const FormItemContext = React.createContext<{ id: string; name?: string } | null>(null);

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

function KFormFieldController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: KFormFieldProps<TFieldValues, TName>) {
  return <Controller {...props} />;
}

// ────────────────────────────────────────────────────────────────
// KFormItem (Wrapper Visual "Smart")
// ────────────────────────────────────────────────────────────────
export interface KFormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  name?: string; // Nuevo: Para auto-descubrimiento de errores
  required?: boolean;
  help?: React.ReactNode;
  error?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
}

function KFormItemWrapper({
  className,
  label,
  name,
  required,
  help,
  error: manualError,
  layout: itemLayout,
  labelCol,
  wrapperCol,
  children,
  ...props
}: KFormItemProps) {
  const id = React.useId();
  const context = useFormContext();
  
  // Auto-descubrimiento de errores vía context de RHF
  const fieldError = context && name ? get(context.formState.errors, name) : null;
  const errorMessage = manualError || (fieldError?.message as string);
  const hasError = !!errorMessage;

  return (
    <FormItemContext.Provider value={{ id, name }}>
      <div 
        className={cn(
          "flex flex-col gap-1.5 w-full transition-all",
          itemLayout === 'horizontal' ? "flex-row items-start gap-4" : "",
          className
        )} 
        {...props}
      >
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
               "text-sm font-bold text-khor-neutral-900",
               itemLayout === 'horizontal' ? "w-1/4 pt-2 text-right" : "",
               hasError ? "text-red-500" : ""
            )}
            style={labelCol?.span ? { width: `${(labelCol.span / 24) * 100}%` } : {}}
          >
            {label}
            {required && <span className="text-red-500 ml-1 select-none">*</span>}
          </label>
        )}
        
        <div className={cn(
           "flex-1 flex flex-col gap-1.5",
           itemLayout === 'horizontal' ? "w-3/4" : ""
        )}
        style={wrapperCol?.span ? { width: `${(wrapperCol.span / 24) * 100}%` } : {}}
        >
          {children}
          
          {hasError && (
            <p className="text-xs font-semibold text-red-500 animate-in fade-in slide-in-from-top-1 duration-200">
              {errorMessage}
            </p>
          )}
          
          {!hasError && help && (
            <p className="text-xs text-khor-neutral-400 font-medium">
              {help}
            </p>
          )}
        </div>
      </div>
    </FormItemContext.Provider>
  );
}

// ────────────────────────────────────────────────────────────────
// Attachments & Hooks
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
