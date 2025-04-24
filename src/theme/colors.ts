export const colors = {
    primary: '#8AB4F8',
    secondary: '#F28B82',
    accent: '#81C995',
    surface: '#202018',
    background: '#121212',
    onBackground: '#E8EAED',
    onPrimary: '#FFFFFF',
    border: 'transparent',
    highlight: '#FFD700',
} as const;

export type ColorKey = keyof typeof colors;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
} as const;

export const typography = {
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.onBackground,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.onBackground,
    },
    body: {
        fontSize: 16,
        color: colors.onBackground,
    },
    caption: {
        fontSize: 14,
        color: colors.border,
    },
} as const; 