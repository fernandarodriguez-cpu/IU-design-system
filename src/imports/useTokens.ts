import { khorTokens } from '../app/theme/khor-theme';

/**
 * Bridge hook to provide tokens to imported components.
 * Maps the expected legacy/generic schema (geometry, etc.) 
 * to the actual Khor Design System tokens.
 */
export function useTokens() {
    const tokens = khorTokens;

    return {
        ...tokens,
        // Bridge: map 'geometry' to 'radius'
        geometry: tokens.radius,
        // Bridge: ensure typography maps expected paths
        typography: {
            ...tokens.typography,
            fontSize: {
                xs: tokens.typography.small.size,
                sm: tokens.typography.bodyMd.size,
                md: tokens.typography.bodyLg.size,
                lg: tokens.typography.h3.size,
            }
        }
    };
}
