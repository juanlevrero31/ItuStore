// Back-end de ItuStore: API hecha con Node + Express
const express = require('express')
const cors = require('cors')
const { pool, iniciarDB } = require('./db')

const app = express()
const PORT = process.env.PORT || 3000 // Railway nos da el puerto en PORT

app.use(cors()) // para que el front (Vercel/Netlify) pueda pedirle datos a la API
app.use(express.json()) // para poder leer el body en formato JSON

// Ruta de prueba para ver si el servidor esta andando
app.get('/', (req, res) => {
  res.send('API de ItuStore funcionando')
})

// Devuelve todos los productos
app.get('/api/productos', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM productos ORDER BY id')
  res.json(resultado.rows)
})

// Devuelve un solo producto por su id
app.get('/api/productos/:id', async (req, res) => {
  const resultado = await pool.query('SELECT * FROM productos WHERE id = $1', [req.params.id])
  if (resultado.rows.length === 0) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }
  res.json(resultado.rows[0])
})

// Guarda un pedido y descuenta el stock de los productos comprados
app.post('/api/pedidos', async (req, res) => {
  const { nombre, email, dni, metodoPago, cuotas, items } = req.body

  if (!nombre || !email || !dni || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Faltan datos del pedido' })
  }

  // Usamos una transaccion: si falla un producto no se guarda nada
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    let total = 0
    const detalle = []

    for (const item of items) {
      const cantidad = parseInt(item.cantidad)
      if (!(cantidad > 0)) throw new Error('Cantidad invalida')

      // Solo descuenta si hay stock suficiente. El precio lo sacamos de la base, no del front
      const resultado = await client.query(
        'UPDATE productos SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING nombre, precio',
        [cantidad, item.id]
      )
      if (resultado.rows.length === 0) {
        throw new Error('No hay stock suficiente de uno de los productos')
      }

      const producto = resultado.rows[0]
      total += producto.precio * cantidad
      detalle.push({ id: item.id, nombre: producto.nombre, precio: producto.precio, cantidad })
    }

    const pedido = await client.query(
      `INSERT INTO pedidos (nombre, email, dni, metodo_pago, cuotas, total, detalle)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, fecha`,
      [nombre, email, dni, metodoPago, cuotas || 1, total, JSON.stringify(detalle)]
    )

    await client.query('COMMIT')
    res.status(201).json({ id: pedido.rows[0].id, fecha: pedido.rows[0].fecha, total })
  } catch (error) {
    await client.query('ROLLBACK')
    res.status(400).json({ error: error.message })
  } finally {
    client.release()
  }
})

// Si algo falla (por ejemplo la base) devolvemos error 500
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Error en el servidor' })
})

// Primero preparamos la base y despues levantamos el servidor
iniciarDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor andando en el puerto ${PORT}`))
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err.message)
    process.exit(1)
  })
