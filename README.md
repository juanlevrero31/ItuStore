# ItuStore 🛒

Tienda online de productos de computación. Proyecto final de **Desarrollo de Sistemas Web 2026**.

El proyecto tiene dos partes:

- **Front-End** (`frontend/`): HTML, CSS, JavaScript y Bootstrap 5. Muestra el catálogo, el carrito y el proceso de compra.
- **Back-End** (`backend/`): API hecha con Node.js + Express conectada a una base de datos PostgreSQL. Guarda los productos y los pedidos.

## Funcionalidades

- Catálogo de productos que se trae desde la base de datos.
- Descuentos, cuotas, envío gratis y stock de cada producto.
- Carrito guardado en el navegador (LocalStorage).
- Compra con selección de método de pago, banco y cuotas.
- Al confirmar la compra el pedido se guarda en la base y se descuenta el stock.
- Formulario de contacto con Formspree.
- Diseño adaptable a celulares.

## Estructura

```
ItuStore/
├── frontend/          -> se sube a Vercel o Netlify
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
└── backend/           -> se sube a Railway
    ├── server.js      (rutas de la API)
    ├── db.js          (conexión y creación de tablas)
    ├── productos.js   (productos que se cargan la primera vez)
    └── package.json
```

## API

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/productos/:id` | Devuelve un producto |
| POST | `/api/pedidos` | Guarda un pedido y descuenta stock |

Ejemplo de body para `POST /api/pedidos`:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@mail.com",
  "dni": "40111222",
  "metodoPago": "credito",
  "cuotas": 6,
  "items": [{ "id": 1, "cantidad": 2 }]
}
```

Las tablas (`productos` y `pedidos`) se crean solas cuando arranca el servidor, y si la tabla de productos está vacía se cargan los 15 productos de `productos.js`. Los datos de la tarjeta no se guardan.

## Cómo ejecutarlo en la compu

**Back-End**

1. Entrar a la carpeta: `cd backend`
2. Instalar dependencias: `npm install`
3. Copiar `.env.example` como `.env` y poner la URL de la base de datos (en Railway está en el servicio Postgres > Variables > `DATABASE_PUBLIC_URL`).
4. Levantar el servidor: `npm run dev` (queda en http://localhost:3000)

**Front-End**

Abrir `frontend/index.html` con **Live Server** de VS Code. Cuando la página corre en `localhost` o `127.0.0.1` usa la API local; si no, usa la de Railway.

## Deploy

**Back-End en Railway**

1. En Railway: *New Project* > *Deploy from GitHub repo* y elegir este repositorio.
2. En el servicio, ir a *Settings* > *Root Directory* y poner `/backend`.
3. En el proyecto agregar una base de datos: *Create* > *Database* > *PostgreSQL*.
4. En el servicio del back, en *Variables*, agregar `DATABASE_URL` con el valor `${{Postgres.DATABASE_URL}}`.
5. En *Settings* > *Networking* tocar *Generate Domain*. Esa es la URL de la API.

**Front-End en Vercel**

1. Poner la URL de Railway en la constante `API_URL` al principio de `frontend/js/main.js` y subir el cambio a GitHub.
2. En Vercel: *Add New* > *Project*, importar el repositorio.
3. En *Root Directory* elegir `frontend` y en *Framework Preset* dejar *Other*. Deploy.

(En Netlify es igual: importar el repo y poner `frontend` como *Base directory*, sin comando de build.)

## Repositorio

[juanlevrero31/ItuStore](https://github.com/juanlevrero31/ItuStore)
