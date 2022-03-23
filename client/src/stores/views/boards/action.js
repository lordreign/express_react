import { useSetRecoilState, useResetRecoilState } from 'recoil';
import axios from '../../../plugins/axios';
import { boardsAtom, boardAtom } from './atom';

function useBoardsAction() {
  const setBoards = useSetRecoilState(boardsAtom);
  const setBoard = useSetRecoilState(boardAtom);

  async function getBoards({ page = 1, pageSize = 10, sort = 'id', sortDesc = 'true' }) {
    const res = await axios.instance({
      method: 'GET',
      url: '/api/v1/boards',
      params: {
        page,
        pageSize,
        sort,
        sortDesc,
      },
      data: {},
    });

    const { data: { boards } } = res.data;
    setBoards(boards);
  }

  async function getBoard({ id }) {
    const res = await axios.instance({
      method: 'GET',
      url: `/api/v1/boards/${id}`,
    });

    const { data: { board } } = res.data;
    setBoard(board);
  }

  async function createBoard({ title, content }) {
    const res = await axios.instance({
      method: 'POST',
      url: '/api/v1/boards',
      data: {
        title,
        content,
      },
    });

    return res.data;
  }

  async function updateBoard({ id, title, content }) {
    const res = await axios.instance({
      method: 'PUT',
      url: `/api/v1/boards/${id}`,
      data: {
        id,
        title,
        content,
      },
    });

    return res.data;
  }

  async function deleteBoard({ id }) {
    const res = await axios.instance({
      method: 'DELETE',
      url: `/api/v1/boards/${id}`,
    });

    return res.data;
  }

  return {
    getBoards,
    getBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    resetBoards: useResetRecoilState(boardsAtom),
    resetBoard: useResetRecoilState(boardAtom),
  };
}

export default useBoardsAction;
