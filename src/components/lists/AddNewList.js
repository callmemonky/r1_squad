import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addList } from './listsSlice';
import { selectActiveBoard } from '../boards/boardsSlice';

export default function AddNewList(props) {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);

  return (
    <div
      style={{
        border: 'solid 1px green',
        width: '200px',
        height: '300px',
        margin: '5px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          margin: '5px 0px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => dispatch(addList(activeBoard))}
      >
        Add
      </div>
    </div>
  );
}
