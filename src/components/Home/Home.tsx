import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import ListContext from '../../context/ListContext';
import Login from '../Login/Login';
import InviteMember from '../InviteMember/InviteMember';

import './Home.css';

const boardId = process.env.REACT_APP_TRELLO_BOARD_ID as string;

const Home = () => {
  const [token, setToken] = useState(() => {
    try {
      const item = localStorage.getItem('trello_token');
      Trello.setToken(item);
      return item;
    } catch (_) {
      toast.error('Invalid token');
      return null;
    }
  });

  const { lists, setLists } = useContext(ListContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    Trello.get(
      `/boards/${boardId}/lists`,
      { cards: 'open', card_fields: 'name,desc,badges,idList' },
      (result: []) => {
        setLists(result);
        setIsLoaded(true);
      },
      (xhr: XMLHttpRequest) => {
        toast.error(xhr.responseText);
      }
    );
  }, [setLists]);

  if (!token) {
    return <Login setToken={setToken} />;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ListContext.Provider value={{ lists, setLists }}>
        <div className="home-container">
          <ul>
            {lists.map((list: ListType) => (
              <li key={list.id}>
                <Link className="link" to={`/lists/${list.id}`}>
                  <div className="list">
                    <h3>{list.name}</h3>
                    <p>{list.cards.length && list.cards.length + ' Cards 📇'}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <InviteMember boardId={boardId} />
      </ListContext.Provider>
    );
  }
};

export default Home;
