import { createSlice, createSelector } from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
import { selectActiveBoard } from '../boards/boardsSlice';

uuidv4();

const initialState = {
  lists: [
    {
      lid: 1,
      id: 1,
      name: 'List 1',
      bid: 1,
      des: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, in?',
    },
    { lid: 2, id: 2, name: 'List 2', bid: 1, des: 'Random text' },
    {
      lid: 3,
      id: 3,
      name: 'List 3',
      bid: 1,
      des: 'Random text',
    },
  ],
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,

  reducers: {
    addList: (state, action) => {
      let activeBoardId = action.payload;

      let filtered = state.lists.filter(
        (element) => element.bid === activeBoardId
      );

      const loopforMinMax = () => {
        let max = filtered[0] ? filtered[0].id : 0;

        for (let i = 1; i < filtered.length; i++) {
          let value = filtered[i].id;
          max = value > max ? value : max;
        }

        return max;
      };

      let maxValue = loopforMinMax();

      state.lists.push({
        lid: uuidv4(),
        id: maxValue + 1,
        name: `List ${maxValue + 1}`,
        bid: activeBoardId,
      });
    },
    removeList: (state) => {
      state.value -= 1;
    },

    editListTitle: (state, action) => {
      const cardIndex = state.lists.findIndex(
        (card) => card.lid === action.payload.id
      );

      state.cards[cardIndex] = {
        ...state.cards[cardIndex],
        name: action.payload.text,
      };
    },

    addCard: (state, action) => {
      const cardIndex = state.lists.findIndex(
        (card) => card.cid === action.payload.id
      );

      state.cards[cardIndex].tasks.push({
        tid: uuidv4(),
        cid: state.cards[cardIndex].cid,
      });
    },
  },
});

export const { addList, removeList, editListTitle, addCard } =
  listsSlice.actions;

export const selectAllList = (state) => state.lists.lists;

export const selectActiveLists = createSelector(
  selectAllList,
  selectActiveBoard,
  (lists, activeId) => lists.filter((l) => l.bid === activeId)
);

export default listsSlice.reducer;
