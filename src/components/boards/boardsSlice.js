import { createSlice, createSelector } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
uuidv4();

const initialState = {
  activeBoard: 1,
  boards: [
    { bid: 1, id: 1, name: 'Board 1' },
    { bid: 2, id: 2, name: 'Board 2' },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,

  reducers: {
    addBoard: (state) => {
      const lastIndex = state.boards.length - 1;
      const lastId = state.boards[lastIndex].id;

      state.boards.push({
        bid: uuidv4(),
        id: lastId + 1,
        name: `Board ${lastId + 1}`,
      });
    },
    setActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
      //
    },

    editBoardTitle: (state, action) => {
      const boardIndex = state.boards.findIndex(
        (board) => board.bid === action.payload.id
      );

      state.boards[boardIndex] = {
        ...state.cards[boardIndex],
        name: action.payload.text,
      };
    },
  },
});

export const { addBoard, setActiveBoard, editBoardTitle } = boardsSlice.actions;

export const selectBoards = (state) => state.boards.boards;
export const selectActiveBoard = (state) => state.boards.activeBoard;

export default boardsSlice.reducer;
