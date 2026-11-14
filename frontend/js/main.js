// ============================================
// 1. PRODUCTOS (AHORA VIENEN DEL BACK-END)
// ============================================

// URL de nuestra API. Si estamos probando en la compu usa el servidor local,
// si no usa el de Railway (cambiar por la URL que nos da Railway)
const API_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:3000'
    : 'https://itustore-production.up.railway.app';

// Aca se guardan los productos que trae la API
let productos = [];

// Pide los productos al back-end y los muestra
async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    container.innerHTML = '<p class="text-center text-muted">Cargando productos...</p>';

    try {
        const respuesta = await fetch(`${API_URL}/api/productos`);
        if (!respuesta.ok) throw new Error('La API respondio con error');
        productos = await respuesta.json();
        renderizarProductos();
    } catch (error) {
        console.error('Error al cargar productos:', error);
        container.innerHTML = '<div class="alert alert-danger text-center">No se pudieron cargar los productos. Probá de nuevo más tarde.</div>';
    }
}

// ============================================
// 2. BANCOS Y MÉTODOS DE PAGO
// ============================================
const bancos = [
    { 
        id: 'provincia', 
        nombre: 'Banco Provincia', 
        icon: '🏛️', 
        cuotasMax: 12, 
        interes: 0,
        imagen: "https://cdn-cf.smartfense.com/file/2024/07/UHD-1024x683.jpeg"
    },
    { 
        id: 'galicia', 
        nombre: 'Banco Galicia', 
        icon: '🏦', 
        cuotasMax: 12, 
        interes: 0,
        imagen: 'https://media.minutouno.com/p/25039099f8d75fa5a98d57454735522e/adjuntos/150/imagenes/026/621/0026621910/1200x675/smart/galicia-logo-400x250-px.png'
    },
    { 
        id: 'santander', 
        nombre: 'Banco Santander', 
        icon: '💳', 
        cuotasMax: 12, 
        interes: 0,
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLJnd0jcO2tvjTL5CNSQ9YJkPZ1XnCCVyD1ZfaOpLbETbVYDfqOg0HHGd&s=100'
    },
    { 
        id: 'nacion', 
        nombre: 'Banco Nación', 
        icon: '🇦🇷', 
        cuotasMax: 12, 
        interes: 0,
        imagen: "https://abappra.org.ar/backend/views/images/entidades/home/articulo178.jpg"
    },
    { 
        id: 'bbva', 
        nombre: 'BBVA Francés', 
        icon: '🔵', 
        cuotasMax: 12, 
        interes: 0,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSJBQmecqoyTIcFVlW2vHpjicoa9sIYG5IXS_MgBTtYohmS8ZEW4S_Oo&s=100"
    },
    { 
        id: 'supervielle', 
        nombre: 'Banco Supervielle', 
        icon: '🟣', 
        cuotasMax: 9, 
        interes: 0,
        imagen: "https://content-us-7.content-cms.com/8ba19f21-9a97-4525-8886-f54d823a5cea/dxresources/3041/30416e4e-99b8-41c3-8c03-b34ae6e225d1.jpg?resize=250px%3A175px&crop=250%3A175%3B0%2C0"
    },
    { 
        id: 'ciudad', 
        nombre: 'Banco Ciudad', 
        icon: '🌆', 
        cuotasMax: 9, 
        interes: 0,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPaNFxs0_fx2ebpKoYr5MRqAqHIZ5jMwc13C4cmbzXmTugPNjHgGMl1KSp&s=100"
    },
    { 
        id: 'patagonia', 
        nombre: 'Banco Patagonia', 
        icon: '⛰️', 
        cuotasMax: 6, 
        interes: 0,
        imagen: "https://www.uncuyo.edu.ar/prensa/cache/captura7_732_1296.png"
    },
    { 
        id: 'macro', 
        nombre: 'Banco Macro', 
        icon: '🏛️', 
        cuotasMax: 12, 
        interes: 0,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4RxzSrBeDTOrthoScyJ1Xez7BeVwGjDVBBD2ZbLXSYjNcrXOVwWMg93dG&s=100"
    },
    { 
        id: 'hipotecario', 
        nombre: 'Banco Hipotecario', 
        icon: '🏠', 
        cuotasMax: 6, 
        interes: 0,
        imagen: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Logo_Banco_Hipotecario.svg/330px-Logo_Banco_Hipotecario.svg.png?utm_source=es.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
    }
];


