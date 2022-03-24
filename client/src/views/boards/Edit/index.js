import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { boardAtom } from '../../../stores/views/boards/atom';
import useBoardsAction from '../../../stores/views/boards/action';

export default function Edit() {
  const board = useRecoilValue(boardAtom);
  const boardsAction = useBoardsAction();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    boardsAction.getBoard({ id });
    return boardsAction.resetBoard;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('title 적어라'),
    content: Yup.string()
      .required('content 적어라'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  async function onSubmit(data) {
    const json = await boardsAction.updateBoard({ id, title: data.title, content: data.content });
    if (json.result === 'success') {
      navigate(`/boards/${id}`);
    } else {
      // eslint-disable-next-line no-alert
      window.alert('에러 발생');
    }
  }

  const loading = !board;
  return (
    <>
      {!loading
        && <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>id</label>
            <input value={id} readOnly />
          </div>
          <div>
            <label>title</label>
            <input name="title" type="text" {...register('title')} defaultValue={board.title} />
            <div>error message: {errors.title?.message}</div>
          </div>
          <div>
            <label>content</label>
            <textarea name="content" {...register('content')} defaultValue={board.content}></textarea>
            <div>error message: {errors.content?.message}</div>
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Save{isSubmitting && <span>(입력좀 부탁)</span>}
            </button>
            <Link to={`/boards/${id}`}>뒤로가기</Link>
          </div>
        </form>
      }
      {loading && <div>board 불러오는중이다</div>}
    </>
  );
}
