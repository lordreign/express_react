const express = require('express');
const errorUtil = require('../util/errorUtil');
const controller = require('../controllers/boards');

const router = express.Router();

/* GET users listing. */
router.get('/', errorUtil.safeErrorHandler(controller.index))
  .get('/:id', errorUtil.safeErrorHandler(controller.show))
  .post('/', errorUtil.safeErrorHandler(controller.create))
  .put('/:id', errorUtil.safeErrorHandler(controller.update))
  .delete('/:id', errorUtil.safeErrorHandler(controller.delete));

module.exports = router;
