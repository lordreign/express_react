import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useBoardsAction from '../../../stores/views/boards/action';

export default function New() {
  const boardsAction = useBoardsAction();
  const navigate = useNavigate();

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
    const json = await boardsAction.createBoard({ title: data.title, content: data.content });
    if (json.result === 'success') {
      navigate(`/boards/${json.data.board.id}`);
    } else {
      // eslint-disable-next-line no-alert
      window.alert('에러 발생');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>title</label>
          <input name="title" type="text" {...register('title')} />
          <div>error message: {errors.title?.message}</div>
        </div>
        <div>
          <label>content</label>
          <textarea name="content" {...register('content')}></textarea>
          <div>error message: {errors.content?.message}</div>
        </div>
        <div>
          <button type="submit" disabled={isSubmitting}>
              Save{isSubmitting && <span>(입력좀 부탁)</span>}
          </button>
          <Link to="/boards">목록으로</Link>
        </div>
      </form>
    </>
  );
}