const metodosPago = [
    { 
        id: 'debito', 
        nombre: 'Tarjeta de Débito', 
        icon: '💳', 
        requiereBanco: true,
        logo: null
    },
    { 
        id: 'credito', 
        nombre: 'Tarjeta de Crédito', 
        icon: '💳', 
        requiereBanco: true,
        logo: null
    },
    { 
        id: 'mercadopago', 
        nombre: 'Mercado Pago', 
        icon: null,
        requiereBanco: false,
        logo: "https://static.vecteezy.com/system/resources/previews/067/065/678/non_2x/mercadopago-logo-square-rounded-mercadopago-logo-free-download-mercadopago-logo-free-png.png"
    },
    { 
        id: 'transferencia', 
        nombre: 'Transferencia Bancaria', 
        icon: '🏦', 
        requiereBanco: false,
        logo: null
    }
];

// ============================================
// 3. FUNCIONES DEL CARRITO
// ============================================
const CARRITO_KEY = 'itustore_carrito';

function getCarrito() {
    try {
        const data = localStorage.getItem(CARRITO_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function agregarAlCarrito(productoId) {
    const carrito = getCarrito();
    const producto = productos.find(p => p.id === productoId);
    if (!producto) return;

    // Validar stock
    const existente = carrito.find(item => item.id === productoId);
    const cantidadActual = existente ? existente.cantidad : 0;
    
    if (cantidadActual >= producto.stock) {
        alert(`⚠️ Lo sentimos, solo tenemos ${producto.stock} unidades disponibles de "${producto.nombre}"`);
        return;
    }

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    saveCarrito(carrito);
    actualizarBadgeCarrito();
    renderizarCarrito();
}

function vaciarCarrito() {
    if (getCarrito().length === 0) return;
    if (confirm('¿Seguro que quieres vaciar el carrito?')) {
        saveCarrito([]);
        actualizarBadgeCarrito();
        renderizarCarrito();
    }
}

function eliminarDelCarrito(index) {
    const carrito = getCarrito();
    carrito.splice(index, 1);
    saveCarrito(carrito);
    actualizarBadgeCarrito();
    renderizarCarrito();
}

function calcularTotal(carrito) {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function calcularAhorro(producto) {
    if (!producto.precio_anterior) return 0;
    return producto.precio_anterior - producto.precio;
}

function calcularPorcentajeOferta(producto) {
    if (!producto.precio_anterior || producto.precio_anterior === 0) return 0;
    return Math.round(((producto.precio_anterior - producto.precio) / producto.precio_anterior) * 100);
}

function actualizarBadgeCarrito() {
    const carrito = getCarrito();
    const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.getElementById('carritoCount');
    if (badge) badge.textContent = count;
}

// ============================================
// 4. FORMATEAR PRECIO EN PESOS ARGENTINOS
// ============================================
function formatearPrecioARS(precio) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(precio);
}

// ============================================
// 5. RENDERIZAR PRODUCTOS
// ============================================
function renderizarProductos() {
    const container = document.getElementById('productosContainer');
    if (!container) {
        console.error('No se encontró el contenedor de productos');
        return;
    }

    container.innerHTML = '';

    productos.forEach(producto => {
        const porcentajeOferta = calcularPorcentajeOferta(producto);
        const valorCuota = Math.round(producto.precio / producto.cuotas);
        
        let badgesHTML = '';
        
        if (producto.precio_anterior) {
            badgesHTML += `<span class="badge bg-danger me-1">🔥 -${porcentajeOferta}%</span>`;
        }
        if (producto.cuotas) {
            badgesHTML += `<span class="badge bg-success me-1">${producto.cuotas}x $${valorCuota.toLocaleString()}</span>`;
        }
        if (producto.envio_gratis) {
            badgesHTML += `<span class="badge bg-info text-dark">🚚 Envío gratis</span>`;
        }
        if (producto.stock === 0) {
            badgesHTML += `<span class="badge bg-dark">Sin stock</span>`;
        } else if (producto.stock <= 3) {
            badgesHTML += `<span class="badge bg-warning text-dark">⚠️ Últimas unidades</span>`;
        }

        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="position-relative">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" loading="lazy" 
                         onerror="this.onerror=null; this.src='https://placehold.co/400x300?text=ItuStore'">
                    <div class="position-absolute top-0 start-0 p-2">
                        ${badgesHTML}
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span>
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion}</p>
                    <div class="mt-2">
                        ${producto.precio_anterior ? `<span class="text-decoration-line-through text-muted small">${formatearPrecioARS(producto.precio_anterior)}</span>` : ''}
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="precio">${formatearPrecioARS(producto.precio)}</span>
                            <button class="btn btn-primary btn-agregar" data-id="${producto.id}"
                                    aria-label="Agregar ${producto.nombre} al carrito" ${producto.stock === 0 ? 'disabled' : ''}>
                                <i class="bi bi-cart-plus me-1"></i> Agregar
                            </button>
                        </div>
                        ${producto.cuotas ? `<small class="text-muted">${producto.cuotas}x ${formatearPrecioARS(valorCuota)} sin interés</small>` : ''}
                        ${producto.envio_gratis ? `<small class="text-success d-block">✅ Envío gratis</small>` : ''}
                        <small class="text-muted">Stock: ${producto.stock} unidades</small>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });

    document.querySelectorAll('[data-id]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const id = parseInt(this.dataset.id);
            agregarAlCarrito(id);

            const originalText = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check-circle me-1"></i> Añadido';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 1500);
        });
    });
}

