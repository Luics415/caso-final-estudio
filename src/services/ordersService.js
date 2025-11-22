// src/services/ordersService.js
// Servicio simple en memoria - se puede reemplazar por PostgreSQL (pg) en infra.
// Implementación ligera para pruebas unitarias y de integración.

const { v4: uuidv4 } = require('uuid');

let ORDERS = []; // En memoria; persistencia temporal

async function createOrder(payload) {
  const order = {
    id: uuidv4(),
    customer: payload.customer || 'anonymous',
    items: payload.items || [],
    total: payload.total || 0,
    status: 'created',
    createdAt: new Date().toISOString()
  };
  ORDERS.push(order);
  return order;
}

async function listOrders({ page = 1, limit = 20 }) {
  const start = (page - 1) * limit;
  const end = start + parseInt(limit, 10);
  return {
    page,
    limit,
    total: ORDERS.length,
    items: ORDERS.slice(start, end)
  };
}

async function getOrder(id) {
  return ORDERS.find(o => o.id === id) || null;
}

async function updateOrder(id, patch) {
  const idx = ORDERS.findIndex(o => o.id === id);
  if (idx === -1) throw new Error('NotFound');
  ORDERS[idx] = { ...ORDERS[idx], ...patch, updatedAt: new Date().toISOString() };
  return ORDERS[idx];
}

async function deleteOrder(id) {
  ORDERS = ORDERS.filter(o => o.id !== id);
  return;
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
  deleteOrder
};
