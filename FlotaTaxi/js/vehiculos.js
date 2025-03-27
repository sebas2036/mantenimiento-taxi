// Elementos del DOM
const btnNuevoVehiculo = document.getElementById('btnNuevoVehiculo');
const modalNuevoVehiculo = document.getElementById('modalNuevoVehiculo');
const btnCerrarModal = document.querySelector('.close-modal');
const vehicleForm = document.querySelector('.vehicle-form');
const btnFiltros = document.getElementById('btnFiltros');
const btnExportarDatos = document.getElementById('btnExportarDatos');
const searchInput = document.querySelector('.search-bar input');

// Abrir modal de nuevo vehículo
btnNuevoVehiculo.addEventListener('click', () => {
    modalNuevoVehiculo.classList.add('active');
});

// Cerrar modal
btnCerrarModal.addEventListener('click', () => {
    modalNuevoVehiculo.classList.remove('active');
});

// Cerrar modal al hacer clic fuera
modalNuevoVehiculo.addEventListener('click', (e) => {
    if (e.target === modalNuevoVehiculo) {
        modalNuevoVehiculo.classList.remove('active');
    }
});

// Manejar envío del formulario
vehicleForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Recoger datos del formulario
    const formData = {
        modelo: document.getElementById('modelo').value,
        matricula: document.getElementById('matricula').value,
        año: document.getElementById('año').value,
        capacidad: document.getElementById('capacidad').value,
        combustible: document.getElementById('combustible').value,
        estado: document.getElementById('estado').value
    };

    // Aquí iría la lógica para guardar los datos
    console.log('Datos del nuevo vehículo:', formData);
    
    // Cerrar modal y limpiar formulario
    modalNuevoVehiculo.classList.remove('active');
    vehicleForm.reset();
});

// Búsqueda en tiempo real
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Exportar datos
btnExportarDatos.addEventListener('click', () => {
    // Aquí iría la lógica para exportar los datos
    const datos = {
        fecha: new Date().toISOString(),
        vehiculos: [
            // Aquí irían los datos reales de los vehículos
        ]
    };
    
    // Ejemplo de exportación a CSV
    const csvContent = 'data:text/csv;charset=utf-8,ID,Modelo,Matrícula,Estado,Conductor,Último Mantenimiento\n';
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const rowData = Array.from(cells)
            .map(cell => cell.textContent.replace(/,/g, ';'))
            .join(',');
        csvContent += rowData + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vehiculos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Manejo de acciones en la tabla
document.querySelector('.table-container').addEventListener('click', (e) => {
    const button = e.target.closest('.btn-icon');
    if (!button) return;

    const row = button.closest('tr');
    const vehicleId = row.querySelector('td').textContent;

    if (button.querySelector('.fa-edit')) {
        // Lógica para editar
        console.log('Editar vehículo:', vehicleId);
    } else if (button.querySelector('.fa-history')) {
        // Lógica para ver historial
        console.log('Ver historial del vehículo:', vehicleId);
    } else if (button.querySelector('.fa-trash')) {
        // Lógica para eliminar
        if (confirm('¿Está seguro de que desea eliminar este vehículo?')) {
            console.log('Eliminar vehículo:', vehicleId);
            row.remove();
        }
    }
}); 