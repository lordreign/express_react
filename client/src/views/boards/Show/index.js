import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useBoardsAction from '../../../stores/views/boards/action';
import { boardAtom } from '../../../stores/views/boards/atom';

export default function Show() {
  const board = useRecoilValue(boardAtom);
  const boardsAction = useBoardsAction();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    boardsAction.getBoard({ id });
    return boardsAction.resetBoard;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onClickDelete() {
    // eslint-disable-next-line no-alert
    const result = window.confirm('삭제??????');
    if (result) {
      const json = await boardsAction.deleteBoard({ id });
      if (json.result === 'success') {
        navigate('/boards');
      } else {
        // eslint-disable-next-line no-alert
        window.alert('에러 발생');
      }
    }
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <td>{board?.id}</td>
          </tr>
          <tr>
            <th>title</th>
            <td>{board?.title}</td>
          </tr>
          <tr>
            <th>content</th>
            <td>{board?.content}</td>
          </tr>
        </tbody>
      </table>
      <Link to="/boards">목록으로</Link>
      <Link to={`/boards/${id}/edit`}>수정</Link>
      <button onClick={onClickDelete}>삭제</button>
    </>
  );
}
