import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { KButton } from '../components/design-system/atoms/KButton';
import { khorTokens } from '../theme/khor-theme';
import { AlertCircle, ArrowLeft, RefreshCw, Box } from 'lucide-react';
import { KEmptyState } from '../components/design-system/molecules/KEmptyState';

export function ErrorPage() {
  const error = useRouteError() as any;
  
  let title = "Ocurrió un error en el sistema";
  let description = error?.message || "Lo sentimos, ha habido un problema interno al renderizar esta vista.";
  let Icon = AlertCircle;
  let iconColor: string = khorTokens.colors.feedback.error;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Página no encontrada";
      description = "La ruta que intentas visitar no existe en Khor Documentation.";
      Icon = Box;
      iconColor = khorTokens.colors.brand.accent;
    } else {
      title = `Error ${error.status}`;
      description = error.statusText;
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: khorTokens.colors.neutral[50],
      padding: 32,
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      <div style={{ 
        maxWidth: 700, 
        width: '100%', 
        backgroundColor: '#FFFFFF',
        borderRadius: khorTokens.radius.xl,
        padding: 40,
        boxShadow: khorTokens.shadows.lg,
        border: `1px solid ${khorTokens.colors.neutral[200]}`
      }}>
        <KEmptyState 
          icon={<Icon size={56} color={iconColor} />}
          title={title}
          description={description}
        />
        
        {/* Render stack trace en desarrollo si existe */}
        {error?.stack && (
          <div style={{
            marginTop: 32,
            padding: 20,
            backgroundColor: khorTokens.colors.neutral[800],
            color: '#A0AEC0',
            borderRadius: khorTokens.radius.md,
            overflowX: 'auto',
            fontSize: 13,
            lineHeight: 1.6,
            fontFamily: 'monospace'
          }}>
            <p style={{ color: '#E2E8F0', fontWeight: 600, marginBottom: 8, marginTop: 0 }}>Stack Trace:</p>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          gap: 16, 
          justifyContent: 'center', 
          marginTop: 40 
        }}>
          <KButton 
            variant="outline" 
            onClick={() => window.history.back()}
            icon={<ArrowLeft size={18} />}
          >
            Volver Atrás
          </KButton>
          <KButton 
            variant="primary" 
            onClick={() => window.location.href = '#/'}
            icon={<RefreshCw size={18} />}
          >
            Recargar Interfaz
          </KButton>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
