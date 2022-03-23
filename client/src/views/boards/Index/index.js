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
          <tr>
            <td>{board.id}</td>
            <td>{board.title}</td>
            <td>{board.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
