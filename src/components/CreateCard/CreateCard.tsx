import { useState } from 'react';
import { toast } from 'react-toastify';

interface CreateCardProps {
  addCardToList: Function;
  idList: string;
}

const CreateCard = ({ addCardToList, idList }: CreateCardProps) => {
  const [isToggleOn, setToggleOn] = useState(false);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '' || desc.trim() === '') {
      toast.warn('Card should have both a title and a description.');
      return;
    }
    Trello.post(
      '/cards',
      { name: name, desc: desc, idList: idList },
      (card: CardType) => {
        addCardToList(card);
        setName('');
        setDesc('');
        setToggleOn(false);
        toast.success(`${card.name} created`);
      },
      (xhr: XMLHttpRequest) => {
        toast.error(xhr.responseText);
      }
    );
  };

  return (
    <>
      <button onClick={handleToggle}>➕ Create a new Card</button>

      {isToggleOn && (
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                placeholder="Enter title"
                minLength={5}
                onChange={(e) => setName(e.target.value)}
              />
            </p>
            <p>
              <textarea placeholder="Enter description" onChange={(e) => setDesc(e.target.value)} />
            </p>
            <button type="submit">Add card</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateCard;