// ============================================
// 6. RENDERIZAR CARRITO CON OPCIÓN DE PAGO
// ============================================
function renderizarCarrito() {
    const carrito = getCarrito();
    const body = document.getElementById('carritoBody');
    if (!body) return;

    if (carrito.length === 0) {
        body.innerHTML = `<p class="text-center text-muted my-4">Tu carrito está vacío</p>`;
        return;
    }

    let html = `<ul class="list-group list-group-flush">`;
    let subtotal = 0;
    
    carrito.forEach((item, index) => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.nombre}</strong>
                    <span class="badge bg-secondary ms-2">x${item.cantidad}</span>
                    ${item.cuotas ? `<span class="badge bg-success ms-1">${item.cuotas}x</span>` : ''}
                </div>
                <div>
                    <span class="me-3">${formatearPrecioARS(totalItem)}</span>
                    <button class="btn btn-sm btn-outline-danger eliminar-item" data-index="${index}" 
                            aria-label="Eliminar ${item.nombre}">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </li>
        `;
    });
    html += `</ul>`;

    const total = calcularTotal(carrito);
    const maxCuotas = Math.max(...carrito.map(item => item.cuotas || 0));
    const valorCuotaTotal = maxCuotas > 0 ? Math.round(total / maxCuotas) : 0;
    
    html += `
        <div class="mt-3 p-3 bg-light rounded">
            <div class="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>${formatearPrecioARS(subtotal)}</span>
            </div>
            <div class="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span>${formatearPrecioARS(total)}</span>
            </div>
            ${maxCuotas > 0 ? `
                <div class="d-flex justify-content-between text-success mt-2">
                    <span>Hasta ${maxCuotas} cuotas sin interés:</span>
                    <span>${maxCuotas}x ${formatearPrecioARS(valorCuotaTotal)}</span>
                </div>
            ` : ''}
        </div>
        <div class="mt-3">
            <button class="btn btn-success w-100" id="btnPagar">
                <i class="bi bi-credit-card me-2"></i> Ir a pagar
            </button>
        </div>
    `;

    body.innerHTML = html;

    document.querySelectorAll('.eliminar-item').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const index = parseInt(this.dataset.index);
            eliminarDelCarrito(index);
        });
    });

    document.getElementById('btnPagar')?.addEventListener('click', function() {
        abrirModalPago();
    });
}

// ============================================
// 7. MODAL DE PAGO CON LOGOS DE BANCOS Y TARJETAS
// ============================================
function abrirModalPago() {
    const carrito = getCarrito();
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = calcularTotal(carrito);
    const modalHTML = `
        <div class="modal fade" id="modalPago" tabindex="-1" aria-labelledby="modalPagoLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="modalPagoLabel">
                            <i class="bi bi-credit-card me-2"></i>Finalizar Compra
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <!-- Resumen del pedido -->
                        <h6 class="fw-bold">📋 Resumen del pedido</h6>
                        <div class="bg-light p-3 rounded mb-3">
                            ${carrito.map(item => `
                                <div class="d-flex justify-content-between">
                                    <span>${item.nombre} x${item.cantidad}</span>
                                    <span>${formatearPrecioARS(item.precio * item.cantidad)}</span>
                                </div>
                            `).join('')}
                            <hr>
                            <div class="d-flex justify-content-between fw-bold">
                                <span>Total:</span>
                                <span>${formatearPrecioARS(total)}</span>
                            </div>
                        </div>

                       <!-- Método de pago -->
<h6 class="fw-bold mt-3">💳 Método de pago</h6>
<div class="row g-2 mb-3" id="metodosPagoContainer">
    ${metodosPago.map(metodo => `
        <div class="col-6 col-md-3">
            <div class="card metodo-pago-card ${metodo.id === 'credito' ? 'selected' : ''}" 
                 data-metodo="${metodo.id}" 
                 style="cursor: pointer; border: ${metodo.id === 'credito' ? '2px solid #0d6efd' : '1px solid #ddd'}">
                <div class="card-body text-center p-2">
                    ${metodo.logo ? `
                        <img src="${metodo.logo}" alt="${metodo.nombre}" 
                             style="max-height: 55px; width: auto; object-fit: contain; margin-bottom: 4px;">
                    ` : `
                        <div style="font-size: 2rem;">${metodo.icon}</div>
                    `}
                    <small>${metodo.nombre}</small>
                </div>
            </div>
        </div>
    `).join('')}
</div>

                        <!-- Selección de banco con LOGOS -->
                        <div id="bancoContainer" class="mb-3">
                            <h6 class="fw-bold">🏦 Seleccioná tu banco</h6>
                            <div class="row g-2" id="bancosContainer">
                                ${bancos.map(banco => `
                                    <div class="col-6 col-md-4">
                                        <div class="card banco-card" data-banco="${banco.id}" 
                                             style="cursor: pointer; border: 1px solid #ddd; transition: all 0.3s ease;">
                                            <div class="card-body text-center p-2">
                                                <img src="${banco.imagen}" alt="${banco.nombre}" 
                                                     style="height: 35px; max-width: 100%; object-fit: contain; margin-bottom: 4px;"
                                                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size:1.5rem;\\'>${banco.icon}</div><small>${banco.nombre}</small>'">
                                                <div style="font-size: 0.7rem; font-weight: 600;">${banco.nombre}</div>
                                                <div><small class="text-muted" style="font-size: 0.6rem;">${banco.cuotasMax}x s/interés</small></div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Selector de cuotas -->
                        <div id="cuotasContainer" class="mb-3">
                            <h6 class="fw-bold">📊 Cantidad de cuotas</h6>
                            <select class="form-select" id="selectorCuotas">
                                <option value="1">1 cuota (sin interés)</option>
                            </select>
                            <small class="text-muted" id="valorCuotaInfo">Valor por cuota: ${formatearPrecioARS(total)}</small>
                        </div>

                        <!-- ===== DATOS DE LA TARJETA CON LOGOS ===== -->
                        <div id="datosTarjetaContainer" class="mt-3">
                            <h6 class="fw-bold">💳 Datos de la tarjeta</h6>
                            <div class="card p-3 shadow-sm">
                                <!-- Logo de tarjetas -->
                                <div class="text-end mb-2" id="tipoTarjetaIcono">
                                    <img src="https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png"
                                         alt="Visa" style="height: 30px; margin: 0 4px; opacity: 0.5;">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzcQ2wjesTq21K1_o3Rr-cXvicJpV4mNl-W7MDtipL5g9vZE5gVk48yI&s=100"
                                         alt="Mastercard" style="height: 30px; margin: 0 4px; opacity: 0.5;">
                                    <img src="https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2010/6/1/52/20160315052712fe9fc289c3ff0af142b6d3bead98a923.jpg"
                                         alt="Amex" style="height: 30px; margin: 0 4px; opacity: 0.5;">
                                </div>

                                <!-- Número de tarjeta -->
                                <div class="mb-3">
                                    <label for="numeroTarjeta" class="form-label fw-semibold">Número de tarjeta</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="bi bi-credit-card"></i></span>
                                        <input type="text" class="form-control" id="numeroTarjeta" 
                                               placeholder="1234 5678 9012 3456" maxlength="19"
                                               autocomplete="cc-number">
                                    </div>
                                    <div id="numeroTarjetaHelp" class="form-text text-muted">16 dígitos</div>
                                </div>

                                <!-- Nombre del titular -->
                                <div class="mb-3">
                                    <label for="nombreTitular" class="form-label fw-semibold">Nombre del titular</label>
                                    <input type="text" class="form-control" id="nombreTitular" 
                                           placeholder="Como figura en la tarjeta" autocomplete="cc-name">
                                </div>

                                <div class="row">
                                    <!-- Fecha de vencimiento -->
                                    <div class="col-md-6 mb-3">
                                        <label for="fechaVencimiento" class="form-label fw-semibold">Fecha de vencimiento</label>
                                        <input type="text" class="form-control" id="fechaVencimiento" 
                                               placeholder="MM/AA" maxlength="5" autocomplete="cc-exp">
                                    </div>

                                    <!-- CVV -->
                                    <div class="col-md-6 mb-3">
                                        <label for="cvvTarjeta" class="form-label fw-semibold">Código de seguridad (CVV)</label>
                                        <div class="input-group">
                                            <input type="password" class="form-control" id="cvvTarjeta" 
                                                   placeholder="123" maxlength="4" autocomplete="cc-csc">
                                            <button class="btn btn-outline-secondary" type="button" 
                                                    id="verCVV" title="Mostrar CVV">
                                                <i class="bi bi-eye"></i>
                                            </button>
                                        </div>
                                        <div id="cvvHelp" class="form-text text-muted">Últimos 3 dígitos del reverso</div>
                                    </div>
                                </div>

                                <!-- Marca de tarjeta detectada -->
                                <div class="text-center mt-2" id="tipoTarjetaDetectado">
                                    <span class="badge bg-secondary">💳 Seleccioná una tarjeta</span>
                                </div>
                            </div>
                        </div>

                        <!-- Datos del comprador -->
                        <h6 class="fw-bold mt-3">👤 Datos del comprador</h6>
                        <div class="row g-2">
                            <div class="col-md-6">
                                <input type="text" class="form-control" id="nombreComprador" placeholder="Nombre completo" required>
                            </div>
                            <div class="col-md-6">
                                <input type="email" class="form-control" id="emailComprador" placeholder="Email" required>
                            </div>
                            <div class="col-12">
                                <input type="text" class="form-control" id="dniComprador" placeholder="DNI" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-success" id="btnConfirmarCompra">
                            <i class="bi bi-check-circle me-2"></i> Confirmar compra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Eliminar modal existente
    const modalExistente = document.getElementById('modalPago');
    if (modalExistente) modalExistente.remove();

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalElement = document.getElementById('modalPago');
    const modalPago = new bootstrap.Modal(modalElement);
    modalPago.show();

    // ============================================
    // 7.1 FORMATO Y VALIDACIÓN DE TARJETA
    // ============================================
    
    // Formatear número de tarjeta
    const numeroTarjeta = document.getElementById('numeroTarjeta');
    if (numeroTarjeta) {
        numeroTarjeta.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            this.value = formatted;
            detectarTipoTarjeta(value);
        });
    }

    // Detectar tipo de tarjeta con LOGOS
    function detectarTipoTarjeta(numero) {
        const detectado = document.getElementById('tipoTarjetaDetectado');
        if (!detectado) return;
        
        const primeros = numero.slice(0, 4);
        let html = '';
        
        if (/^4/.test(numero)) {
            html = `<span class="badge" style="background: #1a1f71; padding: 6px 16px;">
                        <img src="https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png" 
                             alt="Visa" style="height: 20px; filter: brightness(0) invert(1);">
                    </span>`;
        } else if (/^5[1-5]/.test(numero)) {
            html = `<span class="badge" style="background: #eb001b; padding: 6px 16px;">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzcQ2wjesTq21K1_o3Rr-cXvicJpV4mNl-W7MDtipL5g9vZE5gVk48yI&s=100"
                             alt="Mastercard" style="height: 20px; filter: brightness(0) invert(1);">
                    </span>`;
        } else if (/^3[47]/.test(numero)) {
            html = `<span class="badge" style="background: #006fcf; padding: 6px 16px;">
                        <img src="https://www.fundacionkonex.org/custom/web/data/imagenes/repositorio/2010/6/1/52/20160315052712fe9fc289c3ff0af142b6d3bead98a923.jpg" 
                             alt="American Express" style="height: 20px; filter: brightness(0) invert(1);">
                    </span>`;
        } else if (/^6(?:011|5)/.test(numero)) {
            html = `<span class="badge bg-warning text-dark" style="padding: 6px 16px;">
                        <i class="bi bi-credit-card me-1"></i> Discover
                    </span>`;
        } else if (/^2/.test(numero)) {
            html = `<span class="badge bg-dark" style="padding: 6px 16px;">
                        <i class="bi bi-credit-card me-1"></i> Diners Club
                    </span>`;
        } else {
            html = `<span class="badge bg-secondary" style="padding: 6px 16px;">
                        <i class="bi bi-credit-card me-1"></i> Seleccioná una tarjeta
                    </span>`;
        }
        
        detectado.innerHTML = html;
    }

    // Formatear fecha de vencimiento
    const fechaVencimiento = document.getElementById('fechaVencimiento');
    if (fechaVencimiento) {
        fechaVencimiento.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            
            if (value.length >= 2) {
                const mes = parseInt(value.slice(0, 2));
                if (mes > 12) {
                    value = '12' + value.slice(2);
                }
                if (value.length > 2) {
                    this.value = value.slice(0, 2) + '/' + value.slice(2);
                } else {
                    this.value = value;
                }
            } else {
                this.value = value;
            }
        });

        fechaVencimiento.addEventListener('blur', function() {
            const parts = this.value.split('/');
            if (parts.length === 2) {
                const mes = parseInt(parts[0]);
                const anio = parseInt(parts[1]);
                if (mes < 1 || mes > 12) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            }
        });
    }

    // Validar CVV
    const cvvInput = document.getElementById('cvvTarjeta');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '');
            if (this.value.length > 4) this.value = this.value.slice(0, 4);
        });
    }

    // Mostrar/ocultar CVV
    document.getElementById('verCVV')?.addEventListener('click', function() {
        const cvv = document.getElementById('cvvTarjeta');
        if (cvv.type === 'password') {
            cvv.type = 'text';
            this.innerHTML = '<i class="bi bi-eye-slash"></i>';
        } else {
            cvv.type = 'password';
            this.innerHTML = '<i class="bi bi-eye"></i>';
        }
    });

    // Validar nombre del titular
    const nombreTitular = document.getElementById('nombreTitular');
    if (nombreTitular) {
        nombreTitular.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        });
    }

    // ============================================
    // 7.2 ESTADO DEL MODAL
    // ============================================
    let metodoSeleccionado = 'credito';
    let bancoSeleccionado = 'provincia';
    let cuotasSeleccionadas = 1;

    // Selección de método de pago
    document.querySelectorAll('.metodo-pago-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.metodo-pago-card').forEach(c => {
                c.style.border = '1px solid #ddd';
                c.classList.remove('selected');
            });
            this.style.border = '2px solid #0d6efd';
            this.classList.add('selected');
            
            metodoSeleccionado = this.dataset.metodo;
            const requiereBanco = metodosPago.find(m => m.id === metodoSeleccionado)?.requiereBanco;
            
            document.getElementById('bancoContainer').style.display = requiereBanco ? 'block' : 'none';
            
            const datosTarjeta = document.getElementById('datosTarjetaContainer');
            if (metodoSeleccionado === 'debito' || metodoSeleccionado === 'credito') {
                datosTarjeta.style.display = 'block';
            } else {
                datosTarjeta.style.display = 'none';
            }
            
            document.getElementById('cuotasContainer').style.display = (metodoSeleccionado === 'credito') ? 'block' : 'none';
            
            actualizarSelectorCuotas();
        });
    });

    // Selección de banco
    document.querySelectorAll('.banco-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.banco-card').forEach(c => {
                c.style.border = '1px solid #ddd';
                c.style.transform = 'scale(1)';
            });
            this.style.border = '2px solid #0d6efd';
            this.style.transform = 'scale(1.02)';
            bancoSeleccionado = this.dataset.banco;
            actualizarSelectorCuotas();
        });
    });

    function actualizarSelectorCuotas() {
        const banco = bancos.find(b => b.id === bancoSeleccionado);
        const maxCuotas = banco ? banco.cuotasMax : 1;
        const selector = document.getElementById('selectorCuotas');
        
        selector.innerHTML = '';
        for (let i = 1; i <= maxCuotas; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i === 1 ? '1 cuota (sin interés)' : `${i} cuotas sin interés`;
            selector.appendChild(option);
        }
        
        cuotasSeleccionadas = 1;
        actualizarValorCuota();
    }

    function actualizarValorCuota() {
        const cuotas = parseInt(document.getElementById('selectorCuotas').value);
        cuotasSeleccionadas = cuotas;
        const valorCuota = Math.round(total / cuotas);
        document.getElementById('valorCuotaInfo').textContent = 
            `Valor por cuota: ${formatearPrecioARS(valorCuota)} (${cuotas} cuotas)`;
    }

    document.getElementById('selectorCuotas')?.addEventListener('change', actualizarValorCuota);

    // ============================================
    // 7.3 CONFIRMAR COMPRA
    // ============================================
    document.getElementById('btnConfirmarCompra').addEventListener('click', async function() {
        const nombre = document.getElementById('nombreComprador').value.trim();
        const email = document.getElementById('emailComprador').value.trim();
        const dni = document.getElementById('dniComprador').value.trim();

        if (!nombre || !email || !dni) {
            alert('⚠️ Por favor, completá todos tus datos personales');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('⚠️ Ingresá un email válido');
            return;
        }

        if (dni.length < 7 || dni.length > 9) {
            alert('⚠️ Ingresá un DNI válido (7-9 dígitos)');
            return;
        }

        if (metodoSeleccionado === 'debito' || metodoSeleccionado === 'credito') {
            const numero = document.getElementById('numeroTarjeta').value.replace(/\s/g, '');
            const titular = document.getElementById('nombreTitular').value.trim();
            const fecha = document.getElementById('fechaVencimiento').value;
            const cvv = document.getElementById('cvvTarjeta').value;

            if (numero.length !== 16) {
                alert('⚠️ Ingresá un número de tarjeta válido (16 dígitos)');
                return;
            }

            if (!titular || titular.length < 3) {
                alert('⚠️ Ingresá el nombre del titular como figura en la tarjeta');
                return;
            }

            if (!fecha || fecha.length !== 5 || !fecha.includes('/')) {
                alert('⚠️ Ingresá una fecha de vencimiento válida (MM/AA)');
                return;
            }

            const [mes, anio] = fecha.split('/');
            if (parseInt(mes) < 1 || parseInt(mes) > 12) {
                alert('⚠️ Ingresá un mes válido (01-12)');
                return;
            }

            if (cvv.length < 3 || cvv.length > 4) {
                alert('⚠️ Ingresá un código de seguridad válido (3-4 dígitos)');
                return;
            }
        }

        const bancoSeleccionadoObj = bancos.find(b => b.id === bancoSeleccionado);
        const metodoObj = metodosPago.find(m => m.id === metodoSeleccionado);
        
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Procesando...';

        // Armamos el pedido para mandarlo al back-end (los datos de la tarjeta NO se mandan)
        const pedido = {
            nombre: nombre,
            email: email,
            dni: dni,
            metodoPago: metodoSeleccionado,
            cuotas: metodoSeleccionado === 'credito' ? cuotasSeleccionadas : 1,
            items: carrito.map(item => ({ id: item.id, cantidad: item.cantidad }))
        };

        try {
            const respuesta = await fetch(`${API_URL}/api/pedidos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });
            const datos = await respuesta.json();

            // Si el back-end rechaza el pedido (por ejemplo, sin stock) mostramos el motivo
            if (!respuesta.ok) {
                alert('⚠️ ' + (datos.error || 'No se pudo realizar la compra'));
                this.disabled = false;
                this.innerHTML = '<i class="bi bi-check-circle me-2"></i> Confirmar compra';
                return;
            }

            const nroPedido = 'ITU-' + String(datos.id).padStart(6, '0');
            const numeroTarjetaMostrar = document.getElementById('numeroTarjeta')?.value || '****';
            const ultimos4 = numeroTarjetaMostrar.slice(-4);
            
            const comprobante = `
                <div class="text-center p-4" style="animation: fadeIn 0.5s ease;">
                    <div style="font-size: 4rem;">✅</div>
                    <h3 class="fw-bold text-success">¡Compra exitosa!</h3>
                    <p><strong>Número de pedido:</strong> ${nroPedido}</p>
                    <div class="bg-light p-3 rounded text-start">
                        <p><strong>Cliente:</strong> ${nombre}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>DNI:</strong> ${dni}</p>
                        <p><strong>Método:</strong> ${metodoObj?.icon || ''} ${metodoObj?.nombre}</p>
                        ${(metodoSeleccionado === 'debito' || metodoSeleccionado === 'credito') ? `
                            <p><strong>Tarjeta:</strong> **** **** **** ${ultimos4}</p>
                            <p><strong>Titular:</strong> ${document.getElementById('nombreTitular')?.value || ''}</p>
                            <p><strong>Banco:</strong> ${bancoSeleccionadoObj?.icon} ${bancoSeleccionadoObj?.nombre}</p>
                        ` : ''}
                        ${metodoSeleccionado === 'credito' ? `<p><strong>Cuotas:</strong> ${cuotasSeleccionadas}x sin interés</p>` : ''}
                        <hr>
                        <p class="fw-bold">Total: ${formatearPrecioARS(datos.total)}</p>
                    </div>
                    <p class="text-muted mt-3">Tu pedido quedó registrado en nuestro sistema.</p>
                    <button class="btn btn-primary mt-2" onclick="location.reload()">
                        <i class="bi bi-house me-2"></i> Volver a la tienda
                    </button>
                </div>
            `;

            // Antes se usaba document.querySelector('.modal-body') y agarraba el del carrito.
            // Ahora buscamos dentro del modal de pago
            modalElement.querySelector('.modal-body').innerHTML = comprobante;
            modalElement.querySelector('.modal-footer').style.display = 'none';
            
            saveCarrito([]);
            actualizarBadgeCarrito();
            renderizarCarrito();
            cargarProductos(); // para que se vea el stock actualizado
        } catch (error) {
            console.error('Error al enviar el pedido:', error);
            alert('❌ No se pudo conectar con el servidor. Probá de nuevo.');
            this.disabled = false;
            this.innerHTML = '<i class="bi bi-check-circle me-2"></i> Confirmar compra';
        }
    });

    // Seleccionar primer banco por defecto
    document.querySelector('.banco-card')?.click();
    
    document.getElementById('datosTarjetaContainer').style.display = 'block';
}

