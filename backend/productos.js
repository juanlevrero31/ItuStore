// Productos que se cargan en la base de datos la primera vez que arranca el servidor
// (antes estaban escritos a mano en el main.js del front)
module.exports = [
  // Laptops
  { nombre: 'Laptop ASUS ROG Zephyrus G14', categoria: 'Laptops', precio: 1899900, precio_anterior: 2199900, cuotas: 12, stock: 5,
    imagen: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop', descripcion: 'Ryzen 9, RTX 4060, 16GB RAM, 1TB SSD' },
  { nombre: 'MacBook Air M3', categoria: 'Laptops', precio: 2299900, precio_anterior: 2599900, cuotas: 12, stock: 3,
    imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop', descripcion: 'Chip M3, 8GB RAM, 256GB SSD, 13.6 pulgadas' },
  { nombre: 'Laptop HP Pavilion 15', categoria: 'Laptops', precio: 1499900, precio_anterior: 1699900, cuotas: 12, stock: 8,
    imagen: 'https://mx-media.hptiendaenlinea.com/catalog/product/3/0/308Z3LA-1_T1679638785.png', descripcion: 'Intel i5, 16GB RAM, 512GB SSD, 15.6 pulgadas' },

  // Monitores
  { nombre: 'Monitor Samsung Odyssey G5', categoria: 'Monitores', precio: 749900, precio_anterior: 899900, cuotas: 6, stock: 10,
    imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop', descripcion: '27 pulgadas 144Hz QHD, 1ms, FreeSync' },
  { nombre: 'Monitor LG UltraGear 27GP850', categoria: 'Monitores', precio: 849900, precio_anterior: 999900, cuotas: 6, stock: 6,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTM9e3F8QUsz5ZJVU5kwdh__v1c2M-F35aWr_TRWr0AwgH4wDy9nBGPdc&s=100', descripcion: '27 pulgadas Nano IPS, 165Hz, HDR10' },

  // Teclados
  { nombre: 'Teclado Mecánico Logitech G Pro', categoria: 'Teclados', precio: 299900, precio_anterior: 349900, cuotas: 3, stock: 15,
    imagen: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', descripcion: 'Switches GX Blue, RGB, TKL' },
  { nombre: 'Teclado Redragon Kumara K552', categoria: 'Teclados', precio: 149900, precio_anterior: 189900, cuotas: 3, stock: 20,
    imagen: 'https://gorilagames.com/img/Public/1019-producto-redragon-kumara-white-8194.jpg', descripcion: 'Switches Outemu Blue, RGB, 60%' },

  // Mouses
  { nombre: 'Mouse Logitech G502 Hero', categoria: 'Ratones', precio: 189900, precio_anterior: 229900, cuotas: 3, stock: 12,
    imagen: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop', descripcion: '25K DPI, 11 botones, RGB' },
  { nombre: 'Mouse Razer DeathAdder V3', categoria: 'Ratones', precio: 169900, precio_anterior: 199900, cuotas: 3, stock: 10,
    imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop', descripcion: '30K DPI, 59g, 8K Hz' },

  // Auriculares
  { nombre: 'Auriculares HyperX Cloud II', categoria: 'Auriculares', precio: 209900, precio_anterior: 249900, cuotas: 6, stock: 8,
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', descripcion: '7.1 Surround, USB, Memory Foam' },
  { nombre: 'Auriculares Sony WH-1000XM5', categoria: 'Auriculares', precio: 849900, precio_anterior: 999900, cuotas: 12, stock: 4,
    imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop', descripcion: 'ANC, 30h batería, LDAC' },

  // Almacenamiento
  { nombre: 'SSD Samsung 990 PRO 1TB', categoria: 'Almacenamiento', precio: 279900, precio_anterior: 329900, cuotas: 6, stock: 7,
    imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', descripcion: 'NVMe M.2, 7450 MB/s lectura' },
  { nombre: 'SSD WD Black SN850X 2TB', categoria: 'Almacenamiento', precio: 429900, precio_anterior: 499900, cuotas: 6, stock: 5,
    imagen: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop', descripcion: 'NVMe M.2, 7300 MB/s lectura' },

  // Memorias RAM
  { nombre: 'RAM Corsair Vengeance 32GB DDR5', categoria: 'Memorias', precio: 359900, precio_anterior: 419900, cuotas: 6, stock: 9,
    imagen: 'https://assets.corsair.com/image/upload/c_pad,q_85,h_1100,w_1100,f_auto/products/Memory/vengeance-rgb-ddr5-config/white/2up/Vengeance-RGB-DDR5-2UP-64GB-WHITE_01.webp', descripcion: '6000MHz, RGB, CL30' },
  { nombre: 'RAM Kingston Fury Beast 16GB DDR4', categoria: 'Memorias', precio: 189900, precio_anterior: 229900, cuotas: 3, stock: 11,
    imagen: 'https://statics.qloud.com.ar/clan-co-10-2020/179_28-07-2022-01-07-18-3.jpg', descripcion: '3200MHz, RGB, CL16' }
]
