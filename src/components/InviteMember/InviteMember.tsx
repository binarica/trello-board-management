import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface InviteMemberProps {
  boardId: string;
}

const InviteMember = ({ boardId }: InviteMemberProps) => {
  const [isToggleOn, setToggleOn] = useState(false);
  const [email, setEmail] = useState<string>('');

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast.warn('Invalid email');
      return;
    }
    Trello.put(
      `/boards/${boardId}/members`,
      { email: email },
      () => {
        toast.success(`An invitation has been sent to ${email}`);
        setToggleOn(false);
      },
      (xhr: XMLHttpRequest) => {
        toast.error(xhr.responseText);
      }
    );
  };

  return (
    <>
      <button onClick={handleToggle}>👥 Invite a Member</button>

      {isToggleOn && (
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <p>
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            <button type="submit">Send invitation</button>
          </div>
        </form>
      )}
    </>
  );
};

export default InviteMember;
