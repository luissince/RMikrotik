// styles/buttonStyles.ts
export const buttonVariants = {
    // Variantes principales
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-400 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-400 text-white',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-400 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-white',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-400 text-white',
    info: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-400 text-white',
    link: 'bg-transparent hover:text-slate-500',
    
    // Variantes outline
    'primary-outline': 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400',
    'secondary-outline': 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-400',
    'success-outline': 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-400',
    'warning-outline': 'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white focus:ring-yellow-400',
    'error-outline': 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-400',
    'info-outline': 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white focus:ring-cyan-400',

    // Variantes ghost
    'primary-ghost': 'text-blue-600 hover:bg-blue-100 focus:ring-blue-400',
    'secondary-ghost': 'text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    'success-ghost': 'text-green-600 hover:bg-green-100 focus:ring-green-400',
    'warning-ghost': 'text-yellow-600 hover:bg-yellow-100 focus:ring-yellow-400',
    'error-ghost': 'text-red-600 hover:bg-red-100 focus:ring-red-400',
    'info-ghost': 'text-cyan-600 hover:bg-cyan-100 focus:ring-cyan-400',

    // Variantes light/dark
    light: 'bg-white hover:bg-gray-50 focus:ring-gray-300 text-gray-900 border border-gray-300',
    dark: 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-600 text-white',
  } as const;
  
  export const buttonSizes = {
    none: 'px-0 py-2 text-xs',
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  } as const;
  
  export const buttonRounded = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  } as const;
  
  // Clases base que siempre se aplican
  export const buttonBase = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  export type ButtonVariant = keyof typeof buttonVariants;
  export type ButtonSize = keyof typeof buttonSizes;
  export type ButtonRounded = keyof typeof buttonRounded;
  
  // Función helper para generar las clases del botón
  export const getButtonClasses = (
    variant: ButtonVariant = 'primary',
    size: ButtonSize = 'md',
    rounded: ButtonRounded = 'lg',
    fullWidth: boolean = false,
    customClasses?: string
  ) => {
    const classes = [
      buttonBase,
      buttonVariants[variant],
      buttonSizes[size],
      buttonRounded[rounded],
      fullWidth ? 'w-full' : '',
      customClasses || '',
    ].filter(Boolean).join(' ');
    
    return classes;
  };
  
  // Configuraciones predefinidas para casos específicos
  export const buttonPresets = {
    // Para modales de confirmación
    modalAccept: getButtonClasses('success', 'md', 'md'),
    modalCancel: getButtonClasses('error', 'md', 'md'),
    modalNeutral: getButtonClasses('secondary', 'md', 'md'),
    
    // Para formularios
    formSubmit: getButtonClasses('primary', 'lg', 'lg', true),
    formReset: getButtonClasses('secondary-outline', 'lg', 'lg', true),
    
    // Para acciones principales
    primaryAction: getButtonClasses('primary', 'lg', 'lg'),
    secondaryAction: getButtonClasses('secondary-outline', 'md', 'lg'),
    
    // Para estados de carga
    loading: getButtonClasses('primary', 'md', 'lg') + ' cursor-wait',
    
    // Para navegación
    navButton: getButtonClasses('primary-ghost', 'sm', 'md'),
  } as const;