const express = require('express');
const { getCategories, getMenuItems } = require('../controllers/menuController');

const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getMenuItems);

module.exports = router;
