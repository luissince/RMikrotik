import { useState } from 'react';
import { z } from 'zod';
import { signIn } from 'auth-astro/client';

// Schema de validación con Zod
const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'El email es requerido')
        .email('Formato de email inválido'),
    password: z
        .string()
        .min(1, 'La contraseña es requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface FormErrors {
    email?: string;
    password?: string;
}

const development = import.meta.env.ENV || import.meta.env.PUBLIC_ENV;

export default function LoginForm() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof LoginFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
        await signIn(provider, {
            callbackUrl: '/account',
            redirect: true,
        });
    };

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar con Zod
        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const newErrors: FormErrors = {};
            result.error.errors.forEach(error => {
                if (error.path[0] === 'email' || error.path[0] === 'password') {
                    newErrors[error.path[0] as keyof FormErrors] = error.message;
                }
            });
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            await signIn('credentials', {
                email: formData.email.trim(),
                password: formData.password.trim(),
                callbackUrl: '/account',
                redirect: true,
            });
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setErrors({ email: 'Error al iniciar sesión. Verifica tus credenciales.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-y-4">
            <h1 className="text-[#191919] text-3xl font-bold text-center">
                Iniciar sesión
            </h1>

            {/* Botones de redes sociales */}
            <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-x-2 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    {/* Icono de Google */}
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continuar con Google</span>
            </button>

            <button
                type="button"
                onClick={() => handleSocialLogin('github')}
                className="flex items-center justify-center gap-x-2 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Continuar con GitHub</span>
            </button>

            {/* <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-x-2 w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continuar con Facebook</span>
            </button> */}

            <div className="border-t-[1px] border-solid border-[#cccccc]"></div>

            {
                development === 'development' && (
                    <>
                        {/* Email Input */}
                        <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium">Correo electrónico</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Tu correo"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">{errors.email}</span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-y-1">
                            <label className="text-sm font-medium">Contraseña</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Tu contraseña"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">{errors.password}</span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center gap-x-2 w-full py-3 px-4 bg-sky-400 text-white rounded-lg hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading && (
                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            )}
                            <span>{isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}</span>
                        </button>
                    </>
                )
            }

            {/* <div className="text-center">
                <span className="text-[#707070] text-sm">¿Eres nuevo? </span>
                <a className="font-semibold underline text-sm text-sky-400 hover:text-sky-500" href="/sign-up">
                    Crear una nueva cuenta
                </a>
            </div> */}
        </form>
    );
}