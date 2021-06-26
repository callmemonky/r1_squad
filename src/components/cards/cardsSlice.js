import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';

import { v4 as uuidv4 } from 'uuid';
import { selectActiveBoard } from '../boards/boardsSlice';

uuidv4();

const initialState = {
  cards: [
    {
      cid: 1,
      id: 1,
      name: 'Card 1',
      lid: 1, //list id
      text: 'Add Description',
    },
    { cid: 2, id: 2, name: 'Card 2', lid: 1, text: 'Card 2' },
    { cid: 3, id: 1, name: 'Card 1', lid: 2, text: 'Card 1' },
    { cid: 4, id: 2, name: 'Card 2', lid: 2, text: 'Card 2' },
    { cid: 5, id: 1, name: 'Card 1', lid: 3, text: 'Card 1' },
    { cid: 6, id: 2, name: 'Card 2', lid: 3, text: 'Card 2' },
  ],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,

  reducers: {
    addCard: (state, action) => {
      let activeListId = action.payload;

      let filtered = state.cards.filter(
        (element) => element.lid === activeListId
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

      state.cards.push({
        cid: uuidv4(),
        id: maxValue + 1,
        name: `Card ${maxValue + 1}`,
        lid: activeListId,
      });
    },
    removeCard: (state) => {
      state.value -= 1;
    },
    editCardTitle: (state, action) => {
      const cardIndex = state.cards.findIndex(
        (card) => card.bid === action.payload.id
      );

      state.cards[cardIndex] = {
        ...state.cards[cardIndex],
        name: action.payload.text,
      };
    },
  },
});

export const { addCard, removeCard } = cardsSlice.actions;

export const selectAllCards = (state) => state.cards.cards;

export default cardsSlice.reducer;
