import type { Session } from "@auth/core/types";

// Función para validar el número de tarjeta usando el algoritmo de Luhn
export const luhnCheck = (cardNumber: string) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export const validNumberCreditCard = (number: string | null) => {
    if (!number) {
        return false;
    }

    if (number.length === 0) {
        return false;
    }

    if (!/^\d{13,19}$/.test(number.replace(/\s+/g, ''))) {
        return false;
    }

    if (!luhnCheck(number.replace(/\s+/g, ''))) {
        return false;
    }

    return true;
}

export const validDateExpiry = (date: string | null) => {
    if (!date) {
        return false;
    }

    if (date.length === 0) {
        return false;
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) {
        return false;
    }

    return true;
}

export const validCvv = (cvv: string | null) => {
    if (!cvv) {
        return false;
    }

    if (cvv.length === 0) {
        return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
        return false;
    }

    return true;
}

/**
 * Formatea una cadena de fecha en un formato de "DD/MM/YYYY"
 * 
 * @param {string} date 
 * @returns {string} La cadena de fecha formateada.
 */
export function formatDate(date: string): string {
    const parts = date.split('-');
    const today = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
    const month =
        today.getMonth() + 1 > 9
            ? today.getMonth() + 1
            : '0' + (today.getMonth() + 1);
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}
