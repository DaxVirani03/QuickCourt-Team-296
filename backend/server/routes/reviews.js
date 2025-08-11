const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, route: 'reviews' });
});

module.exports = router; 