import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartProduct } from './cartSlice';

function handleDelete(e) {
  console.log(e);
  const dispatch = useDispatch();
  dispatch(deleteCartProduct());
}

const DeleteBtn = () => {
  return (
    <button className={`delete-button`} onClick={handleDelete}>
      X
    </button>
  );
};

export default DeleteBtn;
