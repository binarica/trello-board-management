import { useCallback, useContext, useMemo } from 'react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';

import ListContext from '../../context/ListContext';
import CreateCard from '../CreateCard/CreateCard';

import './ListView.css';

const MAX_NAME_CHARS = 20;

const ListView = () => {
  const { push } = useHistory();
  const { lists, setLists } = useContext(ListContext);
  const { listId } = useParams<{ listId: string }>();

  const list = useMemo(() => lists.find(({ id }) => listId === id), [listId, lists]);

  const updateList = useCallback(
    (card: CardType) => {
      const newList = { ...list, cards: [...list!.cards, card] };
      setLists(() => [...lists.filter(({ id }) => newList.id !== id), newList], []);
    },
    [list, lists, setLists]
  );

  const limitChars = (str: string) => {
    const res = str.trim();
    return res.length > MAX_NAME_CHARS ? res.substring(0, MAX_NAME_CHARS).concat('...') : res;
  };

  return (
    <>
      {list ? (
        <>
          <button
            className="back-button"
            onClick={() => {
              push('/');
            }}
          >
            Go Back
          </button>
          <h2>{list.name}</h2>
          <CreateCard addCardToList={updateList} idList={list.id} />
          <ul>
            {list.cards.map((card: CardType) => (
              <li key={card.id}>
                <Link className="link" to={`/cards/${card.id}`}>
                  <div className="card">
                    <h3>{limitChars(card.name)}</h3>
                    <p>{limitChars(card.desc)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default ListView;
