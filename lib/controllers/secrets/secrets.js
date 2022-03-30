const { Router } = require('express');
const Secret = require('../../models/Secret/Secret');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const secret = await Secret.insert(req.body);
      res.json(secret);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const secrets = await Secret.getAll();
      res.send(secrets);
    } catch (error) {
      next(error);
    }
  });
