declare var Trello: any;

type ListType = {
  id: string;
  name: string;
  cards: CardType[];
};

type CardType = {
  id: string;
  name: string;
  desc: string;
  badges?: {
    attachments: number;
  };
  idList: string;
};
