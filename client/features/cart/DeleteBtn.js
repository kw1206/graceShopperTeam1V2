import React from 'react';
import { useDispatch } from 'react-redux';

function handleDelete(e) {
  console.log(e.target);
  const dispatch = useDispatch();
  dispatch(deleteCampus(prop.key));
}

const DeleteBtn = () => {
  return (
    <button className={`delete-button`} onClick={handleDelete}>
      X
    </button>
  );
};

export default DeleteBtn;
