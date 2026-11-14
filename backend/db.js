// Conexion a la base de datos PostgreSQL (la base la creamos en Railway)
const { Pool } = require('pg')
const productosIniciales = require('./productos')

// La URL de conexion la toma de la variable de entorno DATABASE_URL
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Crea las tablas si no existen y carga los productos si la tabla esta vacia
async function iniciarDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      categoria TEXT,
      precio INTEGER NOT NULL,
      precio_anterior INTEGER,
      cuotas INTEGER DEFAULT 1,
      envio_gratis BOOLEAN DEFAULT true,
      stock INTEGER DEFAULT 0,
      imagen TEXT,
      descripcion TEXT
    )
  `)

  // En pedidos guardamos el detalle de lo comprado como JSON para no hacer otra tabla
  // (ojo: los datos de la tarjeta NO se guardan)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      dni TEXT NOT NULL,
      metodo_pago TEXT,
      cuotas INTEGER DEFAULT 1,
      total INTEGER NOT NULL,
      detalle JSONB,
      fecha TIMESTAMP DEFAULT NOW()
    )
  `)

  const resultado = await pool.query('SELECT COUNT(*) FROM productos')
  if (Number(resultado.rows[0].count) === 0) {
    for (const p of productosIniciales) {
      await pool.query(
        `INSERT INTO productos (nombre, categoria, precio, precio_anterior, cuotas, stock, imagen, descripcion)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [p.nombre, p.categoria, p.precio, p.precio_anterior, p.cuotas, p.stock, p.imagen, p.descripcion]
      )
    }
    console.log('Se cargaron', productosIniciales.length, 'productos en la base')
  }
}

module.exports = { pool, iniciarDB }
