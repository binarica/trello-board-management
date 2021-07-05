import { createContext } from 'react';

interface IListContext {
  lists: ListType[];
  setLists: Function;
}

const ListContext = createContext({} as IListContext);

export default ListContext;