// ============================================
// 8. INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    cargarProductos(); // los productos ahora se piden a la API
    actualizarBadgeCarrito();
    renderizarCarrito();

    // Modal del carrito
    const carritoBtn = document.getElementById('carritoBtn');
    const carritoModalEl = document.getElementById('carritoModal');
    let carritoModal = null;
    
    if (carritoModalEl) {
        carritoModal = new bootstrap.Modal(carritoModalEl);
    }

    if (carritoBtn && carritoModal) {
        carritoBtn.addEventListener('click', function() {
            renderizarCarrito();
            carritoModal.show();
        });
    }

    // Vaciar carrito
    document.getElementById('vaciarCarrito')?.addEventListener('click', function() {
        vaciarCarrito();
        renderizarCarrito();
    });

    // FORMULARIO DE CONTACTO
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (status) {
                status.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Enviando...</span></div>';
            }
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (status) {
                        status.innerHTML = '<div class="alert alert-success">✅ Mensaje enviado con éxito. Te responderemos pronto.</div>';
                    }
                    form.reset();
                } else {
                    if (status) {
                        status.innerHTML = '<div class="alert alert-danger">❌ Ocurrió un error. Intenta de nuevo.</div>';
                    }
                }
            } catch (error) {
                if (status) {
                    status.innerHTML = '<div class="alert alert-danger">❌ Error de conexión. Verifica tu internet.</div>';
                }
            }
        });
    }
});
