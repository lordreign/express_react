const express = require('express');
const { body } = require('express-validator');
const errorUtil = require('../util/errorUtil');
const controller = require('../controllers/boards');

const router = express.Router();

/* GET users listing. */
router.get('/', errorUtil.safeErrorHandler(controller.index))
  .get('/:id', errorUtil.safeErrorHandler(controller.show))
  .post(
    '/',
    body('title').not().isEmpty().trim()
      .escape(),
    body('content').not().isEmpty().trim()
      .escape(),
    errorUtil.safeErrorHandler(controller.create),
  )
  .put(
    '/:id',
    body('title').not().isEmpty().trim()
      .escape(),
    body('content').not().isEmpty().trim()
      .escape(),
    errorUtil.safeErrorHandler(controller.update),
  )
  .delete('/:id', errorUtil.safeErrorHandler(controller.delete));

module.exports = router;
