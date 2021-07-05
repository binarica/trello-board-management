import { useCallback, useContext, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';

import ListContext from '../../context/ListContext';
import AddAttachment from '../AddAttachment/AddAttachment';

const Card = () => {
  const { push } = useHistory();
  const { lists, setLists } = useContext(ListContext);
  const { cardId } = useParams<{ cardId: string }>();

  const getCurrentCard = (listsObj: ListType[], idCard: string) =>
    listsObj.flatMap((list) => list.cards).find(({ id }) => idCard === id);

  const card = getCurrentCard(lists, cardId);

  const [numAttachments, setNumAttachments] = useState(card?.badges?.attachments || 0);

  const updateCard = useCallback(() => {
    setNumAttachments(numAttachments + 1);
    const updatedLists = [...lists];
    getCurrentCard(updatedLists, cardId)!.badges!.attachments++;
    setLists(() => updatedLists, []);
  }, [cardId, lists, numAttachments, setLists]);

  return (
    <>
      {card ? (
        <>
          <button
            className="back-button"
            onClick={() => {
              push(`/lists/${card?.idList}`);
            }}
          >
            Go Back
          </button>
          <div className="card">
            <h2>{card.name}</h2>
            <p>{card.desc}</p>
            <p style={{ float: 'right' }}>{numAttachments > 0 && '📎 ' + numAttachments}</p>
          </div>
          <AddAttachment updateAttachmentCount={updateCard} idCard={card.id} />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Card;
