import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ListContext from './context/ListContext';
import Home from './components/Home/Home';
import ListView from './components/ListView/ListView';
import CardView from './components/CardView/CardView';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [lists, setLists] = useState([]);

  return (
    <div className="app-container">
      <h1>📝 Trello Board Management</h1>
      <BrowserRouter>
        <ListContext.Provider value={{ lists, setLists }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/lists/:listId" component={ListView} />
            <Route path="/cards/:cardId" component={CardView} />
          </Switch>
        </ListContext.Provider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
