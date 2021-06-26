import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectBoards,
  selectActiveBoard,
  setActiveBoard,
  addBoard,
} from './boardsSlice';
import { selectActiveLists } from '../lists/listsSlice';

import List from '../lists/List';
import AddNewList from '../lists/AddNewList';

export default function Board() {
  const [lists, setLists] = useState();

  const boards = useSelector(selectBoards);
  const activeBoard = useSelector(selectActiveBoard);
  const activeLists = useSelector(selectActiveLists);

  const dispatch = useDispatch();

  useEffect(() => {
    setLists(activeLists);
  }, [activeBoard]);

  useEffect(() => {
    setLists(activeLists);
  }, [activeLists]);

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
    console.log(e.target.innerHTML);
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;

    const listCopy = [...activeLists];

    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setLists(listCopy);
  };

  useEffect(() => {
    console.log(lists);
  }, [lists]);

  /* 
  const handleDragEnd = (e) => {
    //
    const listCopy = [...activeLists];

    console.log(listCopy);

    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    dragOverItem.current = null;
    setLists(listCopy);
  }; */

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h4>Active Board {activeBoard}</h4>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {boards.map((board) => {
          return (
            <div
              key={board.bid}
              style={{
                border: 'solid 1px red',
                width: '100px',
                height: '50px',
                margin: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => dispatch(setActiveBoard(board.bid))}
            >
              {board.name}
            </div>
          );
        })}

        <div
          style={{
            border: 'solid 1px red',
            width: '100px',
            height: '50px',
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => dispatch(addBoard())}
        >
          Add Board
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {lists?.map((list, index) => {
          return (
            <List
              index={index}
              dragItem={draggingItem}
              dragOverItem={dragOverItem}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              key={list.lid + index}
              lid={list.lid}
              name={list.name}
              des={list.des}
            />
          );
        })}
        <AddNewList />
      </div>
    </div>
  );
}
