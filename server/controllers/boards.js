const { validationResult } = require('express-validator');
const logger = require('../config/winston');
const boardService = require('../services/boards');
const respUtil = require('../util/respUtil');

// 목록 조회
exports.index = async (req, res) => {
  const { title, page, pageSize, sort, sortDesc } = req.query;

  try {
    const boards = await boardService.getItemList({
      title,
      page: page ? parseInt(page, 10) : null,
      pageSize: pageSize ? parseInt(pageSize, 10) : null,
      sort,
      sortDesc,
    });
    res.json(respUtil.makeResponse({
      success: true,
      data: {
        boards,
      },
    }));
  } catch (e) { // 예시
    logger.error(`error 발생: ${e}`);
    res.json(respUtil.makeResponse({
      success: false,
      message: '서버 에러 발생',
    }));
  }
};

// 상세
exports.show = async (req, res) => {
  const { id } = req.params;
  const board = await boardService.getItem({ id });
  res.json(respUtil.makeResponse({
    success: true,
    data: {
      board,
    },
  }));
};

// 생성
exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(respUtil.makeResponse({ success: false, message: '필수 항목 존재 안함' }));
  }

  const { title, content } = req.body;
  const result = await boardService.create({ title, content });
  res.json(respUtil.makeResponse(result));
};

// 수정
exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(respUtil.makeResponse({ success: false, message: '필수 항목 존재 안함' }));
  }

  const { id: boardId } = req.params;
  const { id, title, content } = req.body;
  if (boardId === id.toString()) {
    const result = await boardService.update({ id, title, content });
    res.json(respUtil.makeResponse(result));
  } else {
    res.json(respUtil.makeResponse({ success: false, message: '값좀 잘확인하고 보내삼' }));
  }
};

// 삭제
exports.delete = async (req, res) => {
  const { id } = req.params;
  const result = await boardService.delete({ id });
  res.json(respUtil.makeResponse(result));
};
