import * as React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, Lock, ServerCrash, FileX } from 'lucide-react';
import { cn } from './utils';

export interface ResultProps {
  status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}

export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  (
    {
      status,
      title,
      subTitle,
      icon,
      extra,
      className,
      ...props
    },
    ref
  ) => {
    const getDefaultIcon = () => {
      const iconProps = { className: 'w-16 h-16' };

      switch (status) {
        case 'success':
          return <CheckCircle2 {...iconProps} className="w-16 h-16 text-green-500" />;
        case 'error':
          return <XCircle {...iconProps} className="w-16 h-16 text-red-500" />;
        case 'info':
          return <Info {...iconProps} className="w-16 h-16 text-blue-500" />;
        case 'warning':
          return <AlertCircle {...iconProps} className="w-16 h-16 text-yellow-500" />;
        case '404':
          return <FileX {...iconProps} className="w-16 h-16 text-muted-foreground" />;
        case '403':
          return <Lock {...iconProps} className="w-16 h-16 text-muted-foreground" />;
        case '500':
          return <ServerCrash {...iconProps} className="w-16 h-16 text-muted-foreground" />;
        default:
          return <Info {...iconProps} className="w-16 h-16 text-muted-foreground" />;
      }
    };

    const getDefaultTitle = () => {
      switch (status) {
        case 'success':
          return '¡Operación exitosa!';
        case 'error':
          return 'Algo salió mal';
        case 'info':
          return 'Información';
        case 'warning':
          return 'Advertencia';
        case '404':
          return '404 - Página no encontrada';
        case '403':
          return '403 - Acceso denegado';
        case '500':
          return '500 - Error del servidor';
        default:
          return 'Resultado';
      }
    };

    const displayIcon = icon || getDefaultIcon();
    const displayTitle = title || getDefaultTitle();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center py-12 px-6 text-center',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="mb-6">
          {displayIcon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          {displayTitle}
        </h2>

        {/* Subtitle */}
        {subTitle && (
          <p className="text-base text-gray-600 max-w-md mb-6">
            {subTitle}
          </p>
        )}

        {/* Extra actions */}
        {extra && (
          <div className="flex flex-wrap gap-3 justify-center">
            {extra}
          </div>
        )}
      </div>
    );
  }
);

Result.displayName = 'Result';

// Convenience components for common scenarios
export const SuccessResult: React.FC<{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}> = (props) => <Result status="success" {...props} />;

export const ErrorResult: React.FC<{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}> = (props) => <Result status="error" {...props} />;

export const NotFoundResult: React.FC<{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}> = (props) => (
  <Result
    status="404"
    title={props.title || '404 - Página no encontrada'}
    subTitle={props.subTitle || 'Lo sentimos, la página que buscas no existe.'}
    {...props}
  />
);

export const ForbiddenResult: React.FC<{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}> = (props) => (
  <Result
    status="403"
    title={props.title || '403 - Acceso denegado'}
    subTitle={props.subTitle || 'No tienes permiso para acceder a este recurso.'}
    {...props}
  />
);

export const ServerErrorResult: React.FC<{
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}> = (props) => (
  <Result
    status="500"
    title={props.title || '500 - Error del servidor'}
    subTitle={props.subTitle || 'Algo salió mal en el servidor. Por favor, intenta de nuevo más tarde.'}
    {...props}
  />
);