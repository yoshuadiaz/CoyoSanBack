const express = require('express');
const Router = express.Router();

Router.get('/', async function (request, response) {
  try {
    const result = await db.Sensei_type.findAll();
    response.json(result);
  } catch (e) {
    response.status(400).json({
      error: 'Error al consultar todos los tipos de sensei'
    });
  }
});

module.exports = Router;