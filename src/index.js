// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', ordersRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal_server_error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Orders API listening on port ${PORT}`);
});

module.exports = app;
