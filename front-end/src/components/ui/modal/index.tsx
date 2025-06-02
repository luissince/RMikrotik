import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string | React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    showCloseButton?: boolean;
    closeOnEscape?: boolean;
    closeOnBackdrop?: boolean;
    preventBodyScroll?: boolean;
    className?: string;
    overlayClassName?: string;
    contentClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    footerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    showCloseButton = true,
    closeOnEscape = true,
    closeOnBackdrop = true,
    preventBodyScroll = true,
    className = '',
    overlayClassName = '',
    contentClassName = '',
    headerClassName = '',
    bodyClassName = '',
    footerClassName = ''
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Función para obtener elementos focuseables
    const getFocusableElements = useCallback((element: HTMLElement) => {
        const focusableSelectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'textarea:not([disabled])',
            'select:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable="true"]'
        ].join(', ');

        return element.querySelectorAll(focusableSelectors) as NodeListOf<HTMLElement>;
    }, []);

    // Trap focus dentro del modal
    const trapFocus = useCallback((e: KeyboardEvent) => {
        if (!modalRef.current) return;

        const focusableElements = getFocusableElements(modalRef.current);
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        }
    }, [getFocusableElements]);

    // Manejar ESC
    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscape) {
            onClose();
        }
    }, [closeOnEscape, onClose]);

    // Manejar click fuera del modal
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    }, [closeOnBackdrop, onClose]);

    // Obtener tamaños del modal
    const getModalSize = () => {
        const sizeClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            full: 'max-w-full mx-4'
        };
        return sizeClasses[size];
    };

    useEffect(() => {
        if (isOpen) {
            // Enfocar el primer elemento focuseable del modal
            requestAnimationFrame(() => {
                if (modalRef.current) {
                    const focusableElements = getFocusableElements(modalRef.current);
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    } else {
                        modalRef.current.focus();
                    }
                }
            });
        }
    }, [isOpen, getFocusableElements]);

    useEffect(() => {
        if (isOpen) {
            // Guardar el elemento activo actual
            previousActiveElement.current = document.activeElement as HTMLElement;

            // Prevenir scroll del body si está habilitado
            if (preventBodyScroll) {
                document.body.style.overflow = 'hidden';
            }

            // Agregar event listeners
            modalRef.current?.addEventListener('keydown', handleEscape);
            modalRef.current?.addEventListener('keydown', trapFocus);

            return () => {
                // Restaurar scroll del body
                if (preventBodyScroll) {
                    document.body.style.overflow = '';
                }

                // Restaurar foco al elemento anterior
                if (previousActiveElement.current) {
                    previousActiveElement.current.focus();
                }

                // Remover event listeners
                modalRef.current?.removeEventListener('keydown', handleEscape);
                modalRef.current?.removeEventListener('keydown', trapFocus);
            };
        }
    }, [isOpen, handleEscape, trapFocus, getFocusableElements, preventBodyScroll]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-xl shadow-2xl w-full ${getModalSize()} max-h-[90vh] overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className} ${contentClassName}`}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className={`flex items-center justify-between p-6 border-b border-gray-200 ${headerClassName}`}>
                        {title && (
                            <h2 id="modal-title" className="text-xl font-bold text-gray-800">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                                aria-label="Cerrar modal"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className={`overflow-y-auto ${bodyClassName} ${footer ? 'pb-0' : 'p-6'} ${title || showCloseButton ? 'p-6' : 'p-6'}`}>
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className={`p-6 border-t border-gray-200 bg-gray-50 ${footerClassName}`}>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;