import React, { useState, useEffect } from 'react';
import { getAllDocuments, addDocument, updateDocument, removeDocument } from './FirestoreInteraction.tsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaPlus } from 'react-icons/fa';

interface Email {
  id: string;
  address: string;
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState<Email | null>(null);
  const [editEmailValue, setEditEmailValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getEmails = async () => {
      try {
        const emailList = await getAllDocuments('emails');
        setEmails(emailList);
      } catch (error) {
        console.error('Error fetching emails:', error);
        toast.error('Failed to fetch emails. Please try again.');
      }
    };

    getEmails();
  }, []);

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddEmail = async () => {
    if (newEmail && isValidEmail(newEmail)) {
      if (emails.find(email => email.address === newEmail)) {
        toast.error('Email already exists');
      } else {
        try {
          const docId = await addDocument('emails', { address: newEmail });
          const newEmailObj = { id: docId, address: newEmail };
          setEmails([...emails, newEmailObj]);
          setNewEmail('');
        } catch (error) {
          console.error('Error adding email:', error);
          toast.error('Failed to add email. Please try again.');
        }
      }
    } else {
      toast.error('Invalid email format');
    }
  };

  const handleEditEmail = (email: Email) => {
    setEditingEmail(email);
    setEditEmailValue(email.address);
    setError(null);
  };

  const handleDeleteEmail = async (id: string) => {
    try {
      await removeDocument('emails', id);
      setEmails(emails.filter(email => email.id !== id));
    } catch (error) {
      console.error('Error deleting email:', error);
      toast.error('Failed to delete email. Please try again.');
    }
  };

  const handleSaveEditEmail = async () => {
    if (editingEmail && isValidEmail(editEmailValue)) {
      try {
        await updateDocument('emails', editingEmail.id, { address: editEmailValue });
        setEmails(emails.map(e => (e.id === editingEmail.id ? { ...e, address: editEmailValue } : e)));
        setEditingEmail(null);
      } catch (error) {
        console.error('Error updating email:', error);
        toast.error('Failed to update email. Please try again.');
      }
    } else {
      toast.error('Invalid email format');
    }
  };

  const cancelEditing = () => {
    setEditingEmail(null);
    setEditEmailValue('');
    setError(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNewEmailKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleAddEmail();
    }
  };

  const handleSaveEditEmailKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSaveEditEmail();
    }
  };

  const filteredEmails = emails.filter(email =>
    email.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-[800px] my-4">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Email Addresses</CardTitle>
        {emails.length > 5 && (
          <div className="flex items-center">
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
              className="w-40 mr-2"
            />
            <FaSearch className="text-gray-500 cursor-pointer" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="overflow-y-auto max-h-48">
          {filteredEmails.length === 0 ? (
            <li>No emails found</li>
          ) : (
            filteredEmails.map(email => (
              <li key={email.id} className="my-2 flex items-center justify-between">
                {editingEmail && editingEmail.id === email.id ? (
                  <>
                    <Input
                      type="text"
                      value={editEmailValue}
                      onChange={e => setEditEmailValue(e.target.value)}
                      className="mr-2"
                      onKeyPress={handleSaveEditEmailKeyPress}
                    />
                    <Button onClick={handleSaveEditEmail} className="mr-2">Save</Button>
                    <Button variant="outline" onClick={cancelEditing}>Cancel</Button>
                    {error && <p className="text-red-500">{error}</p>}
                  </>
                ) : (
                  <>
                    <span>{email.address}</span>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleEditEmail(email)}>Edit</Button>
                      <Button variant="outline" onClick={() => handleDeleteEmail(email.id)}>Delete</Button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="w-full">
          <div className="text-left">
            <Label htmlFor="newEmail">Enter new email</Label>
          </div>
          <div className="flex items-center">
            <Input
              id="newEmail"
              type="text"
              value={newEmail}
              onChange={e => {
                setNewEmail(e.target.value);
                setError(null);
              }}
              onKeyPress={handleNewEmailKeyPress}
              placeholder="Email"
              className="w-full mr-2"
            />
            <Button onClick={handleAddEmail}>
              <FaPlus className="mr-1" />
            </Button>
          </div>
        </div>
      </CardFooter>
      <ToastContainer />
    </Card>
  );
};

export default EmailManager;
