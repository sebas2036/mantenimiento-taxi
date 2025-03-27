// Variables globales
let vehiculos = [];
let totalVehiculos = 0;

// Función para actualizar el contador en el dashboard
function actualizarContadorVehiculos() {
    const contadorElement = document.getElementById('total-vehiculos');
    if (contadorElement) {
        contadorElement.textContent = totalVehiculos;
    }
}

// Función para agregar un vehículo
function agregarVehiculo(vehiculo) {
    vehiculos.push(vehiculo);
    totalVehiculos = vehiculos.length;
    actualizarContadorVehiculos();
    actualizarTablaVehiculos();
}

// Función para eliminar un vehículo
function eliminarVehiculo(id) {
    vehiculos = vehiculos.filter(v => v.id !== id);
    totalVehiculos = vehiculos.length;
    actualizarContadorVehiculos();
    actualizarTablaVehiculos();
}

// Función para actualizar la tabla de vehículos
function actualizarTablaVehiculos() {
    const tbody = document.querySelector('.vehicles-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    vehiculos.forEach(vehiculo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.matricula}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.año}</td>
            <td><span class="status ${vehiculo.estado.toLowerCase()}">${vehiculo.estado}</span></td>
            <td>${vehiculo.conductor}</td>
            <td>${vehiculo.ultimoMantenimiento}</td>
            <td>
                <button class="btn-icon" onclick="editarVehiculo('${vehiculo.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="eliminarVehiculo('${vehiculo.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para mostrar el modal de agregar/editar vehículo
function mostrarModalVehiculo(vehiculo = null) {
    const modal = document.getElementById('modal-vehiculo');
    const form = document.getElementById('form-vehiculo');
    
    if (!modal || !form) return;

    if (vehiculo) {
        // Modo edición
        form.querySelector('#vehiculo-id').value = vehiculo.id;
        form.querySelector('#vehiculo-matricula').value = vehiculo.matricula;
        form.querySelector('#vehiculo-modelo').value = vehiculo.modelo;
        form.querySelector('#vehiculo-año').value = vehiculo.año;
        form.querySelector('#vehiculo-estado').value = vehiculo.estado;
        form.querySelector('#vehiculo-conductor').value = vehiculo.conductor;
    } else {
        // Modo nuevo vehículo
        form.reset();
        form.querySelector('#vehiculo-id').value = `TX${String(totalVehiculos + 1).padStart(3, '0')}`;
    }

    modal.style.display = 'block';
}

// Función para cerrar el modal
function cerrarModalVehiculo() {
    const modal = document.getElementById('modal-vehiculo');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Función para guardar un vehículo
function guardarVehiculo(event) {
    event.preventDefault();
    const form = event.target;
    
    const vehiculo = {
        id: form.querySelector('#vehiculo-id').value,
        matricula: form.querySelector('#vehiculo-matricula').value,
        modelo: form.querySelector('#vehiculo-modelo').value,
        año: form.querySelector('#vehiculo-año').value,
        estado: form.querySelector('#vehiculo-estado').value,
        conductor: form.querySelector('#vehiculo-conductor').value,
        ultimoMantenimiento: new Date().toLocaleDateString()
    };

    const index = vehiculos.findIndex(v => v.id === vehiculo.id);
    if (index >= 0) {
        // Actualizar vehículo existente
        vehiculos[index] = vehiculo;
    } else {
        // Agregar nuevo vehículo
        agregarVehiculo(vehiculo);
    }

    cerrarModalVehiculo();
}

// Función para editar un vehículo
function editarVehiculo(id) {
    const vehiculo = vehiculos.find(v => v.id === id);
    if (vehiculo) {
        mostrarModalVehiculo(vehiculo);
    }
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos de ejemplo
    agregarVehiculo({
        id: 'TX001',
        matricula: 'ABC-123',
        modelo: 'Toyota Corolla',
        año: '2020',
        estado: 'Activo',
        conductor: 'Juan Pérez',
        ultimoMantenimiento: '15/03/2024'
    });

    agregarVehiculo({
        id: 'TX002',
        matricula: 'XYZ-789',
        modelo: 'Hyundai Elantra',
        año: '2021',
        estado: 'En Mantenimiento',
        conductor: 'María García',
        ultimoMantenimiento: '20/03/2024'
    });

    agregarVehiculo({
        id: 'TX003',
        matricula: 'DEF-456',
        modelo: 'Nissan Sentra',
        año: '2019',
        estado: 'Inactivo',
        conductor: 'No asignado',
        ultimoMantenimiento: '10/03/2024'
    });
}); 