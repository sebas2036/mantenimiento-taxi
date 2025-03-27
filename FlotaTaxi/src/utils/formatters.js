/**
 * Utilidades de formateo para el sistema
 */

// Formatear fecha a formato local
export const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Formatear moneda
export const formatearMoneda = (cantidad) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(cantidad);
};

// Formatear número con separadores de miles
export const formatearNumero = (numero) => {
    return new Intl.NumberFormat('es-ES').format(numero);
};

// Formatear porcentaje
export const formatearPorcentaje = (valor) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor / 100);
};

// Formatear texto a mayúsculas
export const formatearMayusculas = (texto) => {
    return texto.toUpperCase();
};

// Formatear texto a minúsculas
export const formatearMinusculas = (texto) => {
    return texto.toLowerCase();
};

// Formatear primera letra en mayúscula
export const capitalizarPrimeraLetra = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

// Formatear nombre completo
export const formatearNombreCompleto = (nombre, apellidos) => {
    return `${capitalizarPrimeraLetra(nombre)} ${capitalizarPrimeraLetra(apellidos)}`;
}; 