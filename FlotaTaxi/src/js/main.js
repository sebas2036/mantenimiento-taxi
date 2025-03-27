document.addEventListener('DOMContentLoaded', function() {
    const taxiCards = document.querySelectorAll('.taxi-card');
    const detailPanel = document.querySelector('.detail-panel');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-btn');
    const taxiIdElement = document.getElementById('taxi-id');
    
    // Función para generar datos de mantenimiento aleatorios
    function generateMaintenanceData() {
        return [
            {
                title: 'Cambio de Aceite',
                lastDate: '12/02/2025',
                kmSince: 8750,
                percentage: 87,
                status: 'danger',
                remaining: 1250
            },
            {
                title: 'Filtro de Aire',
                lastDate: '05/01/2025',
                kmSince: 12345,
                percentage: 62,
                status: 'warning',
                remaining: 7655
            },
            {
                title: 'Frenos',
                lastDate: '10/03/2025',
                kmSince: 2134,
                percentage: 21,
                status: 'ok',
                remaining: 27866
            },
            {
                title: 'Neumáticos',
                lastDate: '15/12/2024',
                kmSince: 15672,
                percentage: 39,
                status: 'ok',
                remaining: 24328
            }
        ];
    }
    
    // Abrir panel de detalles al hacer clic en un taxi
    taxiCards.forEach(card => {
        card.addEventListener('click', function() {
            const taxiId = this.getAttribute('data-taxi-id');
            taxiIdElement.textContent = taxiId;
            
            // Aquí iría una llamada a API para obtener los datos reales del taxi
            const maintenanceData = generateMaintenanceData();
            
            // Actualizar el panel con los datos del taxi seleccionado
            updateDetailPanel(taxiId, maintenanceData);
            
            // Mostrar el panel y el overlay
            detailPanel.classList.add('active');
            overlay.classList.add('active');
        });
    });
    
    // Función para actualizar el panel de detalles con datos específicos
    function updateDetailPanel(taxiId, maintenanceData) {
        // Actualizar el historial de mantenimiento
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach((bar, index) => {
            // Simular datos aleatorios para el historial
            if (index < 3) { // Primeros 3 meses con datos históricos
                const randomHeight = Math.floor(Math.random() * 80) + 20;
                bar.style.height = randomHeight + '%';
            } else {
                bar.style.height = '0%';
            }
        });
    }
    
    // Cerrar panel de detalles
    closeBtn.addEventListener('click', function() {
        detailPanel.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Cerrar panel de detalles al hacer clic fuera
    overlay.addEventListener('click', function() {
        detailPanel.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Lógica para la búsqueda
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    function searchTaxis() {
        const searchTerm = searchInput.value.toLowerCase();
        taxiCards.forEach(card => {
            const taxiNumber = card.querySelector('.taxi-number').textContent.toLowerCase();
            if (taxiNumber.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', searchTaxis);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchTaxis();
        }
    });
});

// Datos de ejemplo
const segurosData = [
    {
        id: 1,
        tipo: "Seguro Obligatorio",
        estado: "activo",
        vencimiento: "2024-04-15",
        poliza: "12345",
        aseguradora: "Seguros XYZ",
        cobertura: "Responsabilidad Civil",
        costo: 150000
    },
    {
        id: 2,
        tipo: "Seguro contra Todo Riesgo",
        estado: "proximo",
        vencimiento: "2024-03-30",
        poliza: "67890",
        aseguradora: "ABC Seguros",
        cobertura: "Total",
        costo: 250000
    },
    {
        id: 3,
        tipo: "Responsabilidad Civil",
        estado: "vencido",
        vencimiento: "2024-03-01",
        poliza: "54321",
        aseguradora: "DEF Seguros",
        cobertura: "Responsabilidad Civil Extendida",
        costo: 180000
    }
];

// Función para cambiar entre pestañas
function cambiarTab(tabId) {
    // Ocultar todos los paneles
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostrar el panel seleccionado
    document.getElementById(tabId + 'Panel').classList.add('active');
    
    // Activar el botón seleccionado
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// Función para mostrar detalles del seguro
function mostrarDetallesSeguro(seguro) {
    const detailPanel = document.getElementById('detailPanel');
    const taxiInfo = document.getElementById('taxiInfo');
    
    taxiInfo.innerHTML = `
        <div class="seguro-detalle">
            <h4>${seguro.tipo}</h4>
            <div class="seguro-info-detallada">
                <p><strong>Estado:</strong> <span class="estado-${seguro.estado}">${formatearEstado(seguro.estado)}</span></p>
                <p><strong>Vencimiento:</strong> ${formatearFecha(seguro.vencimiento)}</p>
                <p><strong>Póliza:</strong> #${seguro.poliza}</p>
                <p><strong>Aseguradora:</strong> ${seguro.aseguradora}</p>
                <p><strong>Cobertura:</strong> ${seguro.cobertura}</p>
                <p><strong>Costo:</strong> $${seguro.costo.toLocaleString()}</p>
            </div>
        </div>
    `;
    
    detailPanel.classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// Función para cerrar el panel de detalles
function closeDetailPanel() {
    document.getElementById('detailPanel').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

// Función para renovar seguro
function renovarSeguro(seguroId) {
    const seguro = segurosData.find(s => s.id === seguroId);
    if (seguro) {
        alert(`Iniciando proceso de renovación para ${seguro.tipo}`);
        // Aquí iría la lógica para renovar el seguro
    }
}

// Función para formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Función para formatear estado
function formatearEstado(estado) {
    const estados = {
        'activo': 'Activo',
        'proximo': 'Próximo a vencer',
        'vencido': 'Vencido'
    };
    return estados[estado] || estado;
}

// Función para calcular días hasta vencimiento
function calcularDiasHastaVencimiento(fecha) {
    const hoy = new Date();
    const vencimiento = new Date(fecha);
    const diferencia = vencimiento - hoy;
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
}

// Función para renderizar las tarjetas de seguros
function renderizarSeguros(filtroEstado = 'todos', filtroTipo = 'todos') {
    const segurosGrid = document.querySelector('.seguros-grid');
    segurosGrid.innerHTML = '';
    
    const segurosFiltrados = segurosData.filter(seguro => {
        const cumpleEstado = filtroEstado === 'todos' || seguro.estado === filtroEstado;
        const cumpleTipo = filtroTipo === 'todos' || seguro.tipo.toLowerCase().includes(filtroTipo);
        return cumpleEstado && cumpleTipo;
    });
    
    segurosFiltrados.forEach(seguro => {
        const diasRestantes = calcularDiasHastaVencimiento(seguro.vencimiento);
        const porcentajeRestante = Math.max(0, Math.min(100, (diasRestantes / 30) * 100));
        
        const card = document.createElement('div');
        card.className = 'seguro-card';
        card.innerHTML = `
            <div class="seguro-header">
                <span class="seguro-tipo">${seguro.tipo}</span>
                <span class="seguro-estado ${seguro.estado}">${formatearEstado(seguro.estado)}</span>
            </div>
            <div class="seguro-info">
                <p><i class="fas fa-calendar"></i> Vence: ${formatearFecha(seguro.vencimiento)}</p>
                <p><i class="fas fa-file-contract"></i> Póliza: #${seguro.poliza}</p>
                <p><i class="fas fa-building"></i> Aseguradora: ${seguro.aseguradora}</p>
                <div class="progreso-renovacion">
                    <span>Tiempo hasta renovación</span>
                    <div class="barra-progreso">
                        <div class="progreso ${diasRestantes < 15 ? 'warning' : ''}" 
                             style="width: ${porcentajeRestante}%"></div>
                    </div>
                </div>
            </div>
            <div class="seguro-actions">
                <button class="btn-renovar" onclick="renovarSeguro(${seguro.id})">
                    <i class="fas fa-sync"></i> Renovar
                </button>
                <button class="btn-detalles" onclick="mostrarDetallesSeguro(${JSON.stringify(seguro)})">
                    <i class="fas fa-eye"></i> Ver Detalles
                </button>
            </div>
        `;
        segurosGrid.appendChild(card);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar las pestañas
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            cambiarTab(button.dataset.tab);
        });
    });
    
    // Inicializar filtros
    const filtroEstado = document.getElementById('filtroEstado');
    const filtroTipo = document.getElementById('filtroTipo');
    
    filtroEstado.addEventListener('change', () => {
        renderizarSeguros(filtroEstado.value, filtroTipo.value);
    });
    
    filtroTipo.addEventListener('change', () => {
        renderizarSeguros(filtroEstado.value, filtroTipo.value);
    });
    
    // Cerrar panel al hacer clic en overlay
    document.getElementById('overlay').addEventListener('click', closeDetailPanel);
    
    // Renderizar seguros iniciales
    renderizarSeguros();
}); 