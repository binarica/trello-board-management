import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface AddAttachmentProps {
  updateAttachmentCount: Function;
  idCard: string;
}

const AddAttachment = ({ updateAttachmentCount, idCard }: AddAttachmentProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    // client.js library only works with URLs, not files - using the REST API directly instead.
    // https://community.atlassian.com/t5/Trello-questions/How-do-I-create-a-card-with-an-attachment/qaq-p/1327787
    // https://stackoverflow.com/questions/35824891/how-to-attach-images-to-a-new-trello-card-from-the-js-client-library

    const formData = new FormData();
    formData.append('key', process.env.REACT_APP_TRELLO_API_KEY as string);
    formData.append('token', Trello.token());
    formData.append('file', selectedFile);

    fetch(`https://api.trello.com/1/cards/${idCard}/attachments/`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((uploadedFile) => {
        updateAttachmentCount();
        setSelectedFile(null);
        (e.target as HTMLFormElement).reset();
        toast.success(`${uploadedFile.name} uploaded`);
      })
      .catch((error) => {
        toast.error(error.response);
      });
  };

  return (
    <>
      <p>Add an Attachment</p>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) => setSelectedFile(e.target.files![0])}
          />
        </p>
        <button disabled={!selectedFile} type="submit">
          📤 Upload
        </button>
      </form>
    </>
  );
};

export default AddAttachment;
