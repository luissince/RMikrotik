import type React from "react";

export function keyNumberInteger(event: React.KeyboardEvent<HTMLInputElement>, enterCallback?: () => void) {
  const key = event.key;
  const isDigit = /\d/.test(key);

  if (!(isDigit || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab' || (event.ctrlKey || event.metaKey) && key === 'c' || (event.ctrlKey || event.metaKey) && key === 'v')) {
    event.preventDefault();
  }

  // Ejecutar el callback si la tecla presionada es "Enter"
  if (key === "Enter" && typeof enterCallback === "function") {
    enterCallback();
  }
}

export function keyCardExpiry(
  event: React.KeyboardEvent<HTMLInputElement>,
  enterCallback?: () => void
) {
  const input = event.currentTarget;
  const key = event.key;
  const isDigit = /^\d$/.test(key);
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  const isShortcut = (event.ctrlKey || event.metaKey) && ['c', 'v', 'x', 'a'].includes(key.toLowerCase());

  // Bloquear caracteres no permitidos
  if (!(isDigit || allowedKeys.includes(key) || isShortcut)) {
    event.preventDefault();
    return;
  }

  // Ejecutar el callback si la tecla es Enter
  if (key === "Enter" && typeof enterCallback === "function") {
    enterCallback();
    return;
  }

  const rawValue = input.value.replace(/\D/g, ''); // Eliminar cualquier no número
  const selectionStart = input.selectionStart ?? 0;
  const selectionEnd = input.selectionEnd ?? 0;

  // Permitir borrar
  if (key === 'Backspace' || key === 'Delete') {
    return;
  }

  // Simular el valor futuro
  const isSelecting = selectionStart !== selectionEnd;
  const futureValue = isSelecting
    ? rawValue.slice(0, selectionStart) + key + rawValue.slice(selectionEnd)
    : rawValue.slice(0, selectionStart) + key + rawValue.slice(selectionStart);

  if (futureValue.length > 4) {
    event.preventDefault(); // Limitar a 4 dígitos reales (sin contar "/")
    return;
  }

  // Formatear automáticamente "MM/YY"
  setTimeout(() => {
    const clean = input.value.replace(/\D/g, '').slice(0, 4);
    let formatted = clean;

    if (clean.length >= 3) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2)}`;
    } else if (clean.length >= 1) {
      formatted = clean;
    }

    input.value = formatted;
  }, 0);
}

export function keyIPAddress(event: React.KeyboardEvent<HTMLInputElement>, enterCallback?: () => void) {
  const key = event.key;
  const input = event.currentTarget;
  const value = input.value;
  const selectionStart = input.selectionStart;
  const selectionEnd = input.selectionEnd;

  // Teclas permitidas sin validación adicional
  const allowedKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
    'Enter', 'Home', 'End'
  ];

  // Combinaciones de teclas permitidas (Ctrl+C, Ctrl+V, etc.)
  const allowedCombinations = [
    (event.ctrlKey || event.metaKey) && key === 'c', // Copiar
    (event.ctrlKey || event.metaKey) && key === 'v', // Pegar
    (event.ctrlKey || event.metaKey) && key === 'a', // Seleccionar todo
    (event.ctrlKey || event.metaKey) && key === 'x'  // Cortar
  ];

  // Si es una tecla permitida o combinación, no prevenir la acción
  if (allowedKeys.includes(key) || allowedCombinations.some(comb => comb)) {
    // Ejecutar el callback si la tecla presionada es "Enter"
    if (key === "Enter" && typeof enterCallback === "function") {
      enterCallback();
    }
    return;
  }

  // Solo permitir números y puntos
  if (!/[\d.]/.test(key)) {
    event.preventDefault();
    return;
  }

  // Validación específica para puntos
  if (key === '.') {
    // No permitir punto al inicio
    if (selectionStart === 0) {
      event.preventDefault();
      return;
    }

    // No permitir punto si ya hay 3 puntos (dirección IP completa)
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount >= 3) {
      event.preventDefault();
      return;
    }

    // No permitir punto si el carácter anterior es un punto
    if (selectionStart !== null && value[selectionStart - 1] === '.') {
      event.preventDefault();
      return;
    }

    // No permitir punto si no hay un número antes
    if (selectionStart !== null && !/\d/.test(value[selectionStart - 1])) {
      event.preventDefault();
      return;
    }
  }

  // Validación para números: no permitir más de 3 dígitos seguidos
  if (/\d/.test(key)) {
    // Encontrar el inicio del número actual
    let start = selectionStart !== null ? selectionStart - 1 : 0;
    while (start >= 0 && /\d/.test(value[start])) {
      start--;
    }
    start++;

    // Encontrar el fin del número actual
    let end = selectionStart !== null ? selectionStart : 0;
    while (end < value.length && /\d/.test(value[end])) {
      end++;
    }

    // Calcular la longitud del número actual (incluyendo el nuevo dígito)
    const numberLength = end - start + (selectionStart !== selectionEnd ? 0 : 1);

    if (numberLength > 3) {
      event.preventDefault();
      return;
    }

    // No permitir números mayores a 255
    const currentNumberStr = value.substring(start, end) + key;
    const currentNumber = parseInt(currentNumberStr, 10);
    if (currentNumber > 255) {
      event.preventDefault();
      return;
    }
  }

  // Ejecutar el callback si la tecla presionada es "Enter"
  if (key === "Enter" && typeof enterCallback === "function") {
    enterCallback();
  }
}

export function keyNumberFloat(event: React.KeyboardEvent<HTMLInputElement>, enterCallback?: () => void) {
  const key = event.key;
  const isValid = /\d/.test(key);
  const isDot = key === '.';
  const hasDot = event.currentTarget.value.includes('.');

  if (!(isValid || isDot || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab' || (event.ctrlKey || event.metaKey) && key === 'c' || (event.ctrlKey || event.metaKey) && key === 'v')) {
    event.preventDefault();
  }

  if (isDot && hasDot) {
    event.preventDefault();
  }

  // Permitir solo un punto al principio del número
  if (event.currentTarget.selectionStart === 0 && isDot) {
    event.preventDefault();
  }

  // Ejecutar el callback si la tecla presionada es "Enter"
  if (key === "Enter" && typeof enterCallback === "function") {
    enterCallback();
  }
}

