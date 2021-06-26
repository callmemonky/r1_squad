import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllCards, addCard } from '../cards/cardsSlice';

export default function List(props) {
  const [cards, setCards] = useState();

  const activeCards = useSelector(selectAllCards);
  const dispatch = useDispatch();

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const filteredCards = activeCards.filter((a) => a.lid === props.lid);

  useEffect(() => {
    setCards(filteredCards);
  }, []);

  useEffect(() => {
    setCards(filteredCards);
  }, [activeCards]);

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;

    const cardslistCopy = [...filteredCards];

    const draggingItemContent = cardslistCopy[draggingItem.current];
    cardslistCopy.splice(draggingItem.current, 1);
    cardslistCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    setCards(cardslistCopy);
  };

  /* 
  const handleDragEnd = (e) => {
    //
    const cardslistCopy = [...filteredCards];

    console.log(cardslistCopy);

    const draggingItemContent = cardslistCopy[draggingItem.current];
    cardslistCopy.splice(draggingItem.current, 1);
    cardslistCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    dragOverItem.current = null;
    setCards(cardslistCopy);
  }; */

  return (
    <div
      draggable
      onDragStart={(e) => props.handleDragStart(e, props.index)}
      onDragEnter={(e) => props.handleDragEnter(e, props.index)}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: 'solid 1px green',
        width: '200px',
        height: '300px',
        margin: '5px',
        cursor: 'pointer',
      }}
    >
      <h4>{props.name}</h4>
      <h5>{props.des}</h5>

      <div
        style={{
          margin: '5px 0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {cards?.map((c, index) => {
          return (
            <div
              key={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragOver={(e) => e.preventDefault()}
              draggable
              style={{
                border: 'solid 1px green',
                margin: '5px 0px',
                padding: '10px 0px',
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {c.name}
            </div>
          );
        })}
      </div>

      <div
        style={{
          border: 'solid 1px green',
          margin: '5px 0px',
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => dispatch(addCard(props.lid))}
      >
        Add Card
      </div>
    </div>
  );
}
