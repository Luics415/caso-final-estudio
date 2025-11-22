// src/routes/orders.js
const express = require('express');
const router = express.Router();
const ordersService = require('../services/ordersService');

// Crear orden
router.post('/orders', async (req, res, next) => {
  try {
    const order = await ordersService.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
});

// Obtener todas las órdenes (con paginación simple)
router.get('/orders', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const data = await ordersService.listOrders({ page, limit });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Obtener orden por id
router.get('/orders/:id', async (req, res, next) => {
  try {
    const order = await ordersService.getOrder(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Actualizar orden
router.put('/orders/:id', async (req, res, next) => {
  try {
    const updated = await ordersService.updateOrder(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Eliminar orden
router.delete('/orders/:id', async (req, res, next) => {
  try {
    await ordersService.deleteOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
