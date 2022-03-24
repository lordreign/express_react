import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import useBoardsAction from '../../../stores/views/boards/action';
import { boardsAtom } from '../../../stores/views/boards/atom';

export default function Index() {
  const boards = useRecoilValue(boardsAtom);
  const boardsAction = useBoardsAction();

  useEffect(() => {
    boardsAction.getBoards({});
    return boardsAction.resetBoards;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>content</th>
          </tr>
        </thead>
        <tbody>
          {boards?.map((board) => (
            <tr key={board.id}>
              <td><Link to={`/boards/${board.id}`}>{board.id}</Link></td>
              <td><Link to={`/boards/${board.id}`}>{board.title}</Link></td>
              <td><Link to={`/boards/${board.id}`}>{board.content}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/boards/new">등록</Link>
    </>
  );
}
