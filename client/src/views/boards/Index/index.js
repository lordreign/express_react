import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
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
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
