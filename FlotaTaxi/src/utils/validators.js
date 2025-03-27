/**
 * Utilidades de validación para el sistema
 */

// Validación de matrícula de vehículo
export const validarMatricula = (matricula) => {
    const patronMatricula = /^[A-Z]{3}-\d{3}$/;
    return patronMatricula.test(matricula);
};

// Validación de campos requeridos
export const validarCampoRequerido = (valor) => {
    return valor !== null && valor !== undefined && valor.trim() !== '';
};

// Validación de número positivo
export const validarNumeroPositivo = (numero) => {
    return !isNaN(numero) && Number(numero) > 0;
};

// Validación de fecha
export const validarFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    return fechaObj instanceof Date && !isNaN(fechaObj);
};

// Validación de email
export const validarEmail = (email) => {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(email);
};

// Validación de DNI/Documento
export const validarDocumento = (documento) => {
    const patronDNI = /^\d{8}[A-Z]$/;
    return patronDNI.test(documento);
};

// Validación de teléfono
export const validarTelefono = (telefono) => {
    const patronTelefono = /^\+?(\d{2,3})?\s*\d{9}$/;
    return patronTelefono.test(telefono);
}; 