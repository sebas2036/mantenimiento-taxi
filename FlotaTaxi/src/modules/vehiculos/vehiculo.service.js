/**
 * Servicio para la gestión de vehículos
 */

import { ApiService } from '../../services/api.service.js';
import { validarMatricula, validarNumeroPositivo } from '../../utils/validators.js';
import { formatearFecha } from '../../utils/formatters.js';

class VehiculoService {
    constructor() {
        this.api = new ApiService();
        this.endpoint = '/vehiculos';
    }

    // Obtener todos los vehículos
    async obtenerTodos() {
        try {
            const vehiculos = await this.api.get(this.endpoint);
            return vehiculos.map(this.transformarVehiculo);
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            throw error;
        }
    }

    // Obtener un vehículo por ID
    async obtenerPorId(id) {
        try {
            const vehiculo = await this.api.get(`${this.endpoint}/${id}`);
            return this.transformarVehiculo(vehiculo);
        } catch (error) {
            console.error(`Error al obtener vehículo ${id}:`, error);
            throw error;
        }
    }

    // Crear nuevo vehículo
    async crear(datosVehiculo) {
        try {
            this.validarDatosVehiculo(datosVehiculo);
            const vehiculo = await this.api.post(this.endpoint, datosVehiculo);
            return this.transformarVehiculo(vehiculo);
        } catch (error) {
            console.error('Error al crear vehículo:', error);
            throw error;
        }
    }

    // Actualizar vehículo
    async actualizar(id, datosVehiculo) {
        try {
            this.validarDatosVehiculo(datosVehiculo);
            const vehiculo = await this.api.put(`${this.endpoint}/${id}`, datosVehiculo);
            return this.transformarVehiculo(vehiculo);
        } catch (error) {
            console.error(`Error al actualizar vehículo ${id}:`, error);
            throw error;
        }
    }

    // Eliminar vehículo
    async eliminar(id) {
        try {
            await this.api.delete(`${this.endpoint}/${id}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar vehículo ${id}:`, error);
            throw error;
        }
    }

    // Obtener historial de mantenimiento
    async obtenerHistorialMantenimiento(id) {
        try {
            const historial = await this.api.get(`${this.endpoint}/${id}/mantenimiento`);
            return historial.map(registro => ({
                ...registro,
                fecha: formatearFecha(registro.fecha)
            }));
        } catch (error) {
            console.error(`Error al obtener historial de mantenimiento para vehículo ${id}:`, error);
            throw error;
        }
    }

    // Asignar conductor
    async asignarConductor(idVehiculo, idConductor) {
        try {
            return await this.api.patch(`${this.endpoint}/${idVehiculo}/conductor`, {
                conductorId: idConductor
            });
        } catch (error) {
            console.error(`Error al asignar conductor al vehículo ${idVehiculo}:`, error);
            throw error;
        }
    }

    // Validar datos del vehículo
    validarDatosVehiculo(datos) {
        if (!datos.modelo) {
            throw new Error('El modelo es requerido');
        }
        if (!validarMatricula(datos.matricula)) {
            throw new Error('La matrícula no tiene un formato válido');
        }
        if (!validarNumeroPositivo(datos.año)) {
            throw new Error('El año debe ser un número válido');
        }
        if (!validarNumeroPositivo(datos.capacidad)) {
            throw new Error('La capacidad debe ser un número válido');
        }
        return true;
    }

    // Transformar datos del vehículo para la presentación
    transformarVehiculo(vehiculo) {
        return {
            ...vehiculo,
            ultimoMantenimiento: vehiculo.ultimoMantenimiento ? 
                formatearFecha(vehiculo.ultimoMantenimiento) : 'Sin mantenimientos',
            estado: this.obtenerEstadoFormateado(vehiculo.estado)
        };
    }

    // Obtener estado formateado
    obtenerEstadoFormateado(estado) {
        const estados = {
            'activo': 'En Servicio',
            'mantenimiento': 'En Mantenimiento',
            'reparacion': 'En Reparación',
            'inactivo': 'Fuera de Servicio'
        };
        return estados[estado] || estado;
    }

    // Exportar datos a CSV
    async exportarACSV() {
        try {
            const vehiculos = await this.obtenerTodos();
            const headers = ['ID', 'Modelo', 'Matrícula', 'Estado', 'Conductor', 'Último Mantenimiento'];
            const csvContent = [
                headers.join(','),
                ...vehiculos.map(v => [
                    v.id,
                    v.modelo,
                    v.matricula,
                    v.estado,
                    v.conductor || '-',
                    v.ultimoMantenimiento
                ].join(','))
            ].join('\n');

            return csvContent;
        } catch (error) {
            console.error('Error al exportar datos:', error);
            throw error;
        }
    }
}

export const vehiculoService = new VehiculoService(); 