import { configureStore } from '@reduxjs/toolkit';
import boardsReducer from '../components/boards/boardsSlice';
import cardsReducer from '../components/cards/cardsSlice';
import listsReducer from '../components/lists/listsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
    lists: listsReducer,
  },
});
